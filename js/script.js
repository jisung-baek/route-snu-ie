// ─── 개설 과목 데이터 (courses.html) ─────────────────────────────────────────
// offerings: [학기, 비고] 쌍의 배열 — "O"는 정상 개설, 그 외는 조건 명시
const upcomingCourses = [
  { category: "1학년", name: "산업공학의 이해", type: "전필", offerings: [["2026-1", "O(25-2학기미개설로인해)"], ["2026-2", "O"], ["2027-2", "O"]] },
  { category: "2학년", name: "과학적관리", type: "전필", offerings: [["2026-1", "O"], ["2027-1", "O"], ["2028-1", "O"]] },
  { category: "2학년", name: "경영과학1", type: "전필", offerings: [["2025-2", "O"], ["2026-1", "O(연합전공)"], ["2026-2", "O"], ["2027-2", "O"]] },
  { category: "2학년", name: "데이터관리와 분석", type: "전필", offerings: [["2025-2", "O"], ["2026-1", "O(연합전공)"], ["2027-1", "O(연합전공)"], ["2027-2", "O"], ["2028-1", "O(연합전공)"]] },
  { category: "2학년", name: "인간공학", type: "전필", offerings: [["2025-2", "O"], ["2026-2", "O"]] },
  { category: "2학년", name: "인간공학실험", type: "전필", offerings: [["2025-2", "O"], ["2026-2", "O"]] },
  { category: "2학년", name: "산업공정설계", type: "전선", offerings: [["2026-1", "O"]] },
  { category: "3학년", name: "경영과학2", type: "전필", offerings: [["2025-2", "O(연합전공)"], ["2026-1", "O"], ["2026-2", "O(연합전공)"], ["2027-1", "O"], ["2027-2", "O(연합전공)"]] },
  { category: "3학년", name: "산업공학통계", type: "전필", offerings: [["2026-1", "O"], ["2027-1", "O"]] },
  { category: "3학년", name: "생산관리", type: "전필", offerings: [["2025-2", "O"], ["2026-1", "O(연합전공)"], ["2026-2", "O"], ["2027-1", "O(연합전공)"], ["2027-2", "O"], ["2028-1", "O(연합전공)"]] },
  { category: "3학년", name: "물류관리", type: "전선", offerings: [["2026-1", "O"], ["2027-1", "O"]] },
  { category: "3학년", name: "공학도를 위한 창의적 사고", type: "전선", offerings: [["2025-2", "O"]] },
  { category: "3학년", name: "산업경영수리기법", type: "전선", offerings: [["2025-2", "O"], ["2027-2", "O"]] },
  { category: "3학년", name: "기술경영", type: "전선", offerings: [["2025-2", "O(연합전공)"], ["2026-2", "O"], ["2027-2", "O"]] },
  { category: "3학년", name: "서비스공학", type: "전선", offerings: [["2026-1", "O"]] },
  { category: "3학년", name: "최적화모형 및 응용", type: "전선", offerings: [["2026-1", "O"], ["2027-1", "O"]] },
  { category: "3학년", name: "제품개발 및 품질설계", type: "전선", offerings: [["2027-1", "O"], ["2028-1", "O"]] },
  { category: "3학년", name: "기술경영개론", type: "전선", offerings: [["2025-2", "O(연합전공)"], ["2026-1", "O"]] },
  { category: "3학년", name: "지식경영전략", type: "전선", offerings: [["2025-2", "O(연합전공)"], ["2026-1", "O(연합전공)"]] },
  { category: "3학년", name: "지식재산경영", type: "전선", offerings: [["2025-2", "O(연합전공)"]] },
  { category: "4학년", name: "경제성공학", type: "전필", offerings: [["2025-2", "O(연합전공)"], ["2026-1", "O"], ["2026-2", "O(연합전공)"], ["2027-2", "O(연합전공)"], ["2028-1", "O"]] },
  { category: "4학년", name: "시뮬레이션", type: "전선", offerings: [["2026-1", "O"]] },
  { category: "4학년", name: "휴먼인터페이스디자인", type: "전선", offerings: [["2026-1", "O"], ["2027-1", "O"]] },
  { category: "4학년", name: "금융공학개론", type: "전선", offerings: [["2026-2", "O"]] },
  { category: "4학년", name: "데이터마이닝", type: "전선", offerings: [["2026-1", "O"], ["2028-1", "O"]] },
  { category: "4학년", name: "산업텍스트애널리틱스", type: "전선", offerings: [["2025-2", "O"], ["2026-2", "O"], ["2027-2", "O"]] },
  { category: "4학년", name: "기술경영프로젝트", type: "전선", offerings: [["2025-2", "O(연합전공)"], ["2026-2", "O(연합전공)"]] },
  { category: "4학년", name: "기술창업론", type: "전선", offerings: [["2026-1", "O(연합전공)"]] },
  { category: "4학년", name: "최적화알고리즘", type: "전선", offerings: [["2026-2", "O"], ["2027-2", "O"]] },
  { category: "교양", name: "공학수학1", type: "", offerings: [["2026-1", "O"], ["2027-1", "O"]] },
  { category: "교양", name: "공학수학2", type: "", offerings: [["2025-2", "O"]] },
  { category: "교양", name: "컴퓨터의개념및실습", type: "", offerings: [["2025-2", "O(연합전공)"], ["2026-1", "O"], ["2026-2", "O(연합전공)"], ["2027-1", "O"], ["2027-2", "O(연합전공)"], ["2028-1", "O"]] },
  { category: "공대공통과목", name: "공학연구의 실습1", type: "전선", offerings: [["2025-2", "O"]] },
  { category: "공대공통과목", name: "공학연구의 실습2", type: "전선", offerings: [["2026-1", "O"]] },
  { category: "타과수강전선", name: "산업공학개론", type: "", offerings: [["2025-2", "O"], ["2026-1", "O"], ["2026-2", "O"]] },
  { category: "대학원", name: "인간성능", type: "핵심", offerings: [["2026-1", "O"], ["2027-1", "O"]] },
  { category: "대학원", name: "작업생체역학", type: "핵심", offerings: [["2025-2", "O"], ["2026-2", "O"], ["2027-2", "O"]] },
  { category: "대학원", name: "볼록최적화(구 최적화원론)", type: "핵심", offerings: [["2025-2", "O"], ["2026-2", "O"], ["2027-2", "O"]] },
  { category: "대학원", name: "정수최적화", type: "핵심", offerings: [["2026-1", "O"], ["2026-2", "O"], ["2027-2", "O"]] },
  { category: "대학원", name: "추계학", type: "핵심", offerings: [["2025-2", "O"], ["2026-2", "O"]] },
  { category: "대학원", name: "제품공학", type: "핵심", offerings: [["2026-1", "O"], ["2027-2", "O"]] },
  { category: "대학원", name: "재고관리", type: "핵심", offerings: [["2026-2", "O"]] },
  { category: "대학원", name: "생산계획 및 통제", type: "핵심", offerings: [["2026-1", "O"], ["2027-1", "O"]] },
  { category: "대학원", name: "데이터마이닝기법", type: "핵심", offerings: [["2025-2", "O"], ["2027-2", "O"], ["2028-1", "O"]] },
  { category: "대학원", name: "데이터기반학습", type: "핵심", offerings: [["2026-1", "O"], ["2027-1", "O"], ["2028-1", "O"]] },
  { category: "대학원", name: "응용 다변량 통계분석", type: "핵심", offerings: [["2027-1", "O"]] },
  { category: "대학원", name: "기술혁신이론 및 연구방법론", type: "핵심", offerings: [["2026-1", "O"], ["2027-1", "O"]] },
  { category: "대학원", name: "공업경제분석", type: "핵심", offerings: [["2026-1", "O"], ["2028-1", "O"]] },
  { category: "대학원", name: "산업공학세미나", type: "필수", offerings: [["2026-1", "O"]] },
  { category: "대학원", name: "자동차 인간공학", type: "", offerings: [["2026-1", "O"], ["2027-2", "O"]] },
  { category: "대학원", name: "기계학습 산업응용", type: "", offerings: [["2025-2", "O"], ["2027-2", "O"]] },
  { category: "대학원", name: "사용자중심 제품설계개발론", type: "", offerings: [["2025-2", "O"], ["2026-2", "O"]] },
  { category: "대학원", name: "통계학습 고등논제", type: "", offerings: [["2027-2", "O"]] },
  { category: "대학원", name: "경쟁시스템분석", type: "", offerings: [["2025-2", "O"], ["2026-2", "O"], ["2027-2", "O"]] },
  { category: "대학원", name: "산업공학특론", type: "", offerings: [["2025-2", "O"], ["2026-2", "O"], ["2027-2", "O"]] },
  { category: "대학원", name: "확률모형 특론", type: "", offerings: [["2025-2", "O"]] },
  { category: "대학원", name: "조합최적화", type: "", offerings: [["2025-2", "O"], ["2026-2", "O"]] },
  { category: "대학원", name: "산업공학프로젝트", type: "", offerings: [["2025-2", "O"]] },
  { category: "대학원", name: "선형최적화", type: "", offerings: [["2027-1", "O"]] },
  { category: "대학원", name: "수치최적화", type: "", offerings: [["2027-1", "O"]] },
  { category: "대학원", name: "스케줄링이론및응용", type: "", offerings: [["2026-1", "O"], ["2028-1", "O"]] },
  { category: "대학원", name: "글로벌산업공학인사이트", type: "", offerings: [["2025-2", "O"]] },
  { category: "대학원", name: "산업인공지능스튜디오", type: "", offerings: [["2026-2", "O"]] },
  { category: "대학원", name: "헬스케어서비스혁신", type: "", offerings: [["2026-2", "O"]] }
];

