<script setup>
const accesos = [
  { titulo: 'Inscripción', texto: 'Súmate al sindicato.', ruta: '/inscripcion' },
  { titulo: 'Beneficios', texto: 'Convenios personales y extra.', ruta: '/beneficios' },
  { titulo: 'Documentos', texto: 'Estatutos, actas y formularios.', ruta: '/documentos' },
  { titulo: 'Contacto', texto: 'Escríbenos o llámanos.', ruta: '/contacto' }
]
</script>

<template>
  <section class="seccion">
    <div class="contenedor">
      <h2 class="titulo-seccion">Accesos rápidos</h2>
      <div class="accesos">
        <router-link v-for="a in accesos" :key="a.ruta" :to="a.ruta" class="tarjeta acceso">
          <h3>{{ a.titulo }}</h3>
          <p>{{ a.texto }}</p>
          <span class="acceso__mas">Ver más ›</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.accesos {
  display: grid;
  gap: var(--espacio-2);
  grid-template-columns: 1fr;
}

.acceso {
  display: block;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.acceso:hover {
  transform: translateY(-3px);
  box-shadow: var(--sombra);
}

.acceso h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.acceso p {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: var(--gris-600);
}

.acceso__mas {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--celeste);
}

@media (min-width: 480px) {
  .accesos { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 900px) {
  .accesos { grid-template-columns: repeat(4, 1fr); }
}
</style>
