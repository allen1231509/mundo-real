# PROMPT PARA CLAUDE CODE — Proyecto Mundo Real

Actúa como Senior Full Stack Engineer y Tech Lead con más de 15 años de experiencia construyendo e-commerce, dashboards administrativos y aplicaciones SaaS escalables con Next.js, React, TypeScript y Supabase. Serás el desarrollador principal de este proyecto.

## Instrucciones de ejecución (importante)

- Crea el proyecto Next.js desde cero EN ESTA CARPETA. Ejecuta tú mismo todos los comandos de instalación (`npx create-next-app`, `npx shadcn init`, `npm install`, etc.).
- Al finalizar cada fase, ejecuta `npm run build` y corrige todos los errores de compilación y de TypeScript antes de darla por terminada.
- En esta carpeta existe el archivo `schema_fase1.sql` con el diseño de base de datos YA VALIDADO (tablas: categories, products, promotions, promotion_products, business_settings; con RLS, triggers, índices, bucket de Storage y seed de categorías). Úsalo como fuente de verdad: los types de TypeScript y todas las queries deben coincidir exactamente con ese esquema. NO rediseñes la base de datos.
- Yo ejecutaré manualmente: la creación del proyecto en supabase.com, pegar el SQL en el SQL Editor, crear el usuario admin en Authentication, y llenar el `.env.local`. Cuando necesites las credenciales de Supabase, crea un `.env.local.example` con las variables requeridas, avísame y espera a que te confirme antes de continuar con código que dependa de ellas.
- Trabaja fase por fase. Al terminar cada fase: explica brevemente lo realizado, muestra la estructura de archivos creados y ESPERA MI APROBACIÓN antes de continuar.

## Proyecto

Página web para el negocio de mi mamá: **Mundo Real**, negocio físico en Tarapoto, Perú. Vende materiales de arte, pintura, manualidades, telas, foami, papeles, cartulinas, pasamanería, maquetas, materiales escolares, material para exposiciones y proyectos, acrílicos, témperas, pinceles, regalos personalizados, distintivos escolares, cordones, boinas, guantes y decoraciones.

Contexto clave: aún NO tengo fotografías ni inventario completo. Todo se irá agregando poco a poco desde el panel administrador. La aplicación debe estar preparada para crecer durante años sin rehacerse.

## Objetivo

- NO es una landing page: es una aplicación web profesional.
- Debe poder convertirse en tienda online completa en el futuro.
- Arquitectura limpia, escalable y mantenible, nivel de un equipo senior.

## Stack obligatorio

Next.js 15 (App Router), React, TypeScript estricto, Tailwind CSS, shadcn/ui, Framer Motion, Lucide Icons, Supabase (PostgreSQL + Storage + Auth), Zod para validaciones. Deploy en Vercel. No usar Firebase ni MongoDB: todo el backend depende de Supabase.

## Arquitectura

Feature-based, con esta estructura:

```
app/
  (public)/          # home, catalogo, producto/[slug], promociones, contacto
  (admin)/admin/     # dashboard protegido
  login/
  sitemap.ts
  robots.ts
features/            # products, categories, promotions, admin, settings
actions/             # Server Actions (todas las mutaciones)
components/
  ui/                # shadcn
  shared/            # Navbar, Footer, WhatsAppButton, etc.
lib/
  supabase/          # clients: server, browser, middleware
  validations/       # esquemas Zod
hooks/
types/
services/            # queries de acceso a datos
middleware.ts        # protección de /admin
```

Principios: SOLID donde aplique, componentes pequeños y reutilizables, separación de responsabilidades, cero código duplicado, cero datos quemados en el código (toda la información viene de Supabase). Server Components por defecto; `"use client"` solo en componentes interactivos. Server Actions para todas las mutaciones, con validación Zod en cliente y servidor.

## Panel Administrador (módulo más importante)

Dashboard moderno protegido con Supabase Auth que permita, todo mediante interfaz gráfica y nunca tocando código:

- CRUD completo de productos: crear, editar, eliminar, subir múltiples imágenes a Supabase Storage, cambiar precios, modificar stock, activar/desactivar, marcar destacados.
- CRUD de categorías (nombre, icono Lucide, color, orden).
- CRUD de promociones con porcentaje, rango de fechas y asignación de productos (tabla promotion_products).
- Edición de la configuración del negocio (business_settings): nombre, logo, teléfono, WhatsApp, dirección, horario, redes sociales, correo, banner principal del hero.

