<script setup lang="ts">
defineProps({
  to: {
    required: true,
    type: String,
  },
});
</script>

<template>
  <RouterLink :to="to" class="flex items-center">
    <li class="py-2 flex items-center"><slot /></li>
  </RouterLink>
</template>
