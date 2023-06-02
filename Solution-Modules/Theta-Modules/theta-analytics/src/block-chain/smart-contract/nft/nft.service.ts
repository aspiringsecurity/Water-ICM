import { SmartContractCallLogEntity } from './../smart-contract-call-log.entity'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import {
  FindManyOptions,
  getConnection,
  LessThan,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  QueryRunner,
  Repository
} from 'typeorm'
import { SmartContractCallRecordEntity } from '../smart-contract-call-record.entity'
import { SmartContractEntity, SmartContractProtocolEnum } from '../smart-contract.entity'
import { NftBalanceEntity } from './nft-balance.entity'
import { NftTransferRecordEntity } from './nft-transfer-record.entity'
import { UtilsService } from 'src/common/utils.service'
import BigNumber from 'bignumber.js'
import { config } from 'src/const'
// import { json } from 'stream/consumers'
// const config = require('config')

@Injectable()
export class NftService {
  logger = new Logger('nft service')
  constructor(
    @InjectRepository(NftTransferRecordEntity, 'nft')
    private nftTransferRecordRepository: Repository<NftTransferRecordEntity>,

    @InjectRepository(NftBalanceEntity, 'nft')
    private nftBalanceRepository: Repository<NftBalanceEntity>,

    @InjectRepository(SmartContractCallRecordEntity, 'smart_contract')
    private smartContractCallRecordRepository: Repository<SmartContractCallRecordEntity>,

    @InjectRepository(SmartContractEntity, 'smart_contract')
    private smartContractRepository: Repository<SmartContractEntity>,

    private utilsService: UtilsService
  ) {}

  async parseRecordByContractAddress(contractAddress: string): Promise<number> {
    const contract = await this.smartContractRepository.findOne({
      where: { contract_address: contractAddress }
    })
    if (!this.utilsService.checkTnt721(JSON.parse(contract.abi))) {
      this.logger.debug('protocol not nft 721')
      return 0
    }
    const nftRecord = await this.nftTransferRecordRepository.findOne({
      where: { smart_contract_address: contract.contract_address },
      order: { timestamp: 'DESC' }
    })
    this.logger.debug('nft record:' + JSON.stringify(nftRecord))
    const condition: any = {
      where: { contract_id: contract.id },
      order: { timestamp: 'ASC' }
    }
    if (nftRecord) {
      condition['where']['timestamp'] = MoreThan(nftRecord.timestamp)
    }
    this.logger.debug(condition)
    const contractRecord = await this.smartContractCallRecordRepository.find(condition)
    let afftectedNum = 0

    const connection = getConnection('nft').createQueryRunner()
    const smartContractConnection = getConnection('smart_contract').createQueryRunner()
    await connection.connect()
    await smartContractConnection.connect()
    await connection.startTransaction()
    await smartContractConnection.startTransaction()

    this.logger.debug('protocol is tnt 721')
    try {
      for (const record of contractRecord) {
        const res = await this.updateNftRecord(
          connection,
          smartContractConnection,
          record
          // contract
        )
        if (res) afftectedNum++
      }
      await connection.commitTransaction()
      await smartContractConnection.commitTransaction()
    } catch (e) {
      console.error(e)
      this.logger.debug(e)
      await connection.rollbackTransaction()
      await smartContractConnection.rollbackTransaction()
    } finally {
      await connection.release()
      await smartContractConnection.release()
    }

    return afftectedNum
  }

  async parseRecordByContractAddressWithConnection(
    nftConnection: QueryRunner,
    smartContractConnection: QueryRunner,
    contract: SmartContractEntity
  ): Promise<number> {
    this.logger.debug('start parese record')
    if (!contract.verified) {
      this.logger.debug(contract.contract_address + ' not verified')
      return 0
    }
    let contractRecord: Array<SmartContractCallRecordEntity> = []
    contractRecord = await smartContractConnection.manager.find(SmartContractCallRecordEntity, {
      where: {
        contract_id: contract.id,
        height: MoreThanOrEqual(
          contract.latest_record_parse_height
          // contract.latest_record_parse_height + 100
        )
      },
      take: 3000,
      order: { height: 'ASC' }
    })
    // }

    this.logger.debug('protocol is tnt 721')

    let afftectedNum = 0

    // if(contract.)
    for (const record of contractRecord) {
      const res = await this.updateNftRecord(
        nftConnection,
        smartContractConnection,
        record
        // contract
      )
      if (res) afftectedNum++
    }
    if (contractRecord.length > 0) {
      contract.latest_record_parse_height = contractRecord[contractRecord.length - 1].height
      this.logger.debug(
        contract.contract_address +
          ' update set latest record height:' +
          contractRecord[contractRecord.length - 1].height
      )
      await smartContractConnection.manager.save(contract)
    }
    return afftectedNum
  }

