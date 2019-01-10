<template>
  <div class="site">
    <!-- 头部标题 -->
    <div class="header-title clear">
      自动站点
      <van-notice-bar
        text="自动站查询，记录着佛山市各个地区自动站各个要素的数据。"
        left-icon="http://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
      />
    </div>
    <!-- 内容 -->
    <div class="site-content">
      <van-tabs v-model="active">
        <van-tab title="全市">
          <qstab v-if="active===0" />
        </van-tab>
        <van-tab title="禅城">
          <cctab v-if="active===1" />
        </van-tab>
        <van-tab title="南海">
          <nhtab v-if="active===2" />
        </van-tab>
        <van-tab title="高明">
          <gmtab v-if="active===3" />
        </van-tab>
        <van-tab title="三水">
          <sstab v-if="active===4" />
        </van-tab>
        <van-tab title="顺德">
          <sdtab v-if="active===5" />
          <!-- <div class="bg-blur">
            <div class="content-front" v-for="(item, index) in rainArray" :key="item.index">
              <div class="hearder-titlerain clear">
                <div class="heardertitle">{{item.title}}</div>
                <div class="hearder-time pull-right">{{item.titletime}}</div>
              </div>
              <div class="content-rain">
                <div class="t-weather">25℃</div>
                <div class="rain-weather">时雨量(mm)0</div>
                <div class="fly-weather">西北风</div>
                <div class="tmax-weather">风速(m/s)5.9</div>
              </div>
            </div>
          </div> -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import cctab from './cctab'
import qstab from './qstab'
import nhtab from './nhtab'
import gmtab from './gmtab'
import sstab from './sstab'
import sdtab from './sdtab'
import { Tab, Tabs, Icon, NoticeBar  } from 'vant'
import { cityThead } from '../../common/js/table.js'
import { siteTab } from '../../api/sitetab.js'
import { ERR_OK } from '../../api/config.js'
Vue.use(Tab).use(Tabs).use(Icon).use(NoticeBar)

export default {
  components: {
    Tab,
    Tabs,
    Icon,
    cctab,
    qstab,
    nhtab,
    gmtab,
    sstab,
    sdtab,
    NoticeBar 
  },
  data () {
    return {
      loading: false,
      columns5: cityThead(this),
      data5: [
        {
            1: 'John Brown',
            2: 18,
            3: 'New York No. 1 Lake Park',
            4: '2016-10-03',
            5: '2016-10-03'
        },
        {
            1: 'John Brown',
            2: 18,
            3: 'New York No. 1 Lake Park',
            4: '2016-10-03',
            5: '2016-10-03'
        },
        {
            1: 'John Brown',
            2: 18,
            3: 'New York No. 1 Lake Park',
            4: '2016-10-03',
            5: '2016-10-03'
        },
        {
            1: 'John Brown',
            2: 18,
            3: 'New York No. 1 Lake Park',
            4: '2016-10-03',
            5: '2016-10-03'
        }
      ],
      model2: '',
      active: 0,
      tabtitle: [
        {
          id: '全市',
          text: '内容1'
        }, {
          id: '禅城',
          text: '内容2'
        }, {
          id: '南海',
          text: '内容3'
        }, {
          id: '高明',
          text: '内容4'
        }, {
          id: '三水',
          text: '内容5'
        }, {
          id: '顺德',
          text: '内容6'
        }
      ],
      rainArray: [
        {
          title: '佛山市禅城区祖庙路',
          titletime: '11',
          imgUrl: require('./img/fengjing.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        },
        {
          title: '佛山市禅城区祖庙路',
          titletime: '11',
          imgUrl: require('./img/fengjing.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        },
        {
          title: '佛山市禅城区祖庙路',
          titletime: '11',
          imgUrl: require('./img/fengjing3.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        },
        {
          title: '佛山市禅城区祖庙路',
          titletime: '11',
          imgUrl: require('./img/fengjing2.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        }, {
          title: '佛山市禅城区祖庙路',
          titletime: '11',
          imgUrl: require('./img/fengjing2.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        },
        {
          title: '佛山市禅城区祖庙路',
          titletime: '11',
          imgUrl: require('./img/fengjing2.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        }
      ],
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ]
    }
  },
  methods: {
    
  },
  mounted () {
    
  }
}
</script>

<style lang="less" scoped>
.site {
  width: 100%;
  height: 100%;
  > .header-title {
    color: #fff;
    font-size: 2em;
    text-align: center;
    padding-top: 18px;
    background-color: #193ba8;
    padding-bottom: 4px;
    > span {
      margin-left: 5px;
    }
  }
  > .site-content {
    margin-bottom: 4.5rem;
  }
}
.van-tabs__line {
  bottom: 4px;
}
// .home-warpper {
//   position: absolute;
//   top: 7.2rem;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   margin-bottom: 10rem;
//   background: url('./img/bgib.png');
//   background-size: 100% 100%;
// }

.bg-blur {
  background: url('./img/bgib.png');
  background-size: 100% 100%;
}
.bg-blur::before {
  content: "";
  display: block;
}
.content-front {
  height: 5.5rem;
  // text-align: center;
  margin-bottom: 8px;
  margin-top: 10px;
  border: 0.1px solid #ccc;
  color: #ffffff;
  > .hearder-titlerain {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    > .heardertitle {
      display: inline-block;
      font-size: 1.1rem;
      font-weight: 500;
    }
    > .hearder-time {
      font-size: 1.1rem;
      color:rgba(255,255,255,1);
      opacity:0.6;
      display: inline-block;
    }
  }
  > .content-rain {
    display: flex;
    font-size: 1.2em;
    > .t-weather {
      width: 25%;
      // text-align: center;
      padding-left: 1rem;
    }
    > .rain-weather {
      width: 25%;
      text-align: center;
    }
    > .fly-weather {
      width: 25%;
      text-align: center;
    }
    > .tmax-weather {
      width: 25%;
      text-align: center;
    }
  }
}

.ivu-table-wrapper {
  margin-top: 10px;
}

.ivu-btn-circle-outline.ivu-btn-icon-only, .ivu-btn-circle.ivu-btn-icon-only {
  border-radius: 5px !important;
}

.ivu-icon {
  line-height: 1 !important;
}

</style>
