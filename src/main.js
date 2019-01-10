import Vue from 'vue';
import App from './App';
import { router } from './router';
import iView from 'iview'
import axios from 'axios'
import store from './store'
import 'swiper/dist/css/swiper.css';
import 'iview/dist/styles/iview.css'
import '../src/common/less/base.less'
import '../src/common/less/reset.less'

Vue.use(iView)

Vue.prototype.$http=axios

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
