import { supabase } from './supabase'

const BUCKET = 'media'

// Sube un archivo al bucket y devuelve su URL pública
export async function subirArchivo(ruta, archivo, contentType) {
  if (!supabase) throw new Error('Supabase no está configurado. Completa el archivo .env.')

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(ruta, archivo, { contentType, cacheControl: '31536000', upsert: false })
  if (error) throw error

  return supabase.storage.from(BUCKET).getPublicUrl(ruta).data.publicUrl
}

// Borra archivos del bucket (ignora rutas vacías)
export async function eliminarArchivos(rutas) {
  const limpias = rutas.filter(Boolean)
  if (!supabase || !limpias.length) return
  const { error } = await supabase.storage.from(BUCKET).remove(limpias)
  if (error) throw error
}
