import { DataSource } from 'typeorm';
import { NftService } from 'src/block-chain/smart-contract/nft/nft.service';
import { UtilsService } from 'src/common/utils.service';
export declare class NftAnalyseService {
    private nftService;
    private utilsService;
    private smartContractConnectionInjected;
    private nftConnectionInjected;
    private readonly logger;
    analyseKey: string;
    private smartContractConnectionRunner;
    private nftConnectionRunner;
    private heightConfigFile;
    private retriveIdFile;
    private imgPathRestoreId;
    constructor(nftService: NftService, utilsService: UtilsService, smartContractConnectionInjected: DataSource, nftConnectionInjected: DataSource);
    analyse(loop: number): Promise<void>;
    autoRefetchTokenUri(loop: number): Promise<void>;
    retriveNfts(): Promise<void>;
    restoreNftImgPath(): Promise<void>;
}
