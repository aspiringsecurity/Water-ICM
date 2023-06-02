/****************************************************************************
 * Table: sys_xs_sbss.user_to_group_mappings
 *
 * stores mapping from user to group uuid to allow credential rotation.
 */

create table if not exists sys_xs_sbss.user_to_group_mappings(
    servicebroker_user_name text    not null,
    group_uuid              text    not null,
    primary key(servicebroker_user_name, group_uuid)
);

/****************************************************************************
 * Table: sys_xs_sbss.credential_to_group_mappings
 *
 * stores mapping from binding credential to group uuid to allow credential rotation.
 */

create table if not exists sys_xs_sbss.credential_to_group_mappings (
       service_user_name text    not null,
       group_uuid        text    not null,
       primary key(service_user_name, group_uuid),
       constraint fk_credential foreign key (service_user_name) references sys_xs_sbss.bindings(service_user_name) on delete cascade
);

/****************************************************************************
 * Procedure: sys_xs_sbss.add_user
 *
 * This stored procedure can be called to create a second technical user
 * that is allowed to create, validate and delete credentials.
 */

create or replace function sys_xs_sbss.add_user(
    in p_username name,
    in p_password text)
    returns name
    security definer
as $$
    declare p_config                            sys_xs_sbss.config;
    declare p_current_servicebroker_user_name   text;
    declare p_current_servicebroker_group_uuid  text;
    declare p_message                           text;
begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;

    -- parameter checks additionally to strict
    if ((p_username is null) or (p_username = '')) then
        raise exception 'Parameter error: p_username cannot be empty.';
    end if;
    if ((p_password is null) or (p_password = '')) then
        raise exception 'Parameter error: p_password cannot be empty.';
    end if;

    -- determine the servicebroker's technical user, which is the name of the session user
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    -- check whether user already exists
    if exists(select from pg_catalog.pg_roles where pg_roles.rolname=p_username) then
        raise exception 'User % already exists.', p_username;
    end if;

    execute 'create role ' || quote_ident(p_username) || ' in role sbss_user password ' || quote_literal(p_password) || ' login';

    -- add new user to group
    insert into sys_xs_sbss.user_to_group_mappings(servicebroker_user_name, group_uuid) values (p_username, p_current_servicebroker_group_uuid);

    p_message := format('Servicebroker user %I successfully created new servicebroker user %I.', p_current_servicebroker_user_name, p_username);
    perform sys_xs_sbss.write_audit(p_message, 'normal', p_config.audit_level);

    return p_username;
end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.add_user(name,text) to sbss_user;

/****************************************************************************
 * Procedure: sys_xs_sbss.delete_user
 *
 * This stored procedure can be called to delete another technical user
 * previously created with sys_xs_sbss.create_user or during sbss init.
 */

create or replace function sys_xs_sbss.delete_user(
    in p_username name)
    returns name
    security definer
as $$
    declare p_config                            sys_xs_sbss.config;
    declare p_current_servicebroker_user_name   text;
    declare p_current_servicebroker_group_uuid  text;
    declare p_message                           text;
begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;

    -- parameter checks additionally to strict
    if ((p_username is null) or (p_username = '')) then
        raise exception 'Parameter error: p_username cannot be empty.';
    end if;

    -- determine the servicebroker's technical user, which is the name of the session user
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    -- check if user exists
    if not exists(select 1 from pg_catalog.pg_roles where pg_roles.rolname = p_username) then
        raise exception 'User % does not exist.', p_username;
    end if;

    -- check if users share their group
    if not exists(select 1 from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_username and user_to_group_mappings.group_uuid = p_current_servicebroker_group_uuid) then
        raise exception 'You are not allowed to delete user %.',  p_username;
    end if;

    execute 'drop role ' || quote_ident(p_username);
    delete from sys_xs_sbss.user_to_group_mappings where servicebroker_user_name=p_username;

    p_message := format('Servicebroker user %I successfully deleted servicebroker user %I.', p_current_servicebroker_user_name, p_username);
    perform sys_xs_sbss.write_audit(p_message, 'normal', p_config.audit_level);

    return p_username;

end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.delete_user(name) to sbss_user;

/****************************************************************************
 * Adjust previous procedures s.t. they take the new mappings into consideration
 */

/****************************************************************************
* creation procedures
*/

create or replace function sys_xs_sbss.create_extended_binding_credential(
    in  p_instance_id                           varchar(256),
    in  p_binding_id                            varchar(256),
    in  p_service_id                            varchar(256),
    in  p_plan_id                               varchar(256),
    in  p_app_guid                              varchar(256))
    returns                                     sys_xs_sbss.user_info
    security definer
