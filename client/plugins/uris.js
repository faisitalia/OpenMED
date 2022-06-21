export default defineNuxtPlugin(() => {
  return {
    provide: {
      usersEndpoint: () => `${uri}/users`,
      visitsEndpoint: () => `${uri}/visits`,
      facilitiesEndpoint: () => `${uri}/facilities`,
    },
  };
});

const uri = "https://localhost:3001/v1";
