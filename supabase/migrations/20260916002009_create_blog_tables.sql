/*
# Create blog tables for equipment rental company blog

1. New Tables
- `blog_posts`: Stores blog articles with title, content, category, and metadata.
  - id (uuid, primary key)
  - title (text, not null)
  - slug (text, unique, not null)
  - excerpt (text, short summary)
  - content (text, full article body in HTML)
  - category (text, one of: Construcao, Pintura, Manutencao de Equipamentos, Limpeza)
  - image_url (text, cover image URL)
  - author (text, default 'Equipe Locar')
  - published (boolean, default true)
  - featured (boolean, default false)
  - created_at (timestamptz)
  - updated_at (timestamptz)

- `contact_messages`: Stores messages from the "Fale Conosco" contact form.
  - id (uuid, primary key)
  - name (text, not null)
  - email (text, not null)
  - phone (text)
  - subject (text, not null)
  - message (text, not null)
  - created_at (timestamptz)

2. Security
- Enable RLS on both tables.
- blog_posts: public read (anon + authenticated), no public write (admin manages content).
- contact_messages: public insert (anyone can submit), no public read (admin reads messages).
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  category text NOT NULL DEFAULT 'Construcao',
  image_url text,
  author text DEFAULT 'Equipe Locar',
  published boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_blog_posts" ON blog_posts;
CREATE POLICY "anon_select_blog_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
