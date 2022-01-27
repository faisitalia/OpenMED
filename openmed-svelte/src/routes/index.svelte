<script context="module">
  export async function load({ session, fetch }) {
    // If the user's not logged in, re-route him to the login page
    if(!session?.cookie) {
      return {
        status: 302,
        redirect: "/login"
      };
    }

    const response = await fetch(
      'http://localhost:3001/v1/users/currentuser',
      {
        method: 'GET',
        headers: {
          'cookie': session.cookie
        }
      }
    );
    if (!response?.ok) {  
      console.log(response);
      
      return {
        status: 302,
        redirect: "/login"
      };
    }
    
    const body = await response.json();
    const currentUser = body.currentUser;

    return {
      props: {
        ...currentUser
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
  Questo è il tuo ID {id}!
</p>
<p>
  Questo è il tuo iat {iat}... <em>Whatever that is</em>
</p>

<a href="/about">Go to about</a>

<style>

</style>