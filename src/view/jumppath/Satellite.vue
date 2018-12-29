<template>
  <div class="Satellite">
    <!-- 头部 -->
    <!-- <div class="hearder-title clear">
      <van-icon 
        class="pull-left" 
        name="arrow-left"
        @click="jumppath"/>
      卫星云图
    </div> -->
    <state-header :titlecontet="titlecontet" />
    <!-- 大的背景图 模糊 -->
    <div class="bg-blur">
      <div class="content-front">
        <!-- 头部轮播图 -->
        <div class="header-slider">
          <Form ref="formInline" :model="formInline" inline :label-width="80">
            <Form-item>
              <Select v-model="formInline.datetime" clearable style="width:200px" @on-change="selectIndex">
                <Option v-for="item in stationList" :value="item.datetime">{{item.datetime}}</Option>
              </Select>
            </Form-item>
            <button class="swiperbtn" @click='stop'>{{titleend}}</button> 
            <button class="swiperbtn" @click='start'>开始</button>
          </Form>
          
          <div class="imgdatetime" v-model="value">{{imgdatetime}}</div>

          <div class="container" ref='mypp'>
            <div class="swiper-container" >
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in imgArray" :key="item.index" v-model="value2">
                  <img :src="item" alt="">
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>
        </div>
        <!-- 底部文字 -->
        <div class="footer-font">
          <div class="footer-title">卫星云图说明</div>
          <div class="big-content">
            <p>云图图像上显示的时间是世界时，标题时间为北京时。</p>
            <br>
            <p>动画序列是由过去12幅卫星云图组成，每个半小时或1小时一幅，图像动画能让观看者更清楚的了解云团的变化。</p>
            <br>
            <p>风云-2C位于东京105度的赤道上空，距离地面约35,800公里。这颗卫星紧随地球的自转而运行，相对于地面是静止不动的（故又名地球同步卫星），因此可以24小时不断拍摄地球上同一地区的云图。
                红外云图基本上显示观测物（如云）的温度。一般来说，云顶愈高温度愈低，它在图像中便显得愈明亮。
                以上图像已经过处理，以符合视觉效果。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Swiper from 'swiper';
import stateHeader from './stateheader'
import { Icon, Swipe, SwipeItem } from "vant";
import { GetCloudList } from '../../api/rabar.js';
import { ERR_OK, httpUrlimg } from '../../api/config.js';

Vue.use(Icon).use(Swipe).use(SwipeItem);

export default {
  components: {
    Icon,
    Swipe,
    SwipeItem,
    stateHeader
  },
  data() {
    return {
      mySwiper:'',
      titleend: '暂停',
      imgArray: [],
      titlecontet: '卫星云图',
      formInline: {
        datetime: ''
      },
      stationList: [],
      value2: 0,
      value: '',
      imgdatetime: ''
    };
  },
  methods: {
    selectIndex (value) {
      const index = this.stationList.findIndex(item => item.datetime === value)
      this.value2 = index + 1
      this.mySwiper.slideTo(this.value2, 1000, false)
    },
    // 点击按钮跳转到首页
    jumppath() {
      this.$router.push("/navpath/radar");
    },
    init() {
      this.mySwiper = new Swiper ('.swiper-container', {
        effect: "fade", //cube   fade   flip   slide(默认轮播效果-左右滑动)
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
          //可选选项，自动滑动
          delay: 1500,
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
      })
    },
    stop(){
      this.mySwiper.autoplay.stop();
      this.titleend = '已暂停'
    },
    start(){
      this.mySwiper.autoplay.start();
      this.titleend = '暂停'
    },
    _GetCloudList() {
      GetCloudList ().then(res => {
        if (res.code === ERR_OK) {
          console.log(res)
          var imgArrays = res.data.earth
          this.stationList = res.data.earth
          for (var i = 0; i < imgArrays.length; i++) {
            var imgUrlarray = `${httpUrlimg}:80${imgArrays[i].path}`
            this.imgArray.push(imgUrlarray)
          }
          this.$nextTick(()=>{
            this.init()
          })
        }
      })
    }
  },
  mounted(){
    this._GetCloudList()
    this.$nextTick(()=>{
        this.init()
    }, 1500)
    // setTimeout(() => {
    //   this.init()
    // }, 1500)
  },
};
</script>

<style lang="less" scoped>
.Satellite {
  > .hearder-title {
    color: #fff;
    font-size: 2em;
    text-align: center;
    padding-top: 14px;
    // background-color: #193ba8;
    padding-bottom: 4px;
    > .van-icon {
      padding-top: 6px !important;
    }
    > span {
      margin-left: 5px;
    }
  }
}


.bg-blur {
  background: url("./img/bgib.png");
  background-size: 100% 100%;
}
.bg-blur::before {
  content: "";
  display: block;
}
.content-front {
  // text-align: center;
  margin-bottom: 8px;
  margin-top: 10px;
  border: 0.1px solid #ccc;
  color: #ffffff;
  > .header-slider {
    
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

.swiperbtn {
  background-color: #244bb2;
  width: 5rem;
  height: 3rem;
  border-radius: 5px;
  border: 1px solid #244bb2;
  margin: 5px;
  color: #fff;
}

.van-swipe__track {
  height: 15rem !important;
  > .van-swipe-item {
    height: 100% !important;
    > img {
      width: 100% !important;
      height: 100% !important;
    }
  }
}

.swiper-container {
  width: 100%;
  height: 15rem;
}
.swiper-container .swiper-wrapper {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.swiper-container .swiper-wrapper .swiper-slide{
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.swiper-container .swiper-wrapper .swiper-slide >img{
  width: 100%;
  height: 15rem;
  /* overflow: hidden; */
}
</style>
