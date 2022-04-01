<script context="module">
  // TODO import GET users endpoint(s)
  export async function load({ session, fetch }) {
    // if (!session?.id) {
    //   return {
    //     status: 302,
    //     redirect: '/login'
    //   };
    // }

    // 1. Get Users
    // TODO
    const usersList = [
      {
        name: 'Luca',
        surname: 'Ward',
        email: 'wardi@gmail.com',
        role: 'Medic',
        phone: '3479889880',
        city: 'Roma'
      },
      {
        name: 'Mario',
        surname: 'Galli',
        email: 'magal@hotmail.com',
        role: 'Medic',
        phone: '3480098871',
        city: 'Frosinone'
      },
      {
        name: 'Alma',
        surname: 'Bortoli',
        email: 'almoli@mabort.it',
        role: 'User',
        phone: '3599876543',
        city: 'Roma'
      },
      {
        name: 'Fabrizio',
        surname: 'Lombardo',
        email: 'info@fabriziolombardo.it',
        role: 'Medic',
        phone: '3409321231',
        city: 'Latina'
      },
      {
        name: 'Agata',
        surname: 'Verdi',
        email: 'verdi@agatav.it',
        role: 'Medic',
        phone: '33309091214',
        city: 'Civitavecchia'
      },
      {
        name: 'Valerio',
        surname: 'Rummo',
        email: 'rummova@hotmail.com',
        role: 'Medic',
        phone: '3483483488',
        city: 'Roma'
      },
      {
        name: 'Mario',
        surname: 'Rossi',
        email: 'mario@rossi.com',
        role: 'User',
        phone: '3473473477',
        city: 'Roma'
      }
    ];

    return {
      props: {
        users: usersList,
        // doctorId: session.id
        userId: 1234
      }
    };
  }
</script>

<script>
  export let users;

  import Title from '$lib/shared/Title.svelte';
  import Subtitle from '$lib/shared/Subtitle.svelte';
  import FilterButton from '$lib/pages/users/FilterButton.svelte';
  import DetailedTile from '$lib/shared/DetailedTile.svelte';
  import { goto } from '$app/navigation';

  let filter = 'all';
  let search = '';
  $: filteredList = users
    .filter((user) => {
      if (filter === 'all') return true;
      return user.role === filter;
    })
    .filter((user) => {
      if (search === '') return true;
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
</script>

<svelte:head>
  <title>Gestione utenti - OpenMed</title>
</svelte:head>

<Title>Gestione Utenti</Title>
<Subtitle>Lista Utenti</Subtitle>

<div class="mt-16">
  <div
    id="search"
    class="flex flex-row px-4 py-2 items-center w-full bg-brandBlue-50/50 rounded-full text-center"
  >
    <span class="material-icons-round"> search </span>
    <input
      id="search-input"
      class="mx-4 w-full bg-transparent focus:outline-none"
      type="text"
      placeholder="Cerca utente"
      bind:value={search}
    />
  </div>
  <div id="filters" class="my-1">
    <div class="flex flex-wrap flex-row justify-evenly">
      <FilterButton>Tutti</FilterButton>
      <FilterButton>Medici</FilterButton>
      <FilterButton>Infermieri</FilterButton>
      <FilterButton>Pazienti</FilterButton>
    </div>
  </div>
  <div id="users-table" class="my-4">
    {#each filteredList as user}
      <DetailedTile title={`${user.name} ${user.surname}`} subtitle={user.email}>
        <div slot="content" class="gap-x-6 gap-y-2 py-4 mx-2 grid grid-cols-[auto_auto]">
          <div class="col-span-1">
            <p class="font-bold">Email</p>
            <p>{user.email}</p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Ruolo</p>
            <p>{user.role}</p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Telefono:</p>
            <p>{user.phone}</p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Città:</p>
            <p>{user.city}</p>
          </div>
        </div>
        <div
          on:click|stopPropagation={() => null}
          slot="trailing"
          class="py-5 px-4 mx-2 mt-4 flex flex-col items-stretch cursor-pointer"
        >
          <button
            on:click|preventDefault|stopPropagation={() => goto(`/users/edit?id=${user.id}`)}
            class="px-4 py-2 my-1 bg-brandBlue-500 hover:bg-brandBlue-700 text-white rounded-3xl align-middle"
          >
            Modifica
          </button>
          <!-- TODO implement the delete function -->
          <div
            on:click|stopPropagation={() => null}
            class="px-4 py-2 my-1 bg-brandBlue-50/20 hover:bg-brandBlue-50/40 rounded-3xl cursor-pointer text-center"
          >
            Elimina
          </div>
        </div>
      </DetailedTile>
    {/each}
  </div>
</div>
