const CHECKOUTS = {
  mensal: "",
  anual: "",
  aluno: ""
};

document.addEventListener("DOMContentLoaded", () => {
  initTimeStory();
  initHeroManifestoTransition();
  initScrollReveals();
  initPageEffects();
  initConfigVideo();
  initCotasComparison();
  initDemonstrations();
  initConceptEntrance();
  initLaunchStory();
  initCommandShowcase();
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
function initCommandShowcase() {
  const track = document.getElementById("salesScTrack");
  const stage = document.getElementById("salesScStage");
  const section = document.querySelector(".sales-showcase");
  if (!track || !stage || !section || typeof COMANDOS === "undefined") return;

  const items = COMANDOS;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const cards = [];
  let index = 0;
  let timer = 0;
  let sectionVisible = false;
  let startX = null;

  const pad = (value) => String(value).padStart(2, "0");
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  items.forEach((item, itemIndex) => {
    const card = make("article", item.teaser ? "sales-sc-card sales-sc-teaser-card" : "sales-sc-card");
    card.dataset.index = String(itemIndex);

    if (item.teaser) {
      const teaser = make("div", "sales-sc-teaser");
      teaser.append(make("span", "sales-sc-teaser-mark", "+"), make("h3", "", item.nome), make("p", "", item.descricao));
      card.append(teaser);
    } else {
      const media = make("div", "sales-sc-media");
      const video = document.createElement("video");
      video.src = item.media + ".mp4";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", item.painel + " · " + item.nome);
      media.append(video);
      card.classList.add("has-media");

      video.addEventListener("error", () => {
        card.classList.remove("has-media");
        const empty = make("div", "sales-sc-empty");
        if (item.icon) {
          const icon = document.createElement("img");
          icon.src = item.icon;
          icon.alt = "";
          icon.width = 96;
          icon.height = 96;
          icon.addEventListener("error", () => icon.replaceWith(make("span", "", "D")));
          empty.append(icon);
        } else {
          empty.append(make("span", "", "D"));
        }
        empty.append(make("small", "", "Demonstração em breve"));
        media.replaceChildren(empty);
      });

      const body = make("div", "sales-sc-body");
      body.append(make("span", "sales-sc-panel", item.painel), make("h3", "", item.nome), make("p", "", item.descricao));
      card.append(media, body);
    }

    card.addEventListener("click", () => {
      if (itemIndex !== index) go(itemIndex);
    });
    track.append(card);
    cards.push(card);
  });

  document.getElementById("salesScTotal").textContent = pad(items.length);

  const syncPlayback = () => {
    cards.forEach((card, cardIndex) => {
      const video = card.querySelector("video");
      if (!video) return;
      if (cardIndex === index && sectionVisible && !document.hidden && !reducedMotion?.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
        if (cardIndex !== index) video.currentTime = 0;
      }
    });
  };

  const render = () => {
    const mobile = window.innerWidth < 600;
    const spacing = mobile ? 88 : 132;
    const angle = mobile ? -14 : -19;

    cards.forEach((card, cardIndex) => {
      const offset = cardIndex - index;
      const distance = Math.min(Math.abs(offset), 4);
      card.style.transform = "translate(-50%,0) translateX(" + (offset * spacing) + "px) rotateY(" + (offset * angle) + "deg) scale(" + (1 - distance * 0.08) + ")";
      card.style.opacity = String(Math.max(0, 1 - distance * 0.3));
      card.style.zIndex = String(50 - distance);
      card.style.pointerEvents = distance > 3 ? "none" : "auto";
      card.classList.toggle("is-active", offset === 0);
      card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
      card.inert = offset !== 0;
    });

    const current = items[index];
    document.getElementById("salesScKicker").textContent = current.painel + " · " + current.nome;
    document.getElementById("salesScNow").textContent = pad(index + 1);
    document.getElementById("salesScBar").style.width = (((index + 1) / items.length) * 100) + "%";
    syncPlayback();
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = 0;
  };
  const restart = () => {
    stop();
    if (!sectionVisible || reducedMotion?.matches) return;
    timer = window.setInterval(() => go(index + 1), 5000);
  };
  const go = (target) => {
    index = (target + items.length) % items.length;
    render();
    restart();
  };

  document.getElementById("salesScPrev").addEventListener("click", () => go(index - 1));
  document.getElementById("salesScNext").addEventListener("click", () => go(index + 1));
  stage.addEventListener("mouseenter", stop);
  stage.addEventListener("mouseleave", restart);
  stage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  });

  stage.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    stop();
    stage.classList.add("is-dragging");
    stage.setPointerCapture?.(event.pointerId);
  });
  stage.addEventListener("pointerup", (event) => {
    stage.classList.remove("is-dragging");
    if (startX === null) return;
    const delta = event.clientX - startX;
    startX = null;
    if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
    else restart();
  });
  stage.addEventListener("pointercancel", () => {
    startX = null;
    stage.classList.remove("is-dragging");
    restart();
  });

  const observer = new IntersectionObserver(([entry]) => {
    sectionVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
    if (sectionVisible) restart();
    else stop();
    syncPlayback();
  }, { threshold: [0, 0.2] });
  observer.observe(section);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else restart();
    syncPlayback();
  });
  reducedMotion?.addEventListener?.("change", () => {
    if (reducedMotion.matches) stop();
    else restart();
    syncPlayback();
  });
  window.addEventListener("resize", render);
  stage.tabIndex = 0;
  render();
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
  const card = document.querySelector(".pricing-section .price-card");
  const value = document.querySelector("[data-price-value]");
  const condition = document.querySelector("[data-price-condition]");
  const badge = document.querySelector("[data-price-badge]");
  const checkout = document.querySelector("[data-price-cta]");
  if (!switcher || !card || !value || !condition || !badge || !checkout) return;

  const options = Array.from(switcher.querySelectorAll("[data-student-option]"));
  const setStudent = (isStudent) => {
    switcher.dataset.student = isStudent ? "yes" : "no";
    options.forEach((option) => {
      option.setAttribute("aria-pressed", String((option.dataset.studentOption === "yes") === isStudent));
    });

    value.textContent = isStudent ? "497" : "597";
    condition.textContent = isStudent
      ? "Desconto de lançamento para aluno BIM Coder: R$ 300 no primeiro ano. Depois, renovação por R$ 797/ano."
      : "Desconto de lançamento de R$ 200 no primeiro ano. Depois, renovação por R$ 797/ano.";
    badge.textContent = isStudent ? "Desconto de lançamento · aluno" : "Desconto de lançamento";
    checkout.dataset.plan = isStudent ? "aluno" : "anual";
    checkout.textContent = isStudent
      ? "Garantir desconto de aluno — R$ 497"
      : "Garantir desconto de lançamento — R$ 597";
    card.classList.toggle("is-student", isStudent);
    card.classList.remove("is-price-changing");
    window.requestAnimationFrame(() => card.classList.add("is-price-changing"));
  };

  options.forEach((option, index) => {
    option.addEventListener("click", () => setStudent(option.dataset.studentOption === "yes"));
    option.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = options[(index + direction + options.length) % options.length];
      next.focus();
      setStudent(next.dataset.studentOption === "yes");
    });
  });
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


