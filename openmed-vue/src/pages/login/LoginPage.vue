<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { validate } from "validate.js";
import { useHead } from "@vueuse/head";

import useAuth, { type OpenMedCredentials } from "@/composables/useAuth";

import StyledButton from "../../components/StyledButton.vue";

useHead({ title: `Login` });
const { login } = useAuth();
const { replace } = useRouter();

const hasStarted = ref(false);

// Initialize form values
const choices = reactive<OpenMedCredentials>({
  username: "",
  password: "",
});

// Initialize form constraints
const formConstraints = {
  username: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire un username`,
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: `^Devi inserire la tua password`,
    },
  },
};
const errors = ref<any>({});
const asyncErrors = ref<any>(null);

// async function getUserData() {
//   const { data: response } = await useFetch(`${$usersEndpoint()}/currentuser`, {
//     mode: "cors",
//     credentials: "include",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//   });
//   // If something goes wrong with this call, we can't authenticate
//   if (!response.ok) return null;

//   // If we got a proper response body, we extract its currentUser prop
//   const responseBody = response;
//   const currentUser = responseBody.currentUser;
//   if (!currentUser) return null;

//   return { ...currentUser };
// }

async function loginWithCredentials() {
  errors.value = validate(choices, formConstraints);
  if (errors.value) return;

  try {
    // username: choices.value.username,
    // password: choices.value.password,

    await login({
      username: choices.username,
      password: choices.password,
    });

    asyncErrors.value = null;
    replace("/");
  } catch (err) {
    console.log(err);
    asyncErrors.value = (err as any)?.statusText;
  }
}
</script>

<template>
  <div>
    <div
      class="bg-no-repeat bg-center bg-cover bg-[url('img/login-background.png')] h-screen flex flex-col px-8 py-16 items-center justify-between"
    >
      <img
        src="@/assets/img/logo-openmed/openmed-logo-full.svg"
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
            @submit.prevent="loginWithCredentials"
            id="signin"
            class="flex flex-col justify-center items-center"
            novalidate
          >
            <fieldset>
              <input
                type="text"
                name="Username"
                placeholder="username"
                id="username"
                class="my-1 appearance-none px-2 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
                v-model="choices.username"
                required
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
                v-model="choices.password"
              />
            </fieldset>
            <div v-if="errors?.password" class="my-4 text-red-500">
              {{ errors.password[0] }}
            </div>
            <button
              type="submit"
              class="submit inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
        src="@/assets/img/logo-fais/logo-fais.png"
        alt="Il logo di FAIS"
      />
    </div>
  </div>
</template>
