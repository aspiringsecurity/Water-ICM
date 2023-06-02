import { Field, ObjectType } from '@nestjs/graphql'
import { CandidateType, HeightListType } from './rpc-vcp.model'

@ObjectType()
export class BlockHashEenpPairType {
  @Field()
  BlockHash: string

  @Field(() => [CandidateType])
  EENs: Array<CandidateType>

  @Field(() => HeightListType, { nullable: true })
  HeightList: HeightListType
}

@ObjectType()
export class GetEenpByHeightModel {
  @Field(() => [BlockHashEenpPairType])
  BlockHashEenpPairs: [BlockHashEenpPairType]
}
