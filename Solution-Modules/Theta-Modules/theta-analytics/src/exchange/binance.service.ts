import { CACHE_MANAGER, Inject, Injectable, Logger, Scope } from '@nestjs/common'
import { Cache } from 'cache-manager'
import {
  // BALANCE_LIST,
  EXCHANGE_INTERFACE,
  K_LINE_INTERFACE,
  PRICE_CHANGE_INTERFACE,
  // ORDER_STATUS,
  PRICE_INTERFACE,
  TRADING_EXCHANGE_BINANCE_CONFIG
  // TYPE_LIMIT
} from './exchange.interface'
// import { WinstonLoggerService } from '../logger/winston-logger.service';
const axios = require('axios')

// const crypto = require('crypto')
// const userAgent = 'Mozilla/4.0 (compatible; Node Binance API)'
// const contentType = 'application/x-www-form-urlencoded'
const default_options = {
  recvWindow: 50000,
  useServerTime: false,
  reconnect: true,
  verbose: false,
  test: false,
  info: { timeOffset: 0 }
}

@Injectable()
export class BinanceService implements EXCHANGE_INTERFACE {
  APISECRET = ''
  APIKEY = ''
  logger: Logger
  constructor() {
    this.logger = new Logger('BinanceService')
  }

  base = 'https://api.binance.com/api/'
  baseArr = [
    'https://api.binance.com/api/',
    'https://api1.binance.com/api/',
    'https://api2.binance.com/api/',
    'https://api3.binance.com/api/'
  ]

  async prices(pair: string | null): Promise<PRICE_INTERFACE> {
    // let cache = await this.cacheManager.;
    // this.cacheManager.
    // let cacheRes: any = await this.cacheManager.get(pair)
    // if (cacheRes) return cacheRes
    const params = typeof pair === 'string' ? '?symbol=' + pair.toUpperCase() : ''
    let opt = {
      url: this.baseArr[Math.floor(Math.random() * this.baseArr.length)] + 'v3/ticker/price',
      params: {
        symbol: pair.toUpperCase()
      },
      timeout: default_options.recvWindow,
      method: 'get'
    }
    let res = await axios(opt)
    // await this.cacheManager.set(pair, { price: Number(res.data.price) }, { ttl: 1 })
    return { price: Number(res.data.price) }
  }

  async kLine(pair: string, interval = '5m'): Promise<Array<K_LINE_INTERFACE>> {
    const params = typeof pair === 'string' ? '?symbol=' + pair.toUpperCase() : ''
    let opt = {
      url: this.baseArr[Math.floor(Math.random() * this.baseArr.length)] + 'v3/klines',
      params: {
        symbol: pair.toUpperCase(),
        interval: interval,
        limit: 1000
      },
      timeout: default_options.recvWindow,
      method: 'get',
      responseType: 'json'
    }
    // console.log('start get axios')
    // console.log('opt', opt)
    const httpRes = await axios(opt)
    // this.logger.debug()
    // console.log('res data', httpRes.data)
    const dataToReturn = []
    httpRes.data.forEach((item) => {
      dataToReturn.push({
        time: Number(item[0]),
        price: Number(item[2])
      })
    })
    return dataToReturn
  }

  async tickerPriceChange(pair: string): Promise<PRICE_CHANGE_INTERFACE> {
    const params = typeof pair === 'string' ? '?symbol=' + pair.toUpperCase() : ''
    let opt = {
      url: this.baseArr[Math.floor(Math.random() * this.baseArr.length)] + 'v3/ticker/24hr',
      params: {
        symbol: pair.toUpperCase()
        // interval: interval,
        // limit: 1000
      },
      timeout: default_options.recvWindow,
      method: 'get'
    }
    let res = await axios(opt)
    // await this.cacheManager.set(pair, { price: Number(res.data.price) }, { ttl: 1 })
    const resToReturn: PRICE_CHANGE_INTERFACE = {
      symbol: '',
      priceChange: '',
      priceChangePercent: '',
      weightedAvgPrice: '',
      prevClosePrice: '',
      lastPrice: '',
      lastQty: '',
      bidPrice: '',
      bidQty: '',
      askPrice: '',
      askQty: '',
      openPrice: '',
      highPrice: '',
      lowPrice: '',
      volume: '',
      quoteVolume: '',
      openTime: '',
      closeTime: '',
      firstId: '',
      lastId: '',
      count: ''
    }
    return Object.assign(resToReturn, res.data)
  }
}
