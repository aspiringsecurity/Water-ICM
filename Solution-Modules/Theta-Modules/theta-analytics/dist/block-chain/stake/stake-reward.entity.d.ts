export declare enum STAKE_TOKEN_TYPE_ENUM {
    theta_stake = 1,
    elite_node_stake = 2
}
export declare class StakeRewardEntity {
    id: number;
    reward_amount: number;
    wallet_address: string;
    reward_height: number;
    timestamp: number;
    create_date: number;
    update_date: number;
}
