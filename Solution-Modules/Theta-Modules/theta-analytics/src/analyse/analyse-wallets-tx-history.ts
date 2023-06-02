import { WalletTxHistoryAnalyseService } from './../block-chain/wallet-tx-history/wallet-tx-history-analyse.service'
import { WalletTxHistoryModule } from './../block-chain/wallet-tx-history/wallet-tx-history.module'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { writeFailExcuteLog } from 'src/common/utils.service'
import { config } from 'src/const'
async function bootstrap() {
  try {
    while (1) {
      const app = await NestFactory.createApplicationContext(AppModule)
      const service = app
        .select(WalletTxHistoryModule)
        .get(WalletTxHistoryAnalyseService, { strict: true })
      await Promise.race([
        service.analyseData(),
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('timeout')
            console.log('analyse race timeout')
            // this.logger.debug('timeout')
          }, 1000 * 60 * 5)
        })
      ])
      // await service.analyseData()
      await new Promise((resolve) =>
        setTimeout(resolve, config.get('WALLET-TX-HISTORY.ANALYSE_INTERVAL'))
      )
      app.close()
      // await sleep(1000)
    }
  } catch (e) {
    console.log(e)
    writeFailExcuteLog(config.get('WALLET-TX-HISTORY.MONITOR_PATH'))
    process.exit()
  }
}
bootstrap()
