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
exports.NftDetailByDate = exports.NftDetailType = exports.PaginatedNftStatistics = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const common_model_1 = require("../../common/common.model");
const nft_statistics_entity_1 = require("./nft-statistics.entity");
let PaginatedNftStatistics = class PaginatedNftStatistics extends (0, common_model_1.Paginated)(nft_statistics_entity_1.NftStatisticsEntity) {
};
PaginatedNftStatistics = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedNftStatistics);
exports.PaginatedNftStatistics = PaginatedNftStatistics;
let NftDetailType = class NftDetailType {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NftDetailType.prototype, "contract_uri", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NftDetailType.prototype, "smart_contract_address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NftDetailType.prototype, "contract_uri_detail", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NftDetailType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NftDetailType.prototype, "img_uri", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NftDetailType.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    __metadata("design:type", Number)
], NftDetailType.prototype, "unique_owners", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    __metadata("design:type", Number)
], NftDetailType.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    __metadata("design:type", Number)
], NftDetailType.prototype, "destroyed_items", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], NftDetailType.prototype, "update_timestamp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], NftDetailType.prototype, "contract_uri_update_timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => [NftDetailByDate], { nullable: true }),
    __metadata("design:type", Array)
], NftDetailType.prototype, "by_24_hours", void 0);
__decorate([
    (0, graphql_1.Field)(() => [NftDetailByDate], { nullable: true }),
    __metadata("design:type", Array)
], NftDetailType.prototype, "by_7_days", void 0);
__decorate([
    (0, graphql_1.Field)(() => [NftDetailByDate], { nullable: true }),
    __metadata("design:type", Array)
], NftDetailType.prototype, "by_30_days", void 0);
NftDetailType = __decorate([
    (0, graphql_1.ObjectType)()
], NftDetailType);
exports.NftDetailType = NftDetailType;
let NftDetailByDate = class NftDetailByDate {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    __metadata("design:type", Number)
], NftDetailByDate.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    __metadata("design:type", Number)
], NftDetailByDate.prototype, "volume", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    __metadata("design:type", Number)
], NftDetailByDate.prototype, "transactions", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    __metadata("design:type", Number)
], NftDetailByDate.prototype, "users", void 0);
NftDetailByDate = __decorate([
    (0, graphql_1.ObjectType)()
], NftDetailByDate);
exports.NftDetailByDate = NftDetailByDate;
//# sourceMappingURL=nft-statistics.model.js.map