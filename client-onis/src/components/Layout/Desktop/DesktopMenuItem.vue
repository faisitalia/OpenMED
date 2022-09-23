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
  <RouterLink :to="to" class="flex items-center">
    <li class="mx-4 py-2 font-bold text-lg text-white flex items-center">
      <slot />
    </li>
  </RouterLink>
</template>
