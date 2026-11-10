<script setup>
import { ref } from 'vue'
import NewsForm from '@/components/dashboard/NewsForm.vue'
import { useCrudList } from '@/composables/useCrudList'
import { newsAdmin } from '@/services/crud'
import { eliminarArchivos } from '@/services/storageService'
import { formatDate } from '@/utils/formatDate'

const { items, cargando, guardando, error, aviso, ejecutar } = useCrudList(newsAdmin)

const editando = ref(null) // noticia en edición
const creando = ref(false)

const cerrar = () => {
  editando.value = null
  creando.value = false
}

async function guardar(valores) {
  const anterior = editando.value
  const ok = await ejecutar(async () => {
    if (anterior) {
      await newsAdmin.actualizar(anterior.id, valores)
      // Si se cambió o quitó la imagen, borra los archivos viejos del bucket
      if (anterior.thumb_path && anterior.thumb_path !== valores.thumb_path) {
        await eliminarArchivos([anterior.thumb_path, anterior.full_path])
      }
    } else {
      await newsAdmin.crear(valores)
    }
  }, 'Noticia guardada.')
  if (ok) cerrar()
}

async function eliminar(noticia) {
  if (!window.confirm(`¿Eliminar la noticia "${noticia.titulo}"? Esta acción no se puede deshacer.`)) return
  await ejecutar(async () => {
    await newsAdmin.eliminar(noticia.id)
    await eliminarArchivos([noticia.thumb_path, noticia.full_path])
  }, 'Noticia eliminada.')
}
</script>

<template>
  <div>
    <header class="dash__encabezado">
      <h1>Noticias</h1>
      <button v-if="!creando && !editando" class="btn btn--primario" @click="creando = true">+ Nueva noticia</button>
    </header>

    <p v-if="aviso" class="dash__aviso" role="status">{{ aviso }}</p>
    <p v-if="error" class="dash__error" role="alert">{{ error }}</p>

    <NewsForm v-if="creando" :guardando="guardando" @guardar="guardar" @cancelar="cerrar" />
    <NewsForm v-else-if="editando" :key="editando.id" :noticia="editando" :guardando="guardando" @guardar="guardar" @cancelar="cerrar" />

    <div v-else class="dash__card">
      <p v-if="cargando">Cargando…</p>
      <p v-else-if="!items.length">Todavía no hay noticias. Crea la primera con el botón de arriba.</p>
      <ul v-else class="dash__lista">
        <li v-for="n in items" :key="n.id">
          <img v-if="n.thumb_url" :src="n.thumb_url" alt="" width="64" height="44" loading="lazy" />
          <div class="dash__lista-texto">
            <strong>{{ n.titulo }}</strong>
            <small>{{ formatDate(n.fecha) }}</small>
          </div>
          <span class="dash__estado" :class="{ 'is-ok': n.publicada }">{{ n.publicada ? 'Publicada' : 'Borrador' }}</span>
          <div class="dash__fila-acciones">
            <button class="dash__enlace-borde" @click="editando = n">Editar</button>
            <button class="dash__enlace-peligro" @click="eliminar(n)">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
