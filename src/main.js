import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Popper from "vue3-popper";

const app = createApp(App);
app.component("Popper", Popper);

app.mount("#app");