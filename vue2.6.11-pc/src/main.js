import './assets/css/common.css';
import Vue from 'vue';
import _axios from './axios/server';
import store from './store';
import App from './App.vue';
import router from './router';
import _lodash from 'lodash';
import { register } from '@/ui/element.js';

register(Vue);
Vue.prototype.$http = _axios;
Vue.prototype._lodash = _lodash;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  'render': (h) => h(App)
}).$mount('#app');