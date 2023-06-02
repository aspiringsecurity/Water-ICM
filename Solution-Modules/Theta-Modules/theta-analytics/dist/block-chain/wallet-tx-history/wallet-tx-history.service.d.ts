import { WalletDpWdHistoryEntity } from './deposit-withdraw/wallet-dp-wd-history.entity';
import { WalletSendHistoryEntity } from './send/wallet-send-history.entity';
import { NftTransferRecordEntity } from 'src/block-chain/smart-contract/nft/nft-transfer-record.entity';
import { StakeRewardEntity } from './../stake/stake-reward.entity';
import { THETA_TRANSACTION_TYPE_ENUM } from './../tx/theta.enum';
import { TransactionEntity } from './../explorer/transaction.entity';
import { Repository } from 'typeorm';
import { WalletTxHistoryEntity } from './wallet-tx-history.entity';
export declare class WalletTxHistoryService {
    private readonly walletTxHistoryRepository;
    private readonly transactionRepository;
    private readonly stakeRewardRepository;
    private readonly nftTransferRecordRepository;
    private readonly walletSendHistoryRepository;
    private readonly walletDpWdHistoryRepository;
    private readonly logger;
    constructor(walletTxHistoryRepository: Repository<WalletTxHistoryEntity>, transactionRepository: Repository<TransactionEntity>, stakeRewardRepository: Repository<StakeRewardEntity>, nftTransferRecordRepository: Repository<NftTransferRecordEntity>, walletSendHistoryRepository: Repository<WalletSendHistoryEntity>, walletDpWdHistoryRepository: Repository<WalletDpWdHistoryEntity>);
    getTransactions(wallet: string, take: number, skip: number, txType: THETA_TRANSACTION_TYPE_ENUM | undefined): Promise<[boolean, number, TransactionEntity[]]>;
    getActivityHistory(type: 'stake_rewards' | 'nft_transfers' | 'send_transfers' | 'deposit_withdraw', wallet: string, startTime: number, endTime: number): Promise<any>;
}
