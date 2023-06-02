import { WalletDpWdHistoryModule } from './block-chain/wallet-tx-history/deposit-withdraw/wallet-dp-wd-history.module'
import { WalletSendHistoryModule } from './block-chain/wallet-tx-history/send/wallet-send-history.module'
import { WalletTxHistoryModule } from './block-chain/wallet-tx-history/wallet-tx-history.module'
import { ExplorerModule } from './block-chain/explorer/explorer.module'
import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { TxModule } from './block-chain/tx/tx.module'
import { ScheduleModule } from '@nestjs/schedule'
import { StakeModule } from './block-chain/stake/stake.module'
import { MarketModule } from './market/market.module'
import { RpcModule } from './block-chain/rpc/rpc.module'
import { SmartContractModule } from './block-chain/smart-contract/smart-contract.module'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ThrottlerModule } from '@nestjs/throttler'
import { WalletModule } from './block-chain/wallet/wallet.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ContactModule } from './contact/contact.module'
import { ApolloDriver } from '@nestjs/apollo'
import { APP_GUARD } from '@nestjs/core'
import { GqlThrottlerGuard } from './guard'
import { LoggerModule } from './logger/logger.module'
import { LoggerMiddleware } from './logger/logger.middleware'
import { NftStatisticsModule } from './statistics/nft/nft-statistics.module'
import { config } from './const'
import { ThetaTxNumByHoursEntity } from './block-chain/tx/theta-tx-num-by-hours.entity'
// const config = require('config')
// var _ = require('lodash')

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'contact/index.sqlite',
      name: 'contact',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'analyse/index.sqlite',
      name: 'analyse',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'smart_contract/index.sqlite',
      name: 'smart_contract',
      // prepareDatabase: (obj) => {
      //   obj.pragma('journal_size_limit', { journal_size_limit: 1024 * 1024 * 100 })
      //   console.log('prepare database obj', obj)
      // },
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'tx/index.sqlite',
      name: 'tx',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'nft/index.sqlite',
      name: 'nft',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'stake/index.sqlite',
      name: 'stake',
      entities: []
    }),

    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'wallet/index.sqlite',
      name: 'wallet',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'logger/index.sqlite',
      name: 'logger',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'nft-statistics/index.sqlite',
      name: 'nft-statistics',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'explorer/index.sqlite',
      name: 'explorer',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'wallet-tx-history/index.sqlite',
      name: 'wallet-tx-history',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'wallet-send-history/index.sqlite',
      name: 'wallet-send-history',
      entities: []
    }),
    TypeOrmModule.forRoot({
      ...config.get('ORM_CONFIG'),
      database: config.get('ORM_CONFIG')['database'] + 'wallet-dp-wd-history/index.sqlite',
      name: 'wallet-dp-wd-history',
      entities: []
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      introspection: true,
      context: ({ req, res }) => ({ req, res })
    }),
    CacheModule.register(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'playground'),
      exclude: ['/graphql*']
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: config.get('RATE_LIMIT')['ttl'],
      limit: config.get('RATE_LIMIT')['limit']
    }),
    TxModule,
    StakeModule,
    MarketModule,
    RpcModule,
    SmartContractModule,
    WalletModule,
    ContactModule,
    LoggerModule,
    NftStatisticsModule,
    ExplorerModule,
    WalletTxHistoryModule,
    WalletSendHistoryModule,
    WalletDpWdHistoryModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
