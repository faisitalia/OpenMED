<script setup lang="ts">
import { markRaw, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

import EmptyLayout from "./layouts/EmptyLayout.vue";

useHead({
  titleTemplate: (title) => `ONIS - ${title}`,
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    },
  ],
});

const { currentRoute } = useRouter();
const layout = ref(markRaw(EmptyLayout));
watch(
  () => currentRoute.value.meta?.layout,
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
