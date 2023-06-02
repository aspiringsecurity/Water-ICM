-- Create role sbss_user
drop role if exists sbss_user;
create role sbss_user;
grant usage on schema sys_xs_sbss to sbss_user; 

/****************************************************************************
 * Table: sys_xs_sbss.bindings 
 * 
 * stores metadata for the binding. 
 */
create table sys_xs_sbss.bindings (
    service_user_name          text         not null,
    service_user_password_hash bytea        not null,
    service_user_password_salt text         not null,
    failed_credential_checks   int          not null default 0,
    servicebroker_user_name    text         not null,
    instance_id                varchar(256) not null,
    binding_id                 varchar(256) not null,
    creation_time              timestamp    not null,
    primary key(service_user_name)
);
create index on sys_xs_sbss.bindings(servicebroker_user_name, instance_id, binding_id);

/****************************************************************************
 * Table: sys_xs_sbss.config 
 * 
 * stores the configuration for SBSS. It can be changed via procedure 
 * sys_xs_sbss.change_config. 
 */
create type audit_level_type as enum ('silent', 'normal', 'verbose');
create table sys_xs_sbss.config (
    user_name_entropy_bytes     int                 not null  check(user_name_entropy_bytes between 20 and 50),
    user_pass_entropy_bytes     int                 not null  check(user_name_entropy_bytes between 20 and 50),
    salt_bytes                  int                 not null  check(salt_bytes between 8 and 32),
    max_pass_fail_attempts      int                 not null  check(max_pass_fail_attempts between 0 and 10), 
    max_credentials_per_binding int                 not null  check(max_credentials_per_binding between 1 and 10),
    audit_level                 audit_level_type    not null,
    creation_time               timestamp           not null
);
insert 
    into sys_xs_sbss.config 
    values (50, 20, 12, 5, 1, 'verbose', now());

--Helper functions for tracing and credential calculation 
create or replace function sys_xs_sbss.compute_digest(
    in  service_user_password       text, 
    in  service_user_password_salt  text) 
    returns                         bytea 
as $$
begin
    return digest(service_user_password || service_user_password_salt, 'sha256');
end;
$$ language plpgsql;

create or replace function sys_xs_sbss.write_audit(
    in  message                     text, 
    in  level                       audit_level_type, 
    in  currentlevel                audit_level_type) 
    returns                         void 
as $$
begin
    if (currentlevel >= level) then
        raise warning '%',message;
    end if;
end;
$$ language plpgsql;

/****************************************************************************
 * Procedure: sys_xs_sbss.create_binding_credential
 * 
 * This stored procedure can be called by a servicebroker during the 
 * binding operation to create credentials for the binding. 
 * 
 * Note: The procedure can be called multiple times to create multiple
 *       sets of credentials for a single tuple of p_instance_id and p_binding_id
 *       up to a maximum number of credentials p_max_credentials_per_binding.  
 *       The maximum can be adapted via the sys_xs_sbss.change_config.
 */     
create type sys_xs_sbss.user_info as (service_user_name varchar(256), service_user_password varchar(256) ); 

create or replace function sys_xs_sbss.create_binding_credential(
    in  p_instance_id                           varchar(256),
    in  p_binding_id                            varchar(256))
    returns                                     sys_xs_sbss.user_info
    security definer
as $$
    declare p_config                            sys_xs_sbss.config;
    declare p_returndata                        sys_xs_sbss.user_info;
    declare p_current_servicebroker_user_name   text;
    declare p_prior_servicebroker_user_name     text;
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
    
    -- Determine the servicebroker's technical user, which is the name of the Session User 
    select session_user into p_current_servicebroker_user_name;
    
    -- Check if prior bindings already exist. 
    -- If yes, ensure that the current servicebroker user fits to the prior servicebroker user
    select * 
        from sys_xs_sbss.bindings 
        into p_bindings_row
        where bindings.instance_id = p_instance_id
        limit 1;
    if found then
        p_prior_servicebroker_user_name = p_bindings_row.servicebroker_user_name;
        if (p_prior_servicebroker_user_name != '') then
            if (p_prior_servicebroker_user_name != p_current_servicebroker_user_name) then
                raise exception 'Credential generation failed for servicebroker user (%). A credential for p_instance_id (%) has been created already by another servicebroker user (%). ', p_current_servicebroker_user_name, p_instance_id, p_prior_servicebroker_user_name; 
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
$$ language plpgsql;
grant execute on function sys_xs_sbss.create_binding_credential(varchar(256),varchar(256)) to sbss_user;

/****************************************************************************
 * Procedure: sys_xs_sbss.validate_binding_credential
 * 
 * This stored procedure can be called by a service implementation to check 
 * the credentials that were provided by an application to this service 
 * implementation. 
 * 
 * In case of a successful credential validation, the service instance 
 * (instance_id and binding_id) of the found instance are returned. 
 * 
 * In case of an erroneous credential validation, empty values are returned. 
 * The cause of the error is (depending on the selected audit level) sent 
 * as a "RAISE WARNING" message to the Postgres log (depending on the 
 * Postgres configuration of the container) and to the caller.
 * 
 */     
