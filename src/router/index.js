import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 登录页
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      // 首页
      path: '/',
      redirect: '/essay/list',
      component: () => import('@/views/layout/LayoutPage.vue'),
      children: [
        {
          path: '/essay/list',
          component: () => import('@/views/essay/EssayList.vue')
        },
        {
          path: '/essay/kind',
          component: () => import('@/views/essay/EssayKind.vue')
        },
        {
          path: '/user/detail',
          component: () => import('@/views/user/UserDetail.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        },
        {
          path: '/user/picture',
          component: () => import('@/views/user/UserPicture.vue')
        }
      ]
    }
  ]
})

export default router
