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
  // import { goto } from '$app/navigation';
  import DashboardTile from '$lib/shared/DashboardTile.svelte';
  import Title from '$lib/shared/Title.svelte';
  import Subtitle from '$lib/shared/Subtitle.svelte';
  import SummaryTile from '$lib/shared/SummaryTile.svelte';

  export let name = 'Fabrizio';
  export let roles = ['doctor', 'admin'];

  let isDoctor = roles.includes('doctor');
  let isPatient = roles.includes('user');
  let isAdmin = roles.includes('admin');
</script>

<svelte:head>
  <title>OpenMed</title>
</svelte:head>

<div class="mx-4 my-4 md:grid md:place-items-start md:grid-cols-[auto_auto]">
  <div id="hello-user" class="col-start-1 row-start-1">
    <Title>Ciao {name},</Title>
    <Subtitle>come desideri procedere?</Subtitle>
  </div>

  <!-- Separator -->
  <div class="my-6 col-start-1 row-start-2" />

  <!-- Main menu -->
  <div id="actions" class="col-start-1 row-start-3 flex flex-col justify-center items-start">
    {#if isAdmin}
      <DashboardTile
        title="Gestisci Utenti"
        subtitle="Crea, modifica ed elimina i profili utenti"
        href="/users"
      />
    {/if}
    {#if isDoctor}
      <DashboardTile
        title="Crea Appuntamento"
        subtitle="Crea e gestisci nuovi appuntamenti"
        href="/appointments/edit"
      />
    {/if}
    {#if isPatient || isDoctor}
      <DashboardTile
        title="Lista Appuntamenti"
        subtitle="Visualizza i tuoi appuntamenti"
        href="/appointments"
      />
    {/if}
    {#if isPatient && !isDoctor}
      <DashboardTile title="Cartella Clinica" subtitle="Consulta la tua cartella clinica" />
    {/if}

    <img
      src="img/doctors.svg"
      alt="Un gruppo di dottori ti aspetta"
      class="md:hidden self-center my-16"
    />
  </div>

  <!-- Prossimi appuntamenti -->
  <div
    class="w-full col-start-2 row-span-3 justify-self-center hidden md:flex md:flex-col md:justify-start md:items-stretch"
  >
    <h3 class="mt-4 mb-8 text-center">PROSSIMI APPUNTAMENTI</h3>
    <SummaryTile title="Visita" subtitle={`24 Gennaio | h 11.30 / 12.30`}>
      <div slot="content" class="grid grid-cols-3">
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
      <div
        on:click|stopPropagation={() => null}
        slot="trailing"
        class="flex flex-col items-stretch cursor-default"
      >
        apri
      </div>
    </SummaryTile>
  </div>
</div>
