// src/utils/optimizeImage.js

// Dos versiones de cada foto: miniatura para las tarjetas y versión grande para la galería
const VARIANTS = {
  thumb: { maxSize: 600, targetBytes: 80 * 1024 },
  full: { maxSize: 1600, targetBytes: 250 * 1024 }
}

const START_QUALITY = 0.82
const MIN_QUALITY = 0.5
const MAX_INPUT_BYTES = 20 * 1024 * 1024 // rechaza archivos de más de 20 MB antes de procesarlos

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve) => canvas.toBlob(resolve, type, quality))

// Dibuja el bitmap reducido y lo comprime hasta acercarse al peso objetivo
async function renderBlob(bitmap, { maxSize, targetBytes }) {
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#FFFFFF' // evita fondo negro en PNG con transparencia
  ctx.fillRect(0, 0, width, height)
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, 0, 0, width, height)

  // Intenta WebP; si el navegador no lo soporta, cae a JPEG
  let type = 'image/webp'
  let quality = START_QUALITY
  let blob = await canvasToBlob(canvas, type, quality)

  if (!blob || blob.type !== 'image/webp') {
    type = 'image/jpeg'
    blob = await canvasToBlob(canvas, type, quality)
  }

  // Baja la calidad de a poco hasta llegar al peso objetivo
  while (blob.size > targetBytes && quality > MIN_QUALITY) {
    quality = Math.round((quality - 0.07) * 100) / 100
    blob = await canvasToBlob(canvas, type, quality)
  }

  return blob
}

// Recibe el archivo original y devuelve { thumb, full } (dos Blob listos para subir)
export async function optimizeGalleryImage(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('El archivo no es una imagen.')
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new Error('La imagen pesa más de 20 MB. Elige una más liviana.')
  }

  let bitmap
  try {
    // 'from-image' respeta la rotación EXIF (fotos de celular que salen giradas)
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new Error('No se pudo leer la imagen. Usa un archivo JPG, PNG o WebP (los HEIC de iPhone no funcionan).')
  }

  try {
    const thumb = await renderBlob(bitmap, VARIANTS.thumb)
    const full = await renderBlob(bitmap, VARIANTS.full)
    return { thumb, full }
  } finally {
    bitmap.close()
  }
}