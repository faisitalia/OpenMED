<script setup lang="ts">
import { ref } from "vue";

import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

import { useAuth } from "@/composables/useAuth";

import StyledButton from "../../components/StyledButton.vue";
import { useUser } from "@/composables/useUser";

useHead({ title: `Login` });
const { login } = useAuth();
const { getUser } = useUser();
const { push } = useRouter();

const username = ref<string>("");
const usernameMessages = { required: "Inserisci il tuo username" };
const password = ref<string>("");
const passwordMessages = { required: "Inserisci la tua password" };

const submitError = ref<string>();
const hasStarted = ref(false);

async function loginWithCredentials() {
  try {
    // username: choices.value.username,
    // password: choices.value.password,

    await login({
      username: username.value,
      password: password.value,
    });

    submitError.value = "";

    await getUser();

    push("/");
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

      <div class="flex flex-col justify-center items-center" v-else>
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
              :validation-messages="usernameMessages"
              placeholder="your@email.com"
              input-class="appearance-none my-1 px-3 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
              message-class="text-red-500"
              v-model="username"
            />
          </fieldset>
          <fieldset>
            <FormKit
              type="password"
              name="password"
              label="Password"
              validation="required"
              :validation-messages="passwordMessages"
              input-class="appearance-none my-1 px-3 py-1 rounded-3xl bg-brandBlue-50/25 hover:bg-brandBlue-50/40"
              message-class="text-red-500"
              v-model="password"
            />
          </fieldset>
          <FormKit
            type="submit"
            name="submit-button"
            label="Accedi"
            outer-class="my-2"
            input-class="submit inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          />
        </FormKit>
        <div v-if="submitError" class="my-8 text-center text-red-500">
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
</template>
