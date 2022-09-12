import { storeToRefs } from "pinia";
import { createFetch } from "@vueuse/core";
import { baseFetchOptions, baseOptions, baseUri } from "@/uri";
import { useAuth } from "./useAuth";

export const useAuthClient = createFetch({
  baseUrl: baseUri,
  fetchOptions: {
    ...baseFetchOptions,
  },
  options: {
    ...baseOptions,
    beforeFetch: ({ options }) => {
      const { accessToken } = storeToRefs(useAuth());

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken.value}`,
      };
    },
    onFetchError: (ctx) => {
      const { logout } = useAuth();

      if (ctx.response?.status === 401) {
        try {
          // Try to refresh this with `client`
          throw "Unimplemented Error";
        } catch (e) {
          // If the refresh fails, logout the user
          logout();
        }
      }

      return ctx;
    },
  },
});
