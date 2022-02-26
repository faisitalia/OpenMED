<script context="module">
  export async function load({ session }) {
    // If the user is logged in already, let this component know
    return {
      // props: {
      //   userId: session?.id
      // }
    };
  }
</script>

<script>
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { usersEndpoint } from '$lib/uri';
  import '../app.css';

  // export let userId;
  let isDrawerOpen = false;

  // async function logout() {
  //   await fetch(`${usersEndpoint}/signout`, {
  //     method: 'POST',
  //     credentials: 'include'
  //   });
  //   $session = null;
  //   goto('/login');
  // }
</script>

<!-- reimplement the logout button later on -->
<!-- {#if userId}
  <p on:click|preventDefault={() => logout()}>Done? Logout here</p>
{/if} -->
<!-- TODO: add static assets -->
<!-- <img src="./logo/openmed-logo.svg" alt=""/> -->
<!-- TODO: add drawer conditionally (it depends on the page we're looking at!) -->

<div
  class="{isDrawerOpen
    ? 'fixed'
    : 'hidden'} z-10 top-20 md:hidden fixed w-full h-full bg-brandBlack-50 opacity-40"
  on:click={() => (isDrawerOpen = false)}
/>

<!-- Mobile Nav Bar -->
<div
  class="top-20 z-40 p-4 md:hidden bg-brandBlack-50 right-0
  {isDrawerOpen ? 'fixed' : 'hidden'}"
>
  <nav>
    <!-- TODO: use a loop -->
    <ul class="flex flex-col items-end list-none">
      <a href="/"><li class="font-light py-2">Home</li></a>
      <a href="/"><li class="font-light py-2">Gestisci Utenti</li></a>
      <a href="/"><li class="font-light py-2">Crea Appuntamento</li></a>
      <a href="/"><li class="font-light py-2">Lista Appuntamenti</li></a>
      <a href="/"><li class="font-light py-2">Contatti</li></a>
    </ul>
  </nav>
</div>

<div class="relative min-h-screen flex flex-col">
  <!-- Header / Navigation Bar / Menu / Side Nav Bar -->
  <header class="p-6">
    <!-- Main Navigation Bar -->
    <div class="flex flex-row flex-nowrap justify-between items-center">
      <!-- Use OpenMed's logo here -->
      <div>
        <a href="/">Logo</a>
      </div>

      <!-- Drawer Menu on mobile screens -->
      <div
        class="flex md:hidden w-10 h-10 rounded-lg hover:bg-brandBlue-50/20 justify-center items-center"
      >
        <button
          class="material-icons focus:outline-none text-5xl text-brandGreen-500"
          on:click|preventDefault={() => (isDrawerOpen = !isDrawerOpen)}
        >
          menu
        </button>
      </div>

      <!-- Navigation elements on wider screens -->
      <nav class="hidden md:block">
        <ul class="list-none flex flex-row justify-center items-center">
          <a href="/"><li class="font-light px-3">Home</li></a>
          <a href="/"><li class="font-light px-3">Gestisci Utenti</li></a>
          <a href="/"><li class="font-light px-3">Crea Appuntamento</li></a>
          <a href="/"><li class="font-light px-3">Lista Appuntamenti</li></a>
          <a href="/"><li class="font-light px-3">Contatti</li></a>
        </ul>
      </nav>
    </div>
  </header>

  <main class="{isDrawerOpen ? 'blur-sm' : 'blur-none'} flex-1 mx-10 my-4">
    <slot />
  </main>

  <footer />
</div>

<!-- TODO: add static footer -->
