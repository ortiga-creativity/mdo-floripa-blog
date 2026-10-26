// Regras de cálculo de tijolos (mesmos valores do post "Quantos tijolos por m²"):
// tijolos = área líquida x unidades por m² + 10% de perda.

export const AREA_PORTA = 0.8 * 2.1; // 1,68 m²
export const AREA_JANELA = 1.2 * 1.2; // 1,44 m²
export const PERDA = 0.1;
export const ARGAMASSA_MIN = 8; // litros por m² (parede de tijolo de 9 cm, junta de 1 cm)
export const ARGAMASSA_MAX = 12;

export const TIPOS: Record<string, { nome: string; porM2: number; espessura: number }> = {
  'tijolo-8f': { nome: 'Tijolo 8 furos 9 x 19 x 19 cm', porM2: 25, espessura: 9 },
  'tijolo-6f-pe': { nome: 'Tijolo 6 furos 9 x 14 x 19 cm (em pé)', porM2: 33, espessura: 9 },
  'tijolo-6f-deitado': { nome: 'Tijolo 6 furos 9 x 14 x 19 cm (deitado)', porM2: 50, espessura: 14 },
  'bloco-ceramico': { nome: 'Bloco cerâmico 9 x 19 x 29 cm', porM2: 17, espessura: 9 },
  'bloco-concreto': { nome: 'Bloco de concreto 14 x 19 x 39 cm', porM2: 13, espessura: 14 },
};

export interface TijolosInput {
  comprimento: number;
  altura: number;
  portas: number;
  janelas: number;
  tipo: string;
}

export interface TijolosResultado {
  areaBruta: number;
  descontos: number;
  areaLiquida: number;
  unidades: number;
  unidadesComPerda: number;
  argamassaMin: number;
  argamassaMax: number;
  espessura: number;
  alertas: string[];
}

export function calcularTijolos(i: TijolosInput): TijolosResultado {
  const t = TIPOS[i.tipo] ?? TIPOS['tijolo-8f'];
  const areaBruta = i.comprimento * i.altura;
  const descontos = i.portas * AREA_PORTA + i.janelas * AREA_JANELA;
  const areaLiquida = Math.max(0, areaBruta - descontos);
  const unidades = areaLiquida * t.porM2;
  const unidadesComPerda = Math.ceil(unidades * (1 + PERDA) - 1e-9);
  const alertas: string[] = [];
  if (descontos >= areaBruta) {
    alertas.push('As portas e janelas informadas ocupam toda a parede. Confira as quantidades.');
  }
  if (t.espessura !== 9) {
    alertas.push('O consumo de argamassa é uma referência para parede de 9 cm. Em peças mais largas, consulte a ficha técnica do fabricante.');
  }
  return {
    areaBruta,
    descontos,
    areaLiquida,
    unidades,
    unidadesComPerda,
    argamassaMin: areaLiquida * ARGAMASSA_MIN,
    argamassaMax: areaLiquida * ARGAMASSA_MAX,
    espessura: t.espessura,
    alertas,
  };
}
