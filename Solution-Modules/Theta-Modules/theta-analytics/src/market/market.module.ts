import { RpcModule } from './../block-chain/rpc/rpc.module'
import { ExchangeModule } from './../exchange/exchange.module'
import { CacheModule, Module } from '@nestjs/common'
import { MarketResolver } from './market.resolver'
import { MarketService } from './market.service'

@Module({
  imports: [CacheModule.register(), ExchangeModule, RpcModule],
  providers: [MarketResolver, MarketService],
  exports: [MarketService]
})
export class MarketModule {}
