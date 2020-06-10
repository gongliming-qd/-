import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// 1. 导入插件
import './plugins/element/element'
import './plugins/markdown'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
