<script setup>
import EventItem from '@/components/events/EventItem.vue'
import { useEvents } from '@/composables/useEvents'

const { eventos, cargando, error } = useEvents({ limite: 50 })
</script>

<template>
  <section class="seccion">
    <div class="contenedor">
      <h1 class="titulo-pagina">Próximos eventos</h1>
      <p class="bajada">Asambleas, actividades y fechas importantes del sindicato.</p>

      <p v-if="cargando" class="estado">Cargando eventos…</p>
      <p v-else-if="error" class="estado">No pudimos cargar los eventos. Intenta de nuevo en unos minutos.</p>
      <p v-else-if="!eventos.length" class="estado">Por ahora no hay eventos programados.</p>
      <div v-else class="eventos">
        <EventItem v-for="e in eventos" :key="e.id" :evento="e" detalle />
      </div>
    </div>
  </section>
</template>

<style scoped>
.eventos {
  display: grid;
  gap: var(--espacio-2);
  max-width: 800px;
}

.estado {
  color: var(--gris-600);
}
</style>
