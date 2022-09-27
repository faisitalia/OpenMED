import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { usersUri } from "@/uri";
import { useClient } from "./useClient";
import { useAuthClient } from "./useAuthClient";

export const useAuth = defineStore("auth", () => {
  const localValue = useLocalStorage<string | null>("auth", null);
  const accessToken = ref<string | null>(localValue.value);
  const isAuthenticated = computed(() => !!accessToken.value);

  watch(accessToken, (token) => {
    localValue.value = token;
  });

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
    } catch (e) {
      console.log(e);
    } finally {
      accessToken.value = null;
      // expiresIn.value = undefined;
      // refreshToken.value = undefined;
      // refreshExpiresIn.value = undefined;
    }
  }

  const redirect = (currentRoute: string) => {
    const isLoggingIn = currentRoute === "login";

    if (isLoggingIn) {
      if (isAuthenticated.value) return "/";

      return;
    }

    if (!isAuthenticated.value) return "/login";

    return;
  };

  return {
    isAuthenticated,
    accessToken,
    login,
    logout,
    redirect,
  };
});

export interface OpenMedCredentials {
  username: string;
  password: string;
}

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
