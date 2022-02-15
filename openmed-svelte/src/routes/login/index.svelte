<script context="module">
  export async function load({ session }) {
    // If the user is logged in already, re-route him to the index
    if(session?.id) {
      return {
        status: 302,
        redirect: '/'
      }
    }

    return {};
  }
</script>

<script>
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";
  import { usersEndpoint } from "$lib/uri.js";

  let hasStarted = false;
  let email;
  let password;

  // TODO properly handle errors
  // let errors;

  async function getUserData() {
    const response = await fetch(
      `${usersEndpoint}/currentuser`,
      { credentials: 'include' }
    );
    // If something goes wrong with this call, we can't authenticate
    if (!response.ok) return null;

    // If we got a proper response body, we extract its currentUser prop
    const responseBody = await response.json();
    const currentUser = responseBody.currentUser;
    if (!currentUser) return null;

    return { ...currentUser };
  }

  async function logIn() {
    const response = await fetch(
      `${usersEndpoint}/signin`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      }
    );
    
    if (response.ok) {
      await response.json(); // Do we actually need this? TODO
      $session = await getUserData();
      goto('/');
    } else {
      const errors = await response.json();
      // TODO properly handle errors
      console.log(errors);
    }
  }
</script> 



<svelte:head>
  <title>Log-in - OpenMed</title>
</svelte:head>

{#if !hasStarted}
  <button on:click={() => hasStarted=true}>Inizia</button>
{:else}
  <form on:submit|preventDefault={logIn} id="signin">
    <!-- TODO: valutare se aggiungere delle label per accessibilità -->
    <fieldset>
      <input
        bind:value={email}
        label="Username"
        placeholder="Username"
        id="ssn"
        name="ssn"
        type="text"
        required
        class="shadow-sm focus:ring-green-600 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </fieldset>
    <fieldset>
      <input
        bind:value={password}
        label="Password"
        placeholder="Password"
        id="psw"
        name="psw"
        type="password"
        required
        class="shadow-sm focus:ring-green-600 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </fieldset>
    <button
      type="submit"
      class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Accedi
    </button>
  </form>
{/if}

<!-- TODO: add proper static assets, here -->
<!-- <img src="fais-logo.svg" alt=""/>
<br/>
<img src="sponsor1.svg" alt=""/>
<img src="sponsor2.svg" alt=""/>
<img src="sponsor2.svg" alt=""/> -->



<style>
  
</style>