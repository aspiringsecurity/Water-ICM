import { DataSource } from 'typeorm';
import { THETA_BLOCK_INTERFACE } from 'theta-ts-sdk/src/types/interface';
import { UtilsService } from 'src/common/utils.service';
import { RpcService } from '../rpc/rpc.service';
export declare class TxAnalyseService {
    private utilsService;
    private readonly connection;
    private rpcService;
    private readonly logger;
    analyseKey: string;
    private counter;
    private txConnectionRunner;
    private heightConfigFile;
    constructor(utilsService: UtilsService, connection: DataSource, rpcService: RpcService);
    analyse(): Promise<void>;
    handleOrderCreatedEvent(block: THETA_BLOCK_INTERFACE, latestFinalizedBlockHeight: number): Promise<void>;
}