## Catálogo público

- Productos obtenidos desde Supabase con Server Components.
- Buscador full-text en español (usar el índice tsvector ya creado en el esquema).
- Filtros por categoría, marca y rango de precio.
- Ordenar por precio, nombre y novedades.
- Paginación con carga progresiva.

## Página de producto

Galería con zoom, descripción, precio (con descuento tachado si tiene promoción activa), stock, productos relacionados de la misma categoría, botón "Comprar por WhatsApp" y compartir producto.

## Página principal

Hero editable desde admin, grid de categorías con sus colores e iconos, productos destacados, promociones activas, sección de beneficios, historia del negocio, ubicación con mapa embebido de Google Maps, redes sociales y footer moderno.

## WhatsApp

Toda la aplicación incentiva el contacto por WhatsApp (número tomado de business_settings):
- Botón flotante global.
- Botón en cada producto que abre WhatsApp con mensaje pre-armado incluyendo el nombre del producto y su URL.
- Botones en contacto y promociones.

## SEO

Metadatos dinámicos por página y por producto, Open Graph, Twitter Cards, robots.ts, sitemap.ts dinámico desde la base de datos, JSON-LD (LocalBusiness para el negocio y Product para cada producto), URLs amigables por slug.

## Diseño

Moderno, inspirado en Apple / Vercel / Stripe pero con colores alegres relacionados a materiales escolares y arte. Mucho blanco, tarjetas elegantes, sombras suaves, animaciones sutiles con Framer Motion, excelente UX, totalmente responsive, modo oscuro con next-themes.

## Rendimiento

Server Components, Server Actions, lazy loading, next/image para optimización de imágenes, Suspense con skeletons, excelente puntuación Lighthouse.

## Seguridad

Respetar el RLS ya definido en el esquema (lectura pública solo de contenido activo, escritura solo autenticado). Middleware que protege todas las rutas /admin. Validaciones Zod en cliente y servidor. Nunca exponer la service_role key en el cliente.

## Escalabilidad futura

La arquitectura debe permitir agregar después, sin modificar lo existente: carrito de compras, pasarela de pagos (Yape, Plin, Visa, Mastercard), pedidos, favoritos, clientes, facturación, inventario, dashboard de ventas, reportes y analytics.

## Calidad de código

TypeScript estricto, variables bien nombradas, sin código repetido, comentarios solo donde aporten valor, estructura limpia, buenas prácticas de nivel empresarial.

## Fases de desarrollo

- **Fase 1 — Setup:** crear proyecto Next.js, instalar dependencias, configurar shadcn/ui, Tailwind, estructura de carpetas, types generados a partir de schema_fase1.sql, .env.local.example.
- **Fase 2 — Supabase:** clients (server/browser/middleware), autenticación, página de login, middleware de protección de /admin, helpers de Storage.
- **Fase 3 — Página principal:** layout público, navbar, footer, hero, categorías, destacados, promociones, beneficios, historia, mapa, botón flotante de WhatsApp.
- **Fase 4 — Catálogo:** listado, buscador, filtros, ordenamiento, paginación, página de producto completa.
- **Fase 5 — Dashboard admin:** layout del admin, CRUD de productos con subida múltiple de imágenes, CRUD de categorías, CRUD de promociones, configuración del negocio.
- **Fase 6 — SEO:** metadatos dinámicos, Open Graph, JSON-LD, sitemap, robots.
- **Fase 7 — Optimización:** rendimiento, accesibilidad, estados de carga, manejo de errores, revisión Lighthouse.
- **Fase 8 — Deploy:** preparación para Vercel, verificación final de build, instrucciones de deploy paso a paso.

## Mentalidad

Quiero que este proyecto siga una arquitectura profesional inspirada en aplicaciones SaaS modernas. No busques únicamente que funcione, sino que sea mantenible, escalable y fácil de extender. Si durante el desarrollo identificas una mejor práctica, una mejora de arquitectura o una funcionalidad que normalmente tendría una aplicación profesional de este tipo, impleméntala y explícame por qué la elegiste. Actúa como un Tech Lead y toma decisiones pensando en el largo plazo, no solo en completar la tarea.
