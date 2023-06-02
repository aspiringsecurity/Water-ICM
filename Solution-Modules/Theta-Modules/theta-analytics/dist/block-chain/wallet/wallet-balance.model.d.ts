export declare class FiatCurrencyType {
    usd: number;
    cny: number;
    eur: number;
}
export declare class TokenBalanceType {
    amount: number;
    fiat_currency_value: FiatCurrencyType;
}
export declare class StakeBalanceType {
    node_address: string;
    amount: number;
    withdrawn: boolean;
    return_height: string;
    fiat_currency_value: FiatCurrencyType;
}
export declare class TotalBalanceType {
    theta_amount: number;
    theta_fuel_amount: number;
    fiat_currency_value: FiatCurrencyType;
}
export declare class BalanceModel {
    theta: TokenBalanceType;
    theta_fuel: TokenBalanceType;
    stake_to_guardian: Array<StakeBalanceType>;
    stake_to_elite_node: Array<StakeBalanceType>;
    stake_to_validator_node: Array<StakeBalanceType>;
    total: TotalBalanceType;
}
