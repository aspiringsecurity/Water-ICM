export declare enum NftStatusEnum {
    invalid = 1,
    valid = 2
}
export declare class NftBalanceEntity {
    id: number;
    smart_contract_address: string;
    owner: string;
    from: string;
    contract_uri: string;
    base_token_uri: string;
    token_uri: string;
    name: string;
    img_uri: string;
    detail: string;
    token_id: number;
    refetch_times: number;
    create_date: Date;
    update_date: Date;
}
