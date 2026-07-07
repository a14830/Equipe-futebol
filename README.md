npm run dev
# O Meu Plantel — Gestão de Equipa de Futebol

Aplicação em React para gerir uma equipa de futebol: jogadores organizados
por posição e equipa técnica organizada por função. Permite adicionar,
editar e remover registos em qualquer uma das duas áreas.

## Stack

- **React 19 + Vite** — interface e build.
- **localStorage** — persistência de dados no navegador, em formato JSON,
  através do hook `useLocalStorage` (`src/hooks/useLocalStorage.js`). A
  interface deste hook (`[valor, setValor]`) foi pensada para poder ser
  substituída por Supabase mais tarde sem alterar os componentes.

## Estrutura

```
src/
  data/constants.js        # posições, funções técnicas e modelos vazios
  hooks/useLocalStorage.js  # persistência local tipo "ficheiro" JSON
  components/
    PlayersManager.jsx      # CRUD de jogadores, agrupados por posição
    StaffManager.jsx        # CRUD de equipa técnica, agrupada por função
  App.jsx                   # navegação por separadores + dados de exemplo
```

## Correr localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Publicar no Vercel

1. Fazer *push* deste repositório para o GitHub.
2. Em [vercel.com](https://vercel.com), **Add New → Project** e importar o
   repositório.
3. O Vercel deteta automaticamente que é um projeto Vite (build command
   `npm run build`, output directory `dist`) — não é necessária
   configuração adicional.
4. Publicar. A cada novo `push` para o branch principal, o Vercel gera um
   novo deployment automaticamente.

## Notas

- Os dados ficam guardados no navegador de cada utilizador (localStorage),
  pelo que não são partilhados entre dispositivos. Para dados centralizados
  e partilhados por vários utilizadores, o passo seguinte é substituir o
  hook `useLocalStorage` por chamadas ao Supabase.
