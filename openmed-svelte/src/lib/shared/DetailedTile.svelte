<script>
  export let title;
  export let subtitle;
  export let iconImgPath;
  export let iconImgAlt = 'icon';

  let isExpanded = false;
  function toggle() {
    isExpanded = !isExpanded;
  }

  $: cursorProperty = isExpanded ? 'hover:cursor-zoom-out' : 'hover:cursor-pointer';
</script>

<div
  id="container"
  on:click={toggle}
  class="bg-brandBlue-50/40 hover:bg-brandBlue-50/50 my-1 rounded-lg {cursorProperty} group"
>
  {#if iconImgPath}
    <img src={iconImgPath} alt={iconImgAlt} />
  {/if}
  <div class="px-7 py-5">
    <h2>{title}</h2>
    <p class="font-light text-sm">{subtitle}</p>
  </div>

  {#if isExpanded}
    <slot />
    <div on:click|stopPropagation={() => null} class="group-hover:cursor-default">
      <slot name="actions" />
    </div>
  {/if}
  <!-- TODO add reactive arrow -->
</div>
