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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftStatisticsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const nft_statistics_entity_1 = require("./nft-statistics.entity");
const nft_statistics_model_1 = require("./nft-statistics.model");
const nft_statistics_service_1 = require("./nft-statistics.service");
let NftStatisticsResolver = class NftStatisticsResolver {
    constructor(nftStatisticsService) {
        this.nftStatisticsService = nftStatisticsService;
    }
    async NftStatistics(orderBy, take, skip, search, after) {
        const [hasNextPage, totalNumber, res] = await this.nftStatisticsService.getNft(orderBy, take, after, skip, search);
        let endCursor = '';
        if (res.length > 0) {
            switch (orderBy) {
                case nft_statistics_service_1.NftStatisticsOrderByType.last_24_h_users:
                    endCursor = Buffer.from(res[res.length - 1].last_24_h_users.toString()).toString('base64');
                    break;
                case nft_statistics_service_1.NftStatisticsOrderByType.last_7_days_users:
                    endCursor = Buffer.from(res[res.length - 1].last_7_days_users.toString()).toString('base64');
                    break;
                case nft_statistics_service_1.NftStatisticsOrderByType.last_30_days_users:
                    endCursor = Buffer.from(res[res.length - 1].last_30_days_users.toString()).toString('base64');
                    break;
                case nft_statistics_service_1.NftStatisticsOrderByType.last_24_h_transactions:
                    endCursor = Buffer.from(res[res.length - 1].last_24_h_transactions.toString()).toString();
                    break;
                case nft_statistics_service_1.NftStatisticsOrderByType.last_7_days_transactions:
                    endCursor = Buffer.from(res[res.length - 1].last_7_days_transactions.toString()).toString();
                    break;
                case nft_statistics_service_1.NftStatisticsOrderByType.last_30_days_transactions:
                    endCursor = Buffer.from(res[res.length - 1].last_30_days_transactions.toString()).toString();
                    break;
                case nft_statistics_service_1.NftStatisticsOrderByType.last_24_h_volume:
                    endCursor = Buffer.from(res[res.length - 1].last_24_h_volume.toString()).toString('base64');
                    break;
                case nft_statistics_service_1.NftStatisticsOrderByType.last_7_days_volume:
                    endCursor = Buffer.from(res[res.length - 1].last_7_days_volume.toString()).toString('base64');
                    break;
                case nft_statistics_service_1.NftStatisticsOrderByType.last_30_days_volume:
                    endCursor = Buffer.from(res[res.length - 1].last_30_days_volume.toString()).toString('base64');
                    break;
                default:
                    endCursor = Buffer.from(res[res.length - 1].last_24_h_users.toString()).toString('base64');
                    break;
            }
        }
        return {
            endCursor: endCursor,
            hasNextPage: hasNextPage,
            nodes: res,
            skip: skip,
            totalCount: totalNumber
        };
    }
    async updateNftImg(contractAddress, imgUri) {
        return await this.nftStatisticsService.updateNftImg(contractAddress, imgUri);
    }
};
__decorate([
    (0, graphql_1.Query)(() => nft_statistics_model_1.PaginatedNftStatistics),
    __param(0, (0, graphql_1.Args)('order_by', { type: () => nft_statistics_service_1.NftStatisticsOrderByType })),
    __param(1, (0, graphql_1.Args)('take', { type: () => graphql_2.GraphQLInt, defaultValue: 10 })),
    __param(2, (0, graphql_1.Args)('skip', { type: () => graphql_2.GraphQLInt, defaultValue: 0 })),
    __param(3, (0, graphql_1.Args)('search', { type: () => graphql_2.GraphQLString, nullable: true })),
    __param(4, (0, graphql_1.Args)('after', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], NftStatisticsResolver.prototype, "NftStatistics", null);
__decorate([
    (0, graphql_1.Mutation)(() => nft_statistics_entity_1.NftStatisticsEntity),
    __param(0, (0, graphql_1.Args)('contract_address', { type: () => graphql_2.GraphQLString })),
    __param(1, (0, graphql_1.Args)('img_uri', { type: () => graphql_2.GraphQLString })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NftStatisticsResolver.prototype, "updateNftImg", null);
NftStatisticsResolver = __decorate([
    (0, graphql_1.Resolver)(() => nft_statistics_model_1.PaginatedNftStatistics),
    __metadata("design:paramtypes", [nft_statistics_service_1.NftStatisticsService])
], NftStatisticsResolver);
exports.NftStatisticsResolver = NftStatisticsResolver;
//# sourceMappingURL=nft-statistics.resolver.js.map