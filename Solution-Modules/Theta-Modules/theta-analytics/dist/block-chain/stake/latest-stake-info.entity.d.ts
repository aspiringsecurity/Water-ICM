import { STAKE_NODE_TYPE_ENUM } from './stake.model';
export declare class LatestStakeInfoEntity {
    id: number;
    node_type: STAKE_NODE_TYPE_ENUM;
    height: number;
    holder: string;
    create_date: number;
    update_date: number;
}
