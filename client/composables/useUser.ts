export const useUser = () =>
  useState("user", () => async () => {
    const { $usersEndpoint } = useNuxtApp();
    const { isAuthenticated, state } = useAuth();

    if (!isAuthenticated) {
      sessionStorage?.removeItem("user");

      return null;
    }

    const sessionValue = JSON.parse(sessionStorage?.getItem("user"));
    if (sessionValue == null) {
      const token = state.value.accessToken;
      const { error, data } = await useFetch(
        `${$usersEndpoint()}/currentuser`,
        {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log("data:", data?.value);
      console.log("error:", error?.value);

      // TODO add this to the session value
      return { currentUser: null };
    }

    return { ...sessionValue };
  });
