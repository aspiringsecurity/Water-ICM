import { SmartContractEntity } from './smart-contract.entity';
export declare class SmartContractStatisticsType {
    CallRank: Array<SmartContractEntity>;
    Search: Array<SmartContractEntity>;
}
export declare class UpdateRecordType {
    affected_rows: number;
}
export declare class SmartContractScType {
    address: string;
    abi: string;
    source_code: string;
    verification_date: string;
    compiler_version: string;
    optimizer: string;
    optimizerRuns: number;
    name: string;
    function_hash: string;
    constructor_arguments: string;
}
export declare class SmartContractVerifyType {
    is_verified: boolean;
    smart_contract: SmartContractScType;
}
export declare enum RankByEnum {
    call_times = 0,
    last_24h_call_times = 1,
    last_seven_days_call_times = 2
}
