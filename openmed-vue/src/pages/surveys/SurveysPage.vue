<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { onMounted } from "vue";

useHead({
  link: [
    {
      type: "text/css",
      rel: "stylesheet",
      href: "https://unpkg.com/survey-core/defaultV2.min.css ",
    },
    {
      type: "text/css",
      rel: "stylesheet",
      href: "https://unpkg.com/survey-creator-core/survey-creator-core.min.css",
    },
  ],
});

onMounted(() => {
  const options = {
    showLogicTab: true,
    isAutoSave: true,
  };

  const create = new window.SurveyCreator.SurveyCreator(options);
  create.render("survey");
});
</script>

<template>
  <h1 class="p-12">This is your survey:</h1>
  <div id="survey"></div>
</template>
