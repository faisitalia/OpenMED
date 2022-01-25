<script context="module">
  export async function load({ session }) {
    // If the user's not logged in, re-route him to the login page
    if(!session?.id) {
      return {
        status: 302,
        redirect: "/login"
      };
    }

    // TODO: Implement a home / dashboard page
    // const user = await fetch('http://localhost:3001/v1/users/currentuser');

    return {
      props: {
        ...session
      }
    };
  };
</script>

<script>
  export let email;
  export let id;
</script>

<svelte:head>
  <title>OpenMed</title>
</svelte:head>


<!-- This is just a trial, PLEASE DO NOT TAKE THIS AS SERIOUS CODE -->
<h1 class='text-2xl font-semibold text-center'>
  Ciao {email}!
</h1>
<p>
  Questo è il tuo ID {id}!
</p>

<style>

</style>