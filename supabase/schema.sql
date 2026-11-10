-- =====================================================================
-- Sindicato Nacional APL — esquema de Supabase
--
-- Cómo usarlo:
--   1. Supabase > SQL Editor > New query
--   2. Pegar TODO este archivo y presionar Run
--   3. Crear el usuario administrador en Authentication > Users > Add user
--      (con "Auto Confirm User" marcado)
--   4. Ejecutar la consulta del PASO FINAL (al final de este archivo)
--
-- Es seguro ejecutarlo más de una vez: no borra datos existentes.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1) ADMINISTRADORES
--    Solo quienes estén en esta tabla pueden publicar desde el dashboard.
--    No tiene políticas de escritura: se agregan únicamente desde el
--    SQL Editor (PASO FINAL), nunca desde la web.
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

drop policy if exists "admins: cada uno se ve a si mismo" on public.admins;
create policy "admins: cada uno se ve a si mismo"
  on public.admins for select
  to authenticated
  using (user_id = auth.uid());

-- Función auxiliar usada por todas las políticas
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;


-- ---------------------------------------------------------------------
-- 2) NOTICIAS
-- ---------------------------------------------------------------------
create table if not exists public.news (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null check (char_length(titulo) between 1 and 200),
  resumen     text check (char_length(resumen) <= 400),
  contenido   text,
  fecha       date not null default current_date,
  thumb_url   text,   -- miniatura 600 px (tarjetas)
  full_url    text,   -- versión 1600 px (detalle)
  thumb_path  text,   -- ruta dentro del bucket (para poder borrarla)
  full_path   text,
  publicada   boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists news_publicada_fecha_idx on public.news (publicada, fecha desc);

alter table public.news enable row level security;

drop policy if exists "news: lectura publica" on public.news;
create policy "news: lectura publica"
  on public.news for select
  using (publicada = true or (select public.is_admin()));

drop policy if exists "news: admin escribe" on public.news;
create policy "news: admin escribe"
  on public.news for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));


-- ---------------------------------------------------------------------
-- 3) EVENTOS
-- ---------------------------------------------------------------------
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null check (char_length(titulo) between 1 and 200),
  lugar       text,
  hora        text,
  fecha       date not null,
  descripcion text,
  created_at  timestamptz not null default now()
);

create index if not exists events_fecha_idx on public.events (fecha);

alter table public.events enable row level security;

drop policy if exists "events: lectura publica" on public.events;
create policy "events: lectura publica"
  on public.events for select
  using (true);

drop policy if exists "events: admin escribe" on public.events;
create policy "events: admin escribe"
  on public.events for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));


-- ---------------------------------------------------------------------
-- 4) DOCUMENTOS (estatutos, actas, formularios en PDF)
-- ---------------------------------------------------------------------
create table if not exists public.documents (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null check (char_length(titulo) between 1 and 200),
  descripcion text,
  categoria   text,
  file_url    text not null,
  file_path   text not null,
  publicado   boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.documents enable row level security;

drop policy if exists "documents: lectura publica" on public.documents;
create policy "documents: lectura publica"
  on public.documents for select
  using (publicado = true or (select public.is_admin()));

drop policy if exists "documents: admin escribe" on public.documents;
create policy "documents: admin escribe"
  on public.documents for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));


-- ---------------------------------------------------------------------
-- 5) ESTADÍSTICAS (las 3 cifras de la franja azul de la portada)
-- ---------------------------------------------------------------------
create table if not exists public.stats (
  clave    text primary key,
  valor    text not null,
  etiqueta text not null,
  orden    int  not null default 0
);

alter table public.stats enable row level security;

drop policy if exists "stats: lectura publica" on public.stats;
create policy "stats: lectura publica"
  on public.stats for select
  using (true);

drop policy if exists "stats: admin escribe" on public.stats;
create policy "stats: admin escribe"
  on public.stats for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

insert into public.stats (clave, valor, etiqueta, orden) values
  ('fundacion', '2003', 'Año de fundación',   1),
  ('socios',    '00',   'Socios y socias',    2),
  ('convenios', '00',   'Convenios vigentes', 3)
on conflict (clave) do nothing;


-- ---------------------------------------------------------------------
-- 6) ALMACENAMIENTO (bucket "media": imágenes optimizadas y PDF)
--    Público para lectura (las fotos se ven en la web); solo los
--    administradores pueden subir, cambiar o borrar archivos.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true,
  10485760,  -- 10 MB por archivo
  array['image/webp', 'image/jpeg', 'application/pdf']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media: admin lista" on storage.objects;
create policy "media: admin lista"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));

drop policy if exists "media: admin sube" on storage.objects;
create policy "media: admin sube"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and (select public.is_admin()));

drop policy if exists "media: admin modifica" on storage.objects;
create policy "media: admin modifica"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and (select public.is_admin()))
  with check (bucket_id = 'media' and (select public.is_admin()));

drop policy if exists "media: admin borra" on storage.objects;
create policy "media: admin borra"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));


-- ---------------------------------------------------------------------
-- PASO FINAL — convertir a una cuenta en administradora
--   1. Crea primero el usuario en Authentication > Users > Add user.
--   2. Reemplaza el correo, quita los "--" del inicio y ejecuta SOLO esto.
--   Repite con cada persona que deba publicar.
-- ---------------------------------------------------------------------
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'CORREO-DEL-ADMIN@gmail.com'
-- on conflict do nothing;
