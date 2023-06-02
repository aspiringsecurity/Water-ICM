import { Args, Info, Query, Resolver } from '@nestjs/graphql'
import { StakeService } from './stake.service'
import { StakeStatisticsEntity } from './stake-statistics.entity'
import { Logger } from '@nestjs/common'
import { StakeRewardModel } from './stake.model'
import { fieldsList } from 'graphql-fields-list'
import { GraphQLString } from 'graphql'
import { MarketService } from '../../market/market.service'
import { WalletService } from '../wallet/wallets.service'

@Resolver(() => StakeStatisticsEntity)
export class StakeResolver {
  logger = new Logger()

  constructor(
    private stakeService: StakeService,
    private marketInfo: MarketService,
    private walletService: WalletService
  ) {}

  @Query(() => [StakeStatisticsEntity], {
    description: 'Return to statistics related to token pledges',
    nullable: true
  })
  async StakeStatistics() {
    return await this.stakeService.getLatestStakeStatics()
  }

  @Query(() => StakeRewardModel)
  async StakeReward(
    @Info() info,
    @Args('wallet_address', { type: () => GraphQLString! }) wallet_address: string
  ) {
    // console.log(fieldsList(info))
    const reward = new StakeRewardModel()
    const thetaFuelMarketInfo = await this.marketInfo.getThetaFuelMarketInfo()
    wallet_address = wallet_address.toLocaleLowerCase()
    for (const field of fieldsList(info)) {
      //@ts-ignore
      const rewardAmount = await this.stakeService.getStakeReward(wallet_address, field)
      reward[field] = {
        amount: rewardAmount,
        fiat_currency_value: {
          usd: thetaFuelMarketInfo.price * rewardAmount,
          cny:
            thetaFuelMarketInfo.price * rewardAmount * (await this.walletService.getUsdRate()).CNY,
          eur:
            thetaFuelMarketInfo.price * rewardAmount * (await this.walletService.getUsdRate()).EUR
        }
      }
    }
    return reward
    // return new StakeRewardModel()
  }
}
