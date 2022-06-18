<script setup>
useRouter();

const isDrawerOpen = ref(false);

// Old SvelteKit code:
// async function logout() {  // TODO reimplement here on Nuxt3
//   await fetch(`${usersEndpoint}/signout`, {  // TODO use a composable
//     method: 'POST',
//     credentials: 'include'
//   });
//   $session = null;
//   goto('/login');
// }

const overlay = computed(() => (isDrawerOpen ? "fixed" : "hidden"));
const gridLayout = computed(() =>
  isDrawerOpen ? "md:grid-cols-[auto_1fr]" : "grid-cols-[1fr]"
);
</script>

<!-- reimplement the logout button later on -->
<!-- {#if userId}
  <p on:click|preventDefault={() => logout()}>Done? Logout here</p>
{/if} -->
<template>
  <div>
    <div
      class="{{overlay}} z-10 top-20 md:hidden w-full h-full bg-brandBlack-50 opacity-40"
      @click="isDrawerOpen = false"
    />

    <!-- Mobile Nav Bar -->
    <div
      v-if="isDrawerOpen"
      class="fixed md:hidden items-center transition-all bg-white top-20 z-40 p-4 pb-20 w-full right-0"
    >
      <!-- Openmed's big logo here -->
      <nav class="self-stretch">
        <ul class="flex flex-col items-end list-none">
          <NuxtLink to="/"><li class="font-light py-2">Home</li></NuxtLink>
          <NuxtLink to="/">
            <li class="font-light py-2">Gestisci Utenti</li>
          </NuxtLink>
          <NuxtLink to="/">
            <li class="font-light py-2">Crea Appuntamento</li>
          </NuxtLink>
          <NuxtLink to="/">
            <li class="font-light py-2">Lista Appuntamenti</li>
          </NuxtLink>
          <NuxtLink to="/"><li class="font-light py-2">Contatti</li></NuxtLink>
        </ul>
      </nav>
    </div>

    <!-- We're layouting the whole app with a simple gridview -->
    <div class="grid grid-flow-col {{gridLayout}}">
      <!-- Desktop Nav Bar -->
      <div
        v-if="isDrawerOpen"
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
            <NuxtLink to="/">
              <li class="font-bold text-lg text-white py-2">Home</li>
            </NuxtLink>
            <NuxtLink to="/">
              <li class="font-bold text-lg text-white py-2">Gestisci Utenti</li>
            </NuxtLink>
            <NuxtLink to="/">
              <li class="font-bold text-lg text-white py-2">
                Crea Appuntamento
              </li>
            </NuxtLink>
            <NuxtLink to="/">
              <li class="font-bold text-lg text-white py-2">
                Lista Appuntamenti
              </li>
            </NuxtLink>
            <NuxtLink to="/">
              <li class="font-bold text-lg text-white py-2">Contatti</li>
            </NuxtLink>
          </ul>
        </nav>

        <!-- Doctor's image in desktop view mode only -->
        <img
          class="hidden md:block mt-28 mb-4 self-center"
          src="/img/doctors.svg"
          alt="A sketch of three doctors smile and look helpful"
        />

        <!-- FAIS's logo in desktop view mode only -->
        <img
          class="hidden md:block mt-28 w-32 self-center"
          src="img/logo-fais/logo-fais-white@2x.png"
          alt="FAIS logo"
        />
      </div>

      <div class="relative min-h-screen flex flex-col">
        <!-- Drawer Button + Small Logo -->
        <header
          class="p-6 flex flex-row justify-between md:justify-end items-center"
        >
          <!-- OpenMed's small logo -->
          <div class="md:hidden">
            <NuxtLink to="/">
              <img
                src="/img/logo-openmed/openmed-logo.svg"
                alt="Il logo di openmed."
              />
            </NuxtLink>
          </div>

          <!-- Drawer Button -->
          <div
            class="flex w-10 h-10 rounded-lg hover:bg-brandBlue-50/20 justify-center items-center"
          >
            <button
              class="material-icons-round focus:outline-none text-5xl text-brandGreen-500"
              @click.prevent="isDrawerOpen = !isDrawerOpen"
            >
              menu
            </button>
          </div>
        </header>

        <main
          class="transition-all px-4 {isDrawerOpen ? 'blur-sm' : 'blur-none'} md:blur-none"
        >
          <slot />
        </main>

        <footer />
      </div>
    </div>

    <!-- TODO: add static footer -->
  </div>
</template>
