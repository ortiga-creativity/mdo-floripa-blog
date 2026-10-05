// Regras de cálculo da torre de andaime 1,5 x 1,5 m (painéis de 1,5 x 1,5 m).
// Ajuste as constantes abaixo se a equipe técnica usar outra composição.

export const MODULO = 1.5; // m: altura do painel e menor lado da base
export const RELACAO_MAX_ALTURA_BASE = 4; // acima de 4x a base, a torre deve ser estaiada

export interface TorreInput {
  altura: number;
  rodas: boolean;
}

export interface TorreItem {
  nome: string;
  qtd: string;
  nota?: string;
}

export interface TorreResultado {
  itens: TorreItem[];
  modulos: number;
  alturaReal: number;
  alertas: string[];
}

export function calcularTorre({ altura, rodas }: TorreInput): TorreResultado {
  const modulos = Math.max(1, Math.ceil(altura / MODULO));

  const itens: TorreItem[] = [
    { nome: 'Painéis 1,5 x 1,5 m', qtd: String(modulos * 2), nota: '2 painéis por módulo' },
    { nome: 'Diagonais de travamento', qtd: String(Math.ceil(modulos / 2)), nota: 'Uma a cada 3 m de altura' },
    rodas
      ? { nome: 'Rodízios com freio', qtd: '4' }
      : { nome: 'Sapatas (fixas ou reguláveis)', qtd: '4', nota: 'Use reguláveis em piso desnivelado' },
    { nome: 'Pisos de plataforma', qtd: '2 a 3', nota: 'Por nível de trabalho' },
    { nome: 'Guarda-corpo (kit topo)', qtd: '1', nota: 'Conforme NR-18' },
  ];

  const alertas: string[] = [];
  const limite = RELACAO_MAX_ALTURA_BASE * MODULO;
  if (modulos * MODULO > limite) {
    alertas.push(
      `Torres acima de ${String(limite).replace('.', ',')} m (4 vezes a menor dimensão da base) devem ser estaiadas ou fixadas à estrutura da edificação.`,
    );
  }

  return { itens, modulos, alturaReal: modulos * MODULO, alertas };
}
