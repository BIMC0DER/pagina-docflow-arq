/* =============================================================
   DocFlow ARQ — captação da lista de espera
   Grava no mesmo projeto Supabase da pagina-lives-bimcoder.
   A chave anon é publicável: a tabela tem RLS e o anon só INSERE.
   ============================================================= */

const SUPABASE_URL    = 'https://qsvfuhwrdehfynhpqhch.supabase.co';
const SUPABASE_ANON   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdmZ1aHdyZGVoZnluaHBxaGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MzMzNzUsImV4cCI6MjA3ODUwOTM3NX0.IcSr7GbQMZzG3JK4F3uwIoEXyXoJNmiVgEKIsh3UabM';
const TABLE_NAME      = 'app_paginadocflow_lista';
const ORIGEM          = 'pagina-docflow-arq';
const UTM_STORAGE_KEY = 'bc_docflow_utm_source';
const UTM_DEFAULT     = 'organico';

const VIDEO_EXT = ['mp4', 'webm'];
const IMAGE_EXT = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  captureUtmSource();
  initForms();
  initFaq();
  initReveal();
  initMediaFrames();
  initShowcase();
  initToolsViews();
});

/* ═══════════════════════════════════════════════════════════
   Mídia: procura vídeo, depois imagem, e só então desiste
   ═══════════════════════════════════════════════════════════ */

/**
 * Testa uma lista de URLs e devolve a primeira que existir.
 * Vídeo é testado com HEAD para não baixar o arquivo inteiro à toa.
 */
async function findMedia(base) {
  for (const ext of VIDEO_EXT) {
    if (await exists(`${base}.${ext}`)) return { kind: 'video', src: `${base}.${ext}` };
  }
  for (const ext of IMAGE_EXT) {
    if (await exists(`${base}.${ext}`)) return { kind: 'image', src: `${base}.${ext}` };
  }
  return null;
}

function exists(url) {
  return fetch(url, { method: 'HEAD' })
    .then((response) => response.ok)
    .catch(() => false);
}

function placeholder(label) {
  const box = document.createElement('div');
  box.className = 'media-empty';
  box.innerHTML = `
    <span class="media-icon" aria-hidden="true"></span>
    <span class="media-label">${escapeHtml(label)}</span>
    <span class="media-sub">imagem ou vídeo em breve</span>`;
  return box;
}

/** Preenche um slot de mídia (vitrine, demo, galeria). */
async function fillMedia(container, base, label) {
  container.appendChild(placeholder(label));
  const found = await findMedia(base);
  if (!found) return;

  const element = found.kind === 'video'
    ? Object.assign(document.createElement('video'), {
        src: found.src, autoplay: true, muted: true, loop: true, playsInline: true
      })
    : Object.assign(document.createElement('img'), {
        src: found.src, alt: label, loading: 'lazy'
      });

  container.replaceChildren(element);
  container.classList.add('has-media');
}

/** Blocos grandes: demonstração e galeria. */
function initMediaFrames() {
  document.querySelectorAll('.demo-frame').forEach((frame) => {
    frame.classList.add(`ratio-${frame.dataset.ratio || '16-9'}`);
    fillMedia(frame, frame.dataset.media, frame.dataset.label || 'Mídia');
  });
}

/* ═══════════════════════════════════════════════════════════
   Vitrine em coverflow
   ═══════════════════════════════════════════════════════════ */

