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
  import Title from '$lib/shared/Title.svelte';
  import Subtitle from '$lib/shared/Subtitle.svelte';

  export let name = 'Fabrizio';
  export let roles = ['doctor', 'admin'];

  let isDoctor = roles.includes('doctor');
  let isPatient = roles.includes('user');
  let isAdmin = roles.includes('admin');
</script>

<svelte:head>
  <title>OpenMed</title>
</svelte:head>

<div id="hello-user">
  <Title>Ciao {name}</Title>
  <Subtitle>come desideri procedere?</Subtitle>
</div>
<div class="my-7" />

<div id="actions" class="flex flex-col justify-center items-start">
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
    src="/static/img/doctors.svg"
    alt="Un gruppo di dottori ti aspetta"
    class="self-center my-16"
  />
</div>
