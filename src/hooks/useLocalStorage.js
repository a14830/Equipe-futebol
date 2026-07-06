import { useEffect, useState } from "react";

/**
 * Persiste um valor no localStorage (formato JSON), tal como um pequeno
 * "ficheiro" de dados por chave. Serve de camada de dados sem precisar de
 * backend — pode mais tarde ser substituído por Supabase mantendo a mesma
 * interface (valor, setValor).
 */
export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(chave);
      return guardado ? JSON.parse(guardado) : valorInicial;
    } catch (erro) {
      console.error(`Erro ao ler "${chave}" do localStorage:`, erro);
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
      console.error(`Erro ao guardar "${chave}" no localStorage:`, erro);
    }
  }, [chave, valor]);

  return [valor, setValor];
}
