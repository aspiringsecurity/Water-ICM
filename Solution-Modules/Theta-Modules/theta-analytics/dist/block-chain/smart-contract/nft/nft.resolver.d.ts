import { NftBalanceEntity } from './nft-balance.entity';
import { NftTransferRecordEntity } from './nft-transfer-record.entity';
import { NftService } from './nft.service';
export declare class NftResolver {
    private nftService;
    constructor(nftService: NftService);
    Nfts(): Promise<{}>;
    SearchNfts(name: string, take: number, after: string): Promise<{
        hasNextPage: boolean;
        nodes: import("../smart-contract.entity").SmartContractEntity[];
        totalCount: number;
    }>;
    Balance(walletAddress: string, search: string, take: number, skip: number, after: string): Promise<{
        endCursor: string;
        hasNextPage: boolean;
        nodes: NftBalanceEntity[];
        totalCount: number;
        skip: number;
    }>;
    NftsForContract(walletAddress: string, contractAddress: string, take: number, after: string): Promise<{
        endCursor: string;
        hasNextPage: boolean;
        nodes: NftBalanceEntity[];
        totalCount: number;
    }>;
    NftTransfers(walletAddress: string, take: number, after: string): Promise<{
        endCursor: string;
        hasNextPage: boolean;
        nodes: NftTransferRecordEntity[];
        totalCount: number;
    }>;
    NftTransfersByBlock(blockHeight: number): Promise<NftTransferRecordEntity[]>;
    NftOwners(contractAddress: string, take: number, skip: number, after: string): Promise<{
        endCursor: string;
        hasNextPage: boolean;
        nodes: NftBalanceEntity[];
        skip: number;
        totalCount: number;
    }>;
    ContractNftTransfers(contractAddress: string, tokenId: number, take: number, after: string, skip: number): Promise<{
        endCursor: string;
        hasNextPage: boolean;
        skip: number;
        nodes: NftTransferRecordEntity[];
        totalCount: number;
    }>;
    TokenIdOwners(tokenId: number, contractAddress: string): Promise<NftBalanceEntity>;
}
