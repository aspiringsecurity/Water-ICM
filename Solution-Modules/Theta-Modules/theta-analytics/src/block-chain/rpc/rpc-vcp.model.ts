import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLBoolean } from 'graphql'

@ObjectType()
export class CandidateStakeType {
  @Field()
  source: string

  @Field()
  amount: string

  @Field(() => GraphQLBoolean)
  withdrawn: boolean

  @Field()
  return_height: string
}

@ObjectType()
export class CandidateType {
  @Field()
  Holder: string

  @Field(() => [CandidateStakeType])
  Stakes: Array<CandidateStakeType>
}

@ObjectType()
export class VcpPairType {
  @Field(() => String, { nullable: true })
  BlockHash: string

  @Field(() => [CandidateType])
  SortedCandidates: Array<CandidateType>
}

@ObjectType()
export class HeightListType {
  @Field(() => [Int])
  Heights: Array<number>
}

@ObjectType()
export class BlockHashVcpPair {
  @Field()
  BlockHash: string

  @Field(() => VcpPairType)
  Vcp: VcpPairType

  @Field(() => HeightListType)
  HeightList: HeightListType
}

@ObjectType()
export class GetVcpByHeightModel {
  @Field(() => [BlockHashVcpPair])
  BlockHashVcpPairs: Array<BlockHashVcpPair>
}
