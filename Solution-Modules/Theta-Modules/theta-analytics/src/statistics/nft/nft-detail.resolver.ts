import { NftDetailType } from './nft-statistics.model'
import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { NftStatisticsService } from './nft-statistics.service'
import { GraphQLString } from 'graphql'
import { CACHE_MANAGER, Inject } from '@nestjs/common'
const moment = require('moment')
import { Cache } from 'cache-manager'

@Resolver((of) => NftDetailType)
export class NftDetailResolver {
  constructor(
    private nftStatisticsService: NftStatisticsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Query(() => NftDetailType)
  async NftDetail(
    @Args('contract_address', { type: () => GraphQLString }) contractAddress: string
  ) {
    return await this.nftStatisticsService.getNftInfo(contractAddress)
  }

  @ResolveField()
  async by_24_hours(
    @Parent() nftDetail: NftDetailType,
    @Args('timezoneOffset', {
      type: () => Int,
      nullable: true,
      defaultValue: 0,
      description:
        'the timezone difference in minutes, between the UTC and the current local time.' +
        'Such as PDT time is utc-07, should pass -420'
    })
    timezoneOffset: number
    // @Args('contract_address', { type: () => GraphQLString }) contractAddress: string
  ) {
    const currDate = moment()
      .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
      .format('DD')
    const cacheKey =
      'nft_detail_1_day_' + currDate + nftDetail.smart_contract_address + String(timezoneOffset)
    if (await this.cacheManager.get(cacheKey)) {
      return await this.cacheManager.get(cacheKey)
    }
    const { contract_uri, smart_contract_address } = nftDetail
    const res = await this.nftStatisticsService.nftStatistics24H(
      smart_contract_address,
      contract_uri,
      timezoneOffset
    )
    this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 48 })
    return res
  }

  @ResolveField()
  async by_7_days(
    @Parent() nftDetail: NftDetailType,
    @Args('timezoneOffset', {
      type: () => Int,
      nullable: true,
      defaultValue: 0,
      description:
        'the timezone difference in minutes, between the UTC and the current local time.' +
        'Such as PDT time is utc-07, should pass -420'
    })
    timezoneOffset: number
    // @Args('contract_address', { type: () => GraphQLString }) contractAddress: string
  ) {
    const currDate = moment()
      .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
      .format('DD')
    const cacheKey =
      'nft_detail_7_days_' + currDate + nftDetail.smart_contract_address + String(timezoneOffset)
    if (await this.cacheManager.get(cacheKey)) {
      return await this.cacheManager.get(cacheKey)
    }
    const { contract_uri, smart_contract_address } = nftDetail
    const res = await this.nftStatisticsService.nftStatistics7Days(
      smart_contract_address,
      contract_uri,
      timezoneOffset
    )
    this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 48 })
    return res
  }

  @ResolveField()
  async by_30_days(
    @Parent() nftDetail: NftDetailType,
    @Args('timezoneOffset', {
      type: () => Int,
      nullable: true,
      defaultValue: '0',
      description:
        'the timezone difference in minutes, between the UTC and the current local time.' +
        'Such as PDT time is utc-07, should pass -420'
    })
    timezoneOffset: number
    // @Args('contract_address', { type: () => GraphQLString }) contractAddress: string
  ) {
    const currDate = moment()
      .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
      .format('DD')
    const cacheKey =
      'nft_detail_30_days_' + currDate + nftDetail.smart_contract_address + String(timezoneOffset)
    if (await this.cacheManager.get(cacheKey)) {
      return await this.cacheManager.get(cacheKey)
    }
    const { contract_uri, smart_contract_address } = nftDetail
    const res = await this.nftStatisticsService.nftStatistics30Days(
      smart_contract_address,
      contract_uri,
      timezoneOffset
    )
    this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 48 })
    return res
  }
}
