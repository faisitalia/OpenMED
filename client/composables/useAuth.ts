type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
};

type AuthState = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
};

type OpenMedCredentials = {
  username: string;
  password: string;
};

export const useAuth = () => {
  const { $usersEndpoint } = useNuxtApp();

  const auth = useState<AuthState>("auth", () => {
    const sessionValue = JSON.parse(sessionStorage?.getItem("auth"));

    return { ...sessionValue };
  });

  async function login(credentials: OpenMedCredentials): Promise<void> {
    const { error, data } = await useFetch<AuthResponse>(
      `${$usersEndpoint()}/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...credentials }),
        pick: [
          "access_token",
          "refresh_token",
          "expires_in",
          "refresh_expires_in",
        ],
      }
    );
    if (error.value) throw error.value;
    if (data.value) console.log(data.value);

    auth.value = {
      accessToken: data.value?.access_token,
      expiresIn: data.value?.expires_in,
      refreshToken: data.value?.refresh_token,
      refreshExpiresIn: data.value?.refresh_expires_in,
    };

    sessionStorage?.setItem("auth", JSON.stringify(auth.value));
  }

  // Getters
  const isAuthenticated = !!auth.value?.accessToken;

  async function refreshAccessToken() {
    return; // TODO reactivate this once the logic is defined

    if (!isAuthenticated) return;

    // TODO AuthResponse ???
    const { data, error } = await useFetch<AuthResponse>(
      `${$usersEndpoint}/refreshToken`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ refreshToken: auth.value.refreshToken }),
      }
    );

    if (error.value) return;

    auth.value = {
      ...auth.value,
      accessToken: data.value?.access_token,
    };
  }

  const refreshLoop = setInterval(
    refreshAccessToken,
    auth.value?.expiresIn * 1000
  );
  setTimeout(
    () => clearInterval(refreshLoop),
    auth.value?.refreshExpiresIn * 1000
  );

  async function logout(): Promise<void> {
    const { data, error } = await useFetch(`${$usersEndpoint}/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.value.accessToken}`,
      },
    });
    if (error.value) console.log(error.value);
    if (data.value) console.log(data.value);

    sessionStorage?.removeItem("auth");
    auth.value = null;
    clearInterval(refreshLoop);
  }

  return {
    auth,
    isAuthenticated,
    login,
    logout,
  };
};
