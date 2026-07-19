(function() {
  'use strict';

  const TOTAL_FRAMES = 45;
  const INTRO_LINES = [
    'SOB O BRILHO DAS LUZES',
    'E O ENCANTO DO GLITTER,',
    'UM NOVO CAPÍTULO',
    'COMEÇA A SER ESCRITO.',
    '',
    'SEJA BEM-VINDO(A)',
    'À NOITE QUE CELEBRA',
    'OS 15 ANOS',
    'DE MARIAH VERLY.'
  ];

  const FLOWER_TYPES = ['flor1.webp', 'flor2.webp', 'flor3.webp'];
  const PETAL_TYPES  = ['petala1.webp', 'petala2.webp', 'petala3.webp'];

  let currentFrame = 0;
  let isDragging = false;
  let startY = 0;

  const loader = document.getElementById('loader');
  const stage1 = document.getElementById('stage-1');
  const stage2 = document.getElementById('stage-2');
  const stage3 = document.getElementById('stage-3');
  const stageMachado = document.getElementById('stage-machado');
  const loaderFill = document.querySelector('.loader-fill');
  const frameImg = document.getElementById('frame-img');
  const dragBtn = document.getElementById('drag-btn');
  const progressFill = document.getElementById('progress-fill');
  const introText = document.getElementById('intro-text');
  const overlay = document.getElementById('overlay');

  /* ─── PRÉ-CARREGAMENTO ─── */

  let preloadedCount = 0;
  let loaderMinShown = false;

  function preloadAllFrames() {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = 'frames/frame_' + num + '.webp';
      img.onload = img.onerror = function() {
        preloadedCount++;
        updateLoaderProgress();
        tryHideLoader();
      };
    }
  }

  function updateLoaderProgress() {
    if (!loaderFill) return;
    const pct = Math.min(100, (preloadedCount / TOTAL_FRAMES) * 100);
    loaderFill.style.width = pct + '%';
  }

  function tryHideLoader() {
    if (preloadedCount >= TOTAL_FRAMES) {
      loader.classList.add('hidden');
      return;
    }
    if (preloadedCount >= 3 && loaderMinShown) {
      loader.classList.add('hidden');
    }
  }

  setTimeout(function() {
    loaderMinShown = true;
    tryHideLoader();
  }, 2000);

  preloadAllFrames();

  /* ─── STAGE 1: DRAG FRAMES ─── */

  function setFrame(index) {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    currentFrame = clamped;
    const num = String(clamped + 1).padStart(3, '0');
    frameImg.src = 'frames/frame_' + num + '.webp';
    progressFill.style.width = ((clamped / (TOTAL_FRAMES - 1)) * 100) + '%';
  }

  function onDragStart(clientY) {
    isDragging = true;
    startY = clientY;
    dragBtn.style.opacity = '0';
  }

  function onDragMove(clientY) {
    if (!isDragging) return;
    const delta = startY - clientY;
    if (delta <= 0) return;
    const frameAdvance = Math.floor((delta / window.innerHeight) * TOTAL_FRAMES);
    setFrame(frameAdvance);

    if (currentFrame >= TOTAL_FRAMES - 1) {
      isDragging = false;
      dragBtn.style.display = 'none';
      showStage2();
    }
  }

  const CHECKPOINT = 36;

  function onDragEnd() {
    isDragging = false;
    if (currentFrame >= TOTAL_FRAMES - 1) return;

    if (currentFrame >= CHECKPOINT) {
      dragBtn.style.display = 'none';
      animateForward();
    } else {
      animateBack();
    }
  }

  function animateForward() {
    if (currentFrame < TOTAL_FRAMES - 1) {
      setFrame(currentFrame + 1);
      requestAnimationFrame(animateForward);
    } else {
      showStage2();
    }
  }

  function animateBack() {
    if (currentFrame > 0) {
      setFrame(currentFrame - 1);
      requestAnimationFrame(animateBack);
    } else {
      dragBtn.style.opacity = '1';
    }
  }

  var musicStarted = false;
  var bgMusic = new Audio('musica/music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.4;

  function startMusic() {
    if (musicStarted) return;
    musicStarted = true;
    bgMusic.play().catch(function(){});
  }

  document.addEventListener('touchstart', function(e) {
    startMusic();
    onDragStart(e.touches[0].clientY);
  }, { passive: true });

  document.addEventListener('touchmove', function(e) {
    onDragMove(e.touches[0].clientY);
  }, { passive: true });

  document.addEventListener('touchend', onDragEnd, { passive: true });

  document.addEventListener('mousedown', function(e) {
    startMusic();
    onDragStart(e.clientY);
  });

  document.addEventListener('mousemove', function(e) {
    onDragMove(e.clientY);
  });

  document.addEventListener('mouseup', onDragEnd);

  /* ─── STAGE 2: INTRO ANIMATION ─── */

  function showStage2() {
    stage1.classList.remove('active');
    stage2.classList.add('active');

    buildIntroText();
    animateIntro();
  }

  function buildIntroText() {
    introText.innerHTML = '';
    INTRO_LINES.forEach(function(line) {
      if (line === '') {
        const spacer = document.createElement('div');
        spacer.className = 'spacer';
        introText.appendChild(spacer);
        return;
      }
      const p = document.createElement('p');
      p.textContent = line;
      introText.appendChild(p);
    });
  }

  function animateIntro() {
    const paragraphs = introText.querySelectorAll('p');
    let delay = 0;
    const step = 700;

    paragraphs.forEach(function(p) {
      setTimeout(function() {
        p.classList.add('visible');
      }, delay);
      delay += step;
    });

    var totalDuration = delay + 4000;

    setTimeout(function() {
      stage2.classList.remove('active');
      stageMachado.classList.add('active');
      startMachadoTypewriter();
    }, totalDuration);
  }

  /* ─── STAGE 3: GERAR FLORES ─── */

  function generateFlowers() {
    const layers = [
      { id: 'layer-back', cls: 'f-back', count: 19, baseSize: 18, blur: 6, op: 1 },
      { id: 'layer-mid',  cls: 'f-mid',  count: 19, baseSize: 14, blur: 2, op: 1  },
      { id: 'layer-front',cls: 'f-front',count: 19, baseSize: 10, blur: 0, op: 1 }
    ];

    layers.forEach(function(layer) {
      const container = document.getElementById(layer.id);
      if (!container) return;
      container.innerHTML = '';

      // 8 left, 8 right
      var zones = [
        { xRange: [0, 12],  yRange: [5, 95],  count: 6 },  // esquerda
        { xRange: [88, 100], yRange: [5, 95],  count: 6 },  // direita
        { xRange: [15, 85],  yRange: [0, 10],  count: 4 },  // topo
        { xRange: [15, 85],  yRange: [90, 100], count: 3 }  // fundo
      ];

      var flowerIndex = 0;

      zones.forEach(function(zone) {
        for (var i = 0; i < zone.count; i++) {
          var img = document.createElement('img');
          var typeIdx = flowerIndex % FLOWER_TYPES.length;
          img.src = 'flowers/' + FLOWER_TYPES[typeIdx];
          img.className = 'flower ' + layer.cls;

          var leftPos = zone.xRange[0] + Math.random() * (zone.xRange[1] - zone.xRange[0]);
          var topPos = zone.yRange[0] + Math.random() * (zone.yRange[1] - zone.yRange[0]);

          var sizeMultiplier = 1.1 + Math.random() * 2.9;
          var sizeVw = layer.baseSize * sizeMultiplier;

          img.style.left = leftPos + '%';
          img.style.top = topPos + '%';
          img.style.width = 'clamp(40px, ' + sizeVw + 'vw, 300px)';
          img.style.opacity = layer.op;
          if (layer.blur > 0) {
            img.style.filter = 'blur(' + layer.blur + 'px)';
          }
          img.setAttribute('data-idx', flowerIndex);

          container.appendChild(img);
          flowerIndex++;
        }
      });

      // 2 flores maiores na camada front
      if (layer.cls === 'f-front') {
        var bigPositions = [
          { left: 4, top: 6 },
          { left: 80, top: 82 }
        ];
        bigPositions.forEach(function(pos) {
          var big = document.createElement('img');
          big.src = 'flowers/' + FLOWER_TYPES[flowerIndex % FLOWER_TYPES.length];
          big.className = 'flower f-front';
          big.style.left = pos.left + '%';
          big.style.top = pos.top + '%';
          big.style.width = 'clamp(140px, 28vw, 380px)';
          big.style.opacity = '0.9';
          container.appendChild(big);
          flowerIndex++;
        });
      }
    });

    // Glow — atrás de todas as flores
    var glowContainer = document.getElementById('layer-glow');
    if (glowContainer) {
      glowContainer.innerHTML = '';
      var glowColors = ['rgba(255, 121, 186, 0.45)', 'rgba(255, 121, 186, 0.35)'];
      for (var g = 0; g < 2; g++) {
        var glow = document.createElement('div');
        glow.className = 'glow';
        var size = 500 + Math.random() * 600;
        glow.style.width = size + 'px';
        glow.style.height = size + 'px';
        glow.style.left = (10 + Math.random() * 60) + '%';
        glow.style.top = (10 + Math.random() * 60) + '%';
        glow.style.background = 'radial-gradient(circle, ' + glowColors[g] + ' 0%, transparent 70%)';
        glow.style.animation = 'glowPulse ' + (12 + Math.random() * 10) + 's ' + (Math.random() * 5) + 's ease-in-out infinite';
        glowContainer.appendChild(glow);
      }
    }

    // Glow Screen — opostos, metade fora da tela
    var glowScreenContainer = document.getElementById('layer-glow-screen');
    if (glowScreenContainer) {
      glowScreenContainer.innerHTML = '';
      var positions = ['top', 'bottom'];
      var screenColors = ['rgba(255, 158, 158, 0.5)', 'rgba(255, 158, 158, 0.35)'];
      for (var gs = 0; gs < 2; gs++) {
        var gsGlow = document.createElement('div');
        gsGlow.className = 'glow-screen';
        var size = 600 + Math.random() * 500;
        gsGlow.style.width = size + 'px';
        gsGlow.style.height = size + 'px';
        gsGlow.style.left = ((20 + Math.random() * 30) - 15) + '%';
        gsGlow.style.background = 'radial-gradient(circle, ' + screenColors[gs] + ' 0%, transparent 70%)';
        if (positions[gs] === 'top') {
          gsGlow.style.top = (-size * 0.45) + 'px';
        } else {
          gsGlow.style.bottom = (-size * 0.45) + 'px';
        }
        gsGlow.style.animation = 'glowScreenMove ' + (14 + Math.random() * 10) + 's ' + (Math.random() * 4) + 's ease-in-out infinite alternate';
        glowScreenContainer.appendChild(gsGlow);
      }
    }

    // Pétalas
    var petalContainer = document.getElementById('layer-petals');
    if (petalContainer) {
      petalContainer.innerHTML = '';
      for (var p = 0; p < 8; p++) {
        var petal = document.createElement('img');
        var ptIdx = p % PETAL_TYPES.length;
        petal.src = 'flowers/' + PETAL_TYPES[ptIdx];
        petal.className = 'petal';
        petal.setAttribute('data-petal', p);
        petalContainer.appendChild(petal);
      }
    }
  }

  /* ─── STAGE 3: FLOWER ANIMATIONS ─── */

  function initFlowerAnimations() {
    var flowers = document.querySelectorAll('.flower');
    flowers.forEach(function(flower) {
      var duration = 10 + Math.random() * 15;
      var delay = Math.random() * 10;

      if (flower.classList.contains('f-back')) {
        flower.style.animation = 'floatBack ' + duration + 's ' + delay + 's ease-in-out infinite';
      } else if (flower.classList.contains('f-mid')) {
        flower.style.animation = 'floatMid ' + duration + 's ' + delay + 's ease-in-out infinite';
      } else if (flower.classList.contains('f-front')) {
        flower.style.animation = 'floatFront ' + duration + 's ' + delay + 's ease-in-out infinite';
      }
    });

    var petals = document.querySelectorAll('.petal');
    var minX = 2;
    var maxX = 90;
    var step = (maxX - minX) / petals.length;
    var petalSheet = document.createElement('style');
    var kfs = '';
    petals.forEach(function(petal, idx) {
      var startX = minX + idx * step;
      var direction = idx % 2 === 0 ? -1 : 1;
      var drift = (30 + Math.random() * 60) * direction;
      var duration = 14 + Math.random() * 10;
      var delay = Math.random() * 8;
      var size = (43 + Math.random() * 122);
      var name = 'petalU' + idx;
      kfs += '@keyframes ' + name + '{0%{transform:translate(0px,-10vh) rotate(0deg);opacity:0}5%{transform:translate(0px,-10vh) rotate(0deg);opacity:1}95%{transform:translate(' + drift + 'px,110vh) rotate(380deg);opacity:1}100%{transform:translate(' + drift + 'px,115vh) rotate(380deg);opacity:0}}';
      petal.style.width = size + 'px';
      petal.style.left = startX + '%';
      petal.style.top = '-10%';
      petal.style.animation = name + ' ' + duration + 's ' + delay + 's linear infinite';
    });
    petalSheet.textContent = kfs;
    document.head.appendChild(petalSheet);
  }

  /* ─── KEYFRAMES ─── */

  var styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes glowPulse {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
      25% { transform: translate(30px, -20px) scale(1.15); opacity: 0.6; }
      50% { transform: translate(-15px, 25px) scale(0.9); opacity: 0.35; }
      75% { transform: translate(20px, 15px) scale(1.1); opacity: 0.5; }
    }
    @keyframes floatBack {
      0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
      25% { transform: translateY(-12px) rotate(4deg) scale(1.03); }
      50% { transform: translateY(-6px) rotate(-3deg) scale(0.97); }
      75% { transform: translateY(-15px) rotate(2deg) scale(1.02); }
    }
    @keyframes floatMid {
      0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
      30% { transform: translateY(-10px) rotate(-5deg) scale(1.04); }
      60% { transform: translateY(-4px) rotate(3deg) scale(0.96); }
      80% { transform: translateY(-12px) rotate(-2deg) scale(1.03); }
    }
    @keyframes floatFront {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      20% { transform: translateY(-6px) rotate(3deg); }
      40% { transform: translateY(-2px) rotate(-2deg); }
      60% { transform: translateY(-8px) rotate(1deg); }
      80% { transform: translateY(-3px) rotate(-3deg); }
    }
    @keyframes glowScreenMove {
      0% { transform: translate(0px, 0px) scale(1); opacity: 0.25; }
      50% { transform: translate(15px, -8px) scale(1.08); opacity: 0.5; }
      100% { transform: translate(-10px, 5px) scale(0.95); opacity: 0.3; }
    }
  `;
  document.head.appendChild(styleSheet);

  /* ─── MODAIS ─── */

  var modalTriggers = document.querySelectorAll('[data-modal]');
  var modals = document.querySelectorAll('.modal');
  var closeButtons = document.querySelectorAll('.modal-close');

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    overlay.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    modals.forEach(function(m) { m.classList.remove('active'); });
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(function(btn) {
    btn.addEventListener('click', function() {
      openModal(this.getAttribute('data-modal'));
    });
  });

  closeButtons.forEach(function(btn) {
    btn.addEventListener('click', closeAllModals);
  });

  overlay.addEventListener('click', closeAllModals);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAllModals();
  });

  var confirmSend = document.getElementById('confirm-send');
  var guestName = document.getElementById('guest-name');

  function sendWhatsApp() {
    var name = guestName.value.trim();
    if (!name) {
      guestName.focus();
      guestName.style.borderColor = 'var(--rosa)';
      return;
    }
    var msg = 'Ol%C3%A1%2C%20meu%20nome%20%C3%A9%20' + encodeURIComponent(name) + '%2C%20gostaria%20de%20confirmar%20minha%20presen%C3%A7a%20no%20anivers%C3%A1rio%20da%20Mariah%20Verly';
    closeAllModals();
    window.open('https://wa.me/5522999573512?text=' + msg, '_blank');
    guestName.value = '';
    guestName.style.borderColor = '';
  }

  if (confirmSend) {
    confirmSend.addEventListener('click', sendWhatsApp);
  }

  if (guestName) {
    guestName.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') sendWhatsApp();
    });
  }

  /* ─── STAGE MACHADO: TYPEWRITER ─── */

  function startMachadoTypewriter() {
    var text = 'Aos quinze anos, tudo é infinito';
    var author = 'Machado de Assis em <em>Dom Casmurro</em>';
    var textEl = document.querySelector('.machado-text');
    var authorEl = document.querySelector('.machado-author');
    if (!textEl || !authorEl) return;

    textEl.innerHTML = '';
    authorEl.textContent = '';
    authorEl.classList.remove('visible');

    var idx = 0;
    var typeTimer = setInterval(function() {
      if (idx < text.length) {
        textEl.textContent = text.substring(0, idx + 1);
        idx++;
      } else {
        clearInterval(typeTimer);
        textEl.innerHTML = text + '<span class="cursor"></span>';
        setTimeout(function() {
          authorEl.innerHTML = author;
          authorEl.classList.add('visible');
        }, 300);
        setTimeout(function() {
          stageMachado.classList.remove('active');
          stage3.classList.add('active');
          setTimeout(function() {
            generateFlowers();
            initFlowerAnimations();
          }, 500);
        }, 5000);
      }
    }, 70);
  }

  /* ─── COPIAR PIX ─── */

  var btnPix = document.getElementById('btn-copy-pix');
  var pixLabel = document.getElementById('pix-label');

  if (btnPix) {
    btnPix.addEventListener('click', function() {
      navigator.clipboard.writeText('22 99863-9050').then(function() {
        pixLabel.textContent = 'Copiado!';
        btnPix.classList.add('copied');
        setTimeout(function() {
          pixLabel.textContent = 'Copiar chave PIX';
          btnPix.classList.remove('copied');
        }, 2000);
      }).catch(function() {
        pixLabel.textContent = 'Erro ao copiar';
        setTimeout(function() {
          pixLabel.textContent = 'Copiar chave PIX';
        }, 2000);
      });
    });
  }

})();
