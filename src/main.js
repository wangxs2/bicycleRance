import Vue from 'vue'
import App from './App.vue'
import router from './router.js';
import store from './store'
import './permission' //路由判断
import Vant from 'vant';
import 'vant/lib/index.css';
import common from './libs/common.js' //自定义包
import dataV from '@jiaminghi/data-view'
import Videojs from 'video.js'
import 'video.js/dist/video-js.css'
 
Vue.prototype.$video = Videojs
Vue.use(dataV)
Vue.use(common)
Vue.use(Vant);
Vue.config.productionTip = false






new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
