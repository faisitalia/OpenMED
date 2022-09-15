<script setup lang="ts">
import { ref } from "vue";

import MobileMenu from "@/components/Layout/Mobile/MobileMenu.vue";
import DesktopMenu from "@/components/Layout/Desktop/DesktopMenu.vue";

const isDrawerOpen = ref(false);
const toggle = () => (isDrawerOpen.value = !isDrawerOpen.value);
</script>

<template>
  <!-- Mobile Menu, open iff we clicked on the drawer button -->
  <MobileMenu :isOpen="isDrawerOpen" @toggle="toggle" />

  <div class="grid grid-flow-col md:grid-cols-[auto_1fr]">
    <DesktopMenu />

    <div class="relative min-h-screen flex flex-col">
      <header
        class="sm:hidden p-6 flex flex-row justify-between md:justify-end items-center"
      >
        <!-- Drawer Button + Small Logo -->
        <div>
          <!-- OpenMed's small logo -->
          <RouterLink to="/">
            <img
              src="@/assets/img/logo-openmed/openmed-logo.svg"
              alt="Il logo di openmed."
            />
          </RouterLink>
        </div>

        <!-- Drawer Button -->
        <div
          class="flex sm:hidden rounded-lg hover:bg-brandBlue-50/20 justify-center items-center"
        >
          <button
            class="p-4 material-icons-round focus:outline-none text-brandGreen-500"
            @click.prevent="isDrawerOpen = !isDrawerOpen"
          >
            menu
          </button>
        </div>
      </header>

      <main
        class="transition-all md:blur-none"
        :class="isDrawerOpen ? 'blur-sm' : 'blur-none'"
      >
        <slot />
      </main>

      <footer />
    </div>
  </div>

  <!-- TODO: add static footer -->
</template>
