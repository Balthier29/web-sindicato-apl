<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
  evento: { type: Object, default: null },
  guardando: { type: Boolean, default: false }
})
const emit = defineEmits(['guardar', 'cancelar'])

const form = reactive({
  titulo: props.evento?.titulo ?? '',
  lugar: props.evento?.lugar ?? '',
  hora: props.evento?.hora ?? '',
  fecha: props.evento?.fecha ?? '',
  descripcion: props.evento?.descripcion ?? ''
})

const titulo = computed(() => (props.evento ? 'Editar evento' : 'Nuevo evento'))
const enviar = () => emit('guardar', { ...form })
</script>

<template>
  <form class="dash__card" @submit.prevent="enviar">
    <h2>{{ titulo }}</h2>

    <div class="dash__campo">
      <label for="e-titulo">Nombre del evento</label>
      <input id="e-titulo" v-model="form.titulo" maxlength="200" required />
    </div>

    <div class="dash__fila">
      <div class="dash__campo">
        <label for="e-fecha">Fecha</label>
        <input id="e-fecha" v-model="form.fecha" type="date" required />
      </div>
      <div class="dash__campo">
        <label for="e-hora">Hora</label>
        <input id="e-hora" v-model="form.hora" placeholder="Ej: 18:30" />
      </div>
    </div>

    <div class="dash__campo">
      <label for="e-lugar">Lugar</label>
      <input id="e-lugar" v-model="form.lugar" />
    </div>

    <div class="dash__campo">
      <label for="e-desc">Descripción</label>
      <textarea id="e-desc" v-model="form.descripcion" rows="4"></textarea>
    </div>

    <div class="dash__acciones">
      <button class="btn btn--primario" :disabled="guardando">{{ guardando ? 'Guardando…' : 'Guardar' }}</button>
      <button type="button" class="btn btn--borde" @click="emit('cancelar')">Cancelar</button>
    </div>
  </form>
</template>
