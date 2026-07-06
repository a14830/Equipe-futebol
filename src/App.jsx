import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import PlayersManager from "./components/PlayersManager";
import StaffManager from "./components/StaffManager";

const JOGADORES_SEED = [
  { id: crypto.randomUUID(), nome: "Rui Patrício", numero: "1", posicao: "Guarda-Redes", pe: "Direito", idade: "27" },
  { id: crypto.randomUUID(), nome: "Nuno Mendes", numero: "3", posicao: "Lateral", pe: "Esquerdo", idade: "22" },
  { id: crypto.randomUUID(), nome: "Rúben Dias", numero: "4", posicao: "Defesa Central", pe: "Direito", idade: "26" },
  { id: crypto.randomUUID(), nome: "João Palhinha", numero: "6", posicao: "Médio Defensivo", pe: "Direito", idade: "28" },
  { id: crypto.randomUUID(), nome: "Bernardo Silva", numero: "10", posicao: "Médio Centro", pe: "Direito", idade: "29" },
  { id: crypto.randomUUID(), nome: "Rafael Leão", numero: "17", posicao: "Extremo", pe: "Esquerdo", idade: "25" },
  { id: crypto.randomUUID(), nome: "Gonçalo Ramos", numero: "9", posicao: "Avançado", pe: "Direito", idade: "23" },
];

const EQUIPA_TECNICA_SEED = [
  { id: crypto.randomUUID(), nome: "Roberto Martínez", funcao: "Treinador Principal", desde: "2022" },
  { id: crypto.randomUUID(), nome: "Rui Faria", funcao: "Preparador Físico", desde: "2023" },
  { id: crypto.randomUUID(), nome: "Vítor Bruno", funcao: "Treinador de Guarda-Redes", desde: "2022" },
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
            por função. Tudo é guardado automaticamente neste dispositivo.
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
        <span>Dados guardados localmente no navegador (localStorage).</span>
        <span>Plantel &middot; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
