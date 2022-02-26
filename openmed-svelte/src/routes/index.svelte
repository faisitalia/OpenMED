<script context="module">
  export async function load({ session }) {
    if (!session?.id) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    return { ...session };
  }
</script>

<script>
  import { goto } from '$app/navigation';
  import DashboardTile from '$lib/shared/DashboardTile.svelte';
  import Container from '$lib/shared/Container.svelte';

  export let name = 'Fabrizio';
  export let roles = ['doctor'];

  let isDoctor = roles.includes('doctor');
  let isPatient = roles.includes('user');
  let isAdmin = roles.includes('admin');
</script>

<svelte:head>
  <title>OpenMed</title>
</svelte:head>

<Container>
  <div id="hello-user" class="px-8">
    <h1>
      Ciao {name},
    </h1>
    <p>come desideri procedere?</p>
  </div>
  <div class="my-7" />

  <div id="actions" class="flex flex-col justify-center items-start">
    {#if isAdmin}
      <DashboardTile
        title="Gestisci Utenti"
        subtitle="Crea, modifica ed elimina i profili utenti"
      />
    {/if}
    {#if isDoctor}
      <DashboardTile
        title="Crea Appuntamento"
        subtitle="Crea e gestisci nuovi appuntamenti"
        on:click={() => goto('/appointments/new')}
      />
    {/if}
    {#if isPatient || isDoctor}
      <DashboardTile
        title="Lista Appuntamenti"
        subtitle="Visualizza i tuoi appuntamenti"
        on:click={() => goto('/appointments')}
      />
    {/if}
    {#if isPatient && !isDoctor}
      <DashboardTile title="Cartella Clinica" subtitle="Consulta la tua cartella clinica" />
    {/if}
  </div>
  <!-- TODO add image -->
</Container>
