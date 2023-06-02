import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallets.service';
import { ThetaTxNumByHoursEntity } from './theta-tx-num-by-hours.entity';
import { ThetaTxNumByDateModel, TX_GET_DATA_AMOUNT } from './theta-tx.model';
export declare class TxService {
    private thetaTxNumRepository;
    private walletService;
    constructor(thetaTxNumRepository: Repository<ThetaTxNumByHoursEntity>, walletService: WalletService);
    getThetaDataByDate(timezoneOffset: string, days?: TX_GET_DATA_AMOUNT): Promise<ThetaTxNumByDateModel[]>;
    getThetaByHour(timezoneOffset: any, amount?: TX_GET_DATA_AMOUNT): Promise<ThetaTxNumByHoursEntity[]>;
}
