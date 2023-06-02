export interface PRICE_INTERFACE {
  price: number
}

export interface EXCHANGE_INTERFACE {
  base: string
  prices(pair: string): Promise<PRICE_INTERFACE>
  kLine(pair: string): Promise<Array<K_LINE_INTERFACE>>
  tickerPriceChange(pair: string): Promise<PRICE_CHANGE_INTERFACE>
}

export interface TRADING_EXCHANGE_HUOBI_CONFIG {
  access_key: string
  secretkey: string
  account_id: string
  account_id_pro: string
  trade_password: string
}

export interface TRADING_EXCHANGE_BINANCE_CONFIG {
  APIKEY: string
  APISECRET: string
}

export interface K_LINE_INTERFACE {
  time: string
  price: number //High price of the period
}

export interface PRICE_CHANGE_INTERFACE {
  symbol: string //'BNBBTC'
  priceChange: string // '-94.99999800'
  priceChangePercent: string // '-95.960'
  weightedAvgPrice: string //'0.29628482'
  prevClosePrice: string //'0.10002000'
  lastPrice: string //'4.00000200'
  lastQty: string //'200.00000000'
  bidPrice: string // '4.00000000'
  bidQty: string //'100.00000000'
  askPrice: string // '4.00000200'
  askQty: string //'100.00000000'
  openPrice: string //'99.00000000'
  highPrice: string //'100.00000000'
  lowPrice: string //'0.10000000'
  volume: string // '8913.30000000'
  quoteVolume: string // '15.30000000'
  openTime: string //1499783499040
  closeTime: string // 1499869899040
  firstId: string // 28385 // First tradeId
  lastId: string //28460 // Last tradeId
  count: string //76
}
