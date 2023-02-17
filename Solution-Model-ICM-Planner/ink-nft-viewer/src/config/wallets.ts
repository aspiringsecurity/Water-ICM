import { objToArray } from '@astar-network/astar-sdk-core';

// Memo: enum value comes from:
//    const extensions = await getInjectedExtensions();
//    console.log('extensions', extensions); -> extensions[index] -> name
// Memo: Mobile wallets such as Math and Nova returns 'polkadot-js' as the wallet name

export enum SupportWallet {
  PolkadotJs = 'polkadot-js',
  Clover = 'clover',
  Math = 'mathwallet',
  Nova = 'nova',
  TalismanNative = 'talisman',
  SubWalletNative = 'subwallet-js',
  Metadot = 'metadot',
}

export const WalletModalOption = {
  SelectWallet: 'SelectWallet',
  SelectSubstrateAccount: 'SelectSubstrateAccount',
  NoExtension: 'NoExtension',
  OutdatedWallet: 'OutdatedWallet',
  PolkadotJs: SupportWallet.PolkadotJs,
  Clover: SupportWallet.Clover,
  Math: SupportWallet.Math,
  Nova: SupportWallet.Nova,
  TalismanNative: SupportWallet.TalismanNative,
  SubWallet: SupportWallet.SubWalletNative,
  Metadot: SupportWallet.Metadot,
};

export const SubstrateWallets = [
  SupportWallet.PolkadotJs,
  SupportWallet.Clover,
  SupportWallet.Math,
  SupportWallet.Nova,
  SupportWallet.TalismanNative,
  SupportWallet.SubWalletNative,
  SupportWallet.Metadot,
];

export interface Wallet {
  img: any;
  name: string;
  source: SupportWallet;
  walletUrl: string;
  guideUrl: string;
  isSupportBrowserExtension: boolean;
  isSupportMobileApp: boolean;
  // Memo: access to the wallet extension like `window['ethereum']`
  ethExtension?: string;
}

export const supportWalletObj = {
  [SupportWallet.PolkadotJs]: {
    img: require('/src/assets/img/logo-polkadot-js.png'),
    name: 'Polkadot.js',
    source: SupportWallet.PolkadotJs,
    walletUrl: 'https://polkadot.js.org/extension/',
    guideUrl: 'https://www.youtube.com/watch?v=r-fAy7Ta_vY',
    isSupportBrowserExtension: true,
    isSupportMobileApp: false,
  },
  [SupportWallet.TalismanNative]: {
    img: require('/src/assets/img/logo-talisman.svg'),
    name: 'Talisman (Native)',
    source: SupportWallet.TalismanNative,
    walletUrl: 'https://app.talisman.xyz/',
    guideUrl: 'https://app.talisman.xyz/',
    isSupportBrowserExtension: true,
    isSupportMobileApp: false,
  },
  [SupportWallet.SubWalletNative]: {
    img: require('/src/assets/img/logo-subwallet.svg'),
    name: 'SubWallet (Native)',
    source: SupportWallet.SubWalletNative,
    walletUrl: 'https://subwallet.app/download.html',
    guideUrl: 'https://docs.subwallet.app/user-guide/install-subwallet',
    isSupportBrowserExtension: true,
    isSupportMobileApp: true,
  },
  [SupportWallet.Clover]: {
    img: require('/src/assets/img/logo-clover.png'),
    name: 'Clover',
    source: SupportWallet.Clover,
    walletUrl: 'https://clover.finance/',
    guideUrl: 'https://docs.clover.finance/quick-start/about-clover',
    isSupportBrowserExtension: true,
    isSupportMobileApp: false,
  },
  [SupportWallet.Math]: {
    img: require('/src/assets/img/logo-mathwallet.png'),
    name: 'Math Wallet',
    source: SupportWallet.Math,
    walletUrl: 'https://mathwallet.org/en-us/',
    guideUrl: 'https://blog.mathwallet.org/?p=540',
    isSupportBrowserExtension: true,
    isSupportMobileApp: true,
  },
  [SupportWallet.Nova]: {
    img: require('/src/assets/img/logo-nova.png'),
    name: 'Nova Wallet',
    source: SupportWallet.Nova,
    walletUrl: 'https://novawallet.io/',
    guideUrl: 'https://novawallet.io/',
    isSupportBrowserExtension: false,
    isSupportMobileApp: true,
  },
  [SupportWallet.Metadot]: {
    img: require('/src/assets/img/logo-metadot.png'),
    name: 'Metadot',
    source: SupportWallet.Metadot,
    walletUrl: 'https://metadot.app/',
    guideUrl: 'https://docs.metadot.app/install-metadot-on-chrome-and-firefox',
    isSupportBrowserExtension: true,
    isSupportMobileApp: false,
  },
};

export const supportWallets = objToArray(supportWalletObj) as Wallet[];
