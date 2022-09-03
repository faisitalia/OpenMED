import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import { plugin, defaultConfig } from "@formkit/vue";

import App from "./App.vue";
import router from "./router";

import "./assets/index.css";

const app = createApp(App);
const head = createHead();

app
  .use(head)
  .use(createPinia())
  .use(router)
  .use(plugin, defaultConfig)
  .mount("#app");
