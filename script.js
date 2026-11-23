// Pinwheel: turns slowly on its own, and faster when the pointer or the
// page scroll pushes it. The header mark shares the same rotation.
(() => {
  const rotors = [...document.querySelectorAll('.rotor')];
  const wheel = document.querySelector('.wheel');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!rotors.length || reduce.matches) return;

  const IDLE = 16;        // degrees per second at rest
  const MAX = 1300;       // speed limit
  const SETTLE = 0.9;     // how quickly speed returns to idle, per second
  let angle = 0;
  let speed = 620;        // opening gust
  let last = performance.now();
  let px = null, py = null, pt = 0;

  const push = (v) => { speed = Math.max(-MAX, Math.min(MAX, speed + v)); };

  // A pointer moving around the wheel pushes it in that direction.
  window.addEventListener('pointermove', (e) => {
    if (wheel && px !== null) {
      const r = wheel.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.width / 2;
      const rx = e.clientX - cx;
      const ry = e.clientY - cy;
      const dist = Math.hypot(rx, ry);
      if (dist < r.width * 1.1) {
        const dt = Math.max(e.timeStamp - pt, 8);
        const tangential = (rx * (e.clientY - py) - ry * (e.clientX - px)) / Math.max(dist, 24);
        push((tangential / dt) * 420);
      }
    }
    px = e.clientX; py = e.clientY; pt = e.timeStamp;
  }, { passive: true });

  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    push(dy * 1.6);
  }, { passive: true });

  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    speed += (IDLE - speed) * (1 - Math.exp(-dt * SETTLE));
    angle = (angle + speed * dt) % 360;
    const t = `rotate(${angle.toFixed(2)}deg)`;
    for (const el of rotors) el.style.transform = t;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
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
