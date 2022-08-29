import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { client, usersUri } from "@/utils/client";
import axios from "axios";

type AuthInfo = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
};

interface OpenMedCredentials {
  username: string;
  password: string;
}

// TODO use this type to parse the login response
// type LoginResponse = {
//   access_token: string;
//   refresh_token: string;
//   expires_in: number;
//   refresh_expires_in: number;
// };

const useAuth = defineStore("auth", () => {
  const localValue = useLocalStorage<AuthInfo | null>("auth", null);

  const auth = ref<AuthInfo | null>(localValue.value);

  watch(auth, (_, newAuth) => {
    localValue.value = newAuth;
  });

  const isAuthenticated = computed(() => auth?.value?.accessToken);
  const token = computed(() => auth?.value?.accessToken);

  async function login(credentials: OpenMedCredentials): Promise<void> {
    const response = await client.post(`${usersUri}/signin`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...credentials }),
    });

    // TODO better error handling
    if (response.status >= 300) throw response.statusText;

    const data = response.data;
    auth.value = {
      accessToken: data.value?.access_token,
      expiresIn: data.value?.expires_in,
      refreshToken: data.value?.refresh_token,
      refreshExpiresIn: data.value?.refresh_expires_in,
    };
  }

  async function logout(): Promise<void> {
    const response = await axios.post(`${usersUri}/signout`);

    if (response.status >= 300) throw response.statusText;

    auth.value = null;
    // clearInterval(refreshLoop);  // TODO with WATCH (see below for the what)
  }

  return {
    auth,
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
