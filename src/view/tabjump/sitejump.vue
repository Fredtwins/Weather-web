<template>
  <div class="site-jump">
    <!-- 背景 -->
    <div class="bg-blur">
      <!-- <div class="content-front" v-for="(item, index) in rainArray" :key="item.index">
        <div class="hearder-titlerain clear">
          <div class="heardertitle">{{item.title}}</div>
          <div class="hearder-time pull-right">{{item.titletime}}</div>
        </div>
        <div class="content-rain"></div>
      </div> -->
      <Table border :columns="columns5" :data="data5"></Table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon)

export default {
  components: {
    Icon
  },
  data () {
    return {
      columns5: [
        {
            title: 'Date',
            key: 'date',
            sortable: true
        },
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Age',
            key: 'age',
            sortable: true
        },
        {
            title: 'Address',
            key: 'address'
        }
      ],
      data5: [
        {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
        },
        {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
        },
        {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
        },
        {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
        }
      ],
      rainArray: [
        {
          title: '佛山市禅城区祖庙路',
          titletime: '12日11时-13日00时',
          // imgUrl: require('./img/fengjing.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        },
        {
          title: '佛山市禅城区祖庙路',
          titletime: '12日11时-13日00时',
          // imgUrl: require('./img/fengjing.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        },
        {
          title: '佛山市禅城区祖庙路',
          titletime: '12日11时-13日00时',
          // imgUrl: require('./img/fengjing3.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        },
        {
          title: '佛山市禅城区祖庙路',
          titletime: '12日11时-13日00时',
          // imgUrl: require('./img/fengjing2.png'),
          rightrainfeng: '东南风',
          rightrainsu: '0 ~ 3级',
          rightrainhot: '18 ~ 27℃',
          rightraintext: '0.0 (mm)' 
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.site-jump {
  width: 100%;
  height: 100%;
}

.bg-blur {
  background: url('./img/bgib.png');
  background-size: 100% 100%;
}
.bg-blur::before {
  content: "";
  display: block;
}
.content-front {
  height: 7rem;
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
    > img {
      width: 10rem;
      height: 8rem;
      margin-left: 10px;
      margin-top: 10px;
    }
    > .right-rain {
      display: inline-block;
      width: 12rem;
      height: 8rem;
      text-align: center;
      padding: 8px 10px 10px 3rem;
      > span {
        font-size: 1.2em;
        padding: 7px 0;
      }
    }
  }
}
</style>
