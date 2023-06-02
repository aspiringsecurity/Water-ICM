import { TokenMarketInformationType } from './../../market/market.model'
import { Injectable, Logger } from '@nestjs/common'
import { NftBalanceEntity } from 'src/block-chain/smart-contract/nft/nft-balance.entity'
import { NftTransferRecordEntity } from 'src/block-chain/smart-contract/nft/nft-transfer-record.entity'
import { SmartContractEntity } from 'src/block-chain/smart-contract/smart-contract.entity'
import { UtilsService, writeFailExcuteLog, writeSucessExcuteLog } from 'src/common/utils.service'
import { SmartContractProtocolEnum } from 'src/contact/contact.entity'
import { MarketService } from 'src/market/market.service'
import { DataSource, LessThan, MoreThan, MoreThanOrEqual, Not, QueryRunner } from 'typeorm'
import { NftStatisticsEntity } from './nft-statistics.entity'
const fs = require('fs')
const moment = require('moment')
let nftLogoConfig = []
if (fs.existsSync('resources/nft-logo.json')) {
  nftLogoConfig = JSON.parse(fs.readFileSync('resources/nft-logo.json'))
}
let nftIgnore = []
if (fs.existsSync('resources/nft-ignore.json')) {
  nftIgnore = JSON.parse(fs.readFileSync('resources/nft-ignore.json'))
}
import { config } from 'src/const'
import { InjectDataSource } from '@nestjs/typeorm'
@Injectable()
export class NftStatisticsAnalyseService {
  private readonly logger = new Logger('nft statistics analyse service')
  analyseKey = 'under_analyse'

  private smartContractConnectionRunner: QueryRunner
  private nftConnectionRunner: QueryRunner
  private nftStatisticsConnectionRunner: QueryRunner
  private heightConfigFile = config.get('ORM_CONFIG')['database'] + 'nft-statistics/record.height'
  private refetchContractUriId =
    config.get('ORM_CONFIG')['database'] + 'nft-statistics/refetch-uri.id'
  private imgPathRestoreId =
    config.get('ORM_CONFIG')['database'] + 'nft-statistics/img-path-restore.id'
  private tfuelPrice: TokenMarketInformationType

  constructor(
    private utilsService: UtilsService,
    private marketService: MarketService,
    @InjectDataSource('smart_contract')
    private smartContractConnectionInjected: DataSource,
    @InjectDataSource('nft') private nftConnectionInjected: DataSource,
    @InjectDataSource('nft-statistics')
    private nftStatisticsConnectionInjected: DataSource
  ) {}

