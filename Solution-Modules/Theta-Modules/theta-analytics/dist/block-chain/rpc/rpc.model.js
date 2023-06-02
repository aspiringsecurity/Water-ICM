"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThetaRpcModel = exports.GetPendingTransactionsModel = exports.NodeStatusModel = exports.GetTransactionModel = exports.transactionType = exports.transactionRawType = exports.inputOutputType = exports.proposerType = exports.BlockModel = exports.SourceTargetType = exports.EliteEdgeNodeVotesType = exports.GuardianVotesType = exports.HccType = exports.HccVoteType = exports.GetAccountModel = exports.receiptLogType = exports.receiptType = exports.GetVersionModel = exports.HolderType = exports.TokenType = exports.STAKE_PURPOSE_ENUM = void 0;
const theta_enum_1 = require("./../tx/theta.enum");
const graphql_1 = require("@nestjs/graphql");
const theta_enum_2 = require("../tx/theta.enum");
const graphql_2 = require("graphql");
const rpc_vcp_model_1 = require("./rpc-vcp.model");
const rpc_gcp_model_1 = require("./rpc-gcp.model");
const rpc_eenp_model_1 = require("./rpc-eenp.model");
const rpc_stake_reward_distribution_by_height_model_1 = require("./rpc-stake-reward-distribution-by-height.model");
var STAKE_PURPOSE_ENUM;
(function (STAKE_PURPOSE_ENUM) {
    STAKE_PURPOSE_ENUM[STAKE_PURPOSE_ENUM["validator"] = 0] = "validator";
    STAKE_PURPOSE_ENUM[STAKE_PURPOSE_ENUM["guardian"] = 1] = "guardian";
    STAKE_PURPOSE_ENUM[STAKE_PURPOSE_ENUM["elite_edge_node"] = 2] = "elite_edge_node";
})(STAKE_PURPOSE_ENUM = exports.STAKE_PURPOSE_ENUM || (exports.STAKE_PURPOSE_ENUM = {}));
(0, graphql_1.registerEnumType)(STAKE_PURPOSE_ENUM, {
    name: 'STAKE_PURPOSE_ENUM'
});
let TokenType = class TokenType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TokenType.prototype, "thetawei", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TokenType.prototype, "tfuelwei", void 0);
TokenType = __decorate([
    (0, graphql_1.ObjectType)()
], TokenType);
exports.TokenType = TokenType;
let HolderType = class HolderType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HolderType.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenType),
    __metadata("design:type", TokenType)
], HolderType.prototype, "coins", void 0);
HolderType = __decorate([
    (0, graphql_1.ObjectType)()
], HolderType);
exports.HolderType = HolderType;
let GetVersionModel = class GetVersionModel {
};
__decorate([
    (0, graphql_1.Field)({ description: 'the version number' }),
    __metadata("design:type", String)
], GetVersionModel.prototype, "version", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'the git commit hash of the code base' }),
    __metadata("design:type", String)
], GetVersionModel.prototype, "git_hash", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'the build timestamp' }),
    __metadata("design:type", String)
], GetVersionModel.prototype, "timestamp", void 0);
GetVersionModel = __decorate([
    (0, graphql_1.ObjectType)()
], GetVersionModel);
exports.GetVersionModel = GetVersionModel;
let receiptType = class receiptType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], receiptType.prototype, "TxHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => [receiptLogType], { nullable: true }),
    __metadata("design:type", Array)
], receiptType.prototype, "Logs", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], receiptType.prototype, "EvmRet", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], receiptType.prototype, "ContractAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    __metadata("design:type", Number)
], receiptType.prototype, "GasUsed", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], receiptType.prototype, "EvmErr", void 0);
receiptType = __decorate([
    (0, graphql_1.ObjectType)()
], receiptType);
exports.receiptType = receiptType;
let receiptLogType = class receiptLogType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], receiptLogType.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_2.GraphQLString]),
    __metadata("design:type", Array)
], receiptLogType.prototype, "topics", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], receiptLogType.prototype, "data", void 0);
receiptLogType = __decorate([
    (0, graphql_1.ObjectType)()
], receiptLogType);
exports.receiptLogType = receiptLogType;
let GetAccountModel = class GetAccountModel {
};
__decorate([
    (0, graphql_1.Field)({ description: ' the current sequence number of the account' }),
    __metadata("design:type", Number)
], GetAccountModel.prototype, "sequence", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'the native token balance' }),
    __metadata("design:type", TokenType)
], GetAccountModel.prototype, "coins", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], {
        description: 'fund reserved for micropayment through the off-chain resource-oriented payment pool'
    }),
    __metadata("design:type", Array)
], GetAccountModel.prototype, "reserved_funds", void 0);
__decorate([
    (0, graphql_1.Field)({ description: '' }),
    __metadata("design:type", String)
], GetAccountModel.prototype, "last_updated_block_height", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'the root hash of the data Merkle-Patricia trie (for smart contract accounts)'
    }),
    __metadata("design:type", String)
], GetAccountModel.prototype, "root", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'the hash of the smart contract bytecode (for smart contract accounts)' }),
    __metadata("design:type", String)
], GetAccountModel.prototype, "code", void 0);
GetAccountModel = __decorate([
    (0, graphql_1.ObjectType)()
], GetAccountModel);
exports.GetAccountModel = GetAccountModel;
let HccVoteType = class HccVoteType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HccVoteType.prototype, "Block", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HccVoteType.prototype, "Height", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HccVoteType.prototype, "Epoch", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HccVoteType.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HccVoteType.prototype, "Signature", void 0);
HccVoteType = __decorate([
    (0, graphql_1.ObjectType)()
], HccVoteType);
exports.HccVoteType = HccVoteType;
let HccType = class HccType {
};
__decorate([
    (0, graphql_1.Field)(() => [HccVoteType]),
    __metadata("design:type", Array)
], HccType.prototype, "Votes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HccType.prototype, "BlockHash", void 0);
HccType = __decorate([
    (0, graphql_1.ObjectType)()
], HccType);
exports.HccType = HccType;
let GuardianVotesType = class GuardianVotesType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GuardianVotesType.prototype, "Block", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GuardianVotesType.prototype, "Gcp", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    __metadata("design:type", Array)
], GuardianVotesType.prototype, "Multiplies", void 0);
GuardianVotesType = __decorate([
    (0, graphql_1.ObjectType)()
], GuardianVotesType);
exports.GuardianVotesType = GuardianVotesType;
let EliteEdgeNodeVotesType = class EliteEdgeNodeVotesType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], EliteEdgeNodeVotesType.prototype, "Block", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    __metadata("design:type", Array)
], EliteEdgeNodeVotesType.prototype, "Multiplies", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_2.GraphQLString]),
    __metadata("design:type", Array)
], EliteEdgeNodeVotesType.prototype, "Addresses", void 0);
EliteEdgeNodeVotesType = __decorate([
    (0, graphql_1.ObjectType)()
], EliteEdgeNodeVotesType);
exports.EliteEdgeNodeVotesType = EliteEdgeNodeVotesType;
let SourceTargetType = class SourceTargetType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SourceTargetType.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SourceTargetType.prototype, "sequence", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenType),
    __metadata("design:type", TokenType)
], SourceTargetType.prototype, "coins", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SourceTargetType.prototype, "signature", void 0);
SourceTargetType = __decorate([
    (0, graphql_1.ObjectType)()
], SourceTargetType);
exports.SourceTargetType = SourceTargetType;
let BlockModel = class BlockModel {
};
__decorate([
    (0, graphql_1.Field)({ description: 'ID of the chain' }),
    __metadata("design:type", String)
], BlockModel.prototype, "chain_id", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'epoch of the block' }),
    __metadata("design:type", String)
], BlockModel.prototype, "epoch", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'height of the block' }),
    __metadata("design:type", String)
], BlockModel.prototype, "height", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'hash of the parent block' }),
    __metadata("design:type", String)
], BlockModel.prototype, "parent", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'root hash of the transaction Merkle-Patricia trie' }),
    __metadata("design:type", String)
], BlockModel.prototype, "transactions_hash", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'root hash of the state Merkle-Patricia trie' }),
    __metadata("design:type", String)
], BlockModel.prototype, "state_hash", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'timestamp when the block was proposed' }),
    __metadata("design:type", String)
], BlockModel.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'address of the proposer validator' }),
    __metadata("design:type", String)
], BlockModel.prototype, "proposer", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { description: 'children blocks' }),
    __metadata("design:type", Array)
], BlockModel.prototype, "children", void 0);
__decorate([
    (0, graphql_1.Field)(() => theta_enum_2.THETA_BLOCK_STATUS_ENUM, { description: 'status of the block' }),
    __metadata("design:type", Number)
], BlockModel.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'hash of the transaction' }),
    __metadata("design:type", String)
], BlockModel.prototype, "hash", void 0);
__decorate([
    (0, graphql_1.Field)(() => [transactionType], {
        description: ' json representation of the transactions contained in the block'
    }),
    __metadata("design:type", Array)
], BlockModel.prototype, "transactions", void 0);
__decorate([
    (0, graphql_1.Field)(() => HccType, { nullable: true }),
    __metadata("design:type", HccType)
], BlockModel.prototype, "hcc", void 0);
__decorate([
    (0, graphql_1.Field)(() => GuardianVotesType, { nullable: true }),
    __metadata("design:type", GuardianVotesType)
], BlockModel.prototype, "guardian_votes", void 0);
__decorate([
    (0, graphql_1.Field)(() => EliteEdgeNodeVotesType, { nullable: true }),
    __metadata("design:type", EliteEdgeNodeVotesType)
], BlockModel.prototype, "elite_edge_node_votes", void 0);
BlockModel = __decorate([
    (0, graphql_1.ObjectType)()
], BlockModel);
exports.BlockModel = BlockModel;
let proposerType = class proposerType {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], proposerType.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenType, { nullable: true }),
    __metadata("design:type", TokenType)
], proposerType.prototype, "coins", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], proposerType.prototype, "sequence", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], proposerType.prototype, "signature", void 0);
proposerType = __decorate([
    (0, graphql_1.ObjectType)()
], proposerType);
exports.proposerType = proposerType;
let inputOutputType = class inputOutputType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], inputOutputType.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenType),
    __metadata("design:type", TokenType)
], inputOutputType.prototype, "coins", void 0);
inputOutputType = __decorate([
    (0, graphql_1.ObjectType)()
], inputOutputType);
exports.inputOutputType = inputOutputType;
let transactionRawType = class transactionRawType {
};
__decorate([
    (0, graphql_1.Field)(() => proposerType, { nullable: true }),
    __metadata("design:type", proposerType)
], transactionRawType.prototype, "proposer", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenType, { nullable: true }),
    __metadata("design:type", TokenType)
], transactionRawType.prototype, "fee", void 0);
__decorate([
    (0, graphql_1.Field)(() => [inputOutputType], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], transactionRawType.prototype, "outputs", void 0);
__decorate([
    (0, graphql_1.Field)(() => [inputOutputType], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], transactionRawType.prototype, "inputs", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], transactionRawType.prototype, "gas_limit", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], transactionRawType.prototype, "gas_price", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], transactionRawType.prototype, "gas_used", void 0);
