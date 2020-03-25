import Vue from 'vue'
import Router from 'vue-router'
import Qry from '@/components/record/Qry'
import Home from '@/components/Home'
import Login from '@/components/Login'
import {store_s_token_key} from '../const'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/rec/qry',
          name: 'qry',
          component: Qry
        }
      ]
    }

  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem(store_s_token_key);
    if (!token || token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
