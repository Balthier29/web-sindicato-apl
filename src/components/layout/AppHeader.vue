<script setup>
import { ref } from 'vue'

const menuAbierto = ref(false)

const enlaces = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Quiénes somos', ruta: '/quienes-somos' },
  { nombre: 'Noticias', ruta: '/noticias' },
  { nombre: 'Eventos', ruta: '/eventos' },
  { nombre: 'Documentos', ruta: '/documentos' },
  { nombre: 'Beneficios', ruta: '/beneficios' },
  { nombre: 'Contacto', ruta: '/contacto' }
]

const cerrar = () => (menuAbierto.value = false)
</script>

<template>
  <header class="header">
    <div class="contenedor header__barra">
      <router-link to="/" class="header__marca" @click="cerrar">
        <img src="/logo-apl.webp" alt="" width="34" height="34" />
        <span>Sindicato Nacional APL</span>
      </router-link>

      <button
        class="header__toggle"
        :aria-expanded="menuAbierto"
        aria-controls="menu-principal"
        @click="menuAbierto = !menuAbierto"
      >
        <span class="sr-only">Abrir menú</span>
        <span class="header__hamburguesa" :class="{ 'is-open': menuAbierto }"></span>
      </button>

      <nav id="menu-principal" class="header__nav" :class="{ 'is-open': menuAbierto }" aria-label="Principal">
        <ul>
          <li v-for="e in enlaces" :key="e.ruta">
            <router-link :to="e.ruta" @click="cerrar">{{ e.nombre }}</router-link>
          </li>
          <li class="header__cta">
            <router-link to="/inscripcion" class="btn btn--amarillo" @click="cerrar">Inscripción</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--azul-oscuro);
  color: var(--blanco);
}

.header__barra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--altura-header);
}

.header__marca {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--fuente-titulo);
  font-weight: 700;
  font-size: 0.95rem;
}

/* Menú móvil */
.header__nav {
  display: none;
  position: absolute;
  inset: var(--altura-header) 0 auto 0;
  background: var(--azul-oscuro);
  padding: var(--espacio-2) var(--espacio-3) var(--espacio-3);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.header__nav.is-open {
  display: block;
}

.header__nav ul {
  display: grid;
  gap: 0.25rem;
}

.header__nav a:not(.btn) {
  display: block;
  padding: 0.6rem 0;
  font-size: 0.95rem;
}

.header__nav a.router-link-exact-active:not(.btn) {
  color: var(--amarillo);
}

.header__cta {
  margin-top: var(--espacio-1);
}

/* Botón hamburguesa */
.header__toggle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  background: none;
  border: 0;
}

.header__hamburguesa,
.header__hamburguesa::before,
.header__hamburguesa::after {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--blanco);
  transition: transform 0.2s ease, background 0.2s ease;
}

.header__hamburguesa {
  position: relative;
}

.header__hamburguesa::before,
.header__hamburguesa::after {
  content: '';
  position: absolute;
  left: 0;
}

.header__hamburguesa::before { top: -7px; }
.header__hamburguesa::after { top: 7px; }

.header__hamburguesa.is-open { background: transparent; }
.header__hamburguesa.is-open::before { transform: translateY(7px) rotate(45deg); }
.header__hamburguesa.is-open::after { transform: translateY(-7px) rotate(-45deg); }

@media (min-width: 900px) {
  .header__toggle {
    display: none;
  }

  .header__nav {
    display: block;
    position: static;
    padding: 0;
    border: 0;
    background: none;
  }

  .header__nav ul {
    display: flex;
    align-items: center;
    gap: 1.4rem;
  }

  .header__nav a:not(.btn) {
    padding: 0.3rem 0;
    font-size: 0.85rem;
  }

  .header__cta {
    margin: 0;
  }
}
</style>
