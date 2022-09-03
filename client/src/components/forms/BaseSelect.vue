<script setup lang="ts">
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
  options: {
    type: Array<any>,
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
  <label v-if="label" :for="label">{{ label }}</label>
  <select v-bind="$attrs" :name="label" :id="label" v-model="v">
    <option v-for="o in options" :value="o" :key="o" :selected="o === value">
      {{ o }}
    </option>
  </select>
</template>
