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
        <p class="footer__copy">
          © {{ anio }} Sindicato Nacional APL
          <router-link to="/dashboard" class="footer__admin" aria-label="Acceso administración" title="Acceso administración">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </router-link>
        </p>
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
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.75rem;
  opacity: 0.7;
}

/* Engranaje discreto: visible para quien lo busca, sin llamar la atención */
.footer__admin {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  opacity: 0.6;
  transition: opacity 0.15s ease, color 0.15s ease;
}

.footer__admin:hover,
.footer__admin:focus-visible {
  opacity: 1;
  color: var(--amarillo);
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
