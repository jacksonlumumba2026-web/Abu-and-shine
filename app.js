/* ═══════════════════════════════════════════════════════════
   ABU-SHINE — MAIN JAVASCRIPT
   js/app.js
═══════════════════════════════════════════════════════════ */

/* ── LOADER ── */
(function() {
  const loader = document.getElementById('loader');
  const pct = document.getElementById('ld-pct');
  let p = 0;
  const iv = setInterval(() => {
    p = Math.min(p + Math.random() * 18, 100);
    if (pct) pct.textContent = Math.floor(p) + '%';
    if (p >= 100) {
      clearInterval(iv);
      setTimeout(() => loader && loader.classList.add('out'), 300);
    }
  }, 120);
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('out'), 2000);
  });
})();

/* ── CUSTOM CURSOR ── */
(function() {
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring) return;
  let rx = 0, ry = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; });
  (function raf() {
    rx += (cx - rx) * 0.13; ry += (cy - ry) * 0.13;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();
  document.querySelectorAll('a, button, .svc-card, .wc, .tc, .gi, .vt, .owner-photo, .logo-frame, .logo-box').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cx'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cx'));
  });
})();

/* ── PARTICLES ── */
(function() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 55; i++) {
    pts.push({
      x: Math.random() * 1920, y: Math.random() * 1080,
      vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
      r: Math.random() * 1.4 + .4, o: Math.random() * .35 + .08,
      gold: Math.random() > .55
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold ? `rgba(212,168,67,${p.o})` : `rgba(21,92,50,${p.o})`;
      ctx.fill();
    });
    // Draw connections
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(21,92,50,${.07 * (1 - d/110)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── COOKIE BANNER ── */
(function() {
  const COOKIE_KEY = 'abushine_cookies_accepted';
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Don't show if already accepted
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.style.display = 'none';
    return;
  }

  document.getElementById('ck-accept').addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    banner.classList.add('hide');
    setTimeout(() => banner.remove(), 500);
  });

  document.getElementById('ck-decline').addEventListener('click', () => {
    banner.classList.add('hide');
    setTimeout(() => banner.remove(), 500);
  });
})();

/* ── NAV ── */
(function() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));
})();

function toggleNav() {
  document.getElementById('mob-menu').classList.toggle('open');
  document.getElementById('hbg').classList.toggle('open');
}
function closeNav() {
  document.getElementById('mob-menu').classList.remove('open');
  document.getElementById('hbg').classList.remove('open');
}

/* ── SERVICE FILTER TABS ── */
function filterSvc(cat, btn) {
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.svc-card').forEach(c => {
    c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
  });
}

/* ── GALLERY FILTER ── */
function filterGal(cat, btn) {
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.gi').forEach(g => {
    g.style.display = (cat === 'all' || g.dataset.type === cat) ? '' : 'none';
  });
}

/* ── OPEN QUOTE (pre-fill form) ── */
function openQuote(service) {
  const sel = document.getElementById('f-service');
  if (sel) sel.value = service;
  const booking = document.getElementById('booking');
  if (booking) booking.scrollIntoView({ behavior: 'smooth' });
}

/* ── VIDEO PLAYER ── */
const vidTitles = ['Sofa Deep Clean Transformation', 'Bed Bug Pest Treatment', 'Office Commercial Clean', 'Full House Deep Clean'];
function playVid() {
  const ring = document.querySelector('.play-ring');
  const lbl = document.getElementById('play-lbl');
  if (ring) ring.style.background = '#145c32';
  if (lbl) lbl.textContent = 'Now Playing — Abu-Shine Showcase';
}
function switchVid(i, el) {
  document.querySelectorAll('.vt').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  const lbl = document.getElementById('play-lbl');
  if (lbl) lbl.textContent = 'Watch: ' + vidTitles[i];
  const ring = document.querySelector('.play-ring');
  if (ring) ring.style.background = 'rgba(255,255,255,.07)';
}

/* ── BOOKING FORM ── */
function submitForm() {
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const service = document.getElementById('f-service').value;
  if (!name || !phone || !service) {
    alert('Please fill in your name, phone number, and the service required.');
    return;
  }
  document.getElementById('b-form').style.display = 'none';
  document.getElementById('form-ok').style.display = 'block';
}

/* ── COUNTER ANIMATION ── */
function animateCnt(el) {
  const target = parseInt(el.dataset.target, 10);
  if (!target || el.dataset.animated) return;
  el.dataset.animated = '1';
  const suffix = el.dataset.suffix || '';
  let start = null;
  const dur = 1800;
  function step(ts) {
    if (!start) start = ts;
    const prog = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}

/* ── SCROLL REVEAL + COUNTER TRIGGER ── */
(function() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        // trigger any counters inside
        e.target.querySelectorAll('[data-target]').forEach(animateCnt);
        if (e.target.dataset.target) animateCnt(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.sr, .sl, .srr, .cnt-n').forEach(el => obs.observe(el));
})();

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-gld, .btn-ghost, .btn-grn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * .16}px, ${y * .16}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ── SMOOTH ACTIVE NAV LINK ── */
(function() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const links = document.querySelectorAll('.nav-links a');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => obs.observe(s));
})();
