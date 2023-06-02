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
exports.TX_GET_DATA_AMOUNT = exports.ThetaTxNumByDateModel = exports.ThetaTransactionStatisticsType = void 0;
const graphql_1 = require("@nestjs/graphql");
const theta_tx_num_by_hours_entity_1 = require("./theta-tx-num-by-hours.entity");
let ThetaTransactionStatisticsType = class ThetaTransactionStatisticsType {
};
__decorate([
    (0, graphql_1.Field)(() => [ThetaTxNumByDateModel]),
    __metadata("design:type", Array)
], ThetaTransactionStatisticsType.prototype, "ByDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [theta_tx_num_by_hours_entity_1.ThetaTxNumByHoursEntity]),
    __metadata("design:type", theta_tx_num_by_hours_entity_1.ThetaTxNumByHoursEntity)
], ThetaTransactionStatisticsType.prototype, "ByHour", void 0);
ThetaTransactionStatisticsType = __decorate([
    (0, graphql_1.ObjectType)()
], ThetaTransactionStatisticsType);
exports.ThetaTransactionStatisticsType = ThetaTransactionStatisticsType;
let ThetaTxNumByDateModel = class ThetaTxNumByDateModel {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "year", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "month", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "block_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "theta_fuel_burnt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "theta_fuel_burnt_by_smart_contract", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "theta_fuel_burnt_by_transfers", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "active_wallet", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "coin_base_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "slash_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "send_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "reserve_fund_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "release_fund_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "service_payment_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "split_rule_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "deposit_stake_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "withdraw_stake_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "smart_contract_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "latest_block_height", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByDateModel.prototype, "timestamp", void 0);
ThetaTxNumByDateModel = __decorate([
    (0, graphql_1.ObjectType)()
], ThetaTxNumByDateModel);
exports.ThetaTxNumByDateModel = ThetaTxNumByDateModel;
var TX_GET_DATA_AMOUNT;
(function (TX_GET_DATA_AMOUNT) {
    TX_GET_DATA_AMOUNT[TX_GET_DATA_AMOUNT["_2week"] = 14] = "_2week";
    TX_GET_DATA_AMOUNT[TX_GET_DATA_AMOUNT["_1month"] = 31] = "_1month";
    TX_GET_DATA_AMOUNT[TX_GET_DATA_AMOUNT["_3month"] = 93] = "_3month";
    TX_GET_DATA_AMOUNT[TX_GET_DATA_AMOUNT["_6month"] = 186] = "_6month";
    TX_GET_DATA_AMOUNT[TX_GET_DATA_AMOUNT["_1year"] = 366] = "_1year";
    TX_GET_DATA_AMOUNT[TX_GET_DATA_AMOUNT["_2year"] = 732] = "_2year";
})(TX_GET_DATA_AMOUNT = exports.TX_GET_DATA_AMOUNT || (exports.TX_GET_DATA_AMOUNT = {}));
(0, graphql_1.registerEnumType)(TX_GET_DATA_AMOUNT, {
    name: 'TX_GET_DATA_AMOUNT',
    description: 'TX_GET_DATA_AMOUNT'
});
//# sourceMappingURL=theta-tx.model.js.map