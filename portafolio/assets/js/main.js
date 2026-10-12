/* =========================================================
   PORTAFOLIO — Interacciones compartidas
   Se carga en todas las páginas antes del script propio de cada una.
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* almacenamiento no disponible */ } }
  };

  /* ---------- Toast ---------- */
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  /* ---------- Control segmentado con píldora deslizante ---------- */
  function segmented(container, onChange) {
    const pill = document.createElement('span');
    pill.className = 'seg-pill';
    container.prepend(pill);
    const btns = $$('.seg-btn', container);
    const place = () => {
      const a = $('.seg-btn.active', container);
      if (!a) return;
      pill.style.width = a.offsetWidth + 'px';
      pill.style.transform = `translateX(${a.offsetLeft}px)`;
    };
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => {
        x.classList.toggle('active', x === b);
        x.setAttribute('aria-selected', String(x === b));
      });
      place();
      b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
      if (onChange) onChange(b.dataset.value, b);
    }));
    window.addEventListener('resize', place);
    if (document.fonts) document.fonts.ready.then(place);
    requestAnimationFrame(place);
    return { place };
  }

  /* ---------- Suscripción a scroll (un solo rAF) ---------- */
  const scrollFns = [];
  const onScroll = fn => { scrollFns.push(fn); fn(window.scrollY); };

  /* ---------- Tilt 3D ---------- */
  function bindTilt(el) {
    if (!finePointer || reduceMotion || el._tilt) return;
    el._tilt = true;
    const max = parseFloat(el.dataset.tilt) || 6;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.transition = 'transform .15s linear, border-color .4s, opacity .4s';
      el.style.transform = `perspective(1000px) rotateX(${(.5 - py) * max}deg) rotateY(${(px - .5) * max}deg)`;
      el.style.setProperty('--gx', px * 100 + '%');
      el.style.setProperty('--gy', py * 100 + '%');
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform .8s cubic-bezier(.16,1,.3,1), border-color .4s, opacity .4s';
      el.style.transform = '';
    });
  }

  /* ---------- Efecto magnético ---------- */
  function bindMagnetic(el) {
    if (!finePointer || reduceMotion || el._mag) return;
    el._mag = true;
    const s = parseFloat(el.dataset.magnetic) || .3;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * s}px, ${y * s}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  }

  /* ---------- Contador animado ---------- */
  function countUp(el) {
    const raw = el.dataset.count;
    const end = parseFloat(raw);
    const dec = (raw.split('.')[1] || '').length;
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const fmt = v => pre + Number(v.toFixed(dec)).toLocaleString('es') + suf;
    if (reduceMotion) { el.textContent = fmt(end); return; }
    const dur = parseFloat(el.dataset.duration) || 2000;
    const t0 = performance.now();
    const step = now => {
      const t = clamp((now - t0) / dur, 0, 1);
      const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = fmt(end * e);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Dividir texto en palabras ---------- */
  function splitWords(el) {
    const nodes = Array.from(el.childNodes);
    el.textContent = '';
    let i = 0;
    const wrap = node => {
      const w = document.createElement('span');
      w.className = 'w';
      const inner = document.createElement('span');
      inner.style.setProperty('--i', i++);
      inner.appendChild(node);
      w.appendChild(inner);
      el.appendChild(w);
    };
    const pushWords = (text, template) => {
      text.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(' ')); return; }
        if (template) {
          const c = template.cloneNode(false);
          c.textContent = part;
          wrap(c);
        } else wrap(document.createTextNode(part));
      });
    };
    nodes.forEach(n => {
      if (n.nodeType === 3) pushWords(n.textContent);
      else if (n.nodeName === 'BR') el.appendChild(n);
      else if (n.nodeType === 1) pushWords(n.textContent, n);
    });
  }

  /* ---------- Revelado al hacer scroll ---------- */
  let isReady = false;
  const pending = [];
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('is-in');
      io.unobserve(el);
      if (el.hasAttribute('data-count')) countUp(el);
      if (el.hasAttribute('data-stagger')) setTimeout(() => el.classList.add('revealed'), 1600 + el.children.length * 90);
      el.dispatchEvent(new CustomEvent('reveal'));
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' }) : null;

  function observe(el) {
    if (!io) { el.classList.add('is-in'); el.dispatchEvent(new CustomEvent('reveal')); return; }
    if (isReady) io.observe(el); else pending.push(el);
  }

  /* Prepara elementos nuevos (también los que crean los scripts de cada página) */
  function enhance(scope = document) {
    $$('[data-split]', scope).forEach(el => { if (!el._split) { el._split = true; splitWords(el); } });
    $$('[data-stagger]', scope).forEach(el => Array.from(el.children).forEach((c, i) => c.style.setProperty('--si', i)));
    $$('[data-count]', scope).forEach(el => { el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || ''); });
    $$('[data-reveal], [data-split], [data-count], [data-stagger], [data-observe]', scope).forEach(observe);
    $$('[data-tilt]', scope).forEach(bindTilt);
    $$('[data-magnetic]', scope).forEach(bindMagnetic);
  }

  /* ---------- Inicialización ---------- */
  function init() {
    /* Tema */
    $$('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      store.set('theme', next);
      document.dispatchEvent(new CustomEvent('themechange'));
    }));

    /* Enlace activo + píldora del menú */
    const page = body.dataset.page;
    $$('[data-nav]').forEach(a => {
      const on = a.dataset.nav === page;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page');
    });
    const links = $('.nav-links');
    if (links) {
      const pill = document.createElement('span');
      pill.className = 'nav-pill';
      links.prepend(pill);
      const active = $('a.active', links);
      const move = el => {
        if (!el) { pill.style.opacity = 0; return; }
        pill.style.opacity = 1;
        pill.style.width = el.offsetWidth + 'px';
        pill.style.transform = `translateX(${el.offsetLeft}px)`;
      };
      $$('a', links).forEach(a => a.addEventListener('mouseenter', () => move(a)));
      links.addEventListener('mouseleave', () => move(active));
      requestAnimationFrame(() => move(active));
      if (document.fonts) document.fonts.ready.then(() => move(active));
      window.addEventListener('resize', () => move(active));
    }

    /* Menú móvil */
    const burger = $('.burger');
    const closeMenu = () => { body.classList.remove('menu-open'); burger && burger.setAttribute('aria-expanded', 'false'); };
    if (burger) burger.addEventListener('click', () => {
      const open = body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    /* Marquees: duplica el contenido para el bucle infinito */
    $$('.marquee-track').forEach(t => Array.from(t.children).forEach(c => {
      const clone = c.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      t.appendChild(clone);
    }));

    /* Año del footer */
    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

    /* Transiciones entre páginas */
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || a.target === '_blank' || a.hasAttribute('download') || /^(mailto:|tel:|https?:|javascript:)/i.test(href)) return;
      e.preventDefault();
      closeMenu();
      body.classList.add('is-leaving');
      setTimeout(() => { window.location.href = a.href; }, reduceMotion ? 0 : 650);
    });
    window.addEventListener('pageshow', e => { if (e.persisted) body.classList.remove('is-leaving', 'menu-open'); });

    /* Cursor personalizado */
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    if (finePointer && !reduceMotion && dot && ring) {
      const label = $('span', ring);
      let mx = -100, my = -100, rx = -100, ry = -100;
      window.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        body.classList.add('has-cursor');
      }, { passive: true });
      document.documentElement.addEventListener('mouseleave', () => body.classList.remove('has-cursor'));
      const loop = () => {
        rx = lerp(rx, mx, .2); ry = lerp(ry, my, .2);
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        requestAnimationFrame(loop);
      };
      loop();
      document.addEventListener('pointerover', e => {
        const t = e.target.closest('[data-cursor-text]');
        const h = e.target.closest('a, button, [data-cursor], label, .chip, input[type="range"]');
        body.classList.toggle('cursor-text', !!t);
        body.classList.toggle('cursor-hover', !!h && !t);
        if (t) label.textContent = t.dataset.cursorText;
      });
    }

    /* Spotlight en tarjetas (delegado) */
    document.addEventListener('pointermove', e => {
      const el = e.target.closest && e.target.closest('.spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    }, { passive: true });

    /* Profundidad con el ratón */
    const depthEls = $$('[data-depth]');
    if (depthEls.length && finePointer && !reduceMotion) {
      window.addEventListener('pointermove', e => {
        const x = e.clientX / innerWidth - .5;
        const y = e.clientY / innerHeight - .5;
        depthEls.forEach(el => {
          const d = parseFloat(el.dataset.depth) || 20;
          el.style.transform = `translate3d(${x * d}px, ${y * d}px, 0)`;
        });
      }, { passive: true });
    }

    /* Texto que se ilumina con el scroll */
    $$('[data-fill]').forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      const spans = words.map((w, i) => {
        const s = document.createElement('span');
        s.className = 'fw';
        s.textContent = w;
        el.appendChild(s);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
        return s;
      });
      onScroll(() => {
        const r = el.getBoundingClientRect();
        const p = clamp((innerHeight * .85 - r.top) / (r.height + innerHeight * .2), 0, 1);
        const n = Math.round(p * spans.length);
        spans.forEach((s, i) => s.classList.toggle('on', i < n));
      });
    });

    /* Parallax vertical */
    const parallax = $$('[data-parallax]');
    if (parallax.length && !reduceMotion) onScroll(() => {
      parallax.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || .2;
        const off = (r.top + r.height / 2 - innerHeight / 2) * speed;
        el.style.translate = `0 ${off.toFixed(1)}px`;
      });
    });

    /* Sección de scroll horizontal */
    $$('[data-hscroll]').forEach(sec => {
      const track = $('.hscroll-track', sec);
      let dist = 0, enabled = false;
      const measure = () => {
        enabled = innerWidth > 900 && !reduceMotion;
        sec.classList.toggle('hscroll--static', !enabled);
        if (!enabled) { sec.style.height = ''; track.style.transform = ''; return; }
        dist = Math.max(0, track.scrollWidth - innerWidth);
        sec.style.height = innerHeight + dist + 'px';
      };
      const update = () => {
        if (!enabled) return;
        const r = sec.getBoundingClientRect();
        const p = clamp(-r.top / Math.max(1, sec.offsetHeight - innerHeight), 0, 1);
        track.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
        sec.style.setProperty('--hp', p.toFixed(4));
      };
      measure();
      window.addEventListener('resize', () => { measure(); update(); });
      window.addEventListener('load', () => { measure(); update(); });
      onScroll(update);
    });

    /* Nav, barra de progreso y botón volver arriba */
    const nav = $('.nav');
    const progress = $('.progress');
    const toTop = $('.to-top');
    const toTopRing = toTop && $('svg.ring circle', toTop);
    let lastY = window.scrollY;
    onScroll(y => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? clamp(y / max, 0, 1) : 0;
      if (progress) progress.style.transform = `scaleX(${p})`;
      if (nav) {
        nav.classList.toggle('scrolled', y > 20);
        if (Math.abs(y - lastY) > 4) nav.classList.toggle('hidden', y > lastY && y > 320);
      }
      if (toTop) {
        toTop.classList.toggle('show', y > 700);
        if (toTopRing) toTopRing.style.strokeDashoffset = (163.4 * (1 - p)).toFixed(1);
      }
      lastY = y;
    });
    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    let ticking = false;
    const run = () => { const y = window.scrollY; scrollFns.forEach(fn => fn(y)); ticking = false; };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    window.addEventListener('resize', run);

    enhance();

    /* Quita la cortina y arranca las animaciones */
    const ready = () => {
      if (isReady) return;
      isReady = true;
      body.classList.add('is-ready');
      setTimeout(() => pending.splice(0).forEach(el => io.observe(el)), reduceMotion ? 0 : 350);
    };
    if (document.readyState === 'complete') setTimeout(ready, 150);
    else window.addEventListener('load', () => setTimeout(ready, 150));
    setTimeout(ready, 1800); // por si alguna fuente externa tarda demasiado
  }

  window.Portfolio = { $, $$, clamp, lerp, reduceMotion, finePointer, store, toast, segmented, onScroll, enhance, bindTilt, countUp };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
