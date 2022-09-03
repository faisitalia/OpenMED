<!-- this component should be trashed as it is now -->

<script setup>
const props = defineProps({
  class: String,
  colors: {
    type: String,
    default: "text-white bg-brandBlue-500 hover:bg-brandBlue-700",
  },
  spaces: { type: String, default: "px-4 py-2 my-1" },
});

const myClasses = props.class;
const emit = defineEmits(["click"]);
</script>

<template>
  <button
    class="rounded-3xl"
    :class="`${myClasses} ${colors} ${spaces}`"
    @click.prevent.stop="emit('click')"
  >
    <slot />
  </button>
</template>
