import { RpcService } from './../rpc/rpc.service';
import { Repository } from 'typeorm';
import { StakeStatisticsEntity } from './stake-statistics.entity';
import { Logger } from '@nestjs/common';
import { StakeRewardEntity } from './stake-reward.entity';
import { Cache } from 'cache-manager';
export declare class StakeService {
    private stakeStatisticsRepository;
    private stakeRewardRepository;
    private cacheManager;
    private rpcService;
    logger: Logger;
    constructor(stakeStatisticsRepository: Repository<StakeStatisticsEntity>, stakeRewardRepository: Repository<StakeRewardEntity>, cacheManager: Cache, rpcService: RpcService);
    getLatestFinalizedBlock(): Promise<string>;
    getLatestStakeStatics(): Promise<unknown>;
    getStakeReward(wallet_address: string, period: 'last_24_hour' | 'last_3_days' | 'last_7_days' | 'last_30_days'): Promise<number>;
}
