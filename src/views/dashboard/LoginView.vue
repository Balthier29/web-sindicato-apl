<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import '@/assets/styles/dashboard.css'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const entrando = ref(false)

async function entrar() {
  error.value = ''
  entrando.value = true
  try {
    await auth.login(email.value.trim(), password.value)
    router.push({ name: 'dashboard' })
  } catch (e) {
    error.value = e.message
  } finally {
    entrando.value = false
  }
}
</script>

<template>
  <div class="login">
    <form class="dash__card login__form" @submit.prevent="entrar">
      <img src="/logo-apl.webp" alt="" width="72" height="72" />
      <h1>Panel de administración</h1>
      <p class="login__sub">Sindicato Nacional APL</p>

      <div class="dash__campo">
        <label for="email">Correo</label>
        <input id="email" v-model="email" type="email" autocomplete="username" required />
      </div>
      <div class="dash__campo">
        <label for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" autocomplete="current-password" required />
      </div>

      <p v-if="error" class="dash__error" role="alert">{{ error }}</p>

      <button class="btn btn--primario login__btn" :disabled="entrando">
        {{ entrando ? 'Ingresando…' : 'Ingresar' }}
      </button>
      <router-link to="/" class="login__volver">← Volver al sitio</router-link>
    </form>
  </div>
</template>

<style scoped>
.login {
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: var(--espacio-2);
  background: var(--gris-100);
}

.login__form {
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.login__form img {
  margin: 0 auto var(--espacio-1);
}

.login__form h1 {
  font-size: 1.3rem;
  margin-bottom: 0.25rem;
}

.login__sub {
  margin-bottom: var(--espacio-3);
  font-size: 0.85rem;
  color: var(--gris-600);
}

.login__form .dash__campo {
  text-align: left;
}

.login__btn {
  width: 100%;
  margin-top: var(--espacio-1);
}

.login__volver {
  display: inline-block;
  margin-top: var(--espacio-2);
  font-size: 0.85rem;
  color: var(--gris-600);
}
</style>
