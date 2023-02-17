import { wait } from '@astar-network/astar-sdk-core';
import { $api } from 'src/boot/api';
import { LOCAL_STORAGE } from 'src/config/localStorage';
import {
  SubstrateWallets,
  SupportWallet,
  supportWalletObj,
  WalletModalOption,
} from 'src/config/wallets';
import { useAccount } from 'src/hooks';
import { castMobileSource, getSelectedAccount } from 'src/modules/wallet';
import { useExtensions } from 'src/hooks/useExtensions';
import { useMetaExtensions } from 'src/hooks/useMetaExtensions';
import { useStore } from 'src/store';
import { computed, onUnmounted, ref, watchEffect, watchPostEffect } from 'vue';
import { useRouter } from 'vue-router';

export const useConnectWallet = () => {
  const { SELECTED_ADDRESS } = LOCAL_STORAGE;

  const modalConnectWallet = ref<boolean>(false);
  const modalAccountSelect = ref<boolean>(false);
  const selectedWallet = ref<string>('');
  const modalName = ref<string>('');

  const store = useStore();
  const { currentAccount, currentAccountName, disconnectAccount } = useAccount();
  const router = useRouter();

  const currentRouter = computed(() => router.currentRoute.value.matched[0]);
  const currentNetworkStatus = computed(() => store.getters['general/networkStatus']);
  const isConnectedNetwork = computed(() => store.getters['general/networkStatus'] === 'connected');

  const selectedWalletSource = computed(() => {
    try {
      const accounts = store.getters['general/substrateAccounts'];
      const selectedAccount = getSelectedAccount(accounts);
      return selectedAccount ? selectedAccount.source : null;
    } catch (error) {
      return null;
    }
  });

  const setCloseModal = (): void => {
    modalName.value = '';
  };

  const openSelectModal = (): void => {
    modalName.value = WalletModalOption.SelectWallet;
    return;
  };

  // Memo: triggered after users (who haven't connected to wallet) have clicked 'Connect Wallet' button on dApp staking page
  const handleOpenSelectModal = (): void => {
    window.addEventListener(WalletModalOption.SelectWallet, openSelectModal);
  };

  const initializeWalletAccount = () => {
    const account = localStorage.getItem(SELECTED_ADDRESS);
    if (!account) {
      openSelectModal();
    } else {
      if (selectedWalletSource.value) {
        selectedWallet.value = selectedWalletSource.value;
      }
    }
  };

  const setWallet = (wallet: SupportWallet): void => {
    selectedWallet.value = wallet;
    modalName.value = wallet;
  };

  const requestExtensionsIfFirstAccess = (wallet: SupportWallet): void => {
    if (localStorage.getItem(SELECTED_ADDRESS) === null) {
      const { extensions } = useExtensions($api!!, store);
      const { metaExtensions, extensionCount } = useMetaExtensions($api!!, extensions)!!;
      watchPostEffect(async () => {
        store.commit('general/setMetaExtensions', metaExtensions.value);
        store.commit('general/setExtensionCount', extensionCount.value);
        const isSubstrateWallet = supportWalletObj.hasOwnProperty(wallet);
        // Memo: displays accounts menu for users who use the portal first time
        if (isSubstrateWallet) {
          setWallet(wallet);
        }
      });
    }
  };

  const setWalletModal = (wallet: SupportWallet): void => {
    requestExtensionsIfFirstAccess(wallet);
    store.commit('general/setCurrentWallet', wallet);

    setWallet(wallet);
  };

  const selectLoginWallet = async (): Promise<void> => {
    const lookupWallet = castMobileSource(modalName.value);
    if (SubstrateWallets.find((it) => it === lookupWallet)) {
      const wallets = Object.keys(window.injectedWeb3);
      const isInstalledExtension = wallets.find((it) => lookupWallet === it);

      if (!isInstalledExtension) {
        modalName.value = WalletModalOption.NoExtension;
        modalAccountSelect.value = false;
        return;
      }
      modalName.value = WalletModalOption.SelectSubstrateAccount;
      modalAccountSelect.value = true;
      return;
    }
  };

  const loginWithStoredAccount = async (): Promise<void> => {
    const address = localStorage.getItem(SELECTED_ADDRESS);
    const wallet = localStorage.getItem(LOCAL_STORAGE.SELECTED_WALLET);

    if (currentRouter.value === undefined || !address || !isConnectedNetwork.value) {
      return;
    }

    store.commit('general/setCurrentWallet', wallet);

    // Memo: wait for updating the chain id from the initial state 592 (to pass the `setupNetwork` function)
    const delay = 3000;
    await wait(delay);

    store.commit('general/setCurrentAddress', address);
  };

  const changeAccount = async (): Promise<void> => {
    modalAccountSelect.value = true;
  };

  watchEffect(() => {
    initializeWalletAccount();
  });

  watchEffect(handleOpenSelectModal);

  watchEffect(async () => {
    await selectLoginWallet();
  });

  watchEffect(async () => {
    await loginWithStoredAccount();
  });

  onUnmounted(() => {
    window.removeEventListener(WalletModalOption.SelectWallet, openSelectModal);
  });

  return {
    WalletModalOption,
    currentNetworkStatus,
    modalConnectWallet,
    currentAccount,
    currentAccountName,
    modalName,
    selectedWallet,
    modalAccountSelect,
    isConnectedNetwork,
    openSelectModal,
    setCloseModal,
    setWalletModal,
    disconnectAccount,
    changeAccount,
  };
};
