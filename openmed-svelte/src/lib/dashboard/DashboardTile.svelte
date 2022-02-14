<script>
  import { createEventDispatcher } from "svelte";
  export let title;
  export let subtitle;

  const dispatch = createEventDispatcher();
</script>

<div on:click={() => dispatch('click')}>
  <h1>
    {title}
  </h1>
  <div>
    {subtitle}
  </div>
</div>

