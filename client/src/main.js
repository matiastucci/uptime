import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import App from './App'

import config from 'services/config'

Vue.use(VueSocketio, config.BASE_URL)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