// ─── FAQ 데이터 (faq.html) ────────────────────────────────────────────────────
const faqs = [
  {
    q: "산업공학과 전공선택 21학점에는 어떤 과목이 들어가나요?",
    a: "학과 전공선택 21학점 요건에는 <strong>산업공학과에서 개설한 전공선택 과목</strong>만 포함됩니다. 주전공 59학점 중 전공필수 28학점과 학과 전공선택 21학점을 채운 뒤 남는 10학점은 학과 전공선택이나 타과 전선 인정 과목으로 충족할 수 있습니다. 교환학생으로 국외수학 허가를 받은 과목은 산업공학과 개설 전공선택 과목으로 봅니다."
  },
  {
    q: "복수전공이나 부전공으로 이수할 때도 전공선택 학점을 타과 전선 인정 과목으로 채울 수 있나요?",
    a: "학과 전공선택 21학점 요건 자체는 다전공 학생에게도 동일하게 적용됩니다. 다만 단전공 주전공자에게 허용되는 '나머지 10학점을 타과 전선 인정 과목으로 채우는' 방식은 다전공에는 해당하지 않습니다. 복수전공은 학과 개설 전공선택 과목을 추가로 이수해 최소 39학점을 만족해야 하고, 부전공은 전공교과목 21학점 이상(전공필수 12학점 포함)을 이수해야 하며, 두 경우 모두 타과 전선 인정 과목이 아니라 다전공 이수 자체로 요건을 충족하는 구조입니다."
  },
  {
    q: "산업공학의 이해를 정해진 학기에 듣지 않으면 성적 제한이 있나요?",
    a: "네. <a href='https://ie.snu.ac.kr/notice/?mod=document&uid=6290' target='_blank' rel='noopener'>학과 공지</a>에 따르면 산업공학의 이해(406.434, IE.1010)는 산업공학 주전공 학생과 자유전공학부 주전공 진입생이 1학년 2학기 또는 전공 진입 후 2학기 이내에 반드시 수강해야 하는 전공필수 과목입니다. 휴학 등 공식적 사유 없이 정해진 학기에 수강하지 않으면 부여 가능한 최고 성적이 B+로 제한되며, 이 원칙은 산업공학과 학사과정 26학번 이후 또는 2026년 이후 전공 진입한 자유전공학부 학생부터 적용됩니다."
  },
  {
    q: "수강신청 시스템에는 선이수 요건이 안 보이는데, 이 사이트의 선이수 요건은 어디서 나온 건가요?",
    a: "수강신청 시스템 자체에는 선이수 요건이 별도로 지정되어 있지 않습니다. 이 사이트의 로드맵은 담당 교수님들께 직접 문의해 받은 답변을 바탕으로 구성했습니다. 교과목 코드상 선수과목으로 확인되는 과목 중에서도 교수님이 직접 선수과목으로 강조해 언급하신 과목은 '필수 선이수'로, 별도로 언급하지 않으신 과목은 '권장 선이수'로 표기했습니다. '필수 선이수' 중 일부는 사전 지식이 없으면 교수님 판단에 따라 실제로 수강 자체가 불허될 수 있으니 반드시 먼저 이수해야 합니다."
  },
  {
    q: "공과대학 공통 교과목 중 '공학기타' 제외 영역 3학점은 구체적으로 어떤 과목인가요?",
    a: "공과대학 공통 교과목은 공학개론, 공학경영, 공학기초, 창의공학, 공학실습, 공학기타 6개 영역으로 구성됩니다. 이수 요건 3학점은 이 중 '공학기타' 영역(예: 컴퓨터과학 입문, 한국의 건축과 도시화 등)을 제외한 나머지 5개 영역(공학개론·공학경영·공학기초·창의공학·공학실습)에서 채워야 합니다. 2024학년도 기준 전체 과목 목록은 <a href='docs/college_common_courses_2024.pdf' target='_blank' rel='noopener'>공과대학 공통 교과목 PDF(2024학년도 기준)</a>에서 확인할 수 있으며, <a href='https://www.snu.ac.kr/academics/undergraduate/curriculum' target='_blank' rel='noopener'>서울대학교 학사 교육과정 페이지</a>의 전공별 교과목(학사) 자료에서 내려받았습니다."
  },
  {
    q: "영어강의(외국어진행강좌)는 꼭 이수해야 하나요?",
    a: "학번별로 다릅니다. 2023학번까지는 대학영어를 제외하고 1강좌 이상의 주전공 교과목을 포함해 3과목 이상의 외국어진행강좌를 의무 수강해야 합니다. 2024학번 이후로는 같은 기준이 의무가 아니라 권장 사항입니다."
  },
  {
    q: "향후 2년 개설 과목 파일은 언제 확인하는 것이 정확한가요?",
    a: "개설 과목 검색의 자료는 학업 계획용 참고 자료입니다. 실제 개설 여부는 보통 해당 학기 한 학기 전에 확정되므로, 예를 들어 2026년 2학기 개설 과목은 2026년 1학기 중 5~6월경 확정 자료로 확인하는 것이 가장 정확합니다. 학과 홈페이지에 게시되는 <a href='https://ie.snu.ac.kr/archive/?mod=document&uid=1613' target='_blank' rel='noopener'>향후 2년 개설 과목 파일</a>에서 원본 자료를 바로 확인할 수 있습니다."
  },
  {
    q: "대학원 세미나 과목도 졸업 요건에 포함되나요?",
    a: "네. 주전공 기준 전공 이수학점 구조에는 대학원 세미나(산업공학 세미나) 1학점이 포함되어 있습니다. 다만 복수전공과 부전공 학생에게는 대학원 세미나 과목 이수 요건이 적용되지 않습니다. 자유전공학부 주전공자는 산업공학과 주전공생과 동일한 요건을 적용받습니다."
  },
  {
    q: "학부생이 대학원 과목을 수강하거나 대학원생이 학부 과목을 수강하면 학점은 어떻게 인정되나요?",
    a: "서울대학교 학칙 제80조(과정간 학점취득 인정)에 따라 처리됩니다. 학부 3학년 이상 학생이 학과(부)장의 승인을 받아 석사과정 교과목을 이수하면 그 학점은 학사과정 졸업학점에 포함하거나 이후 석사과정 입학 시 수료학점에 포함할 수 있습니다. 다만 1~2학년이 수강하면 성적표에는 표기되지만 학사 졸업 시 유효 이수학점 계산에는 포함되지 않습니다. 반대로 대학원생이 학부 교과목을 이수하는 경우에는 학과장 또는 전공주임교수의 승인을 받아 석·박사과정을 통틀어 6학점까지 대학원 수료학점으로 인정받을 수 있습니다(경영전문대학원 학생은 제외). 또한 학부·대학원 과정 간에 과거 이수한 과목을 다시 수강하면 성적표에는 표기되지만 수료·졸업학점으로는 인정되지 않으므로, 신청 전 반드시 소속 대학(원)과 학과(부)에 문의해야 합니다."
  },
  {
    q: "산업공학개론은 산업공학과 학생이 수강하는 과목인가요?",
    a: "아니요. 산업공학개론은 산업공학과 학생을 위한 과목이 아니라, 타과 학생이 '공학개론' 이수 요건을 채우기 위해 개설한 과목입니다. 개설 과목 검색에서도 타과수강전선으로 분류되어 있으며, 산업공학과 주전공 졸업요건상 전공필수·전공선택 어디에도 포함되지 않습니다."
  },
  {
    q: "타과 전선 인정 과목 목록은 언제 업데이트되나요?",
    a: "정해진 주기 없이 비정기적으로 업데이트됩니다. 학생들의 의견을 수렴한 뒤 검토를 거쳐 반영되므로, 실제로 수강한 타과 과목이 인정 목록에 없다면 학과에 문의해 반영을 요청할 수 있습니다."
  },
  {
    q: "통계학과 통계학실험은 반드시 같은 학기에 함께 들어야 하나요?",
    a: "아니요. 통계학과 통계학실험은 <strong>같은 학기에 동시에 수강할 필요가 없습니다.</strong> 두 과목을 모두 이수하기만 하면 되고, 학기를 나누어 들어도 무방합니다. 이수규정 PDF 비고란에는 '통계학을 수강하는 학생은 반드시 해당 학기에 실험을 동시에 수강하여야 함'이라고 적혀 있지만, 학과 확인 결과 이는 <strong>강제 요건이 아니라 권장 사항</strong>입니다. 참고로 2027학년도 1학기부터는 통계학의 이론과 실험이 하나의 교과목으로 통합될 예정입니다."
  },
  {
    q: "2027학년도부터 수학·과학 교양의 이론과 실험이 통합된다는데, 한쪽만 들은 학생은 어떻게 되나요?",
    a: "2027학년도 1학기부터 자연과학대학에서 개설하는 수·과학 교양 교과목의 <strong>이론과목과 실험(연습)과목이 하나의 교과목으로 통합</strong>될 예정입니다. 산업공학과 이수 요건과 관련된 과목은 수학 1·2, 고급수학 1·2, 통계학, 물리학·화학·생물학 계열 과목입니다. (예: 수학 1 + 수학연습 1 → 수학 및 연습 1(3학점), 물리학 1 + 물리학실험 1 → 물리학 및 실험 1(4학점)) 이론과 실험 중 <strong>한쪽만 이수한 학생을 위한 분반은 별도로 개설</strong>되며, 자연대 교학행정실은 최소 약 5년의 유예기간을 두고 해당 인원이 없어질 때까지 계속 개설하겠다고 밝혔습니다. 폐강 기준에 걸리더라도 '계속강의'로 지정해 수강신청 인원과 관계없이 개설합니다. 다만 <strong>실험 과목만 이수했다고 해서 이론 과목까지 이수한 것으로 인정되지는 않습니다.</strong> 대상 교과목 전체 목록은 <a href='liberal-arts.html'>교양 이수 가이드</a>에서 확인하세요."
  },
  {
    q: "타과 전선 인정 과목을 들었는데, 전공선택 학점으로는 어떻게 인정받나요?",
    a: "수강 후 성적이 나오면 <strong>MySNU &gt; 수업/성적 &gt; 성적 &gt; 교과구분변경신청</strong>을 통해 전공선택 학점으로 인정받을 수 있습니다. 각 학기가 끝날 때마다 신청할 필요는 없고, <strong>졸업 전까지만</strong> 변경신청을 완료하면 됩니다."
  },
  {
    q: "TEPS 시험을 개인적으로 다시 보면 교양 영어 과목을 면제받을 수 있나요?",
    a: "아니요. TEPS를 개인적으로 재응시해도 영어 과목 <strong>이수 면제는 불가능</strong>합니다. 다만 새로 취득한 성적을 서울대학교 포털 시스템에 등록하면 영어 등급이 조정되어, 1학기에 영어 과목을 이수하지 않은 뒤 더 높은 단계의 과목부터 수강하는 것은 가능합니다. 점수 구간별 수강 경로는 <a href='liberal-arts.html'>교양 이수 가이드</a>에서 확인하세요."
  },
  {
    q: "최근 3년간 개설되지 않은 과목은 앞으로도 개설되지 않나요?",
    a: "그렇게 단정할 수는 없습니다. 개설 여부는 학과 사정에 따라 학기마다 달라질 수 있습니다."
  }
];

