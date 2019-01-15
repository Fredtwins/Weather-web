<template>
  <div class="bg-blur">
    <Select v-model="model" size="small" style="width:45%" @on-change="stieTimechange">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
    </Select>
    <Select v-model="model2" size="small" style="width:45%" @on-change="settimechange">
      <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.text }}</Option>
    </Select>
    <!-- <Button type="primary" shape="circle" icon="ios-search"></Button> -->
    <Table v-if="showtable" :loading="loading" border :columns="columns5" :data="data5"></Table>
    <Table v-if="showtable2" :loading="loading2" border :columns="columns2" :data="data2"></Table>
    <Table v-if="showtable3" :loading="loading3" border :columns="columns3" :data="data3"></Table>
    <Table v-if="showtable4" :loading="loading4" border :columns="columns4" :data="data4"></Table>
  </div>
</template>

<script>
import { cityThead, showtowthead, HourThead, SfiveTime } from '../../common/js/table.js'
import { siteTime, TimeList, shareTime, DayTime, HourTime, Stime } from '../../api/sitetab.js'
import { ERR_OK } from '../../api/config.js'

export default {
  props: {
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showtable: true,
      showtable2: false,
      showtable3: false,
      showtable4: false,
      loading2: false,
      loading3: false,
      loading4: false,
      model: '',
      model2: '',
      loading: false,
      columns5: cityThead(this),
      columns2: showtowthead(this),
      columns3: HourThead(this),
      columns4: SfiveTime(this),
      data5: [],
      data2: [],
      data3: [],
      data4: [],
      cityList: [
        {
          value: '自动站时次记录',
          index: 0
        },
        {
          value: '日记录(20-20时)',
          index: 1
        },
        {
          value: '日记录(8-8时)',
          index: 2
        },
        {
          value: '时极值、雨量',
          index: 3
        },
        {
          value: '时内五分钟雨量',
          index: 4
        }
      ],
      timeList: []
    }
  },
  methods: {
    // 首次进来下来时间
    _siteTime() {
      siteTime().then(res => {
        if (res.code === ERR_OK) {
          this.timeList = res.data.awsTimesTimeList
          this.model = this.cityList[0].value
          this.model2 = res.data.awsTimesTimeList[0].value
          this.settimechange()
        }
      })
    },
    // 选择左边的触发事件改变右边的值
    stieTimechange(value, flag) {
      siteTime().then(res => {
        if (res.code === ERR_OK) {
          this.$emit('saveCity', value)
          if (value === '自动站时次记录') {
            this.timeList = res.data.awsTimesTimeList
            this.model2 = ''
            // this.model2 = res.data.awsTimesTimeList[0].value
          } else if (value === '日记录(20-20时)') {
            this.timeList = res.data.awsDay20TimeList
            this.model2 = ''
            // this.model2 = res.data.awsDay20TimeList[0].text
          } else if (value === '日记录(8-8时)') {
            this.timeList = res.data.awsDay8TimeList
            this.model2 = ''
          } else if (value === '时极值、雨量') {
            this.timeList = res.data.awsHourFoTimeList
            this.model2 = ''
          } else if (value === '时内五分钟雨量') {
            this.timeList = res.data.awsR5mFoTimeList
            this.model2 = ''
          };
          if (flag) {
            this.model = this.option.selectCity;
            this.model2 = this.option.selectTime;
          }
          this.settimechange()
        }
      })
    },
    // 选择右边的，判断用哪个接口
    settimechange(val) {
      // console.log(this.model)
      if (val) {
        this.$emit('saveTime', val)
      }
      if (this.model === '自动站时次记录') {
        let search = {
          datetime: val || this.model2,
          dist: '高明区'
        }
        this.loading = true
        // console.log(search)
        TimeList(search).then(res => {
          if (res.code === ERR_OK) {
            this.loading = false
            this.showtable = true
            this.showtable2 = false
            this.showtable3 = false
            this.showtable4 = false
            this.data5 = res.data
          }
        })
      } else if (this.model === '日记录(20-20时)') {
        let searchvalue = {
          datetime2: val || this.model2,
          dist: '高明区'
        }
        this.loading2 = true
        shareTime(searchvalue).then(res => {
          if (res.code === ERR_OK) {
            this.loading2 = false
            this.showtable = false
            this.showtable2 = true
            this.showtable3 = false
            this.showtable4 = false
            this.data2 = res.data
          }
        })
      } else if (this.model === '日记录(8-8时)') {
        let searchtime = {
          datetime2: val || this.model2,
          dist: '高明区'
        }
        this.loading2 = true
        DayTime(searchtime).then(res => {
          if (res.code === ERR_OK) {
            this.loading2 = false
            this.showtable = false
            this.showtable2 = true
            this.showtable3 = false
            this.showtable4 = false
            this.data2 = res.data
          }
        })
      } else if (this.model === '时极值、雨量') {
        let searchHourtime = {
          datetime: val || this.model2,
          dist: '高明区'
        }
        this.loading3 = true
        HourTime(searchHourtime).then(res => {
          if (res.code === ERR_OK) {
            // console.log(res)
            this.loading3 = false
            this.showtable = false
            this.showtable2 = false
            this.showtable3 = true
            this.showtable4 = false
            this.data3 = res.data
          }
        })
      } else if (this.model === '时内五分钟雨量') {
        let searchfivetime = {
          formatTime: val || this.model2,
          dist: '高明区'
        }
        this.loading4 = true
        Stime(searchfivetime).then(res => {
          if (res.code === ERR_OK) {
            // console.log(res)
            this.loading4 = false
            this.showtable = false
            this.showtable2 = false
            this.showtable3 = false
            this.showtable4 = true
            var tempObj = res.data.map(item => {
              return {
                stationname: item.stationname,
                ...item.r5s
              }
            })
            this.data4 = tempObj
          }
        })
      }
    },
    // 一开始进来默认显示
    _GettablList() {
      let datetime = {
        datetime: this.model2,
        dist: '高明区'
      }
      TimeList(datetime).then(res => {
        if (res.code === ERR_OK) {
          this.showtable = true
          this.data5 = res.data
        }
      })
    }
  },
  mounted() {
    if (this.option.selectTime || this.option.selectCity) {
      this.stieTimechange(this.option.selectCity, true)
    } else {
      this._siteTime()
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-table-wrapper {
  margin-top: 10px;
}

.ivu-btn {
  border-radius: 5px;
}
</style>
