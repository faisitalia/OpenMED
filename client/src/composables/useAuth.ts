import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { client, usersUri } from "@/utils/client";
import axios from "axios";

type AuthInfo = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
};

export interface OpenMedCredentials {
  username: string;
  password: string;
}

const useAuth = defineStore("auth", () => {
  const localValue = useLocalStorage<AuthInfo | null>("auth", null);
  // TODO properly save and retrieve data from local storage avoiding XSS attacks.
  // TODO properly handle refresh logic

  const accessToken = ref<string | undefined>(localValue.value?.accessToken);
  // const expiresIn = ref<number | undefined>(localValue.value?.expiresIn);
  // const refreshToken = ref<string | undefined>(localValue.value?.refreshToken);
  // const refreshExpiresIn = ref<number | undefined>(
  // localValue.value?.refreshExpiresIn
  // );

  const isAuthenticated = computed(() => !!accessToken.value);
  const token = computed(() => accessToken);

  async function login(credentials: OpenMedCredentials): Promise<void> {
    const response = await client.post(
      `${usersUri}/signin`,
      JSON.stringify({ ...credentials }),
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;

    accessToken.value = data?.access_token;
    // expiresIn.value = data?.expires_in;
    // refreshToken.value = data?.refresh_token;
    // refreshExpiresIn.value = data?.refresh_expires_in;
  }

  async function logout(): Promise<void> {
    const response = await axios.post(`${usersUri}/signout`);

    if (response.status >= 300) throw response.statusText;

    accessToken.value = undefined;
    // expiresIn.value = undefined;
    // refreshToken.value = undefined;
    // refreshExpiresIn.value = undefined;
  }

  return {
    isAuthenticated,
    token,
    login,
    logout,
  };
});

export default useAuth;

// OLD NUXT logic --> TODO use the following logic for the refresh token
// const useAuth = () => {
//   async function refreshAccessToken() {
//     if (!isAuthenticated) return;

//     // TODO AuthResponse ???
//     const { data, error } = await useFetch<AuthResponse>(
//       `${$usersEndpoint}/refreshToken`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },

//         body: JSON.stringify({ refreshToken: auth.value.refreshToken }),
//       }
//     );

//     if (error.value) return;

//     auth.value = {
//       ...auth.value,
//       accessToken: data.value?.access_token,
//     };
//   }

//   const refreshLoop = setInterval(
//     refreshAccessToken,
//     auth.value?.expiresIn * 1000
//   );
//   setTimeout(
//     () => clearInterval(refreshLoop),
//     auth.value?.refreshExpiresIn * 1000
//   );
// };

// TEMP
// const user = computed(() => {
//   if (isAuthenticated) return localValue.value;

//   return null;
// });

// watchEffect(() => {
//   localValue.value = user.value;
// });
