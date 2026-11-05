<script setup>
import EventItem from '@/components/events/EventItem.vue'
import { useEvents } from '@/composables/useEvents'

const { eventos, cargando } = useEvents({ limite: 3 })
</script>

<template>
  <section class="seccion">
    <div class="contenedor">
      <h2 class="titulo-seccion">Próximos eventos</h2>
      <p v-if="cargando" class="estado">Cargando eventos…</p>
      <p v-else-if="!eventos.length" class="estado">Pronto publicaremos nuevas actividades.</p>
      <div v-else class="eventos">
        <EventItem v-for="e in eventos" :key="e.id" :evento="e" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.eventos {
  display: grid;
  gap: var(--espacio-2);
}

.estado {
  color: var(--gris-600);
}

@media (min-width: 768px) {
  .eventos { grid-template-columns: repeat(3, 1fr); }
}
</style>
