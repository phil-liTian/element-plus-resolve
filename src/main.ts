import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ltBase from "@c/lt-base/index.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@s/common/root.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ltBase);
app.use(ElementPlus);
app.use(store).use(router).mount("#app");