as $$
    declare p_config                            sys_xs_sbss.config;
    declare p_returndata                        sys_xs_sbss.user_info;
    declare p_current_servicebroker_user_name   text;
    declare p_prior_service_user_name           text;
    declare p_current_servicebroker_group_uuid  text;
    -- Each user created by SBSS receives this static prefix (housekeeping)
    declare p_service_user_name_prefix          text :='sbss_';
    declare p_service_user_name_random          text :='';
    declare p_service_user_name                 text :='';
    -- Each user password created by SBSS receives this static prefix
    declare p_service_user_password_prefix      text := 'aa_';
    declare p_service_user_password_random      text := '';
    declare p_service_user_password             text := '';
    declare p_service_user_password_salt        text := '';
    declare p_service_user_password_hash        bytea;
    declare p_max_trials                        int  := 10;
    declare p_current_creds                     int;
    declare p_creation_successful               boolean := false;
    declare n                                   int  := 0;
    declare p_message                           text;
    declare p_bindings_row                      sys_xs_sbss.bindings;
begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;

    -- Parameter checks
    if ( (p_instance_id is null) or (p_instance_id = ''))  then
        raise exception 'Parameter error: p_instance_id cannot be empty.';
    end if;
    if ((p_binding_id is null) or (p_binding_id = '')) then
        raise exception 'Parameter error: p_binding_id cannot be empty.';
    end if;
    if ((p_service_id is null) or (p_service_id = '')) then
        raise exception 'Parameter error: p_service_id cannot be empty.';
    end if;
    if ((p_plan_id is null) or (p_plan_id = '')) then
        raise exception 'Parameter error: p_plan_id cannot be empty.';
    end if;
    if ((p_app_guid is null) or (p_app_guid = '')) then
        raise exception 'Parameter error: p_app_guid cannot be empty.';
    end if;

    -- determine the servicebroker's technical user, which is the name of the session user
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    -- Check if prior bindings already exist.
    -- If yes, ensure that the groups for current servicebroker user and prior bindings fit.
    select * from sys_xs_sbss.bindings into p_bindings_row where bindings.instance_id = p_instance_id limit 1;
    if found then
        p_prior_service_user_name = p_bindings_row.service_user_name;
        if (p_prior_service_user_name != '') then
            if not exists (select 1 from sys_xs_sbss.credential_to_group_mappings where credential_to_group_mappings.service_user_name = p_prior_service_user_name and credential_to_group_mappings.group_uuid = p_current_servicebroker_group_uuid) then
                raise exception 'Credential generation failed for servicebroker user (%). A credential for p_instance_id (%) has been created already by another servicebroker user not part of your group. ', p_current_servicebroker_user_name, p_instance_id;
            end if;
        end if;
    end if;

    -- Ensure that the maximum number of bindings cannot be overstepped
    select count(*) into p_current_creds
    from sys_xs_sbss.bindings
    where (p_binding_id = bindings.binding_id
        and p_instance_id = bindings.instance_id);
    if (p_current_creds >= p_config.max_credentials_per_binding) then
        raise exception 'Credential generation failed for servicebroker user (%). Maximum number of credentials (%) has been reached for this tuple of p_instance_id (%) and p_binding_id (%).', p_current_servicebroker_user_name, p_config.max_credentials_per_binding, p_instance_id, p_binding_id;
    end if;

    -- Create SecureRandom password
    select encode(gen_random_bytes(p_config.user_pass_entropy_bytes),'base64') into p_service_user_password_random;
    p_service_user_password = p_service_user_password_prefix || p_service_user_password_random;
    select encode(gen_random_bytes(p_config.salt_bytes),'base64') into p_service_user_password_salt;
    select sys_xs_sbss.compute_digest(p_service_user_password, p_service_user_password_salt) into p_service_user_password_hash;

    -- Create random prefixed user name
    for n in 1 .. p_max_trials loop
            select encode(gen_random_bytes(p_config.user_name_entropy_bytes),'base64') into p_service_user_name_random;
            p_service_user_name := p_service_user_name_prefix || p_service_user_name_random;
            p_service_user_name := lower(p_service_user_name);
            begin
                -- service_user_name_tmp has not yet been taken.
                insert
                into sys_xs_sbss.bindings ( service_user_name, service_user_password_hash, service_user_password_salt, failed_credential_checks, servicebroker_user_name, instance_id, binding_id, service_id, plan_id, app_guid, creation_time )
                values
                (p_service_user_name, p_service_user_password_hash, p_service_user_password_salt, 0, p_current_servicebroker_user_name, p_instance_id, p_binding_id, p_service_id, p_plan_id, p_app_guid, current_timestamp);

                -- add group information for credential rotation
                insert into sys_xs_sbss.credential_to_group_mappings(service_user_name, group_uuid) values (p_service_user_name, p_current_servicebroker_group_uuid);

                p_creation_successful := true;
                exit; --Leave
            exception when unique_violation then continue;
            end;
            -- Chosen user name is used already, try again
        end loop;

    -- Check if we did find a unique new user ID
    if (not p_creation_successful) then
        -- We did not manage to create a unique user ID during max_trials
        -- trials, abort
        raise exception 'Credential generation failed for servicebroker user (%). Could not create a unique user name for the desired credential in (%) trials. Aborting now.', p_current_servicebroker_user_name, p_max_trials;
    end if;

    p_message := format('Credential generation successful for servicebroker user (%I). Created credential (%I) for p_instance_id (%I) and p_binding_id (%I).',p_current_servicebroker_user_name, p_service_user_name, p_instance_id, p_binding_id);
    perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
    p_returndata.service_user_name = p_service_user_name;
    p_returndata.service_user_password = p_service_user_password;
    return p_returndata;
