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
  it('should get the theta and theta fuel market information', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          '{' +
          '  MarketInformation {\n' +
          '    Theta {\n' +
          '      circulating_supply\n' +
          '      market_cap\n' +
          '      last_updated\n' +
          '      name\n' +
          '      price\n' +
          '      total_supply\n' +
          '      volume_24h\n' +
          '    }\n' +
          '    ThetaFuel {\n' +
          '      circulating_supply\n' +
          '      last_updated\n' +
          '      name\n' +
          '      market_cap\n' +
          '      price\n' +
          '      total_supply\n' +
          '      volume_24h\n' +
          '    }\n' +
          '  }\n' +
          '}'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.MarketInformation).toHaveProperty('Theta')
        expect(res.body.data.MarketInformation).toHaveProperty('ThetaFuel')
        // done()
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  })
  afterAll(async () => {
    await app.close()
    // await new Promise((resolve) => setTimeout(() => resolve(0), 500)) // avoid jest open handle error
    // done().catch(() => {})
  })
})
