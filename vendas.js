const STUDENT_VALIDATION = {
  endpoint: "https://rfvcoqvbmzdchtbndjkb.supabase.co/functions/v1/validate-student-email",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdmNvcXZibXpkY2h0Ym5kamtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjcyMzAsImV4cCI6MjA5MTI0MzIzMH0.5F-Ln7mvjhavve7azM6Up2xxHuSs29PeVXS0XVjtIBI"
};

const CHECKOUTS = {
  mensal: "",
  anual: "https://pay.hotmart.com/H107343223J?off=j0potk7j",
  aluno: "https://pay.hotmart.com/H107343223J?off=n8h1l3g4"
};

document.addEventListener("DOMContentLoaded", () => {
  initTimeStory();
  initHeroManifestoTransition();
  initScrollReveals();
  initPageEffects();
  initConfigCarousel();
  initCotasComparison();
  initDemonstrations();
  initConceptEntrance();
  initLaunchStory();
  initCalculator();
  initFaq();
  initStudentPricing();
  initCheckoutLinks();
});

function initHeroManifestoTransition() {
  const hero = document.querySelector(".hero");
  const manifesto = document.querySelector(".manifesto");
  if (!hero || !manifesto || !window.matchMedia) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  document.documentElement.classList.add("hero-transition-ready");
  let frame = 0;
  const clamp = (value) => Math.min(1, Math.max(0, value));
  const render = () => {
    frame = 0;
    const progress = clamp((window.scrollY - hero.offsetTop) / Math.max(1, hero.offsetHeight * 0.78));
    hero.style.setProperty("--hero-transition-opacity", String(1 - progress * 0.48));
    hero.style.setProperty("--hero-transition-y", (-46 * progress) + "px");
    hero.style.setProperty("--hero-transition-scale", String(1 - progress * 0.025));
  };
  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      manifesto.classList.add("transition-visible");
      observer.disconnect();
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    observer.observe(manifesto);
  } else {
    manifesto.classList.add("transition-visible");
  }

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
  reducedMotion.addEventListener?.("change", (event) => {
    if (!event.matches) return;
    document.documentElement.classList.remove("hero-transition-ready");
    manifesto.classList.add("transition-visible");
    hero.style.removeProperty("--hero-transition-opacity");
    hero.style.removeProperty("--hero-transition-y");
    hero.style.removeProperty("--hero-transition-scale");
  });
  render();
}
function initTimeStory() {
  const story = document.querySelector("[data-time-story]");
  if (!story || !window.matchMedia) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  const pause = story.querySelector(".time-pause");
  const question = story.querySelector(".time-question");
  const calculator = story.querySelector(".time-calculator");
  const closing = story.querySelector(".time-next");
  const calculatorLink = question?.querySelector('a[href="#calculadora"]');

  story.classList.add("story-enhanced");
  let frame = 0;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const phase = (progress, start, end) => clamp((progress - start) / (end - start));
  const sequenceMetrics = () => {
    const bounds = story.getBoundingClientRect();
    const stickyTop = window.innerWidth <= 680 ? 60 : 68;
    const travel = Math.max(1, story.offsetHeight - window.innerHeight + stickyTop);
    const top = bounds.top + window.scrollY;
    return { bounds, stickyTop, travel, top };
  };
  const setStageActive = (element, active) => {
    if (!element) return;
    element.inert = !active;
    element.setAttribute("aria-hidden", String(!active));
  };

  const render = () => {
    frame = 0;
    const { bounds, stickyTop, travel } = sequenceMetrics();
    const progress = clamp((stickyTop - bounds.top) / travel);

    const pauseExit = phase(progress, 0.08, 0.18);
    const questionEntry = phase(progress, 0.15, 0.25);
    const questionExit = phase(progress, 0.36, 0.45);
    const calculatorEntry = phase(progress, 0.41, 0.51);
    const calculatorExit = phase(progress, 0.67, 0.76);
    const closingEntry = phase(progress, 0.73, 0.84);
    const hourglassProgress = phase(progress, 0.17, 0.43);

    const pauseOpacity = 1 - pauseExit;
    const questionOpacity = Math.min(questionEntry, 1 - questionExit);
    const calculatorOpacity = Math.min(calculatorEntry, 1 - calculatorExit);
    const closingOpacity = closingEntry;

    story.style.setProperty("--pause-opacity", String(pauseOpacity));
    story.style.setProperty("--pause-y", (-42 * pauseExit) + "px");
    story.style.setProperty("--pause-scale", String(1 - 0.04 * pauseExit));
    story.style.setProperty("--question-opacity", String(questionOpacity));
    story.style.setProperty("--question-y", (54 * (1 - questionEntry) - 38 * questionExit) + "px");
    story.style.setProperty("--question-scale", String(0.96 + 0.04 * questionEntry));
    story.style.setProperty("--question-invitation-opacity", String(phase(progress, 0.23, 0.3) * (1 - questionExit)));
    story.style.setProperty("--hourglass-upper", String(Math.max(0.018, 1 - hourglassProgress)));
    story.style.setProperty("--hourglass-lower", String(Math.max(0.018, hourglassProgress)));
    story.style.setProperty("--hourglass-turn", (-10 + hourglassProgress * 18) + "deg");
    story.style.setProperty("--hourglass-stream-opacity", String(hourglassProgress > 0.02 && hourglassProgress < 0.98 ? Math.min(1, questionOpacity * 1.8) : 0));
    story.classList.toggle("hourglass-pouring", hourglassProgress > 0.02 && hourglassProgress < 0.98 && questionOpacity > 0.08);
    story.style.setProperty("--calculator-opacity", String(calculatorOpacity));
    story.style.setProperty("--calculator-y", (64 * (1 - calculatorEntry) - 42 * calculatorExit) + "px");
    story.style.setProperty("--calculator-scale", String(0.97 + 0.03 * calculatorEntry));
    story.style.setProperty("--closing-opacity", String(closingOpacity));
    story.style.setProperty("--closing-y", (56 * (1 - closingEntry)) + "px");

    setStageActive(pause, pauseOpacity > 0.5);
    setStageActive(question, questionOpacity > 0.75);
    setStageActive(calculator, calculatorOpacity > 0.75);
    setStageActive(closing, closingOpacity > 0.75);
  };

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  calculatorLink?.addEventListener("click", (event) => {
    event.preventDefault();
    const { travel, top, stickyTop } = sequenceMetrics();
    window.scrollTo({ top: top - stickyTop + travel * 0.5, behavior: "smooth" });
  });

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
  if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener("change", () => window.location.reload());
  }
  render();
}
function initScrollReveals() {
  const items = Array.from(document.querySelectorAll("[data-scroll-reveal]"));
  if (!items.length || !("IntersectionObserver" in window) || !window.matchMedia) return;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motion.matches) return;
  let observer;
  const show = (item) => {
    item.classList.remove("reveal-pending");
    if (observer) observer.unobserve(item);
  };
  const showAll = () => {
    items.forEach(show);
    if (observer) observer.disconnect();
  };
  try {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) show(entry.target); });
    }, { threshold: 0, rootMargin: "0px 0px -12% 0px" });
    items.forEach(item => {
      item.addEventListener("focusin", () => show(item));
      item.classList.add("reveal-pending");
      observer.observe(item);
    });
    if (motion.addEventListener) motion.addEventListener("change", event => {
      if (event.matches) showAll();
    });
    // Anchor navigation and keyboard use must never wait for an animation.
    const revealAnchor = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) items.filter(item => item === target || item.contains(target)).forEach(show);
    };
    window.addEventListener("hashchange", revealAnchor);
    revealAnchor();
  } catch {
    showAll();
  }
}

