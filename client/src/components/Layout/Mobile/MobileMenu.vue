<script setup lang="ts">
import router from "@/router";
import { storeToRefs } from "pinia";

import MobileMenuItem from "@/components/Layout/Mobile/MobileMenuItem.vue";
import { useUser } from "@/composables/useUser";

defineProps({ isOpen: Boolean });
// const { logout } = useAuth();
// const { removeUser } = useUser();

async function logoutAndClearUser() {
  //   await logout();
  //   removeUser();
  router.replace({ path: "/ogin" });
}

const { isDoctor, isPatient, isAdmin } = storeToRefs(useUser());
</script>

<template>
  <header
    v-if="isOpen"
    class="p-10 fixed md:hidden items-center transition-all bg-white top-20 z-40 w-full"
  >
    <nav>
      <ul class="flex flex-col items-end list-none">
        <MobileMenuItem to="/" name="Home" />
        <MobileMenuItem v-if="isAdmin" to="/users" name="Gestisci Utenti" />
        <MobileMenuItem
          v-if="isDoctor"
          to="/appointments/edit"
          name="Crea Appuntamento"
        />
        <MobileMenuItem
          v-if="isPatient || isDoctor"
          to="/appointments"
          name="Lista Appuntamenti"
        />
        <MobileMenuItem to="/" name="Contatti" />
        <li @click="logoutAndClearUser" class="font-light py-2 my-8">
          <button>Esci</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
