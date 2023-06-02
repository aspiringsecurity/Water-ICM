import { RankByEnum } from './../smart-contract/smart-contract.model'
import { THETA_TRANSACTION_TYPE_ENUM } from './../tx/theta.enum'
// import { THETA_TRANSACTION_TYPE_ENUM } from 'theta-ts-sdk/dist/types/enum'
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { THETA_BLOCK_STATUS_ENUM } from '../tx/theta.enum'
import { GraphQLBoolean, GraphQLInt, GraphQLString, Token } from 'graphql'
import { GetVcpByHeightModel } from './rpc-vcp.model'
import { GetGcpByHeightModel } from './rpc-gcp.model'
import { GetEenpByHeightModel } from './rpc-eenp.model'
import { BlockHashStakeRewardDistributionRuleSetPairsModel } from './rpc-stake-reward-distribution-by-height.model'

export enum STAKE_PURPOSE_ENUM {
  validator,
  guardian,
  elite_edge_node
}
registerEnumType(STAKE_PURPOSE_ENUM, {
  name: 'STAKE_PURPOSE_ENUM'
})

@ObjectType()
export class TokenType {
  @Field()
  thetawei: string // "994999990000000000000000000",

  @Field()
  tfuelwei: string //"4999999979999999000000000000"
}

@ObjectType()
export class HolderType {
  @Field()
  address: string

  @Field(() => TokenType)
  coins: TokenType
}

@ObjectType()
export class GetVersionModel {
  @Field({ description: 'the version number' })
  version: string //"1.0",

  @Field({ description: 'the git commit hash of the code base' })
  git_hash: string //"9d7669a735063a283ae8b6f0826183e3830c00a5",

  @Field({ description: 'the build timestamp' })
  timestamp: string //'Tue Feb 19 23:31:32 UTC 2019'
}

@ObjectType()
export class receiptType {
  @Field()
  TxHash: string

  @Field(() => [receiptLogType], { nullable: true })
  Logs: Array<receiptLogType>

  @Field({ nullable: true })
  EvmRet: string

  @Field()
  ContractAddress: string

  @Field(() => GraphQLInt)
  GasUsed: number

  @Field({ nullable: true })
  EvmErr: string
}

@ObjectType()
export class receiptLogType {
  @Field()
  address: string

  @Field(() => [GraphQLString])
  topics: Array<string>

  @Field({ nullable: true })
  data: string
}

@ObjectType()
export class GetAccountModel {
  @Field({ description: ' the current sequence number of the account' })
  sequence: number // "1",

  @Field({ description: 'the native token balance' })
  coins: TokenType

  @Field(() => [String], {
    description:
      'fund reserved for micropayment through the off-chain resource-oriented payment pool'
  })
  reserved_funds: Array<number>

  @Field({ description: '' })
  last_updated_block_height: string //'0'

  @Field({
    description: 'the root hash of the data Merkle-Patricia trie (for smart contract accounts)'
  })
  root: string //'0x0000000000000000000000000000000000000000000000000000000000000000'

  @Field({ description: 'the hash of the smart contract bytecode (for smart contract accounts)' })
  code: string //'0x0000000000000000000000000000000000000000000000000000000000000000'
}

@ObjectType()
export class HccVoteType {
  @Field()
  Block: string

  @Field(() => Int)
  Height: number

  @Field(() => Int)
  Epoch: number

  @Field()
  ID: string

  @Field()
  Signature: string
}

@ObjectType()
export class HccType {
  @Field(() => [HccVoteType])
  Votes: Array<HccVoteType>

  @Field()
  BlockHash: string
}

@ObjectType()
export class GuardianVotesType {
  @Field()
  Block: string

  @Field()
  Gcp: string

  @Field(() => [Int])
  Multiplies: Array<number>
}

@ObjectType()
export class EliteEdgeNodeVotesType {
  @Field()
  Block: string

  @Field(() => [Int])
  Multiplies: Array<number>

  @Field(() => [GraphQLString])
  Addresses: Array<string>
}
@ObjectType()
export class SourceTargetType {
  @Field()
  address: string

  @Field()
  sequence: string

  @Field(() => TokenType)
  coins: TokenType

  @Field()
  signature: string
}