  public async analyse() {
    try {
      // console.log(config.get('NFT_STATISTICS.ANALYSE_NUMBER'))
      this.logger.debug('start analyse nft data')
      this.smartContractConnectionRunner = this.smartContractConnectionInjected.createQueryRunner()
      this.nftConnectionRunner = this.nftConnectionInjected.createQueryRunner()
      this.nftStatisticsConnectionRunner = this.nftStatisticsConnectionInjected.createQueryRunner()
      // await this.smartContractConnection.connect()
      // await this.nftConnection.connect()
      // await this.nftStatisticsConnection.connect()
      await this.nftStatisticsConnectionRunner.startTransaction()
      let startId: number = 0
      if (!fs.existsSync(this.heightConfigFile)) {
        fs.writeFileSync(this.heightConfigFile, '0')
      } else {
        const data = fs.readFileSync(this.heightConfigFile, 'utf8')
        if (data) {
          startId = Number(data)
        }
      }
      this.tfuelPrice = await this.marketService.getThetaFuelMarketInfo()
      let nftList: Array<string> = []
      const nftTransferRecordList = await this.nftConnectionRunner.manager.find(
        NftTransferRecordEntity,
        {
          where: {
            id: MoreThan(startId)
          },
          take: config.get('NFT_STATISTICS.ANALYSE_NUMBER'),
          order: { id: 'ASC' }
        }
      )
      await this.setZero()
      // console.log(nftList['a']['b'])

      const promiseArr = []
      this.logger.debug('nftTransferRecordList.length: ' + nftTransferRecordList.length)
      for (const record of nftTransferRecordList) {
        if (!nftList.includes(record.smart_contract_address)) {
          nftList.push(record.smart_contract_address)
        }
      }
      const top20 = await this.nftStatisticsConnectionRunner.manager.find(NftStatisticsEntity, {
        order: {
          last_24_h_users: 'DESC'
        },
        take: 20
      })
      for (const nft of top20) {
        if (!nftList.includes(nft.smart_contract_address)) {
          nftList.push(nft.smart_contract_address)
        }
      }
      this.logger.debug('nft list length:' + nftList.length)
      for (const nft of nftList) {
        promiseArr.push(this.nftStatistics(nft))
      }
      // console.log(111)
      await Promise.all(promiseArr)
      // console.log(222)

      // this.logger.debug('start update calltimes by period')

      // await this.updateNftsImgUri()
      // console.log(333)
      await this.autoRefetchContractUri()
      if (config.get('RESTORE_NFT_IMG_PATH')) {
        await this.restoreImgUri()
      }

      // await this.downloadAllImg()
      await this.nftStatisticsConnectionRunner.commitTransaction()

      // try {
      if (nftTransferRecordList.length > 0) {
        this.logger.debug(
          'end height:' + Number(nftTransferRecordList[nftTransferRecordList.length - 1].id)
        )
        this.utilsService.updateRecordHeight(
          this.heightConfigFile,
          nftTransferRecordList[nftTransferRecordList.length - 1].id
        )
      }
      writeSucessExcuteLog(config.get('NFT_STATISTICS.MONITOR_PATH'))
    } catch (e) {
      console.error(e.message)
      this.logger.error(e.message)
      this.logger.error('rollback')
      await this.nftStatisticsConnectionRunner.rollbackTransaction()
      writeFailExcuteLog(config.get('NFT_STATISTICS.MONITOR_PATH'))
    } finally {
      await this.nftStatisticsConnectionRunner.release()
      this.logger.debug('end analyse nft data')
      this.logger.debug('release success')
    }
  }

