# Convite 15 Anos — Mariah Verly

Convite online interativo para aniversário de 15 anos de Mariah Verly.

## Fluxo do Site (3 Etapas)

### Etapa 1 — Abrindo a Caixa de Presente

- Tela cheia exibindo sequência de 45 frames (`capa01.jpg` a `capa45.jpg`) de uma caixa de presente se abrindo
- Botão central inferior: **"Arraste para cima"**
- Usuário arrasta para cima com touch (mobile) ou mouse (desktop)
- O movimento vertical do dedo/mouse avança os frames em tempo real:
  - Posição Y mapeia para frame (0 a 44)
  - Arrastar para cima = avançar frames
- Duração total: ~1,5 segundos (45 frames)
- Ao chegar no frame 45 (caixa 100% aberta), transiciona automaticamente para Etapa 2

### Etapa 2 — Introdução Poética (~5 segundos)

- Fundo escuro (último frame com overlay preto)
- Texto em letras grandes centralizado, animação letra por letra em cadeia (cascata):

```
SOB O BRILHO DAS LUZES
E O ENCANTO DO GLITTER,
UM NOVO CAPÍTULO
COMEÇA A SER ESCRITO.

SEJA BEM-VINDO(A)
À NOITE QUE CELEBRA
OS 15 ANOS
DE MARIAH VERLY.
```

- **Animação:** Cada letra aparece sequencialmente com fade-in + translateY suave
- **Duração:** ~4 segundos para todas as letras, +1 segundo exibindo completo
- **Fim:** Fade out geral (~1 segundo), transiciona para Etapa 3

### Etapa 3 — Convite Principal

Aparece o convite completo sobre um fundo decorado com flores animadas em 3 camadas de profundidade.

#### Elementos Visuais

- **Frase destacada:** *"Aos quinze anos, tudo é infinito" — Machado de Assis*
- **Nome da aniversariante:** Mariah Verly
- **Data:** 04 de Setembro de 2026 — 20h
- **Local:** Le Paradis
  - Av. Antônio Mario de Azevedo, 1220 - Duas Pedras, Nova Friburgo - RJ

#### Botões e Links Clicáveis

| Botão | Função | Comportamento |
|---|---|---|
| 📍 **Local** | Google Maps | Modal interno com iframe Google Maps Embed |
| 👔 **Dress Code** | Modal flutuante | Janela com overlay blur |
| 🎁 **Lista de Presentes** | Modal flutuante | Janela com overlay blur |
| ✅ **Confirmar Presença** | WhatsApp | Abre link externo wa.me |

#### Modais Flutuantes

- Ao clicar em qualquer botão, abre um modal centralizado
- **Overlay:** Fundo preto com opacidade + `backdrop-filter: blur(8px)` desfocando o conteúdo atrás
- **Animação de abertura:** Modal escala de 0.8 → 1.0 com fade-in
- **Fechamento:** Botão "X" ou clique fora do modal
- Ao fechar, o foco retorna ao normal (overlay e blur removidos)

#### Conteúdos Placeholders (editáveis)

- **Dress Code:** *"Traje social — cores prata, roxo, azul e rosa são bem-vindas!"*
- **Lista de Presentes:** *"Eletrônicos, perfumes, maquiagem, acessórios, vale-presentes ou contribuição para a festa via PIX."*
- **Link Maps Embed:** Google Maps sem API key, via iframe
- **Link WhatsApp:** `https://wa.me/5522999573512?text=Ol%C3%A1%2C%20gostaria%20de%20confirmar%20minha%20presen%C3%A7a%20no%20anivers%C3%A1rio%20da%20Mariah%20Verly`

## Design e Estilo

### Sistema de Camadas de Flores (Profundidade 3D)