@ObjectType()
export class BlockModel {
  @Field({ description: 'ID of the chain' })
  chain_id: string //"privatenet",

  @Field({ description: 'epoch of the block' })
  epoch: string // "5",

  @Field({ description: 'height of the block' })
  height: string //"3",

  @Field({ description: 'hash of the parent block' })
  parent: string // "0x724b0f68d8e45f930b95bac224fa7d67eef243307b4e84f0f666198d1d70e9d7",

  @Field({ description: 'root hash of the transaction Merkle-Patricia trie' })
  transactions_hash: string //"0x2bf2c62185fceed239a55bd27ada030cf75970f09122addb2e419e70cafebdf0",

  @Field({ description: 'root hash of the state Merkle-Patricia trie' })
  state_hash: string //"0xd41742c2b0d70e3bac1d88b2af69a2491d8c65c650af6ec4d2b8873897f8becc",

  @Field({ description: 'timestamp when the block was proposed' })
  timestamp: string //"1548102762",

  @Field({ description: 'address of the proposer validator' })
  proposer: string //"0x2e833968e5bb786ae419c4d13189fb081cc43bab",

  @Field(() => [String], { description: 'children blocks' })
  children: Array<string> //["0x21d3c2bb25d0c85a1f5c3ff81bc7eeae998bf98db1dba461fb3f69a434feb90c"],

  @Field(() => THETA_BLOCK_STATUS_ENUM, { description: 'status of the block' })
  status: THETA_BLOCK_STATUS_ENUM //4,

  @Field({ description: 'hash of the transaction' })
  hash: string // "0x9f1e77b08c9fa8984096a735d0aae6b0e43aee297e42c54ce36334103ddd67a7",

  @Field(() => [transactionType], {
    description: ' json representation of the transactions contained in the block'
  })
  transactions: Array<transactionType>

  @Field(() => HccType, { nullable: true })
  hcc: HccType

  @Field(() => GuardianVotesType, { nullable: true })
  guardian_votes: GuardianVotesType

  @Field(() => EliteEdgeNodeVotesType, { nullable: true })
  elite_edge_node_votes: EliteEdgeNodeVotesType
}

@ObjectType()
export class proposerType {
  @Field({ nullable: true })
  address: string //'0x2e833968e5bb786ae419c4d13189fb081cc43bab'

  @Field(() => TokenType, { nullable: true })
  coins: TokenType

  @Field({ nullable: true })
  sequence: string //"0",

  @Field({ nullable: true })
  signature: string // "0x31af035f0dc47ded00eb5139fd5e4bb76f82e89e2
}

@ObjectType()
export class inputOutputType {
  @Field()
  address: string //"0x2e833968e5bb786ae419c4d13189fb081cc43bab",

  @Field(() => TokenType)
  coins: TokenType
}

@ObjectType()
export class transactionRawType {
  @Field(() => proposerType, { nullable: true })
  proposer?: proposerType

  @Field(() => TokenType, { nullable: true })
  fee?: TokenType

  @Field(() => [inputOutputType], { nullable: 'itemsAndList' })
  outputs?: Array<inputOutputType>

  @Field(() => [inputOutputType], { nullable: 'itemsAndList' })
  inputs?: Array<inputOutputType>

  @Field({ nullable: true })
  gas_limit?: string

  @Field({ nullable: true })
  gas_price?: string

  @Field({ nullable: true })
  gas_used?: string

  @Field((type) => proposerType, { nullable: true })
  from?: proposerType

  @Field((type) => proposerType, { nullable: true })
  to?: proposerType

  @Field({ nullable: true })
  data?: string

  @Field({ nullable: true })
  block_height?: string

  @Field({ nullable: true })
  payment_sequence?: string

  @Field({ nullable: true })
  reserve_sequence?: string

  @Field({ nullable: true })
  resource_id?: string

  @Field(() => SourceTargetType, { nullable: true })
  source?: SourceTargetType

  @Field(() => SourceTargetType, { nullable: true })
  target?: SourceTargetType

  @Field(() => TokenType, { nullable: true })
  collateral?: TokenType

  @Field(() => [String], { nullable: true })
  resource_ids?: Array<string>

  @Field({ nullable: true })
  duration?: string

