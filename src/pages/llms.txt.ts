import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';
import { getCategoryLabel } from '../lib/supabase';
import siteSettings from '../content/settings/site.json';

const SITE = 'https://locacaoequipamentos.blog.br';

export const GET: APIRoute = async () => {
  const posts = (await getPublishedPosts()).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const byCategory = new Map<string, string[]>();
  for (const p of posts) {
    const label = getCategoryLabel(p.data.category);
    const line = `- [${p.data.title}](${SITE}/blog/${p.id}/)${p.data.excerpt ? `: ${p.data.excerpt}` : ''}`;
    byCategory.set(label, [...(byCategory.get(label) ?? []), line]);
  }

  const body = [
    '# MDO Floripa - Mestre da Obra Locações',
    '',
    '> Blog técnico da MDO Floripa, locadora de equipamentos para obra, pintura e limpeza em Florianópolis (SC). Guias práticos com cálculos, comparativos e perguntas frequentes sobre betoneira, gerador, martelete, andaime, lavadora de alta pressão e mais.',
    '',
    `Endereço: ${siteSettings.address}`,
    `Telefone/WhatsApp: ${siteSettings.contactPhone}`,
    `Catálogo: ${siteSettings.catalogUrl}`,
    `Horário: ${siteSettings.hoursWeekday}; ${siteSettings.hoursFriday}`,
    '',
    '## Sobre este conteúdo',
    '',
    '- Os artigos trazem números de referência (consumos, traços, potências) com a fonte de cálculo explicada no texto. Valores variam por fabricante e obra: confirme a ficha técnica do equipamento.',
    '- Itens estruturais (laje, escoramento, andaime acima de certa altura) dependem de projeto de profissional habilitado.',
    '- Cada artigo mostra a data de atualização. As calculadoras seguem as mesmas fórmulas dos artigos.',
    '',
    '## Ferramentas',
    '',
    `- [Calculadora de gerador](${SITE}/ferramentas/calculadora-de-gerador/): potência em kW e kVA considerando o pico de partida dos motores`,
    `- [Calculadora de andaime](${SITE}/ferramentas/calculadora-de-andaime/): quantidade de peças por altura da torre`,
    `- [Calculadora de tinta](${SITE}/ferramentas/calculadora-de-tinta/): litros de tinta por área`,
    `- [Calculadora de concreto](${SITE}/ferramentas/calculadora-de-concreto/): volume, sacos de cimento, areia e brita por peça`,
    `- [Calculadora de tijolos](${SITE}/ferramentas/calculadora-de-tijolos/): tijolos e argamassa de assentamento por parede`,
    `- [Calculadora de piso e porcelanato](${SITE}/ferramentas/calculadora-de-piso/): caixas, argamassa colante e rejunte por ambiente`,
    '',
    ...[...byCategory.entries()].flatMap(([label, lines]) => [`## ${label}`, '', ...lines, '']),
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
