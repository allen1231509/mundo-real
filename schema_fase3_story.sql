-- ============================================================
-- MUNDO REAL - Migración (Fase 3): historia del negocio editable
-- Ejecutar en: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

alter table public.business_settings
  add column if not exists story text;
