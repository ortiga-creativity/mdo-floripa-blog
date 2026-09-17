import { posts } from './posts-data.mjs';
import { writeFileSync } from 'fs';

function esc(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

const rows = posts.map((p) => {
  return `(${esc(p.title)}, ${esc(p.slug)}, ${esc(p.excerpt)}, ${esc(p.content.trim())}, ${esc(p.category)}, ${esc(p.image_url)}, ${esc(p.author)}, true, false)`;
}).join(',\n');

const sql = `-- 15 novos artigos de blog para MDO Floripa
-- Rode este script no Supabase (Dashboard -> SQL Editor -> New query) e clique em RUN.

insert into blog_posts (title, slug, excerpt, content, category, image_url, author, published, featured)
values
${rows}
on conflict (slug) do nothing;
`;

writeFileSync(new URL('./new-posts.sql', import.meta.url), sql, 'utf-8');
console.log(`Gerado new-posts.sql com ${posts.length} artigos.`);
