import { WalletDpWdHistoryEntity } from './deposit-withdraw/wallet-dp-wd-history.entity';
import { WalletSendHistoryEntity } from './send/wallet-send-history.entity';
import { NftTransferRecordEntity } from 'src/block-chain/smart-contract/nft/nft-transfer-record.entity';
import { StakeRewardEntity } from './../stake/stake-reward.entity';
import { TransactionEntity } from './../explorer/transaction.entity';
declare const PaginatedHistoryTransactions_base: import("@nestjs/common").Type<import("src/common/common.model").IPaginatedType<TransactionEntity>>;
export declare class PaginatedHistoryTransactions extends PaginatedHistoryTransactions_base {
}
export declare class HistoryTransactionsModel {
    stake_rewards: Array<StakeRewardEntity>;
    nft_transfers: Array<NftTransferRecordEntity>;
    send_transfers: Array<WalletSendHistoryEntity>;
    deposit_withdraw: Array<WalletDpWdHistoryEntity>;
    start_time: number;
    end_time: number;
}
export {};