end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.create_extended_binding_credential(varchar(256),varchar(256),varchar(256),varchar(256),varchar(256)) to sbss_user;

create or replace function sys_xs_sbss.create_binding_credential_v2(
    in  p_instance_id                           varchar(256),
    in  p_binding_id                            varchar(256),
    in  p_service_id                            varchar(256),
    in  p_plan_id                               varchar(256),
    in  p_app_guid                              varchar(256),
    in  p_sub_account_id                        varchar(256))
    returns                                     sys_xs_sbss.user_info
    security definer
as $$
    declare p_config                            sys_xs_sbss.config;
    declare p_returndata                        sys_xs_sbss.user_info;
    declare p_current_servicebroker_user_name   text;
    declare p_prior_service_user_name           text;
    declare p_current_servicebroker_group_uuid  text;
    -- Each user created by SBSS receives this static prefix (housekeeping)
    declare p_service_user_name_prefix          text :='sbss_';
    declare p_service_user_name_random          text :='';
    declare p_service_user_name                 text :='';
    -- Each user password created by SBSS receives this static prefix
    declare p_service_user_password_prefix      text := 'aa_';
    declare p_service_user_password_random      text := '';
    declare p_service_user_password             text := '';
    declare p_service_user_password_salt        text := '';
    declare p_service_user_password_hash        bytea;
    declare p_max_trials                        int  := 10;
    declare p_current_creds                     int;
    declare p_creation_successful               boolean := false;
    declare n                                   int  := 0;
    declare p_message                           text;
    declare p_bindings_row                      sys_xs_sbss.bindings;
begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;

    -- Parameter checks
    if ( (p_instance_id is null) or (p_instance_id = ''))  then
        raise exception 'Parameter error: p_instance_id cannot be empty.';
    end if;
    if ((p_binding_id is null) or (p_binding_id = '')) then
        raise exception 'Parameter error: p_binding_id cannot be empty.';
    end if;
    if ((p_service_id is null) or (p_service_id = '')) then
        raise exception 'Parameter error: p_service_id cannot be empty.';
    end if;
    if ((p_plan_id is null) or (p_plan_id = '')) then
        raise exception 'Parameter error: p_plan_id cannot be empty.';
    end if;
    if ((p_app_guid is null) or (p_app_guid = '')) then
        raise exception 'Parameter error: p_app_guid cannot be empty.';
    end if;
    if ((p_sub_account_id is null) or (p_sub_account_id = '')) then
        raise exception 'Parameter error: p_sub_account_id cannot be empty.';
    end if;

    -- determine the servicebroker's technical user, which is the name of the session user
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    -- Check if prior bindings already exist.
    -- If yes, ensure that the groups for current servicebroker user and prior bindings fit.
    select * from sys_xs_sbss.bindings into p_bindings_row where bindings.instance_id = p_instance_id limit 1;
    if found then
        p_prior_service_user_name = p_bindings_row.service_user_name;
        if (p_prior_service_user_name != '') then
            if not exists (select 1 from sys_xs_sbss.credential_to_group_mappings where credential_to_group_mappings.service_user_name = p_prior_service_user_name and credential_to_group_mappings.group_uuid = p_current_servicebroker_group_uuid) then
                raise exception 'Credential generation failed for servicebroker user (%). A credential for p_instance_id (%) has been created already by another servicebroker user not part of your group. ', p_current_servicebroker_user_name, p_instance_id;
            end if;
        end if;
    end if;

    -- Ensure that the maximum number of bindings cannot be overstepped
    select count(*) into p_current_creds
    from sys_xs_sbss.bindings
    where (p_binding_id = bindings.binding_id
        and p_instance_id = bindings.instance_id);
    if (p_current_creds >= p_config.max_credentials_per_binding) then
        raise exception 'Credential generation failed for servicebroker user (%). Maximum number of credentials (%) has been reached for this tuple of p_instance_id (%) and p_binding_id (%).', p_current_servicebroker_user_name, p_config.max_credentials_per_binding, p_instance_id, p_binding_id;
    end if;

    -- Create SecureRandom password
    select encode(gen_random_bytes(p_config.user_pass_entropy_bytes),'base64') into p_service_user_password_random;
    p_service_user_password = p_service_user_password_prefix || p_service_user_password_random;
    select encode(gen_random_bytes(p_config.salt_bytes),'base64') into p_service_user_password_salt;
    select sys_xs_sbss.compute_digest(p_service_user_password, p_service_user_password_salt) into p_service_user_password_hash;

    -- Create random prefixed user name
    for n in 1 .. p_max_trials loop
            select encode(gen_random_bytes(p_config.user_name_entropy_bytes),'base64') into p_service_user_name_random;
            p_service_user_name := p_service_user_name_prefix || p_service_user_name_random;
            p_service_user_name := lower(p_service_user_name);
            begin
                -- service_user_name_tmp has not yet been taken.
                insert
                into sys_xs_sbss.bindings ( service_user_name, service_user_password_hash, service_user_password_salt, failed_credential_checks, servicebroker_user_name, instance_id, binding_id, service_id, plan_id, app_guid, sub_account_id, creation_time )
                values
                (p_service_user_name, p_service_user_password_hash, p_service_user_password_salt, 0, p_current_servicebroker_user_name, p_instance_id, p_binding_id, p_service_id, p_plan_id, p_app_guid, p_sub_account_id, current_timestamp);

                -- add group information for credential rotation
                insert into sys_xs_sbss.credential_to_group_mappings(service_user_name, group_uuid) values (p_service_user_name, p_current_servicebroker_group_uuid);

                p_creation_successful := true;
                exit; --Leave
            exception when unique_violation then continue;
            end;
            -- Chosen user name is used already, try again
        end loop;

    -- Check if we did find a unique new user ID
    if (not p_creation_successful) then
        -- We did not manage to create a unique user ID during max_trials
        -- trials, abort
        raise exception 'Credential generation failed for servicebroker user (%). Could not create a unique user name for the desired credential in (%) trials. Aborting now.', p_current_servicebroker_user_name, p_max_trials;
    end if;

    p_message := format('Credential generation successful for servicebroker user (%I). Created credential (%I) for p_instance_id (%I) and p_binding_id (%I).',p_current_servicebroker_user_name, p_service_user_name, p_instance_id, p_binding_id);
    perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
    p_returndata.service_user_name = p_service_user_name;
    p_returndata.service_user_password = p_service_user_password;
    return p_returndata;
