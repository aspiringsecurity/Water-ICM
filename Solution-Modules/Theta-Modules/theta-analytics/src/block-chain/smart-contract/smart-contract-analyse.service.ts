import { SmartContractCallLogEntity } from './smart-contract-call-log.entity'
import { Injectable, Logger } from '@nestjs/common'
import { DataSource, LessThan, MoreThan, QueryRunner } from 'typeorm'
import { THETA_TRANSACTION_TYPE_ENUM } from 'theta-ts-sdk/dist/types/enum'
import { THETA_BLOCK_INTERFACE } from 'theta-ts-sdk/src/types/interface'
import { LoggerService } from 'src/common/logger.service'
import { SmartContractCallRecordEntity } from 'src/block-chain/smart-contract/smart-contract-call-record.entity'
import {
  SmartContractEntity,
  SmartContractProtocolEnum
} from 'src/block-chain/smart-contract/smart-contract.entity'
import { UtilsService, writeFailExcuteLog, writeSucessExcuteLog } from 'src/common/utils.service'
import { SmartContractService } from 'src/block-chain/smart-contract/smart-contract.service'
import { config } from 'src/const'
import { InjectDataSource } from '@nestjs/typeorm'
import { SolcService } from 'src/common/solc.service'
import { RpcService } from '../rpc/rpc.service'
const moment = require('moment')
const fs = require('fs')
const axios = require('axios')

@Injectable()
export class SmartContractAnalyseService {
  private readonly logger = new Logger('smart contract analyse service')
  analyseKey = 'under_analyse'
  private counter = 0
  private startTimestamp = 0
  private smartContractConnectionRunner: QueryRunner
  private heightConfigFile = config.get('ORM_CONFIG')['database'] + 'smart_contract/record.height'
  private smartContractList: Array<string> = []
  constructor(
    private loggerService: LoggerService,
    private utilsService: UtilsService,
    private smartContractService: SmartContractService,
    private rpcService: RpcService,
    private solcService: SolcService,
    @InjectDataSource('smart_contract') private smartContractConnectionInjected: DataSource
  ) {
    this.logger.debug(config.get('SMART_CONTRACT.THETA_NODE_HOST'))
  }

  public async analyse() {
    try {
      this.smartContractConnectionRunner = this.smartContractConnectionInjected.createQueryRunner()
      // await this.smartContractConnection.connect()
      await this.smartContractConnectionRunner.startTransaction()
      let height: number = 0
      const lastfinalizedHeight = Number(
        (await this.rpcService.getStatus()).latest_finalized_block_height
      )
      height = lastfinalizedHeight - 1000

      if (config.get('SMART_CONTRACT.START_HEIGHT')) {
        height = config.get('SMART_CONTRACT.START_HEIGHT')
      }
      // console.log(path.resolve(this.heightConfigFile))
      if (!fs.existsSync(this.heightConfigFile)) {
        this.logger.debug('read height')
        // mkdirSync(this.heightConfigFile)
        this.logger.debug('finish mkdir')
        fs.writeFileSync(this.heightConfigFile, '0')
      } else {
        const data = fs.readFileSync(this.heightConfigFile, 'utf8')
        if (data && Number(data) > height) {
          height = Number(data) + 1
        }
      }
      // const latestRecord = await this.smartContractConnectionRunner.manager.findOne(
      //   SmartContractCallRecordEntity,
      //   {
      //     order: {
      //       height: 'DESC'
      //     },
      //     where: {}
      //   }
      // )
      // const latestRecordHeight = latestRecord ? latestRecord.height : 0

      // if (latestRecordHeight >= height) {
      //   height = latestRecordHeight + 1
      // }

      if (height >= lastfinalizedHeight) {
        await this.smartContractConnectionRunner.commitTransaction()
        this.logger.debug('commit success')
        this.logger.debug('no height to analyse')
        return
      }
      let endHeight = lastfinalizedHeight
      const analyseNumber = config.get('SMART_CONTRACT.ANALYSE_NUMBER')
      if (lastfinalizedHeight - height > analyseNumber) {
        endHeight = height + analyseNumber
      }
      this.logger.debug('start height: ' + height + '; end height: ' + endHeight)
      this.startTimestamp = moment().unix()
      const blockList = await this.rpcService.getBlockSByRange(height, endHeight)
      this.logger.debug('block list length:' + blockList.length)
      this.counter = blockList.length
      this.logger.debug('init counter', this.counter)
      this.smartContractList = []
      for (let i = 0; i < blockList.length; i++) {
        const block = blockList[i]
        this.logger.debug(block.height + ' start hanldle')
        await this.handleOrderCreatedEvent(block, lastfinalizedHeight)
      }

      await this.clearCallTimeByPeriod()
      for (const contract of this.smartContractList) {
        await this.updateCallTimesByPeriod(contract)
      }
      await this.smartContractConnectionRunner.commitTransaction()
      if (blockList.length > 1) {
        this.utilsService.updateRecordHeight(
          this.heightConfigFile,
          Number(blockList[blockList.length - 1].height)
        )
      }
      writeSucessExcuteLog(config.get('SMART_CONTRACT.MONITOR_PATH'))
    } catch (e) {
      console.error(e.message)
      this.logger.error(e.message)
      this.logger.error('rollback')
      await this.smartContractConnectionRunner.rollbackTransaction()
      writeFailExcuteLog(config.get('SMART_CONTRACT.MONITOR_PATH'))
    } finally {
      await this.smartContractConnectionRunner.release()
      this.logger.debug('release success')
    }
    // await this.
  }

