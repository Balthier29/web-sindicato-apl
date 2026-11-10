<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const accesos = [
  { titulo: 'Noticias', texto: 'Publicar y editar noticias con foto.', ruta: '/dashboard/noticias' },
  { titulo: 'Eventos', texto: 'Asambleas, actividades y fechas.', ruta: '/dashboard/eventos' },
  { titulo: 'Documentos', texto: 'Estatutos, actas y formularios en PDF.', ruta: '/dashboard/documentos' },
  { titulo: 'Estadísticas', texto: 'Cifras de la franja azul de la portada.', ruta: '/dashboard/estadisticas' }
]
</script>

<template>
  <div>
    <header class="dash__encabezado">
      <h1>Resumen</h1>
    </header>
    <p class="dash__nota">Sesión iniciada como {{ auth.user?.email }}</p>

    <div class="dash__accesos">
      <router-link v-for="a in accesos" :key="a.ruta" :to="a.ruta" class="dash__card dash__acceso">
        <h2>{{ a.titulo }}</h2>
        <p>{{ a.texto }}</p>
      </router-link>
    </div>
  </div>
</template>
