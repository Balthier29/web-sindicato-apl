import { ref } from 'vue'
import { optimizeGalleryImage } from '@/utils/optimizeImage'
import { subirArchivo } from '@/services/storageService'

const extension = (blob) => (blob.type === 'image/webp' ? 'webp' : 'jpg')

// Optimiza la foto en el navegador (thumb 600 px + full 1600 px) y sube ambas versiones
export function useImageUpload(carpeta = 'news') {
  const subiendo = ref(false)
  const error = ref('')

  async function subir(archivo) {
    subiendo.value = true
    error.value = ''
    try {
      const { thumb, full } = await optimizeGalleryImage(archivo)
      const id = crypto.randomUUID()
      const thumbPath = `${carpeta}/${id}-thumb.${extension(thumb)}`
      const fullPath = `${carpeta}/${id}-full.${extension(full)}`

      const [thumbUrl, fullUrl] = await Promise.all([
        subirArchivo(thumbPath, thumb, thumb.type),
        subirArchivo(fullPath, full, full.type)
      ])

      return { thumbUrl, fullUrl, thumbPath, fullPath }
    } catch (e) {
      error.value = e.message || 'No se pudo subir la imagen.'
      throw e
    } finally {
      subiendo.value = false
    }
  }

  return { subir, subiendo, error }
}
