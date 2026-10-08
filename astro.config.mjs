// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// O site publica as páginas com barra final (/blog/slug/). Links internos sem a barra
// (/blog/slug) causam redirecionamento 307 e aparecem no Search Console como
// "Página com redirecionamento". Este plugin corrige todo link interno dos artigos,
// inclusive os escritos no CMS.
function rehypeInternalTrailingSlash() {
  /** @param {any} node */
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string') {
      const href = node.properties.href;
      const isInternal = href.startsWith('/') && !href.startsWith('//');
      if (isInternal) {
        const match = href.match(/^([^?#]*)(.*)$/);
        const path = match?.[1] ?? href;
        const rest = match?.[2] ?? '';
        const hasExtension = /\.[a-z0-9]+$/i.test(path);
        if (!path.endsWith('/') && !hasExtension) node.properties.href = `${path}/${rest}`;
      }
    }
    if (node.type === 'raw' && typeof node.value === 'string') {
      node.value = node.value.replace(/href="(\/[^"#?]*[^/"#?.][^"#?.]*?)([?#][^"]*)?"/g, (m, path, rest = '') =>
        path.startsWith('//') || /\.[a-z0-9]+$/i.test(path) || path.endsWith('/') ? m : `href="${path}/${rest}"`,
      );
    }
    if (node.children) node.children.forEach(walk);
  };
  return (/** @type {any} */ tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://locacaoequipamentos.blog.br',
  integrations: [react(), sitemap()],
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeInternalTrailingSlash],
  },
});
