import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/Demo'
import Qry from '@/components/TradeRecordQry'
import Save from '@/components/TradeRecordSave'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: Demo,
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
    }, {
      path: '/qry',
      name: 'Qry',
      component: Qry,
    }
  ]
})
