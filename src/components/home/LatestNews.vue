<script setup>
import NewsCard from '@/components/news/NewsCard.vue'
import { useNews } from '@/composables/useNews'

const { noticias, cargando } = useNews({ limite: 3 })
</script>

<template>
  <section class="seccion">
    <div class="contenedor">
      <h2 class="titulo-seccion">Últimas noticias</h2>
      <p v-if="cargando" class="estado">Cargando noticias…</p>
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

@media (min-width: 768px) {
  .noticias { grid-template-columns: repeat(3, 1fr); }
}
</style>
