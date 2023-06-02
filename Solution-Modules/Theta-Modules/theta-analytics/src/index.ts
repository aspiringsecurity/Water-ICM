import { analyseBootstrap } from 'src/analyse'
import { bootstrap } from 'src/serve'
import { analyseNftBootstrap } from './analyse/analyse-nft'
import { analyseWalletDpWdHistoryBootstrap } from './analyse/analyse-wallet-dp-wd-history'
import { analyseWalletSendHistoryBootstrap } from './analyse/analyse-wallet-send-history'
export const analyse = analyseBootstrap
export const serve = bootstrap
export const analyseNft = analyseNftBootstrap
export const analyseWalletSendHistory = analyseWalletSendHistoryBootstrap
export const analyseWalletDpWdHistory = analyseWalletDpWdHistoryBootstrap
