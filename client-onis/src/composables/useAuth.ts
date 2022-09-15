import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { usersUri } from "@/uri";
import { useClient } from "./useClient";
import { useAuthClient } from "./useAuthClient";

// type AuthInfo = {
//   accessToken: string;
//   expiresIn: number;
//   refreshToken: string;
//   refreshExpiresIn: number;
// };

export interface OpenMedCredentials {
  username: string;
  password: string;
}

export const useAuth = defineStore("auth", () => {
  const localValue = useLocalStorage<string | null>("auth", null);

  const accessToken = ref<string | null>(localValue.value);

  // TODO properly handle refresh logic
  // const expiresIn = ref<number | undefined>(localValue.value?.expiresIn);
  // const refreshToken = ref<string | undefined>(localValue.value?.refreshToken);
  // const refreshExpiresIn = ref<number | undefined>(
  // localValue.value?.refreshExpiresIn
  // );

  watch(accessToken, (token) => {
    localValue.value = token;
  });

  const isAuthenticated = computed(() => !!accessToken.value);

  async function login(credentials: OpenMedCredentials): Promise<void> {
    const { data } = await useClient(`${usersUri}/signin`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ ...credentials }),
    });

    const response = JSON.parse(data.value as string);

    accessToken.value = response?.access_token;
    // expiresIn.value = data?.expires_in;
    // refreshToken.value = data?.refresh_token;
    // refreshExpiresIn.value = data?.refresh_expires_in;
  }

  async function logout(): Promise<void> {
    try {
      const { response } = await useAuthClient(`${usersUri}/signout`, {
        method: "POST",
      });

      const status = response.value?.status;

      if (status === undefined || status >= 300) {
        throw response.value?.statusText;
      }
    } finally {
      accessToken.value = null;
      // expiresIn.value = undefined;
      // refreshToken.value = undefined;
      // refreshExpiresIn.value = undefined;
    }
  }

  return {
    isAuthenticated,
    accessToken,
    login,
    logout,
  };
});

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
