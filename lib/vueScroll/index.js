import vueScroll from './index.vue';
const comment = {
  install: function(Vue) {
    Vue.component(vueScroll.name, vueScroll);
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}
export default comment;
