<script>
  import { createEventDispatcher } from 'svelte';

  export { additionalClasses as class };
  let additionalClasses = '';

  export let colors = 'text-white bg-brandBlue-500 hover:bg-brandBlue-700';
  export let spaces = 'px-4 py-2 my-1';

  const dispatch = createEventDispatcher();
</script>

<button
  class="rounded-3xl {additionalClasses} {colors} {spaces}"
  on:click|stopPropagation|preventDefault={() => dispatch('click')}
>
  <slot />
</button>