  async updateNftRecord(
    nftConnection: QueryRunner,
    smartContractConnection: QueryRunner,
    record: SmartContractCallRecordEntity
  ) {
    const receipt = JSON.parse(record.receipt)
    if (receipt.Logs.length == 0) {
      this.logger.debug('receipt:' + JSON.stringify(receipt))
      return
    }
    const contractList: {
      [prop: string]: {
        contract: SmartContractEntity
        logs: Array<any>
      }
    } = {}

    for (const log of receipt.Logs) {
      if (log.data == '') {
        log.data = '0x'
      } else {
        log.data = this.utilsService.getHex(log.data)
      }
      if (contractList.hasOwnProperty(log.address)) {
        contractList[log.address].logs.push(log)
      } else {
        const tempContract = await smartContractConnection.manager.findOne(SmartContractEntity, {
          where: {
            contract_address: log.address
          }
        })
        if (!tempContract || !tempContract.verified) continue
        contractList[log.address] = {
          contract: tempContract,
          logs: [log]
        }
      }
    }
    const contractDecodeList = Object.values(contractList)
    for (const contract of contractDecodeList) {
      // if(contract.contract)

      const logInfo = this.utilsService.decodeLogs(contract.logs, JSON.parse(contract.contract.abi))
      // this.logger.debug(JSON.stringify(logInfo))
      for (const log of logInfo) {
        let imgUri = ''
        let name = ''

        if (log.decode.eventName === 'Transfer' && log.decode.result.tokenId) {
          this.logger.debug(
            JSON.stringify({
              from: log.decode.result.from.toLowerCase(),
              to: log.decode.result.to.toLowerCase(),
              token_id: Number(log.decode.result.tokenId),
              smart_contract_address: log.address,
              transaction_hash: record.transaction_hash
            })
          )
          const logContract = await smartContractConnection.manager.findOne(SmartContractEntity, {
            where: { contract_address: log.address.toLowerCase() }
          })
          if (
            !logContract ||
            !logContract.verified ||
            logContract.protocol !== SmartContractProtocolEnum.tnt721
          )
            continue
          let detail = ''
          let tokenUri = ''
          let baseTokenUri = ''
          let contractUri = logContract.contract_uri
          const balance = await nftConnection.manager.findOne(NftBalanceEntity, {
            where: {
              smart_contract_address: log.address.toLowerCase(),
              token_id: Number(log.decode.result.tokenId)
            }
          })
          if (balance && balance.detail) {
            const detailInfo = JSON.parse(balance.detail)
            imgUri = await this.utilsService.downloadImage(
              detailInfo.image,
              config.get('NFT.STATIC_PATH')
            )
            name = detailInfo.name
            detail = balance.detail
            tokenUri = balance.token_uri
            baseTokenUri = balance.base_token_uri
          } else {
            const abiInfo = JSON.parse(logContract.abi)
            const hasTokenUri = abiInfo.find((v) => v.name == 'tokenURI')
            name = logContract.name

            if (hasTokenUri) {
              try {
                tokenUri = await this.getTokenUri(
                  logContract.contract_address,
                  abiInfo,
                  Number(log.decode.result.tokenId)
                )
                // const options = {
                //   url: tokenUri,
                //   method: 'GET',
                //   timeout: 10000,
                //   responseType: 'json',
                //   responseEncoding: 'utf8',
                //   headers: {
                //     'Content-Type': 'application/json',
                //     'Accept-Encoding': 'gzip, deflate, br'
                //     // ''
                //   }
                //   // headers: {
                //   //   'Content-Type': 'application/json'
                //   // }
                // }
                // try {
                // this.logger.debug(
                //   'axios fetch',
                //   JSON.stringify(
                //     options
                //     // headers: {
                //     //   'Content-Type': 'application/json'
                //     // }
                //   )
                // )
                // const httpRes = await axios(options)
                // if (httpRes.status >= 400) {
                //   throw new Error('Bad response from server')
                // }
                const res: any = await this.utilsService.getJsonRes(tokenUri)

                // this.logger.debug(res)
                name = res.name
                imgUri = res.image
                detail = JSON.stringify(res)
              } catch (e) {
                this.logger.error(e)
              }
            }
            const hasBaseTokenUri = abiInfo.find((v) => v.name == 'baseTokenURI')
            if (hasBaseTokenUri) {
              baseTokenUri = await this.getBaseTokenUri(logContract.contract_address, abiInfo)
            }
            imgUri = await this.utilsService.downloadImage(imgUri, config.get('NFT.STATIC_PATH'))
          }

          const transferRecord = await nftConnection.manager.findOne(NftTransferRecordEntity, {
            where: {
              token_id: Number(log.decode.result.tokenId),
              smart_contract_address: log.address.toLowerCase(),
              timestamp: record.timestamp
            }
          })
          if (!transferRecord) {
            this.logger.debug(
              'insert nft transfer record:' +
                JSON.stringify({
                  from: log.decode.result.from.toLowerCase(),
                  to: log.decode.result.to.toLowerCase(),
                  token_id: Number(log.decode.result.tokenId),
                  smart_contract_address: log.address.toLowerCase(),
                  height: record.height,
                  name: contract.contract.name,
                  timestamp: record.timestamp
                })
            )
            await nftConnection.manager.insert(NftTransferRecordEntity, {
              from: log.decode.result.from.toLowerCase(),
              to: log.decode.result.to.toLowerCase(),
              token_id: Number(log.decode.result.tokenId),
              smart_contract_address: log.address.toLowerCase(),
              height: record.height,
              name: name,
              img_uri: imgUri,
              transaction_hash: record.transaction_hash,
              timestamp: record.timestamp
            })
          } else {
            // if (!transferRecord.img_uri) {
            transferRecord.img_uri = imgUri
            // }
            // if (!transferRecord.name) {
            transferRecord.name = name
            // }
            await nftConnection.manager.save(transferRecord)
          }

          if (balance) {
            // imgUri = balance.img_uri
            // name = balance.name
            // if(!balance)
            if (balance.img_uri) {
              imgUri = balance.img_uri
            }
            const latestRecord = await nftConnection.manager.findOne(NftTransferRecordEntity, {
              where: {
                smart_contract_address: log.address.toLowerCase(),
                token_id: Number(log.decode.result.tokenId)
              },
              order: {
                height: 'DESC'
              }
            })
            await nftConnection.manager.update(
              NftBalanceEntity,
              {
                id: balance.id
              },
              {
                owner: latestRecord.to,
                from: latestRecord.from,
                name: name,
                img_uri: imgUri
              }
            )
          } else {
            await nftConnection.manager.insert(NftBalanceEntity, {
              smart_contract_address: logContract.contract_address,
              owner: log.decode.result.to.toLowerCase(),
              from: log.decode.result.from.toLowerCase(),
              token_id: Number(log.decode.result.tokenId),
              name: name,
              img_uri: imgUri,
              detail: detail,
              contract_uri: contractUri,
              token_uri: tokenUri,
              base_token_uri: baseTokenUri
            })
          }
        }

        if (
          (log.decode.eventName === 'NFTTraded' &&
            log.decode.result.nftTokenID &&
            log.decode.result.nftTokenAddress) ||
          (log.decode.eventName === 'MarketItemSale' &&
            log.decode.result.isSold == 'true' &&
            log.decode.result.tokenId &&
            log.decode.result.nftContract)
        ) {
          this.logger.debug('parse nft trade:' + record.transaction_hash)
          this.logger.debug(JSON.stringify(log.decode.result))
          const nftTokenId = log.decode.result.nftTokenID
            ? Number(log.decode.result.nftTokenID)
            : Number(log.decode.result.tokenId)
          const nftContractAddress = log.decode.result.nftTokenAddress
            ? log.decode.result.nftTokenAddress.toLowerCase()
            : log.decode.result.nftContract.toLowerCase()
          const paymentTokenAmount = log.decode.result.paymentTokenAmount
            ? log.decode.result.paymentTokenAmount
            : log.decode.result.price
          const tdropMined = log.decode.result.tdropMined ? Number(log.decode.result.tdropMined) : 0
          const buyer = log.decode.result.buyer
            ? log.decode.result.buyer.toLowerCase()
            : log.decode.result.owner.toLowerCase()
          const seller = log.decode.result.seller.toLowerCase()

          const logContract = await smartContractConnection.manager.findOne(SmartContractEntity, {
            where: { contract_address: nftContractAddress }
          })
          if (
            !logContract ||
            !logContract.verified ||
            logContract.protocol !== SmartContractProtocolEnum.tnt721
          )
            continue
          this.logger.debug('nft traded: ' + JSON.stringify(log.decode.result))
          const searchCondition = {
            token_id: nftTokenId,
            smart_contract_address: nftContractAddress,
            timestamp: record.timestamp
          }
          this.logger.debug('search condition: ' + JSON.stringify(searchCondition))

          const tradeRecord = await nftConnection.manager.findOne<NftTransferRecordEntity>(
            NftTransferRecordEntity,
            { where: searchCondition }
          )
          if (tradeRecord) {
            this.logger.debug('get nft trade record:' + JSON.stringify(tradeRecord))
            tradeRecord.payment_token_amount = Number(
              new BigNumber(paymentTokenAmount).dividedBy('1e18').toFixed()
            )
            tradeRecord.tdrop_mined = Number(new BigNumber(tdropMined).dividedBy('1e18').toFixed())
            const res = await nftConnection.manager.save(NftTransferRecordEntity, tradeRecord)
            this.logger.debug('nft traded updated: ' + JSON.stringify(res))
          } else {
            this.logger.debug('no nft trade record:' + JSON.stringify(log.decode))
            await nftConnection.manager.insert(NftTransferRecordEntity, {
              from: seller,
              to: buyer,
              token_id: nftTokenId,
              smart_contract_address: nftContractAddress,
              height: record.height,
              name: logContract.name,
              transaction_hash: record.transaction_hash,
              timestamp: record.timestamp,
              payment_token_amount: Number(
                new BigNumber(paymentTokenAmount).dividedBy('1e18').toFixed()
              ),
              tdrop_mined: Number(new BigNumber(tdropMined).dividedBy('1e18').toFixed())
            })
          }
        }
      }
    }
    return false
  }

