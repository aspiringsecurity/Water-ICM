import { WalletDpWdHistoryEntity } from './deposit-withdraw/wallet-dp-wd-history.entity'
import { WalletSendHistoryEntity } from './send/wallet-send-history.entity'
import { NftTransferRecordEntity } from 'src/block-chain/smart-contract/nft/nft-transfer-record.entity'
import { StakeRewardEntity } from './../stake/stake-reward.entity'
import { TransactionEntity } from './../explorer/transaction.entity'
import { Paginated } from 'src/common/common.model'
import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'

@ObjectType()
export class PaginatedHistoryTransactions extends Paginated(TransactionEntity) {}

@ObjectType()
export class HistoryTransactionsModel {
  @Field(() => [StakeRewardEntity], { nullable: true })
  stake_rewards: Array<StakeRewardEntity>

  @Field(() => [NftTransferRecordEntity], { nullable: true })
  nft_transfers: Array<NftTransferRecordEntity>

  @Field(() => [WalletSendHistoryEntity], { nullable: true })
  send_transfers: Array<WalletSendHistoryEntity>

  @Field(() => [WalletDpWdHistoryEntity], { nullable: true })
  deposit_withdraw: Array<WalletDpWdHistoryEntity>

  @Field(() => GraphQLInt)
  start_time: number

  @Field(() => GraphQLInt)
  end_time: number
}
