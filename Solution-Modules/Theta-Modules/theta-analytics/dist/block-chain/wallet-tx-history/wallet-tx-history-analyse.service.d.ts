import { TransactionEntity } from './../explorer/transaction.entity';
import { UtilsService } from 'src/common/utils.service';
import { DataSource } from 'typeorm';
export declare class WalletTxHistoryAnalyseService {
    private utilsService;
    private walletConnectionInjected;
    private explorerConnectionInjected;
    private walletTxHistoryConnectionInjected;
    private readonly logger;
    private walletConnectionRunner;
    private explorerConnectionRunner;
    private walletTxHistoryConnectionRunner;
    private heightConfigFile;
    constructor(utilsService: UtilsService, walletConnectionInjected: DataSource, explorerConnectionInjected: DataSource, walletTxHistoryConnectionInjected: DataSource);
    analyseData(): Promise<void>;
    addWallet(record: TransactionEntity, walletsToupdate: {
        [index: string]: Array<string>;
    }): Promise<void>;
    updateWalletTxHistory(walletsToupdate: {
        [index: string]: Array<string>;
    }): Promise<void>;
}
