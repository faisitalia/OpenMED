<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits([`delete`]);

const areYousure = ref(false);
</script>

<template>
  <div>
    <StyledButton
      @click="areYousure = true"
      colors="bg-brandBlue-50/20 hover:bg-brandBlue-50/40"
    >
      <slot />
    </StyledButton>
    <div v-if="areYousure" class="flex flex-col items-center my-4">
      <p class="mb-4 text-center">
        Sei <strong>sicuro</strong> di voler ELIMINARE quest'utente?
      </p>
      <!-- TODO delete this user -->
      <StyledButton @click="emit('delete')">
        <span class="px-4">Sì</span>
      </StyledButton>
      <StyledButton
        @click="areYousure = !areYousure"
        colors="bg-brandBlue-50/20 hover:bg-brandBlue-50/40"
      >
        <span class="px-4">No</span>
      </StyledButton>
    </div>
  </div>
</template>
