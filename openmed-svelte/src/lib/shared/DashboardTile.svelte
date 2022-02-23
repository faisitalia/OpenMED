<script>
  import { createEventDispatcher } from 'svelte';
  export let title;
  export let subtitle;

  const dispatch = createEventDispatcher();
</script>

<div
  id={title}
  on:click={() => dispatch('click')}
  class="flex flex-col justify-center items-start px-10 py-6 my-4"
>
  <h2>
    {title}
  </h2>
  <p>
    {subtitle}
  </p>
</div>
