<template>
  <keep-alive>
  <div class="homeporject">
    <!-- 背景图 -->
    <div class="weathertop">
      <!-- 图片头部 -->
      <div class="top-picture clear">
        <div class="title-left pull-left" @click="showAear=!showAear"> + </div>
        <div class="title-content pull-left">{{titlecontent}}</div>
        <!-- <div class="lat">{{lat}}</div>
        <div class="long">{{long}}</div> -->
        
        <!-- <iframe id="geoPage" width=0 height=0 frameborder=0  style="display:none;" scrolling="no"
            src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
        </iframe> -->
        <div class="title-right pull-right"></div>
      </div>
      <!-- 头部提示 -->
      <!-- <div class="top-mesage">
        <div class="top-search">
          <div clas="text">{{searchtitle}}</div>
        </div>
      </div> -->
      <!-- 中间温度 -->
      <div class="temperature-content clear">
        <!-- 左边温度 -->
        <div class="left-weatear">
          <!-- 上半部分 -->
          <div class="top-leftwearth">
              <!-- 最大的温度字体 -->
            <span class="big-wearther">{{bigweater}}</span>
            
            <!-- 多云 -->
            <!-- <span class="right-rain">{{rightweater}}</span> -->
          </div>
          <!-- 下半部分 -->
          <!-- <div class="footer-leftwearth">
            <div class="footer-topwearth">
              <span>明天</span>
              <span>23/27℃</span>
            </div>
            <div class="footer-bottomwearth">
              <span>多云转晴</span>
              <span>良</span>
            </div>
          </div> -->
        </div>
        <!-- 右边aqi -->
        <!-- <div class="right-aqi pull-right">
          <div class="search-right">
            <span class="search-aqi"></span>
            AQI 良83
          </div>
        </div> -->
      </div>
      <!-- 底部四要素 -->
      <div class="factor-footer">
        <!-- <div><span></span>AQI <br><span>{{aqi}}</span></div> -->
        <div><span></span>气压 <br><span>{{pha}}</span></div>
        <div><span></span>湿度<br><span>{{u}}</span></div>
        <div><span></span>风向<br><span>{{windChinese}}</span></div>
      </div>
    </div>
    <!-- <van-loading v-show="loading" color="white" /> -->
    <!-- 天气预报 -->
    <div class="weathercontent">
      <!-- 头部标题 -->
      <div class="weather-title">精细预报</div>
      <!-- tab栏 -->
      <div class="weather-tab">
        <van-tabs v-model="active">
          <van-tab title="分钟级降雨">
            <!-- 外层一个大的 -->
            <div class="onebig">
              <div class="big-weathertabs">
                <div class="staticChart" id="main"></div>
              </div>
            </div>
          </van-tab>
          <van-tab title="逐时预报">
            <!-- 外层一个大的 -->
            <div class="onebig">
              <div class="big-weathertab" v-for="(item, index) in weatherArray" :key="item.index">
                <div class="new-weather">{{item.formatTime}}</div>
                <div class="t-weathear"><img :src="item.w" alt=""></div>
                <div class="img-weather">{{item.ws}}</div>
                <div class="rainbow-weather">{{item.t}}</div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 底部地图 -->
    <div class="weatherfooter">
      <filter-aear v-model="showAear" :filterAearData="filterAearData" @confirm="msgconfirm"></filter-aear>
      <div class="weather-title">地图</div>
      <div class="amap-page-container">
        <div :style="{width:'100%',height:'300px'}">
          <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
            <el-amap-marker v-for="(marker, index) in markers"
              :position="marker.position"
              :title="marker.title"
              :vid="index"
              :key="index"
              >
            </el-amap-marker>
          </el-amap>
        </div>
      </div>
    </div>
  </div>
  </keep-alive>
</template>

<script>
import Vue from 'vue';
import echarts from 'echarts'
import filterAear from './indexfilter'
// import linkage from './linkage.json'
import vueAMap from 'vue-amap'
import { Tab, Tabs, Loading } from 'vant';
import { GethomeList, Getlinkage } from '../../api/home.js'
import { ERR_OK, imgweather } from '../../api/config.js'

Vue.use(Tab).use(Tabs).use(Loading)
Vue.use(vueAMap)

// 初始化vue-amap
vueAMap.initAMapApiLoader({
  key: 'fb46b2ea96c5aaffaeb84a7b4361080c',
  plugin: ['Geocoder', 'MouseTool', 'MapType', 'DistrictSearch']
});

let amapManager = new vueAMap.AMapManager()

var map

