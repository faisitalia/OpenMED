<script setup lang="ts">
import { markRaw, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";

import EmptyLayout from "./layouts/EmptyLayout.vue";

const layout = ref(markRaw(EmptyLayout));
const route = useRoute();
useHead({
  titleTemplate: (title) => `OpenMed - ${title}`,
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
    },
  ],
});

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
