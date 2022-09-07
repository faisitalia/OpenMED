<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits(["click"]);

const isApplied = ref(false);
function apply() {
  isApplied.value = !isApplied.value;
  emit("click");
}

const appliedStyles = computed(() =>
  isApplied.value
    ? "font-bold text-brandBlue-500"
    : "font-normal text-brandBlue-50"
);
</script>

<template>
  <button
    @click="apply"
    class="my-2 px-4 py-1 rounded-full hover:text-brandBlue-500 hover:bg-brandBlue-50/50"
    :class="appliedStyles"
    @click.prevent.stop="emit('click')"
  >
    <slot />
  </button>
</template>
