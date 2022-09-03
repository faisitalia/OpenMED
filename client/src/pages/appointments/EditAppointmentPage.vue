<script setup lang="ts">
import { ref } from "vue";
import { format } from "date-fns";

import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

const props = defineProps({
  appointmentId: String,
});

useHead({
  title: `${props.appointmentId ? "Modifica" : "Crea"} Appuntamento`,
});

const { push } = useRouter();

// TODO these should come from API
// logic should be: if no clinics, show disabled option "no clinic available"
const clinics = [{ label: "Virtuale", value: "virtual" }];
// logic should be: if no patients, show disabled option "no patient available"
const patients = [
  { label: "Gianni Maria", value: 3 },
  { label: "Franco Neri", value: 9 },
  { label: "Anna Rossi", value: 27 },
];
const durations = [10, 20, 30, 40, 50, 60, 75, 90].map((el) => `${el} minuti`);
const now = new Date(Date.now());
const formattedDate = format(now, "yyyy-MM-dd'T'hh:mm");

const startDateTime = ref<Date>();
const duration = ref<string>("duration");
const clinic = ref<string>("clinic");
const patient = ref<string>("patient");

// const inclusionError = "Puoi scegliere solo un'opzione tra quelle presenti";
const requiredError = "Questo campo è obbligatorio";
const noPastAppointments = "Non puoi prenotare appuntamenti per il passato";

// const endDateTime = computed(() =>
//   add(startDateTime.value, { minutes: parseInt(duration.value) })
// );
// const timeError = computed(() =>
//   isBefore(startDate.value, now) ? noPastAppointments : ""
// );

// watch(startDate, () => {});

const asyncErrors = ref<string>();

async function submit() {
  // console.log(values);

  // 1. Validate the form
  // const { valid, errors } = await validate();
  // if (!valid || timeError.value) {
  //   console.log(errors);
  //   console.log(timeError.value);
  //   return;
  // }

  // 2. Elaborate the chosen datetime interval
  // TODO use formatISODuration from date-fns
  // const iso8601Slot = `${startDate.value.toISOString()} / ${endDate.value.toISOString()}`;

  // 3. Submit the form
  // TODO use axios here.
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

  push("/appointments/ok");
}
</script>

<template>
  <div class="mx-4 my-4">
    <h1 class="font-bold my-2">Nuovo Appuntamento</h1>
    <p class="font-normal mb-8">Compila tutti i campi.</p>

    <FormKit
      type="form"
      id="edit-appointment"
      :actions="false"
      :incomplete-message="false"
      @submit="submit"
      class="flex flex-col items-stretch px-2"
    >
      <fieldset class="my-3" name="Ambulatorio">
        <FormKit
          id="clinic"
          name="Ambulatorio"
          label="Seleziona Ambulatorio"
          type="select"
          v-model="clinic"
          value="Virtuale"
          validation="required"
          :validation-messages="{ required: requiredError }"
          :options="clinics"
          input-class="w-full transition-all hover:cursor-pointer appearance-none px-4 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          message-class="text-red-500"
        />
      </fieldset>
      <fieldset class="my-3" name="Appuntamento">
        <FormKit
          id="appointment"
          name="Appuntamento"
          label="Seleziona l'appuntamento"
          type="datetime-local"
          :required="false"
          v-model="startDateTime"
          :value="formattedDate"
          :validation="`required|date_after:${formattedDate}`"
          :validation-messages="{ date_after: noPastAppointments }"
          input-class="w-full transition-all hover:cursor-pointer appearance-none px-4 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          message-class="text-red-500"
        />
      </fieldset>
      <fieldset class="my-3" name="Durata">
        <FormKit
          id="duration"
          name="Durata"
          label="Durata"
          type="select"
          v-model="duration"
          :options="durations"
          :value="durations[0]"
          validation="required"
          :validation-messages="{ required: requiredError }"
          input-class="w-full transition-all hover:cursor-pointer appearance-none px-4 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          message-class="text-red-500"
        />
      </fieldset>
      <fieldset class="my-3" name="Paziente">
        <FormKit
          id="patient"
          name="Paziente"
          label="Paziente"
          type="select"
          v-model="patient"
          :options="patients"
          :value="patients[0]"
          validation="required"
          :validation-messages="{ required: requiredError }"
          input-class="w-full transition-all hover:cursor-pointer appearance-none px-4 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          message-class="text-red-500"
        />
      </fieldset>
      <FormKit
        type="submit"
        name="submit-button"
        label="Crea appuntamento"
        wrapper-class="$reset flex justify-center align-middle mt-12"
        input-class="align-center px-4 py-2 rounded-xl text-white font-bold bg-brandBlue-500/95 hover:bg-brandBlue-500"
      />
    </FormKit>
    <div v-if="asyncErrors" class="text-red-500">
      Woops! Qualcosa è andato storto, riprova.
    </div>
  </div>
  <div
    class="mx-3 align-middle bg-brandBlue-100/60 rounded-lg cursor-pointer"
  ></div>
</template>

<style>
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  @apply px-4 py-1 mx-3 align-middle bg-brandBlue-100/60 rounded-lg cursor-pointer;
}
</style>
