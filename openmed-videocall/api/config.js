const axios = require("axios");

/**
 * Server configuration for the REST APIs
 */
axios.defaults.withCredentials = true;
const apiServer = axios.create({
  baseURL: "https://localhost:3001",
});

module.exports = apiServer;
