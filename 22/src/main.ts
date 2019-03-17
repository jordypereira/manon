import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

// Tailwind
import './tailwind/tailwind.less'

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
