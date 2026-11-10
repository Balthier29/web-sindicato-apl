<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

// Recupera la sesión guardada para saber en todo el sitio si hay un administrador conectado
onMounted(() => useAuthStore().init())
</script>

<template>
  <router-view />
</template>
