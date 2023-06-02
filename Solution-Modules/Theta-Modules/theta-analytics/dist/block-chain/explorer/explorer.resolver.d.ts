import { NftStatisticsService } from './../../statistics/nft/nft-statistics.service';
import { NftService } from 'src/block-chain/smart-contract/nft/nft.service';
import { SmartContractService } from 'src/block-chain/smart-contract/smart-contract.service';
import { UtilsService } from './../../common/utils.service';
import { ExplorerService } from './explorer.service';
import { ExplorerSearchModelType } from './explorer.model';
import { RpcService } from '../rpc/rpc.service';
export declare class ExplorerResolver {
    private explorerService;
    private rpcService;
    private utilService;
    private smartContractService;
    private nftService;
    private nftStatisticsService;
    constructor(explorerService: ExplorerService, rpcService: RpcService, utilService: UtilsService, smartContractService: SmartContractService, nftService: NftService, nftStatisticsService: NftStatisticsService);
    Explorer(context: any): Promise<{}>;
    blockList(take: number, after: string, skip: number): Promise<{
        endCursor: string;
        hasNextPage: boolean;
        nodes: import("./block-list.entity").BlokcListEntity[];
        skip: number;
        totalCount: number;
    }>;
    transactions(take: number, blockHeight: number, after: string, skip: number): Promise<{
        endCursor: string;
        hasNextPage: boolean;
        nodes: import("./transaction.entity").TransactionEntity[];
        skip: number;
        totalCount: number;
    }>;
    search(search: string): Promise<ExplorerSearchModelType>;
}
