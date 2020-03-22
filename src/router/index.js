import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Qry from '@/components/TradeRecordQry'
import Save from '@/components/TradeRecordSave'
import System from '@/components/SystemManage'

Vue.use(Router)

export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'system',
          component: System
        }
      ]
    },
    {
      path: '/rec',
      component: Home,
      children: [
        {
          path: 'qry',
          component: Qry
        },
        {
          path: 'save',
          component: Save
        }
      ]
    }

  ]
})
