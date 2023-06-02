import { RpcModule } from './../block-chain/rpc/rpc.module'
import { Module } from '@nestjs/common'
import { LoggerService } from './logger.service'
import { SolcService } from './solc.service'
import { UtilsService } from './utils.service'

@Module({
  imports: [RpcModule],
  providers: [SolcService, UtilsService, LoggerService],
  exports: [SolcService, UtilsService, LoggerService]
})
export class CommonModule {}
