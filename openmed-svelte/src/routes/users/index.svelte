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
  import StyledButton from '$lib/shared/StyledButton.svelte';

  import { goto } from '$app/navigation';
  import DeleteButton from '$lib/pages/users/DeleteButton.svelte';

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

<div class="m-4 mt-16 md:grid md:place-items-start md:grid-cols-[auto_auto] md:px-8">
  <div
    id="search"
    class="col-start-1 row-start-1 flex flex-row px-4 py-2 items-center w-full md:w-96 bg-brandBlue-50/50 rounded-full text-center"
  >
    <span class="material-icons-round"> search </span>
    <input
      id="search-input"
      class="focus:bg-white/30 rounded-xl px-4 bg-transparent focus:outline-none"
      type="text"
      placeholder="Cerca utente"
      bind:value={search}
    />
  </div>
  <div id="filters" class="my-1 col-start-1 row-start-2">
    <div class="flex flex-wrap flex-row justify-evenly md:justify-start">
      <!-- TODO implement on:click events -->
      <FilterButton>Medici</FilterButton>
      <FilterButton>Infermieri</FilterButton>
      <FilterButton>Pazienti</FilterButton>
    </div>
  </div>
  <div id="users-table" class="my-4 col-start-1 row-start-3 place-self-stretch md:pr-40">
    {#each filteredList as user}
      <DetailedTile
        title={`${user.name} ${user.surname}`}
        subtitle={user.email}
        class="rounded-3xl my-1 px-4 py-1"
      >
        <div slot="content" class="gap-x-6 gap-y-2 grid grid-cols-[auto_auto]">
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
          on:click|stopPropagation
          slot="trailing"
          class="flex flex-col items-center cursor-default"
        >
          <StyledButton on:click={() => goto(`/users/edit?id=${user.id}`)}>Modifica</StyledButton>

          <DeleteButton on:delete={() => null}>Elimina</DeleteButton>
        </div>
      </DetailedTile>
    {:else}
      <h3>Nessun utente trovato.</h3>
    {/each}
  </div>

  <!-- Crea nuovo utente-->
  <div
    class="w-full xl:px-40 col-start-2 row-span-3 justify-self-center hidden lg:flex lg:flex-col lg:justify-start lg:items-stretch"
  >
    <h3 class="mt-4 mb-8 text-center">NUOVO UTENTE?</h3>
    <StyledButton class="font-bold" on:click={() => goto('/users/new')}>Crea Nuovo</StyledButton>
    <div class="my-20" />
    <!-- TODO -->
    <h3 class="mt-4 mb-8 text-center">SERVE AIUTO?</h3>
    <StyledButton class="font-bold" on:click={() => null}>Clicca qui</StyledButton>
  </div>
</div>
