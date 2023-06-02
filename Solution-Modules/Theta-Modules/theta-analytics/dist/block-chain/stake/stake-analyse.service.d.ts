import { RpcService } from 'src/block-chain/rpc/rpc.service';
import { DataSource } from 'typeorm';
import { THETA_BLOCK_INTERFACE } from 'theta-ts-sdk/src/types/interface';
import BigNumber from 'bignumber.js';
import { UtilsService } from 'src/common/utils.service';
export declare class StakeAnalyseService {
    private utilsService;
    private rpcService;
    private stakeConnectionInjected;
    private readonly logger;
    analyseKey: string;
    private counter;
    private stakeConnectionRunner;
    private heightConfigFile;
    constructor(utilsService: UtilsService, rpcService: RpcService, stakeConnectionInjected: DataSource);
    analyse(): Promise<void>;
    handleOrderCreatedEvent(block: THETA_BLOCK_INTERFACE, latestFinalizedBlockHeight: number): Promise<void>;
    updateCheckPoint(block: THETA_BLOCK_INTERFACE): Promise<import("typeorm").InsertResult>;
    updateValidator(block: THETA_BLOCK_INTERFACE): Promise<[number, number, BigNumber, BigNumber] | false>;
    updateGuardian(block: THETA_BLOCK_INTERFACE): Promise<[number, number, BigNumber, BigNumber] | false>;
    updateEenp(block: THETA_BLOCK_INTERFACE): Promise<[number, number, BigNumber, BigNumber] | false>;
}
