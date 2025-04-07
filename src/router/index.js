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
      },{
        path: '/teacher',
        name: 'teacher',
        component: () => import('../views/TeacherListView.vue')
      },{
        path: '/announcement',
        name: 'announcement',
        component: () => import('../views/AnnouncementView.vue')
      },{
        path: '/announcement/add',
        name: 'addannouncement',
        component: () => import('../views/AddAnnouncementView.vue')
      }
    ]
  },
  


]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('JwtToken');

  // 如果用户未登录且访问的不是登录页，则强制跳转到登录页
  if (!user && !token && to.path !== '/login') {
    this.$message.error("请先登录");
    next('/login');
  } else {
    // 如果用户已登录或访问的是登录页，则正常放行
    next();
  }
});

export default router
