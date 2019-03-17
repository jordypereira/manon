import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import "./registerServiceWorker";

// Tailwind
import "./tailwind/tailwind.less";
require("dotenv").config();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