end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.create_binding_credential_v2(varchar(256),varchar(256),varchar(256),varchar(256),varchar(256),varchar(256)) to sbss_user;

create or replace function sys_xs_sbss.create_binding_credential(
    in  p_instance_id                           varchar(256),
    in  p_binding_id                            varchar(256))
    returns                                     sys_xs_sbss.user_info
    security definer
as $$
declare p_config                            sys_xs_sbss.config;
    declare p_returndata                        sys_xs_sbss.user_info;
    declare p_current_servicebroker_user_name   text;
    declare p_prior_service_user_name           text;
    declare p_current_servicebroker_group_uuid  text;
    -- Each user created by SBSS receives this static prefix (housekeeping)
    declare p_service_user_name_prefix          text :='sbss_';
    declare p_service_user_name_random          text :='';
    declare p_service_user_name                 text :='';
    -- Each user password created by SBSS receives this static prefix
    declare p_service_user_password_prefix      text := 'aa_';
    declare p_service_user_password_random      text := '';
    declare p_service_user_password             text := '';
    declare p_service_user_password_salt        text := '';
    declare p_service_user_password_hash        bytea;
    declare p_max_trials                        int := 10;
    declare p_current_creds                     int;
    declare f                                   int := 0;
    declare n                                   int := 0;
    declare p_message                           text;
    declare p_bindings_row                      sys_xs_sbss.bindings;
begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;

    -- Parameter checks
    if ( (p_instance_id is null) or (p_instance_id = ''))  then
        raise exception 'Parameter error: p_instance_id cannot be empty.';
    end if;
    if ((p_binding_id is null) or (p_binding_id = '')) then
        raise exception 'Parameter error: p_binding_id cannot be empty.';
    end if;

    -- determine the servicebroker's technical user, which is the name of the session user
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    -- Check if prior bindings already exist.
    -- If yes, ensure that the groups for current servicebroker user and prior bindings fit.
    select * from sys_xs_sbss.bindings into p_bindings_row where bindings.instance_id = p_instance_id limit 1;
    if found then
        p_prior_service_user_name = p_bindings_row.service_user_name;
        if (p_prior_service_user_name != '') then
            if not exists (select 1 from sys_xs_sbss.credential_to_group_mappings where credential_to_group_mappings.service_user_name = p_prior_service_user_name and credential_to_group_mappings.group_uuid = p_current_servicebroker_group_uuid) then
                raise exception 'Credential generation failed for servicebroker user (%). A credential for p_instance_id (%) has been created already by another servicebroker user not part of your group. ', p_current_servicebroker_user_name, p_instance_id;
            end if;
        end if;
    end if;

    -- Ensure that the maximum number of bindings cannot be overstepped
    select count(*) into p_current_creds
    from sys_xs_sbss.bindings
    where (p_binding_id = bindings.binding_id
        and p_instance_id = bindings.instance_id);
    if (p_current_creds >= p_config.max_credentials_per_binding) then
        raise exception 'Credential generation failed for servicebroker user (%). Maximum number of credentials (%) has been reached for this tuple of p_instance_id (%) and p_binding_id (%).', p_current_servicebroker_user_name, p_config.max_credentials_per_binding, p_instance_id, p_binding_id;
    end if;

    -- Create SecureRandom password
    select encode(gen_random_bytes(p_config.user_pass_entropy_bytes),'base64') into p_service_user_password_random;
    p_service_user_password = p_service_user_password_prefix || p_service_user_password_random;
    select encode(gen_random_bytes(p_config.salt_bytes),'base64') into p_service_user_password_salt;
    select sys_xs_sbss.compute_digest(p_service_user_password, p_service_user_password_salt) into p_service_user_password_hash;

    -- Create random prefixed user name
    for n in 1 .. p_max_trials loop
            select encode(gen_random_bytes(p_config.user_name_entropy_bytes),'base64') into p_service_user_name_random;
            p_service_user_name := p_service_user_name_prefix || p_service_user_name_random;
            p_service_user_name := lower(p_service_user_name);
            select count(*)
            into f
            from sys_xs_sbss.bindings
            where (p_service_user_name = bindings.service_user_name);
            if (f = 0) then
                -- service_user_name_tmp has not yet been taken.
                insert
                into sys_xs_sbss.bindings ( service_user_name, service_user_password_hash, service_user_password_salt, failed_credential_checks, servicebroker_user_name, instance_id, binding_id, creation_time )
                values
                (p_service_user_name, p_service_user_password_hash, p_service_user_password_salt, 0, p_current_servicebroker_user_name, p_instance_id, p_binding_id,
                 current_timestamp);

                -- add group information for credential rotation
                insert into sys_xs_sbss.credential_to_group_mappings(service_user_name, group_uuid) values (p_service_user_name, p_current_servicebroker_group_uuid);

                exit; --Leave
            end if;
            -- Chosen user name is used already, try again
        end loop;

    -- Check if we did find a unique new user ID
    if (f >= 1) then
        -- We did not manage to create a unique user ID during max_trials
        -- trials, abort
        raise exception 'Credential generation failed for servicebroker user (%). Could not create a unique user name for the desired credential in (%) trials. Aborting now.', p_current_servicebroker_user_name, p_max_trials;
    end if;

    p_message := format('Credential generation successful for servicebroker user (%I). Created credential (%I) for p_instance_id (%I) and p_binding_id (%I).',p_current_servicebroker_user_name, p_service_user_name, p_instance_id, p_binding_id);
    perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
    p_returndata.service_user_name = p_service_user_name;
    p_returndata.service_user_password = p_service_user_password;
    return p_returndata;
end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.create_binding_credential(varchar(256),varchar(256)) to sbss_user;


/****************************************************************************
 * validation procedures
 */

create or replace function sys_xs_sbss.validate_binding_credential(
    in p_service_user_name                      text,
    in p_service_user_password                  text)
    returns                                     sys_xs_sbss.service
    security definer
as $$
    declare p_config sys_xs_sbss.config;
    declare p_returndata                        sys_xs_sbss.service;
    declare p_bindings_row                      sys_xs_sbss.bindings;
    declare p_computed_hash                     bytea;
    declare p_message                           text;
    declare p_current_servicebroker_user_name   text;
    declare p_current_servicebroker_group_uuid  text;
begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;

    -- Parameter checks
    if ( (p_service_user_name is null) or (p_service_user_name = ''))  then
        raise exception 'Parameter error: p_service_user_name cannot be empty.';
    end if;
    if ((p_service_user_password is null) or (p_service_user_password = '')) then
        raise exception 'Parameter error: p_service_user_password cannot be empty.';
    end if;

    -- determine the servicebroker's technical user, which is the name of the session user
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    -- Find credential
    select * into p_bindings_row
    from sys_xs_sbss.bindings
    where (p_service_user_name = bindings.service_user_name);
    if not found then
        p_message := format('Credential validation failed for servicebroker user (%I). No credential (%I) found.',p_current_servicebroker_user_name,p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        return p_returndata;
    end if;

    -- Ensure that validating servicebroker user is part of the same group as the user that generated the credential
    if not exists(select 1 from sys_xs_sbss.credential_to_group_mappings where credential_to_group_mappings.group_uuid = p_current_servicebroker_group_uuid and credential_to_group_mappings.service_user_name = p_bindings_row.service_user_name) then
        raise exception 'Credential validation failed for servicebroker user (%). The credential (%) has been generated by another servicebroker user (%) not part of your group.', p_current_servicebroker_user_name, p_service_user_name, p_bindings_row.servicebroker_user_name;
    end if;

    if (p_bindings_row.failed_credential_checks > p_config.max_pass_fail_attempts) then
        p_message := format('Credential validation failed for servicebroker user (%I). Credential (%I) locked.',p_current_servicebroker_user_name, p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        return p_returndata;
    end if;
    select sys_xs_sbss.compute_digest(p_service_user_password, p_bindings_row.service_user_password_salt) into p_computed_hash;
    if (p_computed_hash = p_bindings_row.service_user_password_hash) then
        -- Password validated successfully
        if (p_bindings_row.failed_credential_checks > 0) then
            -- Reset invalid password check counter
            update sys_xs_sbss.bindings
            set failed_credential_checks=0
            where (p_service_user_name = bindings.service_user_name);
            p_message := format('Credential validation successful for servicebroker user (%I) and credential (%I). Resetting failed password counter.',p_current_servicebroker_user_name, p_service_user_name);
            perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        else
            p_message := format('Credential validation successful for servicebroker user (%I) and credential (%I).',p_current_servicebroker_user_name, p_service_user_name);
            -- NGPBUG-131908: Write successful validation only if verbose is configured
            perform sys_xs_sbss.write_audit(p_message,'verbose',p_config.audit_level);
        end if;
        p_returndata.instance_id := p_bindings_row.instance_id;
        p_returndata.binding_id := p_bindings_row.binding_id;
    else
        update sys_xs_sbss.bindings
        set failed_credential_checks=failed_credential_checks+1
        where (p_service_user_name = bindings.service_user_name);
        p_message := format('Credential validation failed for servicebroker user (%I) and credential (%I). Invalid credential. Increasing failed password counter.',p_current_servicebroker_user_name, p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        return p_returndata;
    end if;
    return p_returndata;
end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.validate_binding_credential(text, text) to sbss_user;

create or replace function sys_xs_sbss.validate_binding_credential_v2(
    in p_service_user_name                      text,
    in p_service_user_password                  text)
    returns                                     sys_xs_sbss.service_v2
    security definer
as $$
    declare p_config sys_xs_sbss.config;
    declare p_returndata                        sys_xs_sbss.service_v2;
    declare p_bindings_row                      sys_xs_sbss.bindings;
    declare p_computed_hash                     bytea;
    declare p_message                           text;
    declare p_current_servicebroker_user_name   text;
    declare p_current_servicebroker_group_uuid  text;
begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;

    -- Parameter checks
    if ( (p_service_user_name is null) or (p_service_user_name = ''))  then
        raise exception 'Parameter error: p_service_user_name cannot be empty.';
    end if;
    if ((p_service_user_password is null) or (p_service_user_password = '')) then
        raise exception 'Parameter error: p_service_user_password cannot be empty.';
    end if;

    -- Determine the servicebroker's technical user, which is the name of the session user
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    -- Find credential
    select * into p_bindings_row
    from sys_xs_sbss.bindings
    where (p_service_user_name = bindings.service_user_name);
    if not found then
        p_message := format('Credential validation failed for servicebroker user (%I). No credential (%I) found.',p_current_servicebroker_user_name,p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        return p_returndata;
    end if;

    -- Ensure that validating servicebroker user is part of the same group as the user that generated the credential
    if not exists(select 1 from sys_xs_sbss.credential_to_group_mappings where credential_to_group_mappings.group_uuid = p_current_servicebroker_group_uuid and credential_to_group_mappings.service_user_name = p_bindings_row.service_user_name) then
        raise exception 'Credential validation failed for servicebroker user (%). The credential (%) has been generated by another servicebroker user (%) not part of your group.', p_current_servicebroker_user_name, p_service_user_name, p_bindings_row.servicebroker_user_name;
    end if;

    if (p_bindings_row.failed_credential_checks > p_config.max_pass_fail_attempts) then
        p_message := format('Credential validation failed for servicebroker user (%I). Credential (%I) locked.',p_current_servicebroker_user_name, p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        return p_returndata;
    end if;
    select sys_xs_sbss.compute_digest(p_service_user_password, p_bindings_row.service_user_password_salt) into p_computed_hash;
    if (p_computed_hash = p_bindings_row.service_user_password_hash) then
        -- Password validated successfully
        if (p_bindings_row.failed_credential_checks > 0) then
            -- Reset invalid password check counter
            update sys_xs_sbss.bindings
            set failed_credential_checks=0
            where (p_service_user_name = bindings.service_user_name);
            p_message := format('Credential validation successful for servicebroker user (%I) and credential (%I). Resetting failed password counter.',p_current_servicebroker_user_name, p_service_user_name);
            perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        else
            p_message := format('Credential validation successful for servicebroker user (%I) and credential (%I).',p_current_servicebroker_user_name, p_service_user_name);
            -- NGPBUG-131908: Write successful validation only if verbose is configured
            perform sys_xs_sbss.write_audit(p_message,'verbose',p_config.audit_level);
        end if;
        p_returndata.instance_id := p_bindings_row.instance_id;
        p_returndata.binding_id := p_bindings_row.binding_id;
        p_returndata.service_id := p_bindings_row.service_id;
        p_returndata.plan_id := p_bindings_row.plan_id;
        p_returndata.app_guid := p_bindings_row.app_guid;
        p_returndata.sub_account_id := p_bindings_row.sub_account_id;
    else
        update sys_xs_sbss.bindings
        set failed_credential_checks=failed_credential_checks+1
        where (p_service_user_name = bindings.service_user_name);
        p_message := format('Credential validation failed for servicebroker user (%I) and credential (%I). Invalid credential. Increasing failed password counter.',p_current_servicebroker_user_name, p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        return p_returndata;
    end if;
    return p_returndata;
end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.validate_binding_credential_v2(text, text) to sbss_user;

create or replace function sys_xs_sbss.validate_extended_binding_credential(
    in p_service_user_name                      text,
    in p_service_user_password                  text)
    returns                                     sys_xs_sbss.extended_service
    security definer
as $$
    declare p_config sys_xs_sbss.config;
    declare p_returndata                        sys_xs_sbss.extended_service;
    declare p_bindings_row                      sys_xs_sbss.bindings;
    declare p_computed_hash                     bytea;
    declare p_message                           text;
    declare p_current_servicebroker_user_name   text;
    declare p_current_servicebroker_group_uuid  text;
begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;

    -- Parameter checks
    if ( (p_service_user_name is null) or (p_service_user_name = ''))  then
        raise exception 'Parameter error: p_service_user_name cannot be empty.';
    end if;
    if ((p_service_user_password is null) or (p_service_user_password = '')) then
        raise exception 'Parameter error: p_service_user_password cannot be empty.';
    end if;

    -- Determine the servicebroker's technical user, which is the name of the session user
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    -- Find credential
    select * into p_bindings_row
    from sys_xs_sbss.bindings
    where (p_service_user_name = bindings.service_user_name);
    if not found then
        p_message := format('Credential validation failed for servicebroker user (%I). No credential (%I) found.',p_current_servicebroker_user_name,p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        return p_returndata;
    end if;

    -- Ensure that validating servicebroker user is part of the same group as the user that generated the credential
    if not exists(select 1 from sys_xs_sbss.credential_to_group_mappings where credential_to_group_mappings.group_uuid = p_current_servicebroker_group_uuid and credential_to_group_mappings.service_user_name = p_bindings_row.service_user_name) then
        raise exception 'Credential validation failed for servicebroker user (%). The credential (%) has been generated by another servicebroker user (%) not part of your group.', p_current_servicebroker_user_name, p_service_user_name, p_bindings_row.servicebroker_user_name;
    end if;

    if (p_bindings_row.failed_credential_checks > p_config.max_pass_fail_attempts) then
        p_message := format('Credential validation failed for servicebroker user (%I). Credential (%I) locked.',p_current_servicebroker_user_name, p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        return p_returndata;
    end if;
    select sys_xs_sbss.compute_digest(p_service_user_password, p_bindings_row.service_user_password_salt) into p_computed_hash;
    if (p_computed_hash = p_bindings_row.service_user_password_hash) then
        -- Password validated successfully
        if (p_bindings_row.failed_credential_checks > 0) then
            -- Reset invalid password check counter
            update sys_xs_sbss.bindings
            set failed_credential_checks=0
            where (p_service_user_name = bindings.service_user_name);
            p_message := format('Credential validation successful for servicebroker user (%I) and credential (%I). Resetting failed password counter.',p_current_servicebroker_user_name, p_service_user_name);
            perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        else
            p_message := format('Credential validation successful for servicebroker user (%I) and credential (%I).',p_current_servicebroker_user_name, p_service_user_name);
            -- NGPBUG-131908: Write successful validation only if verbose is configured
            perform sys_xs_sbss.write_audit(p_message,'verbose',p_config.audit_level);
        end if;
        p_returndata.instance_id := p_bindings_row.instance_id;
        p_returndata.binding_id := p_bindings_row.binding_id;
        p_returndata.service_id := p_bindings_row.service_id;
        p_returndata.plan_id := p_bindings_row.plan_id;
        p_returndata.app_guid := p_bindings_row.app_guid;
    else
        update sys_xs_sbss.bindings
        set failed_credential_checks=failed_credential_checks+1
        where (p_service_user_name = bindings.service_user_name);
        p_message := format('Credential validation failed for servicebroker user (%I) and credential (%I). Invalid credential. Increasing failed password counter.',p_current_servicebroker_user_name, p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
        return p_returndata;
    end if;
    return p_returndata;
end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.validate_extended_binding_credential(text, text) to sbss_user;

/****************************************************************************
 * deletion procedures
 */

create or replace function sys_xs_sbss.drop_binding_credential(
    in  p_instance_id                           varchar(256),
    in  p_binding_id                            varchar(256),
    out p_deleted_binding_credentials           int)
    returns                                     int
    security definer
as $$
    declare p_config                            sys_xs_sbss.config;
    declare p_message                           text;
    declare p_service_user_name                 text;
    declare p_current_servicebroker_user_name   text;
    declare p_current_servicebroker_group_uuid  text;

begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;
    p_deleted_binding_credentials := 0;

    -- Parameter checks
    if ( (p_instance_id is null) or (p_instance_id = ''))  then
        raise exception 'Parameter error: p_instance_id cannot be empty.';
    end if;
    if ((p_binding_id is null) or (p_binding_id = '')) then
        raise exception 'Parameter error: p_binding_id cannot be empty.';
    end if;

    -- Determine the servicebroker's technical user, which is the name of the session user
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    for p_service_user_name in
        select service_user_name
        from sys_xs_sbss.bindings
        where (p_instance_id = bindings.instance_id) and (p_binding_id = bindings.binding_id) loop

            -- check if current user is part of the credential group
            if not exists(select 1 from sys_xs_sbss.credential_to_group_mappings where credential_to_group_mappings.group_uuid = p_current_servicebroker_group_uuid and credential_to_group_mappings.service_user_name = p_service_user_name) then
                continue;
            end if;
            delete from sys_xs_sbss.bindings where bindings.service_user_name = p_service_user_name;
            p_deleted_binding_credentials := p_deleted_binding_credentials+1;
            p_message := format('Removing binding credential (%I) for servicebroker user (%I), p_instance_id (%I) and p_binding_id (%I).', p_service_user_name, p_current_servicebroker_user_name, p_instance_id, p_binding_id);
            perform sys_xs_sbss.write_audit(p_message,'verbose',p_config.audit_level);
        end loop;

    p_message := format('Removed %I binding credentials for servicebroker user (%I), p_instance_id (%I) and p_binding_id (%I).', p_deleted_binding_credentials, p_current_servicebroker_user_name, p_instance_id, p_binding_id);
    perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.drop_binding_credential(varchar(256), varchar(256)) to sbss_user;

create or replace function sys_xs_sbss.drop_all_binding_credentials(
    in  p_instance_id                           varchar(256),
    out p_deleted_binding_credentials           int)
    returns                                     int
    security definer
as $$
    -- config
    declare p_config                            sys_xs_sbss.config;
    declare p_message                           text;
    declare p_service_user_name                 text;
    declare p_binding_id                        text;
    declare p_current_servicebroker_user_name   text;
    declare p_current_servicebroker_group_uuid  text;

begin
    -- Load config
    select * from sys_xs_sbss.config limit 1 into p_config;
    p_deleted_binding_credentials := 0;

    -- Parameter checks
    if ( (p_instance_id is null) or (p_instance_id = ''))  then
        raise exception 'Parameter error: p_instance_id cannot be empty.';
    end if;

    -- Determine the servicebroker's technical user, which is the name of the Session User
    select session_user into p_current_servicebroker_user_name;
    select group_uuid from sys_xs_sbss.user_to_group_mappings where user_to_group_mappings.servicebroker_user_name = p_current_servicebroker_user_name into p_current_servicebroker_group_uuid;

    for p_service_user_name, p_binding_id in
        select service_user_name, binding_id
        from sys_xs_sbss.bindings
        where (p_instance_id = bindings.instance_id) loop

            -- check if current user is part of the credential group
            if not exists(select 1 from sys_xs_sbss.credential_to_group_mappings where credential_to_group_mappings.group_uuid = p_current_servicebroker_group_uuid and credential_to_group_mappings.service_user_name = p_service_user_name) then
                continue;
            end if;

            delete from sys_xs_sbss.bindings where bindings.service_user_name = p_service_user_name;
            p_deleted_binding_credentials := p_deleted_binding_credentials+1;
            p_message := format('Removing binding credential (%I) for servicebroker user (%I), p_instance_id (%I) and binding_id (%I).', p_service_user_name, p_current_servicebroker_user_name, p_instance_id, p_binding_id);
            perform sys_xs_sbss.write_audit(p_message,'verbose',p_config.audit_level);
        end loop;

    p_message := format('Removed %I binding credentials for servicebroker user (%I) and p_instance_id (%I).', p_deleted_binding_credentials, p_current_servicebroker_user_name, p_instance_id);
    perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
end;
$$ language plpgsql strict;
grant execute on function sys_xs_sbss.drop_all_binding_credentials(varchar(256)) to sbss_user;
