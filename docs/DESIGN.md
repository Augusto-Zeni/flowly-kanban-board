# 📋 Especificação — App Kanban Pessoal
> Stack: **React / Next.js** | Tema: **Dark Mode fiel ao referencial**

---

## 1. Visão Geral

App de produtividade pessoal com board Kanban, painel lateral de detalhes de tarefa e sidebar de navegação. O visual é escuro, denso e profissional — semelhante ao Linear/Notion mas com identidade própria.

---

## 2. Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| `--bg-base` | `#0f0f0f` | Fundo geral da aplicação |
| `--bg-sidebar` | `#141414` | Sidebar esquerda |
| `--bg-card` | `#1c1c1c` | Cards do kanban |
| `--bg-panel` | `#181818` | Painel de detalhes (direita) |
| `--bg-column` | `#161616` | Fundo de cada coluna |
| `--border` | `#2a2a2a` | Bordas e divisores |
| `--text-primary` | `#e8e8e8` | Textos principais |
| `--text-secondary` | `#6b6b6b` | Labels, metadados |
| `--text-muted` | `#444444` | Placeholders |
| `--accent-yellow` | `#c9f542` | Logo / destaque da marca |
| `--tag-design` | `#3b4fd8` | Tag "Design System" |
| `--tag-art` | `#e07b39` | Tag "Daily Art" |
| `--tag-web` | `#3dba6e` | Tag "Weszlo.com" |
| `--priority-high` | `#e05252` | Prioridade Alta |
| `--priority-medium` | `#e09a3b` | Prioridade Média |
| `--priority-low` | `#3dba6e` | Prioridade Baixa |
| `--status-todo` | `#555555` | Ícone coluna "To Do" |
| `--status-progress` | `#e09a3b` | Ícone coluna "In Progress" |
| `--status-review` | `#3b9de0` | Ícone coluna "In Review" |

---

## 3. Tipografia

- **Tamanhos:**
  - Título de tarefa no painel: `18px`, `font-weight: 600`
  - Título do card: `13px`, `font-weight: 500`
  - Labels/metadados: `11–12px`, `font-weight: 400`, cor `--text-secondary`
  - Nome do projeto na sidebar: `13px`, `font-weight: 500`

---

## 4. Layout Geral

```
┌──────────────┬──────────────────────────────────┬─────────────────────┐
│   SIDEBAR    │         BOARD (KANBAN)            │   PAINEL DETALHE    │
│   ~220px     │         flex-grow: 1              │      ~380px         │
│              │                                   │   (abre ao clicar)  │
└──────────────┴──────────────────────────────────┴─────────────────────┘
```

- Layout: `display: flex`, altura `100vh`, sem scroll vertical no wrapper.
- O painel de detalhe é um **drawer fixo à direita**, não um modal.

---

## 5. Sidebar Esquerda

### Estrutura
```
[Logo + Nome do Projeto]  ← "Flowly" com ícone amarelo
[Barra de Busca]          ← ícone lupa + "Search" + atalho ⌘K

GENERAL
  My Time
  My Work
  Boards
  Notification            ← badge vermelho com número

PROJECTS
  Hologram                ← projeto ativo (highlight)
  DailyArt App
  Wieszlo.com
  Starlight Team

OTHER
  Settings
  Help Center

[Avatar + Nome + Email]   ← rodapé fixo
```

### Comportamento
- Item ativo tem fundo `#222222` e texto branco.
- Hover: fundo sutil `#1e1e1e`.
- Badge de notificação: círculo vermelho `#e05252`, número branco, `font-size: 10px`.
- Seções ("GENERAL", "PROJECTS") em `--text-secondary`, `font-size: 10px`, `letter-spacing: 0.08em`, `text-transform: uppercase`.

---

## 6. Header do Board

```
[Logo] Flowly

[Overview] [Tasks ←ativo] [Timeline] [Notes] [Files] [Members]
```

- Tabs com underline no item ativo (cor `--text-primary`), demais em `--text-secondary`.
- Sem background nas tabs — linha inferior apenas no ativo.

---

## 7. Board Kanban

### Colunas

Cada coluna tem:
- **Header:** ícone de status colorido + nome em caps + contagem numérica + botão `+`
- **Largura:** ~280–300px, fixas (sem esticar)
- **Gap entre colunas:** 16px
- **Scroll:** cada coluna tem scroll vertical independente

```
○ TO DO  2  [+]     ⊙ IN PROGRESS  3  [+]     ◉ IN REVIEW  [+]
```

