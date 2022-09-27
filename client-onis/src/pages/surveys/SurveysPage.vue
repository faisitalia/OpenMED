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

onMounted(() => {
  /* eslint-disable no-undef */
  Survey.StylesManager.applyTheme("defaultV2");

  const styles = {
    root: "bg-primary-light rounded-xl px-8 py-4 max-w-2xl",
    headerText: "p-4 text-center",
    header: "flex flex-col justify-center items-center",
    title: "text-primary-dark self-center text-3xl",
    description: "p-4 text-center text-sm italic",
    question: {
      number: "inline pr-2",
      mainRoot: "py-4",
      title: "text-xl",
      requiredText: "text-primary-dark",
      content: "text-md",
    },
    error: {
      root: "text-sm",
      tooltip: "text-primary-dark",
      aboveQuestion: "text-primary-dark",
      item: "text-primary-dark font-bold",
    },
    text: { small: "text-primary-dark font-bold" },
    boolean: {
      mainRoot: "flex flex-col justify-center items-center",
      root: "pt-4",
    },
    checkbox: {
      controlLabel: "flex items-center justify-center font-light mx-4 my-0",
      // materialDecorator:
      //   "w-5 h-5 bg-white rounded-full checked:w-16 hover:bg-primary-light border-2 border-primary-dark",
    },
    radiogroup: {
      controlLabel: "flex items-center justify-center font-light mx-4 my-0",
      item: "flex items-center p-2 my-2",
      label: "flex items-center",
      itemChecked: "bg-primary rounded-md",
      materialDecorator:
        "peer-checked:bg-primary-dark w-5 h-5 bg-white rounded-full hover:bg-primary-light border-2 border-primary-dark",
    },
  };

  const survey = new Survey.Model(surveyJson);
  function alertResults(sender) {
    const results = JSON.stringify(sender.data);
    alert(results); // TODO send POST REQUEST
  }
  survey.locale = "it";
  survey.onComplete.add(alertResults);

  $(function () {
    $("#survey").Survey({ model: survey, css: styles });
  });
});
</script>

<template>
  <div id="survey" class=""></div>
</template>

<style scoped>
body #survey {
  --primary: #e25831;
  --background-dim-light: #e25831;
  --foreground: #ffcfbc;
  --foreground-light: #ffcfbc;
}
</style>