  async nftStatistics(smartContractAddress: string) {
    this.logger.debug('start nftStatistics:' + smartContractAddress)
    if (nftIgnore.includes(smartContractAddress)) {
      this.logger.debug('no nedd analyse:' + smartContractAddress)
      return
    }
    const smartContract = await this.smartContractConnectionRunner.manager.findOne(
      SmartContractEntity,
      {
        where: { contract_address: smartContractAddress }
      }
    )
    if (!smartContract || smartContract.protocol !== SmartContractProtocolEnum.tnt721) {
      this.logger.debug('no contract or not tnt721 protocol:' + smartContractAddress)
      return
    }
    const allItems = await this.nftConnectionRunner.manager.count(NftBalanceEntity, {
      where: {
        owner: Not('0x0000000000000000000000000000000000000000'),
        smart_contract_address: smartContractAddress
      }
    })
    const destroyedItems = await this.nftConnectionRunner.manager.count(NftBalanceEntity, {
      where: {
        owner: '0x0000000000000000000000000000000000000000',
        smart_contract_address: smartContractAddress
      }
    })
    const uniqueOwners = await this.nftConnectionRunner.query(
      `select count(distinct(owner)) as _num from nft_balance_entity where nft_balance_entity.smart_contract_address = '${smartContractAddress}' and nft_balance_entity.owner != '0x0000000000000000000000000000000000000000'`
    )
    // console.log(uniqueOwners)
    const uniqueHolders = uniqueOwners[0]._num

    // const uniqueOwners = []
    // for (let i = 0; i < allItems.length; i++) {
    //   if (!uniqueOwners.includes(allItems[i].owner)) {
    //     uniqueOwners.push(allItems[i].owner)
    //   }
    // }

    const recordList = await this.nftConnectionRunner.manager.find(NftTransferRecordEntity, {
      where: {
        smart_contract_address: smartContractAddress,
        timestamp: MoreThan(moment().subtract(30, 'days').unix())
      }
    })

    const users24H: Array<string> = []
    const users7D: Array<string> = []
    const users30D: Array<string> = []
    let volume24H = 0,
      volume7D = 0,
      volume30D = 0,
      floorPrice24H = 0,
      floorPrice7D = 0,
      floorPrice30D = 0,
      highestPrice24H = 0,
      highestPrice7D = 0,
      highestPrice30D = 0,
      transactionCount24H = 0,
      transactionCount7D = 0,
      transactionCount30D = 0

    // const tfuelPrice = await this.marketService.getThetaFuelMarketInfo()
    let timestamp = 0
    for (const record of recordList) {
      if (record.timestamp > timestamp) {
        timestamp = record.timestamp
      }
      if (record.timestamp >= moment().subtract(24, 'hours').unix()) {
        !users24H.includes(record.from) && users24H.push(record.from)
        !users24H.includes(record.to) && users24H.push(record.to)
        if (record.tdrop_mined == 0 && smartContract.contract_uri.indexOf('thetadrop.com') > -1) {
          volume24H += record.payment_token_amount
          if (record.payment_token_amount > highestPrice24H) {
            highestPrice24H = record.payment_token_amount
          }
          if (
            floorPrice24H == 0 ||
            (record.payment_token_amount < floorPrice24H && record.payment_token_amount != 0)
          ) {
            floorPrice24H = record.payment_token_amount
          }
          if (record.payment_token_amount > highestPrice24H) {
            highestPrice24H = record.payment_token_amount
          }
        } else {
          volume24H += record.payment_token_amount * this.tfuelPrice.price
          if (record.payment_token_amount * this.tfuelPrice.price > highestPrice24H) {
            highestPrice24H = record.payment_token_amount * this.tfuelPrice.price
          }
          if (
            floorPrice24H == 0 ||
            (record.payment_token_amount * this.tfuelPrice.price < floorPrice24H &&
              record.payment_token_amount != 0)
          ) {
            floorPrice24H = record.payment_token_amount * this.tfuelPrice.price
          }
          if (record.payment_token_amount * this.tfuelPrice.price > highestPrice24H) {
            highestPrice24H = record.payment_token_amount * this.tfuelPrice.price
          }
        }

        transactionCount24H += 1
      }
      if (record.timestamp >= moment().subtract(7, 'days').unix()) {
        !users7D.includes(record.from) && users7D.push(record.from)
        !users7D.includes(record.to) && users7D.push(record.to)
        if (record.tdrop_mined == 0 && smartContract.contract_uri.indexOf('thetadrop.com') > -1) {
          volume7D += record.payment_token_amount
          if (record.payment_token_amount > highestPrice7D) {
            highestPrice7D = record.payment_token_amount
          }
          if (
            floorPrice7D == 0 ||
            (record.payment_token_amount < floorPrice7D && record.payment_token_amount != 0)
          ) {
            floorPrice7D = record.payment_token_amount
          }
          if (record.payment_token_amount > highestPrice7D) {
            highestPrice7D = record.payment_token_amount
          }
        } else {
          volume7D += record.payment_token_amount * this.tfuelPrice.price

          if (record.payment_token_amount * this.tfuelPrice.price > highestPrice7D) {
            highestPrice7D = record.payment_token_amount * this.tfuelPrice.price
          }
          if (
            floorPrice7D == 0 ||
            (record.payment_token_amount * this.tfuelPrice.price < floorPrice7D &&
              record.payment_token_amount != 0)
          ) {
            floorPrice7D = record.payment_token_amount * this.tfuelPrice.price
          }
        }
        transactionCount7D += 1
      }
      if (record.timestamp >= moment().subtract(30, 'days').unix()) {
        !users30D.includes(record.from) && users30D.push(record.from)
        !users30D.includes(record.to) && users30D.push(record.to)
        if (record.tdrop_mined == 0 && smartContract.contract_uri.indexOf('thetadrop.com') > -1) {
          volume30D += record.payment_token_amount
          if (record.payment_token_amount > highestPrice30D) {
            highestPrice30D = record.payment_token_amount
          }
          if (
            floorPrice30D == 0 ||
            (record.payment_token_amount < floorPrice30D && record.payment_token_amount != 0)
          ) {
            floorPrice30D = record.payment_token_amount
          }
        } else {
          volume30D += record.payment_token_amount * this.tfuelPrice.price
          if (record.payment_token_amount * this.tfuelPrice.price > highestPrice30D) {
            highestPrice30D = record.payment_token_amount * this.tfuelPrice.price
          }
          if (
            floorPrice30D == 0 ||
            (record.payment_token_amount * this.tfuelPrice.price < floorPrice30D &&
              record.payment_token_amount != 0)
          ) {
            floorPrice30D = record.payment_token_amount * this.tfuelPrice.price
          }
        }
        transactionCount30D += 1
      }
    }
    const nft = await this.nftStatisticsConnectionRunner.manager.findOne(NftStatisticsEntity, {
      where: { smart_contract_address: smartContractAddress }
    })
    if (!nft) {
      const nftStatistics = new NftStatisticsEntity()
      await this.syncNftInfo(smartContract, nftStatistics)
      nftStatistics.name = smartContract.name
      nftStatistics.smart_contract_address = smartContractAddress
      nftStatistics.last_24_h_users = users24H.length
      nftStatistics.last_7_days_users = users7D.length
      nftStatistics.last_30_days_users = users30D.length
      nftStatistics.last_24_h_volume = Math.floor(volume24H)
      nftStatistics.last_7_days_volume = Math.floor(volume7D)
      nftStatistics.last_30_days_volume = Math.floor(volume30D)
      nftStatistics.last_24_h_transactions = transactionCount24H
      nftStatistics.last_7_days_transactions = transactionCount7D
      nftStatistics.last_30_days_transactions = transactionCount30D
      nftStatistics.update_timestamp = timestamp
      nftStatistics.unique_owners = uniqueHolders
      nftStatistics.items = allItems
      nftStatistics.destroyed_items = destroyedItems
      await this.nftStatisticsConnectionRunner.manager.save(nftStatistics)
    } else {
      if (nft.contract_uri_update_timestamp < moment().unix() - 24 * 3600) {
        try {
          nft.contract_uri_update_timestamp = moment().unix()
          //update contract uri
          if (nft.contract_uri) {
            // const httpRes = await fetch(nft.contract_uri, {
            //   method: 'GET',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   }
            // })
            // if (httpRes.status >= 400) {
            //   throw new Error('Bad response from server')
            // }
            // const res: any = await httpRes.json()
            const res = await this.utilsService.getJsonRes(nft.contract_uri)
            nft.name = res.name
            const newImgUri = this.utilsService.getPath(
              res.image,
              config.get('NFT_STATISTICS.STATIC_PATH')
            )
            if (newImgUri) nft.img_uri = newImgUri
            nft.contract_uri_detail = JSON.stringify(res)
            if (res.description) {
              nft.description = res.description
            }
          }
        } catch (e) {
          this.logger.error(e)
        }
      }
      if (!nft.description && nft.contract_uri_detail) {
        const detail = JSON.parse(nft.contract_uri_detail)
        nft.description = detail.description
      }

      if (!nft.img_uri || !nft.description) {
        const firstToken = await this.nftConnectionRunner.manager.findOne(NftBalanceEntity, {
          order: { id: 'ASC' },
          where: {
            smart_contract_address: smartContractAddress,
            owner: Not('0x0000000000000000000000000000000000000000')
          }
        })
        if (firstToken) {
          nft.img_uri = nft.img_uri
            ? nft.img_uri
            : await this.utilsService.downloadImage(
                firstToken.img_uri,
                config.get('NFT_STATISTICS.STATIC_PATH')
              )
          if (firstToken.detail) {
            const contractInfo = JSON.parse(firstToken.detail)
            nft.description = nft.description ? nft.description : contractInfo.description
          }
        }
      }

      nft.last_24_h_transactions = transactionCount24H
      nft.last_7_days_transactions = transactionCount7D
      nft.last_30_days_transactions = transactionCount30D
      nft.last_24_h_users = users24H.length
      nft.last_7_days_users = users7D.length
      nft.last_30_days_users = users30D.length
      nft.last_24_h_volume = Math.floor(volume24H)
      nft.last_7_days_volume = Math.floor(volume7D)
      nft.last_30_days_volume = Math.floor(volume30D)
      nft.update_timestamp = timestamp
      nft.last_24_h_floor_price = floorPrice24H
      nft.last_7_days_floor_price = floorPrice7D
      nft.last_30_days_floor_price = floorPrice30D
      nft.last_24_h_highest_price = highestPrice24H
      nft.last_7_days_highest_price = highestPrice7D
      nft.last_30_days_highest_price = highestPrice30D
      nft.unique_owners = uniqueHolders
      nft.items = allItems
      nft.destroyed_items = destroyedItems
      await this.nftStatisticsConnectionRunner.manager.save(nft)
    }
  }

