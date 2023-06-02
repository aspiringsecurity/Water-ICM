import { Module } from '@nestjs/common'
import { RpcService } from './rpc.service'
import { RpcResolver } from './rpc.resolver'

@Module({
  imports: [],
  providers: [RpcResolver, RpcService],
  exports: [RpcService]
})
export class RpcModule {}
