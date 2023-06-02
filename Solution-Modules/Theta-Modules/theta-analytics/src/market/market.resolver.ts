import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { KlineObj, KLINE_INTERVAL, MarketInformationType, TOKEN_PAIR_TYPE } from './market.model'
import { CACHE_MANAGER, Inject } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { MarketService } from './market.service'

@Resolver(() => MarketInformationType)
export class MarketResolver {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private marketService: MarketService
  ) {}

  @Query(() => MarketInformationType)
  async MarketInformation() {
    return {}
  }

  @ResolveField()
  async Theta() {
    return this.marketService.getThetaMarketInfo()
  }

  @ResolveField()
  async ThetaFuel() {
    return this.marketService.getThetaFuelMarketInfo()
  }

  @ResolveField(() => [KlineObj])
  async Kline(
    @Args('token_type', { type: () => TOKEN_PAIR_TYPE }) tokenType,
    @Args('interval', { type: () => KLINE_INTERVAL }) klineInterval
  ) {
    const cacheKey = 'kline_' + tokenType + klineInterval
    if (await this.cacheManager.get(cacheKey)) return await this.cacheManager.get(cacheKey)
    const res = await this.marketService.getKline(tokenType, klineInterval)
    await this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 6 })
    return res
  }
}
