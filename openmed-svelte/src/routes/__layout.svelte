<script context="module">
  export async function load({ session }) {
    // If the user is logged in already, let this component know
    return {
      props: {
        userId: session?.id
      }
    };
  }
</script>

<script>
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { usersEndpoint } from '$lib/uri';
  import { fade } from 'svelte/transition';
  import '../app.css';

  export let userId;
  let isDrawerOpen = false;

  async function logout() {
    await fetch(`${usersEndpoint}/signout`, {
      method: 'POST',
      credentials: 'include'
    });
    $session = null;
    goto('/login');
  }

  $: overlay = isDrawerOpen ? 'fixed' : 'hidden';
  $: gridLayout = isDrawerOpen ? 'md:grid-cols-[auto_1fr]' : 'grid-cols-[1fr]';

  console.log(userId);
</script>

<!-- reimplement the logout button later on -->
<!-- {#if userId}
  <p on:click|preventDefault={() => logout()}>Done? Logout here</p>
{/if} -->

<div
  class="{overlay} z-10 top-20 md:hidden w-full h-full bg-brandBlack-50 opacity-40"
  on:click={() => (isDrawerOpen = false)}
/>

<!-- Mobile Nav Bar -->
{#if isDrawerOpen}
  <div
    transition:fade
    class="fixed md:hidden items-center transition-all bg-white top-20 z-40 p-4 pb-20 w-full right-0"
  >
    <!-- Openmed's big logo here -->
    <nav class="self-stretch">
      <ul class="flex flex-col items-end list-none">
        <a href="/"><li class="font-light py-2">Home</li></a>
        <a href="/"><li class="font-light py-2">Gestisci Utenti</li></a>
        <a href="/"><li class="font-light py-2">Crea Appuntamento</li></a>
        <a href="/"><li class="font-light py-2">Lista Appuntamenti</li></a>
        <a href="/"><li class="font-light py-2">Contatti</li></a>
      </ul>
    </nav>
  </div>
{/if}

<!-- We're layouting the whole app with a simple gridview -->
<div class="grid grid-flow-col {gridLayout}">
  <!-- Desktop Nav Bar -->
  {#if isDrawerOpen}
    <div class="hidden md:flex flex-col justify-start top-auto py-4 px-8 bg-brandBlue-500">
      <!-- Openmed's big white logo here -->
      <img class="my-10" src="img/logo-openmed/openmed-logo-white.svg" alt="Il logo di openmed." />
      <nav class="self-stretch">
        <ul class="flex flex-col items-start list-none">
          <a href="/"><li class="font-bold text-lg text-white py-2">Home</li></a>
          <a href="/"><li class=" font-bold text-lg text-white py-2">Gestisci Utenti</li></a>
          <a href="/"><li class=" font-bold text-lg text-white py-2">Crea Appuntamento</li></a>
          <a href="/"><li class="font-bold text-lg text-white py-2">Lista Appuntamenti</li></a>
          <a href="/"><li class="font-bold text-lg text-white py-2">Contatti</li></a>
        </ul>
      </nav>

      <!-- Doctor's image in desktop view mode only -->
      <img
        class="hidden md:block mt-28 mb-4 self-center"
        src="img/doctors.svg"
        alt="A sketch of three doctors smile and look helpful"
      />

      <!-- FAIS's logo in desktop view mode only -->
      <img
        class="hidden md:block mt-28 w-32 self-center"
        src="img/logo-fais/logo-fais-white@2x.png"
        alt="FAIS logo"
      />
    </div>
  {/if}

  <div class="relative min-h-screen flex flex-col">
    <!-- Drawer Button + Small Logo -->
    <header class="p-6 flex flex-row justify-between md:justify-end items-center">
      <!-- OpenMed's small logo -->
      <div class="md:hidden">
        <a href="/">
          <img src="img/logo-openmed/openmed-logo.svg" alt="Il logo di openmed." />
        </a>
      </div>

      <!-- Drawer Button -->
      <div class="flex w-10 h-10 rounded-lg hover:bg-brandBlue-50/20 justify-center items-center">
        <button
          class="material-icons-round focus:outline-none text-5xl text-brandGreen-500"
          on:click|preventDefault={() => (isDrawerOpen = !isDrawerOpen)}
        >
          menu
        </button>
      </div>
    </header>

    <main class="transition-all px-4 {isDrawerOpen ? 'blur-sm' : 'blur-none'} md:blur-none">
      <slot />
    </main>

    <footer />
  </div>
</div>

<!-- TODO: add static footer -->
