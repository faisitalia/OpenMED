<script context="module">
  import { facilitiesEndpoint } from "$lib/uri.js";
  
  export async function load({ session, fetch }) {
    if(!session?.id) {
      return {
        status: 302,
        redirect: "/login"
      };
    }

    // 1. Get Clinics' list
    const response = await fetch(
        facilitiesEndpoint,
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
        'doctorId': session.id,
      }
    };
  };
</script>

<script>
  import { validate } from "validate.js";
  import { visitsEndpoint } from "$lib/uri";
  import { yyyyMMdd } from "$lib/utils";
  import { goto } from "$app/navigation";

  export let patients;
  export let clinics;
  export let doctorId;

  const hours = [
    "06","07","08","09","10","11","12","13","14","15","16","17","18","19","20"
  ];
  const minutes = [
    "00","05","10","15","20","25","30","35","40","45","50","55"
  ];
  const durations = [
    10,20,30,40,50,60,75,90
  ];
  const today = yyyyMMdd(new Date());
  const choices = {
    date: today,
    hour: hours[0],
    minute: minutes[0],
    duration: durations[0],    
    clinic: undefined,
    patient: undefined,
  };
  $: startDate = new Date(choices.date+'T'+choices.hour+':'+choices.minute+':00.000');


  // Initialize constraints
  const now = new Date(Date.now()).toISOString();
  // Set-up the validator constraints
  const formConstraints = {
    clinic: {
      presence: {
        allowEmpty: false,
        message: `^Devi selezionare un ambulatorio, oppure scegli "Virtuale"`
      }
    },
    patient: {
      presence: {
        allowEmpty: false,
        message: `^Devi selezionare un paziente da visitare`
      }
    },
    startDate: {
      datetime: {
        earliest: now,
        message: `^Non puoi prenotare appuntamenti per il passato`
      }
    },
    hour: {
      inclusion: { hours }
    },
    minute: {
      inclusion: { minutes }
    },
    duration: {
      inclusion: { durations }
    }
  }
  validate.validators.inclusion.message = `^Hai selezionato un valore non presente tra quelli disponibili`;
  // Set-up the validator to gracefully accept DateTime objects
  validate.extend(
    validate.validators.datetime, {
      parse: (value, options) => {
        // Here, `value` is the ISO6801 date format
        const d = new Date(value);
        // This lib requires us to return UNIX timestamp for that date, or NaN if invalid
        return d.getTime();  // This will do
      },
      format: (value, options) => {
        // Here, `value` a UNIX timestamp
        const d = new Date(value);
        // This lib requires us to return a user-friendly date, given the UNIX timestamp
        return d.toString();  // This is sufficient
      }
    }
  );
  let errors;
  let asyncErrors;
  
  async function submit() {
    // 1. Validate the form
    const selected = {
      clinic: choices.clinic,
      patient: choices.patient,
      startDate: startDate,
    };
    errors = validate(selected, formConstraints);
    if(errors) {
      console.log(errors);
      return;
    }

    // 2. Elaborate the chosen datetime interval
    const endDate = new Date(startDate.getTime() + 1000*60*choices.duration);
    const iso8601Slot = startDate.toISOString()+'/'+endDate.toISOString();

    // 3. Submit the form
    const response = await fetch(
      visitsEndpoint,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "facilityId": "test", // TODO this is a mock, use this whenever possible: choosenClinic.id,
          "patientId": doctorId, // TODO this is a mock, use this whenever possible: choosenPatient.id,
          "doctorId": doctorId,  // WARN: we assume the user is a doctor
          "caregiverId": doctorId,  // TODO: this is a mock, this should be patched later on
          "slot": iso8601Slot,
        })
      }
    );

    if (!response.ok) {
      asyncErrors = await response.json();
      console.log(asyncErrors);
      return;
    }

    // Everything went right, therefore redirect to the confirm page
    goto('/appointments/ok');
  }
</script>



<svelte:head>
  <title>Nuova visita - OpenMed</title>
</svelte:head>

<h1>Nuovo Appuntamento</h1>
<p>Compila tutti i campi.</p>

<form on:submit|preventDefault="{submit}" id="newAppointment">
  <fieldset>
    <label for="clinic">Seleziona Ambulatorio</label>
    <select bind:value={choices.clinic} name="Ambulatorio" id="clinic" required>
      <option value="Virtuale">Virtuale</option>
      {#each clinics as c}
        <option value={c}>{c?.name}</option>
      {:else}
        <option value=null disabled=true>Nessuna clinica disponibile</option>
      {/each}
    </select>
  </fieldset>
  {#if errors?.clinic}
    <div class="error">{errors.clinic[0]}</div>
  {/if}
  <fieldset>
    <label for="date">Seleziona una data</label>
    <input
      type="date" name="Data" id="date"
      bind:value={choices.date}
      required
    />
  </fieldset>
  <fieldset>
    <label for="date">Seleziona orario</label>
    <select bind:value={choices.hour} name="Ore" id="hours">
      {#each hours as h}
        <option value={h}>{h}</option>
      {/each}
    </select>
    <select bind:value={choices.minute} name="Minuti" id="minutes">
      {#each minutes as m}
        <option value={m}>{m}</option>
      {/each}
    </select>
  </fieldset>
  {#if errors?.startDate}
    <div class="error">{errors.startDate[0]}</div>
  {/if}
  <fieldset>
    <label for="duration">Durata Visita</label>
    <select bind:value={choices.duration} name="Durata" id="duration">
      {#each durations as d}
        <option value={d}>{d}</option>
      {/each}
    </select>
  </fieldset>
  <fieldset>
    <label for="patient">Seleziona Paziente</label>
    <select bind:value={choices.patient} name="Paziente" id="patient">
      {#each patients as p}
        <option value={p}>{p?.name}</option>
      {:else}
        <option value=null disabled=true>Nessun Paziente disponibile</option>
      {/each}
    </select>
  </fieldset>
  {#if errors?.patient}
    <div class="error">{errors.patient[0]}</div>
  {/if}
  <button type="submit" on:submit={submit}>
    Crea appuntamento
  </button>
</form>
{#if asyncErrors?.errors}
  <div class="asyncErrors">Woops! Qualcosa è andato storto, riprova.</div>
{/if}

<style>
  .error {
    color: red;
  }
  .asyncErrors {
    color: red;
  }
</style>
