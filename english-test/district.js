const params = new URLSearchParams(window.location.search);
const regionName = params.get("region") || "서울특별시";
const districtName = params.get("district") || "강남구";
const neighborhoodName = params.get("neighborhood");
const pageAreaName = neighborhoodName ? `${districtName} ${neighborhoodName}` : districtName;
const content = document.querySelector("#district-content");
const programCards = [
  ["영어 기초 레벨 진단", "유아·초1~초2", "파닉스, 기초 어휘, 듣기와 말하기 반응을 살펴 아이에게 맞는 시작 수준을 확인합니다."],
  ["영어 레벨테스트 집중 대비", "초1~초6", "리딩, 어휘, 문법, 리스닝 문제를 시험 유형에 맞춰 연습하고 취약 영역을 보완합니다."],
  ["인터뷰·서술형 실전 준비", "유아·초등", "자기소개와 그림 묘사, 질문 답변, 짧은 글쓰기를 연습해 생각을 영어로 표현하는 힘을 기릅니다."]
];
const learningTopics = [
  ["시험 유형과 현재 수준 확인", `${pageAreaName} 영어 과외 상담에서는 지원 학교와 시험 일정, 출제 영역을 확인하고 아이의 리딩, 어휘, 문법, 리스닝과 말하기 수준을 먼저 살펴봅니다.`],
  ["리딩·어휘·문법 보완", "지문을 정확히 읽고 핵심 내용을 찾는 연습부터 문맥 속 어휘와 학년별 문법까지 오답 원인에 맞춰 차근차근 보완합니다."],
  ["리스닝·스피킹·인터뷰 연습", "질문을 끝까지 듣고 핵심에 맞게 답하는 연습을 반복합니다. 자기소개, 그림 묘사와 후속 질문에도 자연스럽게 이어 말하도록 돕습니다."],
  ["모의테스트와 시험 전략", `${pageAreaName} 레벨테스트 일정에 맞춰 제한 시간 안에 문제를 풀고 답안을 점검합니다. 결과를 분석해 시험 전까지 필요한 학습 우선순위를 조정합니다.`]
];
const faqs = [
  [`${pageAreaName} 영어 레벨테스트 대비는 언제 시작하면 좋나요?`, "시험 유형과 아이의 현재 수준에 따라 준비 기간이 달라집니다. 시험 일정과 최근 학습 내용을 알려주시면 진단 후 필요한 기간과 수업 방향을 안내합니다."],
  ["처음 영어 레벨테스트를 보는 아이도 가능한가요?", "가능합니다. 문제 형식과 시험 진행 방식을 익히는 것부터 시작해 낯선 환경에서도 차분히 답할 수 있도록 단계적으로 연습합니다."],
  ["리딩과 문법 외에 영어 인터뷰도 준비하나요?", "네. 자기소개, 일상 질문, 그림 묘사와 추가 질문을 연습하며 짧은 답을 이유와 예시가 있는 문장으로 확장하도록 지도합니다."],
  ["학교에서 받은 샘플 문제로 수업할 수 있나요?", "가능합니다. 학교 안내문과 샘플 문제, 기존 성적표가 있다면 출제 영역과 난이도를 분석해 수업 계획에 반영합니다."],
  [`${pageAreaName} 영어 과외는 방문과 화상 수업이 모두 가능한가요?`, "지역과 일정, 아이의 학년과 학습 환경을 확인한 뒤 방문, 화상 또는 혼합형 중 적합한 방식을 상담합니다."]
];

