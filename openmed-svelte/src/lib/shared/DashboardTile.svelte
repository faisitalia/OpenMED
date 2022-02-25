<script>
  import { createEventDispatcher } from 'svelte';
  export let title;
  export let subtitle;

  const dispatch = createEventDispatcher();
</script>

<!-- TODO this is a grid layout so that we can add a navigate_next material icon -->
<div
  id={title}
  on:click={() => dispatch('click')}
  class="flex flex-col justify-center items-start rounded-xl my-2 py-3 px-8 w-96 hover:bg-brandBlue-50/50 bg-brandBlue-50/40 cursor-pointer"
>
  <h2>
    {title}
  </h2>
  <p>
    {subtitle}
  </p>
</div>
