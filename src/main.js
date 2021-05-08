import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  getCookie,
  delCookie
} from './libs/util'
import 'amfe-flexible'
// import Vconsole from 'vconsole'
import Vant from 'vant';
import common from './libs/common.js'
import 'vant/lib/index.css'
import lrz from 'lrz'
Vue.use(Vant);
Vue.use(common);
// Vue.use(lrz);
// let vConsole = new Vconsole()
Vue.config.productionTip = false
// Vue.use(vConsole)
router.beforeEach((to, from, next) => {
  
    next();
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
