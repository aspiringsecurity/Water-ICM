import { THETA_TRANSACTION_TYPE_ENUM } from './../tx/theta.enum';
import { THETA_BLOCK_STATUS_ENUM } from '../tx/theta.enum';
import { GetVcpByHeightModel } from './rpc-vcp.model';
import { GetGcpByHeightModel } from './rpc-gcp.model';
import { GetEenpByHeightModel } from './rpc-eenp.model';
import { BlockHashStakeRewardDistributionRuleSetPairsModel } from './rpc-stake-reward-distribution-by-height.model';
export declare enum STAKE_PURPOSE_ENUM {
    validator = 0,
    guardian = 1,
    elite_edge_node = 2
}
export declare class TokenType {
    thetawei: string;
    tfuelwei: string;
}
export declare class HolderType {
    address: string;
    coins: TokenType;
}
export declare class GetVersionModel {
    version: string;
    git_hash: string;
    timestamp: string;
}
export declare class receiptType {
    TxHash: string;
    Logs: Array<receiptLogType>;
    EvmRet: string;
    ContractAddress: string;
    GasUsed: number;
    EvmErr: string;
}
export declare class receiptLogType {
    address: string;
    topics: Array<string>;
    data: string;
}
export declare class GetAccountModel {
    sequence: number;
    coins: TokenType;
    reserved_funds: Array<number>;
    last_updated_block_height: string;
    root: string;
    code: string;
}
export declare class HccVoteType {
    Block: string;
    Height: number;
    Epoch: number;
    ID: string;
    Signature: string;
}
export declare class HccType {
    Votes: Array<HccVoteType>;
    BlockHash: string;
}
export declare class GuardianVotesType {
    Block: string;
    Gcp: string;
    Multiplies: Array<number>;
}
export declare class EliteEdgeNodeVotesType {
    Block: string;
    Multiplies: Array<number>;
    Addresses: Array<string>;
}
export declare class SourceTargetType {
    address: string;
    sequence: string;
    coins: TokenType;
    signature: string;
}
export declare class BlockModel {
    chain_id: string;
    epoch: string;
    height: string;
    parent: string;
    transactions_hash: string;
    state_hash: string;
    timestamp: string;
    proposer: string;
    children: Array<string>;
    status: THETA_BLOCK_STATUS_ENUM;
    hash: string;
    transactions: Array<transactionType>;
    hcc: HccType;
    guardian_votes: GuardianVotesType;
    elite_edge_node_votes: EliteEdgeNodeVotesType;
}
export declare class proposerType {
    address: string;
    coins: TokenType;
    sequence: string;
    signature: string;
}
export declare class inputOutputType {
    address: string;
    coins: TokenType;
}
export declare class transactionRawType {
    proposer?: proposerType;
    fee?: TokenType;
    outputs?: Array<inputOutputType>;
    inputs?: Array<inputOutputType>;
    gas_limit?: string;
    gas_price?: string;
    gas_used?: string;
    from?: proposerType;
    to?: proposerType;
    data?: string;
    block_height?: string;
    payment_sequence?: string;
    reserve_sequence?: string;
    resource_id?: string;
    source?: SourceTargetType;
    target?: SourceTargetType;
    collateral?: TokenType;
    resource_ids?: Array<string>;
    duration?: string;
    purpose?: STAKE_PURPOSE_ENUM;
    holder?: HolderType;
}
export declare class transactionType {
    raw: transactionRawType;
    type: THETA_TRANSACTION_TYPE_ENUM;
    hash: string;
    receipt?: receiptType;
}
export declare class GetTransactionModel {
    block_hash: string;
    block_height: string;
    type: THETA_TRANSACTION_TYPE_ENUM;
    status: string;
    hash: string;
    transaction: transactionRawType;
    receipt?: receiptType;
}
export declare class NodeStatusModel {
    address: string;
    chain_id: string;
    peer_id: string;
    latest_finalized_block_hash: string;
    latest_finalized_block_height: string;
    latest_finalized_block_time: string;
    latest_finalized_block_epoch: string;
    current_epoch: string;
    current_height: string;
    current_time: string;
    syncing: false;
    genesis_block_hash: string;
}
export declare class GetPendingTransactionsModel {
    tx_hashes: Array<string>;
}
export declare class ThetaRpcModel {
    GetVersion: GetVersionModel;
    GetAccount: GetAccountModel;
    GetBlock: BlockModel;
    GetBlockByHeight: BlockModel;
    GetStatus: NodeStatusModel;
    GetTransaction: GetTransactionModel;
    GetVcpByHeight: GetVcpByHeightModel;
    GetGcpByHeight: GetGcpByHeightModel;
    GetEenpByHeight: GetEenpByHeightModel;
    GetPendingTransactions: GetPendingTransactionsModel;
    GetStakeRewardDistributionByHeight: BlockHashStakeRewardDistributionRuleSetPairsModel;
}
