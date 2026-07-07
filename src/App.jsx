import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import PlayersManager from "./components/PlayersManager";
import StaffManager from "./components/StaffManager";

const JOGADORES_SEED = [
  { id: crypto.randomUUID(), nome: "Thibaut Courtois", numero: "1", posicao: "Guarda-Redes", pe: "Esquerdo", idade: "34" },
  { id: crypto.randomUUID(), nome: "Gabriel Magalhães", numero: "6", posicao: "Defesa Central", pe: "Esquerdo", idade: "28" },
  { id: crypto.randomUUID(), nome: "Achraf Hakimi", numero: "2", posicao: "Lateral", pe: "Direito", idade: "27" },
  { id: crypto.randomUUID(), nome: "Kaká", numero: "22", posicao: "Médio Defensivo", pe: "Direito", idade: "44" },
  { id: crypto.randomUUID(), nome: "Jude Bellingham", numero: "5", posicao: "Médio Centro", pe: "Direito", idade: "23" },
  { id: crypto.randomUUID(), nome: "Nico Williams", numero: "17", posicao: "Extremo", pe: "Direito", idade: "23" },
  { id: crypto.randomUUID(), nome: "Neymar Jr", numero: "10", posicao: "Avançado", pe: "Direito", idade: "34" },
  { id: crypto.randomUUID(), nome: "Endrick", numero: "19", posicao: "Avançado", pe: "Direito", idade: "19" },
];

const EQUIPA_TECNICA_SEED = [
  { id: crypto.randomUUID(), nome: "Pep Guardiola", funcao: "Treinador Principal", desde: "2026" },
  { id: crypto.randomUUID(), nome: "Gianluca Spinelli", funcao: "Treinador de Guarda-Redes", desde: "2026" },
  { id: crypto.randomUUID(), nome: "Antonio Pintus", funcao: "Preparador Físico", desde: "2026" },
];

const TABS = [
  { id: "plantel", label: "Plantel" },
  { id: "tecnica", label: "Equipa Técnica" },
];

export default function App() {
  const [tab, setTab] = useState("plantel");
  const [jogadores, setJogadores] = useLocalStorage("plantel:jogadores", JOGADORES_SEED);
  const [equipaTecnica, setEquipaTecnica] = useLocalStorage("plantel:tecnica", EQUIPA_TECNICA_SEED);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="kicker">Gestão de Equipa</p>
          <h1>O Meu Plantel</h1>
          <p className="subtitle">
            Regista e organiza os jogadores por posição e a equipa técnica
            por função.
          </p>
        </div>
        <svg className="crest" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M32 4 L56 14 V30 C56 46 46 56 32 60 C18 56 8 46 8 30 V14 Z"
            fill="#153420"
            stroke="#c9a227"
            strokeWidth="2"
          />
          <path d="M32 16 L32 48 M18 24 L46 24" stroke="#c9a227" strokeWidth="2" />
        </svg>
      </header>

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            <span className="tab-count">
              {t.id === "plantel" ? jogadores.length : equipaTecnica.length}
            </span>
          </button>
        ))}
      </nav>

      {tab === "plantel" ? (
        <PlayersManager jogadores={jogadores} setJogadores={setJogadores} />
      ) : (
        <StaffManager
          equipaTecnica={equipaTecnica}
          setEquipaTecnica={setEquipaTecnica}
        />
      )}

      <footer className="app-footer">
        <span>Dados guardados localmente no navegador.</span>
        <span>Plantel &middot; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
