<template>
  <div class="jumpmore">
    <!-- 头部 -->
    <div class="hearder-title clear">实景天气
      <van-icon 
        class="classiconsize pull-right" 
        name="arrow" 
        @click="jumppathlast"/>
    </div>
    <!-- 大的背景图 模糊 -->
    <div class="bg-blur">
      <div class="content-front" v-for="(item, index) in rainArray" :key="item.index">
        <!-- 头部标题 -->
				<div class="hearder-titlerain clear">
					<div class="heardertitle">{{item.name}}</div>
					<div class="hearder-time pull-right">{{item.formatTime}}</div>
				</div>
        <!-- 内容部分 -->
        <div class="content-rain">
          <!-- 左边图片部分 -->
          <img :src="item.imageName"/>
          <!-- 右边天气 -->
          <div class="right-rain clear">
            <span class="pull-left">风向: {{item.windChinese}}</span>
            <br>
            <span class="pull-left">风速: {{item.wf}}(m/s)</span>
            <span class="pull-left">温度: {{item.tRange}}</span>
            <span class="pull-left">雨量: {{item.rain}}(mm)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-img clear">
      
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
import { Getjumpmore } from '../../api/jumpmore.js'
import { ERR_OK, httpUrlimg } from '../../api/config.js'
// import { httpUrl1 } from '../../api/axios'
Vue.use(Icon)

export default {
  components: {
    Icon
  },
  data () {
    return {
      rainArray: []
    }
  },
  methods: {
    jumppathlast () {
      this.$router.push('/navpath/radar')
    },
    // 列表
    _Getjumpmore() {
      Getjumpmore().then(res => {
        if (res.code === ERR_OK) {
          // let httpUrl1 = 'http://10.0.1.184'
          console.log(res.data)
          let urlage = res.data
          var imgages = "images/Scenic/"
          for (var i = 0; i < urlage.length; i++) {
            urlage[i].imageName = `${httpUrlimg}:80/${imgages}${urlage[i].imageName}`
          }
          this.rainArray = urlage
          console.log(this.rainArray)
        }
      })
    }
  },
  mounted () {
    this._Getjumpmore()
  }
}
</script>

<style lang="less" scoped>
.jumpmore {
  width: 100%;
  height: 100%;
  > .hearder-title {
    color: #fff;
    font-size: 2em;
    text-align: center;
    line-height: 1rem;
    padding-top: 18px;
    background-color: #193ba8;
    padding-bottom: 4px;
    > .classiconsize {
      padding-right: 5px;
    }
    > span {
      margin-left: 5px;
    }
  }
}

.bg-blur {
  background: url('./img/bgib.png');
  background-size: 100% 100%;
}
.bg-blur::before {
  content: "";
  display: block;
}
.content-front {
  padding-bottom: 1rem;
  border: 0.1px solid #ccc;
  color: #ffffff;
  > .hearder-titlerain {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    > .heardertitle {
      display: inline-block;
      font-size: 1rem;
    }
    > .hearder-time {
      font-size: 1.1rem;
      color:rgba(255,255,255,1);
      opacity:0.6;
      display: inline-block;
    }
  }
  > .content-rain {
    width: 100%;
    > img {
      width: 11rem;
      height: 11rem;
      margin-left: 10px;
      margin-top: 10px;
    }
    > .right-rain {
      display: inline-block;
      width: 44%;
      text-align: center;
      padding: 8px 10px 10px 3rem;
      > span {
        font-size: 1.2em;
        padding: 7px 0;
      }
    }
  }
}
</style>
