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
      <h3>
        <!-- El enlace cubre toda la tarjeta (ver ::after) -->
        <router-link :to="`/noticias/${noticia.id}`" class="noticia__enlace">{{ noticia.titulo }}</router-link>
      </h3>
      <p>{{ noticia.resumen }}</p>
      <span class="noticia__mas" aria-hidden="true">Leer más ›</span>
    </div>
  </article>
</template>

<style scoped>
.noticia {
  position: relative;
  overflow: hidden;
  background: var(--blanco);
  border: 1px solid var(--celeste-claro);
  border-radius: var(--radio);
  box-shadow: var(--sombra);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.noticia:hover,
.noticia:focus-within {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(20, 33, 79, 0.18);
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

.noticia__enlace::after {
  content: '';
  position: absolute;
  inset: 0;
}

.noticia p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 0 0 0.5rem;
  overflow: hidden;
  font-size: 0.85rem;
  color: var(--gris-600);
}

.noticia__mas {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--celeste);
}
</style>
