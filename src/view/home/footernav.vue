<template>
  <div class="footer-nav">
    <!-- <van-tabbar v-model="active" @change="changjump">
      <van-tabbar-item 
        v-for="(item, index) in imgTabUrl" 
        :key="item.index" 
        :icon="item.icon"
        >
        <span>{{item.name}}</span>
      </van-tabbar-item>
    </van-tabbar> -->
    <ul>
			<li 
				:class="[flag==index?'hover':'']" 
				v-for="(item, index) in imgTabUrl" 
				:key="item.index"
				@click="Clickjump(item.name)"
				>
        <img :src="item.icon" />
        <br />
        {{item.name}}
      </li>
		</ul>
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
      flag: 0,
      actions: [
        {
          name: '景区预报'
        }, {
          name: '雷达图'
        }, {
          name: '卫星云图'
        }
      ],
      active: 0,
      imgTabUrl: [
        {
          icon: require('./img/shouye.png'),
          name: '首页',
          urlpath: '/home/homeporject'
        }, {
          icon: require('./img/tianqiyubao.png'),
          name: '天气预报',
          urlpath: '/indexweather'
        }, {
          icon: require('./img/101-copy.png'),
          name: '天气监测',
          urlpath: '/site/sitejump'
        }, {
          icon: require('./img/daohang.png'),
          name: '导航',
          urlpath: ''
        }
      ]
    }
  },
  methods: {
    // 点击图标时跳转
    Clickjump (name) {
      console.log(name)
      if (name === '首页') {
        this.$router.push('/home/homeporject')
        this.flag = 0
      } else if (name === '天气预报') {
        this.$router.push('/indexweather')
        this.flag = 1
      } else if (name === '天气监测') {
        this.flag = 2
        this.$router.push('/site/sitejump')
      } else if (name === '导航') {
        this.flag = 3
        this.show = true
      }
      sessionStorage.setItem('isSelect', this.flag)
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      if (item.name === '景区预报') {
        this.$router.push('/navpath/jumpmore')
      } else if (item.name === '卫星云图') {
        this.$router.push('/navpath/Satellite')
      } else if (item.name === '雷达图') {
        this.$router.push('/navpath/radar')
      }
    }
  },
  mounted () {
    this.flag = parseInt(sessionStorage.getItem('isSelect'))
  }
}
</script>

<style lang="less" scoped>
.footer-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background-color: #000;
  color: #fff;
  > ul {
    width: 100%;
    height: 100%;
    display: flex;
    > li {
      width: 25%;
      height: 100%;
      text-align: center;
      color: #fff;
      > img {
        width: 30%;
        height: 2.2rem;
      }
    }
    > .hover {
      background-color: #3FC0FC;
    }
  }
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
