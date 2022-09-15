<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import MobileMenuItem from "@/components/Layout/Mobile/MobileMenuItem.vue";
import { useUser } from "@/composables/useUser";
import { useAuth } from "@/composables/useAuth";

defineProps({ isOpen: Boolean });
const emit = defineEmits(["toggle"]);

const { logout } = useAuth();
const { isDoctor, isPatient, isAdmin } = storeToRefs(useUser());
const { replace } = useRouter();

async function exit() {
  await logout();
  replace("/login");
  emit("toggle");
}
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
        <li @click="exit" class="font-light py-2 my-8">
          <button>Esci</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
