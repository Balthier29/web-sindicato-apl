import { useAuthStore } from '@/stores/auth'

// Protege las rutas del dashboard: solo entra quien tiene sesión iniciada
export async function requireAuth() {
  const auth = useAuthStore()
  await auth.init()
  if (!auth.user) return { name: 'inicio' }
  return true
}
