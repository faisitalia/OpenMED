<script context="module">
  import { uri } from "$lib/consts";
  
  export async function load({ session, fetch }) {
    if(!session?.id) {
      return {
        status: 302,
        redirect: "/login"
      };
    }

    // 1. Get Clinics' list
    const response = await fetch(
        `${uri}/facilities`,
        { credentials: 'include' }
      );

    if(!response.ok) {
      console.log("Lookout: something went wrong!");

      // TODO redirect to an error page and not the home
      return {
        status: 302,
        redirect: "/"
      };
    }
    const clinicsList = await response.json();
    if(clinicsList.length === 0) {
      console.log("warn: there are no clinics!");

      // TODO redirect to an error page
    }

    // 2. Get Patients' list
    // TODO
    const patientsList = [];

    return {
      props: {
        'clinics': clinicsList,
        'patients': patientsList,
      }
    };
  };
</script>

<script>
  import { toISOStringDateOnly } from "$lib/utils";
  import { goto } from "$app/navigation";
  import { each } from "svelte/internal";

  export let patients;
  export let clinics;

  let choosenClinic;
  let choosenDate = toISOStringDateOnly(new Date());
  let choosenHour, choosenMinute;
  let choosenDuration;
  let choosenPatient;
  let hours = [
    "06","07","08","09","10","11","12","13","14","15","16","17","18","19","20"
  ];
  let minutes = [
    "00","05","10","15","20","25","30","35","40","45","50","55"
  ];
  let durations = [
    10,20,30,40,50,60,70,80,90
  ];
  
  const maxDays = 365*3;
  const msInDay = 86400000;
  let maxDate = new Date(new Date().getTime() + msInDay*maxDays) ; // TODO

  async function submit() {
    // try and submit a new appointment
  }
</script>



<svelte:head>
  <title>OpenMed Nuovo appuntamento</title>
</svelte:head>

<h1>Nuovo Appuntamento</h1>
<sub>Compila tutti i campi.</sub>

<form on:submit|preventDefault="{submit}" id="newAppointment">
  <fieldset>
    <label for="clinic">Seleziona Ambulatorio</label>
    <select bind:value={choosenClinic} name="Ambulatorio" id="clinic" required>
      {#each clinics as c}
        <option value={c}>{c?.name}</option>
      {:else}
        <option value="noClinic" disabled=true>Nessuna clinica disponibile</option>
      {/each}
    </select>
  </fieldset>
  <fieldset>
    <label for="date">Seleziona una data</label>
    <input
      type="date" name="Data" id="date"
      bind:value={choosenDate}
      min={new Date()} max={maxDate}
      required
    />
  </fieldset>
  <fieldset>
    <label for="date">Seleziona orario</label>
    <select bind:value={choosenHour} name="Ore" id="hours">
      {#each hours as h}
        <option value={h}>{h}</option>
      {/each}
    </select>
    <select bind:value={choosenMinute} name="Minuti" id="minutes">
      {#each minutes as m}
        <option value={m}>{m}</option>
      {/each}
    </select>
  </fieldset>
  <fieldset>
    <label for="duration">Durata Visita</label>
    <select bind:value={choosenDuration} name="Durata" id="duration">
      {#each durations as d}
        <option value={d}>{d}</option>
      {/each}
    </select>
  </fieldset>
  <fieldset>
    <label for="patient">Seleziona Paziente</label>
    <select bind:value={choosenPatient} name="Paziente" id="patient">
      {#each patients as p}
        <option value={p}>{p?.name}</option>
      {:else}
        <option value="noPatient" disabled=true>Nessun Paziente disponibile</option>
      {/each}
    </select>
  </fieldset>
  <button type="submit">
    Crea appuntamento
  </button>
</form>