const params = new URLSearchParams(window.location.search);
const regionName = params.get("region") || "서울특별시";
const districtName = params.get("district") || "강남구";
const neighborhoodName = params.get("neighborhood");
const pageAreaName = neighborhoodName ? `${districtName} ${neighborhoodName}` : districtName;
const content = document.querySelector("#district-content");
const programCards = [
  ["5세 한글 놀이", "5세", "그림과 말놀이로 글자와 소리를 연결하고 자음과 모음에 자연스럽게 익숙해집니다."],
  ["6세 한글 읽기", "6세", "익숙한 낱말과 짧은 문장을 소리 내어 읽으며 어휘와 읽기 자신감을 키웁니다."],
  ["7세 예비초등 한글", "7세", "문장 읽기와 바른 쓰기, 내용 이해를 함께 연습해 초등 국어의 기초를 준비합니다."]
];
const learningTopics = [
  ["아이 수준에 맞춘 시작", `${pageAreaName} 방문 학습은 아이가 아는 글자와 읽기 경험, 연필 잡기와 집중 시간을 먼저 살펴봅니다. 같은 나이라도 현재 수준에 맞춰 부담 없는 시작점을 정합니다.`],
  ["읽기와 쓰기의 균형", "통글자 암기만 반복하지 않고 글자와 소리의 관계를 익힌 뒤 낱말, 문장 읽기와 쓰기로 차근차근 연결합니다."],
  ["1:1 방문 학습", `${pageAreaName} 가정의 일정에 맞춰 선생님이 방문하고, 아이의 반응과 진도에 따라 그날의 활동과 학습지 분량을 조절합니다.`],
  ["부모님 학습 피드백", "수업 후 익힌 내용과 어려워한 부분, 가정에서 짧게 이어갈 복습 방법을 안내해 한글 학습 흐름이 끊기지 않도록 돕습니다."]
];
const faqs = [
  [`${pageAreaName} 5세 한글 방문 학습은 언제 시작하면 좋나요?`, "글자에 관심을 보이거나 자기 이름과 익숙한 낱말을 궁금해할 때 상담할 수 있습니다. 아이의 관심과 집중 시간을 살펴 놀이 중심으로 시작합니다."],
  ["6세인데 한글을 전혀 몰라도 괜찮나요?", "괜찮습니다. 자음과 모음을 외우게 하기보다 익숙한 말과 그림에서 소리를 찾으며 아이가 이해할 수 있는 단계부터 진행합니다."],
  ["7세 한글 수업은 초등 입학 준비도 포함하나요?", "네. 한글 읽기와 쓰기뿐 아니라 문장 이해, 바른 필기, 정해진 시간 동안 학습하는 습관까지 함께 준비합니다."],
  [`${pageAreaName} 방문 수업 시간과 횟수는 어떻게 정하나요?`, "아이의 연령과 집중 시간, 가정 일정에 따라 상담 후 정합니다. 수업 가능 시간과 방문 지역을 확인해 알맞은 방식을 안내합니다."],
  ["시중 한글 학습지를 사용 중이어도 수업할 수 있나요?", "가능합니다. 사용 중인 교재와 아이의 반응을 확인하고 필요한 읽기, 쓰기, 어휘 활동을 보완하는 방향으로 상담합니다."]
];

if (content) {
  document.title = `지역별 5세·6세·7세 한글 방문 학습지 문의 | ${pageAreaName} | 키즈코치`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", `${pageAreaName} 5세·6세·7세 한글 방문 학습지 수업과 읽기·쓰기 맞춤 상담을 안내합니다.`);
  content.innerHTML = `
    <section class="district-hero container reveal visible"><div><a class="breadcrumb" href="index.html">한글 방문 학습</a><p class="eyebrow">${regionName} ${pageAreaName} 맞춤 안내</p><h1>지역별 5세·6세·7세<br /><span>한글 방문 학습지 문의</span></h1><p class="hero-text">아이의 한글 경험과 집중 시간을 살펴 ${pageAreaName} 가정에 맞는 1:1 방문 학습을 안내합니다.</p><div class="hero-cta"><a class="btn" href="../#contact">${pageAreaName} 방문 수업 문의</a><a class="btn btn-ghost" href="index.html">다른 지역 찾기</a></div></div><aside class="district-fact"><span class="fact-label">${regionName} · ${pageAreaName}</span><strong>5세부터 7세까지<br />맞춤 한글 학습</strong><p>읽기·쓰기·어휘를 아이의 속도에 맞춰 진행합니다.</p></aside></section>
    <section class="district-programs container reveal visible"><div class="section-head"><p class="eyebrow">연령별 한글 프로그램</p><h2>${pageAreaName} 5세·6세·7세 한글 방문 학습</h2></div><div class="program-grid">${programCards.map(([title, age, description]) => `<article class="program-card"><p>${age}</p><h3>${title}</h3><span>${description}</span><a href="../#contact">문의하기 <span aria-hidden="true">→</span></a></article>`).join("")}</div></section>
    <section class="district-topics container reveal visible"><div class="section-head"><p class="eyebrow">방문 학습 안내</p><h2>${pageAreaName} 한글 수업은 이렇게 진행합니다</h2></div><div class="topic-grid">${learningTopics.map(([title, description]) => `<article><h3>${title}</h3><p>${description}</p></article>`).join("")}</div></section>
    <section class="district-faq container reveal visible"><div class="section-head"><p class="eyebrow">자주 묻는 질문</p><h2>${pageAreaName} 한글 방문 학습지 FAQ</h2></div><div class="faq-list">${faqs.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("")}</div></section>
    <section class="district-flow container reveal visible"><div class="section-head"><p class="eyebrow">아이에게 맞는 한글 시작</p><h2>상담부터 방문 수업까지</h2></div><div class="flow-grid"><article><b>01</b><h3>현재 수준 확인</h3><p>아이의 나이와 한글 경험, 읽기와 쓰기 수준을 확인합니다.</p></article><article><b>02</b><h3>선생님·일정 상담</h3><p>방문 가능 지역과 가정 일정을 바탕으로 수업 방식을 정합니다.</p></article><article><b>03</b><h3>수업·피드백</h3><p>아이의 반응에 맞춰 수업하고 가정 복습 방법을 안내합니다.</p></article></div></section>
    <section class="district-cta container reveal visible"><div><p class="eyebrow">${pageAreaName} 한글 방문 학습 상담</p><h2>우리 아이에게 맞는 한글 시작을 찾아보세요</h2></div><a class="btn" href="../#contact">방문 학습지 문의 <span aria-hidden="true">→</span></a></section>`;
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
  neighborhoodSection.innerHTML = `<div class="section-head"><p class="eyebrow">동네별 한글 방문 학습</p><h2>${districtName} 동·읍·면 지역 선택</h2><p class="hero-text">거주 또는 수업 희망 동네를 선택하면 해당 지역의 5세·6세·7세 한글 방문 학습지 문의 페이지로 이동합니다.</p></div><div class="neighborhood-links">${neighborhoodList.map((neighborhood) => `<a href="${neighborhoodUrl(regionName, districtName, neighborhood)}">${neighborhood}<span aria-hidden="true">↗</span></a>`).join("")}</div>`;
  content.append(neighborhoodSection);
}