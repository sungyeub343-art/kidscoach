const regions = [
  { name: "서울특별시", districts: ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"] },
  { name: "경기도", districts: ["수원시", "성남시", "고양시", "용인시", "부천시", "안산시", "안양시", "남양주시", "화성시", "평택시", "의정부시", "시흥시", "파주시", "김포시", "광명시", "광주시", "군포시", "하남시", "오산시", "이천시", "안성시", "구리시", "의왕시", "양주시", "포천시", "여주시"] },
  { name: "인천광역시", districts: ["제물포구", "영종구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서해구", "검단구", "강화군", "옹진군"] },
  { name: "부산광역시", districts: ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"] },
  { name: "대구광역시", districts: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군", "군위군"] },
  { name: "광주광역시", districts: ["동구", "서구", "남구", "북구", "광산구"] },
  { name: "대전광역시", districts: ["동구", "중구", "서구", "유성구", "대덕구"] },
  { name: "울산광역시", districts: ["중구", "남구", "동구", "북구", "울주군"] },
  { name: "세종특별자치시", districts: ["세종시"] },
  { name: "강원특별자치도", districts: ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "평창군", "정선군"] },
  { name: "충청북도", districts: ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "진천군", "괴산군", "음성군"] },
  { name: "충청남도", districts: ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "홍성군"] },
  { name: "전북특별자치도", districts: ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군"] },
  { name: "전라남도", districts: ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "해남군", "무안군", "화순군"] },
  { name: "경상북도", districts: ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "의성군", "청도군", "칠곡군"] },
  { name: "경상남도", districts: ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "하동군", "산청군"] },
  { name: "제주특별자치도", districts: ["제주시", "서귀포시"] }
];
const districtUrl = (region, district) => `district.html?region=${encodeURIComponent(region)}&district=${encodeURIComponent(district)}`;
const renderRegions = (term = "") => {
  const list = document.querySelector("#region-list"); if (!list) return;
  const normalized = term.trim().toLowerCase();
  const filtered = regions.map((region) => ({ ...region, districts: region.districts.filter((district) => !normalized || `${region.name} ${district}`.toLowerCase().includes(normalized)) })).filter((region) => !normalized || region.name.toLowerCase().includes(normalized) || region.districts.length);
  list.innerHTML = filtered.map((region) => `<section class="region-block"><div class="region-heading"><h3>${region.name}</h3><span>${region.districts.length}개 지역</span></div><div class="district-links">${region.districts.map((district) => `<a href="${districtUrl(region.name, district)}">${district}<span aria-hidden="true">↗</span></a>`).join("")}</div></section>`).join("");
  const emptyState = document.querySelector("#empty-state"); if (emptyState) emptyState.hidden = filtered.length > 0;
};
if (document.querySelector("#region-list")) { renderRegions(); document.querySelector("#district-search").addEventListener("input", (event) => renderRegions(event.target.value)); }