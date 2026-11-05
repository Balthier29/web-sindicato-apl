# Guía para colaborar

## Ramas

- `main`: producción. Protegida, solo se actualiza con Pull Request.
- `develop`: integración de lo que está listo.
- `feature/<nombre>`: una rama por tarea (`feature/hero-section`).
- `fix/<nombre>`: correcciones.

## Flujo

1. `git checkout develop && git pull`
2. `git checkout -b feature/mi-tarea`
3. Trabaja y haz commits pequeños.
4. `git push -u origin feature/mi-tarea` y abre un Pull Request hacia `develop`.
5. Otra persona revisa y aprueba antes de fusionar.

## Commits

Formato: `tipo: descripción en minúscula`

- `feat:` nueva funcionalidad
- `fix:` corrección
- `style:` solo estilos o formato
- `refactor:` reorganización sin cambiar comportamiento
- `docs:` documentación

## Convenciones de código

- Componentes en `PascalCase.vue`, composables con prefijo `use`.
- Siempre `<script setup>` (Composition API).
- Colores, espaciados y tipografías desde las variables de `global.css`, no valores sueltos.
- Los componentes no llaman a Supabase directamente: usan composables que usan `services/`.
- Mobile-first: se escribe para móvil y se amplía con `min-width`.

## Seguridad

- Nunca subir `.env` ni claves.
- Nunca usar la `service_role key` de Supabase en el front.
