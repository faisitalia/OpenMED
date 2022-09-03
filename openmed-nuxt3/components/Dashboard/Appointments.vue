<script setup>
const props = defineProps({
  title: String,
  day: String,
  hours: String,
});

let isExpanded = false;
function toggle() {
  isExpanded = !isExpanded;
}
</script>

<template>
  <div
    id="container"
    @click="toggle"
    class="my-1 px-1 py-4 grid grid-cols-[auto_auto_auto] place-items-start bg-brandBlue-50/40 hover:bg-brandBlue-50/50 rounded-3xl hover:cursor-pointer"
  >
    <div class="p-5 row-span-3 row-start-1 col-start-1">
      <slot name="leading">
        <span class="material-icons-round"> event </span>
      </slot>
    </div>

    <h3 class="self-center">{{ title }}</h3>
    <p v-if="!isExpanded" class="font-light text-sm row-start-2 col-start-2">
      {{ day }}
    </p>
    <p v-if="!isExpanded" class="font-light text-xs row-start-3 col-start-2">
      {{ hours }}
    </p>

    <div v-if="isExpanded" class="py-4 mx-2 row-start-3 col-start-2">
      <slot name="content" />
    </div>

    <div class="p-5 row-span-3 row-start-1 col-start-3">
      <span v-if="isExpanded" class="material-icons-round"> expand_more </span>
      <span v-else class="material-icons-round"> navigate_next </span>
    </div>
  </div>
</template>
