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

  let hasStarted = false;
  let email;
  let password;
  // TODO properly handle errors
  // let errors;

  async function logIn() {
    // This is now hard-coded, just to test the APIs
    email = "user@openmed.test";
    password = "password";

    const response = await fetch('http://localhost:3001/v1/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const body = await response.json();

    if (response.ok) {
      $session = body;  // Save the session info
      goto('/');
    } else {
      // TODO Handle errors
    }
  }
</script> 



<svelte:head>
  <title>OpenMed Log-in</title>
</svelte:head>

{#if !hasStarted}
  <button on:click={() => hasStarted=true}>Inizia</button>
{:else}
  <form on:submit|preventDefault={logIn}>
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
<img src="fais-logo.svg" alt=""/>
<br/>
<img src="sponsor1.svg" alt=""/>
<img src="sponsor2.svg" alt=""/>
<img src="sponsor2.svg" alt=""/>



<style>
  
</style>