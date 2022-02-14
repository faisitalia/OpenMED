<script context="module">
  export async function load({ session }) {
    if(!session?.id) {
      return {
        status: 302,
        redirect: "/login"
      };
    }

    return {
      props: {
        ...session
      }
    };
  };
</script>

<script>
  import { goto } from "$app/navigation";
  import DashboardTile from "$lib/dashboard/DashboardTile.svelte";

  export let email;
  export let id;
  export let iat;
  export let name = "Fabrizio";
  export let roles = ["doctor"];

  $: isDoctor = roles.includes("doctor");
  $: isPatient = roles.includes("user");
  $: isAdmin = roles.includes("admin");
</script>

<svelte:head>
  <title>OpenMed</title>
</svelte:head>


<h1>
  Ciao {name},
</h1>
<h2>come desideri procedere?</h2>
<div class="spacer"></div>


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
    on:click={() => goto('/appointment')}
  />
{/if}
{#if isPatient}
  <DashboardTile
    title="Lista Appuntamenti"
    subtitle="Visualizza i tuoi appuntamenti"
  />
{/if}
{#if isPatient && !isDoctor}
  <DashboardTile
    title="Cartella Clinica"
    subtitle="Consulta la tua cartella clinica"
  />
{/if}

<!-- TODO add image -->

<style>

</style>