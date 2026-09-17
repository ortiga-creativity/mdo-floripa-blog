import { posts as newPosts } from './posts-data.mjs';
import { readFileSync, writeFileSync } from 'fs';

function esc(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

const oldPosts = JSON.parse(readFileSync(new URL('./old-posts.json', import.meta.url)));

const schema = `
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  category text NOT NULL DEFAULT 'Construcao',
  image_url text,
  author text DEFAULT 'Equipe MDO Floripa',
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
`;

const oldRows = oldPosts.map((p) => {
  return `(${esc(p.title)}, ${esc(p.slug)}, ${esc(p.excerpt)}, ${esc(p.content)}, ${esc(p.category)}, ${esc(p.image_url)}, ${esc(p.author)}, ${p.published}, ${p.featured})`;
}).join(',\n');

const newRows = newPosts.map((p) => {
  return `(${esc(p.title)}, ${esc(p.slug)}, ${esc(p.excerpt)}, ${esc(p.content.trim())}, ${esc(p.category)}, ${esc(p.image_url)}, ${esc(p.author)}, true, false)`;
}).join(',\n');

const sql = `-- Migração completa do blog MDO Floripa para um novo projeto Supabase
-- Rode no SQL Editor do NOVO projeto (Dashboard -> SQL Editor -> New query -> RUN)

-- 1. Criação das tabelas e permissões
${schema}

-- 2. Os 6 artigos que já existiam no blog
insert into blog_posts (title, slug, excerpt, content, category, image_url, author, published, featured)
values
${oldRows}
on conflict (slug) do nothing;

-- 3. Os 15 artigos novos
insert into blog_posts (title, slug, excerpt, content, category, image_url, author, published, featured)
values
${newRows}
on conflict (slug) do nothing;
`;

writeFileSync(new URL('./migrate-full.sql', import.meta.url), sql, 'utf-8');
console.log(`Gerado migrate-full.sql com ${oldPosts.length} posts antigos + ${newPosts.length} posts novos = ${oldPosts.length + newPosts.length} artigos.`);