// ─── 학번별 이수규정 (rules.html) ─────────────────────────────────────────────
const ruleData = {
  2020: {
    label: "20학번",
    group: "2020",
    totalCredits: "130학점",
    liberalCredits: "교양 50학점 이상",
    majorCredits: "주전공 59학점",
    requiredCredits: "전필 28학점",
    electiveCredits: "학과 전선 21학점 이상",
    liberal: [
      "사고의 표현 7학점: 대학 글쓰기 1, 대학글쓰기2 중 택 1, 말하기와 토론",
      "외국어 4~6학점: 외국어 2개 교과목",
      "수량적 분석과 추론 16학점: 수학 1/2, 통계학과 통계학실험, 공학수학 1/2",
      "과학적 사고와 실험 8학점: 물리/화학/생물 영역 중 학기별 4학점",
      "컴퓨터와 정보 활용 3학점: 컴퓨터의 개념 및 실습",
      "학문의 세계 12학점: 3개 영역 이상"
    ],
    majorNotes: [
      "전공필수 과목은 20-26학번 공통이며 ★ 표시 과목을 기준으로 합니다.",
      "20학번 표에는 경영정보시스템, 품질경영, 컴퓨터통합생산시스템/실험, 정보모델링기법과응용, 경영체제개론, 시스템공학개론 등이 포함되어 있습니다."
    ]
  },
  2021: {
    label: "21학번",
    group: "2021-2023",
    totalCredits: "130학점",
    liberalCredits: "교양 52학점 기준",
    majorCredits: "주전공 59학점",
    requiredCredits: "전필 28학점",
    electiveCredits: "학과 전선 21학점 이상",
    liberal: [
      "사고의 표현 7학점: 대학 글쓰기 1, 대학글쓰기2 중 택 1, 말하기와 토론",
      "외국어 6학점: 외국어 2개 교과목",
      "수량적 분석과 추론 16학점: 수학 1/2, 통계학과 통계학실험, 공학수학 1/2",
      "과학적 사고와 실험 8학점: 물리/화학/생물 영역 중 학기별 4학점",
      "컴퓨터와 정보 활용 3학점: 컴퓨터의 개념 및 실습",
      "학문의 세계 12학점: 3개 영역 이상"
    ],
    majorNotes: [
      "21학번부터 외국어가 6학점 고정으로 정리됩니다.",
      "전공 표에는 설계공학, 제품개발 및 품질설계, 컴퓨터통합생산시스템/실험, 정보모델링기법과응용 등이 포함되어 있습니다."
    ]
  },
  2022: {
    label: "22학번",
    group: "2021-2023",
    totalCredits: "130학점",
    liberalCredits: "교양 52학점 기준",
    majorCredits: "주전공 59학점",
    requiredCredits: "전필 28학점",
    electiveCredits: "학과 전선 21학점 이상",
    liberal: [
      "사고의 표현 7학점",
      "외국어 6학점",
      "수량적 분석과 추론 16학점",
      "과학적 사고와 실험 8학점",
      "컴퓨터와 정보 활용 3학점",
      "학문의 세계 12학점: 3개 영역 이상"
    ],
    majorNotes: [
      "22학번은 21-23학번 교양 구조에 속합니다.",
      "전공 표에는 물류관리, 제품개발 및 품질설계, 서비스공학, 산업경영수리기법, 인간공학 설계, 데이터마이닝 등이 포함됩니다."
    ]
  },
  2023: {
    label: "23학번",
    group: "2021-2023",
    totalCredits: "130학점",
    liberalCredits: "교양 52학점 기준",
    majorCredits: "주전공 59학점",
    requiredCredits: "전필 28학점",
    electiveCredits: "학과 전선 21학점 이상",
    liberal: [
      "사고의 표현 7학점",
      "외국어 6학점",
      "수량적 분석과 추론 16학점",
      "과학적 사고와 실험 8학점",
      "컴퓨터와 정보 활용 3학점",
      "학문의 세계 12학점: 3개 영역 이상"
    ],
    majorNotes: [
      "23학번은 21-23학번 교양 구조의 마지막 학번입니다.",
      "전공 표에는 핀테크 개론이 포함되고, 산업공학통계/생산관리/경제성공학 등 전필 구조는 동일합니다."
    ]
  },
  2024: {
    label: "24학번",
    group: "2024",
    totalCredits: "130학점",
    liberalCredits: "교양 52학점 기준",
    majorCredits: "주전공 59학점",
    requiredCredits: "전필 28학점",
    electiveCredits: "학과 전선 21학점 이상",
    liberal: [
      "사고의 표현 7학점",
      "외국어 6학점",
      "수량적 분석과 추론 16학점",
      "과학적 사고와 실험 8학점",
      "컴퓨터와 정보 활용 3학점",
      "학문의 세계 12학점: 4개 영역 이상"
    ],
    majorNotes: [
      "24학번부터 학문의 세계 이수 조건이 3개 영역 이상에서 4개 영역 이상으로 바뀝니다.",
      "전공 표에는 핀테크 개론, 빅데이터 산업응용, 데이터마이닝 등이 포함됩니다."
    ]
  },
  2025: {
    label: "25학번",
    group: "2025-2026",
    totalCredits: "130학점",
    liberalCredits: "교양 52학점 기준",
    majorCredits: "주전공 59학점",
    requiredCredits: "전필 28학점",
    electiveCredits: "학과 전선 21학점 이상",
    liberal: [
      "학문의 토대 - 사고의 표현 7학점",
      "학문의 토대 - 외국어 6학점",
      "학문의 토대 - 수학·과학·컴퓨팅: 수학/통계/공학수학 16학점, 과학 실험 8학점, 컴퓨터 3학점",
      "지성의 열쇠 9학점: 4개 영역 중 3개 영역에서 9학점 이상",
      "베리타스 3학점 이상: 베리타스 강좌 1/2 또는 베리타스 실천"
    ],
    majorNotes: [
      "25학번부터 교양 구조가 학문의 토대, 지성의 열쇠, 베리타스로 개편됩니다.",
      "전공 표에는 최적화알고리즘과 산업 텍스트 애널리틱스가 추가되어 표시됩니다."
    ]
  },
  2026: {
    label: "26학번",
    group: "2025-2026",
    totalCredits: "130학점",
    liberalCredits: "교양 52학점 기준",
    majorCredits: "주전공 59학점",
    requiredCredits: "전필 28학점",
    electiveCredits: "학과 전선 21학점 이상",
    liberal: [
      "학문의 토대 - 사고의 표현 7학점",
      "학문의 토대 - 외국어 6학점",
      "학문의 토대 - 수학·과학·컴퓨팅: 수학/통계/공학수학 16학점, 과학 실험 8학점, 컴퓨터 3학점",
      "지성의 열쇠 9학점: 4개 영역 중 3개 영역에서 9학점 이상",
      "베리타스 3학점 이상"
    ],
    majorNotes: [
      "26학번은 25-26학번 교양 구조에 속합니다.",
      "전공 표에는 서비스공학, 최적화 알고리즘, 산업 텍스트애널리틱스, 핀테크 개론 등이 포함됩니다."
    ]
  }
};

