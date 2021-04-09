import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    
    {
      path: '/',
      name: 'layout',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/layout/index.vue'),
     
    },


   
  ],
});
