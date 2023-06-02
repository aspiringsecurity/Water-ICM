import { NftDetailType } from './nft-statistics.model';
import { NftStatisticsService } from './nft-statistics.service';
import { Cache } from 'cache-manager';
export declare class NftDetailResolver {
    private nftStatisticsService;
    private cacheManager;
    constructor(nftStatisticsService: NftStatisticsService, cacheManager: Cache);
    NftDetail(contractAddress: string): Promise<import("./nft-statistics.entity").NftStatisticsEntity | {
        name: string;
        contract_uri_detail: string;
        img_uri: string;
    }>;
    by_24_hours(nftDetail: NftDetailType, timezoneOffset: number): Promise<unknown>;
    by_7_days(nftDetail: NftDetailType, timezoneOffset: number): Promise<unknown>;
    by_30_days(nftDetail: NftDetailType, timezoneOffset: number): Promise<unknown>;
}
