import { RpcService } from './../block-chain/rpc/rpc.service';
import { KLINE_INTERVAL, TokenMarketInformationType, TOKEN_PAIR_TYPE } from './market.model';
import { Cache } from 'cache-manager';
import { BinanceService } from 'src/exchange/binance.service';
export declare class MarketService {
    private cacheManager;
    private exchangeService;
    private RpcService;
    constructor(cacheManager: Cache, exchangeService: BinanceService, RpcService: RpcService);
    getThetaMarketInfo(): Promise<TokenMarketInformationType>;
    getThetaFuelMarketInfo(): Promise<TokenMarketInformationType>;
    getPrice(ticker: string): Promise<number>;
    getKline(pair: TOKEN_PAIR_TYPE, interval: KLINE_INTERVAL): Promise<import("../exchange/exchange.interface").K_LINE_INTERFACE[]>;
}
