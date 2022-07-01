type UserResponse = {
  currentUser: {
    sub: string;
    email_verified: boolean;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
  };
};

type User = {
  name: string;
  surname: string;
  email: string;
  username: string;
};

export const useUser = () => {
  const { $usersEndpoint } = useNuxtApp();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) sessionStorage?.removeItem("user");

  const user = useState<User>("user", () => {
    const sessionValue = JSON.parse(sessionStorage?.getItem("user"));

    return { ...sessionValue };
  });

  async function getUser(): Promise<void> {
    const { error, data } = await useAuthFetch(
      `${$usersEndpoint()}/currentuser`,
      { method: "GET" }
    );
    // improve this
    console.log("data received:", data?.value);
    console.log("error received:", error.value);

    if (error.value) throw error.value;

    user.value = {
      name: data.value?.currentUser?.given_name,
      surname: data.value?.currentUser?.family_name,
      email: data.value?.currentUser?.email,
      username: data.value?.currentUser?.preferred_username,
    };
    sessionStorage?.setItem("user", JSON.stringify(user.value));
  }

  return { user, getUser };
};