  async setZero() {
    await this.nftStatisticsConnectionRunner.manager.update(
      NftStatisticsEntity,
      {
        update_timestamp: LessThan(moment().subtract(1, 'days').unix())
      },
      {
        last_24_h_volume: 0,
        last_24_h_users: 0,
        last_24_h_transactions: 0
      }
    )

    await this.nftStatisticsConnectionRunner.manager.update(
      NftStatisticsEntity,
      {
        update_timestamp: LessThan(moment().subtract(7, 'days').unix())
      },
      {
        last_7_days_volume: 0,
        last_7_days_users: 0,
        last_7_days_transactions: 0
      }
    )

    await this.nftStatisticsConnectionRunner.manager.update(
      NftStatisticsEntity,
      {
        update_timestamp: LessThan(moment().subtract(30, 'days').unix())
      },
      {
        last_30_days_volume: 0,
        last_30_days_users: 0,
        last_30_days_transactions: 0
      }
    )
  }

  async updateNftsImgUri() {
    // this.logger.debug(JSON.stringify(nftLogoConfig))
    for (const logo of nftLogoConfig) {
      if (logo.length < 2) continue
      const nft = await this.nftStatisticsConnectionRunner.manager.findOne(NftStatisticsEntity, {
        where: { smart_contract_address: logo[0].toLowerCase() }
      })
      if (nft) {
        const imgUri = this.utilsService.getPath(logo[1], config.get('NFT_STATISTICS.STATIC_PATH'))
        if (imgUri == nft.img_uri) continue
        nft.img_uri = await this.utilsService.downloadImage(
          logo[1],
          config.get('NFT_STATISTICS.STATIC_PATH')
        )
        await this.nftStatisticsConnectionRunner.manager.save(nft)
      }
    }
  }

