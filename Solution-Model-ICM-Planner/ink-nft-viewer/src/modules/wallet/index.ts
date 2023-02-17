import { SubmittableExtrinsic } from '@polkadot/api/types';
import { web3Enable } from '@polkadot/extension-dapp';
import { ISubmittableResult } from '@polkadot/types/types';
import { ethers } from 'ethers';
import { LOCAL_STORAGE } from 'src/config/localStorage';
import { SupportWallet, supportWalletObj } from 'src/config/wallets';
import { SubstrateAccount } from 'src/store/general/state';

export const getInjectedExtensions = async (forceRequest = false): Promise<any[]> => {
  const selectedAddress = localStorage.getItem(LOCAL_STORAGE.SELECTED_ADDRESS);
  if (selectedAddress != null || forceRequest) {
    let extensions = await web3Enable('AstarNetwork/ink!redibleNFT');

    // const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    // Memo: Firefox takes some time to load the wallet extensions at the boot time.
    // Below code is for reference
    // if (isFirefox) {
    //   const injectedWeb3 = window.injectedWeb3;
    //   const numWalletExtensions = injectedWeb3 ? Object.values(window.injectedWeb3).length : 0;
    //   const maxRetry = 20;
    //   let numRetry = 0;
    //   while (extensions.length !== numWalletExtensions) {
    //     wait(400);
    //     extensions = await web3Enable('AstarNetwork/astar-apps');
    //     numRetry++;
    //     if (numRetry > maxRetry) {
    //       break;
    //     }
    //   }
    // }

    return extensions;
  }
  return [];
};

export const getSelectedAccount = (accounts: SubstrateAccount[]): SubstrateAccount | undefined => {
  try {
    const selectedAddress = localStorage.getItem(LOCAL_STORAGE.SELECTED_ADDRESS);
    const selectedWallet = localStorage.getItem(LOCAL_STORAGE.SELECTED_WALLET);

    const account = accounts.find(
      (it) => it.address === selectedAddress && it.source === selectedWallet
    );
    return account;
  } catch (error: any) {
    console.error(error.message);
    return undefined;
  }
};

export const getInjector = async (accounts: SubstrateAccount[]) => {
  const account = getSelectedAccount(accounts);
  const extensions = await getInjectedExtensions();
  const injector = extensions.find((it) => it.name === account?.source);
  return injector;
};

export const isMobileDevice =
  'ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/);

export const castMobileSource = (source: string): string => {
  if (isMobileDevice) {
    // Memo: source as 'polkadot-js' in mobile app
    const polkadotJsWallets = [SupportWallet.Math, SupportWallet.Nova];
    if (polkadotJsWallets.find((it) => it === source)) {
      return SupportWallet.PolkadotJs;
    }
  }
  return source;
};

export const checkIsWalletExtension = async (): Promise<boolean> => {
  const isSubstrateDappBrowser = !!(
    window.injectedWeb3 && JSON.stringify(window.injectedWeb3) !== '{}'
  );

  return Boolean(isSubstrateDappBrowser);
};

export const checkIsMobileMathWallet = async (): Promise<boolean> => {
  try {
    if (isMobileDevice) {
      const [wallet] = await getInjectedExtensions();
      const isMath = wallet.hasOwnProperty('isMathWallet');
      return isMath;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export type Transaction = SubmittableExtrinsic<'promise', ISubmittableResult>;

export const sign = async ({
  transaction,
  senderAddress,
  substrateAccounts,
  isCustomSignature,
  getCallFunc,
  tip,
}: {
  transaction: Transaction;
  senderAddress: string;
  substrateAccounts: SubstrateAccount[];
  isCustomSignature: boolean;
  getCallFunc: (call: Transaction) => Promise<Transaction>;
  tip?: string;
}): Promise<Transaction | undefined> => {
  if (isCustomSignature && getCallFunc) {
    const result = await getCallFunc(transaction);
    return result;
  } else {
    const injector = await getInjector(substrateAccounts);
    if (!injector) {
      throw Error('Invalid injector');
    }

    const result = await transaction.signAsync(senderAddress, {
      signer: injector.signer,
      nonce: -1,
      tip: tip ? ethers.utils.parseEther(String(tip)).toString() : '1',
    });

    return result;
  }
};

export const signAndSend = async ({
  transaction,
  senderAddress,
  substrateAccounts,
  isCustomSignature = false,
  txResHandler,
  handleCustomExtrinsic,
  finalizeCallback,
  tip,
}: {
  transaction: Transaction;
  senderAddress: string;
  substrateAccounts: SubstrateAccount[];
  isCustomSignature: boolean;
  txResHandler: (result: ISubmittableResult) => Promise<boolean>;
  handleCustomExtrinsic?: (method: Transaction) => Promise<void>;
  finalizeCallback?: () => void;
  tip?: string;
}): Promise<boolean> => {
  return new Promise<boolean>(async (resolve) => {
    const sendSubstrateTransaction = async (): Promise<void> => {
      const injector = await getInjector(substrateAccounts);
      if (!injector) {
        throw Error('Invalid injector');
      }
      await transaction.signAndSend(
        senderAddress,
        {
          signer: injector.signer,
          nonce: -1,
          tip: tip ? ethers.utils.parseEther(String(tip)).toString() : '1',
        },
        (result) => {
          (async () => {
            const res = await txResHandler(result);
            finalizeCallback && finalizeCallback();

            resolve(res);
          })();
        }
      );
    };

    try {
      if (isCustomSignature && handleCustomExtrinsic) {
        await handleCustomExtrinsic(transaction);
        finalizeCallback && finalizeCallback();
        resolve(true);
      } else {
        await sendSubstrateTransaction();
      }
    } catch (error: any) {
      console.error(error.message);
      resolve(false);
    }
  });
};

export const checkIsNativeWallet = (selectedWallet: SupportWallet): boolean => {
  return supportWalletObj.hasOwnProperty(selectedWallet);
};
