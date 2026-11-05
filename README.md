# Web Sindicato Nacional APL

Sitio web del Sindicato Nacional APL con panel de administración para cargar noticias, eventos, documentos e imágenes.

**Stack:** Vue 3 (Vue CLI) · Composition API · Vue Router · Pinia · Supabase

## Requisitos

- Node.js 18 o superior
- Git

## Cómo levantar el proyecto

```bash
git clone <URL-DEL-REPO>
cd web-sindicato-apl
npm install
cp .env.example .env      # completar con las claves de Supabase
npm run serve
```

La web queda en `http://localhost:8080`. Sin `.env` la portada igual carga con datos de ejemplo.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run serve` | Servidor de desarrollo |
| `npm run build` | Compila para producción (carpeta `dist`) |
| `npm run lint` | Revisa y corrige el código |

## Estructura

```
public/                 logo-apl.png, bandera-apl.png, index.html
src/
  assets/styles/        global.css, responsive.css, dashboard.css
  components/           layout, home, news, events, dashboard, ui
  composables/          lógica reutilizable (useNews, useEvents...)
  layouts/              PublicLayout, DashboardLayout
  router/               rutas y guards del dashboard
  services/             comunicación con Supabase
  stores/               Pinia (auth)
  utils/                optimizeImage.js, formatDate.js
  views/public/         páginas del sitio
  views/dashboard/      páginas del panel
```

## Imágenes

Toda imagen que se suba desde el dashboard pasa por `src/utils/optimizeImage.js`, que genera dos versiones en WebP:
`thumb` (600 px, ~80 KB) para tarjetas y `full` (1600 px, ~250 KB) para el detalle.

## Archivos que deben estar en `public/`

- `logo-apl.png` (logo circular)
- `bandera-apl.png` (bandera / banner)

## Trabajo en equipo

Ver [CONTRIBUTING.md](CONTRIBUTING.md).
