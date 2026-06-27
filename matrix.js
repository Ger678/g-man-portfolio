// G-MAN PORTFOLIO - Matrix Rain + Transitions + Interactions
// matrix.js

// ---- MATRIX RAIN ----
function initMatrixRain(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = fontSize + 'px Share Tech Mono,monospace';
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const b = Math.random();
      ctx.fillStyle = b > 0.95 ? '#fff' : b > 0.7 ? '#00ff41' : '#00c832';
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(draw, 35);
}

// ---- PARTICLE BACKGROUND (SAP page) ----
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);
  const particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 3 + 1, alpha: Math.random() * 0.5 + 0.1
    });
  }
  function drawParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,112,243,' + p.alpha + ')';
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    particles.forEach((a,i) => {
      particles.slice(i+1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(0,112,243,' + (0.1*(1-dist/120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ---- DISINTEGRATION TRANSITION (Matrix Exit) ----
function triggerMatrixExit(e) {
  e.preventDefault();
  const target = e.currentTarget.getAttribute('href');
  const overlay = document.getElementById('transitionOverlay');
  overlay.classList.remove('hidden');
  overlay.style.opacity = '0';
  overlay.style.background = '#000';
  overlay.style.transition = 'opacity 0.3s';
  const disCanvas = document.createElement('canvas');
  disCanvas.style.cssText = 'position:absolute;inset:0';
  disCanvas.width = window.innerWidth;
  disCanvas.height = window.innerHeight;
  overlay.innerHTML = '';
  overlay.appendChild(disCanvas);
  const label = document.createElement('div');
  label.style.cssText = 'font-family:Share Tech Mono,monospace;font-size:2rem;color:#00ff41;text-shadow:0 0 20px #00ff41;z-index:1;letter-spacing:.3em;position:relative';
  label.textContent = 'CONNECTING TO NODE...';
  overlay.appendChild(label);
  const ctx = disCanvas.getContext('2d');
  const chars = 'アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOP@#$%&*';
  const fontSize = 16;
  const cols = Math.floor(window.innerWidth / fontSize);
  const rows = Math.floor(window.innerHeight / fontSize);
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,disCanvas.width,disCanvas.height);
  ctx.font = fontSize + 'px Share Tech Mono,monospace';
  const messages = ['DECODING...', 'MORPHING...', 'ENTERING SAP NODE...', 'ACCESS GRANTED'];
  let step = 0;
  const anim = setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,disCanvas.width,disCanvas.height);
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        if (Math.random() < 0.05 + step * 0.01) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const br = Math.random();
          ctx.fillStyle = br > 0.9 ? '#fff' : br > 0.6 ? '#00ff41' : '#003b0f';
          ctx.fillText(char, col * fontSize, row * fontSize);
        }
      }
    }
    step++;
    if (step < messages.length * 15 && step % 15 === 0) label.textContent = messages[Math.floor(step/15)];
    if (step > 60) {
      clearInterval(anim);
      setTimeout(() => { window.location.href = target; }, 300);
    }
  }, 30);
  setTimeout(() => { overlay.style.opacity = '1'; }, 10);
}

// ---- SAP EXIT TRANSITION (back to Matrix) ----
function triggerSAPExit(e) {
  e.preventDefault();
  const target = e.currentTarget.getAttribute('href');
  const overlay = document.getElementById('transitionOverlay');
  overlay.classList.remove('hidden');
  overlay.style.opacity = '0';
  overlay.style.background = '#fff';
  overlay.style.transition = 'opacity 0.3s';
  overlay.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;gap:1rem"><div style="width:60px;height:60px;border:3px solid #0070f3;border-top-color:transparent;border-radius:50%;animation:spin .8s linear infinite"></div><p style="font-family:Share Tech Mono,monospace;color:#0070f3;font-size:1rem;letter-spacing:.2em">LOADING MATRIX...</p></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>';
  setTimeout(() => { overlay.style.opacity = '1'; }, 10);
  setTimeout(() => { window.location.href = target; }, 1000);
}

// ---- ANIMATED COUNTER ----
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (target === 100 ? '%' : '+');
      if (current >= target) clearInterval(interval);
    }, 25);
  });
}

// ---- TERMINAL TYPING EFFECT ----
function initTerminalTyping() {
  const el = document.getElementById('skillsOutput');
  if (!el) return;
  const skills = ['SAPUI5','CAP/CAPM','OData','Cloud Foundry','ABAP','Angular','Python','Node.js','OpenAI APIs','n8n'];
  let i = 0, text = '';
  const type = () => {
    if (i < skills.length) {
      text += (i > 0 ? ' · ' : '') + skills[i];
      el.textContent = text;
      i++;
      setTimeout(type, 180);
    }
  };
  setTimeout(type, 500);
}

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        e.target.querySelectorAll('.skill-fill,.bar-fill').forEach(bar => {
          bar.style.animation = 'none';                                                                                                    
          bar.offsetHeight;
          bar.style.animation = 'barGrow 1.5s ease both';
        });
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.card,.timeline-item,.edu-card,.skill-category,.stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)'; 
    el.style.transition = 'opacity 0.6s ease,transform 0.6s ease';
    observer.observe(el);
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('matrix-page')) {
    initMatrixRain('matrixCanvas');
    initTerminalTyping();
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) animateCounters(); });
    }, { threshold: 0.3 });
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) statsObserver.observe(statsSection);
  }
  if (document.body.classList.contains('sap-page')) {
    initParticles('particleCanvas');
  }
  initScrollReveal();
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});
