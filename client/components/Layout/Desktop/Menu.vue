<script setup></script>

<template>
  <!-- Desktop Nav Bar -->
  <div
    class="hidden md:flex flex-col justify-start top-auto py-4 px-8 bg-brandBlue-500"
  >
    <!-- Openmed's big white logo here -->
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
  </div>
</template>
