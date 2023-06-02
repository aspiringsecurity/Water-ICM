import { TxService } from './tx.service';
import { TX_GET_DATA_AMOUNT } from './theta-tx.model';
import { Cache } from 'cache-manager';
export declare class TxResolver {
    private readonly txService;
    private cacheManager;
    constructor(txService: TxService, cacheManager: Cache);
    TransactionsStatistics(): {};
    ByDate(timezoneOffset: string, amount: TX_GET_DATA_AMOUNT): Promise<unknown>;
    ByHour(timezoneOffset: string, amount: TX_GET_DATA_AMOUNT): Promise<import("./theta-tx-num-by-hours.entity").ThetaTxNumByHoursEntity[]>;
}
