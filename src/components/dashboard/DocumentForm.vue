<script setup>
import { reactive, ref } from 'vue'
import { subirArchivo } from '@/services/storageService'

defineProps({
  guardando: { type: Boolean, default: false }
})
const emit = defineEmits(['guardar', 'cancelar'])

const MAX_BYTES = 10 * 1024 * 1024 // mismo límite que el bucket

const form = reactive({ titulo: '', descripcion: '', categoria: '', publicado: true })
const archivo = ref(null)
const subiendo = ref(false)
const error = ref('')

function alElegir(evento) {
  error.value = ''
  const f = evento.target.files?.[0]
  if (!f) return
  if (f.type !== 'application/pdf') {
    error.value = 'El archivo debe ser un PDF.'
    evento.target.value = ''
    return
  }
  if (f.size > MAX_BYTES) {
    error.value = 'El PDF pesa más de 10 MB.'
    evento.target.value = ''
    return
  }
  archivo.value = f
  if (!form.titulo) form.titulo = f.name.replace(/\.pdf$/i, '')
}

// Nombre seguro para la ruta: sin tildes, espacios ni símbolos
const limpiar = (texto) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9.-]+/g, '-').toLowerCase()

async function enviar() {
  if (!archivo.value) {
    error.value = 'Elige un archivo PDF.'
    return
  }
  subiendo.value = true
  error.value = ''
  try {
    const ruta = `documents/${crypto.randomUUID()}-${limpiar(archivo.value.name)}`
    const url = await subirArchivo(ruta, archivo.value, 'application/pdf')
    emit('guardar', { ...form, file_url: url, file_path: ruta })
  } catch (e) {
    error.value = e.message
  } finally {
    subiendo.value = false
  }
}
</script>

<template>
  <form class="dash__card" @submit.prevent="enviar">
    <h2>Nuevo documento</h2>

    <div class="dash__campo">
      <label for="d-archivo">Archivo PDF (máx. 10 MB)</label>
      <input id="d-archivo" type="file" accept="application/pdf" @change="alElegir" />
    </div>

    <div class="dash__campo">
      <label for="d-titulo">Título</label>
      <input id="d-titulo" v-model="form.titulo" maxlength="200" required />
    </div>

    <div class="dash__campo">
      <label for="d-categoria">Categoría</label>
      <input id="d-categoria" v-model="form.categoria" placeholder="Ej: Estatutos, Actas, Formularios" />
    </div>

    <div class="dash__campo">
      <label for="d-desc">Descripción</label>
      <textarea id="d-desc" v-model="form.descripcion" rows="3"></textarea>
    </div>

    <label class="dash__check">
      <input v-model="form.publicado" type="checkbox" />
      Publicado (visible en la web)
    </label>

    <p v-if="error" class="dash__error" role="alert">{{ error }}</p>

    <div class="dash__acciones">
      <button class="btn btn--primario" :disabled="guardando || subiendo">
        {{ subiendo ? 'Subiendo PDF…' : guardando ? 'Guardando…' : 'Guardar' }}
      </button>
      <button type="button" class="btn btn--borde" @click="emit('cancelar')">Cancelar</button>
    </div>
  </form>
</template>
