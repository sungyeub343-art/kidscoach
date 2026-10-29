// 주요 지역별 정적 SEO 페이지(area/<slug>/index.html)와 허브(area/index.html)를 생성합니다.
// 실행: node tools/build-area-pages.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const { SITE, PHONE, TODAY, esc, footer, header, head, bg } = require("./layout");
const guides = require("./guides");

// 기존 지역 데이터(cities.js, national-neighborhoods.js)를 그대로 읽어 동 목록을 가져옵니다.
const sandbox = { document: { querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, addEventListener: () => {} }, window: {}, console };
vm.createContext(sandbox);
for (const file of ["cities/cities.js", "cities/national-neighborhoods.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox);
}
const neighborhoods = vm.runInContext(`({
  "서울특별시": seoulNeighborhoods, "경기도": gyeonggiNeighborhoods, "인천광역시": incheonNeighborhoods,
  "부산광역시": busanNeighborhoods, "대구광역시": daeguNeighborhoods, ...nationalNeighborhoods
})`, sandbox);

// slug, 시·도, 시군구, 생활권 안내, 자주 듣는 고민, 고민에 대한 수업 방향, 인근 지역
const areas = [
  ["gangnam-gu", "서울특별시", "강남구", "대치동·도곡동·개포동처럼 학원이 모인 생활권이 넓어, 여러 학원 일정 사이에서 아이에게 맞는 1:1 수업 시간을 찾는 가정이 많습니다.", "학원 진도는 빠른데 기본 개념을 설명하지 못해요.", "학원 교재와 학교 진도를 함께 확인해 놓친 개념부터 짚고, 아이가 풀이를 말로 설명하는 연습으로 이해도를 점검합니다.", ["seocho-gu", "songpa-gu", "gangdong-gu"]],
  ["seocho-gu", "서울특별시", "서초구", "반포동·잠원동·서초동·방배동 생활권은 방과후 일정이 촘촘한 경우가 많아 짧은 시간에 집중도 높은 수업을 원하는 상담이 많습니다.", "일정이 많아 공부 시간이 짧은데 효율이 걱정돼요.", "주 1~2회 수업 안에서 꼭 필요한 목표만 정하고, 가정에서 10분 안에 끝낼 복습 과제로 흐름을 이어갑니다.", ["gangnam-gu", "dongjak-gu", "yongsan-gu"]],
  ["songpa-gu", "서울특별시", "송파구", "잠실·문정·가락·위례 생활권까지 대단지 아파트가 넓게 퍼져 있어 방문 수업과 화상 수업을 함께 고려하는 가정이 많습니다.", "이사 후 학교가 바뀌면서 공부 리듬이 흐트러졌어요.", "새 학교의 진도와 숙제 방식을 먼저 확인하고, 주간 계획표로 하루 학습 루틴을 다시 세웁니다.", ["gangnam-gu", "gangdong-gu", "gwangjin-gu"]],
  ["yangcheon-gu", "서울특별시", "양천구", "목동 학원가와 가까운 생활권이라 초등 고학년이 되기 전에 수학 기초를 단단히 다지려는 상담이 많습니다.", "고학년 심화 수학을 앞두고 연산과 문장제가 불안해요.", "학년별 연산 정확도와 문장제 해석력을 진단하고, 막히는 단원부터 개념·적용·오답 정리 순서로 보완합니다.", ["gangseo-gu", "yeongdeungpo-gu", "mapo-gu"]],
  ["nowon-gu", "서울특별시", "노원구", "중계동 학원가를 중심으로 교육 관심이 높은 생활권이며, 초등 저학년부터 읽기와 공부습관을 잡으려는 가정이 많습니다.", "책은 읽는데 내용을 물어보면 대답을 잘 못해요.", "짧은 글을 읽고 중심 내용 말하기, 낱말 뜻 찾기, 한 문장 요약을 반복해 초등 국어 독해의 기초를 다집니다.", ["seongbuk-gu", "namyangju-si", "gwangjin-gu"]],
  ["gangdong-gu", "서울특별시", "강동구", "고덕·상일·명일·둔촌 일대에 대단지 아파트가 모여 있어 유아부터 초등 저학년 자녀를 둔 가정의 상담이 꾸준합니다.", "6세인데 한글에 관심이 없어 시작이 고민돼요.", "그림책과 말놀이로 글자에 대한 흥미를 먼저 만들고, 아이가 아는 낱말에서 소리와 글자를 연결하며 천천히 읽기로 넘어갑니다.", ["songpa-gu", "hanam-si", "gwangjin-gu"]],
  ["mapo-gu", "서울특별시", "마포구", "공덕·아현·상암 생활권은 맞벌이 가정이 많아 저녁 시간 수업과 학부모 피드백을 중요하게 보는 상담이 많습니다.", "맞벌이라 아이 공부를 매일 봐주기 어려워요.", "수업 후 주간 리포트로 익힌 내용과 다음 목표를 공유하고, 아이 혼자 확인할 수 있는 체크리스트로 숙제를 관리합니다.", ["yeongdeungpo-gu", "eunpyeong-gu", "yongsan-gu"]],
  ["seongdong-gu", "서울특별시", "성동구", "왕십리·옥수·금호·성수 생활권은 신축 단지와 직주근접 가정이 많아 퇴근 후 시간대 방문·화상 수업 문의가 많습니다.", "저녁에만 시간이 나는데 아이가 피곤해해요.", "수업 시간을 30~50분 단위로 짧게 나누고 활동을 바꿔가며 집중을 유지하도록 구성합니다.", ["gwangjin-gu", "yongsan-gu", "gangnam-gu"]],
  ["gwangjin-gu", "서울특별시", "광진구", "광장동·자양동·구의동 생활권은 초등 시기 영어와 수학 기초를 함께 챙기려는 가정이 많습니다.", "영어 단어는 외우는데 문장으로 말하지 못해요.", "익숙한 주제로 짧은 문장 듣기·따라 말하기를 하고, 배운 표현을 직접 써보며 기초 영어 자신감을 키웁니다.", ["seongdong-gu", "songpa-gu", "gangdong-gu"]],
  ["yeongdeungpo-gu", "서울특별시", "영등포구", "여의도·당산·문래·신길 생활권은 출퇴근 시간이 긴 가정이 많아 화상 수업과 방문 수업을 섞는 방식을 자주 상담합니다.", "방문 수업 시간을 매주 맞추기 어려워요.", "고정 방문일과 화상 보강일을 함께 정해 일정이 바뀌어도 수업 흐름이 끊기지 않도록 운영합니다.", ["mapo-gu", "dongjak-gu", "yangcheon-gu"]],
  ["dongjak-gu", "서울특별시", "동작구", "흑석·상도·사당·대방 생활권은 초등 수학에서 실수와 오답 관리를 고민하는 상담이 많습니다.", "아는 문제인데 계산 실수로 자주 틀려요.", "실수 유형을 분류해 기록하고, 검산 습관과 풀이 정리 방법을 반복 연습해 정확도를 높입니다.", ["seocho-gu", "yeongdeungpo-gu", "yongsan-gu"]],
  ["gangseo-gu", "서울특별시", "강서구", "마곡·등촌·가양·화곡 생활권은 젊은 가정이 많아 유아 한글·수학과 예비초등 준비 상담이 꾸준합니다.", "7세인데 초등 입학 전에 무엇을 준비해야 할지 모르겠어요.", "한글 문장 읽기, 기초 연산, 바른 쓰기와 40분 앉아 있는 습관을 아이 수준에 맞춰 단계별로 준비합니다.", ["yangcheon-gu", "gimpo-si", "mapo-gu"]],
  ["yongsan-gu", "서울특별시", "용산구", "이촌·한남·후암 생활권은 영어 노출이 많은 아이도 많아 레벨테스트 대비와 기초 읽기를 함께 상담하는 경우가 많습니다.", "영어 학원 레벨테스트를 앞두고 있어요.", "현재 리딩·어휘·문법 수준을 진단해 부족한 영역부터 준비하고, 실전처럼 시간을 재며 연습합니다.", ["mapo-gu", "seongdong-gu", "seocho-gu"]],
  ["eunpyeong-gu", "서울특별시", "은평구", "은평뉴타운·불광·응암·수색 생활권은 유아 자녀를 둔 가정이 많아 놀이형 수업으로 학습을 시작하려는 상담이 많습니다.", "책상에 오래 앉아 있지 못해요.", "10~15분 활동을 여러 개 이어 붙이고 교구와 몸 활동을 섞어, 앉아서 끝까지 해내는 경험부터 쌓습니다.", ["mapo-gu", "seongbuk-gu", "goyang-si"]],
  ["seongbuk-gu", "서울특별시", "성북구", "길음뉴타운·돈암·정릉·석관 생활권은 예비초등과 초등 저학년 학습 습관을 함께 상담하는 가정이 많습니다.", "숙제를 매번 미루고 시작하기까지 오래 걸려요.", "숙제 시작 시간을 정하고 작은 단계로 나눠 체크하며, 끝낸 뒤 스스로 점검하는 습관을 만듭니다.", ["nowon-gu", "eunpyeong-gu", "seongdong-gu"]],
  ["seongnam-si", "경기도", "성남시", "분당 정자·서현·수내와 판교 생활권은 맞벌이 가정이 많아 화상 수업, 코딩, 초등 수학을 함께 상담하는 경우가 많습니다.", "코딩에 관심은 많은데 수학 기초도 놓치고 싶지 않아요.", "아이의 흥미가 높은 과목으로 학습 동기를 만들고, 기초 수학은 주간 목표로 따로 관리해 균형을 맞춥니다.", ["yongin-si", "hanam-si", "songpa-gu"]],
  ["yongin-si", "경기도", "용인시", "수지·죽전·동천과 기흥 생활권은 지역이 넓어 방문과 화상을 섞은 혼합형 수업 상담이 많습니다.", "이동 거리가 길어 방문 수업이 가능할지 걱정돼요.", "주소와 가능한 시간대를 확인해 방문 가능 여부를 안내하고, 어려운 경우 화상 수업으로 같은 커리큘럼을 이어갑니다.", ["seongnam-si", "suwon-si", "hwaseong-si"]],
  ["suwon-si", "경기도", "수원시", "영통·광교·권선 생활권은 초등 저학년 자녀를 둔 가정이 많아 국어·수학 기초와 공부습관 상담이 꾸준합니다.", "초등 1학년인데 학교 수업을 잘 따라가는지 모르겠어요.", "교과서 단원별로 읽기·쓰기·연산 이해도를 확인하고, 학교 숙제와 연계해 부족한 부분을 보충합니다.", ["yongin-si", "hwaseong-si", "anyang-si"]],
  ["goyang-si", "경기도", "고양시", "일산 후곡·백석과 삼송·원흥·향동 생활권은 유아부터 초등까지 연령대가 고르게 상담이 이어지는 지역입니다.", "형제가 나이가 달라 수업을 따로 받아야 할지 고민이에요.", "아이마다 수준을 따로 진단해 각자의 목표를 세우고, 가정 일정에 맞춰 연속 시간대로 수업을 배치합니다.", ["eunpyeong-gu", "gimpo-si", "mapo-gu"]],
  ["hwaseong-si", "경기도", "화성시", "동탄신도시를 중심으로 어린 자녀를 둔 가정이 많아 5~7세 한글·수학과 예비초등 상담이 특히 많습니다.", "5세 아이에게 지금 공부를 시켜도 될지 고민돼요.", "학습지 분량보다 놀이 속 경험을 우선해 글자·수에 대한 흥미를 만들고, 아이 반응을 보며 천천히 늘려갑니다.", ["suwon-si", "yongin-si", "anyang-si"]],
  ["anyang-si", "경기도", "안양시", "평촌 학원가가 있는 동안구와 만안구 생활권은 학원 수업과 1:1 보충을 함께 활용하려는 상담이 많습니다.", "학원에서 따라가지 못한 부분을 따로 보충하고 싶어요.", "학원 교재와 테스트 결과를 함께 보며 막힌 단원을 찾고, 1:1 수업에서 개념을 다시 설명하고 오답을 정리합니다.", ["suwon-si", "seongnam-si", "dongjak-gu"]],
  ["hanam-si", "경기도", "하남시", "미사강변·위례·감일 신도시 생활권은 유아와 초등 저학년 가정이 많아 방문 한글·수학 상담이 꾸준합니다.", "한글을 통글자로만 외워서 처음 보는 낱말을 못 읽어요.", "자음·모음과 소리의 관계를 놀이로 익힌 뒤 받침 없는 글자부터 단계별로 읽어 해독 능력을 키웁니다.", ["gangdong-gu", "songpa-gu", "namyangju-si"]],
  ["gimpo-si", "경기도", "김포시", "장기·구래·운양·풍무 등 신도시 생활권은 젊은 가정이 많아 유아 학습과 예비초등 준비 상담이 많습니다.", "수 세기는 하는데 더하기 빼기를 이해하지 못해요.", "구체물로 모으기·가르기를 충분히 경험한 뒤 그림과 식으로 옮겨, 연산의 뜻을 이해하도록 돕습니다.", ["gangseo-gu", "goyang-si", "yeonsu-gu"]],
  ["namyangju-si", "경기도", "남양주시", "다산·별내·호평 생활권은 지역이 넓어 방문과 화상을 함께 고려하는 상담이 많습니다.", "가까운 곳에 맞는 학원을 찾기 어려워요.", "방문 가능 지역을 먼저 확인하고, 화상 수업으로도 같은 진단·리포트 과정을 제공해 거리 부담을 줄입니다.", ["nowon-gu", "hanam-si", "gangdong-gu"]],
  ["yeonsu-gu", "인천광역시", "연수구", "송도국제도시를 중심으로 영어 노출이 많은 가정이 많아 영어 기초와 레벨테스트 대비 상담이 많습니다.", "영어는 듣기는 되는데 읽기와 쓰기가 약해요.", "파닉스와 사이트워드로 읽기 기초를 점검하고, 짧은 문장 쓰기로 듣기 실력을 읽기·쓰기로 연결합니다.", ["gimpo-si", "gangseo-gu", "yangcheon-gu"]],
  ["haeundae-gu", "부산광역시", "해운대구", "좌동·중동·우동(센텀) 생활권은 초등 수학과 영어를 함께 상담하는 가정이 많습니다.", "수학 문장제를 읽고 무엇을 구하는지 몰라요.", "문제를 읽고 아는 것·구할 것을 표시하는 습관을 만들고, 그림과 식으로 바꾸는 연습을 반복합니다.", ["suseong-gu", "yuseong-gu", "sejong"]],
  ["suseong-gu", "대구광역시", "수성구", "범어동·만촌동·황금동 생활권은 학원 선택지가 많은 만큼 아이에게 맞는 학습 방향을 먼저 진단받으려는 상담이 많습니다.", "학원을 여러 곳 다녀도 성적이 오르지 않아요.", "현재 다니는 학원과 숙제량을 함께 살펴 우선순위를 정리하고, 1:1 수업에서는 가장 약한 영역 한 가지에 집중합니다.", ["haeundae-gu", "yuseong-gu", "sejong"]],
  ["yuseong-gu", "대전광역시", "유성구", "노은·관평·전민동 생활권은 탐구형 학습과 초등 수학 사고력에 관심이 높은 가정이 많습니다.", "답은 맞히는데 왜 그런지 설명하지 못해요.", "\"왜 그렇게 생각했어?\" 질문으로 풀이 과정을 말로 꺼내게 하고, 다른 방법으로 다시 풀어보며 사고력을 넓힙니다.", ["sejong", "suseong-gu", "haeundae-gu"]],
  ["sejong", "세종특별자치시", "세종시", "도담·종촌·새롬·다정 등 신도시 생활권은 맞벌이 가정이 많아 화상 수업과 주간 학부모 리포트에 대한 관심이 높습니다.", "퇴근이 늦어 아이 공부 상황을 알기 어려워요.", "매주 리포트로 수업 내용, 어려워한 부분, 다음 목표를 정리해 드리고 가정에서 확인할 핵심 한 가지를 안내합니다.", ["yuseong-gu", "suseong-gu", "haeundae-gu"]]
].map(([slug, region, district, local, concern, approach, near]) => ({ slug, region, district, local, concern, approach, near }));

const bySlug = Object.fromEntries(areas.map((a) => [a.slug, a]));
const shortRegion = (r) => r.replace(/특별자치시|특별자치도|특별시|광역시/, "").replace(/도$/, "도");


const areaPage = (a) => {
  const name = a.district;
  const url = `${SITE}/area/${a.slug}/`;
  const dongs = neighborhoods[a.region]?.[a.district] || [];
  if (!dongs.length) throw new Error(`동 목록 없음: ${a.region} ${a.district}`);
  const title = `${name} 유아·초등 과외 | 한글·수학·영어 1:1 방문·화상수업 - 상상코칭`;
  const description = `${shortRegion(a.region)} ${name} 유아 한글·수학, 초등 국어·수학·영어 1:1 과외와 공부습관 코칭. ${a.concern} 같은 고민을 진단해 맞춤 수업으로 안내합니다. 첫 수업 무료 체험 ${PHONE}`;
  const faqs = [
    [`${name}에서 "${a.concern}" 같은 고민도 상담할 수 있나요?`, `네. ${a.approach}`],
    [`${name} 방문 과외와 화상 과외 중 선택할 수 있나요?`, `${name} 내 주소와 가능한 시간대를 확인해 방문 수업 가능 여부를 안내하고, 화상 수업이나 두 방식을 섞은 혼합형도 상담할 수 있습니다.`],
    [`${name} 유아 과외는 몇 세부터 가능한가요?`, "만 4세부터 아이의 한글·수 경험과 집중 시간을 확인한 뒤 놀이형 활동으로 시작할 수 있습니다."],
    [`${name} 무료 체험 수업은 어떻게 신청하나요?`, `${PHONE}로 전화나 문자를 주시면 아이의 나이, 필요한 과목과 동네를 확인해 첫 체험 수업 일정을 안내합니다.`]
  ];
  const ld = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", name: title, url, description, inLanguage: "ko-KR", dateModified: TODAY, isPartOf: { "@type": "WebSite", name: "상상코칭", url: `${SITE}/` } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "주요 지역 과외", item: `${SITE}/area/` },
      { "@type": "ListItem", position: 3, name: `${name} 유아·초등 과외`, item: url }] },
    { "@type": "Service", name: `${name} 유아·초등 1:1 과외`, serviceType: "유아·초등 1:1 과외", provider: { "@type": "EducationalOrganization", name: "상상코칭", url: `${SITE}/`, telephone: "+82-10-2928-3614" }, areaServed: { "@type": "AdministrativeArea", name: `${a.region} ${name}` } },
    { "@type": "FAQPage", mainEntity: faqs.map(([q, ans]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: ans } })) }
  ] };
  return `${head({ title, description, url, up: "../../", ld })}
<body>
  ${bg}
  ${header("../../")}
  <main>
    <section class="district-hero container reveal visible"><div><a class="breadcrumb" href="../">주요 지역 과외</a><p class="eyebrow">${a.region} ${name} 맞춤 안내</p><h1>${name}<br /><span>유아·초등 1:1 과외</span></h1><p class="hero-text">${a.local} 상상코칭은 아이의 현재 수준을 먼저 진단하고 ${name} 가정의 일정에 맞춰 방문·화상 수업을 연결합니다.</p><div class="hero-cta"><a class="btn" href="tel:${PHONE}">${name} 무료 상담 ${PHONE}</a><a class="btn btn-ghost" href="sms:${PHONE}">문자로 문의</a></div></div><aside class="district-fact"><span class="fact-label">${shortRegion(a.region)} · ${name}</span><strong>첫 수업<br />무료 체험</strong><p>수업 방식과 시간은 상담 후 아이에게 맞춰 정합니다.</p></aside></section>
    <section class="district-topics container reveal visible"><div class="section-head"><p class="eyebrow">${name} 학부모님이 자주 하시는 고민</p><h2>"${a.concern}"</h2></div><div class="topic-grid"><article><h3>이렇게 시작합니다</h3><p>${a.approach}</p></article><article><h3>매주 학부모 리포트</h3><p>수업이 끝나면 익힌 내용, 어려워한 부분과 다음 주 목표를 정리해 전달하고, 가정에서 짧게 이어갈 복습 방법을 안내합니다.</p></article></div></section>
    <section class="district-programs container reveal visible"><div class="section-head"><p class="eyebrow">${name} 연령별 수업</p><h2>아이 나이와 목표에 맞게 선택하세요</h2></div><div class="program-grid">
      <article class="program-card"><p>만 4~7세</p><h3>${name} 유아 한글·수학</h3><span>놀이에서 출발해 글자와 소리, 수 세기와 기초 연산, 예비초등 학습 습관까지 준비합니다.</span><a href="../../preschool/">유아 과외 자세히 보기 <span aria-hidden="true">→</span></a></article>
      <article class="program-card"><p>초1~초6</p><h3>${name} 초등 수학 과외</h3><span>연산 정확도, 문장제 해석, 단원별 개념과 오답 정리를 1:1로 진단하고 보완합니다.</span><a href="../../elementary-math/">초등 수학 과외 자세히 보기 <span aria-hidden="true">→</span></a></article>
      <article class="program-card"><p>초등 전 학년</p><h3>${name} 공부습관 코칭</h3><span>숙제 미루기와 짧은 집중 시간을 주간 계획, 실천 점검과 피드백으로 관리합니다.</span><a href="../../study-habits/">공부습관 코칭 자세히 보기 <span aria-hidden="true">→</span></a></article>
    </div></section>
    <section class="district-flow container reveal visible"><div class="section-head"><p class="eyebrow">진행 방식</p><h2>${name} 상담부터 첫 수업까지</h2></div><div class="flow-grid"><article><b>01</b><h3>전화·문자 상담</h3><p>아이의 나이, 과목, 동네와 가능한 시간대를 확인합니다.</p></article><article><b>02</b><h3>무료 체험·수준 진단</h3><p>첫 수업에서 현재 수준과 학습 성향을 살펴봅니다.</p></article><article><b>03</b><h3>1:1 수업·주간 리포트</h3><p>맞춤 계획으로 수업하고 매주 학부모님께 피드백을 드립니다.</p></article></div></section>
    <section class="district-faq container reveal visible"><div class="section-head"><p class="eyebrow">자주 묻는 질문</p><h2>${name} 유아·초등 과외 FAQ</h2></div><div class="faq-list">${faqs.map(([q, ans]) => `<details><summary>${esc(q)}</summary><p>${ans}</p></details>`).join("")}</div></section>
    <section class="district-neighborhoods container reveal visible"><div class="section-head"><p class="eyebrow">수업 상담 가능 동네</p><h2>${name} 동·읍·면</h2><p class="hero-text">아래 동네를 포함해 ${name} 전역에서 방문·화상 수업을 상담합니다.</p></div><div class="district-links">${dongs.map((d) => `<span class="area-chip">${d}</span>`).join("")}</div></section>
    <section class="district-neighborhoods container reveal visible"><div class="section-head"><p class="eyebrow">학부모 학습 가이드</p><h2>${name} 학부모님이 많이 읽는 글</h2></div><div class="district-links">${[0, 1, 2].map((n) => guides[(areas.indexOf(a) + n * 3) % guides.length]).map((g) => `<a href="../../guide/${g.slug}/">${g.title}<span aria-hidden="true">→</span></a>`).join("")}</div></section>
    <section class="district-neighborhoods container reveal visible"><div class="section-head"><p class="eyebrow">가까운 지역</p><h2>인근 지역 과외 안내</h2></div><div class="district-links">${a.near.map((s) => `<a href="../${s}/">${bySlug[s].district} 유아·초등 과외<span aria-hidden="true">→</span></a>`).join("")}<a href="../">전체 지역 보기<span aria-hidden="true">→</span></a></div></section>
    <section class="location-cta container reveal visible"><div><p class="eyebrow">${name} 무료 상담</p><h2>아이의 나이와 고민을 알려주세요</h2><p>전화나 문자로 문의하시면 첫 체험 수업 일정을 안내드립니다.</p></div><a class="btn" href="tel:${PHONE}">${PHONE} <span aria-hidden="true">→</span></a></section>
  </main>
  ${footer("../../")}
  <script src="../../script.js"></script>
</body>
</html>
`;
};

