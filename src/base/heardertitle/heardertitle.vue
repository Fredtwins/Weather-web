<template>
  <div class="hearder-titletop">
    <div class="title-content clear">
      <van-icon 
        class="classiconsize pull-left" 
        name="arrow-left" 
        @click="jumppathlast"/>
      {{titlecontet}}
      <van-icon 
        class="classiconsize pull-right" 
        name="arrow" 
        @click="jumppathlow"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
Vue.use(Icon)

export default {
  components: {
    Icon
  },
  props: {
    titlecontet: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    jumppathlast () {
      this.$router.push('/navpath/jumpmore')
    },
    jumppathlow () {
      this.$router.push('/navpath/Satellite')
    }
  }
}
</script>

<style lang="less" scoped>
.hearder-titletop {
  
  > .title-content {
    color: #fff;
    font-size: 2em;
    text-align: center;
    padding-top: 14px;
    padding-bottom: 4px;
  }
}
</style>
