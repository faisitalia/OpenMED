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
    <li class="font-light py-2">{{ name }}</li>
  </RouterLink>
</template>
