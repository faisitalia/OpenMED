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
      console.log("token: ", token);
      console.log(
        "token:",
        "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhUFNTYm1KbVh0bVMwRE0zU2RPNy1YOU1yM19FWnBKR21tdnpOZWlFQlVRIn0.eyJleHAiOjE2NTY0MjI1NDksImlhdCI6MTY1NjQyMjQ4OSwianRpIjoiODYyMjUyOGMtNTBmZi00Y2I5LTg4MGEtOGE1ZDk5ZTQyYjk4IiwiaXNzIjoiaHR0cHM6Ly8xMjcuMC4wLjE6ODQ0My9hdXRoL3JlYWxtcy9PcGVuTUVEIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImE5ZGRjM2I0LWRlMDEtNGQ2NC04NGU2LTYzZWQ1OTc0MmRjYyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwaS1zZXJ2ZXIiLCJzZXNzaW9uX3N0YXRlIjoiZGFhN2M3MjUtNGY4NS00OTNhLWE4YWYtY2ZlMDBjOGZkNzcxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2xvY2FsaG9zdDozMDAxIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW9wZW5tZWQiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZGFhN2M3MjUtNGY4NS00OTNhLWE4YWYtY2ZlMDBjOGZkNzcxIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJKb2huIERvZSIsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIiLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwiZW1haWwiOiJ1c2VyQG9wZW5tZWQudGVzdCJ9.ZsE1XaanO8eDbjDi0y0SJSJ9T74AVBUBCr_p5DlR9X2D7rAzvJSwr3RiPmnKRWXyMJ_r60yajji3HGoi-AFv8J_u8_vg0qrrKCJEOEokSpUN-_L_D3m0WMw-QeQ8zZa0wCYRUAANaJ2qXjymc_eRlJ0golcHnZq7HY8geXmdPPWYbpi320WwrOOEqmiUcEYSLvarwTHvKT8zsRAuMzsLCBntsUYZeh15jsDYJP-PoZxJM7efe1ovmmHR47DcXN7f6RI41MkmYrEwFjA61VyFgXPL0tHnfba95sNKozlDaov3t38srHq6vEDRWtLd4JGzz1qppF2RhqU5pjYiIYGvYQ"
      );
      const { error, data } = await useFetch(
        `${$usersEndpoint()}/currentuser`,
        {
          method: "GET",
          credentials: "include",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("data received:", data?.value);
      console.log("error received:", error.value.response);

      // TODO add this to the session value
      return { currentUser: null };
    }

    return { ...sessionValue };
  });

//   fetch('https://localhost:3001/v1/users/currentUser', credential: 'include', Headers: {'Authorization': `Bearer ${token}`} )