// ─── 전공필수 과목 (20-26학번 공통) ──────────────────────────────────────────
// 구·신 교과목코드 병기 (신 코드는 전공 로드맵 기준)
const commonMajorRequired = [
  { name: "산업공학의 이해", old: "406.434", new: "IE.1010" },
  { name: "과학적 관리", old: "406.211", new: "IE.2020" },
  { name: "인간공학", old: "406.304", new: "IE.2610" },
  { name: "인간공학실험", old: "406.305A", new: "IE.2620" },
  { name: "경영과학 1", old: "406.315", new: "IE.2310" },
  { name: "데이터관리와 분석", old: "406.426B", new: "IE.2510" },
  { name: "경영과학 2", old: "406.317", new: "IE.3410" },
  { name: "산업공학통계", old: "406.432", new: "IE.3420" },
  { name: "생산관리", old: "406.310", new: "IE.3210" },
  { name: "경제성공학", old: "406.314", new: "IE.4720" }
];

// ─── 학과 전공선택 과목 ───────────────────────────────────────────────────────
// 구·신 교과목코드 병기 (신 코드 출처: docs/ie_codes.xlsx)
const departmentMajorElectives = [
  { name: "산업공정설계", old: "406.436", new: "IE.2110" },
  { name: "공학도를 위한 창의적 사고", old: "406.324A", new: "IE.3051" },
  { name: "물류관리", old: "406.325", new: "IE.3251" },
  { name: "산업경영수리기법", old: "406.327", new: "IE.3061" },
  { name: "기술경영", old: "406.319", new: "IE.3710" },
  { name: "서비스공학", old: "406.322", new: "IE.3161" },
  { name: "최적화모형 및 응용", old: "406.321", new: "IE.3351" },
  { name: "인간공학 설계", old: "406.326", new: "IE.3661" },
  { name: "제품개발 및 품질설계", old: "M1505.001500", new: "IE.3151" },
  { name: "기술경영개론", old: "M1540.000200", new: "MOT.3750" },
  { name: "지식경영전략", old: "4251.002A", new: "MOT.3711" },
  { name: "시뮬레이션", old: "406.311", new: "IE.4451" },
  { name: "휴먼인터페이스디자인", old: "406.427A", new: "IE.4651" },
  { name: "데이터마이닝", old: "406.429", new: "IE.4520" },
  { name: "빅데이터 산업응용", old: "M0000.026700", new: "IE.4561" },
  { name: "산업 텍스트 애널리틱스", old: "M1505.002100", new: "IE.4551" },
  { name: "금융공학개론", old: "406.433", new: "IE.4820" },
  { name: "핀테크 개론", old: "M1505.001900", new: "IE.4810" },
  { name: "기술창업론", old: "M1540.000100", new: "MOT.4761" },
  { name: "최적화알고리즘", old: "M1505.002000", new: "IE.4362" }
];

