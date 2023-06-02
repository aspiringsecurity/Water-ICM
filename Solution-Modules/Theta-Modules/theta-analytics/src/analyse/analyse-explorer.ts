import { writeFailExcuteLog } from 'src/common/utils.service'
import { ExplorerAnalyseService } from './../block-chain/explorer/explorer-analyse.service'
import { ExplorerModule } from './../block-chain/explorer/explorer.module'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { config } from 'src/const'

async function bootstrap() {
  try {
    while (1) {
      const app = await NestFactory.createApplicationContext(AppModule)
      const service = app.select(ExplorerModule).get(ExplorerAnalyseService, { strict: true })
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
      await new Promise((resolve) => setTimeout(resolve, config.get('EXPLORER.ANALYSE_INTERVAL')))
      app.close()
    }
  } catch (e) {
    console.log(e)
    writeFailExcuteLog(config.get('EXPLORER.MONITOR_PATH'))
    process.exit()
  }
}
bootstrap()
