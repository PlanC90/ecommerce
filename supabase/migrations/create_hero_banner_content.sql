/*
  # Create hero_banner_content table

  1. New Tables
    - `hero_banner_content`
      - `id` (uuid, primary key)
      - `title_tr` (text)
      - `title_en` (text)
      - `subtitle_tr` (text)
      - `subtitle_en` (text)
      - `button_text_tr` (text)
      - `button_text_en` (text)
      - `image_url` (text)

  2. Security
    - Enable RLS on `hero_banner_content` table
    - Add policy for authenticated users to read and update the content
*/

CREATE TABLE IF NOT EXISTS hero_banner_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_tr text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  subtitle_tr text NOT NULL DEFAULT '',
  subtitle_en text NOT NULL DEFAULT '',
  button_text_tr text NOT NULL DEFAULT '',
  button_text_en text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hero_banner_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read hero banner content"
  ON hero_banner_content
  FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Authenticated users can update hero banner content"
  ON hero_banner_content
  FOR UPDATE
  TO authenticated
  WITH CHECK (TRUE);

-- Insert a default record if one doesn't exist
INSERT INTO hero_banner_content (id, title_tr, title_en, subtitle_tr, subtitle_en, button_text_tr, button_text_en, image_url)
SELECT gen_random_uuid(), 'Varsayılan Başlık TR', 'Default Title EN', 'Varsayılan Alt Başlık TR', 'Default Subtitle EN', 'Varsayılan Buton Metni TR', 'Default Button Text EN', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE NOT EXISTS (SELECT 1 FROM hero_banner_content);