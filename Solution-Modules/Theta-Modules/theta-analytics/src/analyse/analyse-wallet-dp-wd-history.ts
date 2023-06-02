import { WalletDpWdHistoryModule } from './../block-chain/wallet-tx-history/deposit-withdraw/wallet-dp-wd-history.module'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { config } from 'src/const'
import { WalletDpWdHistoryAnalyseService } from 'src/block-chain/wallet-tx-history/deposit-withdraw/wallet-dp-wd-history-analyse.service'

export async function analyseWalletDpWdHistoryBootstrap() {
  let i = 0
  while (1) {
    const app = await NestFactory.createApplicationContext(AppModule)
    const service = app
      .select(WalletDpWdHistoryModule)
      .get(WalletDpWdHistoryAnalyseService, { strict: true })
    await service.analyse()
    await new Promise((resolve) =>
      setTimeout(resolve, config.get('WALLET_DP_WD_HISTORY.ANALYSE_INTERVAL'))
    )
    app.close()
    i++
  }
}
// bootstrap()
