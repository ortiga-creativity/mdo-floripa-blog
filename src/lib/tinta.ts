// Regras de cálculo de tinta (mesma fórmula do post "Quantos litros de tinta preciso?"):
// litros = área a pintar x demãos / rendimento por litro.

export const AREA_PORTA = 0.8 * 2.1; // 1,68 m²
export const AREA_JANELA = 1.2 * 1.2; // 1,44 m²
export const MARGEM = 0.1; // 10% de segurança
export const LATAS = [18, 3.6, 0.9]; // embalagens comerciais mais comuns (litros)

export interface TintaInput {
  comprimento: number;
  largura: number;
  peDireito: number;
  portas: number;
  janelas: number;
  teto: boolean;
  demaos: number;
  rendimento: number; // m² por litro por demão
}

export interface TintaResultado {
  areaParedes: number;
  areaTeto: number;
  descontos: number;
  areaPintura: number;
  litros: number;
  litrosComMargem: number;
  latas: { litros: number; qtd: number }[];
  totalLatas: number;
  alertas: string[];
}

export function sugerirLatas(litros: number) {
  const eps = 1e-9;
  const n18 = Math.floor((litros + eps) / 18);
  let resto = litros - n18 * 18;
  let n36 = Math.floor((resto + eps) / 3.6);
  resto -= n36 * 3.6;
  let n09 = resto > eps ? Math.ceil((resto - eps) / 0.9) : 0;
  if (n09 >= 4) {
    n36 += 1;
    n09 = 0;
  }
  const latas = [
    { litros: 18, qtd: n18 },
    { litros: 3.6, qtd: n36 },
    { litros: 0.9, qtd: n09 },
  ].filter((l) => l.qtd > 0);
  const totalLatas = latas.reduce((t, l) => t + l.litros * l.qtd, 0);
  return { latas, totalLatas };
}

export function calcularTinta(i: TintaInput): TintaResultado {
  const areaParedes = 2 * (i.comprimento + i.largura) * i.peDireito;
  const areaTeto = i.teto ? i.comprimento * i.largura : 0;
  const descontos = i.portas * AREA_PORTA + i.janelas * AREA_JANELA;
  const areaPintura = Math.max(0, areaParedes + areaTeto - descontos);
  const litros = (areaPintura * i.demaos) / i.rendimento;
  const litrosComMargem = litros * (1 + MARGEM);
  const { latas, totalLatas } = sugerirLatas(litrosComMargem);

  const alertas: string[] = [];
  if (descontos >= areaParedes + areaTeto) {
    alertas.push('As portas e janelas informadas ocupam toda a área. Confira as quantidades.');
  }
  if (i.demaos >= 3 || i.rendimento <= 8) {
    alertas.push('Para superfície nova, porosa, texturizada ou troca de cor escura por clara, considere uma margem maior que 10%.');
  }

  return { areaParedes, areaTeto, descontos, areaPintura, litros, litrosComMargem, latas, totalLatas, alertas };
}
