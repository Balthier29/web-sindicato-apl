<script setup>
import { formatDate } from '@/utils/formatDate'

defineProps({
  noticia: { type: Object, required: true }
})
</script>

<template>
  <article class="noticia">
    <div class="noticia__imagen">
      <img
        v-if="noticia.thumb_url"
        :src="noticia.thumb_url"
        :alt="noticia.titulo"
        loading="lazy"
        width="600"
        height="400"
      />
    </div>
    <div class="noticia__cuerpo">
      <time class="noticia__fecha">{{ formatDate(noticia.fecha) }}</time>
      <h3>{{ noticia.titulo }}</h3>
      <p>{{ noticia.resumen }}</p>
    </div>
  </article>
</template>

<style scoped>
.noticia {
  overflow: hidden;
  background: var(--blanco);
  border: 1px solid var(--celeste-claro);
  border-radius: var(--radio);
  box-shadow: var(--sombra);
}

.noticia__imagen {
  aspect-ratio: 3 / 2;
  background: #8fd3f2;
}

.noticia__imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.noticia__cuerpo {
  padding: var(--espacio-2);
}

.noticia__fecha {
  font-size: 0.7rem;
  color: var(--gris-600);
}

.noticia h3 {
  margin: 0.25rem 0;
  font-size: 0.95rem;
}

.noticia p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--gris-600);
}
</style>
