<template>
  <div class="weatherindex">
    <!-- 头部 -->
    <div class="hearder-title clear">
      天气预报
      <van-notice-bar
        text="十五天天气查询，从当天开始算起，未来十五天的天气走势。"
        left-icon="http://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
      />
    </div>
    <!-- 大的背景图 模糊 -->
    <div class="bg-blur">
      <div class="content-front">
        <!-- 标题 -->
        <div class="titleweather">十五天预报</div>
        <div class="big-weather">
          <!-- 内容 -->
          <div class="content-weather">
            <!-- 分成一个个的小盒子装着 -->
            <div class="first" v-for="(item, index) in onearr" :key="item.index">
              <div class="tom-day">{{item.week}}</div>
              <div class="tom-do"><img :src="item.wbi" alt=""></div>
              <div class="tom-date">{{item.date}}</div>
              <div class="tom-img">{{item.wd}}</div>
              <div class="tom-tmax">{{item.wf}}</div>
              <div class="tom-level">{{item.wb}}</div>
            </div>
          </div>
          <!-- <weathercan/> -->
          <canvas id="canvasz"></canvas>
        </div>
        <div class="big-weather">
          <!-- 内容 -->
          <div class="content-weather">
            <!-- 分成一个个的小盒子装着 -->
            <div class="first" v-for="(item, index) in tooarr" :key="item.index">
              <div class="tom-day">{{item.week}}</div>
              <div class="tom-do"><img :src="item.wbi" alt=""></div>
              <div class="tom-date">{{item.date}}</div>
              <div class="tom-img">{{item.wd}}</div>
              <div class="tom-tmax">{{item.wf}}</div>
              <div class="tom-level">{{item.wb}}</div>
            </div>
          </div>
          <canvas id="canvas"></canvas>
        </div>
        <div class="big-weather">
          <!-- 内容 -->
          <div class="content-weather">
            <!-- 分成一个个的小盒子装着 -->
            <div class="first" v-for="(item, index) in treearr" :key="item.index">
              <div class="tom-day">{{item.week}}</div>
              <div class="tom-date">{{item.date}}</div>
              <div class="tom-do"><img :src="item.wbi" alt=""></div>
              <div class="tom-img">{{item.wd}}</div>
              <div class="tom-tmax">{{item.wf}}</div>
              <div class="tom-level">{{item.wb}}</div>
            </div>
          </div>
          <canvas id="canvasx"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from "jquery";
import { NoticeBar  } from 'vant'
import { weatherList } from '../../api/indexweather.js'
import { ERR_OK, imgweather } from '../../api/config'
Vue.use(NoticeBar)

