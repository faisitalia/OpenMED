import axios from "axios";

const uri = "https://localhost:3001/v1";

export const usersUri = `/users`;
export const visitsUri = `/visits`;
export const facilitiesUri = `/facilities`;

export const client = axios.create({
  baseURL: uri,
  timeout: 5000,
});