  async updateNftLog(
    nftConnection: QueryRunner,
    smartContractConnection: QueryRunner,
    logEntity: SmartContractCallLogEntity
  ) {
    const logDetail = JSON.parse(logEntity.data)
    if (logDetail.data == '') {
      logDetail.data = '0x'
    } else {
      logDetail.data = this.utilsService.getHex(logDetail.data)
    }

    const tempContract = await smartContractConnection.manager.findOne(SmartContractEntity, {
      where: {
        contract_address: logEntity.address
      }
    })
    if (!tempContract || !tempContract.verified) return false

    // for (const contract of contractDecodeList) {
    // if(contract.contract)

    const logInfo = this.utilsService.decodeLogs([logDetail], JSON.parse(tempContract.abi))
    // this.logger.debug(JSON.stringify(logInfo))
    for (const log of logInfo) {
      let imgUri = ''
      let name = ''

      if (log.decode.eventName === 'Transfer' && log.decode.result.tokenId) {
        this.logger.debug(
          JSON.stringify({
            from: log.decode.result.from.toLowerCase(),
            to: log.decode.result.to.toLowerCase(),
            token_id: Number(log.decode.result.tokenId),
            smart_contract_address: log.address,
            transaction_hash: logEntity.transaction_hash
          })
        )
        let detail = ''
        let tokenUri = ''
        let baseTokenUri = ''
        let contractUri = tempContract.contract_uri
        const balance = await nftConnection.manager.findOne(NftBalanceEntity, {
          where: {
            smart_contract_address: log.address.toLowerCase(),
            token_id: Number(log.decode.result.tokenId)
          }
        })
        if (balance && balance.detail) {
          const detailInfo = JSON.parse(balance.detail)
          imgUri = await this.utilsService.downloadImage(
            detailInfo.image,
            config.get('NFT.STATIC_PATH')
          )
          name = detailInfo.name
          detail = balance.detail
          tokenUri = balance.token_uri
          baseTokenUri = balance.base_token_uri
        } else {
          const abiInfo = JSON.parse(tempContract.abi)
          const hasTokenUri = abiInfo.find((v) => v.name == 'tokenURI')
          name = tempContract.name

          if (hasTokenUri) {
            try {
              tokenUri = await this.getTokenUri(
                tempContract.contract_address,
                abiInfo,
                Number(log.decode.result.tokenId)
              )
              // const options = {
              //   url: tokenUri,
              //   method: 'GET',
              //   timeout: 10000,
              //   responseType: 'json',
              //   responseEncoding: 'utf8',
              //   headers: {
              //     'Content-Type': 'application/json',
              //     'Accept-Encoding': 'gzip, deflate, br'
              //     // ''
              //   }
              //   // headers: {
              //   //   'Content-Type': 'application/json'
              //   // }
              // }
              // try {
              // this.logger.debug(
              //   'axios fetch',
              //   JSON.stringify(
              //     options
              //     // headers: {
              //     //   'Content-Type': 'application/json'
              //     // }
              //   )
              // )
              // const httpRes = await axios(options)
              // if (httpRes.status >= 400) {
              //   throw new Error('Bad response from server')
              // }
              const res: any = await this.utilsService.getJsonRes(tokenUri)

              // this.logger.debug(res)
              name = res.name
              imgUri = res.image
              detail = JSON.stringify(res)
            } catch (e) {
              this.logger.error(e)
            }
          }
          const hasBaseTokenUri = abiInfo.find((v) => v.name == 'baseTokenURI')
          if (hasBaseTokenUri) {
            baseTokenUri = await this.getBaseTokenUri(tempContract.contract_address, abiInfo)
          }
          imgUri = await this.utilsService.downloadImage(imgUri, config.get('NFT.STATIC_PATH'))
        }

        const transferRecord = await nftConnection.manager.findOne(NftTransferRecordEntity, {
          where: {
            token_id: Number(log.decode.result.tokenId),
            smart_contract_address: log.address.toLowerCase(),
            timestamp: logEntity.timestamp
          }
        })
        if (!transferRecord) {
          this.logger.debug(
            'insert nft transfer record:' +
              JSON.stringify({
                from: log.decode.result.from.toLowerCase(),
                to: log.decode.result.to.toLowerCase(),
                token_id: Number(log.decode.result.tokenId),
                smart_contract_address: log.address.toLowerCase(),
                height: logEntity.height,
                name: tempContract.name,
                timestamp: logEntity.timestamp
              })
          )
          await nftConnection.manager.insert(NftTransferRecordEntity, {
            from: log.decode.result.from.toLowerCase(),
            to: log.decode.result.to.toLowerCase(),
            token_id: Number(log.decode.result.tokenId),
            smart_contract_address: log.address.toLowerCase(),
            height: logEntity.height,
            name: name,
            img_uri: imgUri,
            transaction_hash: logEntity.transaction_hash,
            timestamp: logEntity.timestamp
          })
        } else {
          // if (!transferRecord.img_uri) {
          transferRecord.img_uri = imgUri
          // }
          // if (!transferRecord.name) {
          transferRecord.name = name
          // }
          await nftConnection.manager.save(transferRecord)
        }

        if (balance) {
          // imgUri = balance.img_uri
          // name = balance.name
          // if(!balance)
          if (balance.img_uri) {
            imgUri = balance.img_uri
          }
          const latestRecord = await nftConnection.manager.findOne(NftTransferRecordEntity, {
            where: {
              smart_contract_address: log.address.toLowerCase(),
              token_id: Number(log.decode.result.tokenId)
            },
            order: {
              height: 'DESC'
            }
          })
          await nftConnection.manager.update(
            NftBalanceEntity,
            {
              id: balance.id
            },
            {
              owner: latestRecord.to,
              from: latestRecord.from,
              name: name,
              img_uri: imgUri
            }
          )
        } else {
          await nftConnection.manager.insert(NftBalanceEntity, {
            smart_contract_address: tempContract.contract_address,
            owner: log.decode.result.to.toLowerCase(),
            from: log.decode.result.from.toLowerCase(),
            token_id: Number(log.decode.result.tokenId),
            name: name,
            img_uri: imgUri,
            detail: detail,
            contract_uri: contractUri,
            token_uri: tokenUri,
            base_token_uri: baseTokenUri
          })
        }
      }

      if (
        (log.decode.eventName === 'NFTTraded' &&
          log.decode.result.nftTokenID &&
          log.decode.result.nftTokenAddress) ||
        (log.decode.eventName === 'MarketItemSale' &&
          log.decode.result.isSold == 'true' &&
          log.decode.result.tokenId &&
          log.decode.result.nftContract)
      ) {
        this.logger.debug('parse nft trade:' + logEntity.transaction_hash)
        this.logger.debug(JSON.stringify(log.decode.result))
        const nftTokenId = log.decode.result.nftTokenID
          ? Number(log.decode.result.nftTokenID)
          : Number(log.decode.result.tokenId)
        const nftContractAddress = log.decode.result.nftTokenAddress
          ? log.decode.result.nftTokenAddress.toLowerCase()
          : log.decode.result.nftContract.toLowerCase()
        const paymentTokenAmount = log.decode.result.paymentTokenAmount
          ? log.decode.result.paymentTokenAmount
          : log.decode.result.price
        const tdropMined = log.decode.result.tdropMined ? Number(log.decode.result.tdropMined) : 0
        const buyer = log.decode.result.buyer
          ? log.decode.result.buyer.toLowerCase()
          : log.decode.result.owner.toLowerCase()
        const seller = log.decode.result.seller.toLowerCase()

        const logContract = await smartContractConnection.manager.findOne(SmartContractEntity, {
          where: { contract_address: nftContractAddress }
        })
        if (
          !logContract ||
          !logContract.verified ||
          logContract.protocol !== SmartContractProtocolEnum.tnt721
        )
          continue
        this.logger.debug('nft traded: ' + JSON.stringify(log.decode.result))
        const searchCondition = {
          token_id: nftTokenId,
          smart_contract_address: nftContractAddress,
          timestamp: logEntity.timestamp
        }
        this.logger.debug('search condition: ' + JSON.stringify(searchCondition))

        const tradeRecord = await nftConnection.manager.findOne<NftTransferRecordEntity>(
          NftTransferRecordEntity,
          { where: searchCondition }
        )
        if (tradeRecord) {
          this.logger.debug('get nft trade record:' + JSON.stringify(tradeRecord))
          tradeRecord.payment_token_amount = Number(
            new BigNumber(paymentTokenAmount).dividedBy('1e18').toFixed()
          )
          tradeRecord.tdrop_mined = Number(new BigNumber(tdropMined).dividedBy('1e18').toFixed())
          const res = await nftConnection.manager.save(NftTransferRecordEntity, tradeRecord)
          this.logger.debug('nft traded updated: ' + JSON.stringify(res))
        } else {
          this.logger.debug('no nft trade record:' + JSON.stringify(log.decode))
          await nftConnection.manager.insert(NftTransferRecordEntity, {
            from: seller,
            to: buyer,
            token_id: nftTokenId,
            smart_contract_address: nftContractAddress,
            height: logEntity.height,
            name: logContract.name,
            transaction_hash: logEntity.transaction_hash,
            timestamp: logEntity.timestamp,
            payment_token_amount: Number(
              new BigNumber(paymentTokenAmount).dividedBy('1e18').toFixed()
            ),
            tdrop_mined: Number(new BigNumber(tdropMined).dividedBy('1e18').toFixed())
          })
        }
      }
    }
    // }
    return false
  }

