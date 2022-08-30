<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useField } from "vee-validate";
import { useHead } from "@vueuse/head";

import useAuth from "@/composables/useAuth";

import StyledButton from "../../components/StyledButton.vue";

useHead({ title: `Login` });
const { login } = useAuth();
const { replace } = useRouter();

const hasStarted = ref(false);

// Initialize form values
const { value: username, errorMessage: usernameError } = useField<string>(
  "email",
  (val) => {
    if (!val) return "Devi inserire il tuo username";

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(val).toLowerCase()))
      return "Devi inserire un indirizzo email valido";

    return true;
  }
);
const { value: password, errorMessage: passwordError } = useField<string>(
  "password",
  (val) => {
    if (!val) return "Devi inserire la tua password";

    if (val.length < 4) return "Password troppo corta";

    return true;
  }
);

const submitError = ref<string>();

async function loginWithCredentials() {
  if (usernameError.value) return;
  if (passwordError.value) return;

  try {
    // username: choices.value.username,
    // password: choices.value.password,

    await login({
      username: username.value,
      password: password.value,
    });

    submitError.value = "";
    replace("/");
  } catch (err) {
    console.log(err);
    submitError.value = (err as any)?.statusText;
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
                v-model="username"
                required
              />
            </fieldset>
            <div v-if="usernameError" class="my-4 text-red-500">
              {{ usernameError }}
            </div>
            <fieldset>
              <input
                label="Password"
                placeholder="password"
                id="psw"
                name="psw"
                type="password"
                class="my-1 appearance-none px-2 py-1 bg-brandBlue-50/25 hover:bg-brandBlue-50/40 shadow-sm rounded-3xl"
                v-model="password"
              />
            </fieldset>
            <div v-if="passwordError" class="my-4 text-red-500">
              {{ passwordError }}
            </div>
            <button
              type="submit"
              class="submit inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Accedi
            </button>
          </form>
          <div v-if="submitError" class="my-4 text-center text-red-500">
            {{ submitError }}
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