function initPageEffects() {
  const mosaic = document.querySelector(".tools-mosaic");
  const tiles = Array.from(document.querySelectorAll(".tool-tile"));
  const comparison = document.querySelector(".comparison");
  const rows = Array.from(document.querySelectorAll(".comparison-row"));
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)");

  if (!mosaic && !comparison) return;
  if (reducedMotion?.matches || !("IntersectionObserver" in window)) {
    mosaic?.classList.add("is-visible");
    comparison?.classList.add("is-visible");
    return;
  }

  document.documentElement.classList.add("page-effects-ready");
  tiles.forEach((tile, index) => tile.style.setProperty("--reveal-delay", (index * 55) + "ms"));
  rows.forEach((row, index) => row.style.setProperty("--row-delay", (index * 110) + "ms"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });

  if (mosaic) observer.observe(mosaic);
  if (comparison) observer.observe(comparison);

  if (mosaic && finePointer?.matches) {
    mosaic.addEventListener("pointermove", (event) => {
      const target = event.target.closest(".tool-tile");
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      target.style.setProperty("--spot-x", (event.clientX - bounds.left) + "px");
      target.style.setProperty("--spot-y", (event.clientY - bounds.top) + "px");
    });
  }

  reducedMotion?.addEventListener?.("change", (event) => {
    if (!event.matches) return;
    document.documentElement.classList.remove("page-effects-ready");
    mosaic?.classList.add("is-visible");
    comparison?.classList.add("is-visible");
    observer.disconnect();
  });
}
function initCalculator() {
  const hours = document.getElementById("hours");
  const rate = document.getElementById("rate");
  if (!hours || !rate) return;

  const hoursOutput = document.getElementById("hoursOutput");
  const rateOutput = document.getElementById("rateOutput");
  const annualOutput = document.getElementById("annualOutput");
  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });

  const render = () => {
    const weeklyHours = Number(hours.value);
    const hourlyRate = Number(rate.value);
    hoursOutput.textContent = weeklyHours + " h";
    rateOutput.textContent = money.format(hourlyRate);
    annualOutput.textContent = money.format(weeklyHours * hourlyRate * 48);
  };

  hours.addEventListener("input", render);
  rate.addEventListener("input", render);
  render();
}