  async updateNftBalance(contract_address: string, from: string, to: string, tokenId: number) {
    await this.nftBalanceRepository.upsert(
      {
        smart_contract_address: contract_address,
        owner: to.toLowerCase(),
        from: from.toLowerCase(),
        token_id: tokenId
      },
      ['smart_contract_address', 'token_id']
    )
  }

  async getContractUri(address: string, abi: any) {
    const res = await this.utilsService.readSmartContract(
      address,
      address,
      abi,
      'contractURI',
      [],
      [],
      ['string']
    )
    return res[0]
  }

  async getBaseTokenUri(address: string, abi: any) {
    const res = await this.utilsService.readSmartContract(
      address,
      address,
      abi,
      'baseTokenURI',
      [],
      [],
      ['string']
    )
    return res[0]
  }

  async getTokenUri(address: string, abi: any, tokenId: number) {
    const res = await this.utilsService.readSmartContract(
      address,
      address,
      abi,
      'tokenURI',
      ['uint256'],
      [tokenId],
      ['string']
    )
    return res[0]
  }

  async getNftByWalletAddress(
    address: string,
    take: number = 20,
    after: string | undefined,
    skip: number = 0,
    search: string | undefined = null
  ): Promise<[boolean, number, Array<NftBalanceEntity>]> {
    this.logger.debug('address: ' + address)
    const condition: FindManyOptions<NftBalanceEntity> = {
      where: {
        owner: address
      },
      take: take + 1,
      skip: skip,
      order: {
        // id: 'ASC',
        id: 'DESC'
      }
    }
    if (search) {
      condition.where['name'] = Like(`%${search}%`)
    }
    if (after) {
      const id = Number(Buffer.from(after, 'base64').toString('ascii'))
      this.logger.debug('decode from base64:' + id)
      condition.where['id'] = LessThan(id)
    }
    const totalCondition = {
      owner: address
    }
    if (search) totalCondition['name'] = Like(`%${search}%`)
    this.logger.debug('total count condition', JSON.stringify(totalCondition))
    const totalNft = await this.nftBalanceRepository.count({
      where: totalCondition
    })
    let nftList = await this.nftBalanceRepository.find(condition)
    let hasNextPage = false
    if (nftList.length > take) {
      hasNextPage = true
      nftList = nftList.slice(0, take)
    }
    this.logger.debug('nft length  :' + nftList.length)
    return [hasNextPage, totalNft, await this.checkSources(nftList)]
  }

