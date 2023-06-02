import { SmartContractService } from './smart-contract.service';
import { RankByEnum, SmartContractStatisticsType } from './smart-contract.model';
import { NftService } from './nft/nft.service';
import { UtilsService } from 'src/common/utils.service';
import { SmartContractEntity, SmartContractProtocolEnum } from './smart-contract.entity';
import { Logger } from '@nestjs/common';
export declare class SmartContractResolver {
    private smartContractService;
    private nftService;
    private utilsService;
    logger: Logger;
    constructor(smartContractService: SmartContractService, nftService: NftService, utilsService: UtilsService);
    SmartContractStatistics(): Promise<{}>;
    CallRank(smartContract: SmartContractStatisticsType, rank_by: RankByEnum, take: number): Promise<SmartContractEntity[]>;
    Search(protocol: SmartContractProtocolEnum, name: string, rank_by: RankByEnum, take: number): Promise<SmartContractEntity[]>;
    verify(address: string, sourceCode: string, byteCode: string, version: string, versionFullName: string, optimizer: boolean, optimizerRuns: number): Promise<SmartContractEntity>;
    verifyWithThetaExplorer(address: string): Promise<SmartContractEntity>;
    updateRecord(address: string): Promise<{
        affected_rows: number;
    }>;
}
