import fs from 'node:fs';
import path from 'node:path';

// Reduz o peso das imagens de capa servidas por Unsplash e Pexels pedindo a largura
// exata necessária. Outras origens passam sem alteração.
export function resizeImage(url: string | undefined, width: number): string | undefined {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (u.hostname.endsWith('unsplash.com')) {
      u.searchParams.set('w', String(width));
      u.searchParams.set('q', '70');
      u.searchParams.set('auto', 'format');
      u.searchParams.delete('fm');
      return u.toString();
    }
    if (u.hostname === 'images.pexels.com') {
      return `${u.origin}${u.pathname}?auto=compress&cs=tinysrgb&w=${width}`;
    }
  } catch {
    // URL relativa ou inválida: mantém como está
  }
  return url;
}

export function srcSet(url: string | undefined, widths: number[]): string | undefined {
  if (!url) return undefined;
  const sets = widths.map((w) => `${resizeImage(url, w)} ${w}w`);
  return sets.join(', ');
}

// Para imagens enviadas ao site (public/images/uploads): se existir uma versão
// "nome.opt.webp" ao lado do original, usa a versão leve. Senão, usa o original.
export function localOptimized(url: string): string {
  if (!url.startsWith('/images/uploads/')) return url;
  const optimized = url.replace(/\.(png|jpe?g)$/i, '.opt.webp');
  if (optimized === url) return url;
  return fs.existsSync(path.join(process.cwd(), 'public', optimized)) ? optimized : url;
}
