import { supabase } from './supabase'

const EJEMPLO = [1, 2, 3].map((i) => ({
  id: `demo-${i}`,
  titulo: 'Nombre del evento',
  lugar: 'Lugar',
  hora: 'Hora',
  fecha: '2026-11-20'
}))

export async function getEvents({ limite = 10 } = {}) {
  if (!supabase) return EJEMPLO.slice(0, limite)

  const hoy = new Date().toISOString().slice(0, 10)
  const { data, error } = await supabase
    .from('events')
    .select('id, titulo, lugar, hora, fecha')
    .gte('fecha', hoy)
    .order('fecha', { ascending: true })
    .limit(limite)

  if (error) throw error
  return data
}
