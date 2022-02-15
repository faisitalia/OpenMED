<script context="module">
  import { visitsEndpoint} from "$lib/uri.js";
  
  export async function load({ session, fetch }) {
    if(!session?.id) {
      return {
        status: 302,
        redirect: "/login"
      };
    }

    // Get the visits list
    const response = await fetch(
        visitsEndpoint,
        { credentials: 'include' }
      );

    if(!response.ok) {
      console.log("Lookout: something went wrong!");
      console.log(response.status);
      console.log(await response.json().errors);

      // TODO redirect to an error page and not the home
      return {
        status: 302,
        redirect: "/"
      };
    }

    const visitsList = await response.json();
    if(visitsList.length === 0) {
      console.log("warn: there are no appointments!");

      // TODO redirect to an error page
    }

    console.log(visitsList);

    return {
      props: {
        'visits': visitsList,
        'userId': session.id,
      }
    };
  };
</script>

<script>
  import DetailedTile from "$lib/shared/DetailedTile.svelte";

  export let visits;
  export let userId;

  function callStart(visit) {
    //TODO
  }

  function edit(visit) {
    //TODO
  }

  // TODO
</script>


<svelte:head>
  <title>I tuoi appuntamenti - OpenMed</title>
</svelte:head>

<h1>Scegli il tuo appuntamento</h1>
{#each visits as v}
  <!--
    All the data below is made-up
    TODO: check and implement the correct properties
  -->
  <DetailedTile
    title="Visita"
    subtitle={v.date}
    iconImgPath="/myImg.svg"
    iconImgAlt="da remoto / in presenza"
  >
    <p>{v.date}</p>

    <h3>Data</h3>
    <p>{v.date}</p>
    <p>{v.time}</p>

    <h3>Ambulatorio</h3>
    <p>{v.clinic}</p>

    <h3>Medico</h3>
    <p>{v.doctor.name} {v.doctor.surname}</p>
    <p>{v.doctor.qualification}</p>

    <h3>Paziente</h3>
    <p>{v.patient.name} {v.patient.surname}</p>
    <p>{v.patient.ssn}</p>

    <h3>Caregiver / Familiare</h3>
    <p>{v.caregiver.name} {v.caregiver.surname}</p>
    <p>{v.caregiver.relation}</p>

    <button on:click|preventDefault="{() => callStart(v)}">
      Inizio chiamata
    </button>
    <div on:click={() => edit(v)}>Modifica</div>
  </DetailedTile>
{:else}
  <p>Non hai appuntamenti da poter mostrare qui.</p>
{/each}