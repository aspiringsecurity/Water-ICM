import { GasPrice, SelectedGas, Speed } from '@astar-network/astar-sdk-core';
import { useNetworkInfo } from 'src/hooks';
import { useStore } from 'src/store';
import { container } from 'src/v2/common';
import { GasPriceChangedMessage, IEventAggregator, TipPriceChangedMessage } from 'src/v2/messaging';
import { Symbols } from 'src/v2/symbols';
import { computed, ref, watchEffect } from 'vue';

const initialGasPrice = {
  slow: '0',
  average: '0',
  fast: '0',
  baseFeePerGas: '0',
};

export const useGasPrice = (isFetch = false) => {
  const selectedGas = ref<SelectedGas>({ speed: 'average', price: '0' });
  const selectedTip = ref<SelectedGas>({ speed: 'average', price: '0' });
  const evmGasPrice = ref<GasPrice>(initialGasPrice);
  const nativeTipPrice = ref<GasPrice>(initialGasPrice);

  // Memo: Actual gas cost calculated by evmGasPrice and transaction data
  const evmGasCost = ref<GasPrice>(initialGasPrice);

  const store = useStore();
  const gas = computed(() => store.getters['general/getGas']);
  const { currentNetworkName, isMainnet } = useNetworkInfo();
  const network = computed<string>(() => {
    return isMainnet ? currentNetworkName.value.toLowerCase() : 'shibuya';
  });

  const setSelectedGas = (speed: Speed): void => {
    selectedGas.value = {
      speed,
      price: evmGasPrice.value[speed],
    };

    // Notify of gas price change.
    const eventAggregator = container.get<IEventAggregator>(Symbols.EventAggregator);
    eventAggregator.publish(new GasPriceChangedMessage(selectedGas.value));
  };

  const setSelectedTip = (speed: Speed): void => {
    selectedTip.value = {
      speed,
      price: nativeTipPrice.value[speed],
    };

    // Notify of tip price change.
    const eventAggregator = container.get<IEventAggregator>(Symbols.EventAggregator);
    eventAggregator.publish(new TipPriceChangedMessage(selectedTip.value));
  };

  const updateDefaultSelectedGasValue = (): void => {
    if (selectedGas.value.price === '0') {
      setSelectedGas('average');
    }
    if (selectedTip.value.price === '0') {
      setSelectedTip('average');
    }
  };

  const setGasPrice = (): void => {
    if (!network.value || !gas.value) return;
    evmGasPrice.value = gas.value.evmGasPrice;
    nativeTipPrice.value = gas.value.nativeTipPrice;
  };

  // const dispatchGasPrice = async (network: string): Promise<void> => {
  //   try {
  //     const result = await fetchEvmGasPrice({
  //       network,
  //       isEip1559: false,
  //       web3: $web3.value!,
  //     });
  //     store.commit('general/setGas', result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const isEnableSpeedConfiguration = computed<boolean>(() => {
    const currentWallet = store.getters['general/currentWallet'];
    return true;
    // currentWallet !== SupportWallet.TalismanEvm && currentWallet !== SupportWallet.SubWalletEvm
  });

  // watch(
  //   [network],
  //   async () => {
  //     if (isFetch && network.value && !gas.value ) {
  //       await dispatchGasPrice(network.value);
  //     }
  //   },
  //   { immediate: false }
  // );

  watchEffect(async () => {
    setGasPrice();
  });

  watchEffect(async () => {
    if (!network.value) return;
    updateDefaultSelectedGasValue();
  });

  return {
    evmGasPrice,
    selectedGas,
    setSelectedGas,
    evmGasCost,
    selectedTip,
    nativeTipPrice,
    setSelectedTip,
    isEnableSpeedConfiguration,
  };
};
