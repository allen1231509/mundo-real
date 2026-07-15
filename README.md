# Mundo Real

Aplicación web para **Mundo Real**, negocio de materiales de arte, manualidades y útiles escolares en Tarapoto, Perú. Incluye catálogo público con búsqueda y filtros, páginas de producto con promociones, y un panel administrador completo para gestionar productos, categorías, promociones y la configuración del negocio — todo sin tocar código.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript estricto · Tailwind CSS v4 · shadcn/ui (Base UI) · Framer Motion · Supabase (Postgres + Storage + Auth) · Zod

## Desarrollo local

```bash
npm install
cp .env.local.example .env.local   # completar con las credenciales de Supabase
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

Ver `.env.local.example`. Se obtienen en el dashboard de Supabase → **Settings → API**:

| Variable | Dónde se usa |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Cliente y servidor |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente y servidor |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo servidor — nunca exponer al cliente |
| `NEXT_PUBLIC_SITE_URL` | Sitemap, JSON-LD, links de WhatsApp/compartir |

## Base de datos

El esquema vive en archivos SQL en la raíz del proyecto, en orden:

1. `schema_fase1.sql` — tablas, RLS, índices, bucket de Storage, seed de categorías.
2. `schema_fase3_story.sql` — columna `story` en `business_settings`.
3. `schema_fase4_search.sql` — funciones `search_products` y `get_product_brands` (búsqueda full-text + filtros + paginación).

Cada uno se ejecuta una sola vez en **Supabase Dashboard → SQL Editor**. Si en el futuro se agregan más cambios de esquema, seguirán este mismo patrón (`schema_faseN_descripcion.sql`) en vez de modificar los archivos existentes.

## Estructura del proyecto

```
app/
  (public)/          # home, catálogo, producto/[slug]
  (admin)/admin/      # panel administrador (protegido)
  login/
features/            # products, categories, promotions, admin, settings
actions/             # Server Actions (mutaciones)
services/            # queries de acceso a datos (Supabase)
components/          # ui/ (shadcn) y shared/
lib/                 # supabase clients, validaciones Zod, utilidades
```

## Deploy a Vercel

1. **Sube el proyecto a GitHub** (si no lo has hecho):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <URL-de-tu-repo-en-GitHub>
   git push -u origin main
   ```
2. En [vercel.com](https://vercel.com), **Add New → Project** e importa el repositorio.
3. Vercel detecta Next.js automáticamente — no requiere configuración adicional de build.
4. En **Environment Variables**, agrega las 4 variables de `.env.local.example` con tus valores reales de producción. `NEXT_PUBLIC_SITE_URL` debe ser tu dominio final (ej. `https://mundoreal.pe`), no `localhost`.
5. Deploy.
6. **Después del primer deploy**, en Supabase → **Authentication → URL Configuration**, agrega la URL de producción a *Site URL* y *Redirect URLs* para que el login del admin funcione correctamente ahí.
7. Verifica `/sitemap.xml` y `/robots.txt` en producción — deben mostrar tu dominio real, no localhost.

### Actualizaciones futuras

Cada `git push` a la rama conectada dispara un nuevo deploy automático en Vercel. Los cambios hechos desde el panel administrador (productos, precios, configuración) no requieren deploy — se reflejan directamente porque viven en Supabase.