export default {
  components: {
    filterAear
  },
  data () {
    return {
      filterAearData: [],
      loading: false,
      showAear: false,
      lat: '',
      long: '',
      titlecontent: '',
      searchtitle: '未来两小时不下雨，放心出门吧！',
      bigweater: '',
      rightweater: '多云',
      active: 0,
      aqi: '',
      pha: '',
      u: '',
      windChinese: '',
      weatherArray: [],
      formItem: {
        lat: 0,
        lng: 0
      },
      amapManager,
      zoom: 12,
      center: [0, 0],
      markers: [{
        position: [0, 0],
        events: {
          'click': (e) => {
            console.log(e)
          } 
        }  
      }],
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (o) {
          }
        }
      }],
    }
  },
  methods: {
    // 获取经纬度请求接口
    _getmap () {
      map = new AMap.Map('main', {
        resizeEnable: true,
        zoom: 14
      })
      var _this = this
      // 浏览器定位
      map.plugin('AMap.Geolocation', function () { // 异步加载插件
        // var icon = new AMap.Icon({
        //   size: new AMap.Size(40, 50), // 图标尺寸
        //   image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png', // Icon的图像
        //   imageSize: new AMap.Size(40, 50)// 根据所设置的大小拉伸或压缩图片
        // })
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          GeoLocationFirst: true,
          // 点标记隐藏
          showMarker: false,
          // markerOptions: {
          //   icon: icon
          // },
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition()
        // 定位成功返回信息
        AMap.event.addListener(geolocation, 'complete', function (data) {
          console.log('定位成功', data.position.lng, data.position.lat)
          _this.center = [data.position.lng, data.position.lat]
          _this.markers = []
          _this.markers.push({position:[data.position.lng, data.position.lat]})
          var searchlatlng = {
            longitude: data.position.lng,
            latitude: data.position.lat
          }
          GethomeList(searchlatlng).then(res => {
            if (res.code === ERR_OK) {
              _this.titlecontent = '佛山市'
              _this.bigweater = res.data.real.t
              _this.windChinese = res.data.real.windChinese
              _this.u = res.data.real.u
              _this.aqi = res.data.real.aqi
              _this.pha = res.data.real.p
              _this._Getrainecharts(res.data)
              for (var i = 0; i < res.data.nHours.length;i++) {
                var temp = `${imgweather}${res.data.nHours[i].w}.png`
                res.data.nHours[i].w = temp
              }
              _this.weatherArray = res.data.nHours
            }
          })
        })
        // 定位失败返回信息
        AMap.event.addListener(geolocation, 'error', function (data) {
          // console.log(data)
        })
      })
    },
    _getlatlon() {
      var _this = this
      window.addEventListener('message', function(event) {
        // 接收位置信息
        if (event.data.lat && event.data.lng) {

          _this.lat = event.data.lat
          _this.long = event.data.lng
          _this.center = [_this.long, _this.lat]
          _this.markers = []
          _this.markers.push({position:[_this.long, _this.lat]})

          setTimeout(() => {
            var searchlatlng = {
              longitude: _this.long,
              latitude: _this.lat
            }
            _this.loading = true
            GethomeList(searchlatlng).then(res => {
              if (res.code === ERR_OK) {
                _this.titlecontent = event.data.city
                _this.bigweater = res.data.real.t
                _this.windChinese = res.data.real.windChinese
                _this.u = res.data.real.u
                _this.aqi = res.data.real.aqi
                _this.pha = res.data.real.p
                for (var i = 0; i < res.data.nHours.length;i++) {
                  var temp = `${imgweather}${res.data.nHours[i].w}.png`
                  res.data.nHours[i].w = temp
                }
                _this.weatherArray = res.data.nHours
                _this.loading = false
                _this._Getrainecharts(res.data)
              }
            })
          }, 1000)
        }      
      }, false)
    },
    // 降雨echarts
    _Getrainecharts (obj) {
      var datatime = []
      var serdata = []
      let option = {}
      let myChart = echarts.init(document.getElementById('main'))
      for (var i = 0; i < obj.r5s.length; i++) {
        datatime.push(obj.r5s[i].time)
        serdata.push(obj.r5s[i].r5)
      }
      option = {
        backgroundColor: '#3267b9',
        tooltip : {
          trigger: 'axis'
        },
        toolbox: {
          show : true
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : datatime
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
        {
          type:'line',
          data: serdata
        }]
      };
      myChart.setOption(option)
    },
    // 获取联动数组
    _Getlinkage () {
      Getlinkage().then(res => {
        if (res.code === ERR_OK) {
          this.filterAearData = res.data
        }
      })
    },
    // 联动
    msgconfirm (val) {
      var strtemp = val
      let searchId = {
        id: val.id
      }
      var latset = val.latitude
      var lngset = val.longitude
      this.markers = []
      this.markers.push({position:[lngset, latset]})

      this.loading = true
      GethomeList(searchId).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.bigweater = res.data.real.t
          this.windChinese = res.data.real.windChinese
          this.u = res.data.real.u
          this.aqi = res.data.real.aqi
          this.pha = res.data.real.p
          for (var i = 0; i < res.data.nHours.length;i++) {
            var tempstr = `${imgweather}${res.data.nHours[i].w}.png`
            res.data.nHours[i].w = tempstr
          }
          this.weatherArray = res.data.nHours
          var titlename = `${val.result[0].name} ${val.result[1].name} ${val.result[2].name}`
          this.titlecontent = titlename
          this._Getrainecharts(res.data)
        }
      })
    }
  },
  created () {
    },
  mounted () {
    // this._getlatlon()
    this._getmap()
    this._Getlinkage()
  }
}
</script>

