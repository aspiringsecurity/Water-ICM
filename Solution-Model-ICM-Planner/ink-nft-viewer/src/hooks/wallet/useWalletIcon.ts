import { useAccount } from 'src/hooks';
import { supportWalletObj } from 'src/config/wallets';
import { useStore } from 'src/store';
import { computed, ref, watch, watchEffect, onUnmounted } from 'vue';
import { getSelectedAccount } from 'src/modules/wallet';
import { LOCAL_STORAGE } from 'src/config/localStorage';

export function useWalletIcon() {
  const iconWallet = ref<string>('');
  const store = useStore();
  const substrateAccounts = computed(() => store.getters['general/substrateAccounts']);
  const { currentAccount } = useAccount();

  const setIconWallet = () => {
    try {
      const account = getSelectedAccount(substrateAccounts.value);
      if (account) {
        // @ts-ignore
        iconWallet.value = supportWalletObj[account.source].img;
      }
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const handleSetIconWallet = (): void => {
    window.addEventListener(LOCAL_STORAGE.SELECTED_WALLET, setIconWallet);
  };

  watchEffect(handleSetIconWallet);

  watch(
    [currentAccount],
    () => {
      setIconWallet();
    },
    { immediate: true }
  );

  onUnmounted(() => {
    window.removeEventListener(LOCAL_STORAGE.SELECTED_WALLET, setIconWallet);
  });

  return {
    iconWallet,
  };
}
