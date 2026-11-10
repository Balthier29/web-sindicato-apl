<script setup>
import { ref } from 'vue'
import EventForm from '@/components/dashboard/EventForm.vue'
import { useCrudList } from '@/composables/useCrudList'
import { eventsAdmin } from '@/services/crud'
import { formatDate } from '@/utils/formatDate'

const { items, cargando, guardando, error, aviso, ejecutar } = useCrudList(eventsAdmin)

const editando = ref(null)
const creando = ref(false)

const cerrar = () => {
  editando.value = null
  creando.value = false
}

async function guardar(valores) {
  const anterior = editando.value
  const ok = await ejecutar(
    () => (anterior ? eventsAdmin.actualizar(anterior.id, valores) : eventsAdmin.crear(valores)),
    'Evento guardado.'
  )
  if (ok) cerrar()
}

async function eliminar(evento) {
  if (!window.confirm(`¿Eliminar el evento "${evento.titulo}"?`)) return
  await ejecutar(() => eventsAdmin.eliminar(evento.id), 'Evento eliminado.')
}
</script>

<template>
  <div>
    <header class="dash__encabezado">
      <h1>Eventos</h1>
      <button v-if="!creando && !editando" class="btn btn--primario" @click="creando = true">+ Nuevo evento</button>
    </header>

    <p v-if="aviso" class="dash__aviso" role="status">{{ aviso }}</p>
    <p v-if="error" class="dash__error" role="alert">{{ error }}</p>

    <EventForm v-if="creando" :guardando="guardando" @guardar="guardar" @cancelar="cerrar" />
    <EventForm v-else-if="editando" :key="editando.id" :evento="editando" :guardando="guardando" @guardar="guardar" @cancelar="cerrar" />

    <div v-else class="dash__card">
      <p v-if="cargando">Cargando…</p>
      <p v-else-if="!items.length">Todavía no hay eventos.</p>
      <ul v-else class="dash__lista">
        <li v-for="e in items" :key="e.id">
          <div class="dash__lista-texto">
            <strong>{{ e.titulo }}</strong>
            <small>{{ formatDate(e.fecha) }} · {{ e.hora || 'sin hora' }} · {{ e.lugar || 'sin lugar' }}</small>
          </div>
          <div class="dash__fila-acciones">
            <button class="dash__enlace-borde" @click="editando = e">Editar</button>
            <button class="dash__enlace-peligro" @click="eliminar(e)">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