function initShowcase() {
  const track = document.getElementById('scTrack');
  const stage = document.getElementById('scStage');
  // `const` em outro <script> cria binding léxico global, não vira
  // propriedade de window — por isso o typeof em vez de window.COMANDOS.
  if (!track || typeof COMANDOS === 'undefined') return;

  const total = COMANDOS.length;
  let index = 0;
  let timer = null;

  COMANDOS.forEach((comando, i) => {
    const card = document.createElement('article');
    card.className = 'sc-card';
    card.dataset.index = String(i);
    card.innerHTML = `
      <div class="sc-media"></div>
      <div class="sc-body">
        <span class="sc-painel">${escapeHtml(comando.painel)}</span>
        <h3>${escapeHtml(comando.nome)}</h3>
        <p>${escapeHtml(comando.exemplo)}</p>
      </div>`;
    card.addEventListener('click', () => { if (i !== index) go(i); });
    track.appendChild(card);
    fillMedia(card.querySelector('.sc-media'), comando.media,
      `${comando.painel} · ${comando.nome}`);
  });

  const cards = Array.from(track.children);
  document.getElementById('scTotal').textContent = pad(total);

  function render() {
    cards.forEach((card, i) => {
      const offset = i - index;
      const distance = Math.min(Math.abs(offset), 4);
      card.style.transform =
        `translate(-50%, 0) translateX(${offset * 130}px) ` +
        `rotateY(${offset * -20}deg) scale(${1 - distance * 0.08})`;
      card.style.opacity = String(Math.max(0, 1 - distance * 0.3));
      card.style.zIndex = String(50 - distance);
      card.style.pointerEvents = distance > 3 ? 'none' : 'auto';
      card.classList.toggle('is-active', offset === 0);
      card.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
    });

    const atual = COMANDOS[index];
    document.getElementById('scKicker').textContent = `${atual.painel} · ${atual.nome}`;
    document.getElementById('scNow').textContent = pad(index + 1);
    document.getElementById('scBar').style.width = `${((index + 1) / total) * 100}%`;
  }

  function go(target) {
    index = (target + total) % total;
    render();
    restart();
  }

  function restart() {
    if (reducedMotion) return;
    clearInterval(timer);
    timer = setInterval(() => { index = (index + 1) % total; render(); }, 5000);
  }

  document.getElementById('scPrev').addEventListener('click', () => go(index - 1));
  document.getElementById('scNext').addEventListener('click', () => go(index + 1));

  stage.addEventListener('mouseenter', () => clearInterval(timer));
  stage.addEventListener('mouseleave', restart);

  stage.setAttribute('tabindex', '0');
  stage.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft')  { event.preventDefault(); go(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1); }
  });

  /* Arraste: passa de card ao soltar, não durante o movimento, para
     não disparar dez trocas num swipe só. */
  let startX = null;
  stage.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
    clearInterval(timer);
    stage.classList.add('is-dragging');
  });
  stage.addEventListener('pointerup', (event) => {
    stage.classList.remove('is-dragging');
    if (startX === null) return;
    const delta = event.clientX - startX;
    startX = null;
    if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
    else restart();
  });
  stage.addEventListener('pointercancel', () => {
    startX = null;
    stage.classList.remove('is-dragging');
    restart();
  });

  render();
  restart();
}

/* ═══════════════════════════════════════════════════════════
   Ferramentas: Grade · Lista · Pilha
   ═══════════════════════════════════════════════════════════ */

function initToolsViews() {
  const host = document.getElementById('toolsView');
  const hint = document.getElementById('viewHint');
  if (!host || typeof PAINEIS === 'undefined') return;

  const hints = {
    grade: 'Cinco painéis na ribbon, quinze comandos.',
    lista: 'A mesma lista, compacta, para bater o olho.',
    pilha: 'Arraste ou use as setas para percorrer os painéis.'
  };

  const views = { grade: renderGrade, lista: renderLista, pilha: renderPilha };

  document.querySelectorAll('.vs-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;
      document.querySelectorAll('.vs-btn').forEach((other) => {
        const active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-selected', String(active));
      });
      hint.textContent = hints[view];
      host.replaceChildren();
      host.className = `tools-view view-${view}`;
      views[view](host);
    });
  });

  host.className = 'tools-view view-grade';
  renderGrade(host);
}

