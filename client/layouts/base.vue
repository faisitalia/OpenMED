<script setup>
useHead({
  titleTemplate: (title) => `OpenMed - ${title}`,
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
    },
  ],
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
