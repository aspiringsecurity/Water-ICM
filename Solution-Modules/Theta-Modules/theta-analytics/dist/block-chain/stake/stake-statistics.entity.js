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
exports.StakeStatisticsEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let StakeStatisticsEntity = class StakeStatisticsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Height of the block where pledge statistics are performed ' }),
    (0, typeorm_1.Column)({
        type: 'int',
        unique: true
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "block_height", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Total number of elite edge nodes' }),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "total_elite_edge_node_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "effective_elite_edge_node_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Number of theta fuel pledged to elite edge nodes' }),
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "total_edge_node_stake_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "effective_elite_edge_node_stake_amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Total number of guardian nodes' }),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "total_guardian_node_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Number of online guardian nodes' }),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "effective_guardian_node_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Total number of theta tokens pledged to the guardian nodes'
    }),
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "total_guardian_stake_amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Total number of theta pledges for the online guardian nodes'
    }),
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "effective_guardian_stake_amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Total number of validator nodes' }),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "total_validator_node_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Number of online validator nodes' }),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "effective_validator_node_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'otal number of theta tokens pledged to the validator nodes'
    }),
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "total_validator_stake_amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'The number of tokens pledged by the online validator nodes'
    }),
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "effective_validator_stake_amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat, { description: 'Theta Fuel pledge ratio' }),
    (0, typeorm_1.Column)({
        type: 'float'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "theta_fuel_stake_ratio", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat, { description: 'Theta pledge ratio' }),
    (0, typeorm_1.Column)({
        type: 'float'
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "theta_stake_ratio", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Block time for performing pledge statistics' }),
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0
    }),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], StakeStatisticsEntity.prototype, "update_date", void 0);
StakeStatisticsEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)({ description: 'Return to statistics related to token pledges' })
], StakeStatisticsEntity);
exports.StakeStatisticsEntity = StakeStatisticsEntity;
//# sourceMappingURL=stake-statistics.entity.js.map