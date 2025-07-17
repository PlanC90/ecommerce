/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (serial, primary key) - Product ID
      - `name` (text) - Product name
      - `price` (numeric) - Product price
      - `image` (text) - Product image URL
      - `category` (text) - Product category
      - `description` (text) - Product description
      - `stock` (integer) - Stock quantity
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access to products
    - Add policy for authenticated users to manage products
*/

CREATE TABLE IF NOT EXISTS public.products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    price NUMERIC NOT NULL DEFAULT 0,
    image TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'skincare' CHECK (category IN ('skincare', 'makeup', 'fragrance')),
    description TEXT NOT NULL DEFAULT '',
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products"
  ON public.products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);