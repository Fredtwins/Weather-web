<template>
  <div class="radar">
    <heardertitle :titlecontet="titlecontet"/>
    <!-- tab栏 -->
    <div class="radar-tab">
      <van-tabs v-model="active" animated>
        <van-tab title="佛山镇街雷达图">
          <foradar :imgArray="imgArrayf" v-if="active===0"/>
        </van-tab>
        <van-tab title="广州雷达图">
          <gzswiper :imgArray="imgArray" v-if="active===1"/>
        </van-tab>
        <van-tab title="肇庆雷达图">
          <zqswiper :imgArrayz="imgArrayz" v-if="active===2" />
        </van-tab>
        <van-tab title="全国雷达图">
          <qgswiper :imgArrayq="imgArrayq" v-if="active===3" />
        </van-tab>
      </van-tabs>
    </div>
    <footercontent/>
  </div>  
</template>

<script>
import Vue from 'vue'
import Swiper from "swiper";
import heardertitle from '../../base/heardertitle/heardertitle'
import footercontent from './footercontent'
import swiperradar from './swiperradar'
import gzswiper from './gzswiper'
import zqswiper from './zqswiper'
import qgswiper from './qgswiper'
import foradar from './foradar'
import { Tab, Tabs } from 'vant'
import { ERR_OK, httpUrlimg } from '../../api/config.js'
import { GetRaBar } from '../../api/rabar.js'
// import { httpUrl1 } from '../../api/axios.js'
Vue.use(Tab).use(Tabs)

export default {
  components: {
    heardertitle,
    footercontent,
    Tab,
    Tabs,
    swiperradar,
    gzswiper,
    zqswiper,
    qgswiper,
    foradar
  },
  data () {
    return {
      active: 0,
      titlecontet: 'S波段雷达图',
      imgArray: [],
      imgArrayz: [],
      imgArrayq: [],
      imgArrayf: [],
      titleend: '暂停',
      titlestart: '开始'
    }
  },
  methods: {
    init() {
      this.mySwiper = new Swiper(".swiper-container", {
        effect: "fade", //cube   fade   flip   slide(默认轮播效果-左右滑动)
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
          //可选选项，自动滑动
          delay: 2000,
          // stopOnLastSlide: false,  //如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
          disableOnInteraction: false //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        },
        autoplayDisableOnInteraction: false,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },

        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar"
        }
      });
    },
    stop() {
      this.mySwiper.autoplay.stop();
      this.titleend = "已暂停";
      this.titlestart = '开始'
    },
    start() {
      this.mySwiper.autoplay.start();
      this.titleend = "暂停";
      this.titlestart = '已开始'
    },
     // 雷达图渲染
    _GetRaBar () {
      GetRaBar().then(res => {
        if (res.code === ERR_OK) {
          var imgarr = res.data.GuangZhou
          var imgarrz = res.data.ZhaoQing
          var imgarrq = res.data.China
          var imgarrf = res.data.FoShan
          // let httpUrl1 = 'http://10.0.1.184'
          for (var i = 0; i < imgarr.length; i++) {
            var imgUrlarray = `${httpUrlimg}:80${imgarr[i].path}`
            this.imgArray.push(imgUrlarray)
          }
          for (var i = 0; i < imgarrz.length; i++) {
            var imgUrlarrayz = `${httpUrlimg}:80${imgarrz[i].path}`
            this.imgArrayz.push(imgUrlarrayz)
          }
          for (var i = 0; i < imgarrq.length; i++) {
            var imgUrlarrayq = `${httpUrlimg}:80${imgarrq[i].path}`
            this.imgArrayq.push(imgUrlarrayq)
          }
          for (var i = 0; i < imgarrf.length; i++) {
            var imgUrlarrayf = `${httpUrlimg}:80${imgarrf[i].path}`
            this.imgArrayf.push(imgUrlarrayf)
          }
          this.$nextTick(() => {
            this.init();
          });
        }
        console.log(res)
      })
    }
  },
  mounted () {},
  created () {
    this._GetRaBar()
  }
}
</script>

<style lang="less" scoped>
.radar {

}
.swiper-container {
  width: 100%;
  height: 24rem;
}
.swiper-container .swiper-wrapper {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.swiper-container .swiper-wrapper .swiper-slide {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.swiper-container .swiper-wrapper .swiper-slide > img {
  width: 100%;
  height: 24rem;
  /* overflow: hidden; */
}

.radar-swiper {
  margin-bottom: 8px;
  margin-top: 10px;
  border: 0.1px solid #ccc;
  color: #ffffff;
  > .header-slider {
    > .swiperbtn {
      background-color: #244bb2;
      width: 5rem;
      height: 3rem;
      border-radius: 5px;
      border: 1px solid #244bb2;
      margin: 5px;
    }
  }
  > .footer-font {
    > .footer-title {
      font-size: 1.4em;
      padding: 1rem;
      border-bottom: 0.1px solid #ccc;
    }
    > .big-content {
      padding: 1rem;
      > p {
        color: #eaf0f8;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
