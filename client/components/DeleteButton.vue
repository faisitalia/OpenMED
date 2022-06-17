<script>
  import { slide } from 'svelte/transition';
  import StyledButton from '$lib/shared/StyledButton.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let areYousure = false;
</script>

<StyledButton
  on:click={() => (areYousure = true)}
  colors="bg-brandBlue-50/20 hover:bg-brandBlue-50/40"
>
  <slot />
</StyledButton>
{#if areYousure}
  <div transition:slide={{ duration: 100 }} class="flex flex-col items-center my-4">
    <p class="mb-4 text-center">Sei <strong>sicuro</strong> di voler ELIMINARE quest'utente?</p>
    <!-- TODO delete this user -->
    <StyledButton on:click={() => dispatch('delete')}><span class="px-4">Sì</span></StyledButton>
    <StyledButton
      on:click={() => (areYousure = !areYousure)}
      colors="bg-brandBlue-50/20 hover:bg-brandBlue-50/40"
    >
      <span class="px-4">No</span>
    </StyledButton>
  </div>
{/if}
