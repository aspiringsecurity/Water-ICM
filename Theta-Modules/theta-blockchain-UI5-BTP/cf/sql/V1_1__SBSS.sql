drop index bindings_servicebroker_user_name_instance_id_binding_id_idx;
create index on sys_xs_sbss.bindings(instance_id, binding_id);

revoke all on function sys_xs_sbss.create_binding_credential(varchar(256),varchar(256)) from public;
revoke all on function sys_xs_sbss.validate_binding_credential(text, text) from public;
revoke all on function sys_xs_sbss.drop_binding_credential(varchar(256), varchar(256)) from public;
revoke all on function sys_xs_sbss.drop_all_binding_credentials(varchar(256)) from public;

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
        begin
            -- service_user_name_tmp has not yet been taken. 
            insert 
                into sys_xs_sbss.bindings ( service_user_name, service_user_password_hash, service_user_password_salt, failed_credential_checks, servicebroker_user_name, instance_id, binding_id, creation_time )                 
                values 
                    (p_service_user_name, p_service_user_password_hash, p_service_user_password_salt, 0, p_current_servicebroker_user_name, p_instance_id, p_binding_id,
                     current_timestamp);
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
$$ language plpgsql;
grant execute on function sys_xs_sbss.create_binding_credential(varchar(256),varchar(256)) to sbss_user;

