// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import VueYouTubeEmbed from 'vue-youtube-embed'

import App from './App'
import router from '@/router'
import store from '@/store/store'
import Panel from '@/components/globals/Panel'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueYouTubeEmbed)

sync(store, router)

/* eslint-disable no-new */

// Register a global component
Vue.component('panel', Panel)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
