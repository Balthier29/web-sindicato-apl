import { supabase } from './supabase'

// Datos de ejemplo mientras no exista el proyecto Supabase (.env)
const EJEMPLO = [1, 2, 3].map((i) => ({
  id: `demo-${i}`,
  titulo: 'Título de la noticia',
  resumen: 'Breve resumen de la noticia en dos líneas.',
  contenido: 'Aquí irá el texto completo de la noticia.\n\nCada noticia publicada desde el panel se verá así.',
  fecha: '2026-11-05',
  thumb_url: null,
  full_url: null,
  publicada: true
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

// Una noticia completa. Devuelve null si no existe o no está publicada
// (las reglas de Supabase solo dejan ver borradores a los administradores).
export async function getNewsById(id) {
  if (!supabase) return EJEMPLO.find((n) => n.id === id) ?? null

  const { data, error } = await supabase
    .from('news')
    .select('id, titulo, resumen, contenido, fecha, thumb_url, full_url, publicada')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data
}
