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

  const user = useState<User>("user", () => {
    const sessionValue = JSON.parse(sessionStorage?.getItem("user"));

    return { ...sessionValue };
  });

  async function getUser(): Promise<void> {
    const { error, data } = await useAuthFetch(
      `${$usersEndpoint()}/currentuser`,
      { method: "GET" }
    );
    if (error.value) throw error.value;
    if (data.value) console.log(data.value);

    user.value = {
      name: data.value?.currentUser?.given_name,
      surname: data.value?.currentUser?.family_name,
      email: data.value?.currentUser?.email,
      username: data.value?.currentUser?.preferred_username,
    };
    sessionStorage?.setItem("user", JSON.stringify(user.value));
  }

  function removeUser(): void {
    sessionStorage?.removeItem("user");
    user.value = null;
  }

  return { user, getUser, removeUser };
};
