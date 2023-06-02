import { writeFailExcuteLog } from 'src/common/utils.service'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { NftAnalyseService } from 'src/block-chain/smart-contract/nft/nft-analyse.service'
import { NftModule } from 'src/block-chain/smart-contract/nft/nft.module'
import { config } from 'src/const'

export async function analyseNftBootstrap() {
  let i = 0
  try {
    while (1) {
      const app = await NestFactory.createApplicationContext(AppModule)
      const service = app.select(NftModule).get(NftAnalyseService, { strict: true })
      // console.log(a)
      // const a = {}
      // console.log(a['b']['c'])
      // await Promise.race([
      await service.analyse(i)
      //   new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       resolve('timeout')
      //       console.log('analyse race timeout')
      //       // this.logger.debug('timeout')
      //     }, 1000 * 60 * 20)
      //   })
      // ])
      await new Promise((resolve) => setTimeout(resolve, config.get('NFT.ANALYSE_INTERVAL')))
      app.close()
      i++
    }
  } catch (e) {
    console.log('analyse-nft catch error')
    console.log(e)
    writeFailExcuteLog(config.get('NFT.MONITOR_PATH'))
    process.exit()
  }
}
// bootstrap()
