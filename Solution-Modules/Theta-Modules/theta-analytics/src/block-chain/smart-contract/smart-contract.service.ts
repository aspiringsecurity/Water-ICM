import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SmartContractEntity, SmartContractProtocolEnum } from './smart-contract.entity'
import { FindManyOptions, Like, MoreThan, Repository } from 'typeorm'
import { SmartContractCallRecordEntity } from './smart-contract-call-record.entity'
import { RankByEnum } from './smart-contract.model'
import { NftService } from './nft/nft.service'
import { SolcService } from 'src/common/solc.service'
import { UtilsService } from 'src/common/utils.service'
var requireFromString = require('require-from-string')
const moment = require('moment')
const solc = require('solc')
@Injectable()
export class SmartContractService {
  logger = new Logger('smart contract service')
  constructor(
    @InjectRepository(SmartContractEntity, 'smart_contract')
    private smartContractRepository: Repository<SmartContractEntity>,

    @InjectRepository(SmartContractCallRecordEntity, 'smart_contract')
    private smartContractRecordRepository: Repository<SmartContractCallRecordEntity>,

    private nftService: NftService,

    private solcService: SolcService,

    private utilsService: UtilsService
  ) {}

  async getSmartContract(rankBy: RankByEnum, max: number = 500) {
    switch (rankBy) {
      case RankByEnum.last_seven_days_call_times:
        return await this.smartContractRepository.find({
          order: { last_seven_days_call_times: 'DESC' },
          take: max
        })
      case RankByEnum.last_24h_call_times:
        return await this.smartContractRepository.find({
          order: { last_24h_call_times: 'DESC' },
          take: max
        })
      default:
        return await this.smartContractRepository.find({
          order: { call_times: 'DESC' },
          take: max
        })
    }
  }

  async searchSmartContract(
    protocol: SmartContractProtocolEnum | null,
    name: string | null,
    rankBy: RankByEnum,
    max: number = 500
  ) {
    const condition: FindManyOptions<SmartContractEntity> = {
      where: {},
      take: max
    }
    switch (rankBy) {
      case RankByEnum.last_seven_days_call_times:
        condition.order = { last_seven_days_call_times: 'DESC' }
        break
      case RankByEnum.last_24h_call_times:
        condition.order = { last_24h_call_times: 'DESC' }
        break
      default:
        condition.order = { call_times: 'DESC' }
    }
    if (protocol) {
      condition.where['protocol'] = protocol
    }
    if (name) condition.where['name'] = Like('%' + name + '%')
    // console.log(condition)
    return await this.smartContractRepository.find(condition)
  }

  async getSmartContractNum() {
    return await this.smartContractRepository.count()
  }

  async getSmartContractRecord() {
    return await this.smartContractRecordRepository.find()
  }

  async getOrAddSmartContract(contractAddress: string, height: number) {
    await this.smartContractRepository.query(
      `INSERT INTO smart_contract_entity(contract_address,height) VALUES ('${contractAddress}',${height})  ON CONFLICT (contract_address) DO UPDATE set call_times=call_times+1;`
    )
    return await this.smartContractRepository.findOne({
      where: { contract_address: contractAddress }
    })
  }

  // @Cron(CronExpression.EVERY_10_MINUTES)
  async updateCallTimesByPeriod() {
    let smartContractList = await this.smartContractRepository.find()
    for (const contract of smartContractList) {
      contract.last_24h_call_times = await this.smartContractRecordRepository.count({
        where: {
          timestamp: MoreThan(moment().subtract(24, 'hours').unix()),
          contract_id: contract.id
        }
      })
      contract.last_seven_days_call_times = await this.smartContractRecordRepository.count({
        where: {
          timestamp: MoreThan(moment().subtract(7, 'days').unix()),
          contract_id: contract.id
        }
      })
      await this.smartContractRepository.save(contract)
    }
  }

