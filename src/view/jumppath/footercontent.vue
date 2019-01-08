<template>
  <div class="footer-content">
    <div class="bg-blur">
      <div class="header-title">雷达图说明</div>
      <div class="content">
        <p>该雷达图为基本反射率图，
          底图以不同底色区分佛山市五区，
          精细到各镇街。当佛山及周边地区有雨时，
          图上就会显示有颜色的雷达回波，图像左下角的色板标示反射率的强度。
          反射率强度值（dBz）越大表示降雨度越强，当他的值大于或等于40dBz时，
          出现雷雨天气的可能性比较大；当他的值在50dBz或以上时，
          出现暴雨、冰雹、大风等强对流天气的可能性较大。</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>
.footer-content {
  margin-bottom: 3rem;
  > .bg-blur {
    // background: url("./img/bgib.png");
    background-size: 100% 100%;
    > .header-title {
        color: #ffc100;
        font-size: 1.3em;
        padding: 1rem;
        border-bottom: 0.1px solid #ccc;
    }
    > .content {
      padding: 1.4rem;
      margin-bottom: 3rem;
      > p {
        color: #fff;
      }
    }
  }
  .bg-blur::before {
    content: "";
    display: block;
  }
}
</style>