  async getNftsBySmartContractAddress(
    address: string,
    take: number = 20,
    after: string | undefined,
    skip: number = 0
  ): Promise<[boolean, number, Array<NftBalanceEntity>]> {
    const condition: FindManyOptions<NftBalanceEntity> = {
      where: {
        smart_contract_address: address,
        owner: Not('0x0000000000000000000000000000000000000000')
      },
      skip: skip,
      take: take + 1,
      order: {
        id: 'ASC'
      }
    }
    if (after) {
      const id = Number(Buffer.from(after, 'base64').toString('ascii'))
      this.logger.debug('decode from base64:' + id)
      condition.where['id'] = MoreThan(id)
    }
    const totalNft = await this.nftBalanceRepository.count({
      where: {
        smart_contract_address: address,
        owner: Not('0x0000000000000000000000000000000000000000')
      }
    })
    let nftList = await this.nftBalanceRepository.find(condition)
    let hasNextPage = false
    if (nftList.length > take) {
      hasNextPage = true
      nftList = nftList.slice(0, take)
    }
    return [hasNextPage, totalNft, await this.checkSources(nftList)]
  }

  async getNftTransfersForSmartContract(
    contractAddress: string,
    tokenId: number | undefined,
    take: number = 20,
    after: string | undefined,
    skip = 0
  ): Promise<[boolean, number, Array<NftTransferRecordEntity>]> {
    const condition: FindManyOptions<NftTransferRecordEntity> = {
      where: { smart_contract_address: contractAddress },
      take: take + 1,
      skip: skip,
      order: {
        timestamp: 'DESC'
      }
    }
    if (tokenId) condition.where['token_id'] = tokenId
    this.logger.debug(JSON.stringify(condition))
    if (after) {
      const id = Buffer.from(after, 'base64').toString('ascii')
      this.logger.debug('decode from base64:' + id)
      condition.where['timestamp'] = LessThan(id)
    }
    const countCondition = {
      where: {
        smart_contract_address: contractAddress
      }
    }
    if (tokenId) countCondition.where['token_id'] = tokenId
    countCondition
    const totalRecord = await this.nftTransferRecordRepository.count(countCondition)
    let recordList = await this.nftTransferRecordRepository.find(condition)
    let hasNextPage = false
    if (recordList.length > take) {
      hasNextPage = true
      recordList = recordList.slice(0, take)
    }
    return [hasNextPage, totalRecord, recordList]
  }

