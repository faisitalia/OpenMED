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
</script>

<!-- reimplement the logout button later on -->
<!-- {#if userId}
  <p on:click|preventDefault={() => logout()}>Done? Logout here</p>
{/if} -->
<template>
  <div>
    <!-- Mobile Menu, open iff we clicked on the drawer button -->
    <LayoutMobileMenu :isOpen="isDrawerOpen" />

    <div class="grid grid-flow-col md:grid-cols-[auto_1fr]">
      <LayoutDesktopMenu />

      <div class="relative min-h-screen flex flex-col">
        <!-- Drawer Button + Small Logo -->
        <header
          class="p-6 flex flex-row justify-between md:justify-end items-center"
        >
          <!-- OpenMed's small logo -->
          <div class="sm:hidden">
            <NuxtLink to="/">
              <img
                src="/img/logo-openmed/openmed-logo.svg"
                alt="Il logo di openmed."
              />
            </NuxtLink>
          </div>

          <!-- Drawer Button -->
          <div
            class="flex sm:hidden rounded-lg hover:bg-brandBlue-50/20 justify-center items-center"
          >
            <button
              class="p-4 material-icons-round focus:outline-none text-brandGreen-500"
              @click.prevent="isDrawerOpen = !isDrawerOpen"
            >
              menu
            </button>
          </div>
        </header>

        <main
          class="transition-all md:blur-none"
          :class="isDrawerOpen ? 'blur-sm' : 'blur-none'"
        >
          <slot />
        </main>

        <footer />
      </div>
    </div>

    <!-- TODO: add static footer -->
  </div>
</template>
