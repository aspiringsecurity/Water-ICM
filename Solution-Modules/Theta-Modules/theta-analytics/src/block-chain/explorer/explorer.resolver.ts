import {
  NftStatisticsOrderByType,
  NftStatisticsService
} from './../../statistics/nft/nft-statistics.service'
import { NftService } from 'src/block-chain/smart-contract/nft/nft.service'
import { SmartContractProtocolEnum } from 'src/contact/contact.entity'
import { THETA_TRANSACTION_TYPE_ENUM } from 'theta-ts-sdk/dist/types/enum'
import { SmartContractService } from 'src/block-chain/smart-contract/smart-contract.service'
import { UtilsService } from './../../common/utils.service'
import { ExplorerService } from './explorer.service'
import {
  ExplorerModelType,
  ExplorerSearchModelType,
  PaginatedBlockList,
  PaginatedTransactions,
  SEARCH_TYPE_ENUM
} from './explorer.model'
import { Args, Context, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'
import { RpcService } from '../rpc/rpc.service'
// import { THETA_TX_TYPE_ENUM } from '../tx/theta.enum'

@Resolver((of) => ExplorerModelType)
export class ExplorerResolver {
  constructor(
    private explorerService: ExplorerService,
    private rpcService: RpcService,
    private utilService: UtilsService,
    private smartContractService: SmartContractService,
    private nftService: NftService,
    private nftStatisticsService: NftStatisticsService
  ) {}

  @Query(() => ExplorerModelType)
  async Explorer(@Context() context) {
    return {}
  }

  @ResolveField(() => PaginatedBlockList)
  async blockList(
    @Args('take', { type: () => GraphQLInt, defaultValue: 10 }) take: number,
    @Args('after', { nullable: true }) after: string,
    @Args('skip', { type: () => GraphQLInt, defaultValue: 0 }) skip: number
  ) {
    const [hasNextPage, totalNumber, res] = await this.explorerService.getBlockList(
      take,
      after,
      skip
    )
    let endCursor = ''
    if (res.length > 0) {
      // console.log(res[res.length - 1].height.toString())
      endCursor = Buffer.from(res[res.length - 1].height.toString()).toString('base64')
    }
    return {
      endCursor: endCursor,
      hasNextPage: hasNextPage,
      nodes: res,
      skip: skip,
      totalCount: totalNumber
    }
  }

  @ResolveField(() => PaginatedTransactions)
  async transactions(
    @Args('take', { type: () => GraphQLInt, defaultValue: 10 }) take: number,
    @Args('block_height', { type: () => GraphQLInt, defaultValue: 0, nullable: true })
    blockHeight: number,
    @Args('after', { nullable: true }) after: string,
    @Args('skip', { type: () => GraphQLInt, defaultValue: 0 }) skip: number
  ) {
    const [hasNextPage, totalNumber, res] = await this.explorerService.getTransactions(
      take,
      after,
      skip,
      blockHeight
    )
    let endCursor = ''
    if (res.length > 0) {
      endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64')
    }
    return {
      endCursor: endCursor,
      hasNextPage: hasNextPage,
      nodes: res,
      skip: skip,
      totalCount: totalNumber
    }
  }

  @ResolveField(() => ExplorerSearchModelType)
  async search(@Args('search') search: string): Promise<ExplorerSearchModelType> {
    const blockInfo = await this.explorerService.getBlockInfo(search)
    if (blockInfo) {
      const res = await this.rpcService.getBlockByHeight(blockInfo.height)
      return { block: res, block_extend: blockInfo, search_type: SEARCH_TYPE_ENUM.block }
    }

    const accountInfo = await this.explorerService.getAccount(search)
    // const accountInfo = await this.rpcService.getAccount(search)
    if (accountInfo) {
      // const accountInfo = await this.rpcService.getAccount(search)
      return {
        // account: accountInfo,
        search_type: SEARCH_TYPE_ENUM.account
      }
    }

    const transactionInfo = await this.explorerService.getTransactionInfo(search)

    if (transactionInfo) {
      const transactionRpc = await this.rpcService.getTransactionByHash(search)
      // let nftTransferRecords = []
      // if (transactionInfo.tx_type === THETA_TRANSACTION_TYPE_ENUM.smart_contract) {
      //   const contract = await this.smartContractService.getContractByAddress(transactionInfo.to)
      //   if (contract.protocol == SmartContractProtocolEnum.tnt721) {
      //     nftTransferRecords = await this.nftService.getNftTransferRecordsByTxHash(
      //       transactionInfo.tx_hash
      //     )
      //   }
      // }
      return {
        transaction: transactionInfo,
        transaction_rpc: transactionRpc,
        // transaction_nft_records: nftTransferRecords,
        search_type: SEARCH_TYPE_ENUM.transaction
      }
    }

    const [hasNextPage, totalNum, nftList] = await this.nftStatisticsService.getNft(
      NftStatisticsOrderByType.last_24_h_users,
      100,
      undefined,
      0,
      search
    )
    if (nftList.length > 0) {
      return {
        search_type: SEARCH_TYPE_ENUM.nft,
        nft_statistics: nftList,
        total: totalNum
      }
    }

    return {
      search_type: SEARCH_TYPE_ENUM.none
    }
  }
}
