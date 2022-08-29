<script setup lang="ts">
import EmptyLayout from "./layouts/EmptyLayout.vue";

import { markRaw, ref, watch } from "vue";
import { useRoute } from "vue-router";

const layout = ref(markRaw(EmptyLayout));
const route = useRoute();

watch(
  () => route.meta?.layout,
  async (metaLayout) => {
    try {
      if (!metaLayout) return;
      if (typeof metaLayout != "string") return;

      const layoutComponent = await import(`./layouts/${metaLayout}.vue`);
      layout.value = markRaw(layoutComponent?.default || EmptyLayout);
    } catch (e) {
      layout.value = markRaw(EmptyLayout);
    }
  }
);
</script>

<template>
  <Component :is="layout">
    <Router-View />
  </Component>
</template>
