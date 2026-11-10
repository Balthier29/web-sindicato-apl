<script setup>
import { useDocuments } from '@/composables/useDocuments'
import { formatDate } from '@/utils/formatDate'

const { documentos, grupos, cargando, error } = useDocuments()
</script>

<template>
  <section class="seccion">
    <div class="contenedor docs">
      <h1 class="titulo-pagina">Documentos</h1>
      <p class="bajada">Estatutos, actas y formularios disponibles para descargar.</p>

      <p v-if="cargando" class="estado">Cargando documentos…</p>
      <p v-else-if="error" class="estado">No pudimos cargar los documentos. Intenta de nuevo en unos minutos.</p>
      <p v-else-if="!documentos.length" class="estado">Aún no hay documentos publicados.</p>

      <template v-else>
        <section v-for="g in grupos" :key="g.categoria" class="docs__grupo">
          <h2 class="titulo-seccion">{{ g.categoria }}</h2>
          <ul class="docs__lista">
            <li v-for="d in g.items" :key="d.id" class="tarjeta docs__item">
              <div>
                <h3>{{ d.titulo }}</h3>
                <p v-if="d.descripcion">{{ d.descripcion }}</p>
                <small>Publicado el {{ formatDate(d.created_at.slice(0, 10)) }}</small>
              </div>
              <a :href="d.file_url" target="_blank" rel="noopener" class="btn btn--primario">Ver PDF</a>
            </li>
          </ul>
        </section>
      </template>
    </div>
  </section>
</template>

<style scoped>
.docs {
  max-width: 800px;
}

.docs__grupo {
  margin-bottom: var(--espacio-4);
}

.docs__lista {
  display: grid;
  gap: var(--espacio-2);
}

.docs__item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--espacio-2);
}

.docs__item h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.docs__item p {
  margin: 0 0 0.25rem;
  font-size: 0.85rem;
  color: var(--gris-600);
}

.docs__item small {
  color: var(--gris-600);
}

.estado {
  color: var(--gris-600);
}
</style>
