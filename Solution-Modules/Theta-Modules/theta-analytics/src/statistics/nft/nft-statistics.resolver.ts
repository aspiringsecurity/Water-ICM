import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { GraphQLInt, GraphQLString } from 'graphql'
import { NftStatisticsEntity } from './nft-statistics.entity'
import { NftDetailType, PaginatedNftStatistics } from './nft-statistics.model'
import { NftStatisticsOrderByType, NftStatisticsService } from './nft-statistics.service'

@Resolver(() => PaginatedNftStatistics)
export class NftStatisticsResolver {
  constructor(private nftStatisticsService: NftStatisticsService) {}

  @Query(() => PaginatedNftStatistics)
  async NftStatistics(
    @Args('order_by', { type: () => NftStatisticsOrderByType })
    orderBy: NftStatisticsOrderByType,
    @Args('take', { type: () => GraphQLInt, defaultValue: 10 }) take: number,
    @Args('skip', { type: () => GraphQLInt, defaultValue: 0 }) skip: number,
    @Args('search', { type: () => GraphQLString, nullable: true }) search: string,
    @Args('after', { nullable: true }) after: string
  ) {
    const [hasNextPage, totalNumber, res] = await this.nftStatisticsService.getNft(
      orderBy,
      take,
      after,
      skip,
      search
    )
    let endCursor = ''
    if (res.length > 0) {
      switch (orderBy) {
        case NftStatisticsOrderByType.last_24_h_users:
          endCursor = Buffer.from(res[res.length - 1].last_24_h_users.toString()).toString('base64')
          break
        case NftStatisticsOrderByType.last_7_days_users:
          endCursor = Buffer.from(res[res.length - 1].last_7_days_users.toString()).toString(
            'base64'
          )
          break
        case NftStatisticsOrderByType.last_30_days_users:
          endCursor = Buffer.from(res[res.length - 1].last_30_days_users.toString()).toString(
            'base64'
          )
          break
        case NftStatisticsOrderByType.last_24_h_transactions:
          endCursor = Buffer.from(res[res.length - 1].last_24_h_transactions.toString()).toString()
          break
        case NftStatisticsOrderByType.last_7_days_transactions:
          endCursor = Buffer.from(
            res[res.length - 1].last_7_days_transactions.toString()
          ).toString()
          break
        case NftStatisticsOrderByType.last_30_days_transactions:
          endCursor = Buffer.from(
            res[res.length - 1].last_30_days_transactions.toString()
          ).toString()
          break
        case NftStatisticsOrderByType.last_24_h_volume:
          endCursor = Buffer.from(res[res.length - 1].last_24_h_volume.toString()).toString(
            'base64'
          )
          break
        case NftStatisticsOrderByType.last_7_days_volume:
          endCursor = Buffer.from(res[res.length - 1].last_7_days_volume.toString()).toString(
            'base64'
          )
          break
        case NftStatisticsOrderByType.last_30_days_volume:
          endCursor = Buffer.from(res[res.length - 1].last_30_days_volume.toString()).toString(
            'base64'
          )
          break
        default:
          endCursor = Buffer.from(res[res.length - 1].last_24_h_users.toString()).toString('base64')
          break
      }
    }
    return {
      endCursor: endCursor,
      hasNextPage: hasNextPage,
      nodes: res,
      skip: skip,
      totalCount: totalNumber
    }
  }

  // @Query(() => NftDetailType)
  // async NftDetail(
  //   @Args('contract_address', { type: () => GraphQLString }) contractAddress: string
  // ) {
  //   return await this.nftStatisticsService.nftDetail(contractAddress)
  // }

  @Mutation(() => NftStatisticsEntity)
  async updateNftImg(
    @Args('contract_address', { type: () => GraphQLString }) contractAddress: string,
    @Args('img_uri', { type: () => GraphQLString }) imgUri: string
  ) {
    return await this.nftStatisticsService.updateNftImg(contractAddress, imgUri)
  }
}