```
z-index: 50  → PÉTALAS (petala1-3.png)
               Grandes, desfocadas, movimento de "caindo"
               Sobre todas as outras camadas

z-index: 40  → CONTEÚDO CENTRAL
               Informações e botões (livre de flores)

z-index: 30  → CAMADA 1 — FRENTE
               Flores nítidas, tamanho normal
               Arcos nas laterais (4 de cada tipo)
               Movimento sutil + giro suave

z-index: 20  → SEPARADOR
               Layer preta com 20% de opacidade
               Cria profundidade entre camadas

z-index: 15  → CAMADA 2 — MEIO
               Flores maiores, mais escuras (opacidade reduzida)
               Arcos nas laterais
               Movimento lento + giro

z-index: 10  → CAMADA 3 — FUNDO
               Flores maiores, desfocadas (blur)
               Arcos nas laterais
               Movimento muito lento + giro
```

### Flores

- 3 tipos diferentes de flores: `flor1.png`, `flor2.png`, `flor3.png`
- 4 unidades de cada tipo por camada (total: 12 por camada)
- Distribuídas dos dois lados formando arcos
- Animações CSS `@keyframes` com ciclos de 10-20s:
  - `translateY` (flutuação vertical)
  - `rotate` (giro lento)
  - `scale` leve (respiração)
- Cada flor com delay e timing diferentes para movimento orgânico

### Pétalas

- 3 arquivos: `petala1.png`, `petala2.png`, `petala3.png`
- Grandes e desfocadas
- Movimento de "caindo" com swing suave
- Sobre todas as camadas (z-index mais alto)

### Paleta de Cores

| Cor | Aplicação |
|---|---|
| Rosa | Detalhes, destaques, ícones |
| Roxo | Títulos, bordas, elementos decorativos |
| Azul | Links, botões secundários |
| Prata | Textos secundários, brilhos, detalhes |
| Fundo escuro | Elegância e contraste |

### Tipografia

- **Google Fonts:** Playfair Display (títulos) + Montserrat (corpo)
- Tamanhos fluidos com `clamp()` para responsividade
- Pesos: Bold para títulos, Regular/Light para corpo

## Responsividade

- **Mobile-first:** Toda interface projetada para smartphones primeiro
- **Breakpoints:** 480px / 768px / 1024px
- **Fontes:** `clamp()` para escalar suavemente
- **Touch events:** `touchmove` para drag da caixa em mobile
- **Fallback mouse:** `mousedown/mousemove` para desktop
- **Flores:** Rearranjo automático em telas menores (menos flores visíveis)

## Performance

- Pré-carregamento de todas as imagens via `new Image()` antes da interação
- `will-change: transform` nas flores animadas
- Compressão JPEG recomendada para frames (qualidade 80%)
- PNG otimizado para flores e pétalas

## Deploy

- **GitHub:** Repositório versionado
- **Vercel:** Deploy automático conectado ao GitHub
  - Deploy grátis com HTTPS automático
  - Arquivo `vercel.json` para configuração SPA (se necessário)

## Estrutura de Arquivos

```
/
├── README.md                    # Este arquivo
├── index.html                   # Página principal
├── style.css                    # Estilos
├── script.js                    # Interatividade
├── vercel.json                  # Configuração Vercel
├── frames/                      # 45 frames da caixa abrindo
│   ├── capa01.jpg
│   ├── capa02.jpg
│   ├── ...
│   └── capa45.jpg
└── flowers/                     # Elementos decorativos PNG
    ├── flor1.png                # Tipo 1 (×4 por camada)
    ├── flor2.png                # Tipo 2 (×4 por camada)
    ├── flor3.png                # Tipo 3 (×4 por camada)
    ├── petala1.png              # Pétala 1
    ├── petala2.png              # Pétala 2
    └── petala3.png              # Pétala 3
```

## Observações de Implementação

