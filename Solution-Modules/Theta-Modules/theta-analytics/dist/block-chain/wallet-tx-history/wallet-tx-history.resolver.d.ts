import { HistoryTransactionsModel } from './wallet-tx-history.model';
import { WalletTxHistoryService } from './wallet-tx-history.service';
export declare class WalletTxHistoryResolver {
    private walletTxHistoryService;
    constructor(walletTxHistoryService: WalletTxHistoryService);
    TxHistory(walletAddress: string, take: number, skip: number, txType: number): Promise<{
        hasNextPage: boolean;
        nodes: import("../explorer/transaction.entity").TransactionEntity[];
        totalCount: number;
        take: number;
        skip: number;
        endCursor: number;
    }>;
    WalletActivityHistory(info: any, walletAddress: string, startTime: number, endTime: number): Promise<HistoryTransactionsModel | {
        start_time: number;
        end_time: number;
    }>;
}
