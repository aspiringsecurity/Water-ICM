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
exports.MarketService = void 0;
const rpc_service_1 = require("./../block-chain/rpc/rpc.service");
const common_1 = require("@nestjs/common");
const binance_service_1 = require("../exchange/binance.service");
let MarketService = class MarketService {
    constructor(cacheManager, exchangeService, RpcService) {
        this.cacheManager = cacheManager;
        this.exchangeService = exchangeService;
        this.RpcService = RpcService;
    }
    async getThetaMarketInfo() {
        const key = 'theta-market-info';
        if (await this.cacheManager.get(key))
            return await this.cacheManager.get(key);
        const res = await this.exchangeService.tickerPriceChange('THETAUSDT');
        const kline = await this.exchangeService.kLine('THETAUSDT');
        const marketInfo = {
            name: 'THETA',
            price: Number(res.lastPrice),
            volume_24h: Number(res.priceChangePercent),
            price_change_percent: Number(res.priceChangePercent),
            kline: kline,
            total_supply: 1000000000,
            circulating_supply: 1000000000
        };
        await this.cacheManager.set(key, marketInfo, { ttl: 60 * 5 });
        return marketInfo;
    }
    async getThetaFuelMarketInfo() {
        const key = 'tfuel-market-info';
        if (await this.cacheManager.get(key))
            return await this.cacheManager.get(key);
        const res = await this.exchangeService.tickerPriceChange('TFUELUSDT');
        const kline = await this.exchangeService.kLine('TFUELUSDT');
        const lastfinalizedHeight = await (await this.RpcService.getStatus()).latest_finalized_block_height;
        const baseTfuel = 5829173326;
        const tfuelNew = Math.floor((Number(lastfinalizedHeight) - 16856001) / 100) * 8600;
        const marketInfo = {
            name: 'TFUEL',
            price: Number(res.lastPrice),
            volume_24h: Number(res.priceChangePercent),
            price_change_percent: Number(res.priceChangePercent),
            kline: kline,
            total_supply: baseTfuel + tfuelNew,
            circulating_supply: baseTfuel + tfuelNew
        };
        await this.cacheManager.set(key, marketInfo, { ttl: 60 * 5 });
        return marketInfo;
    }
    async getPrice(ticker) {
        const res = await this.exchangeService.tickerPriceChange(ticker.toUpperCase() + 'USDT');
        return Number(res.lastPrice);
    }
    async getKline(pair, interval) {
        return await this.exchangeService.kLine(pair, interval);
    }
};
MarketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, binance_service_1.BinanceService,
        rpc_service_1.RpcService])
], MarketService);
exports.MarketService = MarketService;
//# sourceMappingURL=market.service.js.map