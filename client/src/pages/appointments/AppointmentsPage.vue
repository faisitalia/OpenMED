<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { ref } from "vue";
import { useRouter } from "vue-router";
import StyledButton from "../../components/StyledButton.vue";
import DetailedTile from "../../components/DetailedTile.vue";
import OpenmedLayout from "../../layouts/OpenmedLayout.vue";

const { replace, push } = useRouter();
useHead({ title: `I tuoi appuntamenti` });

const visits = ref();

// async function load({ session, fetch }) {
//   // if(!session?.id) {
//   //   return {
//   //     status: 302,
//   //     redirect: "/login"
//   //   };
//   // }

//   // // Get the visits list
//   // const response = await fetch(
//   //     visitsEndpoint,
//   //     { credentials: 'include' }
//   //   );

//   // if(!response.ok) {
//   //   console.log("Lookout: something went wrong!");
//   //   console.log(response.status);
//   //   console.log(await response.json().errors);

//   //   // TODO redirect to an error page and not the home
//   //   return {
//   //     status: 302,
//   //     redirect: "/"
//   //   };
//   // }

//   // const visitsList = await response.json();
//   // if(visitsList.length === 0) {
//   //   console.log("warn: there are no appointments!");

//   //   // TODO redirect to an error page
//   // }

//   // console.log(visitsList);

//   const visitsList = [
//     {
//       date: "25/02/2022",
//       time: "18:00",
//       clinic: "San Raffaele di Milano",
//       doctor: {
//         name: "Francesco",
//         surname: "Vénir",
//         qualification: "Stomaterapista",
//       },
//       patient: {
//         name: "Ornella",
//         surname: "Calabrese",
//         ssn: "VNRLCU92S27D962A",
//       },
//       caregiver: {
//         name: "Douglas",
//         surname: "Calabrese",
//         relation: "Fratello",
//       },
//     },
//     {
//       date: "26/02/2022",
//       time: "17:00",
//       clinic: "San Raffaele di Milano",
//       doctor: {
//         name: "Giuseppe",
//         surname: "Pezzella",
//         qualification: "Stomaterapista",
//       },
//       patient: {
//         name: "Franco",
//         surname: "Beppe",
//         ssn: "VNRLCU92S27D962A",
//       },
//       caregiver: {
//         name: "Maria",
//         surname: "Santa",
//         relation: "Sorella",
//       },
//     },
//   ];

//   return {
//     props: {
//       visits: visitsList,
//       // 'userId': session.id,
//     },
//   };
// }
// function callStart(visit) {
//   // TODO
// }
</script>

<template>
  <OpenmedLayout>
    <div class="mx-4 my-4">
      <h1 class="font-bold my-2">Scegli il tuo appuntamento</h1>
      <p class="font-normal mb-8">Le visite programmate sono qui.</p>
      <div v-if="visits">
        <DetailedTile
          v-for="v in visits"
          title="Visita"
          :subtitle="`${v.date} h ${v.time}`"
          :key="v"
        >
          <template #content>
            <div class="py-3">
              <h3>Appuntamento</h3>
              <p>il {{ v.date }}</p>
              <p>h {{ v.time }}</p>
            </div>
            <div class="py-3">
              <h3>Ambulatorio</h3>
              <p>{{ v.clinic }}</p>
            </div>
            <div class="py-3">
              <h3>Medico</h3>
              <p>{{ v.doctor.name }} {{ v.doctor.surname }}</p>
              <p class="font-light text-brandText-400">
                {{ v.doctor.qualification }}
              </p>
            </div>
            <div class="py-3">
              <h3>Paziente</h3>
              <p>{{ v.patient.name }} {{ v.patient.surname }}</p>
              <p class="font-light">{{ v.patient.ssn }}</p>
            </div>
            <div class="py-3">
              <h3>Caregiver / Familiare</h3>
              <p>{{ v.caregiver.name }} {{ v.caregiver.surname }}</p>
              <p class="font-light text-brandText-400">
                {{ v.caregiver.relation }}
              </p>
            </div>
          </template>
          <template #trailing>
            <div
              @click.stop="() => null"
              class="flex flex-col items-stretch cursor-default"
            >
              <StyledButton @click="() => replace(`/call?id=${v.id}`)">
                <span class="material-icons-round align-middle pr-2">call</span>
                Inizio chiamata
              </StyledButton>
              <StyledButton
                colors="bg-brandBlue-50/20 hover:bg-brandBlue-50/40 text-center"
                @click="() => push(`/appointments/edit?id=${v.id}`)"
              >
                Modifica
              </StyledButton>
            </div>
          </template>
        </DetailedTile>
      </div>
      <p v-else>Non hai appuntamenti da poter mostrare qui.</p>
    </div>
  </OpenmedLayout>
</template>
