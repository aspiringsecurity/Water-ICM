export interface PRICE_INTERFACE {
    price: number;
}
export interface EXCHANGE_INTERFACE {
    base: string;
    prices(pair: string): Promise<PRICE_INTERFACE>;
    kLine(pair: string): Promise<Array<K_LINE_INTERFACE>>;
    tickerPriceChange(pair: string): Promise<PRICE_CHANGE_INTERFACE>;
}
export interface TRADING_EXCHANGE_HUOBI_CONFIG {
    access_key: string;
    secretkey: string;
    account_id: string;
    account_id_pro: string;
    trade_password: string;
}
export interface TRADING_EXCHANGE_BINANCE_CONFIG {
    APIKEY: string;
    APISECRET: string;
}
export interface K_LINE_INTERFACE {
    time: string;
    price: number;
}
export interface PRICE_CHANGE_INTERFACE {
    symbol: string;
    priceChange: string;
    priceChangePercent: string;
    weightedAvgPrice: string;
    prevClosePrice: string;
    lastPrice: string;
    lastQty: string;
    bidPrice: string;
    bidQty: string;
    askPrice: string;
    askQty: string;
    openPrice: string;
    highPrice: string;
    lowPrice: string;
    volume: string;
    quoteVolume: string;
    openTime: string;
    closeTime: string;
    firstId: string;
    lastId: string;
    count: string;
}
