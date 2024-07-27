import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { WHITE_LIST_ROUTE, isUserLoggedIn } from './utils'
import routes from '~pages'
import { profile } from '@/api/auth'
import { HTTP_STATUS } from '@/constants/common'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        return { name: 'finance-management-overview' }
      },
    },
    {
      path: '/pages/user-profile',
      redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
    },
    {
      path: '/pages/account-settings',
      redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
    },
    ...setupLayouts(routes),
  ],
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach(async (to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  const { useUserStore } = await import('@/pinia/userStore')

  if (isLoggedIn) {
    if (!useUserStore.userInfo.name) {
      try {
        const res = await profile()
        if (res.status === HTTP_STATUS.OK)
          useUserStore.setUserInfo(res.data.user)
      }
      catch (e) {
        await useUserStore.logout()
        next('/login')

        return
      }
    }
    next()
  }
  else {
    return WHITE_LIST_ROUTE.includes(to.name as string) ? next() : next('/login')
  }

  /*

  ℹ️ Commented code is legacy code

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    // ℹ️ Only add `to` query param if `to` route is not index route
    if (!isLoggedIn)
      return next({ name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } })

    // If logged in => not authorized
    return next({ name: 'not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn)
    next('/')

  return next()

  */

  // if (canNavigate(to)) {
  //   if (to.meta.redirectIfLoggedIn && isLoggedIn)
  //     return '/'
  // }
  // else {
  //   if (isLoggedIn)
  //     return { name: 'not-authorized' }
  //   else
  //     return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } }
  // }
})

export default router
