<template>
  <section class="hero">
    <div class="contenedor hero__grid">
      <div class="hero__texto">
        <p class="hero__etiqueta">SINDICATO NACIONAL</p>
        <h1>Unidos somos más fuertes</h1>
        <p class="hero__bajada">
          Defendemos los derechos de las trabajadoras y los trabajadores de la logística.
        </p>
        <div class="hero__acciones">
          <router-link to="/quienes-somos" class="btn btn--primario">Conócenos</router-link>
          <router-link to="/noticias" class="btn btn--borde">Ver noticias</router-link>
        </div>
      </div>
      <img
        class="hero__logo"
        src="/logo-apl.png"
        alt="Logo del Sindicato Nacional APL: Unidos somos más fuertes"
        width="280"
        height="280"
      />
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: var(--celeste);
  padding-block: var(--espacio-5);
}

.hero__grid {
  display: grid;
  gap: var(--espacio-4);
  align-items: center;
}

.hero__etiqueta {
  margin-bottom: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--azul-oscuro);
}

.hero h1 {
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 800;
}

.hero__bajada {
  max-width: 42ch;
  color: var(--azul-oscuro);
}

.hero__acciones {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espacio-1);
  margin-top: var(--espacio-3);
}

.hero__logo {
  width: min(240px, 60vw);
  margin-inline: auto;
}

@media (min-width: 768px) {
  .hero {
    padding-block: var(--espacio-6);
  }

  .hero__grid {
    grid-template-columns: 1.2fr 0.8fr;
  }

  .hero__logo {
    width: min(320px, 100%);
  }
}
</style>
