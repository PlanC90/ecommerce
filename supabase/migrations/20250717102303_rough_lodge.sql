/*
  # Ensure admin_settings table exists

  1. New Tables (if not exists)
    - `admin_settings`
      - `id` (uuid, primary key) - Settings ID
      - `shipping_cost` (numeric) - Default shipping cost
      - `free_shipping_threshold` (numeric) - Free shipping threshold
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `admin_settings` table
    - Add policy for public read access to admin settings
    - Add policy for authenticated users to update admin settings

  3. Initial Data
    - Insert default admin settings if table is empty
*/

CREATE TABLE IF NOT EXISTS public.admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipping_cost NUMERIC NOT NULL DEFAULT 25,
    free_shipping_threshold NUMERIC NOT NULL DEFAULT 500,
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to admin settings"
  ON public.admin_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to update admin settings"
  ON public.admin_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default settings if table is empty
INSERT INTO public.admin_settings (shipping_cost, free_shipping_threshold)
SELECT 25, 500
WHERE NOT EXISTS (SELECT 1 FROM public.admin_settings);