  async getNftTransfersByWallet(
    walletAddress,
    take: number = 20,
    after: string | undefined
  ): Promise<[boolean, number, Array<NftTransferRecordEntity>]> {
    const condition: FindManyOptions<NftTransferRecordEntity> = {
      where: [
        {
          from: walletAddress
        },
        {
          to: walletAddress
        }
      ],
      take: take + 1,
      order: {
        id: 'ASC'
      }
    }
    if (after) {
      const id = Number(Buffer.from(after, 'base64').toString('ascii'))
      this.logger.debug('decode from base64:' + id)
      condition.where[0].id = MoreThan(id)
      condition.where[1].id = MoreThan(id)
    }
    const totalRecord = await this.nftTransferRecordRepository.count({
      where: [
        {
          from: walletAddress
        },
        {
          to: walletAddress
        }
      ]
    })
    let recordList = await this.nftTransferRecordRepository.find(condition)
    let hasNextPage = false
    if (recordList.length > take) {
      hasNextPage = true
      recordList = recordList.slice(0, take)
    }
    return [hasNextPage, totalRecord, recordList]
  }

  async getNftsForContract(
    walletAddress: string,
    contractAddress: string,
    take: number = 20,
    after: string | undefined
  ): Promise<[boolean, number, Array<NftBalanceEntity>]> {
    const condition: FindManyOptions<NftBalanceEntity> = {
      where: {
        smart_contract_address: contractAddress,
        owner: walletAddress
      },
      take: take + 1,
      order: {
        id: 'ASC'
      }
    }
    if (after) {
      const id = Number(Buffer.from(after, 'base64').toString('ascii'))
      this.logger.debug('decode from base64:' + id)
      condition.where['id'] = MoreThan(id)
    }
    const totalNft = await this.nftBalanceRepository.count({
      where: {
        smart_contract_address: contractAddress,
        owner: walletAddress
      }
    })
    let nftList = await this.nftBalanceRepository.find(condition)
    let hasNextPage = false
    if (nftList.length > take) {
      hasNextPage = true
      nftList = nftList.slice(0, take)
    }
    return [hasNextPage, totalNft, await this.checkSources(nftList)]
  }

