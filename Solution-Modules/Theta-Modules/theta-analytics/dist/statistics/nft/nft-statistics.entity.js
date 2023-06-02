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
exports.NftStatisticsEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const typeorm_1 = require("typeorm");
let NftStatisticsEntity = class NftStatisticsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftStatisticsEntity.prototype, "smart_contract_address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftStatisticsEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '', nullable: true }),
    __metadata("design:type", String)
], NftStatisticsEntity.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "unique_owners", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "destroyed_items", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: '', nullable: true }),
    __metadata("design:type", String)
], NftStatisticsEntity.prototype, "img_uri", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftStatisticsEntity.prototype, "contract_uri", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftStatisticsEntity.prototype, "contract_uri_detail", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_24_h_transactions", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_24_h_volume", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_24_h_users", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_24_h_floor_price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_24_h_highest_price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_7_days_transactions", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_7_days_volume", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_7_days_users", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_7_days_highest_price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_7_days_floor_price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_30_days_transactions", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_30_days_volume", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_30_days_users", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_30_days_highest_price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "last_30_days_floor_price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "update_timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "contract_uri_update_timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "refetch_times", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], NftStatisticsEntity.prototype, "update_date", void 0);
NftStatisticsEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['smart_contract_address']),
    (0, typeorm_1.Index)(['update_timestamp'])
], NftStatisticsEntity);
exports.NftStatisticsEntity = NftStatisticsEntity;
//# sourceMappingURL=nft-statistics.entity.js.map