// 생성 스크립트(build-area-pages.js, build-guide-pages.js)가 함께 쓰는 공통 레이아웃입니다.
const SITE = "https://kidscoach.kr";
const PHONE = "010-2928-3614";
const TODAY = new Date().toISOString().slice(0, 10);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const footerLinks = [["preschool", "유아 과외"], ["hangul", "한글 방문 학습"], ["elementary-math", "초등 수학 과외"], ["study-habits", "공부습관 코칭"], ["english-test", "영어 레벨테스트"], ["coding", "코딩 과외"], ["guide", "학습 가이드"], ["area", "주요 지역 과외"], ["cities", "지역별 수업"]];
const footer = (up) => `<footer class="site-footer"><div class="container footer-wrap"><p><strong>상상코칭</strong> | kidscoach.kr | 상담 <a href="tel:${PHONE}">${PHONE}</a></p><p>${footerLinks.map(([href, label]) => `<a href="${up}${href}/">${label}</a>`).join(" · ")}</p></div></footer>`;
const header = (up) => `<header class="site-header"><div class="container nav-wrap"><a class="brand" href="${up}" aria-label="상상코칭 홈"><span class="brand-mark">K</span><strong>상상코칭</strong></a><nav class="nav-links"><a href="${up}#programs">프로그램</a><details class="category-menu"><summary>카테고리</summary><div class="category-menu-links"><a href="${up}preschool/">유아 한글·수학 과외</a><a href="${up}elementary-math/">초등 수학 과외</a><a href="${up}study-habits/">초등 공부습관 코칭</a><a href="${up}hangul/">한글 방문 학습</a><a href="${up}area/">주요 지역 과외</a><a href="${up}guide/">학부모 학습 가이드</a><a href="${up}english-test/">영어 레벨테스트</a><a href="${up}coding/">코딩 과외</a></div></details></nav><a class="btn btn-sm" href="tel:${PHONE}">무료 상담</a></div></header>`;
const head = ({ title, description, url, up, ld, ogType = "website" }) => `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" href="${up}favicon.svg" type="image/svg+xml" />
  <meta name="theme-color" content="#0ea5a2" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:site_name" content="상상코칭" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Gowun+Dodum&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${up}style.css" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>`;
const bg = `<div class="bg-decor" aria-hidden="true"><span class="blob blob-1"></span><span class="blob blob-2"></span><span class="grid"></span></div>`;

module.exports = { SITE, PHONE, TODAY, esc, footer, header, head, bg };
