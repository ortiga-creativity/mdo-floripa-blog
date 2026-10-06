import { getCollection, type CollectionEntry } from 'astro:content';

// Data de hoje no fuso de Brasília (YYYY-MM-DD). Artigos com pubDate futura ficam
// ocultos até o primeiro build feito nessa data, o que permite agendar publicações.
function todayInBrazil(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

export async function getPublishedPosts(
  extra?: (post: CollectionEntry<'blog'>) => boolean,
): Promise<CollectionEntry<'blog'>[]> {
  const today = todayInBrazil();
  return getCollection('blog', (post) => {
    if (!post.data.published) return false;
    if (post.data.pubDate.toISOString().slice(0, 10) > today) return false;
    return extra ? extra(post) : true;
  });
}
