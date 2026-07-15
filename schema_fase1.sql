-- ============================================================
-- MUNDO REAL - Esquema de Base de Datos (Fase 1)
-- Ejecutar en: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Extensión para búsqueda sin tildes (ej: "tempera" encuentra "témpera")
create extension if not exists unaccent;

-- ============================================================
-- 1. CATEGORÍAS
-- ============================================================
create table public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  icon        text,                          -- nombre del icono de Lucide (ej: "palette")
  color       text default '#6366f1',        -- color hex para la tarjeta de categoría
  sort_order  int  default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- 2. PRODUCTOS
-- ============================================================
create table public.products (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  description   text,
  category_id   uuid references public.categories(id) on delete set null,
  price         numeric(10,2) not null default 0 check (price >= 0),
  stock         int not null default 0 check (stock >= 0),
  brand         text,
  main_image    text,                        -- URL en Supabase Storage
  images        text[] not null default '{}',-- galería de URLs adicionales
  featured      boolean not null default false,
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Índices para el catálogo (búsqueda, filtros, orden)
create index idx_products_category   on public.products(category_id);
create index idx_products_active     on public.products(active);
create index idx_products_featured   on public.products(featured) where featured = true;
create index idx_products_created_at on public.products(created_at desc);
create index idx_products_price      on public.products(price);
create index idx_products_name_trgm  on public.products using gin (to_tsvector('spanish', name || ' ' || coalesce(description, '') || ' ' || coalesce(brand, '')));

-- ============================================================
-- 3. PROMOCIONES
-- ============================================================
create table public.promotions (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text,
  percentage    numeric(5,2) not null check (percentage > 0 and percentage <= 100),
  start_date    date not null,
  end_date      date not null,
  active        boolean not null default true,
  image         text,                        -- banner opcional de la promoción
  created_at    timestamptz not null default now(),
  constraint valid_date_range check (end_date >= start_date)
);

-- Relación N:M — una promoción puede aplicar a varios productos
create table public.promotion_products (
  promotion_id uuid not null references public.promotions(id) on delete cascade,
  product_id   uuid not null references public.products(id) on delete cascade,
  primary key (promotion_id, product_id)
);

-- ============================================================
-- 4. CONFIGURACIÓN DEL NEGOCIO (tabla singleton)
-- ============================================================
create table public.business_settings (
  id          int primary key default 1 check (id = 1),  -- fuerza una sola fila
  name        text not null default 'Mundo Real',
  logo        text,
  phone       text,
  whatsapp    text,                          -- formato: 51999999999 (sin +)
  address     text,
  schedule    text,
  facebook    text,
  instagram   text,
  tiktok      text,
  email       text,
  hero_banner text,                          -- URL del banner principal (editable desde admin)
  hero_title  text,
  hero_subtitle text,
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 5. TRIGGER updated_at automático
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

create trigger settings_updated_at
  before update on public.business_settings
  for each row execute function public.handle_updated_at();

-- ============================================================
-- 6. ROW LEVEL SECURITY
-- Visitantes: solo lectura de contenido activo.
-- Admin (usuario autenticado): control total.
-- ============================================================
alter table public.categories         enable row level security;
alter table public.products           enable row level security;
alter table public.promotions         enable row level security;
alter table public.promotion_products enable row level security;
alter table public.business_settings  enable row level security;

-- Lectura pública
create policy "public_read_categories" on public.categories
  for select using (true);

create policy "public_read_active_products" on public.products
  for select using (active = true);

create policy "public_read_active_promotions" on public.promotions
  for select using (active = true and current_date between start_date and end_date);

create policy "public_read_promotion_products" on public.promotion_products
  for select using (true);

create policy "public_read_settings" on public.business_settings
  for select using (true);

-- Escritura y lectura total solo para admin autenticado
create policy "admin_all_categories" on public.categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin_all_products" on public.products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin_all_promotions" on public.promotions
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin_all_promotion_products" on public.promotion_products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin_all_settings" on public.business_settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- 7. STORAGE - Bucket de imágenes
-- ============================================================
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

create policy "public_read_product_images" on storage.objects
  for select using (bucket_id = 'products');

create policy "admin_upload_product_images" on storage.objects
  for insert with check (bucket_id = 'products' and auth.role() = 'authenticated');

create policy "admin_update_product_images" on storage.objects
  for update using (bucket_id = 'products' and auth.role() = 'authenticated');

create policy "admin_delete_product_images" on storage.objects
  for delete using (bucket_id = 'products' and auth.role() = 'authenticated');

-- ============================================================
-- 8. DATOS INICIALES
-- ============================================================
insert into public.business_settings (id, name, address)
values (1, 'Mundo Real', 'Tarapoto, Perú')
on conflict (id) do nothing;

insert into public.categories (name, slug, icon, color, sort_order) values
  ('Arte y Pintura',        'arte-y-pintura',        'palette',        '#ef4444', 1),
  ('Manualidades',          'manualidades',          'scissors',       '#f97316', 2),
  ('Telas y Pasamanería',   'telas-y-pasamaneria',   'shirt',          '#ec4899', 3),
  ('Papeles y Cartulinas',  'papeles-y-cartulinas',  'file-text',      '#eab308', 4),
  ('Foami',                 'foami',                 'layers',         '#22c55e', 5),
  ('Maquetas',              'maquetas',              'box',            '#06b6d4', 6),
  ('Material Escolar',      'material-escolar',      'graduation-cap', '#3b82f6', 7),
  ('Distintivos Escolares', 'distintivos-escolares', 'award',          '#8b5cf6', 8),
  ('Regalos y Personalizados', 'regalos-y-personalizados', 'gift',    '#d946ef', 9),
  ('Decoraciones',          'decoraciones',          'sparkles',       '#14b8a6', 10)
on conflict (slug) do nothing;
