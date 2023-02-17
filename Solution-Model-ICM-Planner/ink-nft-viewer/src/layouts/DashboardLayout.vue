<template>
  <div id="app--main" class="tw-h-screen tw-flex tw-overflow-hidden">
    <div class="tw-flex tw-flex-col tw-w-0 tw-flex-1 tw-overflow-y-auto lg:tw-overflow-hidden">
      <portal-header />
      <main
        id="assets-top"
        class="
          tw-flex-1 tw-relative tw-z-0
          lg:tw-py-12 lg:tw-overflow-y-auto
          tw-overflow-x-hidden
          focus:tw-outline-none
        "
      >
        <div class="wrapper--components">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGasPrice } from 'src/hooks';
import PortalHeader from 'src/components/header/Header.vue';

export default defineComponent({
  components: {
    PortalHeader,
  },
  setup() {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');

    const isFetchGas = true;
    useGasPrice(isFetchGas);

    return {};
  },
});
</script>

<style lang="scss" scoped>
.wrapper--components {
  padding: 0 16px;
  @media (min-width: $lg) {
    padding: 0 40px;
  }
}
</style>