  async getNftTransfersForBlockHeight(height: number) {
    return await this.nftTransferRecordRepository.find({
      where: { height: height }
    })
  }

  async getNftByTokenId(tokenId: number, contractAddress: string) {
    const searchCondition = {
      token_id: tokenId,
      smart_contract_address: contractAddress
    }
    this.logger.debug('search condtion get nft by token id', JSON.stringify(searchCondition))
    const nft = await this.nftBalanceRepository.findOne({
      where: searchCondition
    })
    this.logger.debug(JSON.stringify(nft))
    if (!nft) return undefined
    return (await this.checkSources([nft]))[0]
  }

  async checkSources(nfts: Array<NftBalanceEntity>) {
    // this.logger.debug('nfts length: ' + nfts.length)
    // const smartContractList: { [prop: string]: SmartContractEntity } = {}
    // for (const nft of nfts) {
    //   if (!nft.name || !nft.img_uri) {
    //     if (!smartContractList[nft.smart_contract_address]) {
    //       smartContractList[nft.smart_contract_address] =
    //         await this.smartContractRepository.findOne({
    //           contract_address: nft.smart_contract_address
    //         })
    //     }
    //     const contractInfo = smartContractList[nft.smart_contract_address]
    //     const abiInfo = JSON.parse(contractInfo.abi)
    //     const hasTokenUri = abiInfo.find((v) => v.name == 'tokenURI')
    //     nft.name = smartContractList[nft.smart_contract_address].name
    //     nft.contract_uri = smartContractList[nft.smart_contract_address].contract_uri
    //     if (hasTokenUri) {
    //       const tokenUri = await this.getTokenUri(nft.smart_contract_address, abiInfo, nft.token_id)
    //       nft.token_uri = tokenUri
    //       try {
    //         const httpRes = await fetch(tokenUri, {
    //           method: 'GET',
    //           headers: {
    //             'Content-Type': 'application/json'
    //           }
    //         })
    //         if (httpRes.status >= 400) {
    //           throw new Error('Bad response from server')
    //         }
    //         const res: any = await httpRes.json()
    //         nft.name = res.name
    //         nft.img_uri = res.image
    //         nft.detail = JSON.stringify(res)
    //       } catch (e) {
    //         this.logger.error(e)
    //       }
    //     }
    //     const hasBaseTokenUri = abiInfo.find((v) => v.name == 'baseTokenURI')
    //     if (hasBaseTokenUri) {
    //       nft.base_token_uri = await this.getBaseTokenUri(nft.smart_contract_address, abiInfo)
    //     }
    //     this.logger.debug('remove update nft balance')
    //     // await this.nftBalanceRepository.save(nft)
    //   }
    // }
    return nfts
  }

