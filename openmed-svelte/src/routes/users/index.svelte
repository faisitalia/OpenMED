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

<div class="m-4 mt-16">
  <div
    id="search"
    class="flex flex-row px-4 py-2 items-center w-full bg-brandBlue-50/50 rounded-full text-center"
  >
    <span class="material-icons-round"> search </span>
    <input
      id="search-input"
      class="focus:bg-white/30 rounded-xl px-4 w-full bg-transparent focus:outline-none"
      type="text"
      placeholder="Cerca utente"
      bind:value={search}
    />
  </div>
  <div id="filters" class="my-1">
    <div class="flex flex-wrap flex-row justify-evenly">
      <!-- TODO implement on:click events -->
      <FilterButton>Medici</FilterButton>
      <FilterButton>Infermieri</FilterButton>
      <FilterButton>Pazienti</FilterButton>
    </div>
  </div>
  <div id="users-table" class="my-4">
    {#each filteredList as user}
      <DetailedTile title={`${user.name} ${user.surname}`} subtitle={user.email}>
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
</div>