__decorate([
    (0, graphql_1.Field)((type) => proposerType, { nullable: true }),
    __metadata("design:type", proposerType)
], transactionRawType.prototype, "from", void 0);
__decorate([
    (0, graphql_1.Field)((type) => proposerType, { nullable: true }),
    __metadata("design:type", proposerType)
], transactionRawType.prototype, "to", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], transactionRawType.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], transactionRawType.prototype, "block_height", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], transactionRawType.prototype, "payment_sequence", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], transactionRawType.prototype, "reserve_sequence", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], transactionRawType.prototype, "resource_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => SourceTargetType, { nullable: true }),
    __metadata("design:type", SourceTargetType)
], transactionRawType.prototype, "source", void 0);
__decorate([
    (0, graphql_1.Field)(() => SourceTargetType, { nullable: true }),
    __metadata("design:type", SourceTargetType)
], transactionRawType.prototype, "target", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenType, { nullable: true }),
    __metadata("design:type", TokenType)
], transactionRawType.prototype, "collateral", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], transactionRawType.prototype, "resource_ids", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], transactionRawType.prototype, "duration", void 0);
__decorate([
    (0, graphql_1.Field)(() => STAKE_PURPOSE_ENUM, { nullable: true }),
    __metadata("design:type", Number)
], transactionRawType.prototype, "purpose", void 0);
__decorate([
    (0, graphql_1.Field)(() => HolderType, { nullable: true }),
    __metadata("design:type", HolderType)
], transactionRawType.prototype, "holder", void 0);
transactionRawType = __decorate([
    (0, graphql_1.ObjectType)()
], transactionRawType);
exports.transactionRawType = transactionRawType;
let transactionType = class transactionType {
};
__decorate([
    (0, graphql_1.Field)(() => transactionRawType, { nullable: true }),
    __metadata("design:type", transactionRawType)
], transactionType.prototype, "raw", void 0);
__decorate([
    (0, graphql_1.Field)(() => theta_enum_1.THETA_TRANSACTION_TYPE_ENUM),
    __metadata("design:type", Number)
], transactionType.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], transactionType.prototype, "hash", void 0);
__decorate([
    (0, graphql_1.Field)(() => receiptType, { nullable: true }),
    __metadata("design:type", receiptType)
], transactionType.prototype, "receipt", void 0);
transactionType = __decorate([
    (0, graphql_1.ObjectType)()
], transactionType);
exports.transactionType = transactionType;
let GetTransactionModel = class GetTransactionModel {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GetTransactionModel.prototype, "block_hash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GetTransactionModel.prototype, "block_height", void 0);
__decorate([
    (0, graphql_1.Field)(() => theta_enum_1.THETA_TRANSACTION_TYPE_ENUM),
    __metadata("design:type", Number)
], GetTransactionModel.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GetTransactionModel.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GetTransactionModel.prototype, "hash", void 0);
__decorate([
    (0, graphql_1.Field)(() => transactionRawType),
    __metadata("design:type", transactionRawType)
], GetTransactionModel.prototype, "transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => receiptType, { nullable: true }),
    __metadata("design:type", receiptType)
], GetTransactionModel.prototype, "receipt", void 0);
GetTransactionModel = __decorate([
    (0, graphql_1.ObjectType)()
], GetTransactionModel);
exports.GetTransactionModel = GetTransactionModel;
let NodeStatusModel = class NodeStatusModel {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "chain_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "peer_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "latest_finalized_block_hash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "latest_finalized_block_height", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "latest_finalized_block_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "latest_finalized_block_epoch", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "current_epoch", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "current_height", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "current_time", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLBoolean),
    __metadata("design:type", Boolean)
], NodeStatusModel.prototype, "syncing", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NodeStatusModel.prototype, "genesis_block_hash", void 0);
NodeStatusModel = __decorate([
    (0, graphql_1.ObjectType)()
], NodeStatusModel);
exports.NodeStatusModel = NodeStatusModel;
let GetPendingTransactionsModel = class GetPendingTransactionsModel {
};
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], GetPendingTransactionsModel.prototype, "tx_hashes", void 0);
GetPendingTransactionsModel = __decorate([
    (0, graphql_1.ObjectType)()
], GetPendingTransactionsModel);
exports.GetPendingTransactionsModel = GetPendingTransactionsModel;
let ThetaRpcModel = class ThetaRpcModel {
};
__decorate([
    (0, graphql_1.Field)(() => GetVersionModel, {
        description: 'This field returns the version of the blockchain software.'
    }),
    __metadata("design:type", GetVersionModel)
], ThetaRpcModel.prototype, "GetVersion", void 0);
__decorate([
    (0, graphql_1.Field)(() => GetAccountModel, {
        description: 'This Field returns the details of the account.\n' + '\n'
    }),
    __metadata("design:type", GetAccountModel)
], ThetaRpcModel.prototype, "GetAccount", void 0);
__decorate([
    (0, graphql_1.Field)(() => BlockModel, { description: 'This Field returns the details of the block' }),
    __metadata("design:type", BlockModel)
], ThetaRpcModel.prototype, "GetBlock", void 0);
__decorate([
    (0, graphql_1.Field)(() => BlockModel, {
        description: 'This Field returns the finalized block given the height.\n' +
            'If none of the blocks at the given height are finalized (either directly or indirectly), \n' +
            'then returns an empty result.'
    }),
    __metadata("design:type", BlockModel)
], ThetaRpcModel.prototype, "GetBlockByHeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => NodeStatusModel, {
        description: 'This field return the status of the guardian node run by theta data'
    }),
    __metadata("design:type", NodeStatusModel)
], ThetaRpcModel.prototype, "GetStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => GetTransactionModel, {
        description: 'This field returns the detail of the transaction by hash.'
    }),
    __metadata("design:type", GetTransactionModel)
], ThetaRpcModel.prototype, "GetTransaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => rpc_vcp_model_1.GetVcpByHeightModel),
    __metadata("design:type", rpc_vcp_model_1.GetVcpByHeightModel)
], ThetaRpcModel.prototype, "GetVcpByHeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => rpc_gcp_model_1.GetGcpByHeightModel),
    __metadata("design:type", rpc_gcp_model_1.GetGcpByHeightModel)
], ThetaRpcModel.prototype, "GetGcpByHeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => rpc_eenp_model_1.GetEenpByHeightModel),
    __metadata("design:type", rpc_eenp_model_1.GetEenpByHeightModel)
], ThetaRpcModel.prototype, "GetEenpByHeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => GetPendingTransactionsModel, {
        description: 'This field returns the pending transactions in the mempool.'
    }),
    __metadata("design:type", GetPendingTransactionsModel)
], ThetaRpcModel.prototype, "GetPendingTransactions", void 0);
__decorate([
    (0, graphql_1.Field)(() => rpc_stake_reward_distribution_by_height_model_1.BlockHashStakeRewardDistributionRuleSetPairsModel),
    __metadata("design:type", rpc_stake_reward_distribution_by_height_model_1.BlockHashStakeRewardDistributionRuleSetPairsModel)
], ThetaRpcModel.prototype, "GetStakeRewardDistributionByHeight", void 0);
ThetaRpcModel = __decorate([
    (0, graphql_1.ObjectType)()
], ThetaRpcModel);
exports.ThetaRpcModel = ThetaRpcModel;
//# sourceMappingURL=rpc.model.js.map