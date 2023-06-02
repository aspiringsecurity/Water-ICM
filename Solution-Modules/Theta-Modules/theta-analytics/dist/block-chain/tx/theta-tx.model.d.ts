import { ThetaTxNumByHoursEntity } from './theta-tx-num-by-hours.entity';
export declare class ThetaTransactionStatisticsType {
    ByDate: Array<ThetaTxNumByDateModel>;
    ByHour: ThetaTxNumByHoursEntity;
}
export declare class ThetaTxNumByDateModel {
    year: number;
    month: number;
    date: number;
    block_number: number;
    theta_fuel_burnt: number;
    theta_fuel_burnt_by_smart_contract: number;
    theta_fuel_burnt_by_transfers: number;
    active_wallet: number;
    coin_base_transaction: number;
    slash_transaction: number;
    send_transaction: number;
    reserve_fund_transaction: number;
    release_fund_transaction: number;
    service_payment_transaction: number;
    split_rule_transaction: number;
    deposit_stake_transaction: number;
    withdraw_stake_transaction: number;
    smart_contract_transaction: number;
    latest_block_height: number;
    timestamp: number;
}
export declare enum TX_GET_DATA_AMOUNT {
    _2week = 14,
    _1month = 31,
    _3month = 93,
    _6month = 186,
    _1year = 366,
    _2year = 732
}
