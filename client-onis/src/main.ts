import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import { plugin, defaultConfig } from "@formkit/vue";

import App from "./App.vue";
import router from "./router";

import "./assets/index.css";

const pinia = createPinia();
const head = createHead();
const app = createApp(App);

app.use(head).use(pinia).use(router).use(plugin, defaultConfig).mount("#app");
