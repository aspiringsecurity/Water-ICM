import { registerEnumType } from '@nestjs/graphql'

// export enum THETA_TX_TYPE_ENUM {
//   TxCoinbase,
//   TxSlash,
//   TxSend,
//   TxReserveFund,
//   TxReleaseFund,
//   TxServicePayment,
//   TxSplitRule,
//   TxSmartContract,
//   TxDepositStake,
//   TxWithdrawStake,
//   TxDepositStakeV2,
//   TxStakeRewardDistribution
// }
// registerEnumType(THETA_TX_TYPE_ENUM, { name: 'THETA_TX_TYPE_ENUM' })

export enum THETA_TRANSACTION_TYPE_ENUM {
  coinbase = 0,
  slash = 1,
  send = 2,
  reserve_fund = 3,
  release_fund = 4,
  service_payment = 5,
  split_rule = 6,
  smart_contract = 7,
  deposit_stake = 8,
  withdraw_stake = 9,
  tx_deposit_stake_v2 = 10,
  tx_stake_reward_distribution = 11
}
registerEnumType(THETA_TRANSACTION_TYPE_ENUM, { name: 'THETA_TRANSACTION_TYPE_ENUM' })

export enum THETA_BLOCK_STATUS_ENUM {
  pending,
  valid,
  invalid,
  committed,
  directly_finalized,
  indirectly_finalized,
  trusted
}
registerEnumType(THETA_BLOCK_STATUS_ENUM, { name: 'THETA_BLOCK_STATUS_ENUM' })