  async uniqueHolders(contractAddress: string) {
    const list = await this.nftBalanceRepository
      .createQueryBuilder()
      .from(NftBalanceEntity, 'nft')
      .select('nft.owner')
      .where('nft.smart_contract_address=:contractAddress', { contractAddress: contractAddress })
      .distinct(true)
      .getMany()

    // this.logger.debug(JSON.stringify(list))
    return list.length
  }

  async totalAmount(
    contractAddress: string
  ): Promise<[totalAmount: number, uniqueHolders: number]> {
    const res = await this.nftBalanceRepository.find({
      where: { smart_contract_address: contractAddress }
    })
    const userObj = {}
    let uniqeuHolder = 0
    for (const nft of res) {
      if (!userObj[nft.owner]) {
        uniqeuHolder++
        userObj[nft.owner] = true
      }
    }
    return [res.length, uniqeuHolder]
  }

  async findNftsByName(
    name: string,
    take: number = 20,
    after: string | undefined
  ): Promise<[boolean, number, Array<SmartContractEntity>]> {
    const condition: FindManyOptions<SmartContractEntity> = {
      where: {
        protocol: SmartContractProtocolEnum.tnt721,
        name: Like('%' + name + '%')
      },
      take: take + 1,
      order: {
        id: 'ASC'
      }
    }
    this.logger.debug(condition)
    if (after) {
      const id = Number(Buffer.from(after, 'base64').toString('ascii'))
      this.logger.debug('decode from base64:' + id)
      condition.where['id'] = MoreThan(id)
    }
    const totalNft = await this.smartContractRepository.count({
      where: { protocol: SmartContractProtocolEnum.tnt721, name: Like('%' + name + '%') }
    })
    let nftList = await this.smartContractRepository.find(condition)
    let hasNextPage = false
    if (nftList.length > take) {
      hasNextPage = true
      nftList = nftList.slice(0, take)
    }
    return [hasNextPage, totalNft, nftList]
    // return
  }

  public async getNftTransferRecordsByTxHash(txHash) {
    return await this.nftTransferRecordRepository.find({
      where: { transaction_hash: txHash }
    })
  }
}
