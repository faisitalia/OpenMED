<script context="module">
  export async function load({ session }) {
    // If the user is logged in already, let this component know
    return {
      props: {
        session: session?.id
      }
    };
  }
</script>

<script>
  import { goto } from "$app/navigation";
  import { usersEndpoint } from "$lib/uri";
  import "../app.css";

  export let session;

  async function logout() {
    await fetch(
      `${usersEndpoint}/signout`,
      {
        method: 'POST',
        credentials: 'include'
      }
    );
    goto('/');
  }
</script>

{#if session}
  <p on:click|preventDefault={() => logout()}>Done? Logout here</p>
{/if}
<!-- TODO: add static assets -->
<!-- <img src="./logo/openmed-logo.svg" alt=""/> -->
<!-- TODO: add drawer conditionally (it depends on the page we're looking at!) -->
<slot />

<!-- TODO: add static footer -->

<style>
  p {
    text-align: end;
    padding: 0.75rem;
  }
</style>