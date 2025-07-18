import { Database as DB } from '../../supabase/types/database.types';

export type Database = DB;

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AdminSettings {
  id?: string;
  shipping_cost: number;
  free_shipping_threshold: number;
  updated_at?: string;
}

export interface HeroBannerContent {
  id?: string;
  title_tr: string;
  title_en: string;
  subtitle_tr: string;
  subtitle_en: string;
  button_text_tr: string;
  button_text_en: string;
  image_url: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  walletAddress: string;
  createdAt: Date;
  trackingNumber?: string;
}

export interface ShippingAddress {
  fullName: string;
  email?: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Translations {
  [key: string]: {
    tr: string;
    en: string;
  };
}

export type Language = 'tr' | 'en';