// ─── 이수규정 PDF 링크 ────────────────────────────────────────────────────────
const requirementPdfs = {
  2020: "docs/requirements/20.pdf",
  2021: "docs/requirements/21.pdf",
  2022: "docs/requirements/22.pdf",
  2023: "docs/requirements/23.pdf",
  2024: "docs/requirements/24.pdf",
  2025: "docs/requirements/25.pdf",
  2026: "docs/requirements/26.pdf"
};

// ─── 복수전공·부전공·자유전공 규정 ───────────────────────────────────────────
const doubleMinorRules = [
  "복수전공: 해당 기준년도의 모든 전공필수 교과목을 이수해야 하며, 인간공학실험 및 산업공학의 이해는 면제됩니다.",
  "복수전공: 학과 개설 전공선택 교과목을 추가로 이수하여 최소 39학점을 만족해야 합니다.",
  "부전공: 전공교과목 21학점 이상, 이 중 전공필수 12학점 이상을 이수해야 하며 산업공학의 이해는 제외됩니다.",
  "복수전공·부전공 학생에게는 대학원 세미나 과목 이수 요건이 적용되지 않습니다.",
  "복수전공 학생은 졸업논문을 작성해야 하고, 부전공 학생은 졸업논문을 작성하지 않아도 됩니다."
];

const majorCreditViz = `
  <div class="credit-viz">
    <div class="cv-row">
      <div class="cv-label">산업공학과 주전공생 대상<br><b>전공 59학점</b></div>
      <div class="cv-main">
        <div class="cv-bar" style="width:100%">
          <span class="seg s1" style="flex:28">전공필수<em>28학점</em></span>
          <span class="seg s2" style="flex:21">학과 전공선택 21<em>산공 개설 수업</em></span>
          <span class="seg s3" style="flex:10">기타 10<em>전선인정 등</em></span>
        </div>
        <p class="cv-note">산공과 개설 전공선택 과목 <b>21학점 이상</b> (그 이상 들어도 무방)</p>
      </div>
    </div>
    <p class="cv-more">자유전공학부에서 산업공학과로 주전공 진입한 학생도 위 산업공학과 주전공생 기준을 동일하게 적용받습니다.</p>
    <div class="cv-row">
      <div class="cv-label">다전공하는 산업공학과 주전공생 대상<br><b>전공 49학점</b></div>
      <div class="cv-main">
        <div class="cv-bar" style="width:83.05%">
          <span class="seg s1" style="flex:28">전공필수<em>28학점</em></span>
          <span class="seg s2" style="flex:21">학과 전공선택 21<em>산공 개설 수업</em></span>
        </div>
        <p class="cv-note">반드시 산공과 개설 전공선택 과목으로만 <b>21학점 충족</b></p>
      </div>
    </div>
    <p class="cv-more">자세한 사항은 <a href="faq.html">자주 묻는 질문</a>에서 확인하세요.</p>
  </div>`;

// ─── 추가 이수 요건 ───────────────────────────────────────────────────────────
const additionalRequirements = [
  "생명존중(자살예방) 교육 이수: 2016학번부터 적용됩니다.",
  "공과대학 공통 교과목 중 '공학기타' 제외 영역에서 3학점 이수: 학번별 적용 여부는 전공과목 이수표준형태 표에서 확인하세요."
];

function foreignLanguageLectureRule(year) {
  if (year <= 2011) {
    return {
      yearRange: "2008학번~2011학번",
      subjectRule: "대학영어(대학영어1, 대학영어2, 고급영어) 포함",
      commonRule: "1강좌 이상의 주전공교과목을 포함하여 3과목 이상의 외국어진행강좌 의무 수강",
      required: true
    };
  }

  if (year <= 2023) {
    return {
      yearRange: "2012학번~2023학번",
      subjectRule: "대학영어(대학영어1, 대학영어2, 고급영어) 제외",
      commonRule: "1강좌 이상의 주전공교과목을 포함하여 3과목 이상의 외국어진행강좌 의무 수강",
      required: true
    };
  }

  return {
    yearRange: "2024학번~26학번",
    subjectRule: "대학영어(대학영어1, 대학영어2, 고급영어) 제외",
    commonRule: "1강좌 이상의 주전공교과목을 포함하여 3과목 이상의 외국어진행강좌 수강 권장",
    required: false
  };
}

// ─── 타과 전선 인정 과목 ──────────────────────────────────────────────────────
// 세 학번 그룹(2020-2022, 2023-2025, 2026)에서 동일한 학과 목록은
// 아래 공통 상수를 참조합니다. 한 학과의 과목이 바뀌면 해당 상수 하나만 수정하면 됩니다.
const _deptCS      = ["컴퓨터공학부", ["4190.101 이산수학", "M1522.000900 자료구조", "4190.301 데이타베이스", "4190.306 오토마타이론", "M1522.001400 데이터마이닝개론", "4190.407 알고리즘", "4190.408 인공지능", "4190.426A 인간컴퓨터상호작용"]];
const _deptCE      = ["건설환경공학부", ["457.203 도시계획", "457.208 교통공학 및 실험", "457.210A 환경공학", "457.301 교통계획 및 실험", "457.302 도시설계", "457.307 건설계획 및 관리"]];
const _deptChemBio = ["화학생물공학부", ["458.308 공정제어 및 설계", "458.401 공정 및 제품설계", "458.405 환경공학개론"]];
const _deptStats   = ["통계학과", ["326.313 회귀분석 및 실습", "326.315 실험계획 및 실습", "326.416 통계적품질관리 및 실습"]];
const _deptBiz     = ["경영학과", ["251.209 조직행위론", "251.301 재무관리", "251.303 인사관리", "251.305 원가회계", "251.306 관리회계", "251.321 마케팅관리", "251.322 국제경영"]];
const _deptEcon    = ["경제학부", ["212.201 미시경제이론", "212.202 거시경제이론"]];
// 2023-2025, 2026 그룹에서 공통 (2020-2022와 다름)
const _deptMechEng = ["기계항공공학부", ["M2794.001700 기계제품설계", "M2794.002100 시스템제어이론", "M2794.002700 로봇공학입문", "M2794.003300 자동차공학", "M2794.013600 마이크로나노 가공생산", "M2794.003600 최적설계", "M2794.004400 통합기계설계 및 해석"]];
const _deptEnergy  = ["에너지자원공학과", ["465.202 에너지환경기술경영", "465.319 신재생에너지", "465.413 에너지경제학", "465.435 에너지환경공학"]];
const _deptNatSci  = ["자연과학대학 공통과목 및 수리과학부", ["300.204 미분방정식 및 연습 / 881.003 미분방정식 (둘 중 하나만 인정)", "881.319 수치선형대수", "881.320 수치해석개론", "3341.201 해석개론1 / 881.008 해석개론 (둘 중 하나만 인정)", "3341.202 해석개론2"]];

