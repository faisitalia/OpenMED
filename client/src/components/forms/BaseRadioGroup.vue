<script setup lang="ts">
// TODO the following may not work
// TODO two way data binding with checkboxes is different
import { computed } from "vue";
import BaseRadio from "./BaseRadio.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array<any>,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  vertical: {
    type: Boolean,
    default: true,
  },
});

const emitters = defineEmits(["update:value"]);

const v = computed({
  get: () => props.value,
  set: (val) => emitters("update:value", val),
});

const align = props.vertical ? "div" : "span";
</script>

<template>
  <component v-for="o in options" :key="o.value" :is="align">
    <BaseRadio :label="o.label" :value="o.value" :name="name" v-model="v"
  /></component>
</template>
