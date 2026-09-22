import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    category: z.enum(['Construcao', 'Pintura', 'Manutencao de Equipamentos', 'Limpeza']),
    image: z.string().optional(),
    author: z.string().default('Equipe MDO Floripa'),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { blog };
