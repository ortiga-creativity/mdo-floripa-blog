# Pesquisa de pautas – Blog MDO Floripa (out/2026)

> **Limite desta pesquisa:** não tenho acesso ao GA4 nem ao Search Console, e a busca web que uso não retorna volume de busca nem "Pessoas também perguntam". As pautas abaixo são **hipóteses fundamentadas** (intenção de busca típica do nicho + lacunas do blog atual). Devem ser validadas com os dados da seção 5 antes de escalar.

## 1. Diagnóstico do blog hoje

- 31 artigos, ~500–600 palavras na maioria (concorrentes que ranqueiam, como Sienge e Engenharia 360, têm textos bem mais longos).
- Já tem schema `Article` + `FAQPage`, sitemap e canonical. Boa base.
- Falta: `llms.txt`, schema `Organization/LocalBusiness`, `dateModified`, links internos entre artigos e **foco local** (Florianópolis) em quase tudo.
- Categorias desbalanceadas: só 5 posts de Manutenção e nenhum sobre **elétrica/energia, alvenaria, reboco, contrapiso, demolição, jardinagem, escoramento, contrato e preço de locação**.
- 5–15 views/dia é típico de site novo com artigos curtos: o problema principal é **autoridade + profundidade + distribuição**, não só tema.

## 2. Estratégia: ser fonte para IAs (ChatGPT, Gemini, Perplexity, AI Overviews)

IAs tendem a citar páginas que: (a) respondem a pergunta **na primeira frase**, (b) trazem **números concretos e tabelas**, (c) têm FAQ estruturado, (d) são atuais e datadas, (e) vêm de uma entidade clara (empresa real, endereço, autor).

Formato padrão para cada novo artigo:
1. "Resposta rápida" em 2–3 linhas no topo.
2. Tabela de referência (consumo por m², potência por ferramenta, faixa de diária).
3. Passo a passo numerado.
4. 5–8 perguntas no FAQ, escritas como as pessoas perguntam a uma IA ("Quantos kVA preciso para...?").
5. Seção "Erros comuns" e "Quando alugar vale a pena".
6. 3+ links internos e CTA para calculadora/WhatsApp.
7. `dateModified` atualizado a cada revisão.

## 3. Pautas priorizadas

### Prioridade A – dúvidas numéricas/de cálculo (alto potencial de citação; já temos calculadoras)
| # | Título sugerido | Pergunta-alvo |
|---|---|---|
| 1 | Quantos m³ de concreto uma betoneira de 400L produz por dia? | rendimento de betoneira |
| 2 | Quanto cimento, areia e brita para 1 m³ de concreto (traços) | traço de concreto |
| 3 | Quantos kVA precisa um gerador para ar-condicionado, geladeira e bomba d'água? | gerador para casa/queda de energia |
| 4 | Gerador de 5 kVA liga o quê? Tabela de consumo de aparelhos | gerador 5 kVA |
| 5 | Quantos sacos de argamassa por m² (AC1, AC2, AC3) | consumo de argamassa |
| 6 | Quantos tijolos por m² de parede | tijolos por m² |
| 7 | Quanto de reboco/chapisco/emboço por m² | massa para reboco |
| 8 | Quantos andaimes preciso para fachada de X m² | andaime por altura |
| 9 | Quantos litros de água por hora gasta uma lavadora de alta pressão | consumo da lavadora |
| 10 | Quanto custa alugar betoneira/andaime/martelete/gerador por dia (faixas) | preço de aluguel |

### Prioridade B – comparativos "X ou Y" (intenção de decisão, convertem em orçamento)
- Martelete perfurador x rompedor x furadeira de impacto
- Gerador a gasolina x diesel x inversor (casa e obra)
- Andaime fachadeiro x multidirecional x tubular x cavalete
- Placa vibratória x compactador sapo x rolo compactador
- Serra mármore x serra circular x cortadora de piso
- Lavadora elétrica x a gasolina
- Alugar x contratar mão de obra com equipamento próprio

