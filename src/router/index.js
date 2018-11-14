import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login.vue'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/home/home.vue')
const Index = () => import(/* webpackChunkName: "index" */ '@/views/index/index.vue')
const Product = () => import(/* webpackChunkName: "product" */ '@/views/product/product.vue')
const Products = () => import(/* webpackChunkName: "products" */ '@/views/products/products.vue')
const Category = () => import(/* webpackChunkName: "category" */ '@/views/categories/categories.vue')
const Order = () => import(/* webpackChunkName: "order" */ '@/views/order/order.vue')
const Users = () => import(/* webpackChunkName: "user" */ '@/views/users/users.vue')


Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'index',
      component: Home,
      meta: {breadName:'首页'},
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index,
          meta: {breadName:'首页'}
        },
        {
          path: 'product',
          name: 'products',
          component: Product,
          meta: {breadName:'商品'},
          children: [
            {
              path: 'products',
              name: 'products',
              component: Products,
              meta: {breadName:'商品管理'}
            },
            {
              path: 'category',
              name: 'category',
              component: Category,
              meta: {breadName:'品类管理'}
            }
          ]
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: {breadName:'订单管理'}
        },
        {
          path: 'users',
          name: 'users',
          component: Users,
          meta: {breadName:'用户管理'}
        }
      ]
    }
  ]
})
