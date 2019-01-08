<template>
  <div class="radar-swiper">
    <div class="header-slider">
      <button class="swiperbtn" @click='stop'>{{titleend}}</button>
      <button class="swiperbtn" @click='start'>{{titlestart}}</button>
      <div class="container" ref='mypp'>
        <div class="swiper-container" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in imgArray" :key="item.index">
              <img :src="item" alt="">
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          <!-- 如果需要滚动条 -->
          <!-- <div class="swiper-scrollbar"></div> -->
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <!-- 如果需要分页器  也可以放外面-->
        <!-- <div class="swiper-pagination"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  props: {
      imgArray: Array,
      required: true
    },
  data() {
    return {
      titleend: "暂停",
      titlestart: '开始'
    };
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
          disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
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

      // 鼠标移入移出暂停，播放
      // this.$refs.mypp.addEventListener('mouseover',()=>{
      //   this.stop();
      // })
      // this.$refs.mypp.addEventListener('mouseout',()=>{
      //   this.start();
      // })
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
      console.log(11)
    },
    // 雷达图渲染
    _GetRaBar () {
      // GetRaBar().then(res => {
      //   console.log(res)
      //   if (res.code === ERR_OK) {
      //     var imgarr = res.data.GuangZhou
      //     for (var i = 0; i < imgarr.length; i++) {
      //       var imgUrlarray = `http://192.168.1.174:80${imgarr[i].path}`
      //       this.imgArray.push(imgUrlarray)
      //     }
      //     console.log(this.imgArray)
      //   }
      // })
      // console.log(this.imgArray)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  created() {
    this._GetRaBar()
  }
};
</script>

<style lang="less" scoped>
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
