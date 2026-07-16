# Convite 15 Anos — Mariah Verly

Convite online interativo para aniversário de 15 anos de Mariah Verly.

**URL:** [https://convite.vercel.app](https://convite.vercel.app)

---

## Fluxo do Site (4 Etapas)

### Loader — Aguarde...
- Tela inicial com barra de progresso animada (5s) e texto "Aguarde..."
- Só desaparece quando os 5s passam **E** o primeiro frame carrega

### Etapa 1 — Abrindo a Caixa de Presente
- 45 frames da caixa se abrindo (`frame_001.webp` a `frame_045.webp`)
- Arrastar para cima (touch/mouse) avança os frames
- Barra de progresso mostrando o avanço
- Se soltar **antes do frame 36**: animação volta ao início (caixa fecha)
- Se soltar **do frame 36 em diante**: animação continua automaticamente até o final
- Checkpoint no frame 36

### Etapa 2 — Introdução Poética (~7s)
- Fundo: `logo/saa.jpg`
- Texto em Playfair Display, linhas aparecendo uma a uma com fade-in (600ms entre cada)
- Pausa final de 2.5s antes de transicionar para o convite

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

### Etapa 3 — Convite Principal
- Card central com:
  - "Você é meu convidado(a)" (destaque)
  - Logo
  - Data: 04 de setembro · 20h (fonte Kapakana)
  - "Aos quinze anos, tudo é infinito" — Machado de Assis
  - "clique nos ícones e veja" (CTA sutil)
- Fundo decorado com:
  - `logo/Frame01.webp` com wiggle sutil (16s, ±0.5°)
  - 3 camadas de flores (19 flores cada) dispostas em moldura nas bordas
  - 2 flores maiores na camada frontal
  - Glows com `radial-gradient` + `mix-blend-mode: screen`
  - 8 pétalas caindo com trajetórias únicas (keyframes individuais)
- Botões: Dress Code, Presentes, Local (Maps), Confirmar Presença
- **Confirmar Presença:** Modal com input de nome → redireciona para WhatsApp com o nome na mensagem

---

## Performance e Otimização

### Imagens → WebP Lossless
Todas as imagens foram convertidas para WebP com transparência preservada e resolução reduzida em ~28%:

| Item | Antes | Depois |
|---|---|---|
| 45 frames | ~75 MB (JPEG) | **~3.9 MB** (WebP) |
| Flores + pétalas | ~19 MB (PNG) | **~0.3 MB** (WebP) |
| Frame01 + logo | ~6 MB (PNG) | **~0.2 MB** (WebP) |
| Backgrounds | ~10 MB (JPEG) | **~1.8 MB** (JPEG) |
| glow01.png (não usado) | 14 MB | **removido** |
| Música | 9.3 MB | **2.8 MB** (96kbps) |
| **Total** | **~130 MB** | **~9 MB** |

### Música
- `musica/music.mp3` em looping, volume 40%
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
- WebP lossless para imagens com transparência
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
