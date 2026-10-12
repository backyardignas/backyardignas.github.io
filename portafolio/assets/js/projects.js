/* =========================================================
   Datos de proyectos — edita aquí y se actualizan Inicio y Proyectos.
   colors: [fondo, brillo 1, brillo 2]
   layout: dashboard | landing | shop | phone | components
   ========================================================= */
window.PROJECTS = [
  {
    id: 'nebula',
    title: 'Nebula Finance',
    category: 'web', categoryLabel: 'Web App',
    year: 2026, featured: true,
    summary: 'Dashboard financiero interactivo para startups.',
    description: 'Concepto de panel financiero que centraliza ingresos, gastos y runway. Construí gráficos interactivos desde cero con Canvas, una tabla con búsqueda, filtros y orden, y un formulario que actualiza todo el panel en tiempo real.',
    role: 'Diseño UI · Frontend',
    client: 'Marca ficticia',
    stack: ['JavaScript', 'Canvas API', 'SVG', 'CSS Grid'],
    metrics: [['4', 'visualizaciones interactivas'], ['0', 'librerías externas'], ['100%', 'responsive']],
    colors: ['#1a1446', '#8b5cf6', '#22d3ee'],
    layout: 'dashboard'
  },
  {
    id: 'mareas',
    title: 'Mareas',
    category: 'app', categoryLabel: 'App móvil',
    year: 2026, featured: true,
    summary: 'Concepto de app de bienestar y meditación.',
    description: 'Prototipo funcional de una app móvil con respiración guiada, seguimiento de hábitos con rachas y sonidos ambientales generados en vivo con Web Audio. Los datos se guardan en el navegador.',
    role: 'Diseño de producto · UI/UX · Frontend',
    client: 'Marca ficticia',
    stack: ['JavaScript', 'Web Audio API', 'CSS Animations', 'LocalStorage'],
    metrics: [['4', 'pantallas funcionales'], ['3', 'ritmos de respiración'], ['4', 'sonidos generados en vivo']],
    colors: ['#062a2f', '#14b8a6', '#a3e635'],
    layout: 'phone'
  },
  {
    id: 'kairo',
    title: 'Kairo Arquitectos',
    category: 'web', categoryLabel: 'Sitio web',
    year: 2026, featured: true,
    summary: 'Sitio editorial para un estudio de arquitectura.',
    description: 'Sitio inmersivo para un estudio ficticio: ilustraciones de edificios generadas con código, filtros de proyectos, galería a pantalla completa navegable con teclado y animaciones al hacer scroll.',
    role: 'Dirección visual · Desarrollo',
    client: 'Marca ficticia',
    stack: ['HTML', 'CSS', 'JavaScript', 'SVG generativo'],
    metrics: [['6', 'ilustraciones generativas'], ['5', 'secciones animadas'], ['100%', 'responsive']],
    colors: ['#2b1406', '#f97316', '#facc15'],
    layout: 'landing'
  },
  {
    id: 'lumen',
    title: 'Lumen Store',
    category: 'ecommerce', categoryLabel: 'E-commerce',
    year: 2026, featured: true,
    summary: 'Tienda online de lámparas de diseño.',
    description: 'E-commerce demostrativo con catálogo filtrable, configurador de acabado y temperatura de luz, carrito persistente con barra de envío gratis y un flujo de compra simulado.',
    role: 'UI · Frontend',
    client: 'Marca ficticia',
    stack: ['JavaScript', 'SVG', 'LocalStorage', 'CSS'],
    metrics: [['9', 'productos configurables'], ['3', 'filtros combinables'], ['1', 'flujo de compra completo']],
    colors: ['#2a0a1f', '#ec4899', '#fbbf24'],
    layout: 'shop'
  },
  {
    id: 'pulse',
    title: 'Pulse Health',
    category: 'uiux', categoryLabel: 'UI/UX',
    year: 2026,
    summary: 'Caso de estudio: agendar citas médicas.',
    description: 'Caso de estudio conceptual sobre el rediseño de una app de citas médicas: perfiles de usuario, mapa de experiencia, comparación antes/después y un prototipo interactivo del flujo final.',
    role: 'UX · UI · Prototipado',
    client: 'Caso conceptual',
    stack: ['Figma', 'Prototipado', 'JavaScript'],
    metrics: [['4', 'pasos para agendar'], ['2', 'perfiles de usuario'], ['1', 'prototipo funcional']],
    colors: ['#2d0812', '#f43f5e', '#fb923c'],
    layout: 'phone'
  },
  {
    id: 'orbita',
    title: 'Órbita Learn',
    category: 'web', categoryLabel: 'Plataforma',
    year: 2025,
    summary: 'Plataforma educativa con cursos interactivos.',
    description: 'Concepto de plataforma de aprendizaje con catálogo de cursos, lecciones con progreso, quizzes con calificación, puntos de experiencia y logros desbloqueables que se guardan en el navegador.',
    role: 'Diseño · Frontend',
    client: 'Marca ficticia',
    stack: ['JavaScript', 'CSS', 'LocalStorage'],
    metrics: [['4', 'cursos de ejemplo'], ['6', 'logros desbloqueables'], ['4', 'quizzes evaluados']],
    colors: ['#081a3a', '#3b82f6', '#22d3ee'],
    layout: 'dashboard'
  },
  {
    id: 'verde',
    title: 'Verde Market',
    category: 'ecommerce', categoryLabel: 'E-commerce',
    year: 2025,
    summary: 'Mercado online de productores locales.',
    description: 'Marketplace demostrativo que conecta productores con compradores: consulta de zona de entrega, filtro por productor, canasta con capacidad limitada y suscripciones con descuento.',
    role: 'Diseño · Frontend',
    client: 'Marca ficticia',
    stack: ['JavaScript', 'CSS Grid', 'LocalStorage'],
    metrics: [['12', 'productos'], ['5', 'productores'], ['3', 'tipos de suscripción']],
    colors: ['#0b2410', '#22c55e', '#a3e635'],
    layout: 'shop'
  },
  {
    id: 'synth',
    title: 'Synth Design System',
    category: 'uiux', categoryLabel: 'Design System',
    year: 2025,
    summary: 'Sistema de diseño con documentación viva.',
    description: 'Documentación interactiva de un sistema de diseño: tokens de color, tipografía y espaciado, componentes funcionales y un playground que genera código. El color de marca y el tema se cambian en vivo.',
    role: 'Design Engineer',
    client: 'Proyecto personal',
    stack: ['CSS Custom Properties', 'JavaScript', 'Design Tokens'],
    metrics: [['10+', 'componentes'], ['11', 'tokens de color'], ['2', 'temas (claro y oscuro)']],
    colors: ['#220a33', '#a855f7', '#f472b6'],
    layout: 'components'
  }
];