### Prioridade C – "como fazer" com equipamento
- Como quebrar piso/contrapiso/parede sem rachar a laje
- Como fazer contrapiso passo a passo e ferramentas necessárias
- Como nivelar e compactar solo para garagem/calçada
- Como cortar porcelanato sem quebrar (aprofundar com tabela de discos)
- Como remover pintura velha, textura e massa corrida
- Como lavar fachada com segurança em altura
- Iluminação e energia para obra noturna
- Equipamentos por etapa: reforma de banheiro, cozinha, área gourmet

### Prioridade D – segurança, normas, legal
- NR-35 para quem aluga andaime
- NR-18 em obra pequena e reforma residencial
- Precisa de responsável técnico/ART para montar andaime?
- Horários de barulho de obra em Florianópolis
- Alvará e licença para reforma em Florianópolis
- Descarte de entulho: caçamba, regras e custos locais
- Responsabilidade por dano ao equipamento alugado
- O que o contrato de locação precisa ter

### Prioridade E – SEO local
- Reforma em Florianópolis: equipamentos por etapa
- Obra em terreno de encosta/morro em Floripa
- Umidade e mofo em casas do litoral catarinense
- Maresia: proteção de equipamentos e fachadas
- Aluguel de equipamentos por bairro (só com conteúdo real; evitar páginas-clone)
- Geradores e iluminação para eventos/temporada

### Prioridade F – ferramentas (atraem links e citações)
- Calculadora de concreto, de argamassa/rejunte, de tijolos
- Comparador "alugar x comprar" em R$
- Tabela de consumo de aparelhos para gerador (página própria e citável)

## 4. Ações técnicas para virar fonte de IA

1. `public/llms.txt` com descrição da empresa e páginas-chave.
2. robots.txt: liberar explicitamente GPTBot, ClaudeBot, PerplexityBot, Google-Extended (hoje `User-agent: *` já permite).
3. Schema `LocalBusiness` com dados do `site.json` (nome, endereço, telefone, horários).
4. `dateModified` no schema `Article` e "atualizado em" visível.
5. Bloco "Resposta rápida" nos 10 posts de maior potencial.
6. Linkagem interna: 3+ links por artigo, incluindo calculadoras.
7. Expandir os posts mais curtos (<550 palavras) com tabela e FAQ maior.

## 5. Como validar e medir

- **Search Console** → Desempenho → consultas com posição 8–30 e muitas impressões: vitórias rápidas.
- **GA4** → páginas com mais engajamento e evento `whatsapp_click` (já existe).
- **Google Trends** (Brasil/SC): "aluguel de betoneira", "aluguel de andaime", "aluguel de gerador", "aluguel de martelete".
- **Pessoas também perguntam**: pesquisar cada tema-chave e copiar as perguntas.
- **AnswerThePublic / Ubersuggest / Keyword Planner** para volumes.
- **Perguntas reais de clientes no WhatsApp**: melhor fonte; cada dúvida repetida vira artigo.
- **Fóruns e redes**: Reddit, Quora, grupos de Facebook de reforma, comentários do YouTube.
- **Teste de citação mensal**: 20 perguntas do nicho em ChatGPT/Perplexity/Gemini, anotando se o blog aparece.

**Metas sugeridas (90 dias):** 15 posts principais ampliados; 12 novos artigos das prioridades A/B; 50 views/dia.

## 6. Distribuição

- Google Business Profile da MDO com links para os guias, postagem semanal.
- Vídeos curtos (Reels/Shorts/TikTok) respondendo uma pergunta cada, com link.
- Respostas úteis em grupos e fóruns.
- Links de parceiros (construtoras, arquitetos, lojas de material).
- Broadcast de WhatsApp com o artigo da semana.

## 7. Calendário (6 semanas)

| Semana | Entregas |
|---|---|
| 1 | llms.txt, LocalBusiness, dateModified; reescrever "gerador" e "betoneira" |
| 2 | Pautas A1, A3, A4 (+ tabela de consumo) |
| 3 | A10 (preços), B1, B2 |
| 4 | A2, A5, A6 + calculadora de concreto |
| 5 | Pautas D (NR-35, ruído/alvará, entulho) |
| 6 | Revisão com Search Console e reforço do que ganhou impressão |

## 8. Aviso

Valores de diária, leis municipais e números de norma devem ser conferidos na fonte oficial ou na tabela real da MDO antes de publicar. Não publicar números não verificados.
