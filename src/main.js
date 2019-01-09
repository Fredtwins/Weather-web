import Vue from 'vue';
import App from './App';
import { router } from './router';
import iView from 'iview'
import axios from 'axios'
import vueAMap from 'vue-amap'
import 'swiper/dist/css/swiper.css';
import 'iview/dist/styles/iview.css'
import '../src/common/less/base.less'
import '../src/common/less/reset.less'

Vue.use(iView)
Vue.use(vueAMap)

// 初始化vue-amap
vueAMap.initAMapApiLoader({
  key: 'fb46b2ea96c5aaffaeb84a7b4361080c',
  plugin: ['Geocoder', 'MouseTool', 'MapType', 'DistrictSearch']
});

Vue.prototype.$http=axios

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