<style lang="less" scoped>
.homeporject {
  width: 100%;
  > .weathertop {
    width: 100%;
    height: 36rem;
    // background-image: url('./img/bgi.png');
    background-image: url('./img/bgimg3.png');
    background-size: 100% 100%;
    > .weathertop::before {
      content: "";
      display: block;
    }
    > .top-picture {
      color: #fff;
      line-height: 5rem;
      > .title-left {
        width: 3rem;
        height: 2.5rem;
        font-size: 3em;
        text-align: center;
      }
      > .title-content {
        font-size: 1.6em;
        padding-top: 5px;
      }
      > .title-right {

      }
    }
    > .top-mesage {
      width: 100%;
      color: #fff;
      text-align: center;
      > .top-search {
        display: inline-block;
        width: 18rem;
        height: 2rem;
        line-height: 2rem;
        border: 1px solid #07a6f1;
        border-radius: 20px;
        background-color: #07a6f1;
        font-size: 1.2em;
        font-weight: 300;
        > text {
          text-align: center;
          color: #fff;
        }
      }
    }
    > .temperature-content {
      width: 100%;
      > .left-weatear {
        width: 60%;
        display: inline-block;
        > .top-leftwearth {
          color: #fff;
          > .big-wearther {
            font-size: 4.8em;
            padding: 5px;
          }
          > .right-rain {
            padding-left: 1.8rem;
            font-size: 1.5em;
          }
        }
        > .footer-leftwearth {
          color: #fff;
          margin-top: 2rem;
          border-top: 1px solid #f1f8fd;
          border-bottom: 1px solid #f1f8fd;
          > .footer-topwearth {
            padding: 2px;
            > span {
              padding: 10px;
            }
          }
          > .footer-bottomwearth {
            padding-top: 2px;
            > span {
              padding: 10px;
            }
          }
        }
      }
      > .right-aqi {
        width: 20%;
        height: 2rem;
        background-color: #1e9ee8;
        display: inline-block;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        margin-right: 10px;
        margin-top: 20px;
        > .search-right {
          height: 1rem;
          line-height: 2rem;
          > span {
            width: 2px;
            height: 1rem;
            display: inline-block;
            background-color: #ffc100;
          }
        }
      }
    }
    > .factor-footer {
      opacity: 1;
      display: flex;
      // margin-top: 40%;
      position: relative;
      bottom: -18.4rem;
      color: #fff;
      > div {
        // width: 25%;
        width: 33.33%;
        height: 5rem;
        font-size: 1.2em;
        line-height: 2.2rem;
        text-align: center;
        color: #fff;
        background-color: #000;
        opacity: 0.4;
        border: 1px solid #000;
      }
    }
  }
  > .weathercontent {
    background-color: #315da4;
    color: #fff;
    > .weather-title {
      padding: 10px;
      font-size: 1.5em;
      border-bottom: 0.1px solid #ccc;
    }
    > .weather-tab {
      // padding-bottom: 20px;
      // margin-bottom: 4rem;
    }
  }
  > .weatherfooter {
    background-color: #315da4;
    color: #fff;
    > .weather-title {
      font-size: 1.5em;
      padding: 10px;
      border-bottom: 0.1px solid #ccc;
    }
  }
}
.onebig {
  // display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  .big-weathertab {
    background-color: #4d84cb;
    width: 20%;
    text-align: center;
    padding: 18px 0;
    display: inline-block;
    > .staticChart {
      width: 100%;
      height: 10rem;
      background-color: yellow;
    }
    > .new-weather {
      padding: 6px 0;
    }
    > .img-weather {
      padding: 6px 0;
    }
    > .rainbow-weather {
      padding: 6px 0;
    }
    > .t-weathear {
      padding: 6px 0;
    }
    > .aqi-weather {
      padding: 5px 0;
      color: #b8d0ed;
    }
  }
}

.big-weathertabs {
  background-color: #fff;
  width: 100%;
  text-align: center;
  padding: 2px 0;
  display: inline-block;
  > .staticChart {
    width: 100%;
    height: 14rem;
  }
}

#myMap1 {
  width: 100%;
  height: 10rem;
}
.amap-demo {
  height: 300px;
}
</style>
