<script>
const emit = defineEmits(["click"]);

const isApplied = ref(false);
function apply() {
  isApplied = !isApplied;
  emit("apply");
}

const isBold = computed(() => (isApplied ? "font-bold" : "font-normal"));
const color = computed(() =>
  isApplied ? "text-brandBlue-500" : "text-brandBlue-50"
);
</script>

<template>
  <StyledButton
    @click="apply"
    colors="{{color}} hover:text-brandBlue-500 hover:bg-brandBlue-50/50"
    spaces="my-2 px-3 py-1"
    class="rounded-full {{isBold}}"
  >
    <slot />
  </StyledButton>
</template>
