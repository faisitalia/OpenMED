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
  import { validate } from "validate.js";
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";
  import { usersEndpoint } from "$lib/uri.js";

  let hasStarted = false;

  // Initialize form values
  const form = {
    username: undefined,
    password: undefined,
  };

  // Initialize form constraints
  const formConstraints = {
    username: {
      presence: {
        allowEmpty: false,
        message: `^Devi inserire un username`
      },
      // We are NOT checking a proper email since this mode is deprecated
    },
    password: {
      presence: {
        allowEmpty: false,
        message: `^Devi inserire la tua password`
      }
    }
  }
  let errors;

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
    // Form validation
    errors = validate(form, formConstraints);
    if(errors) {
      console.log(errors);
      return;
    }

    // Log in request
    const response = await fetch(
      `${usersEndpoint}/signin`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": form.username,
          "password": form.password
        })
      }
    );
    
    if (response.ok) {
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
  <button on:click={() => hasStarted=true} class="start">Inizia</button>
{:else}
  <form on:submit|preventDefault={logIn} id="signin">
    <!-- TODO: valutare se aggiungere delle label per accessibilità -->
    <fieldset>
      <input
        bind:value={form.username}
        label="Username"
        placeholder="Username"
        id="ssn"
        name="ssn"
        type="text"
        class="sh adow-sm focus:ring-green-600 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </fieldset>
    {#if errors?.username}
      <div class="error">{errors.username[0]}</div>
    {/if}
    <fieldset>
      <input
        bind:value={form.password}
        label="Password"
        placeholder="Password"
        id="psw"
        name="psw"
        type="password"
        class="shadow-sm focus:ring-green-600 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </fieldset>
    {#if errors?.password}
      <div class="error">{errors.password[0]}</div>
    {/if}
    <button
      type="submit"
      class="submit inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
  .error {
    color: red;
  }
  .start {
    margin: 1rem;
  }
  fieldset {
    margin: 1rem;
    padding: 0.5rem;
    max-width: 35%;
    border: 1px dashed black;
  }
  .submit {
    margin: 1rem;
  }
</style>
