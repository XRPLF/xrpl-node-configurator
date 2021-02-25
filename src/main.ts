import Vue from 'vue'
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'

import './directives'
import './plugins'

import './scss/style.scss'
import './assets/fonts/bebasneue.css'

import i18n from './i18n'

import AppLayout from './layout/App.vue'
import ResultLayout from './layout/Result.vue'

Vue.config.productionTip = false

Vue.component('app-layout', AppLayout)
Vue.component('result-layout', ResultLayout)

Vue.use(Vuelidate)
Vue.use(VModal)

new Vue({
  i18n,
  name: 'Root',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
