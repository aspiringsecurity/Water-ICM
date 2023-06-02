export declare class StakeRewardDistributionRuleType {
    Beneficiary: string;
    SplitBasisPoint: string;
    StakeHolder: string;
}
export declare class StakeRewardDistributionRuleSetType {
    BlockHash: string;
    StakeRewardDistributionRuleSet: Array<StakeRewardDistributionRuleType>;
}
export declare class BlockHashStakeRewardDistributionRuleSetPairsModel {
    BlockHashStakeRewardDistributionRuleSetPairs: StakeRewardDistributionRuleSetType;
}
