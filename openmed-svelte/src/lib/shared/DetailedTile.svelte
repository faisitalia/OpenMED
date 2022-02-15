<script>
  export let title;
  export let subtitle;
  export let iconImgPath;
  export let iconImgAlt = "icon";

  let isExpanded = false;
  function toggle() {
    isExpanded = !isExpanded;
  }
</script>

<div id="container" on:click="{toggle}">
  <img src="{iconImgPath}" alt="{iconImgAlt}">
  <h2>{title}</h2>
  {#if !isExpanded}
    <p>{subtitle}</p>
  {:else}
    <slot>
      <p>{subtitle}</p>
    </slot>
  {/if}
  <!-- TODO add reactive arrow -->
</div>