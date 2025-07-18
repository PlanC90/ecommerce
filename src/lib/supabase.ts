import { createClient } from '@supabase/supabase-js';
import { Database } from '../types'; // Assuming Database type is defined in types/index.ts

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your .env file or environment variables.');
  // In a production app, you might want to throw an error or handle this more robustly.
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type { Database };
