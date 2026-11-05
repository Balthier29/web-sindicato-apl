<template>
  <section class="join">
    <div class="contenedor">
      <h2>Súmate al sindicato</h2>
      <p>Completa el formulario de inscripción y forma parte de la comunidad APL.</p>
      <router-link to="/inscripcion" class="btn btn--rojo">Quiero afiliarme</router-link>
    </div>
  </section>
</template>

<style scoped>
.join {
  padding-block: var(--espacio-5);
  background: var(--celeste-claro);
  text-align: center;
}

.join h2 {
  font-size: 1.5rem;
}

.join p {
  max-width: 48ch;
  margin-inline: auto;
  margin-bottom: var(--espacio-3);
  font-size: 0.9rem;
  color: var(--gris-600);
}
</style>
