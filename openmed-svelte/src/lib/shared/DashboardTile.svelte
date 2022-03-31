<script>
  export let title;
  export let subtitle;
  export let href;
</script>

<!-- TODO this is a grid layout so that we can add a navigate_next material icon -->
<a
  id={title}
  {href}
  class="transition-all grid grid-cols-[auto_auto] gap-3 rounded-xl my-2 py-4 px-4 w-full hover:bg-brandBlue-50/50 bg-brandBlue-50/40 cursor-pointer"
>
  <h2 class="self-start place-self-start">
    {title}
  </h2>
  <span class="material-icons-round self-center place-self-end row-span-2"> navigate_next </span>
  <p class="self-start place-self-start">
    {subtitle}
  </p>
</a>
