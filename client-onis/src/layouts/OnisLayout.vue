<script setup lang="ts">
import { ref } from "vue";

import MobileMenu from "@/components/Layout/Mobile/MobileMenu.vue";
import DesktopMenu from "@/components/Layout/Desktop/DesktopMenu.vue";

const isDrawerOpen = ref(false);
const toggle = () => (isDrawerOpen.value = !isDrawerOpen.value);
</script>

<template>
  <div class="bg-primary flex flex-col justify-start min-h-screen">
    <MobileMenu @toggle="toggle" />
    <DesktopMenu />

    <div class="p-12 relative flex flex-col items-center">
      <main
        class="transition-all md:blur-none"
        :class="isDrawerOpen ? 'blur-sm' : 'blur-none'"
      >
        <slot />
      </main>
    </div>

    <div class="flex-grow" />

    <footer
      class="hidden md:grid grid-cols-3 place-items-center bg-secondary px-4 py-4"
    >
      <span class="mb-4 font-bold text">UN PROGETTO</span>
      <span class="mb-4 font-bold text">CONTATTACI</span>
      <span class="mb-4 font-bold text">SOCIAL</span>
      <div id="fais" class="flex flex-col items-center justify-start">
        <div class="flex-grow"></div>
        <img
          src="@/assets/img/logo-fais/Logo_FAIS_orizzontale_bianco.png"
          alt="Logo FAIS"
        />
      </div>
      <div id="contact" class="flex flex-col items-center justify-start">
        <div class="flex-grow"></div>
        <div class="flex flex-col items-center justify-center font-thin">
          <span>Tel. 800 09 50 06</span>
          <span>INFO@FAISITALIA.IT</span>
          <div class="mt-4 flex flex-col items-center">
            <span class="mb-1 font-bold text">FAIS OdV</span>
            <span> Via Giacomo Venezian, 1</span>
            <span> 20133 MILANO </span>
          </div>
        </div>
      </div>
      <div id="social" class="flex flex-col items-center justify-start">
        <div class="flex-grow"></div>
        <div class="flex items-center">
          <font-awesome-icon
            size="xl"
            icon="fa-brands fa-facebook"
            class="mx-3"
          />
          <font-awesome-icon
            size="xl"
            icon="fa-brands fa-twitter"
            class="mx-3"
          />
          <font-awesome-icon
            size="xl"
            icon="fa-brands fa-linkedin"
            class="mx-3"
          />
          <font-awesome-icon
            size="xl"
            icon="fa-brands fa-youtube"
            class="mx-3"
          />
        </div>
      </div>
    </footer>
  </div>
</template>
