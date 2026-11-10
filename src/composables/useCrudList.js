import { ref, onMounted } from 'vue'

// Estado común de las pantallas del dashboard: lista, carga, errores y mensajes
export function useCrudList(crud) {
  const items = ref([])
  const cargando = ref(true)
  const guardando = ref(false)
  const error = ref('')
  const aviso = ref('')

  async function cargar() {
    cargando.value = true
    error.value = ''
    try {
      items.value = await crud.listar()
    } catch (e) {
      error.value = e.message
    } finally {
      cargando.value = false
    }
  }

  // Ejecuta una acción (crear, editar, borrar) mostrando estado y mensaje
  async function ejecutar(accion, mensajeOk) {
    guardando.value = true
    error.value = ''
    aviso.value = ''
    try {
      await accion()
      aviso.value = mensajeOk
      await cargar()
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      guardando.value = false
    }
  }

  onMounted(cargar)

  return { items, cargando, guardando, error, aviso, cargar, ejecutar }
}