/* Cada proyecto tiene una demo funcional en /demos/<id>/ */
window.PROJECTS.forEach(p => {
  p.demo = `../demos/${p.id}/index.html`;
  p.code = `https://github.com/backyardignas/backyardignas.github.io/tree/main/portafolio/demos/${p.id}`;
});

window.ProjectUI = (() => {
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  const bar = '<div class="mock-bar"><i></i><i></i><i></i></div>';

  const mocks = {
    dashboard: () => `
      <div class="mock">${bar}
        <div class="mock-dash">
          <div class="mock-side"><div class="mock-line lg" style="width:70%"></div><div class="mock-line"></div><div class="mock-line" style="width:80%"></div><div class="mock-line" style="width:60%"></div><div class="mock-line" style="width:75%"></div></div>
          <div class="mock-body">
            <div class="mock-row" style="grid-template-columns:repeat(3,1fr)"><span style="height:38px"></span><span style="height:38px"></span><span style="height:38px"></span></div>
            <div class="mock-bars">${[40, 65, 50, 80, 58, 92, 70, 85, 62, 96].map(h => `<span style="height:${h}%"></span>`).join('')}</div>
            <div class="mock-line" style="width:90%"></div><div class="mock-line" style="width:65%"></div>
          </div>
        </div>
      </div>`,
    landing: () => `
      <div class="mock">${bar}
        <div class="mock-body">
          <div class="mock-line lg" style="width:65%"></div>
          <div class="mock-line lg" style="width:45%"></div>
          <div class="mock-line" style="width:55%"></div>
          <div class="mock-block" style="height:70px;margin-top:6px"></div>
          <div class="mock-row" style="grid-template-columns:2fr 1fr 1fr"><span style="height:46px"></span><span style="height:46px"></span><span style="height:46px"></span></div>
        </div>
      </div>`,
    shop: () => `
      <div class="mock">${bar}
        <div class="mock-body">
          <div class="mock-line lg" style="width:40%"></div>
          <div class="mock-row" style="grid-template-columns:repeat(3,1fr)">
            ${[0, 1, 2, 3, 4, 5].map(() => '<div style="display:grid;gap:6px"><span style="height:54px;border-radius:6px;background:rgba(255,255,255,.18)"></span><div class="mock-line" style="width:80%"></div><div class="mock-line" style="width:40%;background:rgba(255,255,255,.45)"></div></div>').join('')}
          </div>
        </div>
      </div>`,
    phone: () => `
      <div class="mock mock-phone">
        <div class="mock-body">
          <div class="mock-line" style="width:40%;margin:0 auto"></div>
          <div class="mock-circle"></div>
          <div class="mock-line lg" style="width:70%;margin:0 auto"></div>
          <div class="mock-line" style="width:85%"></div>
          <div class="mock-line" style="width:60%"></div>
          <div class="mock-block" style="height:40px;border-radius:12px"></div>
          <div class="mock-row" style="grid-template-columns:1fr 1fr"><span style="height:34px;border-radius:10px"></span><span style="height:34px;border-radius:10px"></span></div>
        </div>
      </div>`,
    components: () => `
      <div class="mock">${bar}
        <div class="mock-body">
          <div class="mock-btns"><span style="width:64px"></span><span style="width:52px"></span><span style="width:44px"></span></div>
          <div style="display:flex;gap:10px;align-items:center"><div class="mock-toggle"></div><div class="mock-line" style="flex:1"></div></div>
          <div class="mock-row" style="grid-template-columns:repeat(4,1fr)"><span style="height:30px;border-radius:50%;aspect-ratio:1;width:30px"></span><span style="height:30px;border-radius:50%;width:30px"></span><span style="height:30px;border-radius:50%;width:30px"></span><span style="height:30px;border-radius:50%;width:30px"></span></div>
          <div class="mock-block" style="height:44px"></div>
          <div class="mock-line" style="width:70%"></div>
        </div>
      </div>`
  };

  const cover = p => `
    <div class="pcover" style="--c1:${p.colors[0]};--c2:${p.colors[1]};--c3:${p.colors[2]}">
      <div class="pcover-bg"></div>
      <div class="pcover-pattern"></div>
      <span class="pcover-cat">${p.categoryLabel}</span>
      <span class="pcover-year">Demo · ${p.year}</span>
      ${(mocks[p.layout] || mocks.landing)()}
    </div>`;

  /* tag: 'a' para enlazar (Inicio) o 'article' para abrir el modal (Proyectos) */
  const card = (p, { tag = 'article', href = '' } = {}) => {
    const attrs = tag === 'a'
      ? `href="${href}"`
      : `tabindex="0" role="button" aria-label="Ver detalles de ${p.title}"`;
    return `
    <${tag} class="pcard" ${attrs} data-id="${p.id}" data-tilt="4" data-cursor-text="Ver">
      ${cover(p)}
      <div class="pinfo">
        <div>
          <h3>${p.title}</h3>
          <p class="pmeta">${p.summary}</p>
          <div class="tags">${p.stack.slice(0, 3).map(s => `<span class="tag">${s}</span>`).join('')}</div>
        </div>
        <span class="parrow" aria-hidden="true">${arrow}</span>
      </div>
    </${tag}>`;
  };

  return { card, cover };
})();