### Cards

Anatomia de um card:
```
┌────────────────────────────────┐
│ [Tag projeto] [● Prioridade]   │  ← linha de badges
│                                │
│  Título da tarefa em até       │  ← 2 linhas max, truncar
│  duas linhas...                │
│                                │
│  Due Date: 31 May 2025         │  ← ícone calendário + data
│                                │
│ [Avatar(s)]    [💬 2]  [📎 4]  │  ← rodapé do card
└────────────────────────────────┘
```

**Detalhes visuais:**
- Borda: `1px solid var(--border)`
- Border-radius: `8px`
- Padding: `12px`
- Background: `var(--bg-card)`
- Hover: leve elevação com `box-shadow: 0 0 0 1px #3a3a3a`
- Gap entre cards: `10px`

**Tags de projeto:** pílula colorida, `font-size: 10px`, `padding: 2px 8px`, `border-radius: 4px`, cor de fundo semi-transparente (ex: `rgba(59, 79, 216, 0.25)` + texto `#6e84f5`).

**Badges de prioridade:** pílula com bullet colorido + texto, mesmo estilo das tags mas cor diferente.

**Avatares:** círculos de `24px`, sobrepostos com `margin-left: -6px` quando múltiplos.

**Ícones de rodapé:** `💬` comentários e `📎` anexos com contagem em `--text-secondary`.

---

## 8. Painel de Detalhe (Drawer Direito)

Abre ao clicar em um card. Largura fixa ~380px, fundo `var(--bg-panel)`, separado por borda esquerda.

### Header do painel
```
[↗ expandir]  [•••]  [✏️ editar]  [✕ fechar]   ← ícones à direita
```

### Título
Grande, `font-size: 18px`, `font-weight: 600`, cor `--text-primary`. Ocupa até 3 linhas.

### Metadados (grid de 2 colunas: label | valor)
```
Assignee   [Avatar] Dominik Dutkiewicz
Status     [ícone] In progress
Due Date   [📅] 31 May 2025
Priority   [●] High
Tags       [Design System] [Hologram]
```
- Labels em `--text-secondary`, `font-size: 12px`
- Valores em `--text-primary`, `font-size: 13px`
- Separador: linha `1px solid var(--border)` entre cada linha de metadado

### Tabs do painel
```
[Description ←ativo]  [Comments 3]  [Attachments 4]  [Activities]
```

### Corpo da descrição
Texto corrido, `font-size: 13px`, `line-height: 1.7`, cor `--text-primary`. Sem markdown renderizado — texto puro.

---

## 9. Componentes Reutilizáveis (React)

| Componente | Descrição |
|---|---|
| `<Sidebar />` | Navegação lateral fixa |
| `<BoardHeader />` | Nome do projeto + tabs |
| `<KanbanBoard />` | Container com scroll horizontal das colunas |
| `<KanbanColumn />` | Coluna individual com header e lista de cards |
| `<TaskCard />` | Card arrastável do kanban |
| `<TaskDetailPanel />` | Drawer de detalhes à direita |
| `<TagBadge />` | Pílula colorida de tag/projeto |
| `<PriorityBadge />` | Badge de prioridade |
| `<Avatar />` | Avatar circular com fallback de iniciais |
| `<MetadataRow />` | Linha label + valor no painel de detalhes |

---

## 10. Interações e Estados

- **Hover no card:** `box-shadow` sutil
- **Card clicado:** abre `<TaskDetailPanel />` à direita, board não some
- **Coluna "To Do":** status indicator cinza
- **Coluna "In Progress":** status indicator laranja
- **Coluna "In Review":** status indicator azul
- **Botão `+` na coluna:** abre input inline para criar nova tarefa

---

## 11. Responsividade

> App focado em desktop — não precisa ser mobile-first.

- Sidebar recolhível em telas < 1200px (ícones apenas)
- Painel de detalhe vira bottom sheet em < 768px

---

## 12. Referência Visual

A referência é o app **Timekeeper / Hologram**. Pontos-chave a preservar:

- ✅ Dark mode profundo (não cinza — quase preto)
- ✅ Cards compactos e densos, sem espaço excessivo
- ✅ Tags coloridas com fundo semi-transparente
- ✅ Painel lateral de detalhe (não modal)
- ✅ Sidebar com hierarquia clara de projetos
- ✅ Ícones minimalistas (Lucide Icons recomendado)