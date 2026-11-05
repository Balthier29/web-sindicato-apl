import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { requireAuth } from './guards'

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
  // El dashboard se construye en la siguiente etapa; la ruta queda reservada y protegida
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashHomeView.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Panel' }
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
