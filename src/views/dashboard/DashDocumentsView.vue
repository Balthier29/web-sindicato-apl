<script setup>
import { ref } from 'vue'
import DocumentForm from '@/components/dashboard/DocumentForm.vue'
import { useCrudList } from '@/composables/useCrudList'
import { documentsAdmin } from '@/services/crud'
import { eliminarArchivos } from '@/services/storageService'
import { formatDate } from '@/utils/formatDate'

const { items, cargando, guardando, error, aviso, ejecutar } = useCrudList(documentsAdmin)

const creando = ref(false)

async function guardar(valores) {
  const ok = await ejecutar(() => documentsAdmin.crear(valores), 'Documento guardado.')
  if (ok) {
    creando.value = false
  } else {
    // Si la fila no se pudo guardar, no dejamos el PDF huérfano en el bucket
    await eliminarArchivos([valores.file_path]).catch(() => {})
  }
}

async function alternar(doc) {
  await ejecutar(() => documentsAdmin.actualizar(doc.id, { publicado: !doc.publicado }), 'Documento actualizado.')
}

async function eliminar(doc) {
  if (!window.confirm(`¿Eliminar el documento "${doc.titulo}"?`)) return
  await ejecutar(async () => {
    await documentsAdmin.eliminar(doc.id)
    await eliminarArchivos([doc.file_path])
  }, 'Documento eliminado.')
}
</script>

<template>
  <div>
    <header class="dash__encabezado">
      <h1>Documentos</h1>
      <button v-if="!creando" class="btn btn--primario" @click="creando = true">+ Nuevo documento</button>
    </header>

    <p v-if="aviso" class="dash__aviso" role="status">{{ aviso }}</p>
    <p v-if="error" class="dash__error" role="alert">{{ error }}</p>

    <DocumentForm v-if="creando" :guardando="guardando" @guardar="guardar" @cancelar="creando = false" />

    <div v-else class="dash__card">
      <p v-if="cargando">Cargando…</p>
      <p v-else-if="!items.length">Todavía no hay documentos.</p>
      <ul v-else class="dash__lista">
        <li v-for="d in items" :key="d.id">
          <div class="dash__lista-texto">
            <strong><a :href="d.file_url" target="_blank" rel="noopener">{{ d.titulo }}</a></strong>
            <small>{{ d.categoria || 'Sin categoría' }} · {{ formatDate(d.created_at.slice(0, 10)) }}</small>
          </div>
          <span class="dash__estado" :class="{ 'is-ok': d.publicado }">{{ d.publicado ? 'Publicado' : 'Oculto' }}</span>
          <div class="dash__fila-acciones">
            <button class="dash__enlace-borde" @click="alternar(d)">{{ d.publicado ? 'Ocultar' : 'Publicar' }}</button>
            <button class="dash__enlace-peligro" @click="eliminar(d)">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
