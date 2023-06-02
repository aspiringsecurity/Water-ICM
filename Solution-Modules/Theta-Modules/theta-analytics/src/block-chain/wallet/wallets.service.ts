import { GetVcpByHeightModel } from './../rpc/rpc-vcp.model'
import { GetEenpByHeightModel } from './../rpc/rpc-eenp.model'
import { LatestStakeInfoEntity } from './../stake/latest-stake-info.entity'
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { MarketService } from '../../market/market.service'
import BigNumber from 'bignumber.js'
import { BalanceModel, StakeBalanceType, TotalBalanceType } from './wallet-balance.model'
import { InjectRepository } from '@nestjs/typeorm'
import { MoreThan, Repository } from 'typeorm'
import { WalletEntity } from './wallet.entity'
import { ActiveWalletsEntity } from './active-wallets.entity'
import { STAKE_NODE_TYPE_ENUM } from '../stake/stake.model'
import { GetGcpByHeightModel } from '../rpc/rpc-gcp.model'
import { RpcService } from '../rpc/rpc.service'
import { UtilsService } from 'src/common/utils.service'
@Injectable()
export class WalletService {
  logger = new Logger()

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectRepository(WalletEntity, 'wallet')
    private walletRepository: Repository<WalletEntity>,

    @InjectRepository(LatestStakeInfoEntity, 'stake')
    private latestStakeInfoRepository: Repository<LatestStakeInfoEntity>,

    @InjectRepository(ActiveWalletsEntity, 'wallet')
    private activeWalletsRepository: Repository<ActiveWalletsEntity>,

    private marketInfo: MarketService,

    private rpcService: RpcService,

