const params = new URLSearchParams(window.location.search);
const regionName = params.get("region") || "서울특별시";
const districtName = params.get("district") || "강남구";
const content = document.querySelector("#district-content");
const programCards = [
  ["스크래치 창작 코딩", "유아·초1~초3", "블록을 조립해 게임과 애니메이션을 만들며 순서, 조건, 반복의 기초를 익힙니다."],
  ["엔트리 프로젝트 코딩", "초2~초6", "아이디어를 기획하고 직접 구현하며 변수, 함수, 디버깅과 문제 해결 과정을 배웁니다."],
  ["파이썬·웹 기초 코딩", "초4~초6", "텍스트 코딩에 도전해 간단한 프로그램과 웹페이지를 만들고 코드를 읽는 힘을 키웁니다."]
];
const learningTopics = [
  ["처음 시작하는 블록 코딩", `${districtName} 코딩 과외는 컴퓨터 사용 경험과 아이의 관심사부터 살펴봅니다. 스크래치와 엔트리로 캐릭터를 움직이고 이야기를 구성하며 코딩의 기본 원리를 놀이처럼 익힙니다.`],
  ["게임·애니메이션 프로젝트", "아이디어를 작은 단계로 나누고 화면 구성, 규칙 만들기, 반복 실행을 거쳐 하나의 결과물을 완성합니다. 완성보다 스스로 수정하고 설명하는 과정을 중요하게 다룹니다."],
  ["파이썬과 웹페이지 입문", `${districtName} 초등 고학년 코딩 수업은 파이썬의 변수와 조건문, 반복문부터 시작해 간단한 퀴즈와 계산 프로그램을 만듭니다. HTML과 CSS로 나만의 소개 페이지도 제작합니다.`],
  ["컴퓨팅 사고력과 디버깅", "오류를 두려워하지 않고 문제를 관찰하고 원인을 추측한 뒤 한 단계씩 검증하는 습관을 기릅니다. 수업 후에는 오늘 해결한 문제와 다음 도전 과제를 함께 정리합니다."]
];
const faqs = [
  [`${districtName} 코딩 과외는 몇 세부터 가능한가요?`, "컴퓨터와 이야기를 좋아하고 20~30분 정도 한 활동에 머물 수 있다면 유아 후반부터 상담할 수 있습니다. 경험과 집중 시간에 따라 블록 코딩부터 시작합니다."],
  [`${districtName} 코딩 수업에 개인 컴퓨터가 필요한가요?`, "화상 수업은 노트북이나 데스크톱을 권장하며, 방문 수업은 가정의 기기 환경을 먼저 확인합니다. 첫 상담에서 사용할 프로그램과 준비물을 안내합니다."],
  [`코딩을 한 번도 해보지 않은 아이도 가능한가요?`, "가능합니다. 명령어를 외우기보다 움직임과 규칙을 직접 바꿔보는 활동부터 시작해 코딩 개념을 자연스럽게 익힙니다."],
  [`게임만 만들고 끝나는 수업인가요?`, "게임 제작은 흥미를 여는 출발점입니다. 기획, 순서 설계, 조건과 반복, 오류 수정, 결과 설명까지 프로젝트 전 과정을 경험합니다."],
  [`${districtName} 초등 고학년은 어떤 언어를 배우나요?`, "아이의 경험과 목표에 따라 엔트리에서 파이썬으로 넘어가거나 HTML·CSS 웹 제작을 진행합니다. 현재 수준을 확인한 뒤 무리 없는 단계를 제안합니다."]
];
if (content) {
  document.title = `${districtName} 코딩 과외 | 키즈코치`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", `${districtName} 유아·초등 코딩 과외, 스크래치·엔트리·파이썬 프로젝트 수업 상담을 안내합니다.`);
  content.innerHTML = `
    <section class="district-hero container reveal visible"><div><a class="breadcrumb" href="index.html">코딩 과외</a><p class="eyebrow">${regionName} ${districtName} 맞춤 코딩</p><h1>${districtName}에서<br /><span>아이의 첫 코딩 프로젝트</span>를 시작하세요</h1><p class="hero-text">키즈코치는 ${districtName} 가정의 일정과 아이의 관심사를 바탕으로 유아·초등 코딩 과외를 맞춤 연결합니다.</p><div class="hero-cta"><a class="btn" href="../#contact">${districtName} 코딩 상담</a><a class="btn btn-ghost" href="index.html">다른 지역 찾기</a></div></div><aside class="district-fact"><span class="fact-label">${regionName} · ${districtName}</span><strong>만들고<br />설명하는 코딩</strong><p>방문과 화상 수업 모두 아이의 속도에 맞춰 진행합니다.</p></aside></section>
    <section class="district-programs container reveal visible"><div class="section-head"><p class="eyebrow">지역 맞춤 코딩 프로그램</p><h2>${districtName} 아이를 위한 프로젝트 수업</h2></div><div class="program-grid">${programCards.map(([title, age, description]) => `<article class="program-card"><p>${age}</p><h3>${title}</h3><span>${description}</span><a href="../#contact">상담하기 <span aria-hidden="true">→</span></a></article>`).join("")}</div></section>
    <section class="district-topics container reveal visible"><div class="section-head"><p class="eyebrow">코딩 학습 안내</p><h2>${districtName} 코딩 수업은 이렇게 진행합니다</h2></div><div class="topic-grid">${learningTopics.map(([title, description]) => `<article><h3>${title}</h3><p>${description}</p></article>`).join("")}</div></section>
    <section class="district-faq container reveal visible"><div class="section-head"><p class="eyebrow">자주 묻는 질문</p><h2>${districtName} 코딩 과외 FAQ</h2></div><div class="faq-list">${faqs.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("")}</div></section>
    <section class="district-flow container reveal visible"><div class="section-head"><p class="eyebrow">아이에게 맞는 코딩 시작</p><h2>상담부터 첫 프로젝트 완성까지</h2></div><div class="flow-grid"><article><b>01</b><h3>현재 경험 확인</h3><p>학년, 기기 환경, 좋아하는 주제와 코딩 경험을 가볍게 확인합니다.</p></article><article><b>02</b><h3>프로젝트 설계</h3><p>아이디어를 정하고 필요한 코딩 개념을 작은 단계로 나눕니다.</p></article><article><b>03</b><h3>완성·피드백</h3><p>결과물을 완성한 뒤 코드를 설명하고 다음 도전 과제를 정합니다.</p></article></div></section>
    <section class="district-cta container reveal visible"><div><p class="eyebrow">${districtName} 코딩 맞춤 상담</p><h2>아이의 호기심을 첫 프로젝트로 연결해보세요</h2></div><a class="btn" href="../#contact">코딩 과외 상담 신청 <span aria-hidden="true">→</span></a></section>`;
}