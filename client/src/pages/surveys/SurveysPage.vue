<script setup>
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

  const configJson = {
    pages: [
      {
        name: "Name",
        elements: [
          {
            name: "FirstName",
            title: "Enter your first name:",
            type: "text",
          },
          {
            name: "LastName",
            title: "Enter your last name:",
            type: "text",
          },
        ],
      },
    ],
  };

  const survey = new window.SurveyCreator.SurveyCreator(options);
  survey.text = JSON.stringify(configJson);

  survey.saveSurveyFunc = (saveNo, callback) => {
    callback(saveNo, true); // TODO read the docs bout this

    // TODO mock a POST request
  };

  survey.render("survey");
});
</script>

<template>
  <h1 class="p-12">This is your survey:</h1>
  <div id="survey"></div>
</template>
