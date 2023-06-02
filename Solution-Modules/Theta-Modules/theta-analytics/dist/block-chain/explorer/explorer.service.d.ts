import { WalletService } from './../wallet/wallets.service';
import { CountEntity } from './count.entity';
import { TransactionEntity } from './transaction.entity';
import { BlokcListEntity } from './block-list.entity';
import { Repository } from 'typeorm';
export declare class ExplorerService {
    private blockListRepository;
    private transactionRepository;
    private countRepository;
    private walletService;
    private logger;
    constructor(blockListRepository: Repository<BlokcListEntity>, transactionRepository: Repository<TransactionEntity>, countRepository: Repository<CountEntity>, walletService: WalletService);
    getBlockList(take: number, after: string | undefined, skip?: number): Promise<[boolean, number, Array<BlokcListEntity>]>;
    getTransactions(take: number, after: string | undefined, skip?: number, blockHeight?: number): Promise<[boolean, number, Array<TransactionEntity>]>;
    getBlockInfo(heightOrHash: number | string): Promise<false | BlokcListEntity>;
    getTransactionInfo(hash: any): Promise<false | TransactionEntity>;
    getAccount(walletAddress: string): Promise<false | import("../wallet/wallet.entity").WalletEntity>;
    getAccountTransactions(walletAddress: string, take: number, skip: number): Promise<{
        wallet: import("../wallet/wallet.entity").WalletEntity;
        txs: TransactionEntity[];
        total: any;
    }>;
}
