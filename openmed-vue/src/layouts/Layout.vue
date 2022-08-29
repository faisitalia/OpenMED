<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { computed } from "vue";
import { RouterView, useRouter } from "vue-router";

import EmptyLayout from "./EmptyLayout.vue";

useHead({
  titleTemplate: (title) => `OpenMed - ${title}`,
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
    },
  ],
});

const { currentRoute } = useRouter();

const layout = computed(() => {
  const layout = currentRoute.value.meta.layout;
  console.log(layout);
  return layout || EmptyLayout;
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
