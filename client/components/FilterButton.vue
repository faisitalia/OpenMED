<script>
  import StyledButton from '$lib/shared/StyledButton.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let isApplied = false;
  function apply() {
    isApplied = !isApplied;
    dispatch('apply');
  }

  $: isBold = isApplied ? 'font-bold' : 'font-normal';
  $: color = isApplied ? 'text-brandBlue-500' : 'text-brandBlue-50';
</script>

<StyledButton
  on:click={apply}
  colors="{color} hover:text-brandBlue-500 hover:bg-brandBlue-50/50"
  spaces="my-2 px-3 py-1"
  class="rounded-full {isBold}"
>
  <slot />
</StyledButton>