const recognizedElectives = {
  // 기계항공공학부에 구형 과목 포함, 조선해양공학과 포함, 에너지자원공학과에 구 과목 표기
  "2020-2022": [
    _deptCS,
    ["기계항공공학부", ["M2794.001700 기계제품설계(구, M2794.005100 기계제도)", "M2794.002100 시스템제어이론", "M2794.002400 컴퓨터이용설계및제작", "M2794.002700 로봇공학입문", "M2794.002800 센서개론", "M2794.003300 자동차공학", "M2794.003500 마이크로가공생산", "M2794.003600 최적설계", "M2794.004400 통합기계설계 및 해석"]],
    ["조선해양공학과", ["414.463 조선해양 PLM개론(구, 414.436A 설계자동화개론)"]],
    _deptCE,
    _deptChemBio,
    ["에너지자원공학과", ["465.202 에너지환경기술경영", "465.319 신재생에너지", "465.413 에너지경제학(구, 465.422 에너지 미래기술)", "465.435 에너지환경공학"]],
    ["수학과", ["300.204 미분방정식 및 연습 / 881.003 미분방정식 (둘 중 하나만 인정)", "881.319 수치선형대수", "881.320 수치해석개론", "3341.201 해석개론1 / 881.008 해석개론 (둘 중 하나만 인정)", "3341.202 해석개론2"]],
    _deptStats,
    _deptBiz,
    _deptEcon
  ],
  // 기계항공공학부 갱신, 수학과 → 자연과학대학, 연합전공 기술경영 추가 (기술창업론 1과목)
  "2023-2025": [
    _deptCS,
    _deptMechEng,
    _deptCE,
    _deptChemBio,
    _deptEnergy,
    _deptNatSci,
    _deptStats,
    _deptBiz,
    _deptEcon,
    ["연합전공 기술경영", ["M1540.000100 기술창업론"]]
  ],
  // 2023-2025와 동일하나 연합전공 기술경영 과목이 6개로 확대
  "2026": [
    _deptCS,
    _deptMechEng,
    _deptCE,
    _deptChemBio,
    _deptEnergy,
    _deptNatSci,
    _deptStats,
    _deptBiz,
    _deptEcon,
    ["연합전공 기술경영", ["M1540.000100 기술창업론", "M1540.000200 기술경영개론", "M1540.000300 기술경영 프로젝트", "M1540.000500 지식재산경영", "M1540.000400 전략로드맵핑", "4251.002A 지식경영전략"]]
  ]
};

// ─── 타과 전선 인정 학점표 ────────────────────────────────────────────────────
const recognizedElectiveCredits = {
  "212.201": "3",
  "212.202": "3",
  "251.209": "3",
  "251.301": "3",
  "251.303": "3",
  "251.305": "3",
  "251.306": "3",
  "251.321": "3",
  "251.322": "3",
  "300.204": "4",
  "326.313": "3",
  "326.315": "3",
  "326.416": "3",
  "3341.201": "3",
  "3341.202": "3",
  "414.436A": "3",
  "414.463": "3",
  "4190.101": "3",
  "4190.301": "3",
  "4190.306": "3",
  "4190.407": "3",
  "4190.408": "3",
  "4190.426A": "3",
  "4251.002A": "3",
  "457.203": "3",
  "457.208": "3",
  "457.210A": "3",
  "457.301": "3",
  "457.302": "3",
  "457.307": "3",
  "458.308": "3",
  "458.401": "3",
  "458.405": "3",
  "465.202": "3",
  "465.319": "3",
  "465.413": "3",
  "465.422": "3",
  "465.435": "3",
  "881.003": "3",
  "881.008": "3",
  "881.319": "3",
  "881.320": "3",
  "M1522.000900": "3",
  "M1522.001400": "3",
  "M1540.000100": "3",
  "M1540.000200": "3",
  "M1540.000300": "3",
  "M1540.000400": "3",
  "M1540.000500": "3",
  "M2794.001700": "3",
  "M2794.002100": "3",
  "M2794.002400": "3",
  "M2794.002700": "3",
  "M2794.002800": "3",
  "M2794.003300": "3",
  "M2794.003500": "3",
  "M2794.003600": "3",
  "M2794.004400": "3",
  "M2794.005100": "3",
  "M2794.013600": "3"
};

