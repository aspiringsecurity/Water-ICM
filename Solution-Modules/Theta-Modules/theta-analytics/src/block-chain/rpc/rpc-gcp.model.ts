import { Field, ObjectType } from '@nestjs/graphql'
import { CandidateType, HeightListType } from './rpc-vcp.model'

@ObjectType()
export class GcpType {
  @Field(() => [CandidateType])
  SortedGuardians: Array<CandidateType>
}

@ObjectType()
export class BlockHashGcpPairType {
  @Field()
  BlockHash: string

  @Field(() => GcpType)
  Gcp: GcpType

  @Field(() => HeightListType, { nullable: true })
  HeightList: HeightListType
}

@ObjectType()
export class GetGcpByHeightModel {
  @Field(() => [BlockHashGcpPairType])
  BlockHashGcpPairs: [BlockHashGcpPairType]
}
