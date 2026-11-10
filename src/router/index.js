import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { requireAdmin } from './guards'

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'inicio', component: () => import('@/views/public/HomeView.vue'), meta: { title: 'Inicio' } },
      { path: 'quienes-somos', name: 'quienes-somos', component: () => import('@/views/public/AboutView.vue'), meta: { title: 'Quiénes somos' } },
      { path: 'noticias', name: 'noticias', component: () => import('@/views/public/NewsView.vue'), meta: { title: 'Noticias' } },
      { path: 'eventos', name: 'eventos', component: () => import('@/views/public/EventsView.vue'), meta: { title: 'Eventos' } },
      { path: 'documentos', name: 'documentos', component: () => import('@/views/public/DocumentsView.vue'), meta: { title: 'Documentos' } },
      { path: 'beneficios', name: 'beneficios', component: () => import('@/views/public/BenefitsView.vue'), meta: { title: 'Beneficios' } },
      { path: 'contacto', name: 'contacto', component: () => import('@/views/public/ContactView.vue'), meta: { title: 'Contacto' } },
      { path: 'inscripcion', name: 'inscripcion', component: () => import('@/views/public/InscriptionView.vue'), meta: { title: 'Inscripción' } }
    ]
  },
  // Dashboard de administración (solo cuentas listadas en la tabla "admins")
  {
    path: '/dashboard/login',
    name: 'dashboard-login',
    component: () => import('@/views/dashboard/LoginView.vue'),
    meta: { title: 'Ingreso al panel' }
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    beforeEnter: requireAdmin,
    children: [
      { path: '', name: 'dashboard', component: () => import('@/views/dashboard/DashHomeView.vue'), meta: { title: 'Panel' } },
      { path: 'noticias', name: 'dash-noticias', component: () => import('@/views/dashboard/DashNewsView.vue'), meta: { title: 'Panel · Noticias' } },
      { path: 'eventos', name: 'dash-eventos', component: () => import('@/views/dashboard/DashEventsView.vue'), meta: { title: 'Panel · Eventos' } },
      { path: 'documentos', name: 'dash-documentos', component: () => import('@/views/dashboard/DashDocumentsView.vue'), meta: { title: 'Panel · Documentos' } },
      { path: 'estadisticas', name: 'dash-estadisticas', component: () => import('@/views/dashboard/DashStatsView.vue'), meta: { title: 'Panel · Estadísticas' } }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Sindicato Nacional APL` : 'Sindicato Nacional APL'
})

export default router
