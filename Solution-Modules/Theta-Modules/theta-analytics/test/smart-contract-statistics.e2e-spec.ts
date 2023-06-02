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
  it('should get the smart contract statistics rank by call times', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          ' {SmartContractStatistics {\n' +
          '    CallRank(take: 10, rank_by: call_times) {\n' +
          '      call_times\n' +
          '      contract_address\n' +
          '      last_24h_call_times\n' +
          '      last_seven_days_call_times\n' +
          // '      record {\n' +
          // '        timestampg\n' +
          // '      }\n' +
          '    }\n' +
          '  }}'
      })
      .expect(200)
      .expect((res) => {
        console.log(res.body)
        expect(res.body.data.SmartContractStatistics).toHaveProperty('CallRank')
        // done()
      })
      .end(function (err, res) {
        if (err) return done(err)
        return done()
      })
  }, 120000)

  afterAll(async () => {
    await app.close()
  })
})
