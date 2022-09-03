<script setup>
defineProps({
  to: String,
  name: String,
});
</script>

<template>
  <NuxtLink :to="to">
    <li class="font-bold text-lg text-white py-2">{{ name }}</li>
  </NuxtLink>
</template>
