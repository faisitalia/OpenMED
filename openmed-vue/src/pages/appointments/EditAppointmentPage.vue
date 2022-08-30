<script setup lang="ts">
import { validate } from "validate.js";
import { format } from "date-fns";
import { useHead } from "@vueuse/head";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  patients: { default: ["Gianni Maria", "Franco Neri", "Anna Rossi"] },
  clinics: [],
  doctorId: String,
});
const { push } = useRouter();
useHead({
  title: `${props.doctorId ? "Modifica" : "Crea"} Appuntamento`,
});

// async function load({ session, fetch }) {
//   // if (!session?.id) {
//   //   return {
//   //     status: 302,
//   //     redirect: '/login'
//   //   };
//   // }

//   // 1. Get Clinics' list
//   // TODO
//   const clinicsList = [
//     "San Raffaele di Milano",
//     "Santa Misericordia di Udine",
//     "Ospedale Burlo di Trieste",
//   ];
//   // const response = await fetch(
//   //     facilitiesEndpoint,
//   //     { credentials: 'include' }
//   //   );

//   // if(!response.ok) {
//   //   console.log("Lookout: something went wrong!");

//   //   // TODO redirect to an error page and not the home
//   //   return {
//   //     status: 302,
//   //     redirect: "/"
//   //   };
//   // }
//   // const clinicsList = await response.json();
//   // if(clinicsList.length === 0) {
//   //   console.log("warn: there are no clinics!");

//   //   // TODO redirect to an error page
//   // }

//   // 2. Get Patients' list
//   // TODO
//   const patientsList = ["Gianni Maria", "Franco Neri", "Anna Rossi"];

//   return {
//     props: {
//       clinics: clinicsList,
//       patients: patientsList,
//       // doctorId: session.id
//       doctorId: 1234,
//     },
//   };
// }

const hours = [
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
const minutes = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];
const durations = [10, 20, 30, 40, 50, 60, 75, 90];
const today = format(new Date(), "yyyy-MM-dd");
const choices = ref({
  date: today,
  hour: hours[0],
  minute: minutes[0],
  duration: durations[0],
  clinic: "Virtuale",
  patient: undefined,
});

const startDate = computed(
  () =>
    new Date(
      choices.value.date +
        "T" +
        choices.value.hour +
        ":" +
        choices.value.minute +
        ":00.000"
    )
);

// Initialize constraints
const now = new Date(Date.now()).toISOString();
// Set-up the validator constraints
const formConstraints = {
  clinic: {
    presence: {
      allowEmpty: false,
      message: `^Devi selezionare un ambulatorio, oppure scegli "Virtuale"`,
    },
  },
  patient: {
    presence: {
      allowEmpty: false,
      message: `^Devi selezionare un paziente da visitare`,
    },
  },
  startDate: {
    datetime: {
      earliest: now,
      message: `^Non puoi prenotare appuntamenti per il passato`,
    },
  },
  hour: {
    inclusion: { hours },
  },
  minute: {
    inclusion: { minutes },
  },
  duration: {
    inclusion: { durations },
  },
};
validate.validators.inclusion.message = `^Hai selezionato un valore non presente tra quelli disponibili`;
// Set-up the validator to gracefully accept DateTime objects
validate.extend(validate.validators.datetime, {
  parse: (value, options) => {
    // Here, `value` is the ISO6801 date format
    const d = new Date(value);
    // This lib requires us to return UNIX timestamp for that date, or NaN if invalid
    return d.getTime(); // This will do
  },
  format: (value, options) => {
    // Here, `value` a UNIX timestamp
    const d = new Date(value);
    // This lib requires us to return a user-friendly date, given the UNIX timestamp
    return d.toString(); // This is sufficient
  },
});
const errors = ref<any>({});
const asyncErrors = ref<any>({});

