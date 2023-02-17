<template>
  <div>
    <assets id="assets-top" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Assets from 'src/components/assets/Assets.vue';

export default defineComponent({
  components: { Assets },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
#assets-top {
  @media (min-width: $lg) {
    margin-top: 50px;
  }
}
</style>
