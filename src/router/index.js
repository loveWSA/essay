import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

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
          path: '/essay/edit',
          component: () => import('@/views/essay/EssayEdit.vue')
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

// 导航卫士 默认放行
// 根据返回值 决定放行还是拦截
// 返回值：
//     1.undefined / true 放行
//     2.false            拦截回from的地址页面
//     3.具体地址          拦截到对应地址
router.beforeEach((to) => {
  // 如果没有token 且访问的是登录页 拦截到登录页
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router
