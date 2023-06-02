import { Args, Query, registerEnumType, Resolver } from '@nestjs/graphql'
import { LoggerEntity } from './logger.entity'
import { LoggerService } from './logger.service'

export enum LoggerRankByEnum {
  call_times,
  update_time
}
registerEnumType(LoggerRankByEnum, {
  name: 'LoggerRankByEnum'
})

@Resolver()
export class loggerResolver {
  constructor(private loggerService: LoggerService) {}

  @Query(() => [LoggerEntity])
  async Logger(
    @Args('rank_by', {
      type: () => LoggerRankByEnum,
      nullable: true,
      defaultValue: LoggerRankByEnum.call_times
    })
    rankBy: LoggerRankByEnum
  ) {
    return await this.loggerService.query(rankBy)
  }
}
