import { SmartContractEntity } from '../smart-contract.entity';
import { NftBalanceEntity } from './nft-balance.entity';
import { NftTransferRecordEntity } from './nft-transfer-record.entity';
export declare class NftType {
}
export declare class NftMetaType {
    unique_holder: number;
    total: number;
}
declare const PaginatedNftBalance_base: import("@nestjs/common").Type<import("src/common/common.model").IPaginatedType<NftBalanceEntity>>;
export declare class PaginatedNftBalance extends PaginatedNftBalance_base {
}
declare const PaginatedSmartContract_base: import("@nestjs/common").Type<import("src/common/common.model").IPaginatedType<SmartContractEntity>>;
export declare class PaginatedSmartContract extends PaginatedSmartContract_base {
}
declare const PaginatedNftTransferRecord_base: import("@nestjs/common").Type<import("src/common/common.model").IPaginatedType<NftTransferRecordEntity>>;
export declare class PaginatedNftTransferRecord extends PaginatedNftTransferRecord_base {
}
export {};
