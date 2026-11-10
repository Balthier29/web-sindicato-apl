<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div v-if="auth.isAdmin" class="adminbar">
    <div class="contenedor adminbar__fila">
      <span>Sesión de administrador</span>
      <div class="adminbar__acciones">
        <router-link to="/dashboard">Ir al panel</router-link>
        <button type="button" @click="auth.logout()">Cerrar sesión</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.adminbar {
  background: var(--amarillo);
  color: var(--azul-oscuro);
  font-size: 0.8rem;
}

.adminbar__fila {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espacio-2);
  min-height: 36px;
}

.adminbar__acciones {
  display: flex;
  gap: var(--espacio-2);
}

.adminbar a,
.adminbar button {
  padding: 0;
  border: 0;
  background: none;
  font-weight: 700;
  text-decoration: underline;
  color: inherit;
}
</style>
