import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAdmin = ref(false)
  const ready = ref(false)

  // Una cuenta es administradora solo si está en la tabla "admins"
  async function comprobarAdmin() {
    if (!supabase || !user.value) {
      isAdmin.value = false
      return
    }
    const { data } = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', user.value.id)
      .maybeSingle()
    isAdmin.value = !!data
  }

  // Se llama desde App.vue y desde el guard; solo se ejecuta una vez
  let iniciando = null
  function init() {
    iniciando ??= (async () => {
      if (supabase) {
        const { data } = await supabase.auth.getSession()
        user.value = data.session?.user ?? null
        await comprobarAdmin()

        supabase.auth.onAuthStateChange((_evento, sesion) => {
          user.value = sesion?.user ?? null
          // Se difiere para no llamar a Supabase dentro del propio callback
          setTimeout(comprobarAdmin, 0)
        })
      }
      ready.value = true
    })()
    return iniciando
  }

  async function login(email, password) {
    if (!supabase) throw new Error('Supabase no está configurado. Completa el archivo .env.')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error('Correo o contraseña incorrectos.')

    user.value = data.user
    await comprobarAdmin()
    if (!isAdmin.value) {
      await logout()
      throw new Error('Esta cuenta no tiene permisos de administrador.')
    }
  }

  async function logout() {
    if (supabase) await supabase.auth.signOut()
    user.value = null
    isAdmin.value = false
  }

  return { user, isAdmin, ready, init, login, logout }
})
