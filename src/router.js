import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const home = () => import('./view/home/index.vue')

// 首页
const homeporject = () => import('./view/home/homeporject.vue')

// 导航
const navpath = () => import('./view/home/navpath.vue')

// 实景天气跳转后的页面
const jumpmore = () => import('./view/jumppath/jumpmore.vue')

// 天气监测
const site = () => import('./view/tabjump/site.vue')

// 天气监测全市
const sitejump = () => import('./view/tabjump/sitejump.vue')

// 天气监测禅城
const sitechancheng = () => import('./view/tabjump/chancheng.vue')

// 卫星云图
const Satellite = () => import('./view/jumppath/Satellite.vue')

// 天气预报
const indexweather = () => import('./view/weather/indexweather.vue')

// 雷达图
const radar = () => import('./view/jumppath/radar.vue')

const routes = [
  {
    path: '*',
    redirect: '/home/homeporject'
  },
  {
    name: 'home',
    path: '/home',
    component: home,
    meta: {
      title: '主页'
    },
    children: [
      {
        name: 'homeporject',
        path: '/home/homeporject',
        component: homeporject
      },
      {
        name: 'navpath',
        path: '/navpath',
        component: navpath,
      }, {
        name: 'jumpmore',
        path: '/navpath/jumpmore',
        component: jumpmore
      }, {
        name: 'Satellite',
        path: '/navpath/Satellite',
        component: Satellite
      }, {
        name: 'radar',
        path: '/navpath/radar',
        component: radar
      }, {
        name: 'site',
        path: '/site',
        component: site,
        children: [
          {
            name: 'sitejump',
            path: '/site/sitejump',
            component: sitejump
          }, {
            name: 'sitechancheng',
            path: '/site/sitechancheng',
            component: sitechancheng
          }
        ]
      }, {
        name: 'indexweather',
        path: '/indexweather',
        component: indexweather
      }
    ]
  } 
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
