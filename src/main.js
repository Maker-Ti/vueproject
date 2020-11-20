import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueResource from 'vue-resource'
import router from "./router/router.js"


Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueResource);

new Vue({
  el: '#app',
  router,  // 注入到根实例中
  render: h => h(App)
})
