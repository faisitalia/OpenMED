<script setup>
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
    class="hidden sm:flex flex-col justify-start top-auto py-4 px-8 bg-brandBlue-500"
  >
    <!-- Desktop Nav Bar -->
    <img
      class="my-10"
      src="img/logo-openmed/openmed-logo-white.svg"
      alt="Il logo di openmed."
    />
    <nav class="self-stretch">
      <ul class="flex flex-col items-start list-none">
        <LayoutDesktopMenuItem to="/" name="Home" />
        <LayoutDesktopMenuItem to="/users" name="Gestisci Utenti" />
        <LayoutDesktopMenuItem
          to="/appointments/edit"
          name="Crea Appuntamento"
        />
        <LayoutDesktopMenuItem to="/appointments" name="Lista Appuntamenti" />
        <LayoutDesktopMenuItem to="/" name="Contatti" />
        <div class="my-8"></div>
        <li
          @click="logoutAndClearUser"
          class="font-bold text-lg text-white py-2"
        >
          <button>Esci</button>
        </li>
      </ul>
    </nav>

    <div class="flex-grow" />

    <!-- Doctor's image in desktop view mode only -->
    <img
      class="my-4 self-center"
      src="/img/doctors.svg"
      alt="A sketch of three doctors smile and look helpful"
    />
    <div class="flex-grow" />

    <!-- FAIS's logo in desktop view mode only -->
    <img
      class="my-4 min-w-[1rem] max-w-[7rem] self-center place-self-end"
      src="img/logo-fais/logo-fais-white@2x.png"
      alt="FAIS logo"
    />
  </header>
</template>
