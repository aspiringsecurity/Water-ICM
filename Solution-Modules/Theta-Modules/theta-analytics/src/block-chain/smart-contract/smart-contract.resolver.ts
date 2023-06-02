import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { SmartContractService } from './smart-contract.service'
import {
  RankByEnum,
  SmartContractStatisticsType,
  SmartContractVerifyType,
  UpdateRecordType
} from './smart-contract.model'
import { GraphQLInt, GraphQLString } from 'graphql'
import { NftService } from './nft/nft.service'
import { UtilsService } from 'src/common/utils.service'
import { SmartContractEntity, SmartContractProtocolEnum } from './smart-contract.entity'
import { Logger } from '@nestjs/common'

@Resolver(() => SmartContractStatisticsType)
export class SmartContractResolver {
  logger = new Logger()
  constructor(
    private smartContractService: SmartContractService,
    private nftService: NftService,
    private utilsService: UtilsService
  ) {}

  @Query(() => SmartContractStatisticsType)
  async SmartContractStatistics() {
    return {}
  }

  @ResolveField()
  async CallRank(
    @Parent() smartContract: SmartContractStatisticsType,
    @Args('rank_by', { type: () => RankByEnum, nullable: true }) rank_by: RankByEnum,
    @Args('take', { type: () => GraphQLInt, nullable: false, defaultValue: 500 }) take: number
  ) {
    return await this.smartContractService.getSmartContract(rank_by, take)
  }

  @ResolveField()
  async Search(
    @Args('protocol', { type: () => SmartContractProtocolEnum, nullable: true })
    protocol: SmartContractProtocolEnum,
    @Args('name', { type: () => GraphQLString, nullable: true })
    name: string,
    @Args('rank_by', { type: () => RankByEnum, nullable: true }) rank_by: RankByEnum,
    @Args('take', { type: () => GraphQLInt, nullable: false, defaultValue: 500 }) take: number
  ) {
    return await this.smartContractService.searchSmartContract(protocol, name, rank_by, take)
  }

  // @Mutation((returns) => SmartContractVerifyType)
  async verify(
    @Args({
      name: 'address'
    })
    address: string,
    @Args({
      name: 'sourceCode'
    })
    sourceCode: string,
    @Args({
      name: 'byteCode'
    })
    byteCode: string,
    @Args({
      name: 'version'
    })
    version: string,
    @Args({
      name: 'versionFullName'
    })
    versionFullName: string,

    @Args({
      name: 'optimizer'
    })
    optimizer: boolean,

    @Args({
      name: 'optimizerRuns',
      type: () => Int
    })
    optimizerRuns: number
  ) {
    return await this.smartContractService.verifySmartContract(
      address,
      sourceCode,
      byteCode,
      version,
      versionFullName,
      optimizer,
      optimizerRuns
    )
  }

  @Mutation((returns) => SmartContractEntity)
  async verifyWithThetaExplorer(
    @Args({
      name: 'address'
    })
    address: string
  ) {
    const res = await this.utilsService.getJsonRes(
      'https://explorer.thetatoken.org:8443/api/smartcontract/' + address
    )
    // if (httpRes.status >= 400) {
    //   // this.
    //   this.logger.error('vist /explorer.thetatoken.org error')
    //   throw new Error('Bad response from server')
    // }
    // const res: any = httpRes.data
    // console.log('theta explorer res optimizer ', res.body.optimizer)
    const optimizer = res.body.optimizer === 'disabled' ? false : true
    // console.log('optimizer', optimizer)
    const optimizerRuns = res.body.optimizerRuns ? res.body.optimizerRuns : 200
    address = this.utilsService.normalize(address.toLowerCase())
    this.logger.debug('start verify')
    return await this.smartContractService.directVerifySmartContract(
      address,
      res.body.source_code,
      res.body.bytecode,
      res.body.optimizer,
      optimizerRuns,
      Math.floor(Number(res.body.verification_date) / 1000),
      res.body.compiler_version,
      res.body.name,
      JSON.stringify(res.body.function_hash),
      res.body.constructor_arguments,
      JSON.stringify(res.body.abi)
    )
  }

  // @Mutation(() => UpdateRecordType)
  async updateRecord(
    @Args({
      name: 'address'
    })
    address: string
  ) {
    const affectedRows = await this.nftService.parseRecordByContractAddress(address)
    return { affected_rows: affectedRows }
  }
}
