import { Logger } from '@nestjs/common';
import { NftTransferRecordEntity } from 'src/block-chain/smart-contract/nft/nft-transfer-record.entity';
import { MarketService } from 'src/market/market.service';
import { Repository } from 'typeorm';
import { NftStatisticsEntity } from './nft-statistics.entity';
import { NftDetailByDate } from './nft-statistics.model';
export declare enum NftStatisticsOrderByType {
    last_24_h_users = 0,
    last_7_days_users = 1,
    last_30_days_users = 2,
    last_24_h_transactions = 3,
    last_7_days_transactions = 4,
    last_30_days_transactions = 5,
    last_24_h_volume = 6,
    last_7_days_volume = 7,
    last_30_days_volume = 8
}
export declare class NftStatisticsService {
    private nftStatisticsRepository;
    private nftTransferRecordRepository;
    private marketService;
    logger: Logger;
    constructor(nftStatisticsRepository: Repository<NftStatisticsEntity>, nftTransferRecordRepository: Repository<NftTransferRecordEntity>, marketService: MarketService);
    getNft(orderBy: NftStatisticsOrderByType, take: number, after: string | undefined, skip?: number, search?: string): Promise<[boolean, number, Array<NftStatisticsEntity>]>;
    updateNftImg(contractAddress: string, imgUri: string): Promise<{}>;
    getNftInfo(contractAddress: string): Promise<NftStatisticsEntity | {
        name: string;
        contract_uri_detail: string;
        img_uri: string;
    }>;
    formatNftStatistics(contractUri: string, nftStatistics: Array<NftTransferRecordEntity>, timezoneOffset: number): Promise<{
        by_24_hours: Array<NftDetailByDate>;
        by_7_days: Array<NftDetailByDate>;
        by_30_days: Array<NftDetailByDate>;
    }>;
    nftStatistics24H(contractAddress: string, contractUri: string, timezoneOffset: number): Promise<NftDetailByDate[]>;
    nftStatistics7Days(contractAddress: string, contractUri: string, timezoneOffset: number): Promise<NftDetailByDate[]>;
    nftStatistics30Days(contractAddress: string, contractUri: string, timezoneOffset: number): Promise<NftDetailByDate[]>;
    isNftExist(name: string): Promise<NftStatisticsEntity>;
}
