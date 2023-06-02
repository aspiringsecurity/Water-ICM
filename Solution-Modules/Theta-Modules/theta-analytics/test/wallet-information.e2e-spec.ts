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
  it('should get wallet balance', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          ' {\n' +
          '  Wallet {\n' +
          '    Balance(wallet_address: "0xdc5a5c776b1ee57f16454094f0405ef7d7bdeb76") {\n' +
          '      stake_to_elite_node {\n' +
          '        amount\n' +
          '        fiat_currency_value {\n' +
          '          cny\n' +
          '          eur\n' +
          '          usd\n' +
          '        }\n' +
          '        node_address\n' +
          '        withdrawn\n' +
          '        return_height\n' +
          '      }\n' +
          '      stake_to_guardian {\n' +
          '        amount\n' +
          '        fiat_currency_value {\n' +
          '          cny\n' +
          '          eur\n' +
          '          usd\n' +
          '        }\n' +
          '        node_address\n' +
          '        return_height\n' +
          '        withdrawn\n' +
          '      }\n' +
          '      stake_to_validator_node {\n' +
          '        amount\n' +
          '        fiat_currency_value {\n' +
          '          cny\n' +
          '          usd\n' +
          '          eur\n' +
          '        }\n' +
          '        node_address\n' +
          '        return_height\n' +
          '        withdrawn\n' +
          '      }\n' +
          '      theta {\n' +
          '        amount\n' +
          '        fiat_currency_value {\n' +
          '          eur\n' +
          '          cny\n' +
          '          usd\n' +
          '        }\n' +
          '      }\n' +
          '      theta_fuel {\n' +
          '        fiat_currency_value {\n' +
          '          cny\n' +
          '          eur\n' +
          '          usd\n' +
          '        }\n' +
          '        amount\n' +
          '      }\n' +
          '      total {\n' +
          '        fiat_currency_value {\n' +
          '          cny\n' +
          '          eur\n' +
          '          usd\n' +
          '        }\n' +
          '        theta_amount\n' +
          '        theta_fuel_amount\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '}\n'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.Wallet.Balance).toHaveProperty('theta')
        // done()
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 120000)
  afterAll(async () => {
    await app.close()
    // await new Promise((resolve) => setTimeout(() => resolve(0), 500)) // avoid jest open handle error
    // done().catch(() => {})
  })
})
