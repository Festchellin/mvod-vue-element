import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import httpService from './providers/httpService'

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$http = httpService;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');