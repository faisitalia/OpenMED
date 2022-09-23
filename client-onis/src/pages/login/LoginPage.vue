<script setup lang="ts">
import { ref } from "vue";

import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

import { useAuth } from "@/composables/useAuth";

useHead({ title: `Login` });
const { login } = useAuth();
const { replace } = useRouter();

const username = ref<string>("");
const usernameMessages = { required: "Inserisci il tuo username" };
const password = ref<string>("");
const passwordMessages = { required: "Inserisci la tua password" };

const submitError = ref<string>();

async function loginWithCredentials() {
  try {
    await login({
      username: username.value,
      password: password.value,
    });

    submitError.value = "";
    replace("/");
  } catch (err) {
    console.log(err);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = err as any;

    if (e?.code == "ERR_NETWORK") {
      submitError.value =
        "Woops, sembra che vi siano problemi di comunicazione con il server";
      return;
    }

    submitError.value = "Qualcosa è andato storto; credenziali errate?";
  }
}
</script>

<template>
  <div class="min-h-[45vh] flex items-center justify-center">
    <div
      id="login"
      class="flex flex-col items-center justify-center bg-white bg-opacity-80 px-36 py-12 rounded-3xl"
    >
      <h1 class="text-secondary text-5xl mb-8">Accedi</h1>

      <div class="flex flex-col justify-center items-center">
        <FormKit
          type="form"
          id="signin"
          :actions="false"
          :incomplete-message="false"
          @submit="loginWithCredentials"
        >
          <fieldset>
            <FormKit
              type="text"
              name="text"
              label="Username"
              validation="required"
              placeholder="username"
              :validation-messages="usernameMessages"
              wrapper-class="flex flex-col justify-center items-center"
              label-class="font-semibold text-primary text-center w-96"
              input-class="appearance-none my-1 px-3 py-1 rounded-3xl text-onPrimary bg-primary-50/25 hover:bg-primary-50/40 text-center"
              message-class="self- text-red-500"
              outer-class="w-96 flex flex-col items-center justify-center"
              v-model="username"
            />
          </fieldset>
          <div class="my-4" />
          <fieldset>
            <FormKit
              type="password"
              name="password"
              label="Password"
              validation="required"
              placeholder="password"
              :validation-messages="passwordMessages"
              wrapper-class="flex flex-col justify-center items-center"
              label-class="font-semibold text-primary text-center"
              input-class="appearance-none my-1 px-3 py-1 rounded-3xl text-onPrimary bg-brandBlue-50/25 hover:bg-brandBlue-50/40 text-center"
              message-class="self- text-red-500"
              outer-class="w-96 flex flex-col items-center justify-center"
              v-model="password"
            />
          </fieldset>
          <div class="my-8" />
          <FormKit
            type="submit"
            name="submit-button"
            label="Accedi"
            outer-class="my-2 flex items-center justify-center"
            label-class="font-bold"
            input-class="items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2"
          />
        </FormKit>
        <div v-if="submitError" class="my-8 text-center text-red-500">
          {{ submitError }}
        </div>
      </div>

      <div class="mt-8">
        <!-- TODO add a registration page -->
        <p class="text-primary">
          Non hai un account? <span class="font-bold">Registrati</span>
        </p>

        <!-- TODO think about a "password recovery" flow -->
        <p class="text-primary">Hai dimenticato la password?</p>
      </div>
    </div>
  </div>
</template>
