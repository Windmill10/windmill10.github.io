const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Split the opening lines into words so they can come into focus in turn.
(() => {
  const lines = [...document.querySelectorAll('.statement')];
  if (reduceMotion) {
    for (const el of lines) el.classList.add('split');
    return;
  }
  let i = 0;
  for (const el of lines) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, k) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.style.setProperty('--i', i++);
      span.textContent = w;
      el.append(span, k < words.length - 1 ? ' ' : '');
    });
    el.classList.add('split');
  }
})();

// Decoration behind the top of the page. The variant comes from data-fx on
// <html>, which the inline script in the head sets from ?fx= or the default.
(() => {
  const fx = document.documentElement.dataset.fx;
  const layer = document.querySelector('.fx');
  const canvas = layer && layer.querySelector('canvas');
  if (!layer || !canvas || !fx || fx === 'none') return;
  const light = window.matchMedia('(prefers-color-scheme: light)');

  const auroras = {
    aurora: ['#9b6fe0', '#f0b45a', '#9b6fe0'],
    aurora3: ['#9b6fe0', '#43c6b5', '#f0b45a']
  };
  if (auroras[fx] && window.initAurora) {
    const options = () => ({
      stops: auroras[fx],
      height: 0.4,
      layers: 2,
      speed: 0.8,
      blend: 0.6,
      opacity: light.matches ? 0.75 : 0.6,
      lightMode: light.matches
    });
    const aurora = window.initAurora(layer, canvas, options());
    if (aurora) light.addEventListener('change', () => aurora.set(options()));
    return;
  }

  if (fx === 'dots') {
    const ctx = canvas.getContext('2d');
    const GAP = 28;
    const REACH = 190;
    const mix = (a, b, t) => a + (b - a) * t;
    const lavender = [201, 167, 236];
    const amber = [233, 184, 114];
    let w = 0, h = 0, ratio = 1;
    let px = -9999, py = -9999, heat = 0, target = 0;
    let raf = 0, visible = true;

    const resize = () => {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      w = layer.clientWidth;
      h = layer.clientHeight;
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      draw(performance.now());
    };

    const draw = (now) => {
      const t = now / 1000;
      const base = light.matches ? [75, 93, 105] : [155, 172, 182];
      heat += (target - heat) * 0.08;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const offsetX = (w % GAP) / 2;
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = offsetX + GAP / 2; x < w; x += GAP) {
          const near = Math.max(0, 1 - Math.hypot(x - px, y - py) / REACH) * heat;
          const ripple = reduceMotion ? 0 : Math.max(0, Math.sin(x * 0.011 + y * 0.019 - t * 0.55) - 0.82) / 0.18;
          const glow = Math.max(near, ripple * 0.5);
          const warm = near * near;
          const r = mix(mix(base[0], lavender[0], glow), amber[0], warm);
          const g = mix(mix(base[1], lavender[1], glow), amber[1], warm);
          const b = mix(mix(base[2], lavender[2], glow), amber[2], warm);
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.2 + 0.75 * glow})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.3 + 2.2 * near + 0.5 * ripple, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const frame = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };

    window.addEventListener('pointermove', (e) => {
      const rect = layer.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      target = py < rect.height ? 1 : 0;
      wake();
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { target = 0; });
    new ResizeObserver(resize).observe(layer);
    new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) wake();
    }).observe(layer);
    document.addEventListener('visibilitychange', wake);
    resize();
    wake();
  }
})();

// Mark the nav link of the section currently being read.
(() => {
  const links = [...document.querySelectorAll('.top nav a[href^="#"]')];
  const sections = links
    .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);
  if (!sections.length) return;

  let queued = false;
  const update = () => {
    queued = false;
    const line = window.innerHeight * 0.3;
    let current = null;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) current = s;
    }
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atEnd) current = sections[sections.length - 1];
    for (const a of links) {
      const on = current && a.getAttribute('href') === `#${current.id}`;
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    }
  };
  const onScroll = () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
