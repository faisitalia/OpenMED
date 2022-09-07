import { client, usersUri } from "@/utils/client";
import { useLocalStorage } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import useAuth from "./useAuth";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export const useUser = defineStore("user", () => {
  const { isAuthenticated, accessToken } = storeToRefs(useAuth());
  const localValue = useLocalStorage<User | null>("user", null);

  const user = ref<User | null>(localValue.value);

  watch(user, (_, newUser) => {
    localValue.value = newUser;
  });

  watchEffect(() => {
    if (!isAuthenticated.value) {
      user.value = null;
      return;
    }
    try {
      getUser();
    } catch (e) {
      console.log(e);
    }
  });

  async function getUser(): Promise<void> {
    const response = await client.get(`${usersUri}/currentuser`, {
      headers: { Authorization: `Bearer ${accessToken.value}` },
    });

    const data = response.data;

    user.value = {
      firstName: data?.currentUser?.given_name,
      lastName: data?.currentUser?.family_name,
      email: data?.currentUser?.email,
      username: data?.currentUser?.preferred_username,
    };
  }

  const fullName = computed(() => {
    if (!user.value) return "Utente";
    if (!user.value.firstName || !user.value.lastName) return "utente";

    return `${user.value?.firstName} ${user.value?.lastName}`;
  });
  const email = computed(() => user.value?.email);
  const username = computed(() => user.value?.username);

  return { getUser, fullName, email, username };
});
