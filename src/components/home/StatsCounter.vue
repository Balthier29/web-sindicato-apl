<script setup>
import { ref, onMounted } from 'vue'
import { getStats, STATS_EJEMPLO } from '@/services/statsService'

// Arranca con valores de ejemplo y se reemplaza con los del dashboard (tabla "stats")
const stats = ref(STATS_EJEMPLO)

onMounted(async () => {
  try {
    stats.value = await getStats()
  } catch {
    // Si falla la carga se mantienen los valores de ejemplo
  }
})
</script>

<template>
  <section class="stats">
    <div class="contenedor stats__grid">
      <div v-for="s in stats" :key="s.clave" class="stat">
        <strong>{{ s.valor }}</strong>
        <span>{{ s.etiqueta }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  padding-block: var(--espacio-4);
  background: var(--azul-oscuro);
  color: var(--blanco);
  text-align: center;
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espacio-2);
}

.stat strong {
  display: block;
  font-family: var(--fuente-titulo);
  font-size: clamp(1.6rem, 6vw, 2.6rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--amarillo);
}

.stat span {
  font-size: clamp(0.65rem, 2.4vw, 0.85rem);
  opacity: 0.85;
}
</style>
