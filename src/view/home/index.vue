<template>
  <div class="home">
    <div class="home-porject">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <footernav/>
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant'

import footernav from './footernav'

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    footernav
  },

  data() {
    return {
      home: {
        title: '主页',
      }
    };
  },

  methods: {

  }
};
</script>

<style lang="less" scoped>

.home {
  width: 100%;
  height: 105%;
  background-image: url("./img/bgib.png");
  background-size: 100% 100%;
  > .home-porject {
    width: 100%;
    background-color: #306ec7;
  }
}
</style>
