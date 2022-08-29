<script setup lang="ts">
defineProps({
  to: String,
  name: String,
});
</script>

<template>
  <NuxtLink :to="to">
    <li class="font-light py-2">{{ name }}</li>
  </NuxtLink>
</template>
