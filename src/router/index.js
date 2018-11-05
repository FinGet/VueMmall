import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login.vue'
import Home from '@/views/home/home.vue'
import Index from '@/views/index/index.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index,
        }
      ]
    }
  ]
})
