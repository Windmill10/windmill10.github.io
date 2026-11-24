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

// Aurora behind the top of the page (see aurora.js). Without WebGL2 the
// page simply has no glow.
(() => {
  const layer = document.querySelector('.fx');
  const canvas = layer && layer.querySelector('canvas');
  if (!layer || !canvas || !window.initAurora) return;
  const light = window.matchMedia('(prefers-color-scheme: light)');
  const options = () => ({
    stops: ['#9b6fe0', '#f0b45a', '#9b6fe0'],
    height: 0.4,
    layers: 2,
    speed: 0.8,
    blend: 0.6,
    opacity: light.matches ? 0.75 : 0.6,
    lightMode: light.matches
  });
  const aurora = window.initAurora(layer, canvas, options());
  if (aurora) light.addEventListener('change', () => aurora.set(options()));
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
