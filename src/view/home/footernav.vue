<template>
  <div class="footer-nav">
    <van-tabbar v-model="active" @change="changjump">
      <van-tabbar-item 
        v-for="(item, index) in imgTabUrl" 
        :key="item.index" 
        :icon="item.icon"
        >
        <span>{{item.name}}</span>
        <!-- <router-link :to="item.urlpath">{{item.name}}</router-link> -->
      </van-tabbar-item>
    </van-tabbar>
    <van-actionsheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem, Actionsheet } from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Actionsheet)

export default {
  components: {
    Tabbar,
    TabbarItem,
    Actionsheet
  },
  data () {
    return {
      show: false,
      actions: [
        {
          name: '实景天气'
        }, {
          name: '气象雷达图'
        }, {
          name: '气象卫星云图'
        }
      ],
      active: 0,
      imgTabUrl: [
        {
          icon: 'home',
          name: '首页',
          urlpath: '/home/homeporject'
        }, {
          icon: 'photo',
          name: '天气预报',
          urlpath: '/indexweather'
        }, {
          icon: 'idcard',
          name: '天气监测',
          urlpath: '/site/sitejump'
        }, {
          icon: 'more-o',
          name: '导航',
          urlpath: ''
        }
      ]
    }
  },
  methods: {
    // 点击图标时跳转
    changjump (val) {
      if (this.active === 0) {
        this.$router.push('/home/homeporject')
      } else if (this.active === 1) {
        this.$router.push('/indexweather')
      } else if (this.active === 2) {
        this.$router.push('/site/sitejump')
      } else if (this.active === 3) {
        this.show = true
      }
      sessionStorage.setItem('isSelect', val)
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      if (item.name === '实景天气') {
        this.$router.push('/navpath/jumpmore')
      } else if (item.name === '气象卫星云图') {
        this.$router.push('/navpath/Satellite')
      } else if (item.name === '气象雷达图') {
        this.$router.push('/navpath/radar')
      }
    }
  },
  mounted () {
    this.active = parseInt(sessionStorage.getItem('isSelect'))
  }
}
</script>

<style lang="less" scoped>
.footer-nav {
  padding-top: 3rem;
}
.van-tabbar {
  background-color: #000;
  color: #fff;
}
.van-tabbar-item__text {
  color: #fff;
  > a {
    color: #fff;
  }
}
.van-tabbar-item--active {
  color: #3FC0FC;
}
</style>
