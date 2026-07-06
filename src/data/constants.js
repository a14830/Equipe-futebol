// Ordem de exibição das posições em campo (defesa -> ataque)
export const POSICOES = [
  "Guarda-Redes",
  "Defesa Central",
  "Lateral",
  "Médio Defensivo",
  "Médio Centro",
  "Extremo",
  "Avançado",
];

export const PES = ["Direito", "Esquerdo", "Ambidestro"];

export const FUNCOES_TECNICAS = [
  "Treinador Principal",
  "Treinador Adjunto",
  "Treinador de Guarda-Redes",
  "Preparador Físico",
  "Analista de Desempenho",
  "Fisioterapeuta",
  "Diretor Desportivo",
  "Team Manager",
  "Nutricionista",
];

export const jogadorVazio = () => ({
  id: crypto.randomUUID(),
  nome: "",
  numero: "",
  posicao: POSICOES[0],
  pe: PES[0],
  idade: "",
});

export const membroVazio = () => ({
  id: crypto.randomUUID(),
  nome: "",
  funcao: FUNCOES_TECNICAS[0],
  desde: "",
});