// ─── 학번 그룹별 교양 이수 구조 ──────────────────────────────────────────────
const liberalRowsByGroup = {
  "2020": [
    ["사고의 표현", "7학점", ["대학 글쓰기 1", "대학글쓰기2: 인문학글쓰기/사회과학글쓰기/과학기술글쓰기 중 택 1", "말하기와 토론"]],
    ["외국어", "4~6학점", ["외국어 2개 교과목", "입학 시 TEPS 900점(New TEPS 525점) 이하인 학생은 영어 1과목 필수"]],
    ["수량적 분석과 추론", "16학점", ["수학 1과 수학연습 1 또는 고급수학 1과 고급수학연습 1", "수학 2와 수학연습 2 또는 고급수학 2와 고급수학연습 2", "통계학과 통계학실험", "공학수학 1", "공학수학 2"]],
    ["과학적 사고와 실험", "8학점", ["물리학 영역", "화학 영역", "생물학 영역 중에서 학기별로 4학점 이수"]],
    ["컴퓨터와 정보 활용", "3학점", "컴퓨터의 개념 및 실습"],
    ["학문의 세계", "12학점", ["언어와 문학", "문화와 예술", "역사와 철학", "정치와 경제", "인간과 사회", "자연과 기술", "생명과 환경 중 3개 영역 이상"]]
  ],
  "2021-2023": [
    ["사고의 표현", "7학점", ["대학 글쓰기 1", "대학글쓰기2: 인문학글쓰기/사회과학글쓰기/과학기술글쓰기 중 택 1", "말하기와 토론"]],
    ["외국어", "6학점", ["외국어 2개 교과목", "입학 시 TEPS 900점(New TEPS 525점) 이하인 학생은 영어 1과목 필수"]],
    ["수량적 분석과 추론", "16학점", ["수학 1과 수학연습 1 또는 고급수학 1과 고급수학연습 1", "수학 2와 수학연습 2 또는 고급수학 2와 고급수학연습 2", "통계학과 통계학실험", "공학수학 1", "공학수학 2"]],
    ["과학적 사고와 실험", "8학점", ["물리학 영역", "화학 영역", "생물학 영역 중에서 학기별로 4학점 이수"]],
    ["컴퓨터와 정보 활용", "3학점", "컴퓨터의 개념 및 실습"],
    ["학문의 세계", "12학점", ["언어와 문학", "문화와 예술", "역사와 철학", "정치와 경제", "인간과 사회", "자연과 기술", "생명과 환경 중 3개 영역 이상"]]
  ],
  "2024": [
    ["사고의 표현", "7학점", ["대학 글쓰기 1", "대학글쓰기2: 인문학글쓰기/사회과학글쓰기/과학기술글쓰기 중 택 1", "말하기와 토론"]],
    ["외국어", "6학점", ["외국어 2개 교과목", "입학 시 TEPS 900점(New TEPS 525점) 이하인 학생은 영어 1과목 필수"]],
    ["수량적 분석과 추론", "16학점", ["수학 1과 수학연습 1 또는 고급수학 1과 고급수학연습 1", "수학 2와 수학연습 2 또는 고급수학 2와 고급수학연습 2", "통계학과 통계학실험", "공학수학 1", "공학수학 2"]],
    ["과학적 사고와 실험", "8학점", ["물리학 영역", "화학 영역", "생물학 영역 중에서 학기별로 4학점 이수"]],
    ["컴퓨터와 정보 활용", "3학점", "컴퓨터의 개념 및 실습"],
    ["학문의 세계", "12학점", ["언어와 문학", "문화와 예술", "역사와 철학", "정치와 경제", "인간과 사회", "자연과 기술", "생명과 환경 중 4개 영역 이상"]]
  ],
  "2025-2026": [
    ["사고의 표현", "7학점", ["대학 글쓰기 1", "대학글쓰기2: 인문학글쓰기/사회과학글쓰기/과학기술글쓰기 중 택 1", "말하기와 토론"]],
    ["외국어", "6학점", ["외국어 2개 교과목", "입학 시 TEPS 900점(New TEPS 525점) 이하인 학생은 영어 1과목 필수"]],
    ["수학·과학·컴퓨팅", "27학점", ["수학 1과 수학연습 1 또는 고급수학 1과 고급수학연습 1", "수학 2와 수학연습 2 또는 고급수학 2와 고급수학연습 2", "통계학과 통계학실험", "공학수학 1", "공학수학 2", "위 수학·통계·공학수학 과목 합계 16학점", "물리학·화학·생물학 영역 중 선택적 필수 과목 8학점", "컴퓨터의 개념 및 실습 3학점"]],
    ["지성의 열쇠", "9학점", ["문화 해석과 상상", "역사적 탐구와 철학적 사유", "인간의 이해와 사회 분석", "과학적 사고와 응용 중 3개 영역 이상"]],
    ["베리타스", "3학점", "베리타스 강좌 1/2 또는 베리타스 실천"]
  ]
};

// ─── 전공 이수학점 구조 ───────────────────────────────────────────────────────
const majorCreditRows = [
  ["주전공", "59학점", ["전공필수 28학점과 학과 전공선택 21학점을 반드시 충족", "나머지 10학점은 학과 전공선택 또는 타과 전선 인정 과목으로 충족 가능"]],
  ["전공필수", "28학점"],
  ["학과 전공선택", "21학점 이상"],
  ["대학원 세미나", "1학점"]
];

// ─── 페이지 초기화 ────────────────────────────────────────────────────────────

const courseGrid = document.querySelector("#courseGrid");
const courseSearch = document.querySelector("#courseSearch");
const courseCount = document.querySelector("#courseCount");
const filterButtons = document.querySelectorAll(".filter");
let activeFilter = "all";

function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

function renderCourses() {
  if (!courseGrid || !courseSearch) return;

  const query = courseSearch.value.trim().toLowerCase();
  const filtered = upcomingCourses.filter((course) => {
    const offeringText = course.offerings.map(([term, note]) => `${term} ${note}`).join(" ");
    const haystack = `${course.category} ${course.name} ${course.type} ${offeringText}`.toLowerCase();
    const matchesQuery = haystack.includes(query);
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "required" && course.type === "전필") ||
      (activeFilter === "elective" && course.type === "전선") ||
      (activeFilter === "graduate" && course.category === "대학원") ||
      course.offerings.some(([term]) => term === activeFilter);
    return matchesQuery && matchesFilter;
  });

  if (courseCount) {
    courseCount.textContent = `${filtered.length}개 과목`;
  }

  courseGrid.innerHTML = filtered.map((course) => {
    const isGraduate = course.category === "대학원";
    return `
    <article class="course-card">
      <header>
        <div>
          <span class="course-code">${course.category}</span>
          <h3>${course.name}</h3>
        </div>
        ${isGraduate ? "" : (course.type ? `<span class="badge ${course.type === "전필" ? "required" : ""}">${course.type}</span>` : '<span class="badge">교과목</span>')}
      </header>
      <div class="offering-list">
        ${course.offerings.map(([term, note]) => {
          const detail = note === "O" ? "" : note.replace(/^O/, "").trim();
          return `<span>${term}${detail ? ` · ${detail}` : ""}</span>`;
        }).join("")}
      </div>
    </article>
  `;
  }).join("");
}

