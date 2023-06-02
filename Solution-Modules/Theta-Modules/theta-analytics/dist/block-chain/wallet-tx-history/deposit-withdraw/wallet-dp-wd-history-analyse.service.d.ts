import { UtilsService } from 'src/common/utils.service';
import { DataSource } from 'typeorm';
import { RpcService } from 'src/block-chain/rpc/rpc.service';
export declare class WalletDpWdHistoryAnalyseService {
    private utilsService;
    private readonly connection;
    private rpcService;
    private readonly logger;
    private recordLogFile;
    private runner;
    private stakeRunner;
    constructor(utilsService: UtilsService, connection: DataSource, rpcService: RpcService);
    analyse(): Promise<void>;
    private analyseBlock;
}
