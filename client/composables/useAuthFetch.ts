import { FetchOptions } from "ohmyfetch";

export const useAuthFetch = (url: string, options?: FetchOptions) => {
  const {
    auth: {
      value: { accessToken },
    },
  } = useAuth();

  // TODO: verify how to give useAuthFetch the same interface
  return useFetch<any>(url, {
    ...options,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