async function submit() {
  console.log(choices.value.date);
  // 1. Validate the form
  const selected = {
    clinic: choices.value.clinic,
    patient: choices.value.patient,
    startDate: startDate.value,
  };
  errors.value = validate(selected, formConstraints);
  if (errors.value) {
    console.log(errors.value);
    return;
  }

  // 2. Elaborate the chosen datetime interval
  const endDate = new Date(
    startDate.value.getTime() + 1000 * 60 * choices.value.duration
  );
  const iso8601Slot =
    startDate.value.toISOString() + "/" + endDate.toISOString();

  // 3. Submit the form
  // const response = await fetch(visitsEndpoint, {
  //   method: 'POST',
  //   credentials: 'include',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     facilityId: 'test', // TODO this is a mock, use this whenever possible: choosenClinic.id,
  //     patientId: doctorId, // TODO this is a mock, use this whenever possible: choosenPatient.id,
  //     doctorId: doctorId, // WARN: we assume the user is a doctor
  //     caregiverId: doctorId, // TODO: this is a mock, this should be patched later on
  //     slot: iso8601Slot
  //   })
  // });

  // if (!response.ok) {
  //   asyncErrors = await response.json();
  //   console.log(asyncErrors);
  //   return;
  // }

  // Everything went right, therefore redirect to the confirm page
  push("/appointments/ok");
}
</script>

<template>
  <div class="mx-4 my-4">
    <h1 class="font-bold my-2">Nuovo Appuntamento</h1>
    <p class="font-normal mb-8">Compila tutti i campi.</p>

    <form
      @submit.prevent="submit"
      id="editAppointment"
      class="flex flex-col justify-center items-stretch"
    >
      <fieldset class="flex flex-col items-stretch my-3">
        <label for="clinic">Seleziona Ambulatorio</label>
        <select
          v-model="choices.clinic"
          name="Ambulatorio"
          id="clinic"
          required
          class="transition-all hover:cursor-pointer appearance-none px-4 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
        >
          <option value="Virtuale" class="font-bold">Virtuale</option>
          <option v-for="c in clinics" :value="c" :key="c">{{ c }}</option>
          <option v-if="!clinics" value="null" disabled="true">
            Nessuna clinica disponibile
          </option>
        </select>
        <div v-if="errors?.clinic" class="text-red-500">
          {{ errors.clinic[0] }}
        </div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-3">
        <label for="date">Seleziona una data</label>
        <input
          type="date"
          name="Data"
          id="date"
          class="transition-all align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          v-model="choices.date"
          required
        />
      </fieldset>
      <fieldset class="flex flex-col items-stretch">
        <label for="date">Seleziona orario</label>
        <select
          v-model="choices.hour"
          name="Ore"
          id="hours"
          class="transition-all hover:cursor-pointer my-0.5 appearance-none text-center px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
        >
          <option v-for="h in hours" :value="h" :key="h">{{ h }}</option>
        </select>
        <select
          v-model="choices.minute"
          name="Minuti"
          id="minutes"
          class="transition-all hover:cursor-pointer my-0.5 appearance-none text-center px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
        >
          <option v-for="m in minutes" :value="m" :key="m">{{ m }}</option>
        </select>
        <div v-if="errors?.startDate" class="text-red-500">
          {{ errors?.startDate[0] }}
        </div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-3">
        <label for="duration">Durata Visita (min.)</label>
        <select
          v-model="choices.duration"
          name="Durata"
          id="duration"
          class="transition-all hover:cursor-pointer appearance-none text-center px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
        >
          <option v-for="d in durations" :value="d" :key="d">{{ d }}</option>
        </select>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-4">
        <label for="patient">Seleziona Paziente</label>
        <select
          v-model="choices.patient"
          name="Paziente"
          id="patient"
          class="transition-all hover:cursor-pointer appearance-none px-4 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
        >
          <option selected disabled hidden />
          <option v-for="p in patients" :value="p" :key="p">{{ p }}</option>
          <option v-if="!patients" value="null" disabled="true">
            Nessun Paziente disponibile
          </option>
        </select>
        <div v-if="errors?.patient" class="text-red-500">
          {{ errors.patient[0] }}
        </div>
      </fieldset>
      <button
        type="submit"
        on:submit="{submit}"
        class="mx-10 my-7 px-2 py-1 rounded-xl text-white font-bold bg-brandBlue-500/95 hover:bg-brandBlue-500"
      >
        Crea appuntamento
      </button>
    </form>
    <div v-if="asyncErrors?.errors" class="text-red-500">
      Woops! Qualcosa è andato storto, riprova.
    </div>
  </div>
</template>

<style>
#date::-webkit-calendar-picker-indicator {
  @apply px-4 py-1 mx-3 align-middle bg-brandBlue-100/60 rounded-lg cursor-pointer;
}
</style>
