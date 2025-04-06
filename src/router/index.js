// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Layout from '@/views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
  path: '/login',
  name: 'login',
  component: LoginView
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },{
        path: '/thesis',
        name: 'thesis',
        component: () => import('../views/ThesisListView.vue')
      },{
        path: '/thesis/detail/:id',
        name: 'thesisdetail',
        component: () => import('../views/ThesisDetailView.vue')
      },{
        path: '/thesis/add',
        name: 'addThesis',
        component: () => import('../views/AddThesisView.vue')
      },{
        path: '/student',
        name: 'student',
        component: () => import('../views/StudentView.vue')
      }
    ]
  },
  


]

const router = new VueRouter({
  routes
})

export default router
