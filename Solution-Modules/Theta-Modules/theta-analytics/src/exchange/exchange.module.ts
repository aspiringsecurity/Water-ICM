import { CacheModule, Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'
import { BinanceService } from './binance.service'
// import { LoggerModule } from '../logger/logger.module'
// const config = require('config')
@Module({
  imports: [],
  providers: [BinanceService],
  exports: [BinanceService]
})
export class ExchangeModule {}