  async syncNftInfo(smartContract: SmartContractEntity, nftStatistics: NftStatisticsEntity) {
    // nftStatistics.img_uri = ''
    const firtstNft = await this.nftConnectionRunner.manager.findOne(NftBalanceEntity, {
      where: {
        smart_contract_address: smartContract.contract_address
      },
      order: {
        id: 'ASC'
      }
    })
    if (!smartContract.contract_uri && firtstNft) {
      nftStatistics.contract_uri = firtstNft.contract_uri
      nftStatistics.contract_uri_detail = firtstNft.detail
      nftStatistics.img_uri = firtstNft.img_uri
    }

    if (smartContract.contract_uri && smartContract.contract_uri_detail) {
      nftStatistics.contract_uri = smartContract.contract_uri
      nftStatistics.contract_uri_detail = smartContract.contract_uri_detail
      const contractDetail = JSON.parse(smartContract.contract_uri_detail)
      nftStatistics.description = contractDetail.description
      if (
        this.utilsService.getPath(contractDetail.image, config.get('NFT_STATISTICS.STATIC_PATH'))
      ) {
        nftStatistics.img_uri = await this.utilsService.downloadImage(
          contractDetail.image,
          config.get('NFT_STATISTICS.STATIC_PATH')
        )
      }
      // }
    }

    if (smartContract.contract_uri && !smartContract.contract_uri_detail) {
      try {
        const res = await this.utilsService.getJsonRes(smartContract.contract_uri)
        nftStatistics.name = res.name
        const newImgUri = this.utilsService.getPath(
          res.image,
          config.get('NFT_STATISTICS.STATIC_PATH')
        )
        if (newImgUri) nftStatistics.img_uri = newImgUri
        nftStatistics.contract_uri_detail = JSON.stringify(res)
      } catch (e) {
        this.logger.error(e)
      }
    }

    if (!nftStatistics.img_uri && firtstNft) {
      nftStatistics.img_uri = firtstNft.img_uri
    }
  }

