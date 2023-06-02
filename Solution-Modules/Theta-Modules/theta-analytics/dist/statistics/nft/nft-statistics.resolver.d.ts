import { NftStatisticsEntity } from './nft-statistics.entity';
import { NftStatisticsOrderByType, NftStatisticsService } from './nft-statistics.service';
export declare class NftStatisticsResolver {
    private nftStatisticsService;
    constructor(nftStatisticsService: NftStatisticsService);
    NftStatistics(orderBy: NftStatisticsOrderByType, take: number, skip: number, search: string, after: string): Promise<{
        endCursor: string;
        hasNextPage: boolean;
        nodes: NftStatisticsEntity[];
        skip: number;
        totalCount: number;
    }>;
    updateNftImg(contractAddress: string, imgUri: string): Promise<{}>;
}
