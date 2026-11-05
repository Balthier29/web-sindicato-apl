import { ref, onMounted } from 'vue'
import { getEvents } from '@/services/eventsService'

export function useEvents({ limite = 10 } = {}) {
  const eventos = ref([])
  const cargando = ref(true)
  const error = ref(null)

  onMounted(async () => {
    try {
      eventos.value = await getEvents({ limite })
    } catch (e) {
      error.value = e
    } finally {
      cargando.value = false
    }
  })

  return { eventos, cargando, error }
}
