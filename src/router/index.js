import Vue from 'vue'
import Router from 'vue-router'
import Qry from '@/components/record/Qry'
import Home from '@/components/Home'
import Login from '@/components/Login'
import {store_s_token_key} from '../const'
import Analyse from "../components/analyse/Analyse";
import Save from '../components/record/Save'
import ForgetPass from "../components/forget/ForgetPass";
import StepCheck from "../components/forget/StepCheck";
import StepInput from "../components/forget/StepInput";
import Registry from "../components/Registry";
import Update from "../components/user/Update";
import Guess from "../components/guess/Guess";
import Daily from "../components/daily/Daily";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/registry',
      name: 'registry',
      component: Registry
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/forget',
      name: 'forgetPass',
      component: ForgetPass,
      children: [
        {
          path: '/forget/input',
          name: 'forgetInput',
          component: StepInput
        },
        {
          path: '/forget/Check',
          name: 'forgetCheck',
          component: StepCheck
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Daily
        },
        {
          path: '/rec/qry',
          name: 'qry',
          component: Qry
        },
        {
          path: '/rec/save',
          name: 'save',
          component: Save
        },
        {
          path: '/analyse',
          name: 'analyse',
          component: Analyse
        },
        {
          path: '/user/update',
          name: 'userUpdate',
          component: Update
        },
        {
          path: '/guess',
          name: 'guess',
          component: Guess
        }

      ]
    }

  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path.startsWith('/forget') || to.path === '/registry') {
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
