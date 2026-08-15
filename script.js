const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const countUp = (element, target) => {
  const duration = 1400;
  const start = performance.now();
  const isDecimal = String(target).includes(".");

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;

    element.textContent = isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

const metricObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const numEl = entry.target;
      const target = Number(numEl.dataset.target || 0);
      countUp(numEl, target);
      obs.unobserve(numEl);
    });
  },
  { threshold: 0.55 }
);

document.querySelectorAll(".num").forEach((el) => metricObserver.observe(el));
