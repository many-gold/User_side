// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias./
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleInfo, faLink, faClock, faCalculator, faBookOpenReader, faDownload } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faYoutube, faLinkedin, faTwitter,faTelegram,faTiktok,faPinterest } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.config.productionTip = false
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faFacebook, faInstagram, faYoutube, faLinkedin, faTwitter,faTelegram,faTiktok,faPinterest, faCircleInfo, faLink,faClock, faCalculator, faBookOpenReader, faDownload)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)
/* eslint-disable no-new */
Vue.use(axios)
Vue.use(Notifications)
axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.get["Accepts"] = 'application.json';
// axios.defaults.headers.get["Content-Type"]="application/pdf"

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})