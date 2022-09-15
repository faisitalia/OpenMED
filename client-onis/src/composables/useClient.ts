import { createFetch } from "@vueuse/core";
import { baseFetchOptions, baseOptions, baseUri } from "@/uri";

export const useClient = createFetch({
  baseUrl: baseUri,
  fetchOptions: { ...baseFetchOptions },
  options: { ...baseOptions },
});
