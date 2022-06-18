<script setup>
const props = defineProps({
  class: "rounded-lg px-1 py-4 my-1",
  title: String,
  subtitle: String,
});

let isExpanded = false;
function toggle() {}
</script>

<template>
  <div
    id="container"
    @click="isExpanded = !isExpanded"
    class="grid grid-cols-[auto_70%_auto] place-items-start bg-brandBlue-50/40 hover:bg-brandBlue-50/50 transition-all hover:cursor-pointer {{additionalClasses}}"
  >
    <div class="{{isExpanded ? 'row-span-full' : 'row-span-2'}} p-5">
      <slot name="leading">
        <span class="material-icons-round"> event </span>
      </slot>
    </div>

    <h2 class="self-center">{{ title }}</h2>
    <p v-if="!isExpanded" class="font-light row-start-2 col-start-2">
      {{ subtitle }}
    </p>

    <div v-if="isExpanded" class="py-4 mx-2 row-start-3 col-start-2">
      <slot name="content" />
    </div>
    <div class="pt-4 px-8 mt-4 place-self-center row-start-4 col-start-2">
      <slot name="trailing" />
    </div>

    <div
      class="{{isExpanded ? 'row-span-full' : 'row-span-2'}} col-start-3 p-3"
    >
      <span v-if="isExpanded" class="material-icons-round"> expand_more </span>
      <span v-else class="material-icons-round"> navigate_next </span>
    </div>
  </div>
</template>
