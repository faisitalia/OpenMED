<script setup lang="ts">
import { useHead } from "@vueuse/head";
import OpenmedLayout from "../../layouts/OpenmedLayout.vue";

useHead({ title: `Tutto fatto!` });
</script>

<template>
  <OpenmedLayout>
    <div
      class="flex flex-col justify-center items-center rounded-3xl bg-brandBlue-50/40 mx-4 p-10 my-36"
    >
      <h1 class="font-bold text-center">
        Appuntamento registrato correttamente
      </h1>
      <p class="my-2 text-center">Continua la navigazione</p>
      <div class="my-7" />
      <RouterLink
        to="/"
        class="bg-brandBlue-500 text-white text-center px-3 py-2 rounded-3xl font-bold"
      >
        Torna in Home
      </RouterLink>
      <!-- <div on:click={() => goto('/appointments/edit')}>Crea Nuovo Appuntamento</div> -->

      <!-- Aggiungere il + in fondo a dx -->
    </div>
    <div class="fixed -bottom-20 right-0 mx-4">
      <div class="my-3 group flex flex-row justify-end items-center">
        <p
          class="font-bold group-hover:inline-block hidden px-3 mx-2 py-2 text-right bg-brandBlue-50/50 rounded-xl"
        >
          Altro appuntamento
        </p>
        <RouterLink
          to="/appointments/edit"
          class="p-2 text-4xl material-icons-round rounded-full bg-brandBlue-500 font-bold text-white"
        >
          add
        </RouterLink>
      </div>
      <div class="my-3 group flex flex-row justify-end items-center">
        <p
          class="font-bold group-hover:inline-block hidden px-3 mx-2 py-2 text-right bg-brandBlue-50/50 rounded-xl"
        >
          Torna indietro e modifica
        </p>
        <RouterLink
          to="/appointments/edit"
          class="p-2 text-4xl material-icons-round rounded-full bg-brandBlue-500 font-bold text-white"
        >
          edit
        </RouterLink>
      </div>
      <div class="my-3 group flex flex-row justify-end items-center">
        <p
          class="font-bold group-hover:inline-block hidden px-3 mx-2 py-2 text-right bg-brandBlue-50/50 rounded-xl"
        >
          Annulla appuntamento
        </p>
        <!-- TODO change this so that an appointments get deleted after a confirmation message -->
        <RouterLink
          to=""
          class="p-2 text-4xl material-icons-round rounded-full bg-brandBlue-500 font-bold text-white"
        >
          delete_forever
        </RouterLink>
      </div>
    </div>
  </OpenmedLayout>
</template>
