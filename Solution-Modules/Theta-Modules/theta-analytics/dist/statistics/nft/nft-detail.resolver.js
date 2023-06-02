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
exports.NftDetailResolver = void 0;
const nft_statistics_model_1 = require("./nft-statistics.model");
const graphql_1 = require("@nestjs/graphql");
const nft_statistics_service_1 = require("./nft-statistics.service");
const graphql_2 = require("graphql");
const common_1 = require("@nestjs/common");
const moment = require('moment');
let NftDetailResolver = class NftDetailResolver {
    constructor(nftStatisticsService, cacheManager) {
        this.nftStatisticsService = nftStatisticsService;
        this.cacheManager = cacheManager;
    }
    async NftDetail(contractAddress) {
        return await this.nftStatisticsService.getNftInfo(contractAddress);
    }
    async by_24_hours(nftDetail, timezoneOffset) {
        const currDate = moment()
            .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
            .format('DD');
        const cacheKey = 'nft_detail_1_day_' + currDate + nftDetail.smart_contract_address + String(timezoneOffset);
        if (await this.cacheManager.get(cacheKey)) {
            return await this.cacheManager.get(cacheKey);
        }
        const { contract_uri, smart_contract_address } = nftDetail;
        const res = await this.nftStatisticsService.nftStatistics24H(smart_contract_address, contract_uri, timezoneOffset);
        this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 48 });
        return res;
    }
    async by_7_days(nftDetail, timezoneOffset) {
        const currDate = moment()
            .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
            .format('DD');
        const cacheKey = 'nft_detail_7_days_' + currDate + nftDetail.smart_contract_address + String(timezoneOffset);
        if (await this.cacheManager.get(cacheKey)) {
            return await this.cacheManager.get(cacheKey);
        }
        const { contract_uri, smart_contract_address } = nftDetail;
        const res = await this.nftStatisticsService.nftStatistics7Days(smart_contract_address, contract_uri, timezoneOffset);
        this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 48 });
        return res;
    }
    async by_30_days(nftDetail, timezoneOffset) {
        const currDate = moment()
            .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
            .format('DD');
        const cacheKey = 'nft_detail_30_days_' + currDate + nftDetail.smart_contract_address + String(timezoneOffset);
        if (await this.cacheManager.get(cacheKey)) {
            return await this.cacheManager.get(cacheKey);
        }
        const { contract_uri, smart_contract_address } = nftDetail;
        const res = await this.nftStatisticsService.nftStatistics30Days(smart_contract_address, contract_uri, timezoneOffset);
        this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 48 });
        return res;
    }
};
__decorate([
    (0, graphql_1.Query)(() => nft_statistics_model_1.NftDetailType),
    __param(0, (0, graphql_1.Args)('contract_address', { type: () => graphql_2.GraphQLString })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NftDetailResolver.prototype, "NftDetail", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)('timezoneOffset', {
        type: () => graphql_1.Int,
        nullable: true,
        defaultValue: 0,
        description: 'the timezone difference in minutes, between the UTC and the current local time.' +
            'Such as PDT time is utc-07, should pass -420'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nft_statistics_model_1.NftDetailType, Number]),
    __metadata("design:returntype", Promise)
], NftDetailResolver.prototype, "by_24_hours", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)('timezoneOffset', {
        type: () => graphql_1.Int,
        nullable: true,
        defaultValue: 0,
        description: 'the timezone difference in minutes, between the UTC and the current local time.' +
            'Such as PDT time is utc-07, should pass -420'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nft_statistics_model_1.NftDetailType, Number]),
    __metadata("design:returntype", Promise)
], NftDetailResolver.prototype, "by_7_days", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)('timezoneOffset', {
        type: () => graphql_1.Int,
        nullable: true,
        defaultValue: '0',
        description: 'the timezone difference in minutes, between the UTC and the current local time.' +
            'Such as PDT time is utc-07, should pass -420'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nft_statistics_model_1.NftDetailType, Number]),
    __metadata("design:returntype", Promise)
], NftDetailResolver.prototype, "by_30_days", null);
NftDetailResolver = __decorate([
    (0, graphql_1.Resolver)((of) => nft_statistics_model_1.NftDetailType),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [nft_statistics_service_1.NftStatisticsService, Object])
], NftDetailResolver);
exports.NftDetailResolver = NftDetailResolver;
//# sourceMappingURL=nft-detail.resolver.js.map