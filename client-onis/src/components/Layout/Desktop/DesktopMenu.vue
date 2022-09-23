<script setup lang="ts">
import DesktopMenuItem from "./DesktopMenuItem.vue";
</script>

<template>
  <header class="hidden md:block py-2">
    <nav class="flex flex-row items-center">
      <img src="@/assets/img/logo-onis/ONIS-provv-01.png" alt="onis's logo" />
      <div class="flex-grow" />
      <ul class="flex items-center list-none">
        <DesktopMenuItem to="/">Home</DesktopMenuItem>
        <DesktopMenuItem to="/project">Il Progetto</DesktopMenuItem>
        <DesktopMenuItem to="/surveys">Report</DesktopMenuItem>
        <DesktopMenuItem to="/account">
          <span class="material-icons-round">person</span>
        </DesktopMenuItem>
      </ul>
    </nav>
  </header>
</template>
