import type { UseFetchOptions } from "@vueuse/core";

const baseUri = "https://localhost:3001/v1";
const usersUri = `/users`;
const visitsUri = `/visits`;
const facilitiesUri = `/facilities`;

const baseFetchOptions: RequestInit = {
  credentials: "include",
  mode: "cors",
};

const baseOptions: UseFetchOptions = { timeout: 5000 };

export {
  baseUri,
  usersUri,
  visitsUri,
  facilitiesUri,
  baseFetchOptions,
  baseOptions,
};
