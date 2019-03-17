import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import "./registerServiceWorker";
import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
Vue.use(VueFire);

// Tailwind
import "./tailwind/tailwind.less";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "manon-22.firebaseapp.com",
  databaseURL: "https://manon-22.firebaseio.com",
  projectId: "manon-22"
};

firebase.initializeApp(config);
export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
