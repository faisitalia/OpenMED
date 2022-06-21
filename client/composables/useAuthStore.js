import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    let savedValue;
    savedValue = JSON.parse(sessionStorage.getItem("auth"));

    return {
      accessToken: savedValue?.accessToken,
      refreshToken: savedValue?.refreshToken,
      expiresAt: savedValue?.expiresAt,
      refreshExpiresAt: savedValue?.refreshExpiresAt,
    };
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    login(data) {
      this.accessToken = data?.access_token;
      this.refreshToken = data?.refresh_token;

      this.expiresAt = data?.expires_in;
      this.refreshExpiresAt = data?.refresh_expires_in;

      sessionStorage.setItem("auth", JSON.stringify(this.$state));
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.expiresIn = null;
      this.refreshExpiresIn = null;
      sessionStorage.removeItem("auth");
    },
  },
});