    private utilsService: UtilsService
  ) {}

  public async getBalanceByAddress(address: string) {
    const accountBalance = await this.rpcService.getAccount(address)
    if (!accountBalance || !accountBalance || !accountBalance.coins) {
      return {
        theta: {
          amount: 0,
          fiat_currency_value: {
            usd: 0,
            cny: 0,
            eur: 0
          }
        },
        theta_fuel: {
          amount: 0,
          fiat_currency_value: {
            usd: 0,
            cny: 0,
            eur: 0
          }
        }
      }
    }
    const thetaBalance = {
      amount: Number(new BigNumber(accountBalance.coins.thetawei).dividedBy('1e18').toFixed()),
      fiat_currency_value: {
        usd:
          (await this.marketInfo.getPrice('theta')) *
          Number(new BigNumber(accountBalance.coins.thetawei).dividedBy('1e18').toFixed()),
        cny: 0,
        eur: 0
      }
    }
    const usdRate = await this.getUsdRate()
    thetaBalance.fiat_currency_value.cny = thetaBalance.fiat_currency_value.usd * usdRate.CNY
    thetaBalance.fiat_currency_value.eur = thetaBalance.fiat_currency_value.usd * usdRate.EUR
    const thetaFuelBalance = {
      amount: Number(new BigNumber(accountBalance.coins.tfuelwei).dividedBy('1e18').toFixed()),
      fiat_currency_value: {
        usd:
          (await this.marketInfo.getPrice('tfuel')) *
          Number(new BigNumber(accountBalance.coins.tfuelwei).dividedBy('1e18').toFixed()),
        cny: 0,
        eur: 0
      }
    }
    thetaFuelBalance.fiat_currency_value.cny =
      thetaFuelBalance.fiat_currency_value.usd * usdRate.CNY
    thetaFuelBalance.fiat_currency_value.eur =
      thetaFuelBalance.fiat_currency_value.usd * usdRate.EUR
    return {
      theta: thetaBalance,
      theta_fuel: thetaFuelBalance
    }
  }

  async getStakeInfoByAddress(address: string) {
    const gcpStake: Array<StakeBalanceType> = []
    const eenpStake: Array<StakeBalanceType> = []
    const vcpStake: Array<StakeBalanceType> = []
    const thetaPrice = await this.marketInfo.getPrice('theta')
    const tfuelPrice = await this.marketInfo.getPrice('tfuel')
    const usdRate = await this.getUsdRate()
    const gcpRes = await this.latestStakeInfoRepository.findOne({
      where: { node_type: STAKE_NODE_TYPE_ENUM.guardian }
    })
    if (gcpRes) {
      const gcpList: GetGcpByHeightModel = JSON.parse(gcpRes.holder)

      // const thetaMarketInfo = await this.marketInfo.getThetaMarketInfo()
      // const thetaFuelMarketInfo = await this.marketInfo.getThetaFuelMarketInfo()

      gcpList.BlockHashGcpPairs[0].Gcp.SortedGuardians.forEach((guardian) => {
        guardian.Stakes.forEach((stake) => {
          if (stake.source === address) {
            gcpStake.push({
              node_address: guardian.Holder,
              amount: Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()),
              withdrawn: stake.withdrawn,
              return_height: stake.return_height,
              fiat_currency_value: {
                usd: Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()) * thetaPrice,
                cny:
                  Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()) *
                  tfuelPrice *
                  usdRate.CNY,
                eur:
                  Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()) *
                  thetaPrice *
                  usdRate.EUR
              }
            })
          }
        })
      })
    }

    const eenpRes = await this.latestStakeInfoRepository.findOne({
      where: { node_type: STAKE_NODE_TYPE_ENUM.edge_cache }
    })
    if (eenpRes) {
      const eenpList: GetEenpByHeightModel = JSON.parse(eenpRes.holder)

      eenpList.BlockHashEenpPairs[0].EENs.forEach((een) => {
        een.Stakes.forEach((stake) => {
          if (stake.source === address) {
            eenpStake.push({
              node_address: een.Holder,
              amount: Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()),
              withdrawn: stake.withdrawn,
              return_height: stake.return_height,
              fiat_currency_value: {
                usd: Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()) * tfuelPrice,
                cny:
                  Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()) *
                  tfuelPrice *
                  usdRate.CNY,
                eur:
                  Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()) *
                  tfuelPrice *
                  usdRate.EUR
              }
            })
          }
        })
      })
    }

    const vaRes = await this.latestStakeInfoRepository.findOne({
      where: { node_type: STAKE_NODE_TYPE_ENUM.validator }
    })
    if (vaRes) {
      const validatorList: GetVcpByHeightModel = JSON.parse(vaRes.holder)

      validatorList.BlockHashVcpPairs[0].Vcp.SortedCandidates.forEach((vcp) => {
        vcp.Stakes.forEach((stake) => {
          if (stake.source === address) {
            vcpStake.push({
              node_address: vcp.Holder,
              amount: Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()),
              withdrawn: stake.withdrawn,
              return_height: stake.return_height,
              fiat_currency_value: {
                usd: Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()) * thetaPrice,
                cny:
                  Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()) *
                  thetaPrice *
                  usdRate.CNY,
                eur:
                  Number(new BigNumber(stake.amount).dividedBy('1e18').toFixed()) *
                  thetaPrice *
                  usdRate.EUR
              }
            })
          }
        })
      })
    }

    return {
      stake_to_guardian: gcpStake,
      stake_to_elite_node: eenpStake,
      stake_to_vcp: vcpStake
    }
  }

  public async getALlBalance(address: string): Promise<BalanceModel> {
    const totalBalance: TotalBalanceType = {
      fiat_currency_value: {
        usd: 0,
        cny: 0,
        eur: 0
      },
      theta_amount: 0,
      theta_fuel_amount: 0
    }
    let walletBalance = await this.getBalanceByAddress(address)
    totalBalance.theta_amount += walletBalance.theta.amount
    totalBalance.theta_fuel_amount += walletBalance.theta_fuel.amount
    totalBalance.fiat_currency_value.usd +=
      walletBalance.theta_fuel.fiat_currency_value.usd + walletBalance.theta.fiat_currency_value.usd
    totalBalance.fiat_currency_value.cny +=
      walletBalance.theta_fuel.fiat_currency_value.cny + walletBalance.theta.fiat_currency_value.cny
    totalBalance.fiat_currency_value.eur +=
      walletBalance.theta_fuel.fiat_currency_value.eur + walletBalance.theta.fiat_currency_value.eur
    let stakeBalance = await this.getStakeInfoByAddress(address)
    stakeBalance.stake_to_guardian.concat(stakeBalance.stake_to_vcp).forEach((stakeInfo) => {
      totalBalance.theta_amount += stakeInfo.amount
      totalBalance.fiat_currency_value.usd += stakeInfo.fiat_currency_value.usd
      totalBalance.fiat_currency_value.cny += stakeInfo.fiat_currency_value.cny
      totalBalance.fiat_currency_value.eur += stakeInfo.fiat_currency_value.eur
    })
    stakeBalance.stake_to_elite_node.forEach((stakeInfo) => {
      totalBalance.theta_fuel_amount += stakeInfo.amount
      totalBalance.fiat_currency_value.usd += stakeInfo.fiat_currency_value.usd
      totalBalance.fiat_currency_value.cny += stakeInfo.fiat_currency_value.cny
      totalBalance.fiat_currency_value.eur += stakeInfo.fiat_currency_value.eur
    })
    return {
      total: totalBalance,
      theta: walletBalance.theta,
      theta_fuel: walletBalance.theta_fuel,
      stake_to_guardian: stakeBalance.stake_to_guardian,
      stake_to_elite_node: stakeBalance.stake_to_elite_node,
      stake_to_validator_node: stakeBalance.stake_to_vcp
    }
  }

  public async getUsdRate(): Promise<{ CNY: number; EUR: number }> {
    const key = 'usd-rate-key'
    if (await this.cacheManager.get(key)) return await this.cacheManager.get(key)
    const jsonInfo = await this.utilsService.getJsonRes(
      'https://api.exchangerate-api.com/v4/latest/USD',
      3000
    )
    // console.log(await res.json())
    // let jsonInfo = res.data
    // console.log(res.json())
    await this.cacheManager.set(key, jsonInfo['rates'], { ttl: 60 * 60 * 24 * 7 })
    return jsonInfo['rates']
  }

  public async markActive(wallets: Array<{ address: string; timestamp: number }>): Promise<void> {
    try {
      const sqlArr = []
      for (const wallet of wallets) {
        // sqlArr.push(`('${wallet.address}', ${wallet.timestamp})`)
        sqlArr.push({
          address: wallet.address,
          latest_active_time: wallet.timestamp
        })
        // this.logger.debug(sqlArr.join(','))
        if (sqlArr.length > 900) {
          await this.walletRepository.upsert(sqlArr, ['address'])

          sqlArr.length = 0
        }
      }
      await this.walletRepository.upsert(sqlArr, ['address'])
    } catch (e) {
      this.logger.error('update wallet fail')
      this.logger.error(e)
    }
  }

  public async getActiveWallet(startTime) {
    return await this.activeWalletsRepository.find({
      where: { snapshot_time: MoreThan(startTime) }
    })
  }

  public async getWalletByAddress(address: string) {
    return await this.walletRepository.findOne({
      where: { address: address.toLowerCase() }
    })
  }
}
