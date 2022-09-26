<script setup>
import { useHead } from "@vueuse/head";
import { onMounted, onUnmounted } from "vue";
import surveyJson from "./survey";

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

let surveyScript;
onMounted(() => {
  /* eslint-disable no-undef */
  Survey.StylesManager.applyTheme("defaultV2");

  // console.log(surveyJson);

  const survey = new Survey.Model(surveyJson);
  function alertResults(sender) {
    const results = JSON.stringify(sender.data);
    alert(results); // TODO send POST REQUEST
  }
  survey.onComplete.add(alertResults);

  $(function () {
    $("#survey").Survey({ model: survey });
  });
});
</script>

<template>
  <h1 class="p-12">This is your survey:</h1>
  <div id="survey"></div>
</template>
