// Regras de dimensionamento de gerador para obra (mesma lógica do post
// "Gerador de energia: como escolher o ideal"): somar o consumo dos equipamentos
// que rodam juntos e considerar o pico de partida do maior motor.
// Os valores de potência são típicos de mercado. Sempre confira a plaqueta do equipamento.

export interface Equipamento {
  id: string;
  nome: string;
  watts: number; // potência nominal (consumo em regime)
  partida: number; // múltiplo da potência nominal no pico de partida (1 = sem pico relevante)
  padrao?: number; // quantidade inicial na calculadora
}

export const EQUIPAMENTOS: Equipamento[] = [
  { id: 'betoneira400', nome: 'Betoneira 400 L', watts: 1500, partida: 2, padrao: 1 },
  { id: 'betoneira150', nome: 'Betoneira 150 a 200 L', watts: 750, partida: 2 },
  { id: 'furadeira', nome: 'Furadeira de impacto', watts: 800, partida: 1, padrao: 1 },
  { id: 'martelete', nome: 'Martelete / rompedor', watts: 1500, partida: 1 },
  { id: 'esmerilhadeira', nome: 'Esmerilhadeira', watts: 1100, partida: 1, padrao: 1 },
  { id: 'serracircular', nome: 'Serra circular', watts: 1800, partida: 1 },
  { id: 'serramarmore', nome: 'Serra mármore / cortadora de piso', watts: 1300, partida: 1 },
  { id: 'lixadeira', nome: 'Lixadeira de parede', watts: 800, partida: 1 },
  { id: 'lavadora', nome: 'Lavadora de alta pressão', watts: 2000, partida: 2 },
  { id: 'airless', nome: 'Máquina airless elétrica', watts: 1100, partida: 2 },
  { id: 'compressor', nome: 'Compressor de ar', watts: 1500, partida: 3 },
  { id: 'bomba', nome: "Bomba d'água (1/2 cv)", watts: 450, partida: 3 },
  { id: 'vibrador', nome: 'Vibrador de concreto', watts: 1200, partida: 2 },
  { id: 'solda', nome: 'Máquina de solda inversora', watts: 5000, partida: 1 },
  { id: 'luz', nome: 'Refletor de LED (100 W)', watts: 100, partida: 1, padrao: 2 },
];

export const FATOR_POTENCIA = 0.8;
export const MARGEM_CONSUMO = 1.2; // folga sobre o consumo em regime
export const MARGEM_PICO = 1.1; // folga sobre o pico de partida
export const TAMANHOS_KVA = [1, 2, 2.5, 3.5, 5, 6.5, 8, 10, 13, 15, 20, 30, 40, 50, 75, 100, 150];

export interface ItemSelecionado {
  nome: string;
  qtd: number;
  watts: number;
  partida: number;
}

export interface GeradorResultado {
  consumo: number; // W em regime
  pico: number; // W no pior momento de partida
  necessaria: number; // W com margens
  kva: number; // necessária / fator de potência, em kVA
  sugeridoKva: number | null; // tamanho comercial
  combustivel: string;
  alertas: string[];
}

export function calcularGerador(itens: ItemSelecionado[]): GeradorResultado {
  const ativos = itens.filter((i) => i.qtd > 0 && i.watts > 0);
  const consumo = ativos.reduce((t, i) => t + i.qtd * i.watts, 0);
  // Considera que os motores partem um de cada vez: soma o maior acréscimo de partida.
  const acrescimo = ativos.reduce((m, i) => Math.max(m, i.watts * (i.partida - 1)), 0);
  const pico = consumo + acrescimo;
  const necessaria = Math.max(consumo * MARGEM_CONSUMO, pico * MARGEM_PICO);
  const kva = necessaria / FATOR_POTENCIA / 1000;
  const sugeridoKva = TAMANHOS_KVA.find((t) => t >= kva) ?? null;

  const combustivel =
    sugeridoKva !== null && sugeridoKva <= 8
      ? 'Gasolina atende bem em uso de curta duração. Para o dia todo, considere diesel.'
      : 'Para essa potência, geradores a diesel costumam ser mais econômicos e duráveis em uso contínuo.';

  const alertas: string[] = [];
  if (ativos.some((i) => i.nome.toLowerCase().includes('solda'))) {
    alertas.push('Máquinas de solda inversoras são sensíveis. Use gerador com regulador de tensão (AVR) e onda estável.');
  }
  if (sugeridoKva === null) {
    alertas.push('A carga passa do tamanho de gerador listado. Fale com a equipe para um dimensionamento específico.');
  } else if (sugeridoKva > 10) {
    alertas.push('Nessa potência, os geradores costumam ser trifásicos. Confira a tensão (127/220 V ou 220/380 V) dos seus equipamentos.');
  }
  alertas.push('Considerado que os motores partem um de cada vez. Se dois ou mais partirem juntos, escolha um gerador maior.');

  return { consumo, pico, necessaria, kva, sugeridoKva, combustivel, alertas };
}
