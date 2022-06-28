type AuthState = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
};

export const useAuth = () => {
  const state = useState<AuthState>("auth", () => {
    const sessionValue = JSON.parse(sessionStorage?.getItem("auth"));

    return { ...sessionValue };
  });

  const isAuthenticated = !!state.value?.accessToken;

  function login(data: any): void {
    state.value = {
      accessToken: data?.access_token,
      expiresIn: data?.expires_in,
      refreshToken: data?.refresh_token,
      refreshExpiresIn: data?.refresh_expires_in,
    };
    sessionStorage?.setItem("auth", JSON.stringify(state.value));
  }

  function logout(): void {
    sessionStorage.removeItem("auth");
    state.value = null;
  }

  return { state, isAuthenticated, login, logout };
};
