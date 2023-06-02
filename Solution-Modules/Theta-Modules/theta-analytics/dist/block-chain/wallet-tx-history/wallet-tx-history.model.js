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
exports.HistoryTransactionsModel = exports.PaginatedHistoryTransactions = void 0;
const wallet_dp_wd_history_entity_1 = require("./deposit-withdraw/wallet-dp-wd-history.entity");
const wallet_send_history_entity_1 = require("./send/wallet-send-history.entity");
const nft_transfer_record_entity_1 = require("../smart-contract/nft/nft-transfer-record.entity");
const stake_reward_entity_1 = require("./../stake/stake-reward.entity");
const transaction_entity_1 = require("./../explorer/transaction.entity");
const common_model_1 = require("../../common/common.model");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let PaginatedHistoryTransactions = class PaginatedHistoryTransactions extends (0, common_model_1.Paginated)(transaction_entity_1.TransactionEntity) {
};
PaginatedHistoryTransactions = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedHistoryTransactions);
exports.PaginatedHistoryTransactions = PaginatedHistoryTransactions;
let HistoryTransactionsModel = class HistoryTransactionsModel {
};
__decorate([
    (0, graphql_1.Field)(() => [stake_reward_entity_1.StakeRewardEntity], { nullable: true }),
    __metadata("design:type", Array)
], HistoryTransactionsModel.prototype, "stake_rewards", void 0);
__decorate([
    (0, graphql_1.Field)(() => [nft_transfer_record_entity_1.NftTransferRecordEntity], { nullable: true }),
    __metadata("design:type", Array)
], HistoryTransactionsModel.prototype, "nft_transfers", void 0);
__decorate([
    (0, graphql_1.Field)(() => [wallet_send_history_entity_1.WalletSendHistoryEntity], { nullable: true }),
    __metadata("design:type", Array)
], HistoryTransactionsModel.prototype, "send_transfers", void 0);
__decorate([
    (0, graphql_1.Field)(() => [wallet_dp_wd_history_entity_1.WalletDpWdHistoryEntity], { nullable: true }),
    __metadata("design:type", Array)
], HistoryTransactionsModel.prototype, "deposit_withdraw", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    __metadata("design:type", Number)
], HistoryTransactionsModel.prototype, "start_time", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    __metadata("design:type", Number)
], HistoryTransactionsModel.prototype, "end_time", void 0);
HistoryTransactionsModel = __decorate([
    (0, graphql_1.ObjectType)()
], HistoryTransactionsModel);
exports.HistoryTransactionsModel = HistoryTransactionsModel;
//# sourceMappingURL=wallet-tx-history.model.js.map