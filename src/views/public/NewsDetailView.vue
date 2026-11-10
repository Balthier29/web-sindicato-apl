<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getNewsById } from '@/services/newsService'
import { formatDate } from '@/utils/formatDate'

const route = useRoute()
const noticia = ref(null)
const cargando = ref(true)

async function cargar(id) {
  cargando.value = true
  try {
    noticia.value = await getNewsById(id)
  } catch {
    noticia.value = null // id inválido o error de red: se muestra "no encontrada"
  } finally {
    cargando.value = false
  }
  if (noticia.value) document.title = `${noticia.value.titulo} | Sindicato Nacional APL`
}

watch(() => route.params.id, cargar, { immediate: true })
</script>

<template>
  <section class="seccion">
    <div class="contenedor detalle">
      <router-link to="/noticias" class="detalle__volver">← Volver a noticias</router-link>

      <p v-if="cargando" class="estado">Cargando…</p>

      <div v-else-if="!noticia" class="estado">
        <h1 class="titulo-pagina">Noticia no encontrada</h1>
        <p>Puede que haya sido retirada o que el enlace esté incompleto.</p>
      </div>

      <article v-else>
        <p v-if="!noticia.publicada" class="detalle__borrador">
          Borrador: solo tú puedes ver esta noticia. Aún no está publicada.
        </p>
        <time class="detalle__fecha">{{ formatDate(noticia.fecha) }}</time>
        <h1 class="titulo-pagina">{{ noticia.titulo }}</h1>
        <p v-if="noticia.resumen" class="detalle__resumen">{{ noticia.resumen }}</p>

        <img
          v-if="noticia.full_url || noticia.thumb_url"
          class="detalle__imagen"
          :src="noticia.full_url || noticia.thumb_url"
          :alt="noticia.titulo"
          decoding="async"
        />

        <!-- Texto plano con saltos de línea (no se interpreta HTML, por seguridad) -->
        <div class="detalle__contenido">{{ noticia.contenido }}</div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.detalle {
  max-width: 800px;
}

.detalle__volver {
  display: inline-block;
  margin-bottom: var(--espacio-3);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--celeste);
}

.detalle__fecha {
  font-size: 0.8rem;
  color: var(--gris-600);
}

.detalle__resumen {
  font-size: 1.1rem;
  color: var(--gris-600);
}

.detalle__imagen {
  width: 100%;
  margin-block: var(--espacio-3);
  border-radius: var(--radio-lg);
  box-shadow: var(--sombra);
}

.detalle__contenido {
  white-space: pre-line;
  line-height: 1.75;
}

.detalle__borrador {
  padding: 0.6rem 0.9rem;
  border-radius: var(--radio);
  background: #fff4d6;
  font-size: 0.85rem;
  color: #7a5a00;
}

.estado {
  color: var(--gris-600);
}
</style>
