import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          name: string;
          price: number;
          image: string;
          category: 'skincare' | 'makeup' | 'fragrance';
          description: string;
          stock: number;
          created_at: string;
        };
        Insert: {
          name: string;
          price: number;
          image: string;
          category: 'skincare' | 'makeup' | 'fragrance';
          description: string;
          stock: number;
        };
        Update: {
          name?: string;
          price?: number;
          image?: string;
          category?: 'skincare' | 'makeup' | 'fragrance';
          description?: string;
          stock?: number;
        };
      };
      orders: {
        Row: {
          id: string;
          user_wallet: string;
          items: any;
          shipping_address: any;
          subtotal: number;
          shipping_cost: number;
          total: number;
          status: 'pending' | 'processing' | 'shipped' | 'delivered';
          created_at: string;
          tracking_number?: string;
        };
        Insert: {
          id: string;
          user_wallet: string;
          items: any;
          shipping_address: any;
          subtotal: number;
          shipping_cost: number;
          total: number;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered';
          tracking_number?: string;
        };
        Update: {
          status?: 'pending' | 'processing' | 'shipped' | 'delivered';
          tracking_number?: string;
        };
      };
      admin_settings: {
        Row: {
          id: string;
          shipping_cost: number;
          free_shipping_threshold: number;
          updated_at: string;
        };
        Insert: {
          shipping_cost: number;
          free_shipping_threshold: number;
        };
        Update: {
          shipping_cost?: number;
          free_shipping_threshold?: number;
        };
      };
      hero_banner_content: {
        Row: {
          id: string;
          title_tr: string;
          subtitle_tr: string;
          button_text_tr: string;
          title_en: string;
          subtitle_en: string;
          button_text_en: string;
          image_url: string;
          updated_at: string;
        };
        Insert: {
          title_tr: string;
          subtitle_tr: string;
          button_text_tr: string;
          title_en: string;
          subtitle_en: string;
          button_text_en: string;
          image_url: string;
        };
        Update: {
          title_tr?: string;
          subtitle_tr?: string;
          button_text_tr?: string;
          title_en?: string;
          subtitle_en?: string;
          button_text_en?: string;
          image_url?: string;
        };
      };
    };
  };
};