function renderGrade(host) {
  PAINEIS.forEach((painel) => {
    const group = document.createElement('div');
    group.className = 'tool-group';
    group.innerHTML = `<h3 class="group-title">${escapeHtml(painel.nome)}</h3>`;

    const grid = document.createElement('div');
    grid.className = 'tool-grid';
    painel.comandos.forEach((comando) => {
      const card = document.createElement('article');
      card.className = 'tool' + (painel.comandos.length === 1 ? ' tool-wide' : '');
      card.innerHTML =
        `<h4>${escapeHtml(comando.nome)}</h4><p>${escapeHtml(comando.descricao)}</p>`;
      grid.appendChild(card);
    });

    group.appendChild(grid);
    host.appendChild(group);
  });
}

function renderLista(host) {
  PAINEIS.forEach((painel) => {
    const group = document.createElement('div');
    group.className = 'tool-group';
    group.innerHTML = `<h3 class="group-title">${escapeHtml(painel.nome)}</h3>`;

    const list = document.createElement('ul');
    list.className = 'tool-list';
    painel.comandos.forEach((comando) => {
      const item = document.createElement('li');
      item.innerHTML =
        `<strong>${escapeHtml(comando.nome)}</strong><span>${escapeHtml(comando.descricao)}</span>`;
      list.appendChild(item);
    });

    group.appendChild(list);
    host.appendChild(group);
  });
}

function renderPilha(host) {
  const total = PAINEIS.length;
  let index = 0;

  host.innerHTML = `
    <div class="stack" id="stackBox"></div>
    <div class="showcase-controls">
      <button class="circle-btn" id="stPrev" type="button" aria-label="Painel anterior">‹</button>
      <p class="showcase-counter"><strong id="stNow">01</strong> / ${pad(total)}</p>
      <button class="circle-btn" id="stNext" type="button" aria-label="Próximo painel">›</button>
    </div>
    <div class="stack-dots" id="stDots"></div>`;

  const box  = host.querySelector('#stackBox');
  const dots = host.querySelector('#stDots');

  PAINEIS.forEach((painel, i) => {
    const card = document.createElement('article');
    card.className = 'stack-card';
    card.innerHTML = `
      <div class="stack-top">
        <span class="stack-index">${pad(i + 1)} / ${pad(total)}</span>
        <span class="stack-count">${painel.comandos.length} comando${painel.comandos.length > 1 ? 's' : ''}</span>
      </div>
      <h3>${escapeHtml(painel.nome)}</h3>
      <p class="stack-resumo">${escapeHtml(painel.resumo)}</p>
      <ul class="stack-list">
        ${painel.comandos.map((comando) =>
          `<li><strong>${escapeHtml(comando.nome)}</strong> ${escapeHtml(comando.descricao)}</li>`).join('')}
      </ul>`;
    box.appendChild(card);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'stack-dot';
    dot.setAttribute('aria-label', `Ir para ${painel.nome}`);
    dot.addEventListener('click', () => go(i));
    dots.appendChild(dot);
  });

  const cards = Array.from(box.children);

  function render() {
    cards.forEach((card, i) => {
      const offset = (i - index + total) % total;
      const depth = Math.min(offset, 3);
      card.style.transform = `translateY(${depth * 14}px) scale(${1 - depth * 0.04})`;
      card.style.opacity = offset === 0 ? '1' : String(Math.max(0, 0.5 - depth * 0.15));
      card.style.zIndex = String(50 - depth);
      card.classList.toggle('is-active', offset === 0);
    });
    Array.from(dots.children).forEach((dot, i) =>
      dot.classList.toggle('is-active', i === index));
    host.querySelector('#stNow').textContent = pad(index + 1);
  }

  function go(target) { index = (target + total) % total; render(); }

  host.querySelector('#stPrev').addEventListener('click', () => go(index - 1));
  host.querySelector('#stNext').addEventListener('click', () => go(index + 1));

  let startX = null;
  box.addEventListener('pointerdown', (event) => { startX = event.clientX; });
  box.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    startX = null;
    if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
  });

  render();
}

