const params = new URLSearchParams(window.location.search);
const regionName = params.get("region") || "서울특별시";
const districtName = params.get("district") || "강남구";
const neighborhoodName = params.get("neighborhood");
const pageAreaName = neighborhoodName ? `${districtName} ${neighborhoodName}` : districtName;
const content = document.querySelector("#district-content");
const programCards = [
  ["유아 한글·수학 학습", "만 4~7세", "유아 한글 읽기와 쓰기, 수 감각을 놀이 활동으로 차근차근 익혀요."],
  ["예비초등·초등 저학년 기초", "7세·초1~초3", "초등 입학 준비부터 국어 읽기, 기초 연산, 학교 숙제 관리까지 아이의 속도에 맞춰 진행해요."],
  ["초등 과목·공부습관 코칭", "초3~초6", "초등 국어·수학·영어 학습과 오답 정리, 주간 계획으로 자기주도학습 습관을 만들어요."]
];
const learningTopics = [
  ["유아 한글·수학·영어", `${districtName} 유아 한글 학습은 글자와 소리를 연결하는 읽기 활동부터 시작합니다. 유아 수학은 수 세기와 비교, 규칙 찾기로 수 감각을 익히고, 유아 영어는 아이의 흥미와 집중 시간에 맞춰 듣기와 말하기를 자연스럽게 이어갑니다.`],
  ["7세 예비초등 준비", `${districtName} 예비초등 아이는 초등 입학 전 한글 읽기, 기초 연산, 필기와 책상에 앉는 시간을 함께 살펴봅니다. 일률적인 선행보다 현재 수준을 확인해 학교생활에 필요한 기초 학습 습관을 준비합니다.`],
  ["초등 국어·수학·영어", `${districtName} 초등 과외 상담에서는 국어 읽기 이해와 문해력, 수학 연산과 문제 해결, 영어 기초를 아이의 학년과 목표에 맞춰 확인합니다. 필요한 과목부터 1:1 학습 계획으로 연결합니다.`],
  ["초등 숙제·공부습관 관리", `숙제 미루기, 연산 실수, 집중 시간 부족처럼 가정에서 자주 보이는 고민도 함께 다룹니다. 주간 목표와 오답 정리, 학부모 피드백으로 ${districtName} 초등학생의 자기주도학습 루틴을 돕습니다.`]
];
const faqs = [
  [`${districtName} 유아 한글 학습은 몇 세부터 가능한가요?`, "만 4세부터 7세까지 아이의 한글 노출 경험과 집중 시간을 확인한 뒤 읽기, 쓰기, 어휘 활동의 시작점을 정합니다."],
  [`${districtName} 7세 예비초등 수업에서는 무엇을 준비하나요?`, "한글 읽기와 쓰기, 기초 연산, 수업 집중 시간, 학습 태도를 살펴보고 초등 입학 후 필요한 기초를 아이에게 맞춰 준비합니다."],
  [`${districtName} 초등 수학 과외는 연산만 진행하나요?`, "연산 정확도를 바탕으로 문제 이해, 풀이 설명, 오답 정리까지 함께 확인합니다. 아이가 어려워하는 단원과 학습 목표에 따라 내용을 조정합니다."],
  [`${districtName} 초등 국어·영어 학습도 상담할 수 있나요?`, "가능합니다. 국어는 읽기 이해와 어휘, 영어는 기초 읽기와 학습 습관을 중심으로 현재 수준을 확인한 뒤 필요한 과목을 안내합니다."],
  [`${districtName} 초등 숙제 관리와 공부습관 코칭도 가능한가요?`, "가능합니다. 숙제 진행 상황, 집중 시간, 오답 정리 방식을 확인해 가정에서 이어갈 수 있는 주간 학습 루틴을 함께 만듭니다."]
];
if (content) {
  const categoryLabelObserver = new MutationObserver(() => {
    if (content.innerHTML.includes("지역별 안내")) {
      content.innerHTML = content.innerHTML.replaceAll("지역별 안내", "유아·초등 학습지 과외");
      categoryLabelObserver.disconnect();
    }
  });
  categoryLabelObserver.observe(content, { childList: true });
  document.title = `${pageAreaName} 유아·초등 학습지 과외 | 키즈코치`;
  const description = `${pageAreaName} 유아 한글·수학, 7세 예비초등, 초등 국어·수학·영어와 공부습관을 위한 1:1 학습 상담을 안내합니다.`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  content.innerHTML = `<section class="district-hero container reveal visible"><div><a class="breadcrumb" href="index.html">지역별 안내</a><p class="eyebrow">${regionName} ${districtName} 맞춤 안내</p><h1>${districtName}에서<br /><span>아이의 첫 공부 습관</span>을 시작하세요</h1><p class="hero-text">키즈코치는 ${districtName} 가정의 생활 패턴과 아이의 현재 수준을 상담해 유아·초등 학습지 과외를 맞춤 연결합니다.</p><div class="hero-cta"><a class="btn" href="../#contact">${districtName} 무료 상담</a><a class="btn btn-ghost" href="index.html">다른 지역 찾기</a></div></div><aside class="district-fact"><span class="fact-label">${regionName} · ${districtName}</span><strong>방문과 화상<br />모두 가능</strong><p>수업 방식과 시간은 상담 후 아이에게 맞춰 정합니다.</p></aside></section><section class="district-programs container reveal visible"><div class="section-head"><p class="eyebrow">지역 맞춤 프로그램</p><h2>${districtName} 유아·초등 학습지 과외</h2></div><div class="program-grid">${programCards.map(([title, age, description]) => `<article class="program-card"><p>${age}</p><h3>${title}</h3><span>${description}</span><a href="../#contact">상담하기 <span aria-hidden="true">→</span></a></article>`).join("")}</div></section><section class="district-topics container reveal visible"><div class="section-head"><p class="eyebrow">연령·과목별 학습 안내</p><h2>${districtName} 유아·초등 학습, 이렇게 살펴봅니다</h2></div><div class="topic-grid">${learningTopics.map(([title, description]) => `<article><h3>${title}</h3><p>${description}</p></article>`).join("")}</div></section><section class="district-faq container reveal visible"><div class="section-head"><p class="eyebrow">자주 묻는 질문</p><h2>${districtName} 유아·초등 학습 상담 FAQ</h2></div><div class="faq-list">${faqs.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("")}</div></section><section class="district-flow container reveal visible"><div class="section-head"><p class="eyebrow">아이에게 맞는 시작</p><h2>상담부터 수업 정착까지</h2></div><div class="flow-grid"><article><b>01</b><h3>현재 학습 확인</h3><p>아이의 연령, 성향, 학습지 경험을 가볍게 확인합니다.</p></article><article><b>02</b><h3>수업 방식 매칭</h3><p>방문·화상·혼합형 중 가정에 편한 방식으로 안내합니다.</p></article><article><b>03</b><h3>주간 리포트</h3><p>학습 진도와 성장 포인트를 매주 공유합니다.</p></article></div></section><section class="location-cta container reveal visible"><div><p class="eyebrow">${districtName} 학부모님을 위한 상담</p><h2>우리 아이에게 맞는 수업을 함께 찾아볼까요?</h2><p>상담 신청서에 거주 지역과 아이의 나이를 남겨주세요.</p></div><a class="btn" href="../#contact">무료 상담 신청 <span aria-hidden="true">→</span></a></section>`;
}
if (!neighborhoodName && seoulNeighborhoods[districtName] && content) {
  const neighborhoodSection = document.createElement("section");
  neighborhoodSection.className = "district-neighborhoods container reveal visible";
  neighborhoodSection.innerHTML = `<div class="section-head"><p class="eyebrow">동네별 수업 안내</p><h2>${districtName} 동·읍·면 지역 선택</h2><p class="hero-text">거주 또는 수업 희망 동네를 선택하면 해당 지역 상담 페이지로 이동합니다.</p></div><div class="neighborhood-links">${seoulNeighborhoods[districtName].map((neighborhood) => `<a href="${neighborhoodUrl(regionName, districtName, neighborhood)}">${neighborhood}<span aria-hidden="true">↗</span></a>`).join("")}</div>`;
  content.append(neighborhoodSection);
}
if (neighborhoodName && content) content.innerHTML = content.innerHTML.replaceAll(districtName, pageAreaName);