create type sys_xs_sbss.service as (instance_id varchar(256), binding_id varchar(256)); 

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
    
    -- Determine the servicebroker's technical user, which is the name of the Session User 
    select session_user into p_current_servicebroker_user_name;
    
    -- Find credential
    select * into p_bindings_row 
        from sys_xs_sbss.bindings 
        where (p_service_user_name = bindings.service_user_name);
    if not found then
        p_message := format('Credential validation failed for servicebroker user (%I). No credential (%I) found.',p_current_servicebroker_user_name,p_service_user_name);
        perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level); 
        return p_returndata; 
    end if;
    
    -- Ensure that validating servicebroker user is the same as the user that generated the credential
    if (p_bindings_row.servicebroker_user_name != '') then
        if (p_bindings_row.servicebroker_user_name != p_current_servicebroker_user_name) then
            raise exception 'Credential validation failed for servicebroker user (%). The credential (%) has been generated by another servicebroker user (%). ', P_current_servicebroker_user_name, p_service_user_name, p_bindings_row.servicebroker_user_name; 
        end if;
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
            perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level);
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
$$ language plpgsql;  
grant execute on function sys_xs_sbss.validate_binding_credential(text, text) to sbss_user;

/****************************************************************************
 * Procedure: sys_xs_sbss.drop_binding_credential
 *
 * When a servicebroker received a unbind API call, it can call this 
 * procedure to remove the associated binding credentials again.  
 *
 * Parameters:
 *     p_instance_id   The instance ID as given to the servicebroker by the 
 *                     Cloud Controller
 *     p_binding_id    The binding ID as given to the servicebroker by the
 *                     Cloud Controller
 *     p_deleted_binding_credentials  Number of deleted credentials.
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

    -- Determine the servicebroker's technical user, which is the name of the Session User 
    select session_user into p_current_servicebroker_user_name;
    
    for p_service_user_name in 
        select service_user_name 
            from sys_xs_sbss.bindings 
            where (p_instance_id = bindings.instance_id) and (p_binding_id = bindings.binding_id) and (p_current_servicebroker_user_name = bindings.servicebroker_user_name) loop
        p_deleted_binding_credentials := p_deleted_binding_credentials+1;
        p_message := format('Removing binding credential (%I) for servicebroker user (%I), p_instance_id (%I) and p_binding_id (%I).', p_service_user_name, p_current_servicebroker_user_name, p_instance_id, p_binding_id);
        perform sys_xs_sbss.write_audit(p_message,'verbose',p_config.audit_level); 
    end loop;
    
    delete 
        from sys_xs_sbss.bindings 
        where (p_instance_id = bindings.instance_id) and (p_binding_id = bindings.binding_id) and (p_current_servicebroker_user_name = bindings.servicebroker_user_name);
    p_message := format('Removed %I binding credentials for servicebroker user (%I), p_instance_id (%I) and p_binding_id (%I).', p_deleted_binding_credentials, p_current_servicebroker_user_name, p_instance_id, p_binding_id);
    perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level); 
end;
$$ language plpgsql;
grant execute on function sys_xs_sbss.drop_binding_credential(varchar(256), varchar(256)) to sbss_user;

/****************************************************************************
 * Procedure: sys_xs_sbss.drop_all_binding_credentials
 * 
 * When a servicebroker received a delete instance API call, it can call 
 * this procedure to remove all binding credentials associated to all 
 * bindings of said instance. 
 * 
 * Parameters:
 *       p_instance_id   The instance ID as given to the servicebroker by the 
 *                       Cloud Controller
 *       p_deleted_binding_credentials  Number of deleted credentials.
 */   
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
    
    for p_service_user_name, p_binding_id in 
        select service_user_name, binding_id
            from sys_xs_sbss.bindings 
            where (p_instance_id = bindings.instance_id) and (p_current_servicebroker_user_name = bindings.servicebroker_user_name) loop
        p_deleted_binding_credentials := p_deleted_binding_credentials+1;
        p_message := format('Removing binding credential (%I) for servicebroker user (%I), p_instance_id (%I) and binding_id (%I).', p_service_user_name, p_current_servicebroker_user_name, p_instance_id, p_binding_id);
        perform sys_xs_sbss.write_audit(p_message,'verbose',p_config.audit_level); 
    end loop;
    delete 
        from sys_xs_sbss.bindings 
        where (p_instance_id = bindings.instance_id) and (p_current_servicebroker_user_name = bindings.servicebroker_user_name);
    p_message := format('Removed %I binding credentials for servicebroker user (%I) and p_instance_id (%I).', p_deleted_binding_credentials, p_current_servicebroker_user_name, p_instance_id);
    perform sys_xs_sbss.write_audit(p_message,'normal',p_config.audit_level); 
end;
$$ language plpgsql;
grant execute on function sys_xs_sbss.drop_all_binding_credentials(varchar(256)) to sbss_user;

/****************************************************************************
 * Procedure: sys_xs_sbss.change_config
 * 
 * The configuration of SBSS has already some sensible default values. 
 * If one knows what one is doing, then it is possible with this stored 
 * procedure to change (within limits) the default values. 
 */
create or replace function sys_xs_sbss.change_config(
    p_user_name_entropy_bytes           int,
    p_user_pass_entropy_bytes           int,
    p_salt_bytes                        int,
    p_max_pass_fail_attempts            int, 
    p_max_credentials_per_binding       int,
    p_audit_level                       audit_level_type)
    returns                             void
    security definer
as $$  
begin
    update sys_xs_sbss.config set 
        user_name_entropy_bytes = p_user_name_entropy_bytes, 
        user_pass_entropy_bytes = p_user_pass_entropy_bytes,
        salt_bytes = p_salt_bytes,
        max_pass_fail_attempts = p_max_pass_fail_attempts,
        max_credentials_per_binding = p_max_credentials_per_binding,
        audit_level = p_audit_level,
        creation_time = now();
end;
$$ language plpgsql;