const hubPage = () => {
  const url = `${SITE}/area/`;
  const title = "주요 지역 유아·초등 과외 | 서울·경기·인천·부산·대구·대전·세종 - 상상코칭";
  const description = "강남·서초·송파·목동·노원부터 분당·동탄·송도·해운대·수성구·세종까지, 주요 지역별 유아 한글·수학과 초등 국어·수학·영어 1:1 과외를 안내합니다.";
  const groups = [...new Set(areas.map((a) => a.region))];
  const ld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", name: title, url, description, inLanguage: "ko-KR", isPartOf: { "@type": "WebSite", name: "상상코칭", url: `${SITE}/` } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: `${SITE}/` }, { "@type": "ListItem", position: 2, name: "주요 지역 과외", item: url }] },
    { "@type": "ItemList", itemListElement: areas.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: `${a.district} 유아·초등 과외`, url: `${SITE}/area/${a.slug}/` })) }
  ] };
  return `${head({ title, description, url, up: "../", ld })}
<body>
  ${bg}
  ${header("../")}
  <main>
    <section class="location-hero container reveal visible"><div><a class="breadcrumb" href="../">상상코칭 홈</a><p class="eyebrow">주요 지역 유아·초등 과외</p><h1>우리 동네<br /><span>유아·초등 1:1 과외 안내</span></h1><p class="hero-text">지역마다 학부모님이 자주 하시는 고민과 수업 방식을 정리했습니다. 거주 지역을 선택해 맞춤 안내를 확인하세요.</p></div><div class="location-hero-note"><strong>방문 · 화상 · 혼합형</strong><span>첫 수업 무료 체험 · 상담 ${PHONE}</span></div></section>
    ${groups.map((g) => `<section class="district-neighborhoods container reveal visible"><div class="section-head"><p class="eyebrow">${g}</p><h2>${shortRegion(g)} 유아·초등 과외</h2></div><div class="district-links">${areas.filter((a) => a.region === g).map((a) => `<a href="${a.slug}/">${a.district} 유아·초등 과외<span aria-hidden="true">→</span></a>`).join("")}</div></section>`).join("\n    ")}
    <section class="location-cta container reveal visible"><div><p class="eyebrow">원하는 지역이 없나요?</p><h2>전국 시군구 안내에서 찾아보세요</h2><p>목록에 없는 지역도 전화로 수업 가능 여부를 안내드립니다.</p></div><a class="btn" href="../cities/">전국 지역 찾기 <span aria-hidden="true">→</span></a></section>
  </main>
  ${footer("../")}
  <script src="../script.js"></script>
</body>
</html>
`;
};

fs.mkdirSync(path.join(root, "area"), { recursive: true });
fs.writeFileSync(path.join(root, "area/index.html"), hubPage());
for (const a of areas) {
  fs.mkdirSync(path.join(root, "area", a.slug), { recursive: true });
  fs.writeFileSync(path.join(root, "area", a.slug, "index.html"), areaPage(a));
}

// sitemap.xml: 지역 페이지 항목을 다시 씁니다.
const sitemapPath = path.join(root, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8").replace(/\s*<url>\s*<loc>https:\/\/kidscoach\.kr\/area\/[\s\S]*?<\/url>/g, "");
const urls = [`${SITE}/area/`, ...areas.map((a) => `${SITE}/area/${a.slug}/`)];
sitemap = sitemap.replace("</urlset>", urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.endsWith("/area/") ? "0.8" : "0.7"}</priority>\n  </url>\n`).join("") + "</urlset>");
fs.writeFileSync(sitemapPath, sitemap);
console.log(`생성 완료: 허브 1개 + 지역 ${areas.length}개`);
