import { Injectable } from '@nestjs/common'
import { thetaTsSdk } from 'theta-ts-sdk'

@Injectable()
export class RpcService {
  constructor() {}
  public async getVersion() {
    return (await thetaTsSdk.blockchain.getVersion()).result
  }

  public async getAccount(address: string) {
    return (await thetaTsSdk.blockchain.getAccount(address)).result
  }

  public async getAccountByHash(hash: string) {
    return (await thetaTsSdk.blockchain.getBlock(hash)).result
  }

  public async getBlockByHeight(height: number) {
    return (await thetaTsSdk.blockchain.getBlockByHeight(height.toString())).result
  }

  public async getStatus() {
    return (await thetaTsSdk.blockchain.getStatus()).result
  }

  public async getTransactionByHash(hash: string) {
    return (await thetaTsSdk.blockchain.getTransaction(hash)).result
  }

  public async getVcpByHeight(height: number) {
    return (await thetaTsSdk.blockchain.getVcpByHeight(height.toString())).result
  }

  public async getGcpByHeight(height: number) {
    return (await thetaTsSdk.blockchain.getGcpByHeight(height.toString())).result
  }

  public async getEenpByHeight(height: number) {
    return (await thetaTsSdk.blockchain.getEenpByHeight(height.toString())).result
  }

  public async getPendingTransactions() {
    return (await thetaTsSdk.blockchain.getPendingTransactions()).result
  }

  public async getStakeRewardDistributionByHeight(height: number) {
    return (await thetaTsSdk.blockchain.getStakeRewardDistributionByHeight(height.toString()))
      .result
  }

  public async getBlockSByRange(height: number, endHeight: number) {
    return (await thetaTsSdk.blockchain.getBlockSByRange(height.toString(), endHeight.toString()))
      .result
  }

  public async callSmartContract(from: string, to: string, data: string) {
    return await thetaTsSdk.blockchain.callSmartContract(from, to, data)
  }
}
