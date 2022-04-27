<script>
  export let title;
  export let subtitle;
  export let href;
</script>

<!-- TODO this is a grid layout so that we can add a navigate_next material icon -->
<a
  id={title}
  {href}
  class="transition-all grid grid-cols-[auto_auto] gap-y-3 gap-x-64 rounded-xl md:rounded-3xl my-2 py-4 px-4 md:pl-12 md:pr-8 w-full hover:bg-brandBlue-50/50 bg-brandBlue-50/40 cursor-pointer"
>
  <h2 class="self-start place-self-start">
    {title}
  </h2>
  <span class="material-icons-round self-center place-self-end row-span-2"> navigate_next </span>
  <p class="self-start place-self-start ">
    {subtitle}
  </p>
</a>
