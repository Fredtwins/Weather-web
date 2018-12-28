<template>
  <div class="navpath">
    <!-- 头部 -->
    <div class="hearder-title">佛山气象局</div>
    <!-- 内容部分 -->
    <div class="content-center">
      <!-- 实景天气 -->
      <div class="content-rain">
        <div class="rain-title clear">
          <div class="left-title">实景天气</div>
          <div class="right-more pull-right" @click="jumpmore">更多 ></div>
        </div>
        <div class="rain-conetnt">
          <img src="./img/no1.jpg" alt="">
          <div class="title-footer clear">祖庙，晴，24℃,西南风一级<span class="pull-right">今天 09:32</span></div>
        </div>
      </div>
      <!-- 气象图 -->
      <div class="content-rain">
        <div class="rain-title clear">
          <div class="left-title">实景天气</div>
          <div class="right-more pull-right">更多 ></div>
        </div>
        <div class="rain-conetnt">
          <img src="./img/no2.jpg" alt="">
          <br>
        </div>
      </div>
      <div class="content-rain">
        <div class="rain-title clear">
          <div class="left-title">实景天气</div>
          <div class="right-more pull-right">更多 ></div>
        </div>
        <div class="rain-conetnt">
          <img src="./img/no3.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    // 点击更多跳转到对应的页面
    jumpmore () {
      this.$router.push('/navpath/jumpmore')
    }
  }
}
</script>

<style lang="less" scoped>
.navpath {
  width: 100%;
  height: 100%;
  > .hearder-title {
    color: #fff;
    font-size: 2em;
    text-align: center;
    padding-top: 18px;
    background-color: #193ba8;
    padding-bottom: 4px;
  }
  > .content-center {
    width: 100%;
    background: rgba(55, 117, 202, 0.1);
    opacity: 0.8;
    border-bottom: 1px solid #cccccc;
    box-shadow: darkgrey -5px 8px 27px -5px;
    margin-bottom: 1rem;
    > .content-rain {
      width: 100%;
      height: calc(100% - 60%);
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 1rem;
      // box-shadow: darkgrey -5px 8px 27px -5px;
      background-color: rgba(55, 117, 202, 0.1);
      > .rain-title {
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        > .left-title {
          color: #fff;
          font-size: 1.5em;
          display: inline-block;
        }
        > .right-more {
          display: inline-block;
          color: #fff;
          font-size: 1.4em;
        }
      }
    }
  }
}
.rain-conetnt {
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 12rem;
    padding: 1.5rem 1.5rem 1.2rem 1.5rem;
  }
  .title-footer {
    color: #fff;
    font-size: 1.3em;
    padding: 1.1rem;
    > span {
      color: #bbd0ed;
      font-size: 0.9em;
    }
  }
}
</style>
