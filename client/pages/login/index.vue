<script setup>
import { validate } from "validate.js";
// import { usersEndpoint } from "$lib/uri.js"; // TODO use composable

useRouter();
useHead({
  title: `Login`,
});
let hasStarted = false;

// Initialize form values
const form = {
  username: undefined,
  password: undefined,
};

// Initialize form constraints
const formConstraints = {
  username: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire un username`,
    },
    // We are NOT checking a proper email since this mode is deprecated
  },
  password: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire la tua password`,
    },
  },
};
let errors;
let asyncErrors;

async function getUserData() {
  const response = await fetch(`${usersEndpoint}/currentuser`, {
    credentials: "include",
  });
  // If something goes wrong with this call, we can't authenticate
  if (!response.ok) return null;

  // If we got a proper response body, we extract its currentUser prop
  const responseBody = await response.json();
  const currentUser = responseBody.currentUser;
  if (!currentUser) return null;

  return { ...currentUser };
}

async function logIn() {
  // Form validation
  errors = validate(form, formConstraints);
  if (errors) {
    console.log(errors);
    return;
  }

  // Log in request
  try {
    const response = await fetch(`${usersEndpoint}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    });
    if (response.ok) {
      asyncErrors = null;
      $session = await getUserData();
      navigateTo("/");
    } else {
      const errors = await response.json();
      asyncErrors = "Attenzione: qualcosa è andato storto.";
      console.log(errors);
    }
  } catch (err) {
    console.log(err);
    asyncErrors = "Attenzione: qualcosa è andato storto. Riprova più tardi.";
  }
}
</script>

<template>
  <NuxtLayout name="empty">
    <div
      class="bg-no-repeat bg-center bg-cover bg-[url('img/login-background.png')] h-screen flex flex-col px-8 py-16 items-center justify-between"
    >
      <img
        src="img/logo-openmed/openmed-logo-full.svg"
        alt="Il logo di Openmed"
      />
      <div id="login" class="grid grid-rows-1 grid-cols-1">
        <StyledButton
          v-if="!hasStarted"
          @click="hasStarted = true"
          class="font-bold"
          spaces="px-16 py-2"
        >
          Inizia
        </StyledButton>
        <div v-else>
          <p class="my-4">Inserisci il tuo username e la tua password</p>
          <form
            @submit.prevent="logIn"
            id="signin"
            class="flex flex-col justify-center items-center"
          >
            <!-- TODO: valutare se aggiungere delle label per accessibilità -->
            <fieldset>
              <input
                type="text"
                name="Username"
                placeholder="username"
                id="username"
                class="my-1 text-center align-middle appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
                :value="form.username"
              />
            </fieldset>
            <div v-if="errors?.username" class="my-4 text-red-500">
              {{ errors.username[0] }}
            </div>
            <fieldset>
              <input
                label="Password"
                placeholder="password"
                id="psw"
                name="psw"
                type="password"
                class="my-1 appearance-none px-2 py-1 bg-brandBlue-50/25 hover:bg-brandBlue-50/40 shadow-sm rounded-3xl"
                :value="form.password"
              />
            </fieldset>
            <div v-if="errors?.password" class="my-4 text-red-500">
              {{ errors.password[0] }}
            </div>
            <button
              type="submit"
              class="submit inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              @click="logIn"
            >
              Accedi
            </button>
          </form>
          <div v-if="asyncErrors" class="my-4 text-center text-red-500">
            {{ asyncErrors }}
          </div>
        </div>
      </div>

      <img
        class="w-40"
        src="img/logo-fais/logo-fais.png"
        alt="Il logo di FAIS"
      />
    </div>
  </NuxtLayout>
</template>
