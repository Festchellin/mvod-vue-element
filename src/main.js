import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import httpService from './providers/HttpProvider'

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$http = httpService;
router.beforeEach((to, from, next) => {
    console.log(to.name, next.name);
    if (to.name.indexOf('admin') > -1 || to.name.indexOf('user') > -1) {
        if (!store.getters.isSignIn) {
            console.log('not sign in');
            router.push('login')
        } else {
            next()
        }
    }
    next()
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
