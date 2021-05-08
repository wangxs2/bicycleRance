import router from './router.js'
// import store from './store'
// import {
//   getCookie,
//   delCookie
// } from './libs/util'
// import {
//   Message
// } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
  showSpinner: false
})


// this.$store.commit('setDemoValue', value);    

// this.$store.getters. getDemoValue

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
//  console.log(111)
  next()
  // console.log(next)


})

router.afterEach((to, from) => {
  NProgress.done() // finish progress bar
})
