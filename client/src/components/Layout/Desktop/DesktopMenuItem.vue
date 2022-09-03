<script setup lang="ts">
defineProps({
  name: String,
  to: {
    required: true,
    type: String,
  },
});
</script>

<template>
  <RouterLink :to="to">
    <li class="font-bold text-lg text-white py-2">{{ name }}</li>
  </RouterLink>
</template>
