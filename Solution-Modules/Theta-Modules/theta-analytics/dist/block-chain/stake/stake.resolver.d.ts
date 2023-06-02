import { StakeService } from './stake.service';
import { Logger } from '@nestjs/common';
import { StakeRewardModel } from './stake.model';
import { MarketService } from '../../market/market.service';
import { WalletService } from '../wallet/wallets.service';
export declare class StakeResolver {
    private stakeService;
    private marketInfo;
    private walletService;
    logger: Logger;
    constructor(stakeService: StakeService, marketInfo: MarketService, walletService: WalletService);
    StakeStatistics(): Promise<unknown>;
    StakeReward(info: any, wallet_address: string): Promise<StakeRewardModel>;
}
