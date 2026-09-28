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

const setMetaContent = (selector, content) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (selector.includes("property=")) {
      element.setAttribute("property", selector.match(/property="([^"]+)"/)?.[1] || "");
    } else {
      element.setAttribute("name", selector.match(/name="([^"]+)"/)?.[1] || "");
    }
    document.head.append(element);
  }
  element.setAttribute("content", content);
};

if (window.location.pathname.endsWith("/district.html")) {
  const districtParams = new URLSearchParams(window.location.search);
  const canonicalParams = new URLSearchParams();
  ["region", "district", "neighborhood"].forEach((key) => {
    const value = districtParams.get(key);
    if (value) canonicalParams.set(key, value);
  });

  const canonicalUrl = `${window.location.origin}${window.location.pathname}?${canonicalParams.toString()}`;
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = canonicalUrl;

  setMetaContent('meta[name="robots"]', districtParams.has("neighborhood") ? "noindex, follow" : "index, follow, max-image-preview:large");
  setMetaContent('meta[property="og:type"]', "website");
  setMetaContent('meta[property="og:locale"]', "ko_KR");
  setMetaContent('meta[property="og:title"]', document.title);
  setMetaContent('meta[property="og:description"]', document.querySelector('meta[name="description"]')?.content || "");
  setMetaContent('meta[property="og:url"]', canonicalUrl);

  const faqItems = [...document.querySelectorAll(".faq-list details")].map((item) => ({
    "@type": "Question",
    "name": item.querySelector("summary")?.textContent.trim(),
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.querySelector("p")?.textContent.trim()
    }
  })).filter((item) => item.name && item.acceptedAnswer.text);

  if (faqItems.length) {
    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems
    });
    document.head.append(faqSchema);
  }
}
