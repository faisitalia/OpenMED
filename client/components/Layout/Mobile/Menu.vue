<script setup>
defineProps({
  isOpen: Boolean,
});
const { logout } = useAuth();
const { removeUser } = useUser();

async function logoutAndClearUser() {
  await logout();
  removeUser();
  navigateTo("/login");
}
</script>

<template>
  <header
    v-if="isOpen"
    class="p-10 fixed md:hidden items-center transition-all bg-white top-20 z-40 w-full"
  >
    <nav>
      <ul class="flex flex-col items-end list-none">
        <LayoutMobileMenuItem to="/" name="Home" />
        <LayoutMobileMenuItem to="/users" name="Gestisci Utenti" />
        <LayoutMobileMenuItem
          to="/appointments/edit"
          name="Crea Appuntamento"
        />
        <LayoutMobileMenuItem to="/appointments" name="Lista Appuntamenti" />
        <LayoutMobileMenuItem to="/" name="Contatti" />
        <li @click="logoutAndClearUser" class="font-light py-2 my-8">
          <button>Esci</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
