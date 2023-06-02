import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { TxService } from './tx.service'
import { ThetaTransactionStatisticsType, TX_GET_DATA_AMOUNT } from './theta-tx.model'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'

import { Cache } from 'cache-manager'
const moment = require('moment')
@Resolver((of) => ThetaTransactionStatisticsType)
export class TxResolver {
  constructor(
    private readonly txService: TxService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Query(() => ThetaTransactionStatisticsType)
  TransactionsStatistics() {
    return {}
  }

  @ResolveField()
  async ByDate(
    @Args('timezoneOffset', {
      type: () => Int,
      nullable: true,
      defaultValue: '0',
      description:
        'the timezone difference in minutes, between the UTC and the current local time.' +
        'Such as PDT time is utc-07, should pass -420'
    })
    timezoneOffset: string,
    @Args('amount', {
      type: () => TX_GET_DATA_AMOUNT,
      defaultValue: TX_GET_DATA_AMOUNT._2week
    })
    amount: TX_GET_DATA_AMOUNT
  ) {
    const currDate = moment()
      .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
      .format('DD')
    const cacheKey = 'tx-by-date_' + currDate + '_' + amount + '_' + timezoneOffset
    if (await this.cacheManager.get(cacheKey)) {
      return await this.cacheManager.get(cacheKey)
    }
    const res = await this.txService.getThetaDataByDate(timezoneOffset, amount)
    // if(amount == TX_GET_DATA_AMOUNT._2year)
    await this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 12 })
    return res
  }

  @ResolveField()
  async ByHour(
    @Args('timezoneOffset', {
      type: () => Int,
      nullable: true,
      defaultValue: '0',
      description:
        'the timezone difference in minutes, between the UTC and the current local time.' +
        'Such as PDT time is utc-07, should pass -420'
    })
    timezoneOffset: string,
    @Args('amount', {
      type: () => TX_GET_DATA_AMOUNT,
      defaultValue: TX_GET_DATA_AMOUNT._2week
    })
    amount: TX_GET_DATA_AMOUNT
  ) {
    return await this.txService.getThetaByHour(timezoneOffset, amount)
  }
}
