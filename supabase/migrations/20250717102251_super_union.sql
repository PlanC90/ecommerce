/*
  # Create orders table

  1. New Tables
    - `orders`
      - `id` (text, primary key) - Order ID
      - `user_wallet` (text) - Customer wallet address
      - `items` (jsonb) - Order items array
      - `shipping_address` (jsonb) - Shipping address object
      - `subtotal` (numeric) - Subtotal amount
      - `shipping_cost` (numeric) - Shipping cost
      - `total` (numeric) - Total amount
      - `status` (text) - Order status with constraints
      - `created_at` (timestamptz) - Creation timestamp
      - `tracking_number` (text, optional) - Tracking number

  2. Security
    - Enable RLS on `orders` table
    - Add policy for public read access to orders
    - Add policy for authenticated users to insert orders
    - Add policy for authenticated users to update orders
*/

CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    user_wallet TEXT NOT NULL,
    items JSONB NOT NULL,
    shipping_address JSONB NOT NULL,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    shipping_cost NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    tracking_number TEXT
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to orders"
  ON public.orders
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert orders"
  ON public.orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update orders"
  ON public.orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);