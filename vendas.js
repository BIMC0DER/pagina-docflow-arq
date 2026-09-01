const CHECKOUTS = {
  mensal: "",
  anual: ""
};

document.addEventListener("DOMContentLoaded", () => {
  initCalculator();
  initFaq();
  initCheckoutLinks();
});

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

function initCheckoutLinks() {
  const dialog = document.getElementById("checkoutDialog");
  const closeButtons = dialog
    ? dialog.querySelectorAll(".dialog-close, .dialog-ok")
    : [];

  document.querySelectorAll(".checkout-link").forEach((link) => {
    const plan = link.dataset.plan;
    const checkout = CHECKOUTS[plan];

    if (checkout) {
      link.href = appendTracking(checkout);
      return;
    }

    link.addEventListener("click", (event) => {
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
