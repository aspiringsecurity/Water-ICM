export const DEFAULT_CONFIG = {
  ORM_CONFIG: {
    database: '../database/',
    synchronize: true,
    autoLoadEntities: true,
    name: 'THETA_DATA',
    type: 'better-sqlite3',
    entities: ['src/**/*.entity{.ts,.js}'],
    bigNumberStrings: false,
    logging: false,
    extra: {
      charset: 'utf8mb4_unicode_ci'
    }
  },
  //if download nft img to local path
  DL_NFT_IMG: false,
  START_HEIGHT: 17000000,
  THETA_NODE_HOST: 'https://theta-bridge-rpc.thetatoken.org/rpc',
  LOG_PATH: '/home/ubuntu/theta-data/logs/',
  ANALYSE_INTERVAL: 1000,
  ANALYSE_NUMBER: 1000,
  IGNORE: false,
  //whether retore origin nft img path
  RESTORE_NFT_IMG_PATH: false, //false,
  RATE_LIMIT: {
    ttl: 60,
    limit: 10
  },
  SMART_CONTRACT_VERIFY_DETECT_TIMES: 0,
  RE_SYNC_BALANCE: false,
  STAKE_ANALYSE_START_HEIGHT: 16403700,

  CONFLICT_TRANSACTIONS: [
    '0x4a9c74bf71ac6a3591672d67e975887ef8374ba34b45342305e656666d9cdcf1',
    '0x82236267393c31c17bf4e79fb14f9fc0396c05821ebd357e6b420a43933d64db'
  ],
  NFT: {
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 1000,
    DL_ALL_NFT_IMG: false,
    STATIC_PATH: '../static/',
    MONITOR_PATH: '../database/monitor/nft/'
  },
  SMART_CONTRACT: {
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 1000,
    THETA_NODE_HOST: 'https://theta-bridge-rpc.thetatoken.org/rpc',
    START_HEIGHT: 17000000,
    MONITOR_PATH: '../database/monitor/smart-contract/'
  },
  NFT_STATISTICS: {
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 17000000,
    STATIC_PATH: '../static/',
    MONITOR_PATH: '../database/monitor/nft-statistics/'
  },
  EXPLORER: {
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 1000,
    START_HEIGHT: 17000000,
    MONITOR_PATH: '../database/monitor/explorer/'
  },
  STAKE: {
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 1000,
    START_HEIGHT: 17000000,
    MONITOR_PATH: '../database/monitor/stake/'
  },
  TX: {
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 1000,
    START_HEIGHT: 17000000,
    MONITOR_PATH: '../database/monitor/tx/'
  },
  WALLET: {
    START_HEIGHT: 17000000,
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 1000,
    MONITOR_PATH: '../database/monitor/wallet/'
  },
  WALLET_TX_HISTORY: {
    START_HEIGHT: 17000000,
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 1000,
    MONITOR_PATH: '../database/monitor/wallet-tx-history/'
  },
  WALLET_SEND_HISTORY: {
    START_HEIGHT: 17000000,
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 1000,
    MONITOR_PATH: '../database/monitor/wallet-send-history/'
  },
  WALLET_DP_WD_HISTORY: {
    START_HEIGHT: 17000000,
    ANALYSE_NUMBER: 50,
    ANALYSE_INTERVAL: 1000,
    MONITOR_PATH: '../database/monitor/wallet-dp-wd-history/'
  }
}
const fs = require('fs')
const _ = require('lodash')
export const config = (function () {
  let config = DEFAULT_CONFIG
  const configFile = '.theta-data.' + process.env.NODE_ENV + '.json'
  const defaultConfigFile = '.theta-data.json'
  let fileToRead = ''
  if (fs.existsSync(defaultConfigFile)) {
    fileToRead = defaultConfigFile
    // config = _.merge(config, JSON.parse(fs.readFileSync(defaultConfigFile, 'utf8')))
  }
  if (fs.existsSync(configFile)) {
    fileToRead = configFile
    // config = _.merge(config, JSON.parse(fs.readFileSync(configFile, 'utf8')))
  }
  if (fileToRead) {
    config = _.merge(config, JSON.parse(fs.readFileSync(fileToRead, 'utf8')))
  }

  return {
    get: (str: string) => {
      return _.get(config, str)
    }
  }
})()
