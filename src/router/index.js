import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'views/layout/Layout'

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index')
    },
    {
      path: '',
      component: Layout,
      redirect: 'home',
      meta: {title: '首页'},
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index')
        },
        {
          path: 'overview',
          name: 'overview',
          component: () => import('@/views/overview/index')
        },
        {
          path: 'enterprise',
          name: 'enterprise',
          component: () => import('@/views/enterprise/index')
        },
        {
          path: 'workshop',
          name: 'workshop',
          component: () => import('@/views/workshop/index')
        },
        {
          path: 'device',
          name: 'device',
          component: () => import('@/views/device/index')
        },
        {
          path: 'indicator',
          name: 'indicator',
          component: () => import('@/views/indicator/index')
        },
        {
          path: 'realtime',
          name: 'realtime',
          component: () => import('@/views/realtime/index')
        },
        {
          path: 'warning',
          name: 'warning',
          component: () => import('@/views/warning/index')
        },
        {
          path: 'netpic',
          name: 'netpic',
          component: () => import('@/views/netpic/index')
        }
      ]
    }
  ]
})
