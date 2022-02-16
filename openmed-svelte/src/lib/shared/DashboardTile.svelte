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
  <p>
    {subtitle}
  </p>
</div>

<style>
  div {
    border: 1px solid black;
    margin: 1rem;
    padding: 0.5rem;
    max-width: 50%;
  }
</style>