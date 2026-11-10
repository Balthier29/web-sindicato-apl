<script setup>
import NewsCard from '@/components/news/NewsCard.vue'
import { useNews } from '@/composables/useNews'

const { noticias, cargando, error } = useNews({ limite: 50 })
</script>

<template>
  <section class="seccion">
    <div class="contenedor">
      <h1 class="titulo-pagina">Noticias</h1>
      <p class="bajada">Lo último que ocurre en el Sindicato Nacional APL.</p>

      <p v-if="cargando" class="estado">Cargando noticias…</p>
      <p v-else-if="error" class="estado">No pudimos cargar las noticias. Intenta de nuevo en unos minutos.</p>
      <p v-else-if="!noticias.length" class="estado">Aún no hay noticias publicadas.</p>
      <div v-else class="noticias">
        <NewsCard v-for="n in noticias" :key="n.id" :noticia="n" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.noticias {
  display: grid;
  gap: var(--espacio-3);
}

.estado {
  color: var(--gris-600);
}

@media (min-width: 600px) {
  .noticias { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 960px) {
  .noticias { grid-template-columns: repeat(3, 1fr); }
}
</style>
