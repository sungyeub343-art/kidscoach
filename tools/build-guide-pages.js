// 학부모 학습 가이드(guide/<slug>/index.html)와 목록(guide/index.html)을 생성합니다.
// 실행: node tools/build-guide-pages.js
const fs = require("fs");
const path = require("path");
const { SITE, PHONE, TODAY, esc, footer, header, head, bg } = require("./layout");
const guides = require("./guides");

const root = path.join(__dirname, "..");
const PUBLISHED = "2026-10-29";

const summary = (g) => g.description.split(/(?<=[.?!])\s/)[0];

const relatedFor = (g) => {
  const i = guides.indexOf(g);
  return [1, 2, 3].map((n) => guides[(i + n) % guides.length]);
};

const guidePage = (g) => {
  const url = `${SITE}/guide/${g.slug}/`;
  const ld = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", headline: g.title, description: g.description, url, mainEntityOfPage: url, inLanguage: "ko-KR", image: `${SITE}/og-image.jpg`, datePublished: PUBLISHED, dateModified: TODAY, author: { "@type": "Organization", name: "상상코칭", url: `${SITE}/` }, publisher: { "@type": "Organization", name: "상상코칭", logo: { "@type": "ImageObject", url: `${SITE}/favicon.svg` } } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "학부모 학습 가이드", item: `${SITE}/guide/` },
      { "@type": "ListItem", position: 3, name: g.title, item: url }] },
    { "@type": "FAQPage", mainEntity: g.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
  ] };
  return `${head({ title: `${g.seoTitle} - 상상코칭`, description: g.description, url, up: "../../", ld, ogType: "article" })}
<body>
  ${bg}
  ${header("../../")}
  <main>
    <article class="guide-article container reveal visible">
      <a class="breadcrumb" href="../">학부모 학습 가이드</a>
      <p class="eyebrow">${g.category} 가이드</p>
      <h1>${esc(g.title)}</h1>
      <p class="guide-meta">상상코칭 학습 가이드 · <time datetime="${TODAY}">${TODAY.replace(/-/g, ".")}</time> 업데이트</p>
      <p class="guide-lead">${esc(g.intro)}</p>
      <nav class="guide-toc" aria-label="목차"><strong>목차</strong><ol>${g.sections.map(([h], i) => `<li><a href="#s${i + 1}">${esc(h)}</a></li>`).join("")}<li><a href="#checklist">체크리스트</a></li><li><a href="#faq">자주 묻는 질문</a></li></ol></nav>
      ${g.sections.map(([h, ps], i) => `<section id="s${i + 1}"><h2>${esc(h)}</h2>${ps.map((p) => `<p>${esc(p)}</p>`).join("")}</section>`).join("\n      ")}
      <section id="checklist" class="guide-checklist"><h2>${esc(g.title)} 체크리스트</h2><ul>${g.checklist.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></section>
      <section id="faq" class="faq-list"><h2>자주 묻는 질문</h2>${g.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</section>
    </article>
    <section class="location-cta container reveal visible"><div><p class="eyebrow">혼자 고민하지 마세요</p><h2>우리 아이에게 맞는 시작점을 함께 찾아드려요</h2><p>${g.program[1]} 상담 · 첫 수업 무료 체험</p></div><a class="btn" href="tel:${PHONE}">${PHONE} <span aria-hidden="true">→</span></a></section>
    <section class="district-programs container reveal visible"><div class="section-head"><p class="eyebrow">함께 읽으면 좋은 가이드</p><h2>다른 학부모님들이 많이 찾는 글</h2></div><div class="program-grid">${relatedFor(g).map((r) => `<article class="program-card"><p>${r.category}</p><h3>${esc(r.title)}</h3><span>${esc(summary(r))}</span><a href="../${r.slug}/">가이드 읽기 <span aria-hidden="true">→</span></a></article>`).join("")}</div><p class="guide-program-link"><a href="${g.program[0]}">${g.program[1]} 안내 보기 →</a></p></section>
  </main>
  ${footer("../../")}
  <script src="../../script.js"></script>
</body>
</html>
`;
};

