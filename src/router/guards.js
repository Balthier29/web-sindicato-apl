import { useAuthStore } from '@/stores/auth'

// Protege el dashboard: solo entra una cuenta con rol de administrador
export async function requireAdmin() {
  const auth = useAuthStore()
  await auth.init()
  if (!auth.isAdmin) return { name: 'dashboard-login' }
  return true
}
