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
exports.ExplorerModelType = exports.ExplorerSearchModelType = exports.SEARCH_TYPE_ENUM = exports.PaginatedTransactions = exports.PaginatedBlockList = void 0;
const nft_statistics_entity_1 = require("./../../statistics/nft/nft-statistics.entity");
const nft_transfer_record_entity_1 = require("../smart-contract/nft/nft-transfer-record.entity");
const graphql_1 = require("@nestjs/graphql");
const common_model_1 = require("../../common/common.model");
const rpc_model_1 = require("../rpc/rpc.model");
const block_list_entity_1 = require("./block-list.entity");
const transaction_entity_1 = require("./transaction.entity");
const graphql_2 = require("graphql");
let PaginatedBlockList = class PaginatedBlockList extends (0, common_model_1.Paginated)(block_list_entity_1.BlokcListEntity) {
};
PaginatedBlockList = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedBlockList);
exports.PaginatedBlockList = PaginatedBlockList;
let PaginatedTransactions = class PaginatedTransactions extends (0, common_model_1.Paginated)(transaction_entity_1.TransactionEntity) {
};
PaginatedTransactions = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedTransactions);
exports.PaginatedTransactions = PaginatedTransactions;
var SEARCH_TYPE_ENUM;
(function (SEARCH_TYPE_ENUM) {
    SEARCH_TYPE_ENUM[SEARCH_TYPE_ENUM["none"] = 0] = "none";
    SEARCH_TYPE_ENUM[SEARCH_TYPE_ENUM["block"] = 1] = "block";
    SEARCH_TYPE_ENUM[SEARCH_TYPE_ENUM["transaction"] = 2] = "transaction";
    SEARCH_TYPE_ENUM[SEARCH_TYPE_ENUM["account"] = 3] = "account";
    SEARCH_TYPE_ENUM[SEARCH_TYPE_ENUM["nft"] = 4] = "nft";
})(SEARCH_TYPE_ENUM = exports.SEARCH_TYPE_ENUM || (exports.SEARCH_TYPE_ENUM = {}));
(0, graphql_1.registerEnumType)(SEARCH_TYPE_ENUM, {
    name: 'SEARCH_TYPE_ENUM'
});
let ExplorerSearchModelType = class ExplorerSearchModelType {
};
__decorate([
    (0, graphql_1.Field)(() => rpc_model_1.GetTransactionModel, { nullable: true }),
    __metadata("design:type", rpc_model_1.GetTransactionModel)
], ExplorerSearchModelType.prototype, "transaction_rpc", void 0);
__decorate([
    (0, graphql_1.Field)(() => transaction_entity_1.TransactionEntity, { nullable: true }),
    __metadata("design:type", transaction_entity_1.TransactionEntity)
], ExplorerSearchModelType.prototype, "transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => [nft_transfer_record_entity_1.NftTransferRecordEntity], { nullable: true }),
    __metadata("design:type", Array)
], ExplorerSearchModelType.prototype, "transaction_nft_records", void 0);
__decorate([
    (0, graphql_1.Field)(() => SEARCH_TYPE_ENUM, { nullable: true }),
    __metadata("design:type", Number)
], ExplorerSearchModelType.prototype, "search_type", void 0);
__decorate([
    (0, graphql_1.Field)(() => rpc_model_1.BlockModel, { nullable: true }),
    __metadata("design:type", rpc_model_1.BlockModel)
], ExplorerSearchModelType.prototype, "block", void 0);
__decorate([
    (0, graphql_1.Field)(() => [nft_statistics_entity_1.NftStatisticsEntity], { nullable: true }),
    __metadata("design:type", Array)
], ExplorerSearchModelType.prototype, "nft_statistics", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt, { nullable: true }),
    __metadata("design:type", Number)
], ExplorerSearchModelType.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => rpc_model_1.GetAccountModel, { nullable: true }),
    __metadata("design:type", rpc_model_1.GetAccountModel)
], ExplorerSearchModelType.prototype, "account", void 0);
__decorate([
    (0, graphql_1.Field)(() => block_list_entity_1.BlokcListEntity, { nullable: true }),
    __metadata("design:type", block_list_entity_1.BlokcListEntity)
], ExplorerSearchModelType.prototype, "block_extend", void 0);
ExplorerSearchModelType = __decorate([
    (0, graphql_1.ObjectType)()
], ExplorerSearchModelType);
exports.ExplorerSearchModelType = ExplorerSearchModelType;
let ExplorerModelType = class ExplorerModelType {
};
__decorate([
    (0, graphql_1.Field)(() => PaginatedBlockList),
    __metadata("design:type", PaginatedBlockList)
], ExplorerModelType.prototype, "blockList", void 0);
__decorate([
    (0, graphql_1.Field)(() => PaginatedTransactions),
    __metadata("design:type", PaginatedTransactions)
], ExplorerModelType.prototype, "transactions", void 0);
__decorate([
    (0, graphql_1.Field)(() => ExplorerSearchModelType),
    __metadata("design:type", ExplorerSearchModelType)
], ExplorerModelType.prototype, "search", void 0);
ExplorerModelType = __decorate([
    (0, graphql_1.ObjectType)()
], ExplorerModelType);
exports.ExplorerModelType = ExplorerModelType;
//# sourceMappingURL=explorer.model.js.map