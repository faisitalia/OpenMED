<script setup>
// Old SvelteKit code:
// import { usersEndpoint } from '$lib/uri';
// async function load({ session }) {
//     // If the user is logged in already, let this component know
//     return {
//       props: {
//         userId: session?.id
//       }
//     };
//   }
// //   export let userId;

// TODO implement here auth check logic
// const props = defineProps({
//   userId: "",
// });
useHead({
  titleTemplate: (title) => `OpenMed - ${title}`,
});
</script>

<template>
  <slot />
</template>
