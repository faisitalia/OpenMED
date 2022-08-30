<script setup lang="ts">
// TODO the following may not work
// TODO two way data binding with checkboxes is different
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: Boolean,
    default: false,
  },
});

const emitters = defineEmits(["update:value"]);

const v = computed({
  get: () => props.value,
  set: (val) => emitters("update:value", val),
});
</script>

<template>
  <input type="checkbox" :id="label" v-model="v" />
  <label v-if="label" :for="label">{{ label }}</label>
</template>
