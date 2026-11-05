import { ref, onMounted } from 'vue'
import { getNews } from '@/services/newsService'

export function useNews({ limite = 10 } = {}) {
  const noticias = ref([])
  const cargando = ref(true)
  const error = ref(null)

  onMounted(async () => {
    try {
      noticias.value = await getNews({ limite })
    } catch (e) {
      error.value = e
    } finally {
      cargando.value = false
    }
  })

  return { noticias, cargando, error }
}
