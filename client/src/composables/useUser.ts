import { client, usersUri } from "@/utils/client";
import { useLocalStorage } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import useAuth from "./useAuth";

// TODO use this type to parse the user response
// type UserResponse = {
//   currentUser: {
//     sub: string;
//     email_verified: boolean;
//     name: string;
//     preferred_username: string;
//     given_name: string;
//     family_name: string;
//     email: string;
//   };
// };

type User = {
  name: string;
  surname: string;
  email: string;
  username: string;
};

export const useUser = defineStore("user", () => {
  const { isAuthenticated } = storeToRefs(useAuth());
  const localValue = useLocalStorage<User | null>("user", null);

  const user = ref<User | null>(localValue.value);

  watch(user, (_, newUser) => {
    localValue.value = newUser;
  });

  watchEffect(() => {
    if (isAuthenticated.value) getUser();

    user.value = null;
  });

  async function getUser(): Promise<void> {
    const response = await client.get(`${usersUri}/currentuser`);

    if (response.status >= 300) throw response.statusText;
    // if (data.value) console.log(data.value);

    const data = response.data;
    user.value = {
      name: data.value?.currentUser?.given_name,
      surname: data.value?.currentUser?.family_name,
      email: data.value?.currentUser?.email,
      username: data.value?.currentUser?.preferred_username,
    };
  }

  const fullName = computed(() => `${user.value?.name} ${user.value?.surname}`);
  const email = computed(() => user.value?.email);
  const username = computed(() => user.value?.username);

  return { user, getUser, fullName, email, username };
});
