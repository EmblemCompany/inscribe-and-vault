import * as VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../components/Inscriptions.vue'),
  },
  {
    path: '/create-inscription',
    component: () => import('../components/InscriptionCreationWizard.vue'),
  },
  {
    path: '/inscriptions/update',
    component: () => import('../components/InscriptionCreationWizard.vue'),
  },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
