// Regras de cálculo de concreto (mesmos valores do post "Traço de concreto"):
// volume = comprimento x largura x espessura; sacos de 50 kg pelo consumo por m³ do traço.

export const PERDA = 0.1; // 10% de perda
export const BETONADA_MIN = 0.25; // m³ por betonada de uma betoneira de 400 L
export const BETONADA_MAX = 0.28;

export interface Traco {
  nome: string;
  sacosPorM3: number; // sacos de 50 kg de cimento por m³
  latasAreia: number; // latas de 18 L por saco de cimento
  latasBrita: number;
}

export const TRACOS: Record<string, Traco> = {
  '1:2:3': { nome: '1:2:3', sacosPorM3: 7, latasAreia: 4, latasBrita: 6 },
  '1:2:4': { nome: '1:2:4', sacosPorM3: 6, latasAreia: 4, latasBrita: 8 },
};

export interface ConcretoInput {
  comprimento: number;
  largura: number;
  espessuraCm: number;
  traco: string;
}

export interface ConcretoResultado {
  area: number;
  volume: number;
  volumeComPerda: number;
  sacos: number;
  latasAreia: number;
  latasBrita: number;
  betonadasMin: number;
  betonadasMax: number;
  alertas: string[];
}

export function calcularConcreto(i: ConcretoInput): ConcretoResultado {
  const t = TRACOS[i.traco] ?? TRACOS['1:2:3'];
  const area = i.comprimento * i.largura;
  const volume = area * (i.espessuraCm / 100);
  const volumeComPerda = volume * (1 + PERDA);
  const sacos = Math.ceil(volumeComPerda * t.sacosPorM3 - 1e-9);
  const alertas: string[] = [];
  if (i.espessuraCm >= 12 || volume >= 3) {
    alertas.push('Laje, viga, pilar e outras peças estruturais exigem traço e resistência (fck) definidos em projeto. Esta calculadora serve para pisos, calçadas e fundações simples.');
  }
  return {
    area,
    volume,
    volumeComPerda,
    sacos,
    latasAreia: sacos * t.latasAreia,
    latasBrita: sacos * t.latasBrita,
    betonadasMin: Math.ceil(volumeComPerda / BETONADA_MAX - 1e-9),
    betonadasMax: Math.ceil(volumeComPerda / BETONADA_MIN - 1e-9),
    alertas,
  };
}