function initConfigVideo() {
  const video = document.getElementById("config-video");
  if (!video) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const section = video.closest(".honest-section");
  const syncOrientation = () => {
    if (!section || !video.videoWidth || !video.videoHeight) return;
    section.classList.toggle("config-landscape", video.videoWidth > video.videoHeight);
  };
  video.addEventListener("loadedmetadata", syncOrientation);
  if (video.readyState >= 1) syncOrientation();

  let visible = false;
  const sync = (explicit = false) => {
    if (!visible || document.hidden || (reducedMotion?.matches && !explicit)) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      sync();
    }, { threshold: [0, 0.35] });
    observer.observe(video);
  } else {
    visible = true;
    sync();
  }

  video.addEventListener("play", () => sync(true));
  document.addEventListener("visibilitychange", () => sync());
  reducedMotion?.addEventListener?.("change", () => sync());
}
function initCotasComparison() {
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
  const tabs = Array.from(document.querySelectorAll(".demo-tabs [data-demo-category]"));
  if (!gallery || !heroVideo || !categories.length) return;
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
  const activateTab = (tab, focus = false) => {
    const group = categories.find(item => item.id === tab.dataset.demoCategory);
    if (!group || !group.videos.length) return;
    tabs.forEach(button => {
      const active = button === tab;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    heroPanel.setAttribute("aria-labelledby", tab.id);
    heroPanel.dataset.demoCategory = group.id;
    const heroDemo = group.heroSrc
      ? { src: group.heroSrc, title: group.heroTitle || group.title }
      : group.videos[0];
    heroCaption.textContent = heroDemo.title;
    loadVideo(heroVideo, heroDemo, true);
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", event => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activateTab(tabs[next], true); }
    });
  });
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
  activateTab(tabs.find(tab => tab.getAttribute("aria-selected") === "true") || tabs[0]);
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
