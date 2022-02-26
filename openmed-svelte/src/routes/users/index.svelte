<script context="module">
  // TODO import GET users endpoint(s)
  export async function load({ session, fetch }) {
    // if (!session?.id) {
    //   return {
    //     status: 302,
    //     redirect: '/login'
    //   };
    // }

    // 1. Get Users
    // TODO
    const usersList = [
      {
        name: 'Luca',
        surname: 'Ward',
        email: 'wardi@gmail.com',
        role: 'Medic',
        phone: '3479889880',
        city: 'Roma'
      },
      {
        name: 'Mario',
        surname: 'Galli',
        email: 'magal@hotmail.com',
        role: 'Medic',
        phone: '3480098871',
        city: 'Frosinone'
      },
      {
        name: 'Alma',
        surname: 'Bortoli',
        email: 'almoli@mabort.it',
        role: 'User',
        phone: '3599876543',
        city: 'Roma'
      },
      {
        name: 'Fabrizio',
        surname: 'Lombardo',
        email: 'info@fabriziolombardo.it',
        role: 'Medic',
        phone: '3409321231',
        city: 'Latina'
      },
      {
        name: 'Agata',
        surname: 'Verdi',
        email: 'verdi@agatav.it',
        role: 'Medic',
        phone: '33309091214',
        city: 'Civitavecchia'
      },
      {
        name: 'Valerio',
        surname: 'Rummo',
        email: 'rummova@hotmail.com',
        role: 'Medic',
        phone: '3483483488',
        city: 'Roma'
      },
      {
        name: 'Mario',
        surname: 'Rossi',
        email: 'mario@rossi.com',
        role: 'User',
        phone: '3473473477',
        city: 'Roma'
      }
    ];

    return {
      props: {
        users: usersList,
        // doctorId: session.id
        userId: 1234
      }
    };
  }
</script>

<script>
  export let userId;
  export let usersList;

  let filter = 'all';
  $: filteredList = usersList.filter((user) => {
    if (filter === 'all') return true;
    return user.role === filter;
  });
</script>

<svelte:head>
  <title>Gestione utenti - OpenMed</title>
</svelte:head>

<h1 class="font-bold">Gestione Utenti</h1>
<p>Lista Utenti</p>

<div class="mt-5">
  <div id="search">search</div>
  <div id="users-table">utenti</div>
</div>