const hubPage = () => {
  const url = `${SITE}/guide/`;
  const title = "학부모 학습 가이드 | 한글 떼기·초등 입학 준비·수학·독해·공부습관 - 상상코칭";
  const description = "한글 떼는 시기, 7세 초등 입학 준비, 연산 실수와 문장제, 독해력, 파닉스, 숙제 습관까지 유아·초등 학부모님이 자주 찾는 학습 고민을 정리한 가이드입니다.";
  const ld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", name: title, url, description, inLanguage: "ko-KR", isPartOf: { "@type": "WebSite", name: "상상코칭", url: `${SITE}/` } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: `${SITE}/` }, { "@type": "ListItem", position: 2, name: "학부모 학습 가이드", item: url }] },
    { "@type": "ItemList", itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.title, url: `${SITE}/guide/${g.slug}/` })) }
  ] };
  return `${head({ title, description, url, up: "../", ld })}
<body>
  ${bg}
  ${header("../")}
  <main>
    <section class="location-hero container reveal visible"><div><a class="breadcrumb" href="../">상상코칭 홈</a><p class="eyebrow">학부모 학습 가이드</p><h1>아이 공부 고민,<br /><span>여기서부터 시작하세요</span></h1><p class="hero-text">유아·초등 학부모님이 가장 많이 묻는 질문을 연령과 과목별로 정리했습니다. 집에서 바로 해볼 수 있는 방법과 체크리스트를 확인하세요.</p></div><div class="location-hero-note"><strong>한글 · 수학 · 영어 · 습관</strong><span>더 궁금한 점은 ${PHONE}로 상담하세요.</span></div></section>
    <section class="district-programs container reveal visible"><div class="program-grid">${guides.map((g) => `<article class="program-card"><p>${g.category}</p><h3>${esc(g.title)}</h3><span>${esc(summary(g))}</span><a href="${g.slug}/">가이드 읽기 <span aria-hidden="true">→</span></a></article>`).join("")}</div></section>
    <section class="location-cta container reveal visible"><div><p class="eyebrow">무료 상담</p><h2>우리 아이 상황에 맞는 답이 필요하다면</h2><p>아이의 나이와 고민을 알려주시면 첫 체험 수업에서 현재 수준을 함께 확인합니다.</p></div><a class="btn" href="tel:${PHONE}">${PHONE} <span aria-hidden="true">→</span></a></section>
  </main>
  ${footer("../")}
  <script src="../script.js"></script>
</body>
</html>
`;
};

fs.mkdirSync(path.join(root, "guide"), { recursive: true });
fs.writeFileSync(path.join(root, "guide/index.html"), hubPage());
for (const g of guides) {
  fs.mkdirSync(path.join(root, "guide", g.slug), { recursive: true });
  fs.writeFileSync(path.join(root, "guide", g.slug, "index.html"), guidePage(g));
}

// sitemap.xml과 rss.xml에 가이드 항목을 다시 씁니다.
const sitemapPath = path.join(root, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8").replace(/\s*<url>\s*<loc>https:\/\/kidscoach\.kr\/guide\/[\s\S]*?<\/url>/g, "");
const urls = [`${SITE}/guide/`, ...guides.map((g) => `${SITE}/guide/${g.slug}/`)];
sitemap = sitemap.replace("</urlset>", urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`).join("") + "</urlset>");
fs.writeFileSync(sitemapPath, sitemap);

const rssPath = path.join(root, "rss.xml");
let rss = fs.readFileSync(rssPath, "utf8").replace(/\s*<item>\s*<title>[^<]*<\/title>\s*<link>https:\/\/kidscoach\.kr\/guide\/[\s\S]*?<\/item>/g, "");
const pubDate = new Date(`${PUBLISHED}T09:00:00+09:00`).toUTCString();
rss = rss.replace("  </channel>", guides.map((g) => `    <item>\n      <title>${esc(g.seoTitle)}</title>\n      <link>${SITE}/guide/${g.slug}/</link>\n      <guid>${SITE}/guide/${g.slug}/</guid>\n      <description>${esc(g.description)}</description>\n      <pubDate>${pubDate}</pubDate>\n    </item>\n`).join("") + "  </channel>");
fs.writeFileSync(rssPath, rss);
console.log(`생성 완료: 목록 1개 + 가이드 ${guides.length}개`);
