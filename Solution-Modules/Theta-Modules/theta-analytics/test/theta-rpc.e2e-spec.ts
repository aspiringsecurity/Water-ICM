import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'
import { thetaTsSdk } from 'theta-ts-sdk'
// import config from 'config'
const gql = '/graphql/'
const config = require('config')

describe('Theta RPC', () => {
  let app: INestApplication
  let latestBlockHeight = 0
  beforeAll(async () => {
    // thetaTsSdk.blockchain.setUrl(config.get('THETA_NODE_HOST'))
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    latestBlockHeight = Number(
      (await thetaTsSdk.blockchain.getStatus()).result.latest_finalized_block_height
    )
    app = moduleFixture.createNestApplication()
    await app.init()
    // done().catch(() => {})
  })
  it('should get account', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          '{\n' +
          '  ThetaRpc {\n' +
          '    GetAccount(address: "0x6ae043e27a9599bfc0188d6c4bcd43d7c0dd46f5") {\n' +
          '      code\n' +
          '      coins {\n' +
          '        tfuelwei\n' +
          '        thetawei\n' +
          '      }\n' +
          '      reserved_funds\n' +
          '      last_updated_block_height\n' +
          '      sequence\n' +
          '      root\n' +
          '    }\n' +
          '  }\n' +
          '}'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetAccount).toHaveProperty('code')
        // done()
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 10000)

  it('should get block by hash', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          '{\n' +
          '  ThetaRpc {\n' +
          '    GetBlock(hash: "0x0bee8fcd0d92f7dcd9eb650c6be6333bd43143624e89023eabe27c3d69ecf1d5") {\n' +
          '      chain_id\n' +
          '      children\n' +
          '      epoch\n' +
          '      hash\n' +
          '      parent\n' +
          '      height\n' +
          '      proposer\n' +
          '      state_hash\n' +
          '      status\n' +
          '      timestamp\n' +
          '      transactions {\n' +
          '        hash\n' +
          '        raw {\n' +
          '          block_height\n' +
          '        fee {\n' +
          '          thetawei\n' +
          '          tfuelwei\n' +
          '        }\n' +
          '          data\n' +
          '          from {\n' +
          '            address\n' +
          '            coins {\n' +
          '              thetawei\n' +
          '              tfuelwei\n' +
          '            }\n' +
          '            sequence\n' +
          '            signature\n' +
          '          }\n' +
          '          gas_limit\n' +
          '          gas_price\n' +
          '          inputs {\n' +
          '            address\n' +
          '            coins {\n' +
          '              tfuelwei\n' +
          '              thetawei\n' +
          '            }\n' +
          '          }\n' +
          '          outputs {\n' +
          '            address\n' +
          '            coins {\n' +
          '              tfuelwei\n' +
          '              thetawei\n' +
          '            }\n' +
          '          }\n' +
          '          proposer {\n' +
          '            address\n' +
          '            coins {\n' +
          '              tfuelwei\n' +
          '              thetawei\n' +
          '            }\n' +
          '            sequence\n' +
          '            signature\n' +
          '          }\n' +
          '          to {\n' +
          '            address\n' +
          '            coins {\n' +
          '              tfuelwei\n' +
          '              thetawei\n' +
          '            }\n' +
          '            sequence\n' +
          '            signature\n' +
          '          }\n' +
          '        }\n' +
          '        receipt {\n' +
          '          ContractAddress\n' +
          '          EvmErr\n' +
          '          EvmRet\n' +
          '          GasUsed\n' +
          '          Logs {\n' +
          '            address\n' +
          '            data\n' +
          '            topics\n' +
          '          }\n' +
          '          TxHash\n' +
          '        }\n' +
          '        type\n' +
          '      }\n' +
          '      transactions_hash\n' +
          '    }\n' +
          '  }\n' +
          '}\n'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetBlock).toHaveProperty('hash')
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 10000)

  it('should get block by height', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          '{\n' +
          '  ThetaRpc {\n' +
          '    GetBlockByHeight(height: 12598482) {\n' +
          '      chain_id\n' +
          '      children\n' +
          '      epoch\n' +
          '      hash\n' +
          '      parent\n' +
          '      height\n' +
          '      proposer\n' +
          '      state_hash\n' +
          '      status\n' +
          '      timestamp\n' +
          '      transactions {\n' +
          '        hash\n' +
          '        raw {\n' +
          '        fee {\n' +
          '          thetawei\n' +
          '          tfuelwei\n' +
          '        }\n' +
          '          block_height\n' +
          '          data\n' +
          '          from {\n' +
          '            address\n' +
          '            coins {\n' +
          '              thetawei\n' +
          '              tfuelwei\n' +
          '            }\n' +
          '            sequence\n' +
          '            signature\n' +
          '          }\n' +
          '          gas_limit\n' +
          '          gas_price\n' +
          '          inputs {\n' +
          '            address\n' +
          '            coins {\n' +
          '              tfuelwei\n' +
          '              thetawei\n' +
          '            }\n' +
          '          }\n' +
          '          outputs {\n' +
          '            address\n' +
          '            coins {\n' +
          '              tfuelwei\n' +
          '              thetawei\n' +
          '            }\n' +
          '          }\n' +
          '          proposer {\n' +
          '            address\n' +
          '            coins {\n' +
          '              tfuelwei\n' +
          '              thetawei\n' +
          '            }\n' +
          '            sequence\n' +
          '            signature\n' +
          '          }\n' +
          '          to {\n' +
          '            address\n' +
          '            coins {\n' +
          '              tfuelwei\n' +
          '              thetawei\n' +
          '            }\n' +
          '            sequence\n' +
          '            signature\n' +
          '          }\n' +
          '        }\n' +
          '        receipt {\n' +
          '          ContractAddress\n' +
          '          EvmErr\n' +
          '          EvmRet\n' +
          '          GasUsed\n' +
          '          Logs {\n' +
          '            address\n' +
          '            data\n' +
          '            topics\n' +
          '          }\n' +
          '          TxHash\n' +
          '        }\n' +
          '        type\n' +
          '      }\n' +
          '      transactions_hash\n' +
          '    }\n' +
          '  }\n' +
          '}\n'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetBlockByHeight).toHaveProperty('hash')
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 10000)

  it('should get node status', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          '{\n' +
          '  ThetaRpc {\n' +
          '    GetStatus {\n' +
          '      address\n' +
          '      chain_id\n' +
          '      current_height\n' +
          '      current_epoch\n' +
          '      current_time\n' +
          '      latest_finalized_block_epoch\n' +
          '      genesis_block_hash\n' +
          '      latest_finalized_block_hash\n' +
          '      latest_finalized_block_height\n' +
          '      peer_id\n' +
          '      latest_finalized_block_time\n' +
          '      syncing\n' +
          '    }\n' +
          '  }\n' +
          '}\n'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetStatus).toHaveProperty('chain_id')
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 10000)

  it('should get node version', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          ' {\n' +
          '  ThetaRpc {\n' +
          '    GetVersion {\n' +
          '      timestamp\n' +
          '      git_hash\n' +
          '      version\n' +
          '    }\n' +
          '  }\n' +
          '}\n'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetVersion).toHaveProperty('version')
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 10000)

  it('should get transaction by hash', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          ' {\n' +
          '  ThetaRpc {\n' +
          '    GetTransaction(\n' +
          '      hash: "0x8ce09ea8aba4e0bffdf4f8746bc6b6ba605c35b1f7c35d702e4344846cddb224"\n' +
          '    ) {\n' +
          '      block_hash\n' +
          '      block_height\n' +
          '      hash\n' +
          '      transaction {\n' +
          '        block_height\n' +
          '        data\n' +
          '        from {\n' +
          '          address\n' +
          '          coins {\n' +
          '            tfuelwei\n' +
          '            thetawei\n' +
          '          }\n' +
          '          sequence\n' +
          '          signature\n' +
          '        }\n' +
          '        gas_limit\n' +
          '        gas_price\n' +
          '        inputs {\n' +
          '          address\n' +
          '          coins {\n' +
          '            tfuelwei\n' +
          '            thetawei\n' +
          '          }\n' +
          '        }\n' +
          '        outputs {\n' +
          '          address\n' +
          '          coins {\n' +
          '            tfuelwei\n' +
          '            thetawei\n' +
          '          }\n' +
          '        }\n' +
          '        proposer {\n' +
          '          coins {\n' +
          '            tfuelwei\n' +
          '            thetawei\n' +
          '          }\n' +
          '          address\n' +
          '          sequence\n' +
          '          signature\n' +
          '        }\n' +
          '        to {\n' +
          '          address\n' +
          '          coins {\n' +
          '            tfuelwei\n' +
          '            thetawei\n' +
          '          }\n' +
          '          sequence\n' +
          '          signature\n' +
          '        }\n' +
          '      }\n' +
          '      type\n' +
          '      status\n' +
          '      receipt {\n' +
          '        EvmRet\n' +
          '        EvmErr\n' +
          '        ContractAddress\n' +
          '        GasUsed\n' +
          '        Logs {\n' +
          '          address\n' +
          '          data\n' +
          '          topics\n' +
          '        }\n' +
          '        TxHash\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '}'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetTransaction).toHaveProperty('hash')
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 10000)

  it('should get vcp by height', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          ' {\n' +
          '  ThetaRpc {\n' +
          '    GetVcpByHeight(height: ' +
          latestBlockHeight +
          ') {\n' +
          '      BlockHashVcpPairs {\n' +
          '        BlockHash\n' +
          '        HeightList {\n' +
          '          Heights\n' +
          '        }\n' +
          '        Vcp {\n' +
          '          BlockHash\n' +
          '          SortedCandidates {\n' +
          '            Holder\n' +
          '            Stakes {\n' +
          '              amount\n' +
          '              return_height\n' +
          '              source\n' +
          '              withdrawn\n' +
          '            }\n' +
          '          }\n' +
          '        }\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '}'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetVcpByHeight).toHaveProperty('BlockHashVcpPairs')
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 20000)

  it('should get gcp by height', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          '{\n' +
          '  ThetaRpc {\n' +
          '    GetGcpByHeight(height: ' +
          latestBlockHeight +
          ') {\n' +
          '      BlockHashGcpPairs {\n' +
          '        BlockHash\n' +
          '        Gcp {\n' +
          '          SortedGuardians {\n' +
          '            Holder\n' +
          '            Stakes {\n' +
          '              amount\n' +
          '              return_height\n' +
          '              source\n' +
          '              withdrawn\n' +
          '            }\n' +
          '          }\n' +
          '        }\n' +
          '        HeightList {\n' +
          '          Heights\n' +
          '        }\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '}\n'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetGcpByHeight).toHaveProperty('BlockHashGcpPairs')
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 20000)

  it('should get eenp by height', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          ' {\n' +
          '  ThetaRpc {\n' +
          '    GetEenpByHeight(height: ' +
          latestBlockHeight +
          ') {\n' +
          '      BlockHashEenpPairs {\n' +
          '        BlockHash\n' +
          '        EENs {\n' +
          '          Holder\n' +
          '          Stakes {\n' +
          '            amount\n' +
          '            return_height\n' +
          '            source\n' +
          '            withdrawn\n' +
          '          }\n' +
          '        }\n' +
          '        HeightList {\n' +
          '          Heights\n' +
          '        }\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '}'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetEenpByHeight).toHaveProperty('BlockHashEenpPairs')
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 60000)

  it('should get pending transactions', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          ' {\n' +
          '  ThetaRpc {\n' +
          '    GetPendingTransactions {\n' +
          '      tx_hashes\n' +
          '    }\n' +
          '  }\n' +
          '}'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetPendingTransactions).toHaveProperty('tx_hashes')
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 60000)

  it('should get stake reward distribution by height', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          ' {\n' +
          '  ThetaRpc {\n' +
          '    GetStakeRewardDistributionByHeight(height: ' +
          latestBlockHeight +
          ') {\n' +
          '      BlockHashStakeRewardDistributionRuleSetPairs {\n' +
          '        BlockHash\n' +
          '        StakeRewardDistributionRuleSet {\n' +
          '          Beneficiary\n' +
          '          StakeHolder\n' +
          '          SplitBasisPoint\n' +
          '        }\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '}'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ThetaRpc.GetStakeRewardDistributionByHeight).toHaveProperty(
          'BlockHashStakeRewardDistributionRuleSetPairs'
        )
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 60000)

  afterAll(async () => {
    await app.close()
    // await new Promise((resolve) => setTimeout(() => resolve(0), 500)) // avoid jest open handle error
    // done().catch(() => {})
  })
})
