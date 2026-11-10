<script setup>
import { reactive, computed } from 'vue'
import ImageUploader from './ImageUploader.vue'

const props = defineProps({
  noticia: { type: Object, default: null }, // null = noticia nueva
  guardando: { type: Boolean, default: false }
})
const emit = defineEmits(['guardar', 'cancelar'])

const hoy = new Date().toISOString().slice(0, 10)

const form = reactive({
  titulo: props.noticia?.titulo ?? '',
  resumen: props.noticia?.resumen ?? '',
  contenido: props.noticia?.contenido ?? '',
  fecha: props.noticia?.fecha ?? hoy,
  publicada: props.noticia?.publicada ?? false,
  thumb_url: props.noticia?.thumb_url ?? null,
  full_url: props.noticia?.full_url ?? null,
  thumb_path: props.noticia?.thumb_path ?? null,
  full_path: props.noticia?.full_path ?? null
})

const titulo = computed(() => (props.noticia ? 'Editar noticia' : 'Nueva noticia'))

function imagenSubida({ thumbUrl, fullUrl, thumbPath, fullPath }) {
  Object.assign(form, { thumb_url: thumbUrl, full_url: fullUrl, thumb_path: thumbPath, full_path: fullPath })
}

function imagenQuitada() {
  Object.assign(form, { thumb_url: null, full_url: null, thumb_path: null, full_path: null })
}

const enviar = () => emit('guardar', { ...form })
</script>

<template>
  <form class="dash__card" @submit.prevent="enviar">
    <h2>{{ titulo }}</h2>

    <div class="dash__campo">
      <label for="n-titulo">Título</label>
      <input id="n-titulo" v-model="form.titulo" maxlength="200" required />
    </div>

    <div class="dash__campo">
      <label for="n-resumen">Resumen (aparece en la tarjeta)</label>
      <textarea id="n-resumen" v-model="form.resumen" rows="2" maxlength="400"></textarea>
    </div>

    <div class="dash__campo">
      <label for="n-contenido">Contenido completo</label>
      <textarea id="n-contenido" v-model="form.contenido" rows="8"></textarea>
    </div>

    <div class="dash__campo">
      <label>Imagen</label>
      <ImageUploader :actual="form.thumb_url ?? ''" @subida="imagenSubida" @quitar="imagenQuitada" />
    </div>

    <div class="dash__fila">
      <div class="dash__campo">
        <label for="n-fecha">Fecha</label>
        <input id="n-fecha" v-model="form.fecha" type="date" required />
      </div>
      <label class="dash__check">
        <input v-model="form.publicada" type="checkbox" />
        Publicada (visible en la web)
      </label>
    </div>

    <div class="dash__acciones">
      <button class="btn btn--primario" :disabled="guardando">{{ guardando ? 'Guardando…' : 'Guardar' }}</button>
      <button type="button" class="btn btn--borde" @click="emit('cancelar')">Cancelar</button>
    </div>
  </form>
</template>