function initFaq() {
  const items = Array.from(document.querySelectorAll(".faq-section details"));
  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

function initStudentPricing() {
  const switcher = document.querySelector("[data-student-switch]");
  const card = document.querySelector("[data-annual-price]");
  const value = card?.querySelector("[data-price-value]");
  const cash = card?.querySelector("[data-cash-price]");
  const condition = card?.querySelector("[data-price-condition]");
  const badge = card?.querySelector("[data-price-badge]");
  const badgeNote = card?.querySelector("[data-price-badge-note]");
  const checkout = card?.querySelector("[data-price-cta]");
  const dialog = document.getElementById("studentValidationDialog");
  const form = document.getElementById("studentValidationForm");
  const emailInput = document.getElementById("studentEmail");
  const submit = dialog?.querySelector("[data-student-submit]");
  const status = dialog?.querySelector("[data-student-status]");
  const support = dialog?.querySelector("[data-student-support]");
  if (!switcher || !card || !value || !cash || !condition || !badge || !checkout || !dialog || !form || !emailInput || !submit || !status || !support) return;

  const options = Array.from(switcher.querySelectorAll("[data-student-option]"));
  const regularOption = options.find(option => option.dataset.studentOption === "no");
  const studentOption = options.find(option => option.dataset.studentOption === "yes");

  const setStudent = (isStudent) => {
    switcher.dataset.student = isStudent ? "yes" : "no";
    options.forEach(option => option.setAttribute("aria-pressed", String((option.dataset.studentOption === "yes") === isStudent)));
    value.textContent = isStudent ? "39,90" : "49,90";
    cash.textContent = "ou R$ 497 à vista por ano";
    condition.innerHTML = isStudent ? "<strong>Condição anual exclusiva para aluno BIM Coder.</strong><span>Oferta válida após a confirmação do e-mail.</span>" : "<strong>Preço de fundador garantido.</strong><span>Renove por R$ 497/ano enquanto sua assinatura permanecer ativa.</span>";
    badge.textContent = isStudent ? "OFERTA ALUNO" : "OFERTA ÚNICA";
    if (badgeNote) badgeNote.textContent = isStudent ? "CONDIÇÃO EXCLUSIVA BIM CODER" : "DE FUNDADOR";
    checkout.dataset.plan = isStudent ? "aluno" : "anual";
    checkout.textContent = isStudent ? "Quero o plano de aluno — R$ 39,90/mês" : "Quero o plano anual — R$ 49,90/mês";
    card.classList.toggle("is-student", isStudent);
    card.classList.remove("is-price-changing");
    window.requestAnimationFrame(() => card.classList.add("is-price-changing"));
  };

  const resetDialog = () => {
    form.reset();
    emailInput.removeAttribute("aria-invalid");
    status.textContent = "";
    status.className = "student-validation-status";
    support.hidden = true;
    submit.disabled = false;
    submit.textContent = "Validar e continuar";
  };
  const openDialog = () => {
    resetDialog();
    dialog.showModal();
    window.requestAnimationFrame(() => emailInput.focus());
  };
  const closeDialog = () => {
    dialog.close();
    setStudent(false);
  };

  regularOption?.addEventListener("click", () => setStudent(false));
  studentOption?.addEventListener("click", openDialog);
  dialog.querySelector(".dialog-close")?.addEventListener("click", closeDialog);
  dialog.addEventListener("close", () => {
    if (!dialog.dataset.verified) setStudent(false);
    delete dialog.dataset.verified;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    emailInput.value = email;
    if (!emailInput.checkValidity()) {
      emailInput.setAttribute("aria-invalid", "true");
      status.textContent = "Digite um e-mail válido.";
      status.className = "student-validation-status is-error";
      emailInput.focus();
      return;
    }

    emailInput.removeAttribute("aria-invalid");
    submit.disabled = true;
    submit.textContent = "Verificando...";
    status.textContent = "Verificando seu e-mail de aluno...";
    status.className = "student-validation-status";
    support.hidden = true;

    try {
      const response = await fetch(STUDENT_VALIDATION.endpoint, {
        method: "POST",
        headers: {
          "apikey": STUDENT_VALIDATION.anonKey,
          "Authorization": "Bearer " + STUDENT_VALIDATION.anonKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Falha na validação.");

      if (!result.allowed) {
        setStudent(false);
        emailInput.setAttribute("aria-invalid", "true");
        status.textContent = "E-mail não encontrado na lista de alunos.";
        status.className = "student-validation-status is-error";
        support.hidden = false;
        submit.disabled = false;
        submit.textContent = "Validar novamente";
        return;
      }
      dialog.dataset.verified = "true";
      setStudent(true);
      status.textContent = "E-mail confirmado. Abrindo sua condição de aluno...";
      status.className = "student-validation-status is-success";
      window.setTimeout(() => window.location.assign(appendTracking(CHECKOUTS.aluno)), 450);
    } catch (error) {
      setStudent(false);
      status.textContent = "Não foi possível validar agora. Tente novamente ou fale com o suporte.";
      status.className = "student-validation-status is-error";
      support.hidden = false;
      submit.disabled = false;
      submit.textContent = "Tentar novamente";
    }
  });

  const reveal = () => card.classList.add("is-price-revealed");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) reveal();
  else {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      reveal();
      observer.disconnect();
    }, { threshold: 0.42 });
    observer.observe(card);
  }
  setStudent(false);
}
function initCheckoutLinks() {
  const dialog = document.getElementById("checkoutDialog");
  const closeButtons = dialog
    ? dialog.querySelectorAll(".dialog-close, .dialog-ok")
    : [];

  document.querySelectorAll(".checkout-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      const checkout = CHECKOUTS[link.dataset.plan];
      if (checkout) {
        link.href = appendTracking(checkout);
        return;
      }

      event.preventDefault();
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  if (dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
}

function appendTracking(url) {
  const target = new URL(url);
  const current = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "sck"].forEach((key) => {
    const value = current.get(key);
    if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
  });
  return target.toString();
}


function initConfigCarousel() {
  const carousel = document.querySelector("[data-config-carousel]");
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll("[data-config-slide]"));
  if (slides.length < 2) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  let index = 0;
  let timer = 0;
  let visible = false;

  const show = (nextIndex) => {
    index = nextIndex % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
  };
  const stop = () => {
    window.clearInterval(timer);
    timer = 0;
  };
  const start = () => {
    stop();
    if (!visible || document.hidden || reducedMotion?.matches) return;
    timer = window.setInterval(() => show(index + 1), 3200);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      if (visible) start();
      else stop();
    }, { threshold: [0, 0.25] });
    observer.observe(carousel);
  } else {
    visible = true;
    start();
  }

  document.addEventListener("visibilitychange", start);
  reducedMotion?.addEventListener?.("change", start);
  show(0);
}function initCotasComparison() {
  const videos = Array.from(document.querySelectorAll("[data-comparison-video]"));
  const playback = document.querySelector(".comparison-playback");
  const replay = document.querySelector(".comparison-replay");
  const label = document.querySelector("[data-comparison-playback-label]");
  if (!videos.length || !playback || !replay || !label) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const visibleVideos = new Set();
  let userPaused = false;

  const refreshLabel = () => {
    const playing = videos.some((video) => !video.paused && !video.ended);
    playback.querySelector(".comparison-control-icon").textContent = playing ? "Ⅱ" : "▶";
    label.textContent = playing ? "Pausar vídeos" : "Reproduzir vídeos";
  };
  const playVisible = (video, explicit = false) => {
    if (!visibleVideos.has(video) || userPaused || document.hidden) return;
    if (reducedMotion?.matches && !explicit) return;
    video.play().catch(() => {});
  };
  const syncVisibility = () => {
    videos.forEach((video) => {
      if (document.hidden || !visibleVideos.has(video)) video.pause();
      else playVisible(video);
    });
    refreshLabel();
  };

  videos.forEach((video) => {
    video.addEventListener("playing", refreshLabel);
    video.addEventListener("pause", refreshLabel);
    video.addEventListener("ended", refreshLabel);
    video.addEventListener("canplay", () => playVisible(video));
  });

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            visibleVideos.add(video);
            playVisible(video);
          } else {
            visibleVideos.delete(video);
            video.pause();
          }
        });
        refreshLabel();
      }, { threshold: [0, 0.35] })
    : null;

  videos.forEach((video) => {
    if (observer) observer.observe(video);
    else visibleVideos.add(video);
  });

  playback.addEventListener("click", () => {
    const shouldPause = videos.some((video) => !video.paused);
    userPaused = shouldPause;
    if (shouldPause) videos.forEach((video) => video.pause());
    else videos.filter((video) => visibleVideos.has(video)).forEach((video) => playVisible(video, true));
    refreshLabel();
  });

  replay.addEventListener("click", () => {
    userPaused = false;
    videos.forEach((video) => {
      video.currentTime = 0;
      if (visibleVideos.has(video)) playVisible(video, true);
    });
    refreshLabel();
  });

  document.addEventListener("visibilitychange", syncVisibility);
  reducedMotion?.addEventListener?.("change", (event) => {
    if (event.matches) {
      videos.forEach((video) => video.pause());
      refreshLabel();
      return;
    }
    syncVisibility();
  });
  refreshLabel();
}
function initDemonstrations() {
  const categories = window.DOCFLOW_DEMOS || [];
  const gallery = document.getElementById("tool-demos");
  const heroVideo = document.getElementById("hero-demo-video");
  const heroCaption = document.getElementById("hero-demo-caption");
  const heroPanel = document.getElementById("hero-demo-panel");
  const heroTools = document.getElementById("hero-demo-tools");
  if (!gallery || !heroVideo || !heroCaption || !heroPanel || !heroTools || !categories.length) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const loadVideo = (video, item, play) => {
    video.pause();
    video.src = item.src;
    video.setAttribute("aria-label", item.title);
    video.load();
    if (play && !reducedMotion.matches) video.play().catch(() => {});
  };

  const heroGroups = categories.map(group => ({
    ...group,
    videos: group.videos.filter(item => !item.id.startsWith("config-"))
  })).filter(group => group.videos.length);

  const activateHeroItem = (group, item, activeButton, play = true) => {
    heroTools.querySelectorAll(".demo-command").forEach(button => {
      const active = button === activeButton;
      button.setAttribute("aria-pressed", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    heroPanel.dataset.demoCategory = group.id;
    heroPanel.dataset.demoTool = item.id;
    heroCaption.textContent = item.title;
    loadVideo(heroVideo, item, play);
  };

  const renderHeroRibbon = () => {
    heroTools.replaceChildren();
    const commands = [];
    heroGroups.forEach(group => {
      const panel = make("section", "demo-command-panel");
      panel.style.setProperty("--panel-command-count", String(group.videos.length));
      panel.setAttribute("aria-label", group.label);
      const tools = make("div", "demo-command-panel-tools");
      const panelLabel = make("span", "demo-command-panel-label", group.label);
      group.videos.forEach(item => {
        const button = make("button", "demo-command");
        button.type = "button";
        button.setAttribute("aria-pressed", "false");
        button.tabIndex = -1;
        button.dataset.demoCategory = group.id;
        button.dataset.demoTool = item.id;
        button.title = item.title;
        const icon = make("img", "demo-command-icon");
        icon.src = item.icon;
        icon.alt = "";
        icon.setAttribute("aria-hidden", "true");
        const label = make("span", "demo-command-name", item.shortTitle || item.title);
        const pulse = make("span", "demo-command-pulse");
        pulse.setAttribute("aria-hidden", "true");
        button.append(icon, label, pulse);
        button.addEventListener("click", () => {
          button.classList.remove("is-clicking");
          void button.offsetWidth;
          button.classList.add("is-clicking");
          window.setTimeout(() => button.classList.remove("is-clicking"), 300);
          activateHeroItem(group, item, button, true);
        });
        tools.append(button);
        commands.push({ button, group, item });
      });
      panel.append(tools, panelLabel);
      heroTools.append(panel);
    });
    commands.forEach((command, index) => {
      command.button.addEventListener("keydown", event => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % commands.length;
        if (event.key === "ArrowLeft") next = (index - 1 + commands.length) % commands.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = commands.length - 1;
        const target = commands[next];
        activateHeroItem(target.group, target.item, target.button, true);
        target.button.focus();
      });
    });
    if (commands[0]) activateHeroItem(commands[0].group, commands[0].item, commands[0].button, true);
  };

  categories.forEach((group, index) => {
    if (!group.videos.length) return;
    const card = make("article", "tool-demo-card");
    card.dataset.category = group.id;
    const heading = make("div", "tool-demo-heading");
    heading.append(make("span", "tool-demo-label", String(index + 1).padStart(2, "0") + " / " + group.label));
    const title = make("h3", "", group.title);
    title.id = "demo-title-" + group.id;
    card.setAttribute("aria-labelledby", title.id);
    heading.append(title, make("p", "", group.description));
    card.append(heading);
    const video = make("video", "tool-demo-video");
    video.muted = true; video.loop = true; video.controls = true;
    video.playsInline = true; video.preload = "metadata";
    const caption = make("div", "tool-demo-detail");
    const videoTitle = make("h4", "", group.videos[0].title);
    const description = make("p", "", group.videos[0].description);
    caption.append(videoTitle, description);
    loadVideo(video, group.videos[0], false);
    card.append(video, caption);
    if (group.videos.length > 1) {
      const label = make("label", "tool-demo-select", "Escolha uma demonstração");
      const select = make("select");
      group.videos.forEach((item, number) => {
        const option = make("option", "", item.title);
        option.value = String(number); select.append(option);
      });
      select.addEventListener("change", () => {
        const item = group.videos[Number(select.value)];
        videoTitle.textContent = item.title;
        description.textContent = item.description;
        loadVideo(video, item, true);
      });
      label.append(select); card.append(label);
    }
    gallery.append(card);
  });

  document.querySelectorAll(".hero-demo video, .tool-demo-video").forEach(video => {
    if (video.dataset.errorBound) return;
    video.dataset.errorBound = "true";
    const message = make("p", "video-error", "Não foi possível carregar esta demonstração. Escolha outra ferramenta ou tente novamente.");
    message.hidden = true; video.after(message);
    video.addEventListener("error", () => { message.hidden = false; });
    video.addEventListener("loadeddata", () => { message.hidden = true; });
  });
  const updateMotion = () => {
    if (reducedMotion.matches) document.querySelectorAll(".hero-demo video, .tool-demo-video").forEach(video => video.pause());
  };
  reducedMotion.addEventListener("change", updateMotion);
  renderHeroRibbon();
  updateMotion();
}
function initConceptEntrance() {
  const hero = document.querySelector('.concept-hero');
  const theater = document.querySelector('.demo-theater');
  if (!hero || !theater) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  const render = () => {
    frame = 0;
    const vh = innerHeight;
    const top = theater.getBoundingClientRect().top;
    const progress = motion.matches ? 1 : Math.max(0, Math.min(1, (vh - top) / (vh * .7)));
    theater.style.setProperty('--entrance', progress);
    hero.style.setProperty('--drift', motion.matches ? '0px' : Math.min(hero.offsetHeight, Math.max(0, -hero.getBoundingClientRect().top)) * .16 + 'px');
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  render();
}

function initLaunchStory() {
  const story = document.querySelector('.launch-story');
  if (!story) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  let frame = 0;
  function render() {
    frame = 0;
    story.classList.toggle('launch-enhanced', !motion.matches);
    if (motion.matches) return;
    const rect = story.getBoundingClientRect();
    const p = clamp((70 - rect.top) / Math.max(1, story.offsetHeight - innerHeight + 70));
    const ignition = clamp((p - .18) / .22);
    const flight = clamp((p - .44) / .34);
    const distance = flight * flight;
    story.style.setProperty('--launch-p', p);
    story.style.setProperty('--ignition', ignition);
    story.style.setProperty('--copy-alpha', 1 - clamp((p - .4) / .18));
    story.style.setProperty('--copy-y', (-45 * clamp(p / .6)) + 'px');
    story.style.setProperty('--rocket-y', (-distance * innerHeight * 1.65) + 'px');
    story.style.setProperty('--rocket-x', (distance * innerWidth * .24) + 'px');
    story.style.setProperty('--rocket-turn', (flight * 26) + 'deg');
    story.style.setProperty('--arrival', clamp((p - .73) / .15));
    story.style.setProperty('--cue-alpha', 1 - clamp(p / .2));
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  render();
}
