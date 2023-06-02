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
exports.StakeRewardEntity = exports.STAKE_TOKEN_TYPE_ENUM = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
var STAKE_TOKEN_TYPE_ENUM;
(function (STAKE_TOKEN_TYPE_ENUM) {
    STAKE_TOKEN_TYPE_ENUM[STAKE_TOKEN_TYPE_ENUM["theta_stake"] = 1] = "theta_stake";
    STAKE_TOKEN_TYPE_ENUM[STAKE_TOKEN_TYPE_ENUM["elite_node_stake"] = 2] = "elite_node_stake";
})(STAKE_TOKEN_TYPE_ENUM = exports.STAKE_TOKEN_TYPE_ENUM || (exports.STAKE_TOKEN_TYPE_ENUM = {}));
(0, graphql_1.registerEnumType)(STAKE_TOKEN_TYPE_ENUM, {
    name: 'STAKE_TOKEN_TYPE_ENUM'
});
let StakeRewardEntity = class StakeRewardEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StakeRewardEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'real' }),
    __metadata("design:type", Number)
], StakeRewardEntity.prototype, "reward_amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], StakeRewardEntity.prototype, "wallet_address", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], StakeRewardEntity.prototype, "reward_height", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], StakeRewardEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], StakeRewardEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], StakeRewardEntity.prototype, "update_date", void 0);
StakeRewardEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['wallet_address', 'timestamp']),
    (0, typeorm_1.Unique)(['wallet_address', 'reward_height']),
    (0, graphql_1.ObjectType)()
], StakeRewardEntity);
exports.StakeRewardEntity = StakeRewardEntity;
//# sourceMappingURL=stake-reward.entity.js.map