import { supabase } from './supabase'

// Datos de ejemplo mientras no exista el proyecto Supabase (.env)
const EJEMPLO = [1, 2, 3].map((i) => ({
  id: `demo-${i}`,
  titulo: 'Título de la noticia',
  resumen: 'Breve resumen de la noticia en dos líneas.',
  fecha: '2026-11-05',
  thumb_url: null
}))

export async function getNews({ limite = 10 } = {}) {
  if (!supabase) return EJEMPLO.slice(0, limite)

  const { data, error } = await supabase
    .from('news')
    .select('id, titulo, resumen, fecha, thumb_url')
    .eq('publicada', true)
    .order('fecha', { ascending: false })
    .limit(limite)

  if (error) throw error
  return data
}
