import { writeFailExcuteLog } from 'src/common/utils.service'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { StakeAnalyseService } from 'src/block-chain/stake/stake-analyse.service'
import { StakeModule } from 'src/block-chain/stake/stake.module'
import { config } from 'src/const'
async function bootstrap() {
  try {
    while (1) {
      const app = await NestFactory.createApplicationContext(AppModule)
      const service = app.select(StakeModule).get(StakeAnalyseService, { strict: true })
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
      await new Promise((resolve) => setTimeout(resolve, config.get('STAKE.ANALYSE_INTERVAL')))
      app.close()
    }
  } catch (e) {
    writeFailExcuteLog(config.get('STAKE.MONITOR_PATH'))
    console.log(e)
    process.exit()
  }
}
bootstrap()
