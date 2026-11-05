<script setup>
const anio = new Date().getFullYear()

const enlaces = [
  { nombre: 'Quiénes somos', ruta: '/quienes-somos' },
  { nombre: 'Noticias', ruta: '/noticias' },
  { nombre: 'Eventos', ruta: '/eventos' },
  { nombre: 'Documentos', ruta: '/documentos' },
  { nombre: 'Beneficios', ruta: '/beneficios' },
  { nombre: 'Inscripción', ruta: '/inscripcion' },
  { nombre: 'Contacto', ruta: '/contacto' }
]
</script>

<template>
  <footer class="footer">
    <div class="contenedor footer__grid">
      <div>
        <h3>Sindicato Nacional APL</h3>
        <p>Unidos somos más fuertes. Logística con personas.</p>
        <p class="footer__copy">© {{ anio }} Sindicato Nacional APL</p>
      </div>
      <nav aria-label="Enlaces del pie">
        <ul class="footer__links">
          <li v-for="e in enlaces" :key="e.ruta">
            <router-link :to="e.ruta">{{ e.nombre }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0c1535;
  color: rgba(255, 255, 255, 0.8);
  padding-block: var(--espacio-4);
  font-size: 0.85rem;
}

.footer h3 {
  color: var(--blanco);
  font-size: 1rem;
}

.footer__grid {
  display: grid;
  gap: var(--espacio-3);
}

.footer__links {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: start;
  gap: 0.4rem 2rem;
}

.footer__links a:hover {
  color: var(--amarillo);
}

.footer__copy {
  font-size: 0.75rem;
  opacity: 0.7;
}

@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  .footer__links {
    justify-content: end;
  }
}
</style>
