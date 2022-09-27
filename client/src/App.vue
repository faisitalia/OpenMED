<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useUser } from "@/composables/useUser";
import { useRouter } from "vue-router";

const { isAuthenticated } = storeToRefs(useAuth());
const { getUser, dropUser } = useUser();
const { replace } = useRouter();

watch(
  isAuthenticated,
  async (newVal) => {
    try {
      if (!newVal) throw "User disconnected";

      await getUser();
    } catch (err) {
      console.log(err);
      dropUser();
      replace("/login");
    }
  },
  { immediate: true }
);

// watch(
//   () => (isAuthenticated.value ? `Signin successful` : "Signout successful"),
//   (value) => {
//     console.log(value);

//     const goingTo = currentRoute.value.name?.toString() ?? "";
//     const redirectTo = redirect(goingTo);
//     if (redirectTo) replace(redirectTo);
//   }
// );

useHead({
  titleTemplate: (title) => `OpenMed - ${title}`,
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    },
  ],
});
</script>

<template>
  <div id="app">
    <Router-View />
  </div>
</template>
