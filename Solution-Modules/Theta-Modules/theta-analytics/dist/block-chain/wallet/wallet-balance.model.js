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
exports.BalanceModel = exports.TotalBalanceType = exports.StakeBalanceType = exports.TokenBalanceType = exports.FiatCurrencyType = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let FiatCurrencyType = class FiatCurrencyType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], FiatCurrencyType.prototype, "usd", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], FiatCurrencyType.prototype, "cny", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], FiatCurrencyType.prototype, "eur", void 0);
FiatCurrencyType = __decorate([
    (0, graphql_1.ObjectType)()
], FiatCurrencyType);
exports.FiatCurrencyType = FiatCurrencyType;
let TokenBalanceType = class TokenBalanceType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], TokenBalanceType.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => FiatCurrencyType),
    __metadata("design:type", FiatCurrencyType)
], TokenBalanceType.prototype, "fiat_currency_value", void 0);
TokenBalanceType = __decorate([
    (0, graphql_1.ObjectType)()
], TokenBalanceType);
exports.TokenBalanceType = TokenBalanceType;
let StakeBalanceType = class StakeBalanceType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], StakeBalanceType.prototype, "node_address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], StakeBalanceType.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLBoolean),
    __metadata("design:type", Boolean)
], StakeBalanceType.prototype, "withdrawn", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], StakeBalanceType.prototype, "return_height", void 0);
__decorate([
    (0, graphql_1.Field)(() => FiatCurrencyType),
    __metadata("design:type", FiatCurrencyType)
], StakeBalanceType.prototype, "fiat_currency_value", void 0);
StakeBalanceType = __decorate([
    (0, graphql_1.ObjectType)()
], StakeBalanceType);
exports.StakeBalanceType = StakeBalanceType;
let TotalBalanceType = class TotalBalanceType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], TotalBalanceType.prototype, "theta_amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], TotalBalanceType.prototype, "theta_fuel_amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => FiatCurrencyType),
    __metadata("design:type", FiatCurrencyType)
], TotalBalanceType.prototype, "fiat_currency_value", void 0);
TotalBalanceType = __decorate([
    (0, graphql_1.ObjectType)()
], TotalBalanceType);
exports.TotalBalanceType = TotalBalanceType;
let BalanceModel = class BalanceModel {
};
__decorate([
    (0, graphql_1.Field)(() => TokenBalanceType),
    __metadata("design:type", TokenBalanceType)
], BalanceModel.prototype, "theta", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenBalanceType),
    __metadata("design:type", TokenBalanceType)
], BalanceModel.prototype, "theta_fuel", void 0);
__decorate([
    (0, graphql_1.Field)(() => [StakeBalanceType], { nullable: true }),
    __metadata("design:type", Array)
], BalanceModel.prototype, "stake_to_guardian", void 0);
__decorate([
    (0, graphql_1.Field)(() => [StakeBalanceType], { nullable: true }),
    __metadata("design:type", Array)
], BalanceModel.prototype, "stake_to_elite_node", void 0);
__decorate([
    (0, graphql_1.Field)(() => [StakeBalanceType], { nullable: true }),
    __metadata("design:type", Array)
], BalanceModel.prototype, "stake_to_validator_node", void 0);
__decorate([
    (0, graphql_1.Field)(() => TotalBalanceType),
    __metadata("design:type", TotalBalanceType)
], BalanceModel.prototype, "total", void 0);
BalanceModel = __decorate([
    (0, graphql_1.ObjectType)()
], BalanceModel);
exports.BalanceModel = BalanceModel;
//# sourceMappingURL=wallet-balance.model.js.map