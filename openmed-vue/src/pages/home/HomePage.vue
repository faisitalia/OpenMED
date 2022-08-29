<script setup lang="ts">
import { useUser } from "@/composables/useUser";
import { storeToRefs } from "pinia";

import H1Title from "@/components/H1Title.vue";
import SubTitle from "@/components/SubTitle.vue";
import DashboardTile from "@/components/Dashboard/DashboardTile.vue";
import DashboardAppointments from "@/components/Dashboard/DashboardAppointments.vue";

const { fullName } = storeToRefs(useUser());

const roles = ["doctor", "admin"];

const isDoctor = roles.includes("doctor");
const isPatient = roles.includes("user");
const isAdmin = roles.includes("admin");
</script>

<template>
  <div
    class="mx-4 my-4 sm:my-16 lg:gap-x-10 lg:grid lg:place-items-start lg:grid-cols-[auto_auto]"
  >
    <div
      id="hello-user"
      class="col-start-1 row-start-1 row-span-full place-self-start"
    >
      <H1Title>Ciao {{ fullName }},</H1Title>
      <SubTitle>come desideri procedere?</SubTitle>
      <!-- Main content -->
      <div
        id="actions"
        class="col-start-1 row-start-3 flex flex-col justify-center items-start"
      >
        <DashboardTile
          v-if="isAdmin"
          title="Gestisci Utenti"
          subtitle="Crea, modifica ed elimina i profili utenti"
          href="/users"
        />
        <DashboardTile
          v-if="isDoctor"
          title="Crea Appuntamento"
          subtitle="Crea e gestisci nuovi appuntamenti"
          href="/appointments/edit"
        />
        <DashboardTile
          v-if="isPatient || isDoctor"
          title="Lista Appuntamenti"
          subtitle="Visualizza i tuoi appuntamenti"
          href="/appointments"
        />
        <DashboardTile
          v-if="isPatient && !isDoctor"
          title="Cartella Clinica"
          subtitle="Consulta la tua cartella clinica"
          href="/"
        />

        <img
          src="@/assets/img/doctors.svg"
          alt="Un gruppo di dottori ti aspetta"
          class="sm:hidden self-center my-16"
        />
      </div>
    </div>

    <!-- Prossimi appuntamenti -->
    <div class="col-start-2 row-span-full hidden lg:block">
      <h3 class="mt-4 mb-8 text-center">PROSSIMI APPUNTAMENTI</h3>
      <DashboardAppointments
        title="Marco Rossi"
        day="24 Gennaio"
        hours="11.30 / 12.30"
      >
        <template v-slot:content>
          <div class="grid grid-cols-3">
            <div>
              <div class="font-bold">Data</div>
              <div>30 Gennaio</div>
            </div>
            <div>
              <div class="font-bold">Orario</div>
              <div>11.30 - 12.30</div>
            </div>
            <div>
              <div class="font-bold">Visita</div>
              <div>Stomaterapia</div>
            </div>
            <div>
              <div class="font-bold">Paziente</div>
              <div>Mario Rossi</div>
            </div>
            <div>
              <div class="font-bold">Medico</div>
              <div>F. Lombardo</div>
            </div>
          </div>
        </template>
        <template v-slot:trailing>
          <div
            @click.stop="() => null"
            class="flex flex-col items-stretch cursor-default"
          >
            apri
          </div>
        </template>
      </DashboardAppointments>
    </div>
  </div>
</template>
