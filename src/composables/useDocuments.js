import { ref, computed, onMounted } from 'vue'
import { getDocuments } from '@/services/documentsService'

export function useDocuments() {
  const documentos = ref([])
  const cargando = ref(true)
  const error = ref(null)

  // Agrupa por categoría, dejando "Otros" al final
  const grupos = computed(() => {
    const mapa = new Map()
    for (const d of documentos.value) {
      const categoria = d.categoria?.trim() || 'Otros'
      if (!mapa.has(categoria)) mapa.set(categoria, [])
      mapa.get(categoria).push(d)
    }
    return [...mapa.entries()]
      .map(([categoria, items]) => ({ categoria, items }))
      .sort((a, b) => (a.categoria === 'Otros') - (b.categoria === 'Otros') || a.categoria.localeCompare(b.categoria, 'es'))
  })

  onMounted(async () => {
    try {
      documentos.value = await getDocuments()
    } catch (e) {
      error.value = e
    } finally {
      cargando.value = false
    }
  })

  return { documentos, grupos, cargando, error }
}
