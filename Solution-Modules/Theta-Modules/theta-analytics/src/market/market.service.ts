import { RpcService } from './../block-chain/rpc/rpc.service'
import { KLINE_INTERVAL, TokenMarketInformationType, TOKEN_PAIR_TYPE } from './market.model'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { BinanceService } from 'src/exchange/binance.service'

@Injectable()
export class MarketService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private exchangeService: BinanceService,
    private RpcService: RpcService
  ) {}
  public async getThetaMarketInfo(): Promise<TokenMarketInformationType> {
    const key = 'theta-market-info'
    if (await this.cacheManager.get(key)) return await this.cacheManager.get(key)
    const res = await this.exchangeService.tickerPriceChange('THETAUSDT')
    const kline = await this.exchangeService.kLine('THETAUSDT')
    const marketInfo = {
      name: 'THETA',
      price: Number(res.lastPrice),
      volume_24h: Number(res.priceChangePercent),
      price_change_percent: Number(res.priceChangePercent),
      kline: kline,
      total_supply: 1000000000,
      circulating_supply: 1000000000
    }
    await this.cacheManager.set(key, marketInfo, { ttl: 60 * 5 })
    return marketInfo
  }

  public async getThetaFuelMarketInfo(): Promise<TokenMarketInformationType> {
    const key = 'tfuel-market-info'
    if (await this.cacheManager.get(key)) return await this.cacheManager.get(key)
    const res = await this.exchangeService.tickerPriceChange('TFUELUSDT')
    const kline = await this.exchangeService.kLine('TFUELUSDT')
    const lastfinalizedHeight = await (
      await this.RpcService.getStatus()
    ).latest_finalized_block_height
    const baseTfuel = 5829173326
    const tfuelNew = Math.floor((Number(lastfinalizedHeight) - 16856001) / 100) * 8600
    const marketInfo = {
      name: 'TFUEL',
      price: Number(res.lastPrice),
      volume_24h: Number(res.priceChangePercent),
      price_change_percent: Number(res.priceChangePercent),
      kline: kline,
      total_supply: baseTfuel + tfuelNew,
      circulating_supply: baseTfuel + tfuelNew
    }

    await this.cacheManager.set(key, marketInfo, { ttl: 60 * 5 })
    return marketInfo
  }

  public async getPrice(ticker: string): Promise<number> {
    const res = await this.exchangeService.tickerPriceChange(ticker.toUpperCase() + 'USDT')
    return Number(res.lastPrice)
  }

  public async getKline(pair: TOKEN_PAIR_TYPE, interval: KLINE_INTERVAL) {
    return await this.exchangeService.kLine(pair, interval)
  }
}
