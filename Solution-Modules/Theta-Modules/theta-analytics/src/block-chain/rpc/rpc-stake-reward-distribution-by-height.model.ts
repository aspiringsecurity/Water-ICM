import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StakeRewardDistributionRuleType {
  @Field()
  Beneficiary: string

  @Field()
  SplitBasisPoint: string

  @Field()
  StakeHolder: string
}

@ObjectType()
export class StakeRewardDistributionRuleSetType {
  @Field()
  BlockHash: string

  @Field(() => [StakeRewardDistributionRuleType])
  StakeRewardDistributionRuleSet: Array<StakeRewardDistributionRuleType>
}

@ObjectType()
export class BlockHashStakeRewardDistributionRuleSetPairsModel {
  @Field(() => [StakeRewardDistributionRuleSetType])
  BlockHashStakeRewardDistributionRuleSetPairs: StakeRewardDistributionRuleSetType
}
