/*
  # Ensure hero_banner_content table exists

  1. New Tables (if not exists)
    - `hero_banner_content`
      - `id` (uuid, primary key) - Banner ID
      - `title_tr` (text) - Turkish title
      - `subtitle_tr` (text) - Turkish subtitle
      - `button_text_tr` (text) - Turkish button text
      - `title_en` (text) - English title
      - `subtitle_en` (text) - English subtitle
      - `button_text_en` (text) - English button text
      - `image_url` (text) - Banner image URL
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `hero_banner_content` table
    - Add policy for public read access to hero banner content
    - Add policy for authenticated users to update hero banner content

  3. Initial Data
    - Insert default banner content if table is empty
*/

CREATE TABLE IF NOT EXISTS public.hero_banner_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_tr TEXT NOT NULL DEFAULT '',
    subtitle_tr TEXT NOT NULL DEFAULT '',
    button_text_tr TEXT NOT NULL DEFAULT '',
    title_en TEXT NOT NULL DEFAULT '',
    subtitle_en TEXT NOT NULL DEFAULT '',
    button_text_en TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.hero_banner_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to hero banner content"
  ON public.hero_banner_content
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to update hero banner content"
  ON public.hero_banner_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default banner content if table is empty
INSERT INTO public.hero_banner_content (
    title_tr, subtitle_tr, button_text_tr,
    title_en, subtitle_en, button_text_en,
    image_url
)
SELECT 
    'Doğal Güzelliğinizi Keşfedin', 
    'Premium kalitede kozmetik ürünlerle güzelliğinizi ortaya çıkarın', 
    'Alışverişe Başla',
    'Discover Your Natural Beauty', 
    'Reveal your beauty with premium quality cosmetic products', 
    'Start Shopping',
    'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg'
WHERE NOT EXISTS (SELECT 1 FROM public.hero_banner_content);