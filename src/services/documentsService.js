import { supabase } from './supabase'

export async function getDocuments() {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('documents')
    .select('id, titulo, descripcion, categoria, file_url, created_at')
    .eq('publicado', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