  async handleOrderCreatedEvent(block: THETA_BLOCK_INTERFACE, latestFinalizedBlockHeight: number) {
    this.logger.debug(block.height + ' start insert')
    const height = Number(block.height)
    for (const transaction of block.transactions) {
      switch (transaction.type) {
        case THETA_TRANSACTION_TYPE_ENUM.smart_contract:
          await this.smartContractConnectionRunner.query(
            `INSERT INTO smart_contract_entity(contract_address,height,call_times_update_timestamp) VALUES ('${
              transaction.receipt.ContractAddress
            }',${height},${moment().unix()})  ON CONFLICT (contract_address) DO UPDATE set call_times=call_times+1,call_times_update_timestamp=${Number(
              block.timestamp
            )};`
          )
          if (this.smartContractList.indexOf(transaction.receipt.ContractAddress) == -1) {
            this.smartContractList.push(transaction.receipt.ContractAddress)
          }
          const smartContract = await this.smartContractConnectionRunner.manager.findOne(
            SmartContractEntity,
            {
              where: { contract_address: transaction.receipt.ContractAddress }
            }
          )
          if (
            smartContract.call_times > config.get('SMART_CONTRACT_VERIFY_DETECT_TIMES') &&
            !smartContract.verified &&
            moment().unix() - smartContract.verification_check_timestamp > 3600 * 24 * 30
          ) {
            const checkInfo = await this.verifyWithThetaExplorer(smartContract.contract_address)
            if (checkInfo) {
              Object.assign(smartContract, checkInfo)
              smartContract.verification_check_timestamp = moment().unix()
            } else {
              smartContract.verification_check_timestamp = moment().unix()
            }

            await this.smartContractConnectionRunner.manager.save(
              SmartContractEntity,
              smartContract
            )
          }
          if (config.get('CONFLICT_TRANSACTIONS').indexOf(transaction.hash) !== -1) break
          const contractRecord = await this.smartContractConnectionRunner.manager.findOne(
            SmartContractCallRecordEntity,
            { where: { transaction_hash: transaction.hash, contract_id: smartContract.id } }
          )
          if (!contractRecord) {
            await this.smartContractConnectionRunner.manager.insert(
              SmartContractCallRecordEntity,
              {
                timestamp: Number(block.timestamp),
                data: transaction.raw.data,
                receipt: JSON.stringify(transaction.receipt),
                height: height,
                transaction_hash: transaction.hash,
                contract_id: smartContract.id
              }
              // ['transaction_hash']
            )
          }

          for (const log of transaction.receipt.Logs) {
            this.logger.debug(JSON.stringify(log))
            await this.smartContractConnectionRunner.manager.insert(SmartContractCallLogEntity, {
              address: log.address.toLocaleLowerCase(),
              data: JSON.stringify(log),
              height: height,
              transaction_hash: transaction.hash,
              timestamp: Number(block.timestamp)
            })
          }
          break
      }
    }
    this.logger.debug(height + ' end update analyse')
    this.counter--
    this.loggerService.timeMonitor('counter:' + this.counter, this.startTimestamp)
  }

