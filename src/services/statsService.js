import { supabase } from './supabase'

export const STATS_EJEMPLO = [
  { clave: 'fundacion', valor: '2003', etiqueta: 'Año de fundación' },
  { clave: 'socios', valor: '00', etiqueta: 'Socios y socias' },
  { clave: 'convenios', valor: '00', etiqueta: 'Convenios vigentes' }
]

export async function getStats() {
  if (!supabase) return STATS_EJEMPLO

  const { data, error } = await supabase
    .from('stats')
    .select('clave, valor, etiqueta')
    .order('orden', { ascending: true })

  if (error) throw error
  return data.length ? data : STATS_EJEMPLO
}
