import { LatestStakeInfoEntity } from './../stake/latest-stake-info.entity';
import { Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MarketService } from '../../market/market.service';
import { BalanceModel, StakeBalanceType } from './wallet-balance.model';
import { Repository } from 'typeorm';
import { WalletEntity } from './wallet.entity';
import { ActiveWalletsEntity } from './active-wallets.entity';
import { RpcService } from '../rpc/rpc.service';
import { UtilsService } from 'src/common/utils.service';
export declare class WalletService {
    private cacheManager;
    private walletRepository;
    private latestStakeInfoRepository;
    private activeWalletsRepository;
    private marketInfo;
    private rpcService;
    private utilsService;
    logger: Logger;
    constructor(cacheManager: Cache, walletRepository: Repository<WalletEntity>, latestStakeInfoRepository: Repository<LatestStakeInfoEntity>, activeWalletsRepository: Repository<ActiveWalletsEntity>, marketInfo: MarketService, rpcService: RpcService, utilsService: UtilsService);
    getBalanceByAddress(address: string): Promise<{
        theta: {
            amount: number;
            fiat_currency_value: {
                usd: number;
                cny: number;
                eur: number;
            };
        };
        theta_fuel: {
            amount: number;
            fiat_currency_value: {
                usd: number;
                cny: number;
                eur: number;
            };
        };
    }>;
    getStakeInfoByAddress(address: string): Promise<{
        stake_to_guardian: StakeBalanceType[];
        stake_to_elite_node: StakeBalanceType[];
        stake_to_vcp: StakeBalanceType[];
    }>;
    getALlBalance(address: string): Promise<BalanceModel>;
    getUsdRate(): Promise<{
        CNY: number;
        EUR: number;
    }>;
    markActive(wallets: Array<{
        address: string;
        timestamp: number;
    }>): Promise<void>;
    getActiveWallet(startTime: any): Promise<ActiveWalletsEntity[]>;
    getWalletByAddress(address: string): Promise<WalletEntity>;
}
