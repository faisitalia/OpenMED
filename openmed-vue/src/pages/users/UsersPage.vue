<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import H1Title from "../../components/H1Title.vue";
import SubTitle from "../../components/SubTitle.vue";
import UsersFilterButton from "../../components/Users/UsersFilterButton.vue";
import StyledButton from "../../components/StyledButton.vue";
import DeleteButton from "../../components/DeleteButton.vue";
import DetailedTile from "../../components/DetailedTile.vue";

const props = defineProps({
  users: { default: [] },
  userId: Number,
});

const { replace } = useRouter();
useHead({ title: `Gestione utenti` });
// // TODO import GET users endpoint(s)
// async function load({ session, fetch }) {
//   // if (!session?.id) {
//   //   return {
//   //     status: 302,
//   //     redirect: '/login'
//   //   };
//   // }

//   // 1. Get Users
//   // TODO
//   const usersList = [
//     {
//       name: "Luca",
//       surname: "Ward",
//       email: "wardi@gmail.com",
//       role: "Medic",
//       phone: "3479889880",
//       city: "Roma",
//     },
//     {
//       name: "Mario",
//       surname: "Galli",
//       email: "magal@hotmail.com",
//       role: "Medic",
//       phone: "3480098871",
//       city: "Frosinone",
//     },
//     {
//       name: "Alma",
//       surname: "Bortoli",
//       email: "almoli@mabort.it",
//       role: "User",
//       phone: "3599876543",
//       city: "Roma",
//     },
//     {
//       name: "Fabrizio",
//       surname: "Lombardo",
//       email: "info@fabriziolombardo.it",
//       role: "Medic",
//       phone: "3409321231",
//       city: "Latina",
//     },
//     {
//       name: "Agata",
//       surname: "Verdi",
//       email: "verdi@agatav.it",
//       role: "Medic",
//       phone: "33309091214",
//       city: "Civitavecchia",
//     },
//     {
//       name: "Valerio",
//       surname: "Rummo",
//       email: "rummova@hotmail.com",
//       role: "Medic",
//       phone: "3483483488",
//       city: "Roma",
//     },
//     {
//       name: "Mario",
//       surname: "Rossi",
//       email: "mario@rossi.com",
//       role: "User",
//       phone: "3473473477",
//       city: "Roma",
//     },
//   ];

//   return {
//     props: {
//       users: usersList,
//       // doctorId: session.id
//       userId: 1234,
//     },
//   };
// }

const filter = ref("all");
const search = ref("");
// TODO tipizzare correttamente gli utenti una volta ricevute le API dal backend
const filteredList = computed(
  () =>
    props.users
      .filter((user) => {
        const u = user as any;
        if (filter.value === "all") return true;
        return u.role === filter.value;
      })
      .filter((user) => {
        const u = user as any;
        if (search.value === "") return true;
        // TODO improve this search with regex
        return u.name.toLowerCase().includes(search.value.toLowerCase());
      }) as any
);
</script>

<template>
  <div class="">
    <div
      class="mx-4 my-4 sm:my-16 lg:gap-x-10 lg:grid lg:place-items-start lg:justify-items-center lg:grid-cols-[auto_auto]"
    >
      <div id="user-list">
        <H1Title>Gestione Utenti</H1Title>
        <SubTitle>Lista Utenti</SubTitle>
        <div
          id="search"
          class="mt-16 mb-4 self-end col-start-1 row-start-1 px-4 py-2 flex flex-row items-center w-full md:w-96 bg-brandBlue-50/50 rounded-full text-center"
        >
          <span class="material-icons-round"> search </span>
          <input
            id="search-input"
            class="focus:bg-white/30 rounded-xl px-4 bg-transparent focus:outline-none"
            type="text"
            placeholder="Cerca utente"
            v-model="search"
          />
        </div>
        <div id="filters" class="my-1 col-start-1 row-start-2 w-full">
          <div class="w-full flex flex-wrap flex-row justify-evenly">
            <!-- TODO implement on:click events -->
            <UsersFilterButton>Medici</UsersFilterButton>
            <UsersFilterButton>Infermieri</UsersFilterButton>
            <UsersFilterButton>Pazienti</UsersFilterButton>
          </div>
        </div>
        <div
          id="users-table"
          class="my-4 col-start-1 row-start-3 place-self-stretch md:pr-40"
        >
          <DetailedTile
            v-for="user in filteredList"
            :key="user.id"
            :title="`${user.name} ${user.surname}`"
            :subtitle="user.email"
            class="rounded-3xl my-1 px-4 py-1"
          >
            <template #content>
              <div class="gap-x-6 gap-y-2 grid grid-cols-[auto_auto]">
                <div class="col-span-1">
                  <p class="font-bold">Email</p>
                  <p>{{ user.email }}</p>
                </div>
                <div class="col-span-1">
                  <p class="font-bold">Ruolo</p>
                  <p>{{ user.role }}</p>
                </div>
                <div class="col-span-1">
                  <p class="font-bold">Telefono:</p>
                  <p>{{ user.phone }}</p>
                </div>
                <div class="col-span-1">
                  <p class="font-bold">Città:</p>
                  <p>{{ user.city }}</p>
                </div>
              </div>
            </template>

            <template #trailing>
              <div
                @click.stop
                class="flex flex-col items-center cursor-default"
              >
                <StyledButton @click="replace(`/users/edit?id=${user.id}`)">
                  Modifica
                </StyledButton>

                <DeleteButton @delete="null">Elimina</DeleteButton>
              </div>
            </template>
          </DetailedTile>
          <h3 v-if="!filteredList">Nessun utente trovato.</h3>
        </div>
      </div>

      <!-- Crea nuovo utente-->
      <div class="col-start-2 hidden lg:flex lg:flex-col">
        <h3 class="mt-4 mb-8 text-center">NUOVO UTENTE?</h3>
        <StyledButton class="font-bold" @click="replace('/users/edit')">
          Crea Nuovo
        </StyledButton>
        <div class="my-20" />
        <!-- TODO -->
        <h3 class="mt-4 mb-8 text-center">SERVE AIUTO?</h3>
        <StyledButton class="font-bold" @click="null">Clicca qui</StyledButton>
      </div>
    </div>
  </div>
</template>
