<script setup>
// Valores de ejemplo: luego se cargarán desde el dashboard (tabla "stats")
const stats = [
  { valor: '2003', etiqueta: 'Año de fundación' },
  { valor: '00', etiqueta: 'Socios y socias' },
  { valor: '00', etiqueta: 'Convenios vigentes' }
]
</script>

<template>
  <section class="stats">
    <div class="contenedor stats__grid">
      <div v-for="s in stats" :key="s.etiqueta" class="stat">
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
