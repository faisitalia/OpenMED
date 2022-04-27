<script>
  export let title;
  export let subtitle;

  import { slide } from 'svelte/transition';

  let isExpanded = false;
  function toggle() {
    isExpanded = !isExpanded;
  }
</script>

<div
  id="container"
  on:click={toggle}
  class="px-1 py-4 grid grid-cols-[auto_auto_auto] place-items-start bg-brandBlue-50/40 hover:bg-brandBlue-50/50 transition-all my-1 rounded-xl hover:cursor-pointer"
>
  <div class="{isExpanded ? 'row-span-full' : 'row-span-2'} p-5">
    <slot name="leading">
      <span class="material-icons-round"> event </span>
    </slot>
  </div>

  <h2 class="self-center">{title}</h2>
  {#if !isExpanded}
    <p class="font-light row-start-2 col-start-2">{subtitle}</p>
  {/if}

  {#if isExpanded}
    <div class="py-4 mx-2 row-start-3 col-start-2" transition:slide|local>
      <slot name="content" />
    </div>
  {/if}

  <div class="{isExpanded ? 'row-span-full' : 'row-span-2'} col-start-3 p-3">
    {#if isExpanded}
      <span class="material-icons-round"> expand_more </span>
    {:else}
      <span class="material-icons-round"> navigate_next </span>
    {/if}
  </div>
</div>
