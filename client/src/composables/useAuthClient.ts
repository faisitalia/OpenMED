import { storeToRefs } from "pinia";
import { createFetch } from "@vueuse/core";
import { baseFetchOptions, baseOptions, baseUri } from "@/uri";
import { useAuth } from "./useAuth";
import { useUser } from "./useUser";

export const useAuthClient = createFetch({
  baseUrl: baseUri,
  fetchOptions: { ...baseFetchOptions },
  options: {
    ...baseOptions,
    beforeFetch: ({ options }) => {
      const { accessToken } = storeToRefs(useAuth());

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken.value}`,
      };
    },
    afterFetch: async (ctx) => {
      console.log("response status:");
      console.log(ctx.response.status);
      return ctx;
    },
    onFetchError: async (ctx) => {
      console.log("Problems with useAuthClient");
      if (ctx.response?.status === 401) {
        const { logout } = useAuth();
        console.log("Authentication expired");
        try {
          // Try to refresh this with `client`
          throw "No refresh logic implemented, yet";
        } catch (e) {
          console.log(e);
          // If the refresh fails, logout the user
          await logout();
        }
      }

      return ctx;
    },
  },
});
