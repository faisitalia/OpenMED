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
  export let email;
  export let id;
  export let iat;
</script>

<svelte:head>
  <title>OpenMed</title>
</svelte:head>


<!-- This is just a trial, PLEASE DO NOT TAKE THIS AS SERIOUS CODE -->
<h1 class='text-2xl font-semibold text-center'>
  Ciao {email}!
</h1>
<p>
  Questo è il tuo ID: {id}!
</p>
<p>
  Questo è il tuo iat: {iat}
  <br/>... <em>Whatever that is</em>
</p>

<a href="/about">Go to about</a>

<style>

</style>