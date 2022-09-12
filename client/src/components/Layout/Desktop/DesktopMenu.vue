<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import DesktopMenuItem from "./DesktopMenuItem.vue";
import { useUser } from "@/composables/useUser";
import { useAuth } from "@/composables/useAuth";

const { isDoctor, isPatient, isAdmin } = storeToRefs(useUser());
const { replace } = useRouter();
const { logout } = useAuth();

async function exit() {
  await logout();
  replace("/login");
}
</script>

<template>
  <header
    class="hidden sm:flex flex-col justify-start top-auto py-4 px-8 bg-brandBlue-500"
  >
    <!-- Desktop Nav Bar -->
    <img
      class="my-10"
      src="@/assets/img/logo-openmed/openmed-logo-white.svg"
      alt="Il logo di openmed."
    />
    <nav class="self-stretch">
      <ul class="flex flex-col items-start list-none">
        <DesktopMenuItem to="/" name="Home" />
        <DesktopMenuItem v-if="isAdmin" to="/users" name="Gestisci Utenti" />
        <DesktopMenuItem
          v-if="isDoctor"
          to="/appointments/edit"
          name="Crea Appuntamento"
        />
        <DesktopMenuItem
          v-if="isPatient || isDoctor"
          to="/appointments"
          name="Lista Appuntamenti"
        />
        <DesktopMenuItem to="/" name="Contatti" />
        <div class="my-8"></div>
        <li @click="exit" class="font-bold text-lg text-white py-2">
          <button>Esci</button>
        </li>
      </ul>
    </nav>

    <div class="flex-grow" />

    <!-- Doctor's image in desktop view mode only -->
    <img
      class="my-4 self-center"
      src="@/assets/img/doctors.svg"
      alt="A sketch of three doctors smile and look helpful"
    />
    <div class="flex-grow" />

    <!-- FAIS's logo in desktop view mode only -->
    <img
      class="my-4 min-w-[1rem] max-w-[7rem] self-center place-self-end"
      src="@/assets/img/logo-fais/logo-fais-white@2x.png"
      alt="FAIS logo"
    />
  </header>
</template>