function initFaqs() {
  const faqList = document.querySelector("#faqList");
  if (!faqList) return;

  faqList.innerHTML = faqs.map((item, index) => `
    <article class="faq-item ${index === 0 ? "open" : ""}">
      <button type="button" aria-expanded="${index === 0 ? "true" : "false"}">
        <span>${item.q}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-answer">${item.a}</div>
    </article>
  `).join("");

  faqList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const item = button.closest(".faq-item");
    const open = item.classList.toggle("open");
    button.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function initRulesPage() {
  const yearInput = document.querySelector("#studentYear");
  const ruleOutput = document.querySelector("#ruleOutput");
  const yearChips = document.querySelectorAll(".year-chip");
  const selectedPdfLink = document.querySelector("#selectedPdfLink");
  const pdfPreview = document.querySelector("#pdfPreview");
  if (!ruleOutput) return;

  function listItems(items) {
    return items.map((item) => `<li>${item}</li>`).join("");
  }

  function creditRows(rows) {
    return rows.map(([area, credits, note = ""]) => `
      <div class="credit-row">
        <strong>${area}</strong>
        <strong>${credits}</strong>
        ${note ? `<span>${Array.isArray(note) ? note.join("<br>") : note}</span>` : ""}
      </div>
    `).join("");
  }

  function electiveGroupForYear(year) {
    if (year <= 2022) return "2020-2022";
    if (year <= 2025) return "2023-2025";
    return "2026";
  }

  function courseCodes(text) {
    return text.match(/\b(?:M\d{4}\.\d{6}|\d{3,4}\.\d{3}[A-Z]?)\b/g) || [];
  }

  function creditBadges(subject) {
    const codes = courseCodes(subject);
    const credits = codes
      .filter((code, index) => codes.indexOf(code) === index && recognizedElectiveCredits[code])
      .map((code) => `${recognizedElectiveCredits[code]}학점`);

    return credits.length ? `<span class="credit-badges"><strong>${credits.join("/")}</strong></span>` : "";
  }

  function electiveDepartments(year) {
    return recognizedElectives[electiveGroupForYear(year)].map(([department, subjects]) => `
      <article class="elective-dept">
        <h3>${department}</h3>
        <ul class="elective-subjects">
          ${subjects.map((subject) => `<li><span>${subject}</span>${creditBadges(subject)}</li>`).join("")}
        </ul>
      </article>
    `).join("");
  }

  function foreignLanguageLectureTable(year) {
    const rule = foreignLanguageLectureRule(year);
    const status = rule.required ? "의무 수강" : "수강 권장";

    return `
      <div class="foreign-language-card ${rule.required ? "is-required" : ""}">
        <div class="foreign-language-status">${status}</div>
        <div class="foreign-language-detail">
          <strong>${rule.yearRange}</strong>
          <span>${rule.subjectRule}</span>
          <span>${rule.commonRule}</span>
        </div>
      </div>
      <p class="section-note">필요에 따라 학과(부)별 별도 기준이 있을 수 있으며, 외국대학에서 이수한 교과목 중 「서울대학교 공과대학 학생의 외국대학 수학 및 학점인정에 관한 규정」을 충족하는 교과목은 외국어진행강좌로 인정될 수 있습니다.</p>
    `;
  }

  function renderRules(year) {
    const data = ruleData[year];
    if (!data) {
      if (selectedPdfLink) selectedPdfLink.innerHTML = "";
      ruleOutput.innerHTML = `
        <article class="rule-alert">
          <h2>지원 범위 밖 학번입니다</h2>
          <p>업로드한 PDF에는 20-26학번 규정이 정리되어 있습니다. 2020부터 2026 사이의 입학연도를 입력해주세요.</p>
        </article>
      `;
      return;
    }

    if (yearInput) yearInput.value = year;
    yearChips.forEach((chip) => chip.classList.toggle("active", Number(chip.dataset.year) === year));
    if (selectedPdfLink) {
      const pdf = requirementPdfs[year];
      selectedPdfLink.innerHTML = pdf
        ? `<span>${data.label} 이수 규정 원문:</span><button type="button" class="pdf-toggle" data-pdf="${pdf}" data-label="${data.label}" aria-expanded="false" aria-controls="pdfPreview">미리보기</button><a href="${pdf}" target="_blank" rel="noreferrer">새 탭에서 열기 ↗</a>`
        : "";
    }
    if (pdfPreview) {
      pdfPreview.hidden = true;
      pdfPreview.innerHTML = "";
    }

    ruleOutput.innerHTML = `
      <div class="rule-summary">
        <article><span>졸업학점</span><strong>${data.totalCredits}</strong></article>
        <article><span>교양</span><strong>${data.liberalCredits}</strong></article>
        <article><span>주전공</span><strong>${data.majorCredits}</strong></article>
        <article><span>전공필수</span><strong>${data.requiredCredits}</strong></article>
        <article><span>학과 전선</span><strong>${data.electiveCredits}</strong></article>
      </div>

      <section class="rule-section emphasis">
        <h2>추가 이수 요건</h2>
        <ul class="rule-list">${listItems(additionalRequirements)}</ul>
        <h3 class="subsection-title">외국어진행강좌 기준</h3>
        ${foreignLanguageLectureTable(year)}
      </section>

      <section class="rule-section">
        <h2>${data.label} 교양 이수학점</h2>
        <div class="credit-table">${creditRows(liberalRowsByGroup[data.group])}</div>
      </section>

      <section class="rule-section">
        <h2>전공 이수학점</h2>
        <div class="credit-table compact">${creditRows(majorCreditRows)}</div>
        ${majorCreditViz}
      </section>

      <section class="rule-section">
        <h2>전공필수 과목</h2>
        <div class="pill-list">${commonMajorRequired.map((course) => `<span><b>${course.name}</b><em>${course.old} · ${course.new}</em></span>`).join("")}</div>
      </section>

      <section class="rule-section">
        <h2>학과 전공선택 과목</h2>
        <p class="section-note">학과 전공선택은 원칙적으로 <strong>산업공학과에서 개설한 교과목</strong>만 포함합니다(학부 3·4학년 때 수강한 산업공학과 대학원 교과목 포함). 다만 국외수학 허가자가 국외기관에서 이수한 교과목 중 학과 개설 전공선택 교과목과 대응관계가 인정되어 별도 승인을 받은 경우에는 학과 전공선택에 포함됩니다.</p>
        <div class="major-elective-list">${departmentMajorElectives.map((course) => `<span><b>${course.name}</b><em>${course.old} · ${course.new}</em></span>`).join("")}</div>
      </section>

      <section class="rule-section">
        <h2>타과 전선 인정 과목</h2>
        <div class="elective-grid">${electiveDepartments(year)}</div>
      </section>

      <section class="rule-section multi-major-section">
        <h2>복수전공 · 부전공</h2>
        <p class="section-note">단전공생 이수학점과 별도로 확인해야 하는 다전공 기준입니다.</p>
        <ul class="rule-list">${listItems(doubleMinorRules)}</ul>
      </section>
    `;
  }

  if (yearInput) {
    yearInput.addEventListener("input", () => {
      renderRules(Number(yearInput.value));
    });
  }

  yearChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      renderRules(Number(chip.dataset.year));
    });
  });

  if (selectedPdfLink && pdfPreview) {
    selectedPdfLink.addEventListener("click", (event) => {
      const toggle = event.target.closest(".pdf-toggle");
      if (!toggle) return;
      const isOpen = !pdfPreview.hidden;
      if (isOpen) {
        pdfPreview.hidden = true;
        pdfPreview.innerHTML = "";
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "미리보기";
      } else {
        const pdf = toggle.dataset.pdf;
        const label = toggle.dataset.label || "이수규정";
        pdfPreview.innerHTML = `<iframe class="pdf-frame" src="${pdf}#view=FitH" title="${label} 이수규정 PDF 미리보기" loading="lazy"></iframe><p class="pdf-preview-note">미리보기가 보이지 않으면 <a href="${pdf}" target="_blank" rel="noreferrer">새 탭에서 열기 ↗</a>를 이용하세요. (모바일에서는 새 탭 열기를 권장합니다.)</p>`;
        pdfPreview.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        toggle.textContent = "미리보기 닫기";
      }
    });
  }

  renderRules(2025);
}

function initFeedbackButton() {
  if (document.querySelector(".feedback-float")) return;

  const button = document.createElement("a");
  button.className = "feedback-float";
  button.href = "https://forms.gle/vGcq96qUARLFE2fM7";
  button.target = "_blank";
  button.rel = "noreferrer";
  button.setAttribute("aria-label", "SNU IE Navigator 문의 및 제보 폼 열기");
  button.title = "문의 및 제보";
  button.innerHTML = `
    <svg class="feedback-float-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9H13a8 8 0 0 1 8 8v.5Z"></path>
      <path d="M8.5 10.5h7"></path>
      <path d="M8.5 13.5h4.2"></path>
    </svg>
    <span class="feedback-float-label">문의·제보</span>
  `;

  document.body.appendChild(button);
}

Array.from(filterButtons).forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    Array.from(filterButtons).forEach((target) => target.classList.toggle("active", target === button));
    renderCourses();
  });
});

if (courseSearch) {
  courseSearch.addEventListener("input", debounce(renderCourses, 150));
}

initFaqs();
renderCourses();
initRulesPage();
initFeedbackButton();
