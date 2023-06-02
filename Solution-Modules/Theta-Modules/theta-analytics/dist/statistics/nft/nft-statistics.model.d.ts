import { NftStatisticsEntity } from './nft-statistics.entity';
declare const PaginatedNftStatistics_base: import("@nestjs/common").Type<import("src/common/common.model").IPaginatedType<NftStatisticsEntity>>;
export declare class PaginatedNftStatistics extends PaginatedNftStatistics_base {
}
export declare class NftDetailType {
    contract_uri: string;
    smart_contract_address: string;
    contract_uri_detail: string;
    name: string;
    img_uri: string;
    description: string;
    unique_owners: number;
    items: number;
    destroyed_items: number;
    update_timestamp: number;
    contract_uri_update_timestamp: number;
    by_24_hours: Array<NftDetailByDate>;
    by_7_days: Array<NftDetailByDate>;
    by_30_days: Array<NftDetailByDate>;
}
export declare class NftDetailByDate {
    date: number;
    volume: number;
    transactions: number;
    users: number;
}
export {};
