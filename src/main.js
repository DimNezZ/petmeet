import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "@fontsource/josefin-sans";
import { router } from "./router";
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");