  async verifySmartContract(
    address: string,
    // abi: string,
    sourceCode: string,
    byteCode: string,
    version: string,
    versionFullName: string,
    optimizer: boolean,
    optimizerRuns: number
  ) {
    let contract = await this.smartContractRepository.findOne({
      where: {
        contract_address: address
      }
    })
    if (!contract) {
      contract = new SmartContractEntity()
      contract.contract_address = address
      contract = await this.smartContractRepository.save(contract)
    } else {
      if (contract.verified) return contract
    }

    // const downloader = require('../../helper/solcDownloader')
    // const solc = require('solc')
    // const helper = require('../../helper/utils')
    const fs = require('fs')

    address = this.utilsService.normalize(address.toLowerCase())
    optimizerRuns = +optimizerRuns
    if (Number.isNaN(optimizerRuns)) optimizerRuns = 200
    try {
      this.logger.debug('Verifing the source code and bytecode for address:', address)
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
              // '*': ['metadata', 'evm.bytecode']
            }
          }
        },
        sources: {
          'test.sol': {
            // mortal: {
            // content: sourceCode
            // }
            content: sourceCode
            // content: ''
          }
        }
      }
      // console.log(input)
      var output: any = ''
      this.logger.debug(`Loading specific version starts.`)
      this.logger.debug(`version: ${version}`)
      const prefix = './libs'
      const fileName = prefix + '/' + versionFullName
      if (!fs.existsSync(fileName)) {
        this.logger.debug(`file ${fileName} does not exsit, downloading`)
        await this.solcService.downloadByVersion(version, './libs')
      } else {
        this.logger.debug(`file ${fileName} exsits, skip download process`)
      }
      this.logger.debug(`Download solc-js file takes: ${(+new Date() - start) / 1000} seconds`)
      start = +new Date()
      const solcjs = solc.setupMethods(requireFromString(fs.readFileSync(fileName, 'utf8')))
      this.logger.debug(`load solc-js version takes: ${(+new Date() - start) / 1000} seconds`)
      start = +new Date()
      this.logger.debug('input', input)
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
      let data = {}
      if (check.error) {
        this.logger.debug(check.error)
        data = { result: { verified: false }, err_msg: check.error }
      } else {
        if (output.contracts) {
          let hexBytecode = this.utilsService.getHex(byteCode).substring(2)
          for (var contractName in output.contracts['test.sol']) {
            // if(con)
            const byteCode = output.contracts['test.sol'][contractName].evm.bytecode.object
            const deployedBytecode =
              output.contracts['test.sol'][contractName].evm.deployedBytecode.object

            const processed_compiled_bytecode =
              this.utilsService.getBytecodeWithoutMetadata(deployedBytecode)
            // const testCode = this.utilsService.getBy
            const constructor_arguments = hexBytecode.slice(byteCode.length)
            // if (contractName === 'ThetaDropMarketplace') {
            //   // this.logger.debug(hexBytecode)
            //   this.logger.debug(byteCode)
            //   // this.logger.debug(deployedBytecode)
            // }
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
              } else if (this.utilsService.checkTnt20(abi)) {
                contract.protocol = SmartContractProtocolEnum.tnt20
              } else {
                contract.protocol = SmartContractProtocolEnum.unknow
              }
              // contract.contract_address
              contract.abi = JSON.stringify(abi)
              contract.source_code = this.utilsService.stampDate(sourceCode)
              contract.verification_date = moment().unix()
              contract.compiler_version = breifVersion
              contract.optimizer = optimizer === true ? 'enabled' : 'disabled'
              contract.optimizerRuns = optimizerRuns
              contract.name = contractName
              contract.function_hash = JSON.stringify(
                output.contracts['test.sol'][contractName].evm.methodIdentifiers
              )
              contract.constructor_arguments = constructor_arguments
              await this.smartContractRepository.save(contract)
              this.logger.debug('save smart contract')
              // await this.nftService.parseRecordByContractAddress(address)
              // return contract
              break
            } else {
              this.logger.debug('contractName ' + contractName + ' bytecode not match')
            }
          }
        }
      }
      return contract
    } catch (e) {
      this.logger.debug('Error in catch:', e)
      return contract
    }
  }
  async directVerifySmartContract(
    address: string,
    // abi: string,
    sourceCode: string,
    byteCode: string,
    optimizer: string,
    optimizerRuns: number,
    verificationDate: number,
    compilerVersion: string,
    name: string,
    functionHash: string,
    constructorArguments,
    abi: string
  ) {
    let contract = await this.smartContractRepository.findOne({
      where: { contract_address: address }
    })
    if (contract.verified) return contract
    if (!contract) {
      contract = new SmartContractEntity()
    }
    if (
      // !contract.verified &&
      contract.contract_address == '0x7945e7e8b5ee315d19d65db3063b3d53fa1cc078'
    ) {
      // if () {
      contract.latest_record_parse_height = 13764000
      // }
    }
    // this.logger.de
    // if (!contract) {
    // if(contract)

    contract.contract_address = address
    contract.abi = abi
    contract.source_code = sourceCode
    contract.byte_code = byteCode
    contract.verification_date = verificationDate
    contract.compiler_version = compilerVersion
    contract.optimizer = optimizer
    contract.optimizerRuns = optimizerRuns
    contract.name = name
    contract.function_hash = functionHash
    contract.constructor_arguments = constructorArguments
    contract.verified = true

    if (this.utilsService.checkTnt721(JSON.parse(abi))) {
      contract.protocol = SmartContractProtocolEnum.tnt721
    } else if (this.utilsService.checkTnt20(JSON.parse(abi))) {
      contract.protocol = SmartContractProtocolEnum.tnt20
    } else {
      contract.protocol = SmartContractProtocolEnum.unknow
    }
    this.logger.debug('start to save')
    return await this.smartContractRepository.save(contract)
    // } else {
    //   if (contract.verified) return contract
    // }
    // contract =
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
    // this.logger.debug(input)
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
    const solcjs = solc.setupMethods(requireFromString(fs.readFileSync(fileName, 'utf8')))
    this.logger.debug(`load solc-js version takes: ${(+new Date() - start) / 1000} seconds`)
    start = +new Date()
    // console.log('input', input)
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
                    // throw new Error('Bad response from server')
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

  async getContractByAddress(address: string) {
    const contract = await this.smartContractRepository.findOne({
      where: {
        contract_address: address
      }
    })
    return contract
  }
}
