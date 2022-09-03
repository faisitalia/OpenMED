<script setup>
import { validate } from "validate.js";

const props = defineProps({ userId: String });

useRouter();
useHead({ title: `${props.userId ? "Modifica" : "Crea"} Utente` });

// TODO check old svelte logic
async function load({ fetch, url }) {
  const params = url.searchParams;

  let user;

  if (params.has("user")) {
    const response = await fetch(
      `${url.origin}/api/users/${params.get("user")}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.log("Lookout: something went wrong!");
      console.log(response.status);
      console.log(await response.json().errors);

      // TODO properly handle this error
      throw "Something went wrong!";
    }

    user = await response.json();
  }

  return { props: { user: user } };
}

let action = props.userId ? "Crea" : "Modifica";
let user; // TODO load this user from the global session store

const roles = ["Paziente", "Dottore", "Amministratore"];
const choices = {
  role: user?.role,
  ssn: user?.ssn,
  name: user?.name,
  surname: user?.surname,
  address: user?.address,
  phone: user?.phone,
  email: user?.email,
  password: "",
  confirmPassword: "",
};

const formConstraints = {
  role: {
    presence: {
      allowEmpty: false,
      message: `^Devi scegliere un ruolo per questa persona`,
    },
    inclusion: {
      within: roles,
      message: `^Devi scegliere un ruolo valido`,
    },
  },
  ssn: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire il codice fiscale`,
    },
    format: {
      pattern: /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/,
      message: `^Il codice fiscale inserito non è valido`,
    },
  },
  name: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire il nome`,
    },
  },
  surname: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire il cognome`,
    },
  },
  address: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire un indirizzo`,
    },
  },
  phone: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire un numero di telefono`,
    },
    format: {
      pattern: /^[0-9]{10,12}$/,
      message: `^Il numero di telefono inserito non è valido`,
    },
  },
  email: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire la tua mail`,
    },
    email: true,
  },
  password: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire una password`,
    },
    length: {
      minimum: 8,
      message: `^La password deve contenere almeno 8 caratteri`,
    },
    format: {
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      message: `^La password deve contenere almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale`,
    },
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire la conferma password`,
    },
    equality: {
      attribute: "password",
      message: `^Le password non corrispondono`,
    },
  },
};

// Set-up default error messages
validate.validators.inclusion.message = `^Hai selezionato un valore non presente tra quelli disponibili`;
validate.validators.email.message = `^La tua mail non sembra essere valida`;

let errors;
let asyncErrors;
async function submit() {
  // 1. Validate the form
  errors = validate(choices, formConstraints);
  if (errors) {
    console.log(errors);
    return;
  }

  // 2. Submit the form
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
  navigateTo("/users/ok");
}
</script>

<template>
  <NuxtLayout name="layout">
    <h1 class="font-bold my-2">Gestione Utenti</h1>
    <p class="font-normal mb-8">Nuovo Profilo</p>

    <form
      @submit.prevent="submit"
      id="editUser"
      class="flex flex-col justify-center items-stretch"
      novalidate
    >
      <fieldset class="flex flex-col items-stretch my-3">
        <label for="role">Ruolo</label>
        <select
          v-model="choices.role"
          name="Ruolo"
          id="role"
          required
          class="transition-all hover:cursor-pointer appearance-none px-4 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
        >
          <option />
          <option v-for="r in roles" :value="r">{{ r }}</option>
          <option v-if="!roles" disabled="true">
            Nessun ruolo disponibile
          </option>
        </select>
        <div v-if="errors?.role" class="text-red-500">{{ errors.role[0] }}</div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-3">
        <label for="ssn">Codice Fiscale</label>
        <input
          type="text"
          name="Codice Fiscale"
          id="ssn"
          class="uppercase transition-all align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          v-model="choices.ssn"
          required
        />
        <div v-if="errors?.ssn" class="text-red-500">{{ errors.ssn[0] }}</div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch">
        <label for="name">Nome</label>
        <input
          type="text"
          name="Nome"
          id="name"
          class="transition-all align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          v-model="choices.name"
          required
        />
        <div v-if="errors?.name" class="text-red-500">{{ errors.name[0] }}</div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-3">
        <label for="surname">Cognome</label>
        <input
          type="text"
          name="Cognome"
          id="surname"
          class="transition-all align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          v-model="choices.surname"
          required
        />
        <div v-if="errors?.surname" class="text-red-500">
          {{ errors.surname[0] }}
        </div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-4">
        <label for="address">Indirizzo</label>
        <input
          type="text"
          name="Indirizzo"
          id="address"
          class="transition-all align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          v-model="choices.address"
          required
        />
        <div v-if="errors?.address" class="text-red-500">
          {{ errors.address[0] }}
        </div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-4">
        <label for="phone">Telefono</label>
        <input
          type="text"
          name="Telefono"
          id="phone"
          class="transition-all align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          v-model="choices.phone"
          required
        />
        <div v-if="errors?.phone" class="text-red-500">
          {{ errors.phone[0] }}
        </div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-4">
        <label for="email">Email</label>
        <input
          type="email"
          name="Email"
          id="email"
          class="transition-all align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          v-model="choices.email"
          required
        />
        <div v-if="errors?.email" class="text-red-500">
          {{ errors.email[0] }}
        </div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-4">
        <label for="password">Password</label>
        <input
          type="text"
          name="Password"
          id="password"
          class="transition-all align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          v-model="choices.password"
          required
        />
        <div v-if="errors?.password" class="text-red-500">
          {{ errors.password[0] }}
        </div>
      </fieldset>
      <fieldset class="flex flex-col items-stretch my-4">
        <label for="confirmPassword">Conferma Passowrd</label>
        <input
          type="text"
          name="Conferma Passowrd"
          id="confirmPassword"
          class="transition-all align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
          v-model="choices.confirmPassword"
          required
        />
        <div v-if="errors?.confirmPassword" class="text-red-500">
          {{ errors.confirmPassword[0] }}
        </div>
      </fieldset>
      <button
        type="submit"
        @submit="submit"
        class="mx-10 my-7 px-2 py-1 rounded-xl text-white font-bold bg-brandBlue-500/95 hover:bg-brandBlue-500"
      >
        {{ action }} Account
      </button>
    </form>
    <div v-if="asyncErrors?.errors" class="text-red-500">
      Woops! Qualcosa è andato storto, riprova.
    </div>
  </NuxtLayout>
</template>