  async verifyWithThetaExplorer(address: string) {
    this.logger.debug('start verify: ' + address)

    try {
      const res = await this.utilsService.getJsonRes(
        'https://explorer.thetatoken.org:8443/api/smartcontract/' + address
      )
      // const res: any = httpRes.data
      if (res.body.verification_date == '') return false
      // console.log('theta explorer res optimizer ', res.body.optimizer)
      const optimizer = res.body.optimizer === 'disabled' ? false : true
      // console.log('optimizer', optimizer)
      const optimizerRuns = res.body.optimizerRuns ? res.body.optimizerRuns : 200
      const sourceCode = res.body.source_code
      const version = res.body.compiler_version.match(/[\d,\.]+/g)[0]
      const versionFullName = 'soljson-' + res.body.compiler_version + '.js'
      const byteCode = res.body.bytecode

      address = this.utilsService.normalize(address.toLowerCase())
      // try {
      return await this.getVerifyInfo(
        address,
        sourceCode,
        byteCode,
        version,
        versionFullName,
        optimizer,
        optimizerRuns
      )
    } catch (e) {
      this.logger.error('verifyWithThetaExplorer error', e)
      return false
    }
  }

  async updateCallTimesByPeriod(contractAddress: string) {
    this.logger.debug('start update call times by period')
    // if (config.get('IGNORE')) return false
    const contract = await this.smartContractConnectionRunner.manager.findOne(SmartContractEntity, {
      where: {
        contract_address: contractAddress
      }
    })

    contract.last_24h_call_times = await this.smartContractConnectionRunner.manager.count(
      SmartContractCallRecordEntity,
      {
        where: {
          timestamp: MoreThan(moment().subtract(24, 'hours').unix()),
          contract_id: contract.id
        }
      }
    )
    contract.last_seven_days_call_times = await this.smartContractConnectionRunner.manager.count(
      SmartContractCallRecordEntity,
      {
        where: {
          timestamp: MoreThan(moment().subtract(7, 'days').unix()),
          contract_id: contract.id
        }
      }
    )
    await this.smartContractConnectionRunner.manager.save(contract)
    this.logger.debug('end update call times by period')
  }

  async clearCallTimeByPeriod() {
    // if (config.get('IGNORE')) return false
    await this.smartContractConnectionRunner.manager.update(
      SmartContractEntity,
      {
        call_times_update_timestamp: LessThan(moment().subtract(24, 'hours').unix())
      },
      { last_24h_call_times: 0 }
    )
    await this.smartContractConnectionRunner.manager.update(
      SmartContractEntity,
      {
        call_times_update_timestamp: LessThan(moment().subtract(7, 'days').unix())
      },
      { last_seven_days_call_times: 0 }
    )
  }

