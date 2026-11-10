<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import '@/assets/styles/dashboard.css'

const auth = useAuthStore()
const router = useRouter()

const secciones = [
  { nombre: 'Resumen', ruta: '/dashboard' },
  { nombre: 'Noticias', ruta: '/dashboard/noticias' },
  { nombre: 'Eventos', ruta: '/dashboard/eventos' },
  { nombre: 'Documentos', ruta: '/dashboard/documentos' },
  { nombre: 'Estadísticas', ruta: '/dashboard/estadisticas' }
]

async function salir() {
  await auth.logout()
  router.push({ name: 'dashboard-login' })
}
</script>

<template>
  <div class="dash">
    <aside class="dash__sidebar">
      <router-link to="/dashboard" class="dash__marca">
        <img src="/logo-apl.webp" alt="" width="36" height="36" />
        <span>Panel APL</span>
      </router-link>

      <nav class="dash__nav" aria-label="Panel de administración">
        <router-link v-for="s in secciones" :key="s.ruta" :to="s.ruta" exact-active-class="is-active">
          {{ s.nombre }}
        </router-link>
      </nav>

      <div class="dash__pie">
        <router-link to="/" class="dash__enlace">Ver sitio</router-link>
        <button type="button" class="dash__enlace" @click="salir">Cerrar sesión</button>
      </div>
    </aside>

    <main class="dash__main">
      <router-view />
    </main>
  </div>
</template>
