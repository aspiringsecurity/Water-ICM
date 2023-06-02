import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { NftBalanceEntity } from './nft-balance.entity'
import { NftTransferRecordEntity } from './nft-transfer-record.entity'
import {
  NftType,
  PaginatedNftBalance,
  PaginatedNftTransferRecord,
  PaginatedSmartContract
} from './nft.model'
import { NftService } from './nft.service'

@Resolver(() => NftType)
export class NftResolver {
  constructor(private nftService: NftService) {}

  @Query(() => NftType)
  async Nfts() {
    return {}
  }

  @ResolveField(() => PaginatedSmartContract, { nullable: true })
  async SearchNfts(
    @Args('name') name: string,
    @Args('take', { type: () => Int, defaultValue: 10 }) take: number,
    @Args('after', { nullable: true }) after: string
  ) {
    const [hasNextPage, totalNumber, res] = await this.nftService.findNftsByName(name, take, after)
    let endCursor = ''
    if (res.length > 0) {
      // this.console.log();
      // console.log(res[res.length - 1].create_date)
      endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64')
    }
    return {
      // endCursor: endCursor,
      hasNextPage: hasNextPage,
      nodes: res,
      totalCount: totalNumber
    }
  }

  @ResolveField(() => PaginatedNftBalance)
  async Balance(
    @Args('wallet_address') walletAddress: string,
    @Args('search', { nullable: true }) search: string,
    @Args('take', { type: () => Int, defaultValue: 10 }) take: number,
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('after', { nullable: true }) after: string
  ) {
    const [hasNextPage, totalNumber, res] = await this.nftService.getNftByWalletAddress(
      walletAddress.toLowerCase(),
      take,
      after,
      skip,
      search
    )
    let endCursor = ''
    if (res.length > 0) {
      // this.console.log();
      // console.log(res[res.length - 1].id.toString())
      endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64')
    }
    return {
      endCursor: endCursor,
      hasNextPage: hasNextPage,
      nodes: res,
      totalCount: totalNumber,
      skip: skip
    }
  }

  @ResolveField(() => PaginatedNftBalance, { nullable: true })
  async NftsForContract(
    @Args('wallet_address') walletAddress: string,
    @Args('smart_contract_address') contractAddress: string,
    @Args('take', { type: () => Int, defaultValue: 10 }) take: number,
    @Args('after', { nullable: true }) after: string
  ) {
    const [hasNextPage, totalNumber, res] = await this.nftService.getNftsForContract(
      walletAddress.toLowerCase(),
      contractAddress.toLowerCase(),
      take,
      after
    )
    let endCursor = ''
    if (res.length > 0) {
      // this.console.log();
      // console.log(res[res.length - 1].create_date)
      endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64')
    }
    return {
      endCursor: endCursor,
      hasNextPage: hasNextPage,
      nodes: res,
      totalCount: totalNumber
    }
  }

  @ResolveField(() => PaginatedNftTransferRecord)
  async NftTransfers(
    @Args('wallet_address') walletAddress: string,
    @Args('take', { type: () => Int, defaultValue: 10 }) take: number,
    @Args('after', { nullable: true }) after: string
  ) {
    const [hasNextPage, totalNumber, res] = await this.nftService.getNftTransfersByWallet(
      walletAddress.toLowerCase(),
      take,
      after
    )
    let endCursor = ''
    if (res.length > 0) {
      // console.log(res[res.length - 1].id)
      endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64')
    }
    return {
      endCursor: endCursor,
      hasNextPage: hasNextPage,
      nodes: res,
      totalCount: totalNumber
    }
  }

  @ResolveField(() => [NftTransferRecordEntity])
  async NftTransfersByBlock(@Args('block_height', { type: () => Int }) blockHeight: number) {
    return await this.nftService.getNftTransfersForBlockHeight(blockHeight)
  }

  @ResolveField(() => PaginatedNftBalance)
  async NftOwners(
    @Args('smart_contract_address') contractAddress: string,
    @Args('take', { type: () => Int, defaultValue: 10 }) take: number,
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('after', { nullable: true }) after: string
  ) {
    const [hasNextPage, totalNumber, res] = await this.nftService.getNftsBySmartContractAddress(
      contractAddress.toLowerCase(),
      take,
      after,
      skip
    )
    let endCursor = ''
    if (res.length > 0) {
      // console.log(res[res.length - 1].create_date)
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

  @ResolveField(() => PaginatedNftTransferRecord)
  async ContractNftTransfers(
    @Args('smart_contract_address') contractAddress: string,
    @Args('token_id', { type: () => Int, nullable: true }) tokenId: number,
    @Args('take', { type: () => Int, defaultValue: 10 }) take: number,
    @Args('after', { nullable: true }) after: string,
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number
  ) {
    const [hasNextPage, totalNumber, res] = await this.nftService.getNftTransfersForSmartContract(
      contractAddress.toLowerCase(),
      tokenId,
      take,
      after,
      skip
    )
    let endCursor = ''
    if (res.length > 0) {
      endCursor = Buffer.from(res[res.length - 1].timestamp.toString()).toString('base64')
    }
    return {
      endCursor: endCursor,
      hasNextPage: hasNextPage,
      skip: skip,
      nodes: res,
      totalCount: totalNumber
    }
  }

  @ResolveField(() => NftBalanceEntity)
  async TokenIdOwners(
    @Args('token_id', { defaultValue: 1, type: () => Int }) tokenId: number,
    @Args('contract_adress') contractAddress: string
  ) {
    return await this.nftService.getNftByTokenId(tokenId, contractAddress.toLowerCase())
  }
}
