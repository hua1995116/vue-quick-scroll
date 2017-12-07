import Vue from 'vue'
import App from './App.vue'
import vueScroll from './component/refresh/index.js';
import './directive/lazyload.js';
Vue.use(vueScroll);
new Vue({
  el: '#app',
  render: h => h(App)
})
