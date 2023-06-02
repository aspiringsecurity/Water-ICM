import { THETA_TRANSACTION_TYPE_ENUM } from './../tx/theta.enum';
export declare class TransactionEntity {
    id: number;
    tx_hash: string;
    tx_type: THETA_TRANSACTION_TYPE_ENUM;
    from: string;
    to: string;
    fee: string;
    gas_price: string;
    gas_limit: string;
    height: number;
    timestamp: number;
    theta: number;
    theta_fuel: number;
    create_date: number;
    update_date: number;
}
