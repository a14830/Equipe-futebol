import { useMemo, useState } from "react";
import { FUNCOES_TECNICAS, membroVazio } from "../data/constants";

function StaffForm({ inicial, onGuardar, onCancelar }) {
  const [dados, setDados] = useState(inicial);
  const [erro, setErro] = useState("");

  function atualizar(campo, valor) {
    setDados((d) => ({ ...d, [campo]: valor }));
  }

  function submeter(e) {
    e.preventDefault();
    if (!dados.nome.trim()) {
      setErro("Indica o nome do elemento da equipa técnica.");
      return;
    }
    onGuardar({ ...dados, nome: dados.nome.trim() });
  }

  return (
    <div className="modal-backdrop" onClick={onCancelar}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <h2>{inicial.nome ? "Editar elemento" : "Novo elemento"}</h2>
        <form onSubmit={submeter}>
          <div className="field">
            <label htmlFor="nome-staff">Nome</label>
            <input
              id="nome-staff"
              autoFocus
              value={dados.nome}
              onChange={(e) => atualizar("nome", e.target.value)}
              placeholder="Ex: Carlos Mendes"
            />
          </div>
          <div className="field">
            <label htmlFor="funcao">Função</label>
            <select
              id="funcao"
              value={dados.funcao}
              onChange={(e) => atualizar("funcao", e.target.value)}
            >
              {FUNCOES_TECNICAS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="desde">Na equipa desde</label>
            <input
              id="desde"
              type="text"
              placeholder="Ex: 2023"
              value={dados.desde}
              onChange={(e) => atualizar("desde", e.target.value)}
            />
          </div>
          {erro && <p className="form-error">{erro}</p>}
          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Guardar elemento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function StaffManager({ equipaTecnica, setEquipaTecnica }) {
  const [aEditar, setAEditar] = useState(null);
  const [aCriar, setACriar] = useState(false);

  const grupos = useMemo(() => {
    return FUNCOES_TECNICAS.map((funcao) => ({
      funcao,
      lista: equipaTecnica.filter((m) => m.funcao === funcao),
    }));
  }, [equipaTecnica]);

  function guardarMembro(membro) {
    setEquipaTecnica((atual) => {
      const existe = atual.some((m) => m.id === membro.id);
      return existe
        ? atual.map((m) => (m.id === membro.id ? membro : m))
        : [...atual, membro];
    });
    setAEditar(null);
    setACriar(false);
  }

  function removerMembro(id) {
    if (window.confirm("Remover este elemento da equipa técnica?")) {
      setEquipaTecnica((atual) => atual.filter((m) => m.id !== id));
    }
  }

  return (
    <div>
      <div className="section-toolbar">
        <button className="btn-primary" onClick={() => setACriar(true)}>
          + Adicionar elemento
        </button>
      </div>

      {equipaTecnica.length === 0 && (
        <p className="empty-state">
          Ainda não há elementos da equipa técnica registados.
        </p>
      )}

      {grupos.map(({ funcao, lista }) => (
        <div className="group" key={funcao}>
          <div className="group-header">
            <span className="group-title">
              {funcao}
              <span className="count">
                {lista.length} {lista.length === 1 ? "elemento" : "elementos"}
              </span>
            </span>
            <span className="halfway-line" />
          </div>

          {lista.length === 0 ? (
            <p className="empty-state">Sem elementos nesta função.</p>
          ) : (
            <div className="card-list">
              {lista.map((m) => (
                <div className="card-row" key={m.id}>
                  <div className="badge-role">
                    {m.nome.charAt(0).toUpperCase()}
                  </div>
                  <div className="row-main">
                    <div className="row-name">{m.nome}</div>
                    <div className="row-meta">
                      {m.desde ? `Desde ${m.desde}` : ""}
                    </div>
                  </div>
                  <div className="row-actions">
                    <button
                      className="icon-btn"
                      title="Editar"
                      onClick={() => setAEditar(m)}
                    >
                      ✎
                    </button>
                    <button
                      className="icon-btn danger"
                      title="Remover"
                      onClick={() => removerMembro(m.id)}
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
        <StaffForm
          inicial={membroVazio()}
          onGuardar={guardarMembro}
          onCancelar={() => setACriar(false)}
        />
      )}
      {aEditar && (
        <StaffForm
          inicial={aEditar}
          onGuardar={guardarMembro}
          onCancelar={() => setAEditar(null)}
        />
      )}
    </div>
  );
}
