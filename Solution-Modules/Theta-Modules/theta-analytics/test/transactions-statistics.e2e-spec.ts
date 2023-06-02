import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'
const gql = '/graphql/'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    // done().catch(() => {})
  })
  it('should get the transactions statistics by date', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          '{\n' +
          '  TransactionsStatistics {\n' +
          '    ByDate {\n' +
          '      active_wallet\n' +
          '      block_number\n' +
          '      coin_base_transaction\n' +
          '      date\n' +
          '      deposit_stake_transaction\n' +
          '      latest_block_height\n' +
          '      month\n' +
          '      release_fund_transaction\n' +
          '      reserve_fund_transaction\n' +
          '      send_transaction\n' +
          '      service_payment_transaction\n' +
          '      slash_transaction\n' +
          '      smart_contract_transaction\n' +
          '      split_rule_transaction\n' +
          '      theta_fuel_burnt\n' +
          '      timestamp\n' +
          '      withdraw_stake_transaction\n' +
          '      year\n' +
          '    }\n' +
          '  }\n' +
          '}\n'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.TransactionsStatistics.ByDate[0]).toHaveProperty('active_wallet')
        // done()
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  })

  it('should get the transactions statistics by hour', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          '{\n' +
          '  TransactionsStatistics {\n' +
          '    ByHour {\n' +
          '      coin_base_transaction\n' +
          '      hour\n' +
          '      active_wallet\n' +
          '      block_number\n' +
          '      date\n' +
          '      deposit_stake_transaction\n' +
          '      latest_block_height\n' +
          '      month\n' +
          '      release_fund_transaction\n' +
          '      reserve_fund_transaction\n' +
          '      send_transaction\n' +
          '      service_payment_transaction\n' +
          '      slash_transaction\n' +
          '      smart_contract_transaction\n' +
          '      split_rule_transaction\n' +
          '      theta_fuel_burnt\n' +
          '      timestamp\n' +
          '      withdraw_stake_transaction\n' +
          '      year\n' +
          '    }\n' +
          '  }\n' +
          '}\n'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.TransactionsStatistics.ByHour[0]).toHaveProperty('active_wallet')
        // done()
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
