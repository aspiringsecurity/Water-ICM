import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { SmartContractAnalyseService } from 'src/block-chain/smart-contract/smart-contract-analyse.service'
import { SmartContractModule } from 'src/block-chain/smart-contract/smart-contract.module'
import { writeSucessExcuteLog } from 'src/common/utils.service'
import { config } from 'src/const'

async function bootstrap() {
  try {
    while (1) {
      const app = await NestFactory.createApplicationContext(AppModule)
      const service = app
        .select(SmartContractModule)
        .get(SmartContractAnalyseService, { strict: true })

      await Promise.race([
        service.analyse(),
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('timeout')
            console.log('analyse race timeout')
            // this.logger.debug('timeout')
          }, 1000 * 60 * 5)
        })
      ])
      await new Promise((resolve) =>
        setTimeout(resolve, config.get('SMART_CONTRACT.ANALYSE_INTERVAL'))
      )
      app.close()
    }
  } catch (e) {
    console.log(e)
    writeSucessExcuteLog(config.get('SMART_CONTRACT.MONITOR_PATH'))
    process.exit()
  }
}
bootstrap()
