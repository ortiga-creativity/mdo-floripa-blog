// Regras de cálculo de piso e porcelanato (mesmos valores do post "Como calcular piso porcelanato"):
// caixas = área x (1 + perda) / m² por caixa; rejunte por ((C+L)/(C x L)) x E x J x 1,7.

export const PERDAS: Record<string, { nome: string; perda: number }> = {
  reto: { nome: 'Assentamento reto', perda: 0.1 },
  diagonal: { nome: 'Diagonal ou ambiente recortado', perda: 0.15 },
  complexo: { nome: 'Desenho complexo', perda: 0.2 },
};
export const ARGAMASSA_MIN = 4; // kg por m² (assentamento simples)
export const ARGAMASSA_MAX = 6;
export const SACO_ARGAMASSA = 20; // kg

export interface PisoInput {
  comprimento: number;
  largura: number;
  assentamento: string;
  m2PorCaixa: number;
  pecaC: number; // mm
  pecaL: number; // mm
  espessura: number; // mm
  junta: number; // mm
}

export interface PisoResultado {
  area: number;
  areaComPerda: number;
  perda: number;
  caixas: number;
  argamassaMinKg: number;
  argamassaMaxKg: number;
  sacosMin: number;
  sacosMax: number;
  rejunteKgM2: number;
  rejunteKg: number;
  alertas: string[];
}

export function calcularPiso(i: PisoInput): PisoResultado {
  const p = PERDAS[i.assentamento] ?? PERDAS.reto;
  const area = i.comprimento * i.largura;
  const areaComPerda = area * (1 + p.perda);
  const caixas = Math.ceil(areaComPerda / i.m2PorCaixa - 1e-9);
  const argamassaMinKg = area * ARGAMASSA_MIN;
  const argamassaMaxKg = area * ARGAMASSA_MAX;
  const rejunteKgM2 = ((i.pecaC + i.pecaL) / (i.pecaC * i.pecaL)) * i.espessura * i.junta * 1.7;
  const alertas: string[] = [];
  if ((i.pecaC * i.pecaL) / 100 > 900) {
    alertas.push('Peças acima de 900 cm² costumam pedir dupla colagem, o que aumenta o consumo de argamassa. Confira com o fabricante.');
  }
  return {
    area,
    areaComPerda,
    perda: p.perda,
    caixas,
    argamassaMinKg,
    argamassaMaxKg,
    sacosMin: Math.ceil(argamassaMinKg / SACO_ARGAMASSA - 1e-9),
    sacosMax: Math.ceil(argamassaMaxKg / SACO_ARGAMASSA - 1e-9),
    rejunteKgM2,
    rejunteKg: rejunteKgM2 * area,
    alertas,
  };
}
