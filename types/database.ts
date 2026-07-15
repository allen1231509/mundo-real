/**
 * Tipos generados manualmente a partir de `schema_fase1.sql`.
 * Fuente de verdad: schema_fase1.sql. Si el esquema cambia, regenerar
 * idealmente con `supabase gen types typescript` una vez el proyecto
 * de Supabase exista, manteniendo la misma forma (Database -> public -> Tables).
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          color: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string | null;
          color?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon?: string | null;
          color?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          category_id: string | null;
          price: number;
          stock: number;
          brand: string | null;
          main_image: string | null;
          images: string[];
          featured: boolean;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          category_id?: string | null;
          price?: number;
          stock?: number;
          brand?: string | null;
          main_image?: string | null;
          images?: string[];
          featured?: boolean;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          category_id?: string | null;
          price?: number;
          stock?: number;
          brand?: string | null;
          main_image?: string | null;
          images?: string[];
          featured?: boolean;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      promotions: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          percentage: number;
          start_date: string;
          end_date: string;
          active: boolean;
          image: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          percentage: number;
          start_date: string;
          end_date: string;
          active?: boolean;
          image?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          percentage?: number;
          start_date?: string;
          end_date?: string;
          active?: boolean;
          image?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      promotion_products: {
        Row: {
          promotion_id: string;
          product_id: string;
        };
        Insert: {
          promotion_id: string;
          product_id: string;
        };
        Update: {
          promotion_id?: string;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_products_promotion_id_fkey";
            columns: ["promotion_id"];
            referencedRelation: "promotions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotion_products_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      business_settings: {
        Row: {
          id: number;
          name: string;
          logo: string | null;
          phone: string | null;
          whatsapp: string | null;
          address: string | null;
          schedule: string | null;
          facebook: string | null;
          instagram: string | null;
          tiktok: string | null;
          email: string | null;
          hero_banner: string | null;
          hero_title: string | null;
          hero_subtitle: string | null;
          story: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name?: string;
          logo?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          address?: string | null;
          schedule?: string | null;
          facebook?: string | null;
          instagram?: string | null;
          tiktok?: string | null;
          email?: string | null;
          hero_banner?: string | null;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          story?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          logo?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          address?: string | null;
          schedule?: string | null;
          facebook?: string | null;
          instagram?: string | null;
          tiktok?: string | null;
          email?: string | null;
          hero_banner?: string | null;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          story?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      search_products: {
        Args: {
          search_query?: string | null;
          category_slug?: string | null;
          brand_filter?: string | null;
          min_price?: number | null;
          max_price?: number | null;
          sort_by?: string | null;
          page_limit?: number | null;
          page_offset?: number | null;
        };
        Returns: Database["public"]["Tables"]["products"]["Row"][];
      };
      get_product_brands: {
        Args: Record<string, never>;
        Returns: { brand: string | null }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
