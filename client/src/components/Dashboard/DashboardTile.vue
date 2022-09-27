<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  href: {
    required: true,
    type: String,
  },
});
</script>

<template>
  <RouterLink :to="href">
    <!-- TODO this is a grid layout so that we can add a navigate_next material icon -->
    <div
      class="grid grid-cols-[14rem_2rem] sm:grid-cols-[18rem_3rem] lg:grid-cols-[18rem_2rem] gap-y-3 gap-x-9 sm:gap-x-12 md:gap-x-16 lg:gap-x-12 rounded-3xl my-3 py-4 px-4 hover:bg-brandBlue-50/50 bg-brandBlue-50/40 cursor-pointer"
    >
      <h3 class="self-start place-self-start">
        {{ title }}
      </h3>
      <span class="material-icons-round self-center place-self-end row-span-2">
        navigate_next
      </span>
      <p class="self-start place-self-start text-sm">{{ subtitle }}</p>
    </div>
  </RouterLink>
</template>
