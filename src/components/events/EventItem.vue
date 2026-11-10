<script setup>
import { computed } from 'vue'

const props = defineProps({
  evento: { type: Object, required: true },
  detalle: { type: Boolean, default: false } // muestra la descripción (página de Eventos)
})

const fecha = computed(() => new Date(props.evento.fecha + 'T00:00:00'))
const dia = computed(() => String(fecha.value.getDate()).padStart(2, '0'))
const mes = computed(() =>
  fecha.value.toLocaleDateString('es-CL', { month: 'short' }).replace('.', '').toUpperCase()
)
</script>

<template>
  <article class="evento tarjeta">
    <div class="evento__fecha">
      <strong>{{ dia }}</strong>
      <span>{{ mes }}</span>
    </div>
    <div>
      <h3>{{ evento.titulo }}</h3>
      <p>{{ evento.lugar }} · {{ evento.hora }}</p>
      <p v-if="detalle && evento.descripcion" class="evento__desc">{{ evento.descripcion }}</p>
    </div>
  </article>
</template>

<style scoped>
.evento {
  display: flex;
  align-items: center;
  gap: var(--espacio-2);
}

.evento__fecha {
  display: grid;
  place-items: center;
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: var(--azul-oscuro);
  color: var(--blanco);
  line-height: 1;
}

.evento__fecha strong {
  font-family: var(--fuente-titulo);
  font-size: 1.15rem;
}

.evento__fecha span {
  font-size: 0.6rem;
  letter-spacing: 0.05em;
}

.evento h3 {
  margin: 0;
  font-size: 0.95rem;
}

.evento p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--gris-600);
}

.evento .evento__desc {
  margin-top: 0.4rem;
  white-space: pre-line;
  color: var(--texto);
}
</style>
