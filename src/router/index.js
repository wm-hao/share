import Vue from 'vue'
import Router from 'vue-router'
import Qry from '@/components/record/Qry'
import Home from '@/components/Home'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login,
            children: [{
                    path: '/rec/manage/qry',
                    name: 'recManageQry',
                    component: Qry
                },
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                }
            ]
        }

    ]
})