if (content) {
  document.title = `${pageAreaName} 영어 레벨테스트 대비 과외 문의 | 키즈상상코칭`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", `${pageAreaName} 유아·초등 영어 레벨테스트 대비 과외, 리딩·문법·리스닝·인터뷰 맞춤 수업을 안내합니다.`);
  content.innerHTML = `
    <section class="district-hero english-test-hero container reveal visible"><div><a class="breadcrumb" href="index.html">영어 레벨테스트</a><p class="eyebrow">${regionName} ${pageAreaName} 맞춤 영어</p><h1>${pageAreaName}<br /><span>영어 레벨테스트 대비<br class="english-test-title-break" />과외 문의</span></h1><p class="hero-text">아이의 현재 영어 수준과 시험 유형을 살펴 ${pageAreaName} 가정에 맞는 1:1 레벨테스트 대비 수업을 안내합니다.</p><div class="hero-cta"><a class="btn" href="../#contact">${pageAreaName} 영어 과외 문의</a><a class="btn btn-ghost" href="index.html">다른 지역 찾기</a></div></div><aside class="district-fact"><span class="fact-label">${regionName} · ${pageAreaName}</span><strong>진단부터 실전까지<br />맞춤 영어 대비</strong><p>필요한 시험 영역을 아이의 수준과 일정에 맞춰 준비합니다.</p></aside></section>
    <section class="district-programs container reveal visible"><div class="section-head"><p class="eyebrow">맞춤 영어 프로그램</p><h2>${pageAreaName} 영어 레벨테스트 대비 과외</h2></div><div class="program-grid">${programCards.map(([title, age, description]) => `<article class="program-card"><p>${age}</p><h3>${title}</h3><span>${description}</span><a href="../#contact">문의하기 <span aria-hidden="true">→</span></a></article>`).join("")}</div></section>
    <section class="district-topics container reveal visible"><div class="section-head"><p class="eyebrow">영역별 대비 안내</p><h2>${pageAreaName} 레벨테스트 수업은 이렇게 진행합니다</h2></div><div class="topic-grid">${learningTopics.map(([title, description]) => `<article><h3>${title}</h3><p>${description}</p></article>`).join("")}</div></section>
    <section class="district-faq container reveal visible"><div class="section-head"><p class="eyebrow">자주 묻는 질문</p><h2>${pageAreaName} 영어 레벨테스트 대비 FAQ</h2></div><div class="faq-list">${faqs.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("")}</div></section>
    <section class="district-flow container reveal visible"><div class="section-head"><p class="eyebrow">시험에 맞는 준비 과정</p><h2>상담부터 레벨테스트까지</h2></div><div class="flow-grid"><article><b>01</b><h3>시험·수준 확인</h3><p>시험 일정과 유형, 아이의 영역별 현재 수준을 확인합니다.</p></article><article><b>02</b><h3>맞춤 대비 수업</h3><p>취약 영역을 보완하고 문제 풀이와 인터뷰 전략을 익힙니다.</p></article><article><b>03</b><h3>모의테스트·피드백</h3><p>실전 연습 결과를 점검하고 시험 전 학습 방향을 조정합니다.</p></article></div></section>
    <section class="district-cta container reveal visible"><div><p class="eyebrow">${pageAreaName} 영어 과외 상담</p><h2>아이에게 필요한 레벨테스트 준비를 찾아보세요</h2></div><a class="btn" href="../#contact">영어 과외 문의 <span aria-hidden="true">→</span></a></section>`;
  content.querySelector(".district-hero")?.insertAdjacentHTML("afterend", `<section class="district-promo container"><img src="../[복사본] 파워잉글리시.jpg" alt="유아·초등 영어 수업과 레벨테스트 대비 과외 안내" width="900" height="11700" loading="lazy" decoding="async" /></section>`);
}

const neighborhoodMaps = {
  "서울특별시": seoulNeighborhoods,
  "경기도": gyeonggiNeighborhoods,
  "인천광역시": incheonNeighborhoods,
  "부산광역시": busanNeighborhoods,
  "대구광역시": daeguNeighborhoods,
  "광주광역시": gwangjuNeighborhoods,
  "울산광역시": ulsanNeighborhoods,
  ...nationalNeighborhoods
};
const neighborhoodList = neighborhoodMaps[regionName]?.[districtName];
if (!neighborhoodName && neighborhoodList && content) {
  const neighborhoodSection = document.createElement("section");
  neighborhoodSection.className = "district-neighborhoods container reveal visible";
  neighborhoodSection.innerHTML = `<div class="section-head"><p class="eyebrow">동네별 영어 과외 안내</p><h2>${districtName} 동·읍·면 지역 선택</h2><p class="hero-text">거주 또는 수업 희망 동네를 선택하면 해당 지역의 영어 레벨테스트 대비 과외 문의 페이지로 이동합니다.</p></div><div class="neighborhood-links">${neighborhoodList.map((neighborhood) => `<a href="${neighborhoodUrl(regionName, districtName, neighborhood)}">${neighborhood}<span aria-hidden="true">↗</span></a>`).join("")}</div>`;
  content.append(neighborhoodSection);
}
