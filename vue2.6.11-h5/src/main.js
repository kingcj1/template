import './assets/css/common.css';
import 'vant/lib/index.css';
import '@/assets/js/flexible.js';
import {
  numFormat,
  iosDateFormat
} from './utils/tools.js';
import _axios from './axios/server';
import store from './store';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vant, {
  Toast,
  Lazyload
} from 'vant';
import * as echarts from 'echarts';
import _lodash from 'lodash';
import VConsole from 'vconsole';

Vue.prototype.$http = _axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.dateFormat = iosDateFormat;
Vue.prototype.$_NumFormat = numFormat;
Vue.prototype._lodash = _lodash;
Vue.config.productionTip = false;
Vue.use(Lazyload, {
  'lazyComponent': true
});
Vue.filter('NumFormat', numFormat);
// vlog
if (process.env.NODE_ENV == 'test') {
  Vue.prototype.$vconsole = new VConsole();
}

Vue.use(Vant);

new Vue({
  router,
  store,
  'render': (h) => h(App)
}).$mount('#app');