import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerEntity } from './logger.entity'
import { loggerResolver } from './logger.resolver'
import { LoggerService } from './logger.service'

@Module({
  imports: [TypeOrmModule.forFeature([LoggerEntity], 'logger')],
  providers: [LoggerService, loggerResolver],
  exports: [LoggerService]
})
export class LoggerModule {}
