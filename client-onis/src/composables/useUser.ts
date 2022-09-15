import { computed, ref, watch, watchEffect } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import { useAuth } from "./useAuth";
import { useAuthClient } from "./useAuthClient";
import { usersUri } from "@/uri";

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
  const { isAuthenticated } = storeToRefs(useAuth());
  const localValue = useLocalStorage<string>("user", null);

  const user = ref<User | null>(JSON.parse(localValue.value));

  watch(user, (newUser, _) => {
    if (newUser) localValue.value = JSON.stringify(newUser);
    else localValue.value = null;
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
    const { data } = await useAuthClient(`${usersUri}/currentuser`, {
      method: "GET",
    });

    const response = JSON.parse(data.value as string);

    const userRoles = response?.currentUser?.roles
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.map((value: any) => value?.name)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.filter((role: any) => roles.includes(role)) as Role[];

    user.value = {
      id: response?.currentUser?.id,
      username: response?.currentUser?.username,
      email: response?.currentUser?.email,
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
