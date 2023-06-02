import { TokenBalanceType } from '../wallet/wallet-balance.model';
export declare enum STAKE_NODE_TYPE_ENUM {
    validator = 0,
    guardian = 1,
    edge_cache = 2
}
export declare class Stake {
    source: string;
    amount: string;
    withdrawn: boolean;
    return_height: string;
}
export declare class StakeRewardModel {
    last_24_hour: TokenBalanceType;
    last_3_days: TokenBalanceType;
    last_7_days: TokenBalanceType;
}
