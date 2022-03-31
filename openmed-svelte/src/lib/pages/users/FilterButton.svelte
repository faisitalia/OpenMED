<script>
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

<span
  on:click|preventDefault={apply}
  class="hover:bg-brandBlue-50/50 cursor-pointer rounded-full my-2 {color} hover:text-brandBlue-500 text-center {isBold} px-3 py-1"
>
  <slot />
</span>