  @Field(() => STAKE_PURPOSE_ENUM, { nullable: true })
  purpose?: STAKE_PURPOSE_ENUM

  @Field(() => HolderType, { nullable: true })
  holder?: HolderType
}

@ObjectType()
export class transactionType {
  @Field(() => transactionRawType, { nullable: true })
  raw: transactionRawType

  @Field(() => THETA_TRANSACTION_TYPE_ENUM)
  type: THETA_TRANSACTION_TYPE_ENUM

  // @Field(() => TokenType, { nullable: true })
  // fee: TokenType

  @Field()
  hash: string

  @Field(() => receiptType, { nullable: true })
  receipt?: receiptType
}

@ObjectType()
export class GetTransactionModel {
  @Field()
  block_hash: string //"0x9f1e77b08c9fa8984096a735d0aae6b0e43aee297e42c54ce36334103ddd67a7",

  @Field()
  block_height: string //"3",

  @Field(() => THETA_TRANSACTION_TYPE_ENUM)
  type: THETA_TRANSACTION_TYPE_ENUM

  @Field()
  status: string //"finalized",

  @Field()
  hash: string //"0xf3cc94af7a1520b384999ad106ade9738b6cde66e2377ceab37067329d7173a0",

  @Field(() => transactionRawType)
  transaction: transactionRawType

  @Field(() => receiptType, { nullable: true })
  receipt?: receiptType
}

@ObjectType()
export class NodeStatusModel {
  @Field()
  address: string //'0x1676d4D39cbC7519De75878765Fdde964B432732'

  @Field()
  chain_id: string //'mainnet'

  @Field()
  peer_id: string //'0x1676d4D39cbC7519De75878765Fdde964B432732'

  @Field()
  latest_finalized_block_hash: string //'0x6fc056d88b59285d3c1fadf192cb6aab7128ba3eb110bc076f69fd2230101117'

  @Field()
  latest_finalized_block_height: string //'11798375'

  @Field()
  latest_finalized_block_time: string //'1630400947'

  @Field()
  latest_finalized_block_epoch: string //'11880229'

  @Field()
  current_epoch: string //'11880231'

  @Field()
  current_height: string //'11798375'

  @Field()
  current_time: string //'1630400964'

  @Field(() => GraphQLBoolean)
  syncing: false

  @Field()
  genesis_block_hash: string
}

@ObjectType()
export class GetPendingTransactionsModel {
  @Field(() => [String])
  tx_hashes: Array<string>
}

@ObjectType()
export class ThetaRpcModel {
  @Field(() => GetVersionModel, {
    description: 'This field returns the version of the blockchain software.'
  })
  GetVersion: GetVersionModel

  @Field(() => GetAccountModel, {
    description: 'This Field returns the details of the account.\n' + '\n'
  })
  GetAccount: GetAccountModel

  @Field(() => BlockModel, { description: 'This Field returns the details of the block' })
  GetBlock: BlockModel

  @Field(() => BlockModel, {
    description:
      'This Field returns the finalized block given the height.\n' +
      'If none of the blocks at the given height are finalized (either directly or indirectly), \n' +
      'then returns an empty result.'
  })
  GetBlockByHeight: BlockModel

  @Field(() => NodeStatusModel, {
    description: 'This field return the status of the guardian node run by theta data'
  })
  GetStatus: NodeStatusModel

  @Field(() => GetTransactionModel, {
    description: 'This field returns the detail of the transaction by hash.'
  })
  GetTransaction: GetTransactionModel

  @Field(() => GetVcpByHeightModel)
  GetVcpByHeight: GetVcpByHeightModel

  @Field(() => GetGcpByHeightModel)
  GetGcpByHeight: GetGcpByHeightModel

  @Field(() => GetEenpByHeightModel)
  GetEenpByHeight: GetEenpByHeightModel

  @Field(() => GetPendingTransactionsModel, {
    description: 'This field returns the pending transactions in the mempool.'
  })
  GetPendingTransactions: GetPendingTransactionsModel

  @Field(() => BlockHashStakeRewardDistributionRuleSetPairsModel)
  GetStakeRewardDistributionByHeight: BlockHashStakeRewardDistributionRuleSetPairsModel
}
