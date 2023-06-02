import { Logger } from '@nestjs/common';
import { SmartContractEntity, SmartContractProtocolEnum } from './smart-contract.entity';
import { Repository } from 'typeorm';
import { SmartContractCallRecordEntity } from './smart-contract-call-record.entity';
import { RankByEnum } from './smart-contract.model';
import { NftService } from './nft/nft.service';
import { SolcService } from 'src/common/solc.service';
import { UtilsService } from 'src/common/utils.service';
export declare class SmartContractService {
    private smartContractRepository;
    private smartContractRecordRepository;
    private nftService;
    private solcService;
    private utilsService;
    logger: Logger;
    constructor(smartContractRepository: Repository<SmartContractEntity>, smartContractRecordRepository: Repository<SmartContractCallRecordEntity>, nftService: NftService, solcService: SolcService, utilsService: UtilsService);
    getSmartContract(rankBy: RankByEnum, max?: number): Promise<SmartContractEntity[]>;
    searchSmartContract(protocol: SmartContractProtocolEnum | null, name: string | null, rankBy: RankByEnum, max?: number): Promise<SmartContractEntity[]>;
    getSmartContractNum(): Promise<number>;
    getSmartContractRecord(): Promise<SmartContractCallRecordEntity[]>;
    getOrAddSmartContract(contractAddress: string, height: number): Promise<SmartContractEntity>;
    updateCallTimesByPeriod(): Promise<void>;
    verifySmartContract(address: string, sourceCode: string, byteCode: string, version: string, versionFullName: string, optimizer: boolean, optimizerRuns: number): Promise<SmartContractEntity>;
    directVerifySmartContract(address: string, sourceCode: string, byteCode: string, optimizer: string, optimizerRuns: number, verificationDate: number, compilerVersion: string, name: string, functionHash: string, constructorArguments: any, abi: string): Promise<SmartContractEntity>;
    getVerifyInfo(address: string, sourceCode: string, byteCode: string, version: string, versionFullName: string, optimizer: boolean, optimizerRuns: number): Promise<any>;
    getContractByAddress(address: string): Promise<SmartContractEntity>;
}
