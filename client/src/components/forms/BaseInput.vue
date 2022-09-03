<script setup lang="ts">
// TODO improved a11y with:
//    - uuids instead of using label as id
//    - use aria-describedby to bind label + inputs + errors together
//    - use aria-live="assertive" to read errors when present
//    - use aria-invalid to show when errors are present

import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Number],
    default: "",
  },
});

const emitters = defineEmits(["update:value"]);

const v = computed({
  get: () => props.value,
  set: (val) => emitters("update:value", val),
});
</script>

<template>
  <label :for="label">{{ label }}</label>
  <input v-bind="$attrs" :id="label" :placeholder="label" v-model="v" />
</template>
