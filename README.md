# Convite 15 Anos — Mariah Verly

Convite online interativo para aniversário de 15 anos de Mariah Verly.

**URL:** [https://convite.vercel.app](https://convite.vercel.app)

---

## Fluxo do Site (5 Etapas)

### Loader — Aguarde... (~2s)
- Tela inicial com barra de progresso baseada no **carregamento real dos frames**
- Desaparece após 2s (mínimo) **ou** quando todos os frames carregam
- Música ambiente inicia na primeira interação (touch/click)

### Etapa 1 — Abrindo a Caixa de Presente
- 45 frames da caixa se abrindo (`frame_001.webp` a `frame_045.webp`)
- Arrastar para cima (touch/mouse) avança os frames
- Barra de progresso mostrando o avanço
- Se soltar **antes do frame 36**: animação volta ao início (caixa fecha)
- Se soltar **do frame 36 em diante**: animação continua automaticamente até o final
- Checkpoint no frame 36

### Etapa 2 — Introdução Poética (~9.6s)
- Fundo: `logo/saa.jpg`
- Texto em Playfair Display, linhas aparecendo uma a uma com fade-in (700ms entre cada)
- Pausa final de 4s antes de transicionar para a tela Machado

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

### Etapa 2.5 — Tela Machado de Assis (~5.3s)
- Fundo: `logo/saa.jpg`
- Texto "Aos quinze anos, tudo é infinito" aparecendo **letra por letra** (typewriter)
- Fonte Kapakana, cor branca com text-shadow
- Autor "— Machado de Assis (Dom Casmurro)" fadea após a digitação
- Transiciona automaticamente para o convite

### Etapa 3 — Convite Principal
- Card central com:
  - "Você é meu convidado(a)" (destaque)
  - Logo
  - Data: **04 de setembro** (Kapakana, rosa)
  - Horário: **20h** (Playfair Display, prata, abaixo da data)
  - "clique nos ícones e veja" (CTA visível, opacidade 0.7)
- Fundo decorado com:
  - `logo/Frame01.webp` com wiggle sutil (16s, ±0.5°)
  - 3 camadas de flores (19 flores cada) dispostas em moldura nas bordas
  - 2 flores maiores na camada frontal
  - Glows com `radial-gradient` + `mix-blend-mode: screen`
  - 8 pétalas caindo com trajetórias únicas (keyframes individuais)
- Botões: Dress Code, Presentes, Local (Maps), Confirmar Presença
  - **Dress Code:** Traje social — não usar roxa, lilás ou prata
  - **Presentes:** Sugestões + botão **Copiar chave PIX** (22 99863-9050 — Mariah Verly Teixeira)
  - **Local:** Google Maps embutido com endereço
  - **Confirmar Presença:** Modal com input de nome → redireciona para WhatsApp

---

## Performance e Otimização

### Imagens → WebP + Redução de 20%
Todas as imagens convertidas para WebP e posteriormente tiveram a resolução reduzida em 20% via Python/Pillow:

| Item | Tamanho |
|---|---|
| 45 frames | ~3.7 MB (829x1796, WebP) |
| Flores + pétalas | ~167 KB (WebP) |
| Frame01 + background | ~138 KB (WebP/JPG) |
| **Total imagens** | **~4 MB** |

### Música
- `musica/music.mp3` em looping, volume 40%
- Criada como singleton (uma única instância do Audio)
- Inicia na primeira interação do usuário (touch/click)

---

## Estrutura de Arquivos

```
/
├── .gitignore
├── README.md
├── index.html              # Página principal
├── style.css               # Estilos
├── script.js               # Interatividade
├── vercel.json             # Configuração Vercel
├── frames/                 # 45 frames da caixa abrindo (WebP)
│   ├── frame_001.webp
│   ├── frame_002.webp
│   ├── ...
│   └── frame_045.webp
├── flowers/                # Elementos decorativos
│   ├── flor1.webp          # 3 tipos de flor
│   ├── flor2.webp
│   ├── flor3.webp
│   ├── petala1.webp        # 3 tipos de pétala
│   ├── petala2.webp
│   └── petala3.webp
├── logo/                   # Logos e backgrounds
│   ├── logo01.webp
│   ├── Frame01.webp
│   ├── bg01.jpg
│   ├── saa.jpg
│   └── vestido.svg
└── musica/
    └── music.mp3
```

---

## Tecnologias

- HTML5 + CSS3 + JavaScript (vanilla, zero dependências)
- Google Fonts: Playfair Display, Montserrat, Kapakana
- WebP para imagens com compressão eficiente
- Hospedagem: Vercel (deploy automático via GitHub)

---

## Histórico de Alterações

### Sessão 1 — Implementação inicial
- Estrutura base: 3 estágios (caixa, intro, convite)
- 45 frames da caixa, drag touch/mouse, barra de progresso
- Texto poético com fade-in em cascata
- Card do convite com modais (Dress Code, Presentes, Local)
- Flores em 3 camadas com animações CSS

### Sessão 2 — Ajustes e melhorias
- Frame01.png adicionado como overlay com wiggle
- Flores aumentadas de 48 para 72 (24/camada), distribuídas em 4 zonas (moldura)
- 2 flores maiores na camada frontal
- Pétalas: keyframes individuais para evitar sobreposição
- Checkpoint do drag alterado para frame 36
- Música ambiente (loop, volume 40%)
- Modal de confirmação com input de nome → WhatsApp
- Layout do card reformulado (greeting, Kapakana na data, frase realocada)
- Loader com barra de progresso de 5s + "Aguarde..."

### Sessão 3 — Otimização de performance
- Todas as imagens convertidas para WebP lossless (transparência preservada)
- Resolução reduzida em ~28%
- Frames: 75 MB → 3.9 MB
- Flores/pétalas: PNG 4.7 MB → WebP 0.3 MB
- Música comprimida para 96kbps (9.3 MB → 2.8 MB)
- glow01.png removido (não utilizado, 14 MB)
- Projeto total: ~130 MB → ~9 MB
- CTA "clique nos ícones e veja" adicionado
- Tempo da intro poética aumentado (step 350→600ms)

### Sessão 4 — Performance mobile + telas extras
- **Loader:** Substituído por progresso real (preloading corrigido), desaparece em ~2s
- **Áudio:** Singleton (criado uma única vez, sem recriação a cada toque)
- **Intro poética:** step 600ms → 700ms, pausa final 2500ms → 4000ms
- **Nova tela Machado:** Typewriter letra por letra, fundo `saa.jpg`, texto branco (Kapakana, 36-76px), autor com fade
- **Frase do card removida:** "Aos quinze anos, tudo é infinito" movida para tela exclusiva
- **Fonte Kapakana:** Removida e readicionada ao Google Fonts (usada na tela Machado)
- **CSS:** Loader sem animação fixa, `touch-action: none` no drag, estilos Machado e PIX
- **Modal Presentes:** Sugestões atualizadas + botão copiar PIX com feedback "Copiado!"
- **Modal Dress Code:** Restrição de cores (não usar roxa, lilás ou prata)
- **CTA "clique nos ícones":** Opacidade 0.35 → 0.7 (mais visível)
- **Data/horário:** Separados em duas linhas (data + 20h), sem ponto médio
- **Imagens:** Resolução reduzida em 20% via Python/Pillow (LANCZOS, quality 85) — exceto `logo01.webp`

### Sessão 5 — Ajustes de texto, estilo e performance
- **Dress Code:** "Para se manter" → "Para manter" (removido conectivo)
- **Presentes:** "sua presença" → "Sua presença" (S maiúsculo)
- **Horário:** Removido `text-transform: uppercase` do CSS (20h com h minúsculo)
- **Tela Machado:** Texto do autor sem travessão, "em" no lugar de parênteses, *Dom Casmurro* em itálico (via `<em>`), `font-style: italic` removido do container
- **Fonte Machado:** Aumentada (clamp 59px-14vw-120px), line-height reduzido para 1.0
- **Duração Machado:** 3s → 5s → 4s + transição suave (crossfade 0.8s)
- **Performance:** Geração das flores antecipada para o início da tela Machado (~7s antes do fade-in), evitando travamento na stage 3


### Sessão 6 — Vídeo, botão e áudio multiplataforma
- **Drag removido:** Substituído por botão [Clique para abrir] com estilo vidro fosco
- **Frames -> Vídeo:** 45 imagens WebP substituídas por vídeo MP4 (720x1558) com suporte a hardware GPU
- **Vídeo adaptativo:** Wrapper div com aspect-ratio + object-fit cover para preencher largura da tela sem distorcer
- **Loader simplificado:** 2s fixos (sem dependência de contagem de frames)
- **Áudio:** Tag audio no HTML com preload auto + try/catch no play (compatível Android/iOS)
- **Progresso:** Barra de progresso removida