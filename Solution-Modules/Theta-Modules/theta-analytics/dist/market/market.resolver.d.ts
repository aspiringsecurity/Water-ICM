import { Cache } from 'cache-manager';
import { MarketService } from './market.service';
export declare class MarketResolver {
    private cacheManager;
    private marketService;
    constructor(cacheManager: Cache, marketService: MarketService);
    MarketInformation(): Promise<{}>;
    Theta(): Promise<import("./market.model").TokenMarketInformationType>;
    ThetaFuel(): Promise<import("./market.model").TokenMarketInformationType>;
    Kline(tokenType: any, klineInterval: any): Promise<unknown>;
}
