import { posts as newPosts } from './posts-data.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const oldPosts = JSON.parse(readFileSync(new URL('./old-posts.json', import.meta.url)));

const outDir = new URL('../src/content/blog/', import.meta.url);
mkdirSync(outDir, { recursive: true });

function toMarkdown(p) {
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(p.title)}`,
    `excerpt: ${JSON.stringify(p.excerpt)}`,
    `category: ${JSON.stringify(p.category)}`,
    `image: ${JSON.stringify(p.image_url)}`,
    `author: ${JSON.stringify(p.author)}`,
    `published: ${p.published}`,
    `featured: ${p.featured}`,
    `pubDate: ${JSON.stringify((p.created_at || new Date().toISOString()).slice(0, 10))}`,
    '---',
    '',
  ].join('\n');
  return frontmatter + (p.content || '').trim() + '\n';
}

let count = 0;
for (const p of oldPosts) {
  writeFileSync(new URL(`./${p.slug}.md`, outDir), toMarkdown(p), 'utf-8');
  count++;
}
for (const p of newPosts) {
  writeFileSync(new URL(`./${p.slug}.md`, outDir), toMarkdown({
    ...p,
    content: p.content.trim(),
    published: true,
    featured: false,
    created_at: new Date().toISOString(),
  }), 'utf-8');
  count++;
}

console.log(`Migrados ${count} artigos para src/content/blog/`);
