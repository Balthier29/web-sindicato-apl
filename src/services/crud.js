import { supabase } from './supabase'

function db() {
  if (!supabase) {
    throw new Error('Supabase no está configurado. Completa el archivo .env (ver .env.example).')
  }
  return supabase
}

// CRUD genérico para las tablas del dashboard (news, events, documents, stats)
export function makeCrud(tabla, { orden = 'created_at', asc = false, clave = 'id' } = {}) {
  return {
    async listar() {
      const { data, error } = await db().from(tabla).select('*').order(orden, { ascending: asc })
      if (error) throw error
      return data
    },
    async crear(valores) {
      const { data, error } = await db().from(tabla).insert(valores).select().single()
      if (error) throw error
      return data
    },
    async actualizar(id, valores) {
      const { data, error } = await db().from(tabla).update(valores).eq(clave, id).select().single()
      if (error) throw error
      return data
    },
    async eliminar(id) {
      const { error } = await db().from(tabla).delete().eq(clave, id)
      if (error) throw error
    }
  }
}

export const newsAdmin = makeCrud('news', { orden: 'fecha' })
export const eventsAdmin = makeCrud('events', { orden: 'fecha', asc: true })
export const documentsAdmin = makeCrud('documents')
export const statsAdmin = makeCrud('stats', { orden: 'orden', asc: true, clave: 'clave' })
