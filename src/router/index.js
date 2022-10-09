/**
 * 路由配置
 */
import {createRouter, createWebHistory} from 'vue-router';
import store from '@/store';
import setting from '@/config/setting';
import EleLayout from '@/layout';
import {menuToRoutes} from 'ele-admin-pro';
import NProgress from 'nprogress';

// 静态路由
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    meta: {title: '登录'}
  },
  {
    path: '/forget',
    component: () => import('@/views/login/forget'),
    meta: {title: '忘记密码'}
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/exception/404')
  }
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  updateTitle(to);
  // 判断是否登录
  if (setting.takeToken()) {
    // 判断是否已经注册动态路由
    if (!store.state.user.menus) {
      // 获取动态路由
      store.dispatch('user/getMenus').then(({menus, home}) => {
        // menuToRoutes方法是把菜单数据转成路由数据格式
        router.addRoute({
          path: '/',
          component: EleLayout,
          redirect: setting.homePath || home,
          children: menuToRoutes(menus, (component) => import('@/views' + component))
        });
        next({...to, replace: true});
      }).catch(() => {
        next();
      });
    } else {
      next();
    }
  } else if (setting.whiteList.includes(to.path)) {
    next();
  } else {
    next({path: '/login', query: to.path === '/' ? {} : {from: to.path}});
  }
});

router.afterEach(() => {
  setTimeout(() => {
    NProgress.done(true);
  }, 300);
});

export default router;

/**
 * 更新浏览器标题
 * @param route 路由
 */
function updateTitle(route) {
  if (!route.path.startsWith('/redirect/')) {
    let names = [];
    if (route && route.meta && route.meta.title) {
      names.push(route.meta.title);
    }
    //var sysconfig =JSON.parse(window.localStorage.getItem('sysconfig'))
    const appName = "武汉腾青科技";
    if (appName) {
      names.push(appName);
    }
    document.title = names.join(' - ');
  }
}
