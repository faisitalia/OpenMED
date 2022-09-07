import { client, usersUri } from "@/utils/client";
import { useLocalStorage } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import useAuth from "./useAuth";

type User = {
  id: string;
  username: string;
  email: string;
  roles: Role[];
};
// User's Roles
enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  NURSE = "NURSE",
  PATIENT = "PATIENT",
  CAREGIVER = "CAREGIVER",
  USER = "USER",
  PUBLISHER = "PUBLISHER",
}
const roles = Object.keys(Role);

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
    console.log(data);

    const userRoles = data?.roles
      ?.map((value: any) => value?.name)
      ?.filter((role: any) => !roles.includes(role));

    user.value = {
      id: data?.currentUser?.id,
      username: data?.currentUser?.username,
      email: data?.currentUser?.email,
      roles: userRoles,
    };
  }

  const email = computed(() => user.value?.email);
  const username = computed(() => user.value?.username);

  const isSuperAdmin = computed(
    () => !!user.value?.roles?.includes(Role.SUPER_ADMIN)
  );
  const isAdmin = computed(() => !!user.value?.roles?.includes(Role.ADMIN));
  const isCaregiver = computed(
    () => !!user.value?.roles?.includes(Role.CAREGIVER)
  );
  const isDoctor = computed(() => !!user.value?.roles?.includes(Role.DOCTOR));
  const isNurse = computed(() => !!user.value?.roles?.includes(Role.NURSE));
  const isPatient = computed(() => !!user.value?.roles?.includes(Role.PATIENT));
  const isPublisher = computed(
    () => !!user.value?.roles?.includes(Role.PUBLISHER)
  );
  const isUser = computed(() => !!user.value?.roles?.includes(Role.USER));

  return {
    getUser,
    email,
    username,
    isUser,
    isSuperAdmin,
    isAdmin,
    isCaregiver,
    isDoctor,
    isNurse,
    isPatient,
    isPublisher,
  };
});
