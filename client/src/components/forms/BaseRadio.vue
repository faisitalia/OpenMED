<script setup lang="ts">
// TODO the following may not work
// TODO two way data binding with checkboxes is different
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  selectedValue: {
    type: [String, Number],
    default: "",
  },
  value: {
    type: [String, Number],
    required: true,
  },
});

const emitters = defineEmits(["update:value"]);

const v = computed({
  get: () => props.value,
  set: (val) => emitters("update:value", val),
});
</script>

<template>
  <input
    type="radio"
    v-bind="$attrs"
    v-model="v"
    :checked="selectedValue === value"
  />
  <label v-if="label" :for="label">{{ label }}</label>
</template>
