export declare enum SmartContractProtocolEnum {
    unknow = 1,
    tnt721 = 2,
    tnt20 = 3
}
export declare class SmartContractEntity {
    id: number;
    contract_address: string;
    height: number;
    verified: boolean;
    protocol: SmartContractProtocolEnum;
    abi: string;
    source_code: string;
    byte_code: string;
    verification_date: number;
    compiler_version: string;
    optimizer: string;
    optimizerRuns: number;
    name: string;
    function_hash: string;
    constructor_arguments: string;
    call_times: number;
    last_seven_days_call_times: number;
    last_24h_call_times: number;
    call_times_update_timestamp: number;
    verification_check_timestamp: number;
    contract_uri: string;
    contract_uri_detail: string;
    latest_record_parse_height: number;
    create_date: number;
    update_date: number;
}
