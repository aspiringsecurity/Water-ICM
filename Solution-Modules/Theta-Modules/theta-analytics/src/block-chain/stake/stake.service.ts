import { RpcService } from './../rpc/rpc.service'
import { InjectRepository } from '@nestjs/typeorm'
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm'
import { StakeStatisticsEntity } from './stake-statistics.entity'
import { Injectable, Logger, CACHE_MANAGER, Inject } from '@nestjs/common'
import { StakeRewardEntity } from './stake-reward.entity'
// import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

const moment = require('moment')

@Injectable()
export class StakeService {
  logger = new Logger()
  constructor(
    @InjectRepository(StakeStatisticsEntity, 'stake')
    private stakeStatisticsRepository: Repository<StakeStatisticsEntity>,
    @InjectRepository(StakeRewardEntity, 'stake')
    private stakeRewardRepository: Repository<StakeRewardEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private rpcService: RpcService
  ) {}

  async getLatestFinalizedBlock() {
    let nodeInfo = await this.rpcService.getStatus()
    return nodeInfo.latest_finalized_block_height
  }

  async getLatestStakeStatics() {
    const key = 'latest-stake-info-key'
    if (await this.cacheManager.get(key)) return await this.cacheManager.get(key)
    const latestStakeInfo = await this.stakeStatisticsRepository.findOne({
      where: {
        id: MoreThan(0)
      },
      order: {
        block_height: 'DESC'
      }
    })
    if (latestStakeInfo) {
      this.logger.debug('latest block height:' + latestStakeInfo.block_height)
      const stakeInfo = await this.stakeStatisticsRepository.find({
        where: {
          block_height: MoreThanOrEqual(latestStakeInfo.block_height - 13800 * 7)
        },
        order: {
          block_height: 'ASC'
        }
      })
      await this.cacheManager.set(key, stakeInfo, { ttl: 60 * 5 })
      return stakeInfo
    } else {
      return []
    }
  }

  async getStakeReward(
    wallet_address: string,
    period: 'last_24_hour' | 'last_3_days' | 'last_7_days' | 'last_30_days'
  ) {
    let rewardList: Array<StakeRewardEntity> = []
    this.logger.debug('period:' + period)
    this.logger.debug('wallet:' + wallet_address)
    switch (period) {
      case 'last_24_hour':
        rewardList = await this.stakeRewardRepository.find({
          where: {
            timestamp: MoreThan(moment().subtract(24, 'hours').unix()),
            wallet_address: wallet_address
          }
        })
        break
      case 'last_7_days':
        rewardList = await this.stakeRewardRepository.find({
          where: {
            timestamp: MoreThan(moment().subtract(7, 'days').unix()),
            wallet_address: wallet_address
          }
        })
        break
      case 'last_3_days':
        rewardList = await this.stakeRewardRepository.find({
          where: {
            timestamp: MoreThan(moment().subtract(3, 'days').unix()),
            wallet_address: wallet_address
          }
        })
        break
      case 'last_30_days':
        rewardList = await this.stakeRewardRepository.find({
          where: {
            timestamp: MoreThan(moment().subtract(3, 'days').unix()),
            wallet_address: wallet_address
          }
        })
        break
      default:
        break
    }
    return rewardList.reduce((oldValue, reward) => {
      return oldValue + reward.reward_amount
    }, 0)
  }
}
