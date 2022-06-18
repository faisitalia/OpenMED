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
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
    },
  ],
});
const router = useRouter();
const emptyLayoutRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/call",
];
const useEmptyLayout = emptyLayoutRoutes.some((emptyLayoutRoute) =>
  router.currentRoute.value.path.startsWith(emptyLayoutRoute)
);
</script>

<template>
  <NuxtLayout v-if="useEmptyLayout" name="empty">
    <slot />
  </NuxtLayout>
  <NuxtLayout v-else name="layout">
    <slot />
  </NuxtLayout>
</template>
