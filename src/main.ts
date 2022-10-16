import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ltBase from "@c/lt-base/index.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@s/common/root.scss";

const app = createApp(App);

app.use(ltBase);
app.use(ElementPlus);
app.use(store).use(router).mount("#app");
