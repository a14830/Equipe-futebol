import { useMemo, useState } from "react";
import { POSICOES, PES, jogadorVazio } from "../data/constants";

function PlayerForm({ inicial, onGuardar, onCancelar }) {
  const [dados, setDados] = useState(inicial);
  const [erro, setErro] = useState("");

  function atualizar(campo, valor) {
    setDados((d) => ({ ...d, [campo]: valor }));
  }

  function submeter(e) {
    e.preventDefault();
    if (!dados.nome.trim()) {
      setErro("Indica o nome do jogador.");
      return;
    }
    if (dados.numero === "" || Number(dados.numero) <= 0) {
      setErro("Indica um número de plantel válido.");
      return;
    }
    onGuardar({ ...dados, nome: dados.nome.trim() });
  }

  return (
    <div className="modal-backdrop" onClick={onCancelar}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <h2>{inicial.nome ? "Editar jogador" : "Novo jogador"}</h2>
        <form onSubmit={submeter}>
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              autoFocus
              value={dados.nome}
              onChange={(e) => atualizar("nome", e.target.value)}
              placeholder="Ex: Neymar Jr"
            />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="numero">Número</label>
              <input
                id="numero"
                type="number"
                min="1"
                max="99"
                value={dados.numero}
                onChange={(e) => atualizar("numero", e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="idade">Idade</label>
              <input
                id="idade"
                type="number"
                min="14"
                max="50"
                value={dados.idade}
                onChange={(e) => atualizar("idade", e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="posicao">Posição</label>
            <select
              id="posicao"
              value={dados.posicao}
              onChange={(e) => atualizar("posicao", e.target.value)}
            >
              {POSICOES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="pe">Pé preferido</label>
            <select
              id="pe"
              value={dados.pe}
              onChange={(e) => atualizar("pe", e.target.value)}
            >
              {PES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          {erro && <p className="form-error">{erro}</p>}
          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Guardar jogador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PlayersManager({ jogadores, setJogadores }) {
  const [aEditar, setAEditar] = useState(null); // objeto jogador ou null
  const [aCriar, setACriar] = useState(false);

  // Mostra sempre todas as posições (mesmo vazias) para facilitar adicionar jogadores
  const grupos = useMemo(() => {
    return POSICOES.map((posicao) => ({
      posicao,
      lista: jogadores
        .filter((j) => j.posicao === posicao)
        .sort((a, b) => Number(a.numero) - Number(b.numero)),
    }));
  }, [jogadores]);

  function guardarJogador(jogador) {
    setJogadores((atual) => {
      const existe = atual.some((j) => j.id === jogador.id);
      return existe
        ? atual.map((j) => (j.id === jogador.id ? jogador : j))
        : [...atual, jogador];
    });
    setAEditar(null);
    setACriar(false);
  }

  function removerJogador(id) {
    if (window.confirm("Remover este jogador do plantel?")) {
      setJogadores((atual) => atual.filter((j) => j.id !== id));
    }
  }

  return (
    <div>
      <div className="section-toolbar">
        <button className="btn-primary" onClick={() => setACriar(true)}>
          + Adicionar jogador
        </button>
      </div>

      {jogadores.length === 0 && (
        <p className="empty-state">
          Ainda não há jogadores registados. Usa "Adicionar jogador" para
          começar a montar o plantel.
        </p>
      )}

      {grupos.map(({ posicao, lista }) => (
        <div className="group" key={posicao}>
          <div className="group-header">
            <span className="group-title">
              {posicao}
              <span className="count">
                {lista.length} {lista.length === 1 ? "jogador" : "jogadores"}
              </span>
            </span>
            <span className="halfway-line" />
          </div>

          {lista.length === 0 ? (
            <p className="empty-state">Sem jogadores nesta posição.</p>
          ) : (
            <div className="card-list">
              {lista.map((j) => (
                <div className="card-row" key={j.id}>
                  <div className="badge-number">{j.numero}</div>
                  <div className="row-main">
                    <div className="row-name">{j.nome}</div>
                    <div className="row-meta">
                      {j.pe && `Pé ${j.pe.toLowerCase()}`}
                      {j.idade ? ` · ${j.idade} anos` : ""}
                    </div>
                  </div>
                  <div className="row-actions">
                    <button
                      className="icon-btn"
                      title="Editar"
                      onClick={() => setAEditar(j)}
                    >
                      ✎
                    </button>
                    <button
                      className="icon-btn danger"
                      title="Remover"
                      onClick={() => removerJogador(j.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {aCriar && (
        <PlayerForm
          inicial={jogadorVazio()}
          onGuardar={guardarJogador}
          onCancelar={() => setACriar(false)}
        />
      )}
      {aEditar && (
        <PlayerForm
          inicial={aEditar}
          onGuardar={guardarJogador}
          onCancelar={() => setAEditar(null)}
        />
      )}
    </div>
  );
}
