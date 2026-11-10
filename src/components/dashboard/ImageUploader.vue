<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useImageUpload } from '@/composables/useImageUpload'

const props = defineProps({
  actual: { type: String, default: '' } // URL de la imagen ya guardada (si existe)
})
const emit = defineEmits(['subida', 'quitar'])

const { subir, subiendo, error } = useImageUpload('news')
const vista = ref(props.actual)
let urlTemporal = ''

async function alElegir(evento) {
  const archivo = evento.target.files?.[0]
  evento.target.value = ''
  if (!archivo) return

  if (urlTemporal) URL.revokeObjectURL(urlTemporal)
  urlTemporal = URL.createObjectURL(archivo)
  vista.value = urlTemporal

  try {
    emit('subida', await subir(archivo))
  } catch {
    vista.value = props.actual // vuelve a la imagen anterior si falla
  }
}

function quitar() {
  vista.value = ''
  emit('quitar')
}

onBeforeUnmount(() => urlTemporal && URL.revokeObjectURL(urlTemporal))
</script>

<template>
  <div class="uploader">
    <div class="uploader__vista">
      <img v-if="vista" :src="vista" alt="Vista previa de la imagen" />
      <span v-else>Sin imagen</span>
    </div>

    <div class="uploader__acciones">
      <label class="btn btn--borde uploader__btn" :class="{ 'is-disabled': subiendo }">
        {{ subiendo ? 'Optimizando y subiendo…' : vista ? 'Cambiar imagen' : 'Elegir imagen' }}
        <input type="file" accept="image/jpeg,image/png,image/webp" class="sr-only" :disabled="subiendo" @change="alElegir" />
      </label>
      <button v-if="vista && !subiendo" type="button" class="dash__enlace-peligro" @click="quitar">Quitar</button>
      <p class="uploader__ayuda">JPG, PNG o WebP de hasta 20 MB. Se optimiza sola antes de subirse.</p>
      <p v-if="error" class="dash__error" role="alert">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.uploader {
  display: grid;
  gap: var(--espacio-2);
}

.uploader__vista {
  display: grid;
  place-items: center;
  aspect-ratio: 3 / 2;
  max-width: 280px;
  overflow: hidden;
  border: 2px dashed var(--gris-300);
  border-radius: var(--radio);
  background: var(--gris-100);
  font-size: 0.85rem;
  color: var(--gris-600);
}

.uploader__vista img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploader__btn {
  cursor: pointer;
}

.uploader__btn.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.uploader__ayuda {
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  color: var(--gris-600);
}

@media (min-width: 600px) {
  .uploader {
    grid-template-columns: 280px 1fr;
    align-items: start;
  }
}
</style>
