<script setup lang="ts">
import MobileMenuItem from "@/components/Layout/Mobile/MobileMenuItem.vue";
import { ref } from "vue";

const emit = defineEmits(["toggle"]);

const isOpen = ref(false);

function toggleDrawer() {
  isOpen.value = !isOpen.value;
  emit("toggle");
}
</script>

<template>
  <header class="flex flex-row items-center md:hidden transition-all">
    <!-- mettere qui logo e mobile menu -->
    <img src="@/assets/img/logo-onis/ONIS-provv-01.png" alt="onis's logo" />
    <div class="flex-grow" />
    <button
      class="p-4 material-icons-round focus:outline-none text-brandGreen-500"
      @click.prevent="toggleDrawer"
    >
      menu
    </button>
    <div
      v-if="isOpen"
      class="fixed md:hidden bg-primary-light px-4 transition-all top-20 z-40 w-full"
    >
      <nav class="flex flex-col items-end">
        <ul class="flex flex-col items-end list-none">
          <MobileMenuItem to="/">Home</MobileMenuItem>
          <MobileMenuItem to="/project">Il Progetto</MobileMenuItem>
          <MobileMenuItem to="/surveys">Report</MobileMenuItem>
          <MobileMenuItem to="/account">
            <span class="material-icons-round pr-4">person</span>
            Account
          </MobileMenuItem>
        </ul>
      </nav>
    </div>
  </header>
</template>
