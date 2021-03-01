import Vue from 'vue'
const eventBus = new Vue()

export default {
  install (Vue: any) {
    Vue.prototype.$bus = eventBus
  }
}