  async autoRefetchContractUri() {
    const startId = this.utilsService.getRecordHeight(this.refetchContractUriId)
    const nfts = await this.nftStatisticsConnectionRunner.manager.find(NftStatisticsEntity, {
      where: {
        id: MoreThanOrEqual(startId)
      },
      order: {
        id: 'ASC'
      },
      take: 100
    })
    if (nfts.length == 0) {
      return this.utilsService.updateRecordHeight(this.refetchContractUriId, 0)
    }
    for (const nft of nfts) {
      if (nft.refetch_times >= 3) continue
      const smartContract = await this.smartContractConnectionRunner.manager.findOne(
        SmartContractEntity,
        {
          where: {
            contract_address: nft.smart_contract_address
          }
        }
      )
      if (smartContract) {
        await this.syncNftInfo(smartContract, nft)
        nft.refetch_times = nft.refetch_times + 1
        await this.nftStatisticsConnectionRunner.manager.save(nft)
      }
    }
    this.utilsService.updateRecordHeight(this.refetchContractUriId, nfts[nfts.length - 1].id)
  }

  async restoreImgUri() {
    const startId = this.utilsService.getRecordHeight(this.imgPathRestoreId)
    const nfts = await this.nftStatisticsConnectionRunner.manager.find(NftStatisticsEntity, {
      where: {
        id: MoreThanOrEqual(startId)
      },
      order: {
        id: 'ASC'
      },
      take: 100
    })
    if (nfts.length == 0) {
      return
    }
    for (const nft of nfts) {
      const smartContract = await this.smartContractConnectionRunner.manager.findOne(
        SmartContractEntity,
        {
          where: {
            contract_address: nft.smart_contract_address
          }
        }
      )
      if (smartContract) {
        await this.syncNftInfo(smartContract, nft)
        nft.refetch_times = nft.refetch_times + 1
        await this.nftStatisticsConnectionRunner.manager.save(nft)
      }
    }
    this.utilsService.updateRecordHeight(this.imgPathRestoreId, nfts[nfts.length - 1].id)
  }

  async downloadAllImg() {
    const nfts = await this.nftStatisticsConnectionRunner.manager.find(NftStatisticsEntity)
    for (const nft of nfts) {
      if (nft.img_uri) {
        nft.img_uri = await this.utilsService.downloadImage(
          nft.img_uri,
          config.get('NFT_STATISTICS.STATIC_PATH')
        )
        await this.nftStatisticsConnectionRunner.manager.save(nft)
      }
    }
  }
}
