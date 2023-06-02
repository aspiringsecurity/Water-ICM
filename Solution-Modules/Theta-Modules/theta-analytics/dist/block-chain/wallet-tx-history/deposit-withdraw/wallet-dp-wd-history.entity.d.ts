import { STAKE_NODE_TYPE_ENUM } from 'src/block-chain/stake/stake.model';
import { THETA_TRANSACTION_TYPE_ENUM } from 'src/block-chain/tx/theta.enum';
export declare class WalletDpWdHistoryEntity {
    id: number;
    wallet_address: string;
    tx_hash: string;
    theta: number;
    tfuel: number;
    node_address: string;
    node_type: STAKE_NODE_TYPE_ENUM;
    tx_type: THETA_TRANSACTION_TYPE_ENUM;
    height: number;
    timestamp: number;
    create_date: number;
    update_date: number;
}