- Single Page Application (SPA) — toda experiência em uma única página HTML
- Zero dependências externas (além da Google Fonts)
- Código em arquivos separados: `index.html` + `style.css` + `script.js`
- Animações CSS priorizadas sobre JavaScript para performance e suavidade
- Eventos touch + mouse para compatibilidade universal
- Modais com overlay blur suportam `backdrop-filter` com fallback
- Google Maps Embed via iframe (sem API key, público e gratuito)
- Texto introdutório com quebras de linha exatamente como fornecido

---

## Sessão 1 — Registro de Alterações

### Estrutura final de arquivos

```
/
├── README.md
├── index.html
├── style.css
├── script.js
├── vercel.json
├── frames/          # 45 frames capa01.png ~ capa45.png
├── flowers/         # flor1-3.png, petala1-3.png, glow01.png (não usado)
└── logo/            # logo01.png, bg01.jpeg, saa.jpg, vestido.svg
```

### O que foi implementado

**Etapa 1 — Caixa de presente**
- 45 frames em PNG arrastáveis com touch/mouse
- Barra de progresso
- Se não completar o drag, volta suavemente ao início

**Etapa 2 — Introdução poética**
- Fundo: `logo/saa.jpg` (`background-size: cover`)
- Texto "SOB O BRILHO DAS LUZES..." em linhas que aparecem uma por uma com fade-in
- Fonte: Playfair Display

**Etapa 3 — Convite**
- **Background base:** `logo/bg01.jpeg` com 50% de opacidade via `::before`
- **3 camadas de flores:** back (blur 6px), mid (blur 2px, escura), front (nítida)
  - 16 flores por camada, posicionamento absoluto espalhado em arcos
  - Tamanhos variam de 1.1x a 4x o base
- **Separador:** camada preta 20% entre mid e front
- **Glows (layer-glow):** 2 divs com `radial-gradient` + `blur(60px)`, cor `#FF79BA`, `mix-blend-mode: screen`
- **Glows screen (layer-glow-screen):** 2 divs opostas (topo/fundo), metade fora da tela, `blur(80px)`, cor `#FF9E9E`, `mix-blend-mode: screen`
- **Pétalas:** 8 pétalas com `blur(6px)`, opacidade 100%, movimento diagonal ↘ (esquerda→direita, cima→baixo)
  - Metade desvia para esquerda, metade para direita — não passam no centro
- **Conteúdo central:** Card com frase Machado de Assis, logo (`logo01.png` 240px), data, local, endereço
- **Botões com SVGs inline:** Dress Code (vestido.svg), Presentes, Local, Confirmar Presença (WhatsApp)
- **Modais:** Dress Code, Lista de Presentes, Local (iframe Google Maps) — overlay com `backdrop-filter: blur(8px)`

### Hierarquia de z-index
```
z:5   layer-glow          (glows traseiros #FF79BA)
z:6   layer-glow-screen   (glows frontais #FF9E9E, screen blend)
z:7   layer-back          (flores desfocadas)
z:8   layer-mid           (flores escuras)
z:20  separator-layer     (overlay preto 20%)
z:25  layer-front         (flores nítidas)
z:40  content-3           (card do convite)
z:50  layer-petals        (pétalas sobre tudo)
z:100 overlay             (modal backdrop)
z:110 modal               (janelas modais)
```

### Ajustes de animação
- Flores: `will-change: transform` individual, `animation-fill-mode: backwards`
- Pétalas: `linear` em vez de `ease-in-out`, fade-in em 5% do ciclo
- Glows: `radial-gradient` CSS em vez de PNG (mais leve)

### Cores
- Fundo geral: `#410163`
- Glow fundo: `#FF79BA`
- Glow screen: `#FF9E9E`
- Paleta: rosa `#e8a0bf`, roxo `#7b4a8a`, azul `#6b8fbc`, prata `#c0c0c0`

### Pendências para próxima sessão
- [ ] Popular frames com imagens da caixa de presente
- [ ] Ajustar quantidades/posição das flores (usuário quer mais)
- [ ] Testar responsivo mobile
- [ ] Configurar GitHub + Vercel para deploy
