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
exports.ThetaTxNumByHoursEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let ThetaTxNumByHoursEntity = class ThetaTxNumByHoursEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "year", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "month", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "hour", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "block_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)({
        type: 'float',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "theta_fuel_burnt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)({
        type: 'float',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "theta_fuel_burnt_by_smart_contract", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)({
        type: 'float',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "theta_fuel_burnt_by_transfers", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "active_wallet", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "coin_base_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "slash_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "send_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "reserve_fund_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "release_fund_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "service_payment_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "split_rule_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "deposit_stake_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "withdraw_stake_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "smart_contract_transaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "latest_block_height", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString),
    (0, typeorm_1.Column)({
        type: 'int',
        unique: true,
        comment: '对应精确到小时的数据'
    }),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], ThetaTxNumByHoursEntity.prototype, "update_date", void 0);
ThetaTxNumByHoursEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], ThetaTxNumByHoursEntity);
exports.ThetaTxNumByHoursEntity = ThetaTxNumByHoursEntity;
//# sourceMappingURL=theta-tx-num-by-hours.entity.js.map