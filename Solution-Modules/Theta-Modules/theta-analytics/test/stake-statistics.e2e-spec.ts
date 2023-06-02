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
  it('should get the stake statistics', (done) => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          '{\n' +
          '  StakeStatistics {\n' +
          '    total_elite_edge_node_number\n' +
          '    total_guardian_node_number\n' +
          '    block_height\n' +
          '    effective_guardian_node_number\n' +
          '    effective_guardian_stake_amount\n' +
          '    effective_validator_node_number\n' +
          '    effective_validator_stake_amount\n' +
          // '    stakes(node_type: validator) {\n' +
          // '      holder\n' +
          // '      node_type\n' +
          // '      last_signature\n' +
          // '      stakes {\n' +
          // '        amount\n' +
          // '        return_height\n' +
          // '        source\n' +
          // '        withdrawn\n' +
          // '      }\n' +
          // '      update_height\n' +
          // '    }\n' +
          '    theta_fuel_stake_ratio\n' +
          '    theta_stake_ratio\n' +
          '    total_edge_node_stake_amount\n' +
          '    timestamp\n' +
          '    total_guardian_stake_amount\n' +
          '    total_validator_node_number\n' +
          '    total_validator_stake_amount\n' +
          '  }\n' +
          '}\n'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.StakeStatistics).toHaveProperty('total_elite_edge_node_number')
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
