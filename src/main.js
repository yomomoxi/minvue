import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入vue-UUID组件
import UUID from 'vue-uuid'
import "../src/assets/font_dvxraubeanq/iconfont.css";
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);




Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(UUID)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
