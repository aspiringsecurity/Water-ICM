import { WalletSendHistoryModule } from './../block-chain/wallet-tx-history/send/wallet-send-history.module'
import { WalletSendHistoryAnalyseService } from '../block-chain/wallet-tx-history/send/wallet-send-history-analyse.service'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { config } from 'src/const'

export async function analyseWalletSendHistoryBootstrap() {
  let i = 0
  // try {
  while (1) {
    const app = await NestFactory.createApplicationContext(AppModule)
    const service = app
      .select(WalletSendHistoryModule)
      .get(WalletSendHistoryAnalyseService, { strict: true })
    await service.analyse()
    await new Promise((resolve) =>
      setTimeout(resolve, config.get('WALLET_SEND_HISTORY.ANALYSE_INTERVAL'))
    )
    app.close()
    i++
  }
  // } catch (e) {
  //   console.log('analyse-nft catch error')
  //   console.log(e)
  //   writeFailExcuteLog(config.get('NFT.MONITOR_PATH'))
  //   process.exit()
  // }
}
// bootstrap()