/* ═══════════════════════════════════════════════════════════
   Transições de entrada
   ═══════════════════════════════════════════════════════════ */

function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px' });
  targets.forEach((target) => observer.observe(target));
}

/* ═══════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════ */

function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => { if (other !== item) other.open = false; });
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   Formulário
   ═══════════════════════════════════════════════════════════ */

function initForms() {
  document.querySelectorAll('form.hero-form, form.cta-form')
    .forEach((form) => form.addEventListener('submit', handleSubmit));
}

/* Guarda a origem na sessão: o visitante pode cair no topo por um
   anúncio e só converter no formulário lá de baixo. */
function captureUtmSource() {
  const utm = new URLSearchParams(window.location.search).get('utm_source');
  if (!utm) return;
  try { sessionStorage.setItem(UTM_STORAGE_KEY, utm); } catch (e) { /* modo privado */ }
}

function getUtmSource() {
  try { return sessionStorage.getItem(UTM_STORAGE_KEY) || UTM_DEFAULT; }
  catch (e) { return UTM_DEFAULT; }
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.querySelector('.form-msg');

  const fields = {
    nome:     form.querySelector('input[name="nome"]'),
    email:    form.querySelector('input[name="email"]'),
    telefone: form.querySelector('input[name="telefone"]')
  };

  const data = {
    nome:       fields.nome.value.trim(),
    email:      fields.email.value.trim(),
    telefone:   fields.telefone.value.trim(),
    origem:     ORIGEM,
    utm_source: getUtmSource()
  };

  const problem = validate(data);
  if (problem) {
    showMessage(message, problem.text, 'is-error');
    markInvalid(form, problem.field);
    fields[problem.field].focus();
    return;
  }
  markInvalid(form, null);

  const button = form.querySelector('button[type="submit"]');
  const label = button.textContent;
  button.disabled = true;
  button.textContent = 'Enviando...';
  showMessage(message, '', '');

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'apikey':        SUPABASE_ANON,
        'Authorization': `Bearer ${SUPABASE_ANON}`,
        'Content-Type':  'application/json',
        'Prefer':        'return=minimal'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Supabase ${response.status}: ${body}`);
    }

    succeed(form, data.nome);
  } catch (error) {
    console.error(error);
    button.disabled = false;
    button.textContent = label;
    showMessage(message,
      'Não consegui salvar seu contato agora. Tente de novo em instantes ou escreva para contato@bimcoder.net.',
      'is-error');
  }
}

function validate(data) {
  if (data.nome.length < 2)
    return { field: 'nome', text: 'Por favor, informe seu nome.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { field: 'email', text: 'Por favor, informe um e-mail válido.' };
  const digits = data.telefone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13)
    return { field: 'telefone', text: 'Por favor, informe um WhatsApp válido com DDD.' };
  return null;
}

function markInvalid(form, field) {
  form.querySelectorAll('input').forEach((input) => {
    if (field && input.name === field) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  });
}

/* Troca o formulário por uma confirmação no lugar dele: sem página
   de obrigado, porque não há para onde mandar a pessoa ainda. */
function succeed(form, nome) {
  const primeiroNome = nome.split(/\s+/)[0];
  form.innerHTML = `
    <div class="success">
      <strong>Pronto, ${escapeHtml(primeiroNome)}. Você está na lista.</strong>
      <p>Quando o DocFlow ARQ abrir, o aviso chega no seu e-mail e no WhatsApp
         antes do anúncio público.</p>
    </div>`;
}

function showMessage(element, text, className) {
  if (!element) return;
  element.textContent = text;
  element.className = `form-msg ${className}`.trim();
}

/* ═══════════════════════════════════════════════════════════
   Utilitários
   ═══════════════════════════════════════════════════════════ */

function pad(value) { return String(value).padStart(2, '0'); }

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}
