-- ============================================================
-- MUNDO REAL - Migración (Fase 4): búsqueda, filtros y paginación
-- Ejecutar en: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Búsqueda full-text en español (usa el índice GIN funcional ya creado
-- sobre products: idx_products_name_trgm) + filtros de categoría/marca/
-- precio + orden + paginación, todo en una sola consulta server-side.
create or replace function public.search_products(
  search_query  text default null,
  category_slug text default null,
  brand_filter  text default null,
  min_price     numeric default null,
  max_price     numeric default null,
  sort_by       text default 'newest',
  page_limit    int default 24,
  page_offset   int default 0
)
returns setof public.products
language sql
stable
as $$
  select p.*
  from public.products p
  left join public.categories c on c.id = p.category_id
  where p.active = true
    and (category_slug is null or c.slug = category_slug)
    and (brand_filter is null or p.brand = brand_filter)
    and (min_price is null or p.price >= min_price)
    and (max_price is null or p.price <= max_price)
    and (
      search_query is null or btrim(search_query) = '' or
      to_tsvector('spanish', p.name || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.brand, ''))
        @@ plainto_tsquery('spanish', unaccent(search_query))
    )
  order by
    case when sort_by = 'price_asc' then p.price end asc,
    case when sort_by = 'price_desc' then p.price end desc,
    case when sort_by = 'name_asc' then p.name end asc,
    p.created_at desc
  limit greatest(page_limit, 1)
  offset greatest(page_offset, 0);
$$;

grant execute on function public.search_products to anon, authenticated;

-- Marcas activas distintas, para poblar el filtro de marca del catálogo.
create or replace function public.get_product_brands()
returns table (brand text)
language sql
stable
as $$
  select distinct p.brand
  from public.products p
  where p.active = true and p.brand is not null
  order by p.brand;
$$;

grant execute on function public.get_product_brands to anon, authenticated;