  async getVerifyInfo(
    address: string,
    // abi: string,
    sourceCode: string,
    byteCode: string,
    version: string,
    versionFullName: string,
    optimizer: boolean,
    optimizerRuns: number
  ) {
    // const helper = require('../../helper/utils')
    const fs = require('fs')
    const solc = require('solc')

    address = this.utilsService.normalize(address.toLowerCase())
    optimizerRuns = +optimizerRuns
    if (Number.isNaN(optimizerRuns)) optimizerRuns = 200
    // try {
    // console.log('Verifing the source code and bytecode for address:', address)
    let start = +new Date()
    var input = {
      language: 'Solidity',
      settings: {
        optimizer: {
          enabled: optimizer,
          runs: optimizerRuns
        },
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
      },
      sources: {
        'test.sol': {
          content: sourceCode
        }
      }
    }
    // console.log(input)
    var output: any = ''
    // console.log(`Loading specific version starts.`)
    // console.log(`version: ${version}`)
    const prefix = './libs'
    const fileName = prefix + '/' + versionFullName
    if (!fs.existsSync(fileName)) {
      this.logger.debug(`file ${fileName} does not exsit, downloading`)
      await this.solcService.downloadByVersion(version, './libs')
      this.logger.debug(`Download solc-js file takes: ${(+new Date() - start) / 1000} seconds`)
    } else {
      this.logger.debug(`file ${fileName} exsits, skip download process`)
    }

    start = +new Date()
    const requireFromString = require('require-from-string')

    const solcjs = solc.setupMethods(requireFromString(fs.readFileSync(fileName, 'utf8')))
    this.logger.debug(`load solc-js version takes: ${(+new Date() - start) / 1000} seconds`)
    start = +new Date()
    // console.log('input', input)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    output = JSON.parse(solcjs.compile(JSON.stringify(input)))
    this.logger.debug(`compile takes ${(+new Date() - start) / 1000} seconds`)
    let check: any = {}
    if (output.errors) {
      check = output.errors.reduce((check, err) => {
        if (err.severity === 'warning') {
          if (!check.warnings) check.warnings = []
          check.warnings.push(err.message)
        }
        if (err.severity === 'error') {
          check.error = err.message
        }
        return check
      }, {})
    }
    // let data = {}
    const contract: any = {}
    if (check.error) {
      this.logger.error(check.error)
      return false
      // data = { result: { verified: false }, err_msg: check.error }
    } else {
      if (output.contracts) {
        let hexBytecode = this.utilsService.getHex(byteCode).substring(2)
        for (var contractName in output.contracts['test.sol']) {
          const byteCode = output.contracts['test.sol'][contractName].evm.bytecode.object
          const deployedBytecode =
            output.contracts['test.sol'][contractName].evm.deployedBytecode.object
          const processed_compiled_bytecode =
            this.utilsService.getBytecodeWithoutMetadata(deployedBytecode)
          const constructor_arguments = hexBytecode.slice(byteCode.length)
          if (
            hexBytecode.indexOf(processed_compiled_bytecode) > -1 &&
            processed_compiled_bytecode.length > 0
          ) {
            let abi = output.contracts['test.sol'][contractName].abi
            const breifVersion = versionFullName.match(/^soljson-(.*).js$/)[1]
            contract.verified = true
            contract.byte_code = byteCode
            if (this.utilsService.checkTnt721(abi)) {
              contract.protocol = SmartContractProtocolEnum.tnt721
              this.logger.debug('read 721  contract uri,address:' + address)
              const contractUri = abi.find((v) => v.name == 'contractURI')
              if (contractUri) {
                const res = await this.utilsService.readSmartContract(
                  address,
                  address,
                  abi,
                  'contractURI',
                  [],
                  [],
                  ['string']
                )
                this.logger.debug('contract uri:' + res[0])
                contract.contract_uri = res[0]
                if (res[0]) {
                  // const contractUri: string = res[0]
                  try {
                    const jsonRes = await this.utilsService.getJsonRes(res[0])
                    // const jsonRes: any = httpRes.data

                    contract.contract_uri_detail = JSON.stringify(jsonRes)
                    contract.name = jsonRes.name
                  } catch (e) {
                    this.logger.error('Fetch contract uri: Bad response from server')
                    contract.contract_uri_detail = ''
                    contract.name = contractName
                  }
                }
              }
              const name = abi.find((v) => v.name == 'name')
              if (name) {
                const res = await this.utilsService.readSmartContract(
                  address,
                  address,
                  abi,
                  'name',
                  [],
                  [],
                  ['string']
                )
                this.logger.debug('get name:' + JSON.stringify(res))
                if (res[0]) {
                  contract.name = res[0]
                }
              }
            } else if (this.utilsService.checkTnt20(abi)) {
              contract.protocol = SmartContractProtocolEnum.tnt20
              contract.name = contractName
            } else {
              contract.protocol = SmartContractProtocolEnum.unknow
              contract.name = contractName
            }
            // contract.contract_address
            contract.abi = JSON.stringify(abi)
            contract.source_code = this.utilsService.stampDate(sourceCode)
            contract.verification_date = moment().unix()
            contract.compiler_version = breifVersion
            contract.optimizer = optimizer === true ? 'enabled' : 'disabled'
            contract.optimizerRuns = optimizerRuns
            contract.function_hash = JSON.stringify(
              output.contracts['test.sol'][contractName].evm.methodIdentifiers
            )
            contract.constructor_arguments = constructor_arguments
            return contract
          }
        }
      }
    }
  }

  async updateCallLogEntity() {
    await this.smartContractConnectionRunner.manager.insert(SmartContractCallRecordEntity, {})
  }
}
