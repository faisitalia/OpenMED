<script>
  import { createEventDispatcher } from 'svelte';

  export { classes as class };
  let classes = 'rounded-3xl';

  export let colours = 'text-white bg-brandBlue-500 hover:bg-brandBlue-700';
  export let spaces = 'px-4 py-2 my-1';

  const dispatch = createEventDispatcher();
</script>

<button
  class="{classes} {colours} {spaces}"
  on:click|stopPropagation|preventDefault={() => dispatch('click')}
>
  <slot />
</button>
