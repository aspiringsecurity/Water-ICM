import { NftStatisticsEntity } from './../../statistics/nft/nft-statistics.entity';
import { NftTransferRecordEntity } from 'src/block-chain/smart-contract/nft/nft-transfer-record.entity';
import { BlockModel, GetAccountModel, GetTransactionModel } from '../rpc/rpc.model';
import { BlokcListEntity } from './block-list.entity';
import { TransactionEntity } from './transaction.entity';
declare const PaginatedBlockList_base: import("@nestjs/common").Type<import("src/common/common.model").IPaginatedType<BlokcListEntity>>;
export declare class PaginatedBlockList extends PaginatedBlockList_base {
}
declare const PaginatedTransactions_base: import("@nestjs/common").Type<import("src/common/common.model").IPaginatedType<TransactionEntity>>;
export declare class PaginatedTransactions extends PaginatedTransactions_base {
}
export declare enum SEARCH_TYPE_ENUM {
    none = 0,
    block = 1,
    transaction = 2,
    account = 3,
    nft = 4
}
export declare class ExplorerSearchModelType {
    transaction_rpc?: GetTransactionModel;
    transaction?: TransactionEntity;
    transaction_nft_records?: Array<NftTransferRecordEntity>;
    search_type?: SEARCH_TYPE_ENUM;
    block?: BlockModel;
    nft_statistics?: Array<NftStatisticsEntity>;
    total?: number;
    account?: GetAccountModel;
    block_extend?: BlokcListEntity;
}
export declare class ExplorerModelType {
    blockList: PaginatedBlockList;
    transactions: PaginatedTransactions;
    search: ExplorerSearchModelType;
}
export {};
