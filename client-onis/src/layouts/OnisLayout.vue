<script setup lang="ts">
import { ref } from "vue";

import MobileMenu from "@/components/Layout/Mobile/MobileMenu.vue";
import DesktopMenu from "@/components/Layout/Desktop/DesktopMenu.vue";

const isDrawerOpen = ref(false);
const toggle = () => (isDrawerOpen.value = !isDrawerOpen.value);
</script>

<template>
  <div class="bg-primary flex flex-col justify-start">
    <MobileMenu @toggle="toggle" />
    <DesktopMenu />

    <div class="p-12 relative min-h-screen flex flex-col">
      <main
        class="transition-all md:blur-none"
        :class="isDrawerOpen ? 'blur-sm' : 'blur-none'"
      >
        <slot />
      </main>
    </div>

    <!-- TODO: add static footer -->
    <footer />
  </div>
</template>