export default {
  components: {
    NoticeBar
  },
  data() {
    return {
      weatherArray: [],
      onearr: [],
      tooarr: [],
      treearr: []
    };
  },
  created() {
    this._weatherList()
  },
  methods: {
    // 显示canvas图
    _getcanvasList() {
      var _this = this
      $(function() {
        // console.log(_this.onearr)
        var tminarr = []
        var tmaxarr = []
        for (var i = 0; i < _this.onearr.length; i++) {
          tminarr.push(parseInt(_this.onearr[i].tmin))
          tmaxarr.push(parseInt(_this.onearr[i].tmax))
        }
        //温度走势图start
        var forecast = new Array();
        forecast[0] = new Array();
        forecast[1] = new Array();
        forecast[2] = new Array();
        forecast[3] = new Array();
        forecast[4] = new Array();
        forecast[0]["high"] = tmaxarr[0];
        forecast[0]["low"] = tminarr[0];
        forecast[1]["high"] = tmaxarr[1];
        forecast[1]["low"] = tminarr[1];
        forecast[2]["high"] = tmaxarr[2];
        forecast[2]["low"] = tminarr[2];
        forecast[3]["high"] = tmaxarr[3];
        forecast[3]["low"] = tminarr[3];
        forecast[4]["high"] = tmaxarr[4];
        forecast[4]["low"] = tminarr[4];
        var maxTemp = forecast[0]["high"];
        var minTemp = forecast[0]["low"];

        var high_tep_arr = [];
        for (var x = 0; x < forecast.length; x++) {
          var high_tep = forecast[x]["high"];
          if (high_tep > maxTemp) {
            maxTemp = high_tep;
          }
          high_tep_arr.push(high_tep);
        }
        var low_tep_arr = [];
        for (var x = 0; x < forecast.length; x++) {
          var low_tep = forecast[x]["low"];
          if (low_tep < minTemp) {
            minTemp = low_tep;
          }
          low_tep_arr.push(low_tep);
        }
        var canvasz = document.getElementById("canvasz");
        var context = canvasz.getContext("2d");
        canvasz.style.width = "100%";
        // canvas.style.height = '300px';
        // canvas.width = 1000;
        canvasz.height = 170;
        var item_width = 60;
        var wencha = maxTemp - minTemp;
        var tem_pexi = 80 / (maxTemp - minTemp); //计算每度对应的px。80是自己设定的，这里画布总高是174,所以我设定这几天最高温度和最低温度之间间距为80。
        context.translate(30, maxTemp * tem_pexi + 40); //画布的偏移量，53是画布x轴从左向右方向偏移。后面的值是y轴（细说一下：web里面的坐标轴和我们数学知识上学习的坐标系，y轴是相反的。故这里画点为了让温度高的点显示在温度低的上面，我们要取反。取反以后这个点就跑到画布以外去了，所以我们要向正方向偏移出来。偏移的数值，我这里是选择了最高温度所占对应px加上每个点上要写文字的距离，从而计算出来）。
        //折线走势
        var new_high_x = [];
        var new_high_y = [];
        function draw_line(a, high_color_line) {
          new_high_x = [];
          new_high_y = [];
          for (var j = 0; j < a.length; j++) {
            //a温度数组
            //画点
            context.beginPath();
            var high_y = parseInt(Number(a[j]) * tem_pexi);
            var high_x = j * item_width;
            context.arc(high_x, -high_y, 3, 0, 2 * Math.PI, true);
            context.strokeStyle = high_color_line;
            context.stroke();
            context.fillStyle = high_color_line;
            context.fill();
            context.closePath();
            //画线
            new_high_x.push(high_x);
            new_high_y.push(-high_y);
            //写文字
            if (a == high_tep_arr) {
              context.beginPath();
              context.font = "12px 微软雅黑";
              context.fillStyle = "#000";
              context.fillText(a[j] + "°", high_x - 10, -high_y - 10, 50);
              context.stroke();
              context.closePath();
            } else {
              context.beginPath();
              context.font = "12px 微软雅黑";
              context.fillStyle = "#000";
              context.fillText(a[j] + "°", high_x - 10, -high_y + 30, 50);
              context.stroke();
              context.closePath();
            }
          }
          for (var z = 0; z < 15; z++) {
            // if (z == 6) {
            //   continue;
            // }
            context.beginPath();
            context.moveTo(new_high_x[z], new_high_y[z]);
            context.lineTo(new_high_x[z + 1], new_high_y[z + 1]);
            context.strokeStyle = high_color_line;
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
          }
        }
        draw_line(high_tep_arr, "#fcc370");
        draw_line(low_tep_arr, "#94ccf9");
        //温度走势图end
      });

      $(function() {
        //温度走势图start
        var tminarrtoo = []
        var tmaxarrtoo = []
        for (var i = 0; i < _this.tooarr.length; i++) {
          tminarrtoo.push(parseInt(_this.tooarr[i].tmin))
          tmaxarrtoo.push(parseInt(_this.tooarr[i].tmax))
        }
        var forecast = new Array();
        forecast[0] = new Array();
        forecast[1] = new Array();
        forecast[2] = new Array();
        forecast[3] = new Array();
        forecast[4] = new Array();
        forecast[0]["high"] = tmaxarrtoo[0];
        forecast[0]["low"] = tminarrtoo[0];
        forecast[1]["high"] = tmaxarrtoo[1];
        forecast[1]["low"] = tminarrtoo[1];
        forecast[2]["high"] = tmaxarrtoo[2];
        forecast[2]["low"] = tminarrtoo[2];
        forecast[3]["high"] = tmaxarrtoo[3];
        forecast[3]["low"] = tminarrtoo[3];
        forecast[4]["high"] = tmaxarrtoo[4];
        forecast[4]["low"] = tminarrtoo[4];
        var maxTemp = forecast[0]["high"];
        var minTemp = forecast[0]["low"];

        var high_tep_arr = [];
        for (var x = 0; x < forecast.length; x++) {
          var high_tep = forecast[x]["high"];
          if (high_tep > maxTemp) {
            maxTemp = high_tep;
          }
          high_tep_arr.push(high_tep);
        }
        var low_tep_arr = [];
        for (var x = 0; x < forecast.length; x++) {
          var low_tep = forecast[x]["low"];
          if (low_tep < minTemp) {
            minTemp = low_tep;
          }
          low_tep_arr.push(low_tep);
        }
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        canvas.style.width = "100%";
        // canvas.style.height = '300px';
        // canvas.width = 1000;
        canvas.height = 170;
        var item_width = 60;
        var wencha = maxTemp - minTemp;
        var tem_pexi = 80 / (maxTemp - minTemp); //计算每度对应的px。80是自己设定的，这里画布总高是174,所以我设定这几天最高温度和最低温度之间间距为80。
        context.translate(30, maxTemp * tem_pexi + 40); //画布的偏移量，53是画布x轴从左向右方向偏移。后面的值是y轴（细说一下：web里面的坐标轴和我们数学知识上学习的坐标系，y轴是相反的。故这里画点为了让温度高的点显示在温度低的上面，我们要取反。取反以后这个点就跑到画布以外去了，所以我们要向正方向偏移出来。偏移的数值，我这里是选择了最高温度所占对应px加上每个点上要写文字的距离，从而计算出来）。
        //折线走势
        var new_high_x = [];
        var new_high_y = [];
        function draw_line(a, high_color_line) {
          // console.log(a)
          new_high_x = [];
          new_high_y = [];
          for (var j = 0; j < a.length; j++) {
            //a温度数组
            //画点
            context.beginPath();
            var high_y = parseInt(Number(a[j]) * tem_pexi);
            var high_x = j * item_width;
            context.arc(high_x, -high_y, 3, 0, 2 * Math.PI, true);
            context.strokeStyle = high_color_line;
            context.stroke();
            context.fillStyle = high_color_line;
            context.fill();
            context.closePath();
            //画线
            new_high_x.push(high_x);
            new_high_y.push(-high_y);
            //写文字
            if (a == high_tep_arr) {
              context.beginPath();
              context.font = "12px 微软雅黑";
              context.fillStyle = "#000";
              context.fillText(a[j] + "°", high_x - 10, -high_y - 10, 50);
              context.stroke();
              context.closePath();
            } else {
              context.beginPath();
              context.font = "12px 微软雅黑";
              context.fillStyle = "#000";
              context.fillText(a[j] + "°", high_x - 10, -high_y + 30, 50);
              context.stroke();
              context.closePath();
            }
          }
          for (var z = 0; z < 15; z++) {
            // if (z == 6) {
            //   continue;
            // }
            context.beginPath();
            context.moveTo(new_high_x[z], new_high_y[z]);
            context.lineTo(new_high_x[z + 1], new_high_y[z + 1]);
            context.strokeStyle = high_color_line;
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
          }
        }
        draw_line(high_tep_arr, "#fcc370");
        draw_line(low_tep_arr, "#94ccf9");
        //温度走势图end
      });

      $(function() {
        //温度走势图start
        var tminarrtree = []
        var tmaxarrtree = []
        for (var i = 0; i < _this.treearr.length; i++) {
          tminarrtree.push(parseInt(_this.treearr[i].tmin))
          tmaxarrtree.push(parseInt(_this.treearr[i].tmax))
        }
        var forecast = new Array();
        forecast[0] = new Array();
        forecast[1] = new Array();
        forecast[2] = new Array();
        forecast[3] = new Array();
        forecast[4] = new Array();
        forecast[0]["high"] = tmaxarrtree[0];
        forecast[0]["low"] = tminarrtree[0];
        forecast[1]["high"] = tmaxarrtree[1];
        forecast[1]["low"] = tminarrtree[1];
        forecast[2]["high"] = tmaxarrtree[2];
        forecast[2]["low"] = tminarrtree[2];
        forecast[3]["high"] = tmaxarrtree[3];
        forecast[3]["low"] = tminarrtree[3];
        forecast[4]["high"] = tmaxarrtree[4];
        forecast[4]["low"] = tminarrtree[4];
        var maxTemp = forecast[0]["high"];
        var minTemp = forecast[0]["low"];

        var high_tep_arr = [];
        for (var x = 0; x < forecast.length; x++) {
          var high_tep = forecast[x]["high"];
          if (high_tep > maxTemp) {
            maxTemp = high_tep;
          }
          high_tep_arr.push(high_tep);
        }
        var low_tep_arr = [];
        for (var x = 0; x < forecast.length; x++) {
          var low_tep = forecast[x]["low"];
          if (low_tep < minTemp) {
            minTemp = low_tep;
          }
          low_tep_arr.push(low_tep);
        }
        var canvasx = document.getElementById("canvasx");
        var context = canvasx.getContext("2d");
        canvasx.style.width = "100%";
        // canvas.style.height = '300px';
        // canvas.width = 1000;
        canvasx.height = 170;
        var item_width = 60;
        var wencha = maxTemp - minTemp;
        var tem_pexi = 80 / (maxTemp - minTemp); //计算每度对应的px。80是自己设定的，这里画布总高是174,所以我设定这几天最高温度和最低温度之间间距为80。
        context.translate(30, maxTemp * tem_pexi + 40); //画布的偏移量，53是画布x轴从左向右方向偏移。后面的值是y轴（细说一下：web里面的坐标轴和我们数学知识上学习的坐标系，y轴是相反的。故这里画点为了让温度高的点显示在温度低的上面，我们要取反。取反以后这个点就跑到画布以外去了，所以我们要向正方向偏移出来。偏移的数值，我这里是选择了最高温度所占对应px加上每个点上要写文字的距离，从而计算出来）。
        //折线走势
        var new_high_x = [];
        var new_high_y = [];
        function draw_line(a, high_color_line) {
          // console.log(a)
          new_high_x = [];
          new_high_y = [];
          for (var j = 0; j < a.length; j++) {
            //a温度数组
            //画点
            context.beginPath();
            var high_y = parseInt(Number(a[j]) * tem_pexi);
            var high_x = j * item_width;
            context.arc(high_x, -high_y, 3, 0, 2 * Math.PI, true);
            context.strokeStyle = high_color_line;
            context.stroke();
            context.fillStyle = high_color_line;
            context.fill();
            context.closePath();
            //画线
            new_high_x.push(high_x);
            new_high_y.push(-high_y);
            //写文字
            if (a == high_tep_arr) {
              context.beginPath();
              context.font = "12px 微软雅黑";
              context.fillStyle = "#000";
              context.fillText(a[j] + "°", high_x - 10, -high_y - 10, 50);
              context.stroke();
              context.closePath();
            } else {
              context.beginPath();
              context.font = "12px 微软雅黑";
              context.fillStyle = "#000";
              context.fillText(a[j] + "°", high_x - 10, -high_y + 30, 50);
              context.stroke();
              context.closePath();
            }
          }
          for (var z = 0; z < 15; z++) {
            // if (z == 6) {
            //   continue;
            // }
            context.beginPath();
            context.moveTo(new_high_x[z], new_high_y[z]);
            context.lineTo(new_high_x[z + 1], new_high_y[z + 1]);
            context.strokeStyle = high_color_line;
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
          }
        }
        draw_line(high_tep_arr, "#fcc370");
        draw_line(low_tep_arr, "#94ccf9");
        //温度走势图end
      });
    },
    // 数据渲染
    _weatherList () {
      weatherList().then(res => {
      	console.log(res)
        if (res.code === ERR_OK) {
          for (var i = 0; i < res.data.nDay.length; i++) {
            var temp = `${imgweather}${res.data.nDay[i].wbi}.png`
            res.data.nDay[i].wbi = temp
          }
          let arrNday = res.data.nDay
          this.onearr = arrNday.slice(0, 5)
          this.tooarr = arrNday.slice(5, 10)
          this.treearr = arrNday.slice(10, 16)
        }
      })
    }
  },
  mounted () {
//  this.$nextTick(() => {
//    this._weatherList()
	  setTimeout(() => {
	    this._getcanvasList()
	  }, 200)
//  })
	}
};
</script>

<style lang="less" scoped>
.weatherindex {
  > .hearder-title {
    color: #fff;
    font-size: 2em;
    text-align: center;
    padding-top: 18px;
    // background-color: #193ba8;
    padding-bottom: 4px;
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
  margin-bottom: 8px;
  margin-top: 10px;
  border: 0.1px solid #ccc;
  color: #ffffff;
  > .titleweather {
    padding: 1rem;
    font-size: 1.3em;
    border-bottom: 0.1px solid #ccc;
  }
  > .big-weather {
    border-bottom: 2px solid #ccc;
    padding-bottom: 3rem;
    > .content-weather {
      width: 100%;
      display: flex;
      // border-bottom: 1px solid #ccc;
      > .first {
        font-size: 1.3em;
        width: 20%;
        text-align: center;
        display: inline-block;
        > .tom-day {
          padding: 5px 0;
        }
        > .tom-date {
          padding: 5px 0;
        }
        > .tom-img {
          padding: 5px 0;
        }
        > .tom-tmax {
          padding: 5px 0;
        }
        > .tom-level {
          padding: 5px 0;
        }
        > .tom-do {
          padding: 5px 0;
          color: #ccc;
        }
      }
    }
  }
}
</style>
