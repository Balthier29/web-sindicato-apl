import { createClient } from '@supabase/supabase-js'

const url = process.env.VUE_APP_SUPABASE_URL
const anonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

// Si faltan las variables (.env), la web pública igual carga con datos de ejemplo
export const supabase = url && anonKey ? createClient(url, anonKey) : null

if (!supabase) {
  console.warn('[Supabase] Faltan VUE_APP_SUPABASE_URL / VUE_APP_SUPABASE_ANON_KEY. Copia .env.example a .env.')
}
