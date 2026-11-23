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
