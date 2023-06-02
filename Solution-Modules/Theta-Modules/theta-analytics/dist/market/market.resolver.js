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
exports.MarketResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const market_model_1 = require("./market.model");
const common_1 = require("@nestjs/common");
const market_service_1 = require("./market.service");
let MarketResolver = class MarketResolver {
    constructor(cacheManager, marketService) {
        this.cacheManager = cacheManager;
        this.marketService = marketService;
    }
    async MarketInformation() {
        return {};
    }
    async Theta() {
        return this.marketService.getThetaMarketInfo();
    }
    async ThetaFuel() {
        return this.marketService.getThetaFuelMarketInfo();
    }
    async Kline(tokenType, klineInterval) {
        const cacheKey = 'kline_' + tokenType + klineInterval;
        if (await this.cacheManager.get(cacheKey))
            return await this.cacheManager.get(cacheKey);
        const res = await this.marketService.getKline(tokenType, klineInterval);
        await this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 6 });
        return res;
    }
};
__decorate([
    (0, graphql_1.Query)(() => market_model_1.MarketInformationType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketResolver.prototype, "MarketInformation", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketResolver.prototype, "Theta", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketResolver.prototype, "ThetaFuel", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [market_model_1.KlineObj]),
    __param(0, (0, graphql_1.Args)('token_type', { type: () => market_model_1.TOKEN_PAIR_TYPE })),
    __param(1, (0, graphql_1.Args)('interval', { type: () => market_model_1.KLINE_INTERVAL })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarketResolver.prototype, "Kline", null);
MarketResolver = __decorate([
    (0, graphql_1.Resolver)(() => market_model_1.MarketInformationType),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, market_service_1.MarketService])
], MarketResolver);
exports.MarketResolver = MarketResolver;
//# sourceMappingURL=market.resolver.js.map