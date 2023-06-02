import { Logger } from '@nestjs/common';
import { EXCHANGE_INTERFACE, K_LINE_INTERFACE, PRICE_CHANGE_INTERFACE, PRICE_INTERFACE } from './exchange.interface';
export declare class BinanceService implements EXCHANGE_INTERFACE {
    APISECRET: string;
    APIKEY: string;
    logger: Logger;
    constructor();
    base: string;
    baseArr: string[];
    prices(pair: string | null): Promise<PRICE_INTERFACE>;
    kLine(pair: string, interval?: string): Promise<Array<K_LINE_INTERFACE>>;
    tickerPriceChange(pair: string): Promise<PRICE_CHANGE_INTERFACE>;
}
