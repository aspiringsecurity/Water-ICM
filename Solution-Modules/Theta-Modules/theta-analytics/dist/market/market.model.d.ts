export declare class KlineObj {
    time: string;
    price: number;
}
export declare enum KLINE_INTERVAL {
    _1m = "1m",
    _3m = "3m",
    _5m = "5m",
    _15m = "15m",
    _30m = "30m",
    _1h = "1h",
    _2h = "2h",
    _4h = "4h",
    _6h = "6h",
    _8h = "8h",
    _12h = "12h",
    _1d = "1d",
    _3d = "3d",
    _1w = "1w",
    _1M = "1M"
}
export declare enum TOKEN_PAIR_TYPE {
    thetaUsdt = "THETAUSDT",
    tfuelUSdt = "TFUELUSDT"
}
export declare class TokenMarketInformationType {
    name: string;
    price: number;
    circulating_supply: number;
    total_supply: number;
    volume_24h: number;
    price_change_percent: number;
    kline: KlineObj[];
}
export declare class MarketInformationType {
    Theta: TokenMarketInformationType;
    ThetaFuel: TokenMarketInformationType;
}
