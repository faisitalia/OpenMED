import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import { plugin, defaultConfig } from "@formkit/vue";

import App from "./App.vue";
import router from "./router";

import "./assets/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
library.add(faFacebook, faTwitter, faLinkedin, faYoutube);

const pinia = createPinia();
const head = createHead();
const app = createApp(App);

app
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(head)
  .use(pinia)
  .use(router)
  .use(plugin, defaultConfig)
  .mount("#app");
