// Páginas-hub por equipamento: reúnem os guias do blog, a calculadora (quando há) e o contato.
// Os números das dicas vêm dos próprios artigos; os guias ausentes (ainda não publicados) são ignorados.

export interface Hub {
  slug: string;
  nome: string; // "gerador"
  titulo: string; // <title> (sem o sufixo do site)
  h1: string;
  descricao: string;
  intro: string[];
  dicas: string[];
  artigos: string[]; // ids dos artigos (nome do arquivo sem .md)
  ferramentas: { href: string; titulo: string; texto: string }[];
}

export const HUBS: Hub[] = [
  {
    slug: 'aluguel-de-gerador-florianopolis',
    nome: 'gerador',
    titulo: 'Aluguel de gerador em Florianópolis: guias e calculadora',
    h1: 'Aluguel de gerador em Florianópolis',
    descricao: 'Como escolher o gerador para obra, evento ou queda de energia: potência, gasolina, diesel ou inversor, o que um gerador de 5 kVA liga e calculadora de potência.',
    intro: [
      'O gerador resolve obra sem rede elétrica, queda de energia e eventos. Quase todo erro de escolha vem da potência: é preciso somar o que vai funcionar ao mesmo tempo e considerar o pico de partida dos motores.',
      'Reunimos aqui os guias do blog e a calculadora de potência. Com a lista do que vai ligar em mãos, a equipe da MDO Floripa ajuda a definir o modelo certo.',
    ],
    dicas: [
      'A potência real em kW é aproximadamente os kVA multiplicados por 0,8: um gerador de 5 kVA entrega cerca de 4 kW.',
      'Motores e compressores têm pico de partida de 2 a 3 vezes a potência nominal, e o gerador precisa suportá-lo.',
      'Nunca use gerador em ambiente fechado, pelo risco de intoxicação por monóxido de carbono.',
      'Para ligar na instalação da casa, só com chave de transferência instalada por eletricista.',
    ],
    artigos: [
      'gerador-de-energia-como-escolher-o-ideal',
      'gerador-5-kva-o-que-liga-tabela-de-consumo',
      'gerador-a-gasolina-diesel-ou-inversor-qual-escolher',
      'betoneira-400-litros-quanto-concreto-produz-por-dia',
      'barulho-de-obra-em-florianopolis-horarios-e-multa',
    ],
    ferramentas: [
      { href: '/ferramentas/calculadora-de-gerador/', titulo: 'Calculadora de Gerador', texto: 'Potência em kW e kVA com o pico de partida dos motores.' },
    ],
  },
  {
    slug: 'aluguel-de-betoneira-florianopolis',
    nome: 'betoneira',
    titulo: 'Aluguel de betoneira em Florianópolis: 200 ou 400 L',
    h1: 'Aluguel de betoneira em Florianópolis',
    descricao: 'Betoneira de 200 ou 400 litros: quanto concreto produz, traço, sacos de cimento por m³, manutenção e calculadora de concreto.',
    intro: [
      'A capacidade da betoneira define o ritmo da obra. A escolha começa pelo volume de concreto ou argamassa que você precisa produzir por dia, e depois pelo espaço de trabalho e pela energia disponível.',
      'Aqui estão os guias de dimensionamento, o traço e a calculadora de concreto. A MDO Floripa tem betoneiras de 200 e 400 litros para locação.',
    ],
    dicas: [
      'Abaixo de 1 m³ de concreto ou argamassa por dia, a betoneira de 200 L (120 a 140 L por batida) atende.',
      'Acima disso, em laje ou fundação, a de 400 L (250 a 280 L por batida) compensa pela produtividade.',
      'O motor da betoneira de 400 L consome cerca de 1.500 W, com pico de partida de aproximadamente o dobro: planeje o gerador.',
      'Lave o tambor após cada uso: concreto endurecido desbalanceia o tambor e força o motor.',
    ],
    artigos: [
      'betoneira-200-ou-400-litros-qual-escolher',
      'betoneira-400-litros-quanto-concreto-produz-por-dia',
      'traco-de-concreto-cimento-areia-brita-sacos-por-m3',
      'como-calcular-concreto-para-laje-piso-e-viga',
      'manutencao-preventiva-de-betoneiras',
    ],
    ferramentas: [
      { href: '/ferramentas/calculadora-de-concreto/', titulo: 'Calculadora de Concreto', texto: 'Volume, sacos de cimento, areia, brita e betonadas.' },
    ],
  },
  {
    slug: 'aluguel-de-martelete-florianopolis',
    nome: 'martelete',
    titulo: 'Aluguel de martelete rompedor em Florianópolis: guias',
    h1: 'Aluguel de martelete e rompedor em Florianópolis',
    descricao: 'Como escolher martelete ou rompedor para quebrar piso, contrapiso e concreto: potência em joules, ponteiras, manutenção e cuidados de segurança.',
    intro: [
      'Para demolição, o martelete rompedor trabalha com impacto puro e é muito mais eficiente que a furadeira de impacto. A escolha depende do material a quebrar e da espessura.',
      'Veja a diferença entre martelete perfurador, rompedor e furadeira, os tipos de ponteira e os cuidados que evitam quebra e acidente. A MDO Floripa aluga marteletes de diferentes potências.',
    ],
    dicas: [
      'Para piso e contrapiso residencial, equipamentos de 10 a 20 joules resolvem; para concreto armado, modelos acima de 25 joules.',
      'Confirme o encaixe da ponteira antes de alugar: os mais comuns são SDS-Max e Hex 28 mm.',
      'Use óculos, protetor auricular e luvas antivibração, e faça pausas para evitar lesão por vibração.',
      'Verifique fiação e tubulação embutida na área antes de começar a quebrar.',
    ],
    artigos: [
      'martelete-rompedor-guia-completo',
      'martelete-perfurador-x-rompedor-x-furadeira-de-impacto',
      'tipos-de-ponteira-para-martelete',
      'como-quebrar-piso-e-contrapiso-sem-rachar-a-laje',
      'manutencao-de-martelete-como-evitar-quebra',
      'troca-de-carvao-furadeira-esmerilhadeira-quando-fazer',
    ],
    ferramentas: [],
  },
  {
    slug: 'aluguel-de-andaime-florianopolis',
    nome: 'andaime',
    titulo: 'Aluguel de andaime em Florianópolis: guias e calculadora',
    h1: 'Aluguel de andaime em Florianópolis',
    descricao: 'Como escolher andaime tubular, fachadeiro ou móvel, quando precisa de projeto (NR-18), checklist de inspeção, EPIs e calculadora de peças.',
    intro: [
      'O andaime certo economiza tempo e reduz risco. Existem modelos para fachada, para obra grande e para serviço interno de curta duração, e a escolha errada pode atrasar o cronograma.',
      'Os guias abaixo cobrem a escolha do modelo, quando é preciso projeto, o checklist antes de subir e os EPIs de trabalho em altura. A calculadora estima as peças da torre.',
    ],
    dicas: [
      'O andaime tubular é o mais versátil; o fachadeiro é fixado à parede e é mais seguro em fachadas; o móvel, com rodízios, serve para serviços internos curtos.',
      'Acima de 2 metros, valem as exigências de trabalho em altura da NR-35 e os EPIs adequados.',
      'Inspecione o andaime antes de subir: use o checklist do blog.',
      'Escora sustenta a laje, mas não serve como plataforma de trabalho: para trabalhar em altura, use andaime.',
    ],
    artigos: [
      'como-escolher-o-andaime-ideal',
      'andaime-precisa-de-engenheiro-projeto-nr-18',
      'checklist-inspecao-andaime-antes-de-subir',
      'quantas-pecas-de-andaime-para-pintar-casa-sobrado',
      'epis-essenciais-trabalho-altura',
      'escora-metalica-quantas-preciso-para-laje',
    ],
    ferramentas: [
      { href: '/ferramentas/calculadora-de-andaime/', titulo: 'Calculadora de Andaime', texto: 'Painéis, diagonais, pisos, guarda-corpo e rodízios da torre.' },
    ],
  },
  {
    slug: 'aluguel-de-lavadora-de-alta-pressao-florianopolis',
    nome: 'lavadora de alta pressão',
    titulo: 'Aluguel de lavadora de alta pressão em Florianópolis',
    h1: 'Aluguel de lavadora de alta pressão em Florianópolis',
    descricao: 'Lavadora de alta pressão: como escolher, PSI para cada superfície, consumo de água, como lavar fachada, piso e telhado e limpeza pós-obra.',
    intro: [
      'A lavadora de alta pressão remove sujeira pesada, mofo e resíduos de obra muito mais rápido que a limpeza manual, mas o mesmo jato pode danificar superfícies sensíveis quando a pressão e a distância não são ajustadas.',
      'Veja como escolher entre pressão e vazão, qual PSI usar em cada superfície, quanto de água a lavadora gasta e como lavar fachada, piso e telhado com segurança.',
    ],
    dicas: [
      'Concreto e pisos externos resistentes suportam acima de 2.000 PSI; fachadas pintadas e cerâmica, 1.200 a 1.800 PSI; madeira e pintura antiga, abaixo de 1.200 PSI.',
      'Comece com o bico a 30 a 40 cm da superfície e teste em uma área pequena.',
      'O consumo de água é a vazão da lavadora vezes o tempo de gatilho acionado.',
      'Telhado exige cuidados de trabalho em altura: nunca suba com chuva, vento forte ou telhado molhado.',
    ],
    artigos: [
      'como-escolher-lavadora-de-alta-pressao',
      'lavadora-de-alta-pressao-psi-para-cada-superficie',
      'lavadora-de-alta-pressao-consumo-de-agua-por-hora',
      'lavadora-de-alta-pressao-como-lavar-fachada-e-piso',
      'lavagem-de-fachada-quando-vale-alugar-lavadora-profissional',
      'como-limpar-telhado-com-seguranca',
      'limpeza-pos-obra-essencial',
      'limpeza-pesada-pos-reforma-equipamentos-que-fazem-diferenca',
    ],
    ferramentas: [],
  },
  {
    slug: 'aluguel-de-equipamentos-para-pintura-florianopolis',
    nome: 'equipamentos para pintura',
    titulo: 'Equipamentos para pintura em Florianópolis: airless e lixadeira',
    h1: 'Aluguel de equipamentos para pintura em Florianópolis',
    descricao: 'Máquina airless e lixadeira de parede para alugar: prazo da pintura, preparação da parede, massa corrida ou acrílica, tipo de tinta e calculadora de tinta.',
    intro: [
      'O prazo e o acabamento da pintura dependem menos da metragem e mais da preparação da parede e dos equipamentos de cada etapa. Lixadeira de parede e máquina airless são os que mais reduzem o tempo.',
      'Reunimos os guias de preparação, escolha de tinta, prazo e quantidade, mais a calculadora de tinta. A MDO Floripa aluga lixadeiras de parede e orbitais e máquinas airless.',
    ],
    dicas: [
      'Uma casa de médio porte leva de 7 a 12 dias úteis com rolo e pincel e de 4 a 6 dias com airless.',
      'A airless cobre parede grande de 3 a 5 vezes mais rápido, mas em cômodo pequeno o preparo da máquina pode superar o ganho.',
      'Massa corrida (PVA) é para ambientes internos e secos; massa acrílica, para áreas externas e úmidas.',
      'A preparação da parede é a etapa que mais causa retrabalho: limpe, corrija, lixe, aplique fundo e teste a umidade.',
    ],
    artigos: [
      'quanto-tempo-leva-para-pintar-uma-casa',
      'airless-para-pintura-vale-a-pena-alugar',
      'lixadeira-de-parede-x-lixadeira-orbital',
      'preparacao-de-parede-para-pintura',
      'massa-corrida-ou-massa-acrilica-qual-usar',
      'tipos-de-tinta-qual-usar',
      'quantos-litros-de-tinta-preciso-calcular-por-m2',
      'erros-comuns-pintura-de-parede',
      'como-tirar-mofo-da-parede-antes-de-pintar',
    ],
    ferramentas: [
      { href: '/ferramentas/calculadora-de-tinta/', titulo: 'Calculadora de Tinta', texto: 'Litros de tinta e latas por ambiente.' },
    ],
  },
];

export function hubsDoArtigo(id: string): Hub[] {
  return HUBS.filter((h) => h.artigos.includes(id));
}
