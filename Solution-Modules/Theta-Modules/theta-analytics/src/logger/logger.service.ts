import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { LoggerEntity } from './logger.entity'
import { LoggerRankByEnum } from './logger.resolver'
const moment = require('moment')
// import { LoggerService } from "src/common/logger.service";
@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(LoggerEntity, 'logger')
    private loggerRepository: Repository<LoggerEntity>
  ) {}

  async addQueryLog(query: string, hash: string) {
    await this.loggerRepository.query(
      `INSERT INTO  logger_entity (query,hash,call_times,update_timestamp) VALUES (?, ?,1,${moment().unix()}) ON CONFLICT (hash) DO UPDATE set call_times=call_times+1,update_timestamp=${moment().unix()}`,
      [query, hash]
    )
  }

  async query(rankBy: LoggerRankByEnum) {
    const queryParam: FindManyOptions = {}
    switch (rankBy) {
      case LoggerRankByEnum.call_times:
        queryParam.order = { call_times: 'DESC' }
        break
      case LoggerRankByEnum.update_time:
        queryParam.order = { update_timestamp: 'DESC' }
        break
      default:
        break
    }
    return await this.loggerRepository.find(queryParam)
  }
}
