/**
 * KNOWWAY 빅데이터분석기사 필기 합격 족보 데이터
 * [과목별 무조건 암기 & 필수 이해 35대 핵심 마스터 덱]
 * - 1~4과목 + 12회 기출 킬러 전과목 A급 최빈출 개념 엄선
 * - 1초 암기 두문자/비유, 공식/비교표, 오답 함정 트랩, 실전 기출 연동 키워드 수록
 */
window.mustKnowData = [
  // =========================================================================
  // [1과목] 빅데이터 분석 기획 (8대 핵심 족보)
  // =========================================================================
  {
    id: "mk-1-1",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "빅데이터의 이해",
    importance: "A+",
    title: "DIKW 피라미드 4단계 계층 구조",
    summary: "데이터가 가공되어 정보, 지식, 지혜로 발전하는 4단계 계층 구조. 시험에서는 단계별 정의와 구체적인 마트/가격 예시 매칭이 100% 출제됩니다.",
    memoryTip: "💡 1초 암기: D(데이터/사실) ➔ I(정보/패턴/더 싸다) ➔ K(지식/판단/거기서 산다) ➔ W(지혜/통찰/다른것도 쌀 것)",
    corePoints: [
      "데이터(Data): 가공 전 객관적 사실 (예: A마트 계란 2,000원, B마트 3,000원)",
      "정보(Information): 가공 및 상관관계 파악 (예: A마트 계란이 B마트보다 1,000원 더 싸다)",
      "지식(Knowledge): 규칙과 원리를 통한 의사결정 활용 (예: 계란을 살 때는 A마트에 가야겠다)",
      "지혜(Wisdom): 축적된 지식을 바탕으로 한 창의적 통찰/예측 (예: A마트의 다른 식료품도 B마트보다 쌀 것이다)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>단계</th><th>핵심 정의</th><th>기출 출제 대표 예시</th></tr></thead>
        <tbody>
          <tr><td><strong>데이터 (Data)</strong></td><td>가공되지 않은 순수한 객관적 수치/사실</td><td>A대리점 폰 100만, B대리점 폰 120만</td></tr>
          <tr><td><strong>정보 (Info)</strong></td><td>데이터를 정리하여 맥락/패턴을 부여한 것</td><td>A대리점이 B대리점보다 20만원 저렴하다</td></tr>
          <tr><td><strong>지식 (Knowledge)</strong></td><td>정보를 바탕으로 개인화된 행동/의사결정 도출</td><td>휴대폰을 살 때 A대리점에 가야겠다</td></tr>
          <tr><td><strong>지혜 (Wisdom)</strong></td><td>지식이 축적되어 형성된 직관적 통찰·미래 예측</td><td>A대리점은 태블릿 등 다른 제품도 쌀 것이다</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'A마트가 더 싸다는 것을 인지한 상태'는 정보(I)이며, 'A마트에서 구매하기로 결정'한 상태가 지식(K)입니다. 둘을 뒤바꾼 보기를 조심하세요!",
    quizKeyword: "DIKW",
    cardId: "c1-2"
  },
  {
    id: "mk-1-2",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "빅데이터의 이해",
    importance: "A+",
    title: "암묵지와 형식지의 상호작용 (SECI 모델: 공-표-연-내)",
    summary: "노나카 이쿠지로의 지식 창조 4단계 모델. 암묵지(개인 내면 지식/손맛)와 형식지(문서화/매뉴얼)가 상호 전환되는 순환 구조입니다.",
    memoryTip: "💡 1초 암기: 【공-표-연-내】 ➔ 공통화(암→암), 표출화(암→형), 연결화(형→형), 내면화(형→암)",
    corePoints: [
      "공통화(Socialization): 암묵지 ➔ 암묵지 (도제식 교육, 경험 공유, 선배의 노하우 전수)",
      "표출화(Externalization): 암묵지 ➔ 형식지 (머릿속 노하우를 문서, 매뉴얼, 서적으로 작성) 🔥 최다출제",
      "연결화(Combination): 형식지 ➔ 형식지 (작성된 매뉴얼들을 모아 종합 시스템/교재 구축)",
      "내면화(Internalization): 형식지 ➔ 암묵지 (매뉴얼을 읽고 훈련하여 자신의 체화된 지식으로 흡수)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>암묵지 (Tacit Knowledge)</th><th>형식지 (Explicit Knowledge)</th></tr></thead>
        <tbody>
          <tr><td><strong>특징</strong></td><td>개인에게 체화되어 겉으로 드러나지 않음</td><td>문서, 매뉴얼, DB 등으로 형상화됨</td></tr>
          <tr><td><strong>비유</strong></td><td>김밥 장인의 '손맛', 자전거 타는 감각</td><td>정확한 계량 수치가 적힌 '레시피 문서'</td></tr>
          <tr><td><strong>공유 난이도</strong></td><td>공유하기 어렵고 시간이 오래 걸림</td><td>언어와 기호로 쉽게 대량 전달 가능</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '개인의 노하우를 책이나 매뉴얼로 정리하는 것'은 표출화(Externalization)입니다. 이를 공통화나 연결화로 속여 출제합니다.",
    quizKeyword: "암묵지",
    cardId: "c1-3"
  },
  {
    id: "mk-1-3",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "빅데이터 기술 및 패러다임",
    importance: "A",
    title: "빅데이터 3V·5V와 4대 패러다임 변화 (전-후-양-상)",
    summary: "가트너(Gartner)의 전통 3V와 가치/신뢰성을 더한 확장 5V, 그리고 빅데이터 출현으로 인한 데이터 처리 패러다임의 4대 변화입니다.",
    memoryTip: "💡 1초 암기: 3V = 【규모(Volume), 다양성(Variety), 속도(Velocity)】 | 4대 변화 = 【전-후-양-상】 (전수, 사후, 양, 상관)",
    corePoints: [
      "가트너 3V: Volume(데이터 양의 급증), Variety(텍스트/영상 등 비정형 다양성), Velocity(실시간 생성·처리 속도)",
      "확장 5V: + Value(가치 창출), Veracity(신뢰성/데이터 품질)",
      "패러다임 변화 4가지:",
      " 1) 표본조사 ➔ 전수조사 (모든 데이터 직접 분석)",
      " 2) 사전처리 ➔ 사후처리 (일단 다 모아두고 필요 시 분석)",
      " 3) 질 중심 ➔ 양 중심 (노이즈가 있어도 방대한 양으로 극복)",
      " 4) 인과관계 ➔ 상관관계 ('왜 그런가'보다 '어떤 패턴이 함께 일어나는가'에 집중)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>과거 전통 데이터</th><th>빅데이터 패러다임 (전-후-양-상)</th></tr></thead>
        <tbody>
          <tr><td><strong>조사 방식</strong></td><td>일부만 샘플링 (표본조사)</td><td>전체 데이터 분석 (전수조사)</td></tr>
          <tr><td><strong>처리 시점</strong></td><td>정제 후 저장 (사전처리)</td><td>원시 데이터 축적 후 분석 (사후처리)</td></tr>
          <tr><td><strong>데이터 품질</strong></td><td>엄격한 정제 (질 중심)</td><td>방대한 데이터 활용 (양 중심)</td></tr>
          <tr><td><strong>관계 규명</strong></td><td>원인-결과 증명 (인과관계)</td><td>동시 발생 패턴 파악 (상관관계)</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '빅데이터 시대에는 상관관계보다 인과관계를 밝히는 것이 핵심이다' ➔ 땡(❌)! 인과관계가 아닌 '상관관계'가 핵심입니다.",
    quizKeyword: "3V",
    cardId: "c1-5"
  },
  {
    id: "mk-1-4",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "분석 방법론",
    importance: "A+",
    title: "데이터 분석 방법론 비교 (KDD vs CRISP-DM 6단계)",
    summary: "전통 KDD 방법론과 전세계 표준 CRISP-DM 6단계의 순서와 단계별 세부 작업 매칭은 매회 1~2문제 고정 출제됩니다.",
    memoryTip: "💡 1초 암기: CRISP-DM 6단계 = 【업-데-데-모-평-전】 (업무이해 ➔ 데이터이해 ➔ 데이터준비 ➔ 모델링 ➔ 평가 ➔ 전개)",
    corePoints: [
      "KDD 절차: 데이터셋 선택(Selection) ➔ 전처리(Preprocessing) ➔ 변환(Transformation) ➔ 마이닝(Data Mining) ➔ 평가(Evaluation)",
      "CRISP-DM 6단계:",
      " 1) 업무 이해(Business Understanding): 비즈니스 목표 수립, 프로젝트 계획",
      " 2) 데이터 이해(Data Understanding): 원천 데이터 수집, 데이터 탐색(EDA), 품질 검증",
      " 3) 데이터 준비(Data Preparation): 데이터 정제, 결합, 파생변수 생성, 데이터셋 편성",
      " 4) 모델링(Modeling): 모델링 기법 선택, 하이퍼파라미터 튜닝, 모델 작성",
      " 5) 평가(Evaluation): 비즈니스 관점에서 목표 달성 여부 평가 (기술적 지표 + 비즈니스 평가)",
      " 6) 전개(Deployment): 모델 배포, 운영 시스템 통합, 최종 보고서 작성"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>CRISP-DM 단계</th><th>주요 활동</th><th>KDD 대응 단계</th></tr></thead>
        <tbody>
          <tr><td><strong>1. 업무 이해</strong></td><td>도메인 이해, 문제 정의, 분석 계획</td><td>-</td></tr>
          <tr><td><strong>2. 데이터 이해</strong></td><td>초기 데이터 수집, 속성 파악, EDA</td><td>데이터 선택</td></tr>
          <tr><td><strong>3. 데이터 준비</strong></td><td>결측/이상치 처리, 변수 변환, 세트 분할</td><td>전처리 & 변환</td></tr>
          <tr><td><strong>4. 모델링</strong></td><td>알고리즘 선정, 모델 학습, 파라미터 최적화</td><td>데이터 마이닝</td></tr>
          <tr><td><strong>5. 평가</strong></td><td>비즈니스 목표 부합 여부, 모델 신뢰도 검증</td><td>결과 평가</td></tr>
          <tr><td><strong>6. 전개</strong></td><td>실운영 적용, 유지보수 계획</td><td>-</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '데이터 정제 및 파생변수 생성'은 [데이터 준비] 단계입니다. [데이터 이해] 단계로 혼동하지 않도록 주의하세요!",
    quizKeyword: "CRISP-DM",
    cardId: "c1-10"
  },
  {
    id: "mk-1-5",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "분석 기획",
    importance: "A+",
    title: "분석 기획 4대 접근 방식 매트릭스 (최-통-솔-발)",
    summary: "분석 대상(What - 알고 있는가/모르는가)과 분석 방법(How - 알고 있는가/모르는가)의 2x2 매트릭스 분류.",
    memoryTip: "💡 1초 암기: 【최-통-솔-발】 ➔ 최적화(What O, How O) / 통찰(What X, How O) / 솔루션(What O, How X) / 발견(What X, How X)",
    corePoints: [
      "최적화 (Optimization): 대상(What) 알고 있음, 방법(How) 알고 있음 ➔ 효율 극대화",
      "솔루션 (Solution): 대상(What) 알고 있음, 방법(How) 모름 ➔ 새로운 분석 기법/알고리즘 도입 필요",
      "통찰 (Insight): 대상(What) 모름, 방법(How) 알고 있음 ➔ 기존 분석 도구로 새로운 관점 도출",
      "발견 (Discovery): 대상(What) 모름, 방법(How) 모름 ➔ 탐색적 접근으로 신규 비즈니스 영역 발견"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>How 알고 있음 (Known)</th><th>How 모름 (Unknown)</th></tr></thead>
        <tbody>
          <tr><td><strong>What 알고 있음 (Known)</strong></td><td><strong style="color:var(--brand);">최적화 (Optimization)</strong></td><td><strong style="color:var(--warning);">솔루션 (Solution)</strong></td></tr>
          <tr><td><strong>What 모름 (Unknown)</strong></td><td><strong style="color:var(--purple);">통찰 (Insight)</strong></td><td><strong style="color:var(--danger);">발견 (Discovery)</strong></td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '문제가 무엇인지는 명확히 아는데(What 알고있음), 어떻게 해결할지 모르는(How 모름) 경우'는 Solution입니다.",
    quizKeyword: "최적화",
    cardId: "c1-15"
  },
  {
    id: "mk-1-6",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "법제도 및 프라이버시",
    importance: "A+",
    title: "개인정보 비식별화 5대 조치 기법 (가-총-삭-범-마)",
    summary: "개인정보보호법에 규정된 5대 비식별화 기술의 종류와 구체적 기법 매칭.",
    memoryTip: "💡 1초 암기: 【가-총-삭-범-마】 (가명처리, 총계처리, 데이터삭제, 범주화, 마스킹)",
    corePoints: [
      "1) 가명처리(Pseudonymization): 식별자를 대체값으로 변환 (휴리스틱 가명화, 암호화, 토큰화, 교환)",
      "2) 총계처리(Aggregation): 개인 수치 대신 총합, 평균 등 통계값으로 변환 (총합, 부분합, 라운딩)",
      "3) 데이터 삭제(Data Reduction): 식별성이 높은 속성이나 레코드 자체를 영구 삭제",
      "4) 데이터 범주화(Data Suppression): 구체적 값을 범주/구간으로 묶음 (28세 ➔ 20대, 서울시 강남구 ➔ 서울시)",
      "5) 데이터 마스킹(Data Masking): 주요 속성의 일부 또는 전체를 공백이나 기호(*)로 대체 (홍길동 ➔ 홍*동, 900101-1******)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>기법</th><th>주요 세부 기술</th><th>적용 예시</th></tr></thead>
        <tbody>
          <tr><td><strong>가명처리</strong></td><td>휴리스틱, 단방향 암호화, 토큰화</td><td>홍길동 ➔ 임꺽정, id123 ➔ e3b0c442</td></tr>
          <tr><td><strong>총계처리</strong></td><td>총합/평균 대체, 부분합, 잡음 추가</td><td>개인 소득 ➔ 해당 부서 평균 소득 4,500만원</td></tr>
          <tr><td><strong>데이터 삭제</strong></td><td>식별자 삭제, 이상값 레코드 삭제</td><td>주민번호 컬럼 전체 삭제</td></tr>
          <tr><td><strong>데이터 범주화</strong></td><td>구간화(Binning), 올림/내림, 주소 단순화</td><td>나이 27세 ➔ 20대 중반, 주소 ➔ 서울시</td></tr>
          <tr><td><strong>데이터 마스킹</strong></td><td>기호(*) 대체, 랜덤 치환</td><td>홍길동 ➔ 홍*동, 카드번호 ****-****-1234</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '홍길동을 홍*동으로 바꾸는 것'은 범주화가 아니라 [데이터 마스킹]입니다. 나이를 20대로 바꾸는 것이 [범주화]입니다.",
    quizKeyword: "비식별",
    cardId: "c1-8"
  },
  {
    id: "mk-1-7",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "법제도 및 프라이버시",
    importance: "A+",
    title: "프라이버시 보호 모델 4종 (k-익명성, l-다양성, t-근접성, 차분)",
    summary: "비식별화된 데이터의 프라이버시 노출 위험을 방어하기 위한 수학적 보호 모델 비교.",
    memoryTip: "💡 1초 암기: k-익명(동일인 k명 이상) ➔ l-다양(민감정보 l개 이상) ➔ t-근접(분포 거리 t이하) ➔ 차분(노이즈 추가)",
    corePoints: [
      "k-익명성 (k-Anonymity): 동일한 준식별자 값을 가진 레코드가 최소 k개 이상 존재 ➔ 연결 공격 방어 (취약점: 동질성 공격, 배경지식 공격)",
      "l-다양성 (l-Diversity): 동질 집단 내 민감 정보가 최소 l개 이상의 서로 다른 값을 가짐 ➔ 동질성 공격 방어 (취약점: 쏠림 공격, 유사성 공격)",
      "t-근접성 (t-Closeness): 전체 데이터의 민감 정보 분포와 동질 집단 내 민감 정보 분포의 거리(차이)가 t 이하 ➔ 쏠림/유사성 공격 방어",
      "차분 프라이버시 (Differential Privacy): 쿼리 결과에 통계적 잡음(Laplace/Gaussian Noise)을 주입하여 특정 개인의 데이터 포함 여부를 알 수 없게 함"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>보호 모델</th><th>핵심 개념</th><th>방어 공격</th><th>한계점 / 취약점</th></tr></thead>
        <tbody>
          <tr><td><strong>k-익명성</strong></td><td>동일 준식별자 레코드 $\\ge k$개</td><td>연결 공격</td><td>동질성(Homogeneity), 배경지식 공격에 취약</td></tr>
          <tr><td><strong>l-다양성</strong></td><td>동질군 내 민감속성 $\\ge l$개 다양성</td><td>동질성 공격</td><td>쏠림 공격(Skewness), 유사성(Similarity)에 취약</td></tr>
          <tr><td><strong>t-근접성</strong></td><td>전체 분포와 서브셋 분포 차이 $\\le t$</td><td>쏠림/유사성 공격</td><td>데이터 유용성(Utility) 손실 큼</td></tr>
          <tr><td><strong>차분 프라이버시</strong></td><td>수학적 잡음(Noise) 추가</td><td>재식별 시도</td><td>정확한 수치 질의 결과에 오차 발생</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'k-익명성은 동질성 공격에 안전하다' ➔ 땡(❌)! 동질 집단 전원이 위암 환자라면 k명이 있어도 질병이 노출되므로 l-다양성이 필요합니다.",
    quizKeyword: "익명성",
    cardId: "c1-8"
  },
  {
    id: "mk-1-8",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "데이터 수집 및 인프라",
    importance: "A",
    title: "데이터웨어하우스(DW) vs 데이터마트(DM) vs 데이터레이크(DL)",
    summary: "빅데이터 저장소 3종의 스키마 구조, 데이터 정제 시점, 사용자 계층 완벽 비교.",
    memoryTip: "💡 1초 암기: DW(전사적 정형 정제) ➔ DM(부서별 소규모) ➔ DL(원시 비정형 그대로 레이크/호수)",
    corePoints: [
      "데이터웨어하우스(DW): 전사적(Enterprise) 통합 저장소, 엄격한 정형 데이터, Schema-on-Write (저장 시점에 스키마 정의)",
      "데이터마트(DM): 특정 부서/주제(마케팅, 영업 등) 단위로 DW에서 추출된 소규모 정형 데이터 저장소",
      "데이터레이크(DL): 정형, 반정형(JSON, XML), 비정형(영상, 음성) 원시 데이터(Raw Data)를 가공 없이 저장, Schema-on-Read (읽을 때 스키마 정의)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>데이터웨어하우스 (DW)</th><th>데이터마트 (DM)</th><th>데이터레이크 (DL)</th></tr></thead>
        <tbody>
          <tr><td><strong>범위</strong></td><td>전사적 (Enterprise-wide)</td><td>특정 부서 / 특정 주제별</td><td>전사적 원시 데이터 전체</td></tr>
          <tr><td><strong>데이터 형태</strong></td><td>정제된 정형 데이터 위주</td><td>가공된 정형 데이터</td><td>정형 + 반정형 + 비정형 원본</td></tr>
          <tr><td><strong>스키마 시점</strong></td><td>Schema-on-Write (저장 전 정의)</td><td>Schema-on-Write</td><td>Schema-on-Read (분석 시 적용)</td></tr>
          <tr><td><strong>비용 & 확장성</strong></td><td>고비용, 정밀 설계 필요</td><td>중저비용, 빠른 구축</td><td>저비용 대용량 스토리지 (Hadoop/S3)</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '데이터레이크는 저장 시점에 엄격한 정규화 스키마를 적용한다' ➔ 땡(❌)! 원본 그대로 저장하고 읽을 때 스키마를 적용(Schema-on-Read)합니다.",
    quizKeyword: "데이터레이크",
    cardId: "c1-19"
  },

  // =========================================================================
  // [2과목] 빅데이터 탐색 (9대 핵심 족보)
  // =========================================================================
  {
    id: "mk-2-1",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "데이터 정제 & 결측치",
    importance: "A+",
    title: "결측값 3가지 발생 메커니즘 (MCAR vs MAR vs MNAR)",
    summary: "결측값이 발생하는 원인과 다른 변수와의 상관성에 따른 3대 분류 체계.",
    memoryTip: "💡 1초 암기: MCAR(완전무작위/우연) ➔ MAR(무작위/다른변수관련) ➔ MNAR(비무작위/결측변수자체관련)",
    corePoints: [
      "1) 완전 무작위 결측 (MCAR, Missing Completely At Random): 결측 발생이 어떤 변수와도 무관함 (단순 시스템 오류, 통신 누락)",
      "2) 무작위 결측 (MAR, Missing At Random): 결측 발생이 '다른 관측된 변수'와 관련 있으나, '결측 변수 자체'와는 무관 (예: 여성이 남성보다 체중 응답률이 낮음)",
      "3) 비무작위 결측 (MNAR, Missing Not At Random): 결측 발생이 '결측 변수 자체의 값' 때문에 발생 (예: 고소득자가 본인 소득을 숨겨 결측됨)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>결측 원인</th><th>기출 대표 사례</th></tr></thead>
        <tbody>
          <tr><td><strong>MCAR (완전무작위)</strong></td><td>데이터 값과 완전히 무관하게 우연히 발생</td><td>센서 일시 고장, 설문지 무작위 훼손</td></tr>
          <tr><td><strong>MAR (무작위)</strong></td><td>다른 변수(성별)와 관련 있으나 해당 값(체중) 자체와는 무관</td><td>남성이 여성보다 우울증 척도 설문 응답 누락율 높음</td></tr>
          <tr><td><strong>MNAR (비무작위)</strong></td><td>해당 변수의 값(소득, 중증도) 자체가 원인</td><td>소득이 극단적으로 높은 사람이 소득 질문 미응답</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '소득이 높은 사람이 소득 공개를 꺼려 결측이 발생한 경우'는 무작위 결측(MAR)이 아니라 비무작위 결측(MNAR)입니다.",
    quizKeyword: "결측",
    cardId: "c2-8"
  },
  {
    id: "mk-2-2",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "이상치 처리",
    importance: "A+",
    title: "이상치(Outlier) 판별과 박스플롯(IQR) 계산 공식",
    summary: "사분위수 범위(IQR)를 이용한 터키(Tukey) 울타리 이상치 판별 공식은 계산 문제로 반드시 출제됩니다.",
    memoryTip: "💡 1초 암기: IQR = Q3 - Q1 | 정상 경계 = [ Q1 - 1.5×IQR ,  Q3 + 1.5×IQR ]",
    corePoints: [
      "사분위수 범위 (IQR): 제3사분위수(상위 75%, Q3) - 제1사분위수(상위 25%, Q1)",
      "최소 경계값 (하한 울타리): $Q1 - 1.5 \\times IQR$",
      "최대 경계값 (상한 울타리): $Q3 + 1.5 \\times IQR$",
      "정상 범위: $[Q1 - 1.5 \\times IQR, \\; Q3 + 1.5 \\times IQR]$를 벗어나는 데이터를 이상치로 판정",
      "극단적 이상치(Extreme): $[Q1 - 3.0 \\times IQR, \\; Q3 + 3.0 \\times IQR]$ 바깥의 데이터"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>지표</th><th>계산 공식</th><th>예시 (Q1=20, Q3=40 인 경우)</th></tr></thead>
        <tbody>
          <tr><td><strong>IQR</strong></td><td>$Q3 - Q1$</td><td>$40 - 20 = 20$</td></tr>
          <tr><td><strong>하한 울타리</strong></td><td>$Q1 - 1.5 \\times IQR$</td><td>$20 - 1.5(20) = 20 - 30 = -10$</td></tr>
          <tr><td><strong>상한 울타리</strong></td><td>$Q3 + 1.5 \\times IQR$</td><td>$40 + 1.5(20) = 40 + 30 = 70$</td></tr>
          <tr><td><strong>이상치 판정</strong></td><td>하한 미만 또는 상한 초과</td><td>$-10$ 미만 또는 $70$ 초과 값은 이상치!</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 계산 시 $1.5$를 곱하는 대상을 $Q1$이나 $Q3$로 착각하면 안 됩니다. 반드시 $1.5 \\times IQR$을 뺀 값/더한 값입니다!",
    quizKeyword: "IQR",
    cardId: "c2-10"
  },
  {
    id: "mk-2-3",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "불균형 데이터 처리",
    importance: "A+",
    title: "불균형 데이터 처리 (오버샘플링 vs 언더샘플링 vs SMOTE)",
    summary: "희귀 질환, 사기 탐지(Fraud) 등 타겟 클래스 불균형 문제를 해결하기 위한 리샘플링 기법 비교.",
    memoryTip: "💡 1초 암기: 언더(다수 줄임/정보손실) vs 오버(소수 늘림/과적합) | SMOTE(소수 사이 KNN 보간 생성)",
    corePoints: [
      "언더샘플링(Under-sampling): 다수 클래스 데이터를 무작위/규칙적으로 삭제 ➔ 장점: 학습 속도 빠름 / 단점: 유의미한 정보 손실 발생",
      "오버샘플링(Over-sampling): 소수 클래스 데이터를 복제/증폭 ➔ 장점: 정보 손실 없음 / 단점: 과적합(Overfitting) 위험",
      "SMOTE(Synthetic Minority Over-sampling Technique): 소수 클래스 데이터와 그 주변 K개의 이웃(KNN) 사이에 가상의 보간 데이터를 합성 생성 🔥 최다출제",
      "기타 기법: ADASYN(학습하기 어려운 경계면 데이터 집중 생성), Tomek Link(경계면 노이즈 제거)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>언더샘플링 (Under)</th><th>단순 오버샘플링</th><th>SMOTE</th></tr></thead>
        <tbody>
          <tr><td><strong>작동 원리</strong></td><td>다수 클래스 샘플 삭제</td><td>소수 클래스 단순 무작위 복제</td><td>소수 클래스 간 벡터 보간 합성</td></tr>
          <tr><td><strong>주요 장점</strong></td><td>데이터량 축소로 연산 속도 빠름</td><td>정보 손실 없음</td><td>단순 복제 대비 과적합 대폭 완화</td></tr>
          <tr><td><strong>주요 단점</strong></td><td>중요 데이터 손실 위험</td><td>동일 데이터 반복으로 과적합 유발</td><td>노이즈 생성 가능성, 고차원 성능 저하</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'SMOTE는 다수 클래스 데이터를 제거하여 비율을 맞춘다' ➔ 땡(❌)! SMOTE는 '소수 클래스'를 가상으로 합성하는 오버샘플링입니다.",
    quizKeyword: "SMOTE",
    cardId: "c2-14"
  },
  {
    id: "mk-2-4",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "차원 축소",
    importance: "A+",
    title: "차원 축소 비교 (PCA vs LDA)",
    summary: "비지도학습 기반 주성분분석(PCA)과 지도학습 기반 선형판별분석(LDA)의 핵심 메커니즘 1:1 비교.",
    memoryTip: "💡 1초 암기: PCA = 【비지도 + 전체 분산 최대화 + 직교】 | LDA = 【지도 + 클래스 간 분산 최대 & 내 분산 최소】",
    corePoints: [
      "PCA (Principal Component Analysis):",
      " - 비지도학습 (타겟 라벨 Y 미사용)",
      " - 데이터의 전체 분산(Variance)이 가장 큰 축(고유벡터)을 새로운 주성분(PC)으로 선택",
      " - 모든 주성분들은 서로 직교(Orthogonal, 상관계수 0)하여 다중공선성 문제 해결",
      "LDA (Linear Discriminant Analysis):",
      " - 지도학습 (타겟 라벨 Y 사용)",
      " - 클래스 간 분산(Between-class)은 최대화하고, 클래스 내 분산(Within-class)은 최소화하는 결정 경계 축 추출"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>PCA (주성분 분석)</th><th>LDA (선형 판별 분석)</th></tr></thead>
        <tbody>
          <tr><td><strong>학습 유형</strong></td><td>비지도 학습 (Unsupervised)</td><td>지도 학습 (Supervised)</td></tr>
          <tr><td><strong>목적 함수</strong></td><td>데이터 전체의 분산(정보량) 최대화</td><td>클래스 간 분리도(차이) 최대화</td></tr>
          <tr><td><strong>축의 관계</strong></td><td>주성분 간 서로 완전 직교(독립)</td><td>축 간 직교하지 않을 수 있음</td></tr>
          <tr><td><strong>주요 목적</strong></td><td>차원 축소, 노이즈 제거, 다중공선성 해소</td><td>분류(Classification)를 위한 특징 추출</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'PCA는 타겟 라벨(Y)의 분류 성능을 최대화하도록 축을 찾는다' ➔ 땡(❌)! 이는 LDA 설명입니다. PCA는 Y 라벨을 보지 않습니다.",
    quizKeyword: "주성분",
    cardId: "c2-12"
  },
  {
    id: "mk-2-5",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "확률분포",
    importance: "A",
    title: "확률분포 총정리 (이산확률분포 vs 연속확률분포)",
    summary: "빅분기 필기 빈출 확률분포의 정의와 실생활 모델링 사례 완벽 정리.",
    memoryTip: "💡 1초 암기: 이산(베르누이/이항/포아송/기하) | 연속(정규/t/F/카이제곱)",
    corePoints: [
      "이산 확률분포:",
      " - 베르누이 분포: 결과가 성공/실패 2가지만 나오는 1회 시행",
      " - 이항 분포: 성공확률 p인 베르누이 시행을 독립적으로 n번 반복",
      " - 포아송 분포: 일정한 시간이나 공간에서 드물게 발생하는 사건의 발생 횟수 (예: 1시간 동안 콜센터 인입 콜 수)",
      " - 기하 분포: 성공확률 p일 때, '처음으로 성공할 때까지' 시도한 실패 횟수(또는 총 횟수)",
      "연속 확률분포:",
      " - 정규분포: 평균 $\\mu$, 분산 $\\sigma^2$을 갖는 대칭 종모양 분포 ($N(\\mu, \\sigma^2)$)",
      " - 표준정규분포: 평균 0, 분산 1로 표준화한 $Z$분포 ($Z = (X-\\mu)/\\sigma$)",
      " - t-분포: 모분산을 모를 때, 표본 크기 $n < 30$인 소표본 평균 검정에 사용 (자유도가 커지면 정규분포에 수렴)",
      " - F-분포: 두 독립적인 정규분포 모집단의 분산의 비율을 비교 (ANOVA 분산분석에 사용)",
      " - 카이제곱($\\chi^2$) 분포: 표준정규분포를 따르는 변수들의 제곱합 (적합도, 독립성, 동질성 검정에 사용)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>분포</th><th>유형</th><th>주요 활용처 / 핵심 특징</th></tr></thead>
        <tbody>
          <tr><td><strong>포아송 분포</strong></td><td>이산</td><td>단위 시간/면적당 사건 발생 건수 (평균 = 분산 = $\\lambda$)</td></tr>
          <tr><td><strong>t-분포</strong></td><td>연속</td><td>모분산 모를 때 모평균 추정 / 꼬리가 정규분포보다 두꺼움</td></tr>
          <tr><td><strong>F-분포</strong></td><td>연속</td><td>두 분산의 비 / 회귀모형 유의성 및 ANOVA 검정 ($F = MSR/MSE$)</td></tr>
          <tr><td><strong>카이제곱 분포</strong></td><td>연속</td><td>교차표 독립성 검정 / 항상 양의 값($\\ge 0$), 우측 꼬리 분포</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '포아송 분포는 평균과 분산이 다르다' ➔ 땡(❌)! 포아송 분포는 평균과 분산이 모두 $\\lambda$로 같습니다.",
    quizKeyword: "포아송",
    cardId: "c2-21"
  },
  {
    id: "mk-2-6",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "가설검정 & 오류",
    importance: "A+",
    title: "1종 오류(α) vs 2종 오류(β) & 가설검정 의사결정",
    summary: "귀무가설/대립가설 설정과 1종·2종 오류, 검정력(Power), p-value 판정 기준 완벽 마스터.",
    memoryTip: "💡 1초 암기: 1종 오류(참인데 기각/위양성/α) | 2종 오류(거짓인데 채택/위음성/β) | 검정력 = 1 - β | p-value ≤ α ➔ 기각!",
    corePoints: [
      "귀무가설 ($H_0$): '차이가 없다', '효과가 없다' (보수적 입장, 기각하고자 하는 기본 가설)",
      "대립가설 ($H_1$): '차이가 있다', '효과가 있다' (연구자가 새롭게 입증하려는 주장)",
      "1종 오류 (Type I Error, $\\alpha$): 귀무가설이 실제로 참인데, 잘못 기각하고 대립가설을 채택한 오류 (유의수준)",
      "2종 오류 (Type II Error, $\\beta$): 귀무가설이 실제로 거짓인데, 기각하지 못하고 채택해버린 오류",
      "검정력 (Power of Test): $1 - \\beta$ (거짓인 귀무가설을 올바르게 기각할 확률)",
      "유의확률 (p-value): 귀무가설이 맞다고 가정할 때, 관측된 통계량 이상의 극단적 결과가 나올 확률",
      "판정 룰: **$p\\text{-value} \\le \\alpha$이면 귀무가설 기각($H_1$ 채택, 통계적으로 유의미)**"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>실제 상태 \\ 통계적 판정</th><th>귀무가설 채택 ($H_0$ 수용)</th><th>귀무가설 기각 ($H_1$ 채택)</th></tr></thead>
        <tbody>
          <tr><td><strong>귀무가설($H_0$)이 참(True)</strong></td><td>올바른 결정 (신뢰수준 $1-\\alpha$)</td><td><strong style="color:var(--danger);">1종 오류 ($\\alpha$) [유의수준]</strong></td></tr>
          <tr><td><strong>귀무가설($H_0$)이 거짓(False)</strong></td><td><strong style="color:var(--warning);">2종 오류 ($\\beta$)</strong></td><td>올바른 결정 (검정력 $1-\\beta$)</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '$p\\text{-value} > \\alpha$일 때 귀무가설을 기각한다' ➔ 땡(❌)! p값이 유의수준보다 **작거나 같을 때($p \\le \\alpha$)** 귀무가설을 기각합니다.",
    quizKeyword: "1종 오류",
    cardId: "c2-22"
  },
  {
    id: "mk-2-7",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "통계기법 이해",
    importance: "A+",
    title: "모수 검정 vs 비모수 검정 1:1 매칭 족보 🔥 [12회 기출 집중]",
    summary: "정규성 가정을 만족하는 모수 검정과 만족하지 못할 때 사용하는 비모수(순위) 검정의 1:1 완벽 대응표.",
    memoryTip: "💡 1초 암기: 2표본t ↔ 맨-휘트니U(순위합) | 대응표본t ↔ 윌콕슨 부호순위 | ANOVA ↔ 크루스칼-왈리스 | 피어슨 ↔ 스피어만",
    corePoints: [
      "모수 검정 (Parametric): 모집단이 정규분포를 따른다는 가정 하에 평균, 분산 등의 모수를 검정 (연속형 데이터)",
      "비모수 검정 (Non-parametric): 모집단 정규성 가정을 만족하지 않거나, 서열척도(순위) 또는 표본 수가 매우 적을 때 사용 (데이터 순위/부호 기반 검정)",
      "1) 독립 2표본 t-검정 ➔ **맨-휘트니 U 검정 (Mann-Whitney U Test / 윌콕슨 순위합)**",
      "2) 대응표본 t-검정 (Pair t-test) ➔ **윌콕슨 부호순위 검정 (Wilcoxon Signed-Rank Test)**",
      "3) 일원배치 분산분석 (One-way ANOVA) ➔ **크루스칼-왈리스 검정 (Kruskal-Wallis Test)**",
      "4) 이원배치 분산분석 (Two-way ANOVA) ➔ **프리드만 검정 (Friedman Test)**",
      "5) 피어슨 상관계수 (선형관계) ➔ **스피어만 / 켄달 순위상관계수**"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>분석 목적</th><th>모수 검정 (정규성 만족 O)</th><th>비모수 검정 (정규성 불만족 X)</th></tr></thead>
        <tbody>
          <tr><td><strong>독립된 두 집단 평균 비교</strong></td><td>독립표본 t-검정 (Two-sample t)</td><td><strong>맨-휘트니 U 검정 (순위합 검정)</strong></td></tr>
          <tr><td><strong>동일 집단 전/후 비교</strong></td><td>대응표본 t-검정 (Paired t)</td><td><strong>윌콕슨 부호순위 검정</strong></td></tr>
          <tr><td><strong>세 집단 이상 평균 비교</strong></td><td>분산분석 (ANOVA)</td><td><strong>크루스칼-왈리스 (Kruskal-Wallis)</strong></td></tr>
          <tr><td><strong>두 변수 간 상관관계</strong></td><td>피어슨 상관계수 (Pearson r)</td><td><strong>스피어만 / 켄달 순위상관계수</strong></td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '독립된 두 집단의 비모수 검정은 윌콕슨 부호순위 검정이다' ➔ 땡(❌)! 독립 두 집단은 [맨-휘트니 U 검정], 대응(전/후) 표본이 [부호순위 검정]입니다.",
    quizKeyword: "비모수",
    cardId: "c2-22"
  },
  {
    id: "mk-2-8",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "변수 변환 및 스케일링",
    importance: "A",
    title: "데이터 변수 변환 & 스케일링 기법 (Min-Max vs Z-Score vs Box-Cox)",
    summary: "특징 스케일링(정규화/표준화) 공식과 왜도(Skewness) 해소를 위한 로그/Box-Cox 변환 비교.",
    memoryTip: "💡 1초 암기: Min-Max = (X-min)/(max-min) [0~1] | Z-Score = (X-μ)/σ [평균0, 분산1] | 우측 꼬리 ➔ 로그/루트 변환",
    corePoints: [
      "Min-Max 스케일링 (정규화): $X_{new} = \\frac{X - X_{min}}{X_{max} - X_{min}}$ (결과 범위: $0 \\sim 1$, 이상치에 매우 취약)",
      "Z-Score 스케일링 (표준화): $Z = \\frac{X - \\mu}{\\sigma}$ (평균 0, 표준편차 1로 변환, 이상치 영향이 Min-Max보다 적음)",
      "원-핫 인코딩(One-Hot Encoding): N개의 고유 범주를 N개의 이진(0/1) 가변수로 변환 (단점: 고유 범주가 많으면 차원의 저주 유발)",
      "왜도 변환: 우측으로 긴 꼬리(왜도 > 0, 예: 소득, 집값) ➔ 로그 변환($\\ln X$), 제곱근 변환($\\sqrt{X}$) 적용하여 정규분포화"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>변환 기법</th><th>변환 공식 / 원리</th><th>장점 및 특징</th></tr></thead>
        <tbody>
          <tr><td><strong>Min-Max 정규화</strong></td><td>$\\frac{X - X_{min}}{X_{max} - X_{min}}$</td><td>모든 피처를 0~1 동일 스케일로 압축</td></tr>
          <tr><td><strong>Z-Score 표준화</strong></td><td>$\\frac{X - \\text{평균}}{\\text{표준편차}}$</td><td>데이터의 분포를 평균 0, 표준편차 1로 변환</td></tr>
          <tr><td><strong>로그 변환 (Log)</strong></td><td>$Y = \\ln(X)$</td><td>우측 꼬리가 긴(양의 왜도) 분포를 대칭 정규분포화</td></tr>
          <tr><td><strong>Box-Cox 변환</strong></td><td>파라미터 $\\lambda$에 따른 거듭제곱 변환</td><td>양수 데이터에 대해 최적의 정규분포 변환 탐색</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'Min-Max 스케일링은 이상치(Outlier)에 강건하다' ➔ 땡(❌)! $X_{max}$나 $X_{min}$이 극단값이면 전체 데이터가 좁은 영역에 뭉개지므로 이상치에 매우 취약합니다.",
    quizKeyword: "스케일링",
    cardId: "c2-13"
  },
  {
    id: "mk-2-9",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "상관관계 분석",
    importance: "A",
    title: "상관계수 3종 비교 (피어슨 vs 스피어만 vs 켄달)",
    summary: "연속형/서열형 변수 간 관계를 나타내는 상관계수 유형과 해석 기준.",
    memoryTip: "💡 1초 암기: 피어슨(연속형/선형) vs 스피어만(서열/단조증가) vs 켄달(일치/불일치 쌍 비율)",
    corePoints: [
      "피어슨 상관계수 ($r$):",
      " - 두 연속형 변수 간의 **선형적(Linear) 관계**의 강도를 측정",
      " - 범위: $-1 \\le r \\le 1$ (1: 완벽한 양의 선형, -1: 완벽한 음의 선형, 0: 선형 관계 없음)",
      " - 정규성 가정을 필요로 하며, 이상치에 민감",
      "스피어만 상관계수 ($\\rho$):",
      " - 두 변수의 **순위(Rank) 값**을 이용한 비모수적 상관계수",
      " - 선형이 아니더라도 **단조 증가(Monotonic Increase) 또는 단조 감소 관계**를 완벽하게 포착 (이상치에 강건)",
      "켄달의 타우 ($\\tau$):",
      " - 두 변수 순위 쌍의 **일치쌍(Concordant)과 불일치쌍(Discordant)** 비율로 계산 (소표본에 적합)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>피어슨 (Pearson)</th><th>스피어만 (Spearman)</th><th>켄달 (Kendall)</th></tr></thead>
        <tbody>
          <tr><td><strong>데이터 척도</strong></td><td>연속형 척도 (등간/비율)</td><td>서열 척도 (순위) 또는 연속형</td><td>서열 척도 (순위)</td></tr>
          <tr><td><strong>관계 형태</strong></td><td>직선 선형 관계 (Linear)</td><td>비선형 단조 관계 (Monotonic)</td><td>순위 일치성 관계</td></tr>
          <tr><td><strong>모수/비모수</strong></td><td>모수 검정 (정규성 필요)</td><td>비모수 검정 (정규성 불필요)</td><td>비모수 검정</td></tr>
          <tr><td><strong>이상치 영향</strong></td><td>이상치에 매우 취약함</td><td>이상치에 강건함 (순위 사용)</td><td>이상치에 강건함</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '피어슨 상관계수가 0이면 두 변수 사이에는 아무런 관계가 없다' ➔ 땡(❌)! '선형 관계가 없다'는 뜻일 뿐, 2차 함수($Y = X^2$) 같은 비선형 관계가 존재할 수 있습니다.",
    quizKeyword: "상관계수",
    cardId: "c2-16"
  },

  // =========================================================================
  // [3과목] 빅데이터 모델링 (10대 핵심 족보)
  // =========================================================================
  {
    id: "mk-3-1",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "회귀분석",
    importance: "A+",
    title: "선형 회귀분석 5대 기본 가정 & 잔차 진단 (선-독-등-정-비)",
    summary: "회귀분석이 성립하기 위한 5대 오차항/잔차 가정과 위배 시 진단 방법.",
    memoryTip: "💡 1초 암기: 【선-독-등-정-비】 (선형성, 독립성, 등분산성, 정규성, 비다중공선성)",
    corePoints: [
      "1) 선형성 (Linearity): 종속변수와 독립변수 간의 관계가 선형적이어야 함 (산점도 확인)",
      "2) 독립성 (Independence): 오차항 간에 자기상관(Autocorrelation)이 없어야 함 ➔ **더빈-왓슨(Durbin-Watson) 통계량이 2에 가까워야 함**",
      "3) 등분산성 (Homoscedasticity): 오차항의 분산이 모든 X값에 대해 일정해야 함 (잔차도 산점도가 무작위 띠 형태)",
      "4) 정규성 (Normality): 오차항의 분포가 평균 0인 정규분포를 따라야 함 ➔ **Q-Q Plot이 45도 대각선 직선상에 위치**, 샤피로-윌크 검정",
      "5) 비다중공선성: 독립변수들 간에 강한 상관관계가 없어야 함"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>기본 가정</th><th>진단 도구 및 검정법</th><th>이상적인 기준</th></tr></thead>
        <tbody>
          <tr><td><strong>선형성</strong></td><td>잔차 산점도 (Residual Plot)</td><td>0을 중심으로 잔차가 무작위 분산</td></tr>
          <tr><td><strong>독립성</strong></td><td>더빈-왓슨 (Durbin-Watson) 통계량</td><td>$d \\approx 2$ (0에 가까우면 양의 상관, 4에 가까우면 음의 상관)</td></tr>
          <tr><td><strong>등분산성</strong></td><td>잔차 vs 예측값 산점도</td><td>나팔꽃/깔때기 모양이 아닌 일정한 대역폭</td></tr>
          <tr><td><strong>정규성</strong></td><td>Q-Q Plot, Shapiro-Wilk 검정</td><td>Q-Q Plot에서 점들이 대각선 직선과 일치, p > 0.05</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '더빈-왓슨 통계량이 0에 가까우면 오차항 간에 독립성이 만족된다' ➔ 땡(❌)! $d \\approx 2$일 때 독립이며, 0이면 양의 자기상관입니다.",
    quizKeyword: "더빈-왓슨",
    cardId: "c3-1"
  },
  {
    id: "mk-3-2",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "회귀분석 & 규제",
    importance: "A+",
    title: "다중공선성(VIF)과 정규화 규제 (L1 라쏘 vs L2 릿지 vs 엘라스틱넷)",
    summary: "독립변수 간 강한 상관관계(다중공선성) 진단 기준과 과적합 방지 규제 기법 3종 비교.",
    memoryTip: "💡 1초 암기: VIF ≥ 10 ➔ 다중공선성 심각 | L1(라쏘/절대값/0만듦/변수선택) vs L2(릿지/제곱/0근접축소/강건)",
    corePoints: [
      "다중공선성(Multicollinearity): 독립변수 간 높은 선형 상관관계로 인해 회귀계수의 분산이 커져 모델이 불안정해지는 현상",
      "분산팽창지수 (VIF, Variance Inflation Factor): $VIF = \\frac{1}{1 - R_i^2}$ ➔ **$VIF \\ge 10$ 이상이면 다중공선성 문제 심각**",
      "L1 규제 (라쏘, Lasso): 가중치 절대값의 합($\\sum |w_i|$)에 페널티 부여 ➔ **중요하지 않은 변수의 회귀계수를 정확히 0으로 만들어 자동 변수 선택(Feature Selection) 수행**",
      "L2 규제 (릿지, Ridge): 가중치 제곱합($\\sum w_i^2$)에 페널티 부여 ➔ **회귀계수의 크기를 0에 가깝게 축소(Shrinkage)하지만 0으로 만들지는 않음** (다중공선성에 강건)",
      "엘라스틱넷 (ElasticNet): L1 규제와 L2 규제를 선형 결합한 형태 (상관관계가 높은 다수 변수 처리에 유리)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>라쏘 회귀 (Lasso / L1)</th><th>릿지 회귀 (Ridge / L2)</th><th>엘라스틱넷 (ElasticNet)</th></tr></thead>
        <tbody>
          <tr><td><strong>규제 항</strong></td><td>$L1 = \\lambda \\sum |w_j|$ (가중치 절대값)</td><td>$L2 = \\lambda \\sum w_j^2$ (가중치 제곱합)</td><td>$\\alpha L1 + (1-\\alpha) L2$</td></tr>
          <tr><td><strong>계수=0 가능여부</strong></td><td><strong style="color:var(--danger);">가능 (계수를 0으로 만듦)</strong></td><td>불가능 (0에 가깝게 축소만 됨)</td><td>가능</td></tr>
          <tr><td><strong>주요 특징</strong></td><td>자동 변수 선택 (희소 모델 생성)</td><td>변수 간 상관성 높을 때 우수</td><td>L1과 L2의 장점 결합</td></tr>
          <tr><td><strong>제약 조건 기하학</strong></td><td>마름모 꼴 (각진 모서리에서 접함)</td><td>원(구) 형태 (축과 접하지 않음)</td><td>모서리가 둥근 마름모</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '릿지(Ridge) 회귀는 불필요한 변수의 회귀계수를 0으로 만들어 제거한다' ➔ 땡(❌)! 계수를 0으로 만드는 것은 라쏘(Lasso)입니다.",
    quizKeyword: "라쏘",
    cardId: "c3-991"
  },
  {
    id: "mk-3-3",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "로지스틱 회귀",
    importance: "A+",
    title: "로지스틱 회귀분석 (Odds, Logit, Sigmoid)",
    summary: "종속변수가 범주형(이진 0/1)일 때 사용하는 로지스틱 회귀의 수학적 변환 3단계.",
    memoryTip: "💡 1초 암기: 승산(Odds = p/(1-p)) ➔ 로짓(ln(Odds)) ➔ 시그모이드(1/(1+e^-z)) [출력 0~1 확률값]",
    corePoints: [
      "승산 (Odds, 오즈): 성공 확률($p$)과 실패 확률($1-p$)의 비율 ➔ $\\text{Odds} = \\frac{p}{1-p}$ ($0 \\le \\text{Odds} < \\infty$)",
      "오즈비 (Odds Ratio): 독립변수 $X$가 1단위 증가할 때 성공 승산이 몇 배 증가하는지 나타냄 ($e^{\\beta_1}$)",
      "로짓 변환 (Logit): 승산(Odds)에 자연로그를 취한 것 ➔ $\\ln\\left(\\frac{p}{1-p}\\right) = \\beta_0 + \\beta_1 X$ (범위: $-\\infty \\sim +\\infty$)",
      "시그모이드 함수 (Sigmoid): 로짓 식을 $p$에 대해 정리한 역함수 ➔ $p = \\frac{1}{1 + e^{-z}}$ (출력 범위: $0 \\sim 1$ 사이의 확률값)",
      "모형 적합도 검정: 회귀분석의 F-검정 대신 **우도비 검정(Likelihood Ratio Test)과 왈드(Wald) 검정** 사용"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>단계</th><th>변환 공식</th><th>값의 범위</th><th>역할 및 의미</th></tr></thead>
        <tbody>
          <tr><td><strong>1. 승산 (Odds)</strong></td><td>$\\frac{p}{1-p}$</td><td>$[0, +\\infty)$</td><td>실패 대비 성공의 상대적 비율</td></tr>
          <tr><td><strong>2. 로짓 (Logit)</strong></td><td>$\\ln\\left(\\frac{p}{1-p}\\right)$</td><td>$(-\\infty, +\\infty)$</td><td>선형회귀 결합($\\beta^T X$) 가능하게 변환</td></tr>
          <tr><td><strong>3. 시그모이드</strong></td><td>$\\frac{1}{1 + e^{-z}}$</td><td>$(0, 1)$</td><td>최종 출력을 0~1 사이의 분류 확률로 환원</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '로지스틱 회귀분석의 회귀계수 유의성 검정에는 F-검정을 사용한다' ➔ 땡(❌)! 로지스틱 회귀는 최대우도추정법(MLE)을 사용하므로 왈드(Wald) 검정을 사용합니다.",
    quizKeyword: "로지스틱",
    cardId: "c3-3"
  },
  {
    id: "mk-3-4",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "의사결정나무",
    importance: "A+",
    title: "의사결정나무 불순도 분할 기준 (지니, 엔트로피, 카이제곱)",
    summary: "알고리즘별(CART, C4.5, CHAID) 노드 분할 불순도(Impurity) 측정 지표 완벽 매칭.",
    memoryTip: "💡 1초 암기: CART(지니지수/분산감소) | C4.5(엔트로피/정보이득비율) | CHAID(카이제곱 통계량)",
    corePoints: [
      "불순도(Impurity) 개념: 노드 내에 서로 다른 클래스가 얼마나 섞여 있는지를 측정 (순수할수록 불순도 = 0)",
      "지니 지수 (Gini Index): $Gini = 1 - \\sum p_i^2$ (CART 알고리즘의 범주형 분할 기준, 지니지수가 작아지는 방향으로 분할)",
      "엔트로피 (Entropy): $Entropy = - \\sum p_i \\log_2 p_i$ (C4.5 / ID3 알고리즘의 분할 기준)",
      "정보 이득 비율 (Information Gain Ratio): 엔트로피를 정규화하여 다수 범주를 가진 변수로의 편향 분할 방지 (C4.5)",
      "카이제곱 통계량 (p-value): CHAID 알고리즘의 범주형 분할 기준 (p값이 가장 작은 변수 선택)",
      "연속형 타겟 변수: CART는 **분산 감소량(Variance Reduction)**, CHAID는 **ANOVA F-검정 통계량** 사용"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>알고리즘</th><th>범주형 타겟 (분류) 분할 기준</th><th>연속형 타겟 (회귀) 분할 기준</th><th>특징</th></tr></thead>
        <tbody>
          <tr><td><strong>CART</strong></td><td><strong>지니 지수 (Gini Index)</strong></td><td>분산 감소량 (Variance Reduction)</td><td>이진 분할(Binary Split)만 수행</td></tr>
          <tr><td><strong>C4.5 / C5.0</strong></td><td><strong>엔트로피 / 정보 이득 비율</strong></td><td>-</td><td>다지 분할 가능, 연속형 변수 지원</td></tr>
          <tr><td><strong>CHAID</strong></td><td><strong>카이제곱 통계량 (p-value)</strong></td><td>ANOVA F-통계량</td><td>다지 분할, 가지치기 안 함</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'CART 알고리즘은 정보 이득 비율(Information Gain Ratio)을 분할 기준으로 사용한다' ➔ 땡(❌)! CART는 [지니 지수]를 사용합니다.",
    quizKeyword: "지니 지수",
    cardId: "c3-4"
  },
  {
    id: "mk-3-5",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "앙상블 기법",
    importance: "A+",
    title: "앙상블 3대 기법 (배깅 vs 부스팅 vs 스태킹)",
    summary: "모델 결합 방식(병렬 vs 순차)과 오차 감소 목표(분산 감소 vs 편향 감소) 완벽 비교.",
    memoryTip: "💡 1초 암기: 배깅 = 【복원추출 + 병렬학습 + 분산감소(랜덤포레스트)】 | 부스팅 = 【가중치 + 순차학습 + 편향감소(XGBoost)】",
    corePoints: [
      "1) 배깅 (Bagging, Bootstrap Aggregating):",
      " - 부트스트랩(복원추출)으로 여러 훈련 데이터셋 생성",
      " - 각 데이터셋마다 개별 모델을 **독립적·병렬적(Parallel)**으로 학습",
      " - 분류는 다수결 투표(Voting), 회귀는 평균으로 결합 ➔ **모델의 분산(Variance) 감소 (과적합 완화)**",
      " - 대표 모델: **랜덤 포레스트 (Random Forest)**",
      "2) 부스팅 (Boosting):",
      " - 이전 트리가 틀린(오분류된) 데이터나 잔차(Residual)에 가중치를 부여",
      " - 여러 모델을 **순차적(Sequential)**으로 연결 학습 ➔ **모델의 편향(Bias) 감소 (정확도 극대화)**",
      " - 대표 모델: AdaBoost, GBM, **XGBoost, LightGBM, CatBoost**",
      "3) 스태킹 (Stacking): 여러 다른 기본 모델(Base Model)의 예측값을 새로운 메타 모델(Meta Model)의 입력 데이터로 학습시켜 최종 예측"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>배깅 (Bagging)</th><th>부스팅 (Boosting)</th><th>스태킹 (Stacking)</th></tr></thead>
        <tbody>
          <tr><td><strong>학습 방식</strong></td><td>병렬적 (Parallel) 독립 학습</td><td>순차적 (Sequential) 가중치 학습</td><td>다양한 모델 예측값 스태킹</td></tr>
          <tr><td><strong>오차 개선</strong></td><td><strong>분산(Variance) 감소</strong> (과적합 방지)</td><td><strong>편향(Bias) 감소</strong> (성능 극대화)</td><td>예측 성능 결합 극대화</td></tr>
          <tr><td><strong>이상치 민감도</strong></td><td>이상치에 비교적 강건함</td><td>이상치/노이즈에 취약 (가중치 누적)</td><td>기본 모델 구성에 의존</td></tr>
          <tr><td><strong>대표 모델</strong></td><td>랜덤 포레스트 (Random Forest)</td><td>GBM, XGBoost, LightGBM</td><td>Meta-Learner 모델</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '배깅은 이전 모델의 오차를 보정하기 위해 순차적으로 학습한다' ➔ 땡(❌)! 순차적 오차 보정은 부스팅(Boosting)의 특징입니다.",
    quizKeyword: "부스팅",
    cardId: "c3-17"
  },
  {
    id: "mk-3-6",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "서포트 벡터 머신",
    importance: "A",
    title: "서포트 벡터 머신 (SVM) & 마진과 커널 트릭",
    summary: "초평면(Hyperplane)과 마진(Margin) 최대화, 슬랙 변수, 비선형 해결 커널 트릭 핵심.",
    memoryTip: "💡 1초 암기: SVM = 마진 최대화 | C값 커지면(하드마진/과적합 위험) | 커널트릭 = 저차원 ➔ 고차원 매핑",
    corePoints: [
      "초평면 (Hyperplane): 두 클래스를 나누는 결정 경계면 ($w^T x + b = 0$)",
      "서포트 벡터 (Support Vector): 결정 초평면과 가장 가까이 위치한 데이터 포인트들 (초평면 위치를 결정)",
      "마진 (Margin): 초평면과 서포트 벡터 사이의 수직 거리 ➔ **마진 $\\frac{2}{\\|w\\|}$을 최대화**하는 것이 목표",
      "하드 마진 vs 소프트 마진 (파라미터 C):",
      " - C(오분류 페널티)가 매우 큼 ➔ 오분류 불허(하드 마진) ➔ 마진 좁아짐 ➔ 과적합(Overfitting) 위험",
      " - C가 작음 ➔ 이상치 오분류 허용(소프트 마진) ➔ 마진 넓어짐 ➔ 일반화 성능 향상",
      "커널 트릭 (Kernel Trick): 저차원 공간에서 선형 분리가 불가능한 데이터를 고차원 특징 공간으로 매핑하여 선형 분리 가능하게 만드는 기법 (대표 커널: **RBF/가우시안, 다항식, 시그모이드**)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>파라미터</th><th>값이 클 때 (High)</th><th>값이 작을 때 (Low)</th></tr></thead>
        <tbody>
          <tr><td><strong>C (규제/오차 페널티)</strong></td><td>하드 마진 / 오차 불허 / 마진 좁음 / 과적합 위험</td><td>소프트 마진 / 오차 허용 / 마진 넓음 / 과소적합 위험</td></tr>
          <tr><td><strong>$\gamma$ (Gamma / RBF 폭)</strong></td><td>개별 데이터 영향력 큼 / 결정경계 복잡 / 과적합</td><td>데이터 영향력 넓음 / 결정경계 완만 / 단순 모형</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'SVM은 마진을 최소화하는 방향으로 학습한다' ➔ 땡(❌)! 마진을 [최대화(Maximize)]하는 것이 기본 원리입니다.",
    quizKeyword: "SVM",
    cardId: "c3-7"
  },
  {
    id: "mk-3-7",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "연관성 분석",
    importance: "A+",
    title: "연관성 분석(장바구니 분석) 3대 평가지표 (지지도, 신뢰도, 향상도)",
    summary: "아이템 A와 B의 동시 구매 패턴을 분석하는 3대 지표의 수식 계산과 향상도 해석 기준.",
    memoryTip: "💡 1초 암기: 지지도 = P(A∩B) | 신뢰도 = P(A∩B)/P(A) | 향상도 = 신뢰도/P(B) (1보다 크면 양의 상관!)",
    corePoints: [
      "1) 지지도 (Support): 전체 거래 중 품목 A와 B가 동시에 포함된 거래의 비율 ➔ $Support(A \\rightarrow B) = P(A \\cap B) = \\frac{n(A \\cap B)}{N}$",
      "2) 신뢰도 (Confidence): 품목 A를 포함한 거래 중 품목 B도 함께 포함된 거래의 비율 ➔ $Confidence(A \\rightarrow B) = P(B|A) = \\frac{P(A \\cap B)}{P(A)} = \\frac{n(A \\cap B)}{n(A)}$",
      "3) 향상도 (Lift): A를 구매했을 때 B를 함께 구매할 확률이 B를 단독으로 구매할 확률 대비 몇 배 증가하는가 ➔ $Lift(A \\rightarrow B) = \\frac{P(A \\cap B)}{P(A)P(B)} = \\frac{Confidence(A \\rightarrow B)}{P(B)}$",
      "향상도 해석 기준:",
      " - **$Lift > 1$**: A와 B는 양의 상관관계 (A를 사면 B를 살 확률이 현저히 높아짐 ➔ 유의미한 규칙)",
      " - **$Lift = 1$**: A와 B는 상호 독립 (아무런 연관성 없음)",
      " - **$Lift < 1$**: A와 B는 음의 상관관계 (A를 사면 오히려 B를 사지 않음)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>지표</th><th>계산 수식</th><th>의미</th></tr></thead>
        <tbody>
          <tr><td><strong>지지도 (Support)</strong></td><td>$\\frac{n(A \\cap B)}{\\text{전체 거래수 } N}$</td><td>규칙이 얼마나 자주 발생하는지 (빈발도)</td></tr>
          <tr><td><strong>신뢰도 (Confidence)</strong></td><td>$\\frac{n(A \\cap B)}{n(A)}$</td><td>A를 샀을 때 B도 살 조건부 확률 (정확도)</td></tr>
          <tr><td><strong>향상도 (Lift)</strong></td><td>$\\frac{\\text{신뢰도}(A \\rightarrow B)}{P(B)}$</td><td>우연히 구매한 것에 비해 몇 배나 구매력이 높은지</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '향상도가 1 미만이면 A와 B는 독립이다' ➔ 땡(❌)! 향상도가 **정확히 1일 때 독립**이며, 1 미만이면 음의 상관(역효과)입니다.",
    quizKeyword: "향상도",
    cardId: "c3-8"
  },
  {
    id: "mk-3-8",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "군집 분석",
    importance: "A",
    title: "군집 분석 (K-Means vs 계층적 군집 vs DBSCAN)",
    summary: "비지도학습 군집 알고리즘의 유형과 거리 측정 방법(유클리드, 맨하탄, 마할라노비스).",
    memoryTip: "💡 1초 암기: K-Means(군집수K지정/이상치취약) | DBSCAN(밀도기반/노이즈제거/비구형) | 거리(마할라노비스=공분산고려)",
    corePoints: [
      "K-평균 군집화 (K-Means):",
      " - 사전에 군집 수 $K$를 지정해야 함",
      " - 초기 중심점(Centroid) 설정에 민감하며, 이상치(Outlier)에 취약 (구형 군집에만 적합)",
      " - 최적 $K$ 탐색: 엘보우 메소드(Elbow Method - WCSS 급감 지점), 실루엣 계수",
      "계층적 군집화 (Hierarchical):",
      " - 응집형(Bottom-Up)과 분리형(Top-Down), 덴드로그램(Dendrogram)으로 시각화",
      " - 군집 간 거리 측정: 단일연결(최단), 완전연결(최장), 평균연결, 와드연결(Ward - 군집 내 오차제곱합 증분 최소화)",
      "DBSCAN (밀도 기반 군집화):",
      " - 밀도(Epsilon 반경 내 최소 점 개수 MinPts) 기반으로 군집 형성",
      " - **군집 수를 미리 지정할 필요 없음, 비구형 복잡한 형태 군집 가능, 이상치를 노이즈로 자동 분류**",
      "거리 척도: 유클리디안(직선거리), 맨하탄(격자거리), **마할라노비스(변수 간 상관성/공분산 행렬 고려)**"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>K-Means</th><th>DBSCAN</th><th>계층적 군집 (와드)</th></tr></thead>
        <tbody>
          <tr><td><strong>군집 수 K 사전 지정</strong></td><td><strong>필수 지정</strong></td><td>지정 불필요 (자동 결정)</td><td>지정 불필요 (덴드로그램 절단)</td></tr>
          <tr><td><strong>군집 형태</strong></td><td>구형 (Convex) 위주</td><td>임의의 복잡한 비구형 가능</td><td>다양한 형태</td></tr>
          <tr><td><strong>이상치 처리</strong></td><td>이상치에 취약 (중심 왜곡)</td><td>이상치를 노이즈로 자동 분리</td><td>단일연결 시 연쇄효과 발생</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'DBSCAN은 군집의 개수 K를 사전에 반드시 설정해야 한다' ➔ 땡(❌)! K를 지정할 필요가 없으며 반경(eps)과 최소 점수(MinPts)를 설정합니다.",
    quizKeyword: "DBSCAN",
    cardId: "c3-10"
  },
  {
    id: "mk-3-9",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "딥러닝 & 신경망",
    importance: "A+",
    title: "딥러닝 구조 비교 (CNN vs RNN vs LSTM vs Transformer) 🔥 [최신 트렌드]",
    summary: "이미지용 CNN, 시계열/자연어용 RNN/LSTM, 그리고 최신 AX 시대 핵심 트랜스포머의 어텐션 메커니즘.",
    memoryTip: "💡 1초 암기: CNN(합성곱+풀링/공간불변) ➔ RNN(순환/기울기소실) ➔ LSTM(망각·입력·출력 게이트) ➔ Transformer(Self-Attention)",
    corePoints: [
      "CNN (Convolutional Neural Network):",
      " - 합성곱(Convolution - 필터로 Feature Map 추출) + 풀링(Pooling - 다운샘플링/위치불변성) + FC Layer",
      " - 이미지, 격자형 2D 데이터 공간적 특성 추출에 탁월",
      "RNN (Recurrent Neural Network):",
      " - 은닉 상태(Hidden State)를 순환시켜 이전 시점의 정보 기억 ➔ 시계열, 자연어 처리",
      " - 시퀀스가 길어지면 **기울기 소실(Vanishing Gradient) / 장기 의존성(Long-term Dependency) 한계**",
      "LSTM (Long Short-Term Memory):",
      " - RNN 한계 극복을 위해 **셀 상태(Cell State)와 3개 게이트(망각 Forget, 입력 Input, 출력 Output)** 도입",
      " - GRU: LSTM을 경량화하여 2개 게이트(Reset, Update)로 구성",
      "Transformer (트랜스포머):",
      " - RNN의 순차 처리를 버리고 **셀프 어텐션(Self-Attention)**을 통해 문장 전체 단어 관계를 동시 병렬 처리",
      " - 어텐션 수식: $Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>모델</th><th>핵심 메커니즘</th><th>해결한 문제 / 장점</th><th>주요 응용 분야</th></tr></thead>
        <tbody>
          <tr><td><strong>CNN</strong></td><td>합성곱 필터 + 풀링 (Max Pooling)</td><td>파라미터 수 절감, 공간적 불변성</td><td>컴퓨터 비전, 이미지 분류/검출</td></tr>
          <tr><td><strong>RNN</strong></td><td>순환 은닉 상태 ($h_t = f(h_{t-1}, x_t)$)</td><td>가변 길이 시퀀스 처리</td><td>초기 시계열, 텍스트 생성</td></tr>
          <tr><td><strong>LSTM</strong></td><td>Cell State + Forget/Input/Output 게이트</td><td>장기 의존성 & 기울기 소실 해결</td><td>음성인식, 번역, 주가 예측</td></tr>
          <tr><td><strong>Transformer</strong></td><td>Multi-Head Self-Attention, Positional Encoding</td><td>완벽한 병렬 연산 및 대규모 학습</td><td>LLM, BERT, GPT, 비전 트랜스포머</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '트랜스포머는 RNN 구조를 기반으로 순차적으로 단어를 입력받는다' ➔ 땡(❌)! 트랜스포머는 RNN 순환 구조를 완전히 제거하고 셀프 어텐션으로 전체를 병렬 처리합니다.",
    quizKeyword: "Transformer",
    cardId: "c3-14"
  },
  {
    id: "mk-3-10",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "시계열 분석",
    importance: "A",
    title: "시계열 분석 (정상성 조건, ACF/PACF, ARIMA 모델)",
    summary: "시계열 데이터의 정상성(Stationarity) 3대 조건과 비정상 시계열을 정상화하는 차분(Differencing) 및 ARIMA 모델.",
    memoryTip: "💡 1초 암기: 정상성(평균일정, 분산일정, 공분산은 시차에만 의존) | ARIMA(p, d, q) = AR(p) + 차분(d) + MA(q)",
    corePoints: [
      "정상성 (Stationarity) 3대 조건:",
      " 1) 평균이 시간에 따라 일정하다. (평균이 일정하지 않으면 **차분(Differencing)** 적용)",
      " 2) 분산이 시간에 따라 일정하다. (분산이 일정하지 않으면 **로그 변환(Log)** 적용)",
      " 3) 두 시점 사이의 공분산(자기공분산)은 특정 시점이 아니라 오직 **시차(Lag, $k$)에만 의존**한다.",
      "시계열 분해 4대 요인: 추세 요인(T), 계절 요인(S), 순환 요인(C), 불규칙 요인(I)",
      "ARIMA(p, d, q) 모델 구성:",
      " - AR(p): 자기회귀 (현재 값이 이전 p개 시점의 자신의 값에 의존) ➔ PACF가 p시차 이후 절단",
      " - I(d): 차분 차수 (비정상 시계열을 정상 시계열로 만들기 위해 적용한 차분 횟수)",
      " - MA(q): 이동평균 (현재 값이 이전 q개 시점의 백색소음 오차항에 의존) ➔ ACF가 q시차 이후 절단"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>모델</th><th>자기상관함수 (ACF)</th><th>편자기상관함수 (PACF)</th></tr></thead>
        <tbody>
          <tr><td><strong>AR(p) 모델</strong></td><td>점진적 감소 (지수적 감소/소멸)</td><td><strong>$p$ 시차 이후 절단 (0으로 뚝 떨어짐)</strong></td></tr>
          <tr><td><strong>MA(q) 모델</strong></td><td><strong>$q$ 시차 이후 절단 (0으로 뚝 떨어짐)</strong></td><td>점진적 감소 (지수적 감소/소멸)</td></tr>
          <tr><td><strong>ARMA(p, q)</strong></td><td>$q$ 시차 이후 점진적 감소</td><td>$p$ 시차 이후 점진적 감소</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'AR(p) 모델은 ACF가 p 시차 이후 절단된다' ➔ 땡(❌)! AR(p)는 **PACF가 절단**되고, MA(q)가 **ACF가 절단**됩니다. 둘을 반드시 교차 암기하세요!",
    quizKeyword: "ARIMA",
    cardId: "c3-12"
  },

  // =========================================================================
  // [4과목] 빅데이터 결과해석 (8대 핵심 족보)
  // =========================================================================
  {
    id: "mk-4-1",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "혼동행렬 평가지표",
    importance: "A+",
    title: "혼동행렬(오차행렬) 6대 계산 공식 총정리 🔥 [시험 최다출제]",
    summary: "TP, FP, FN, TN을 바탕으로 정확도, 정밀도, 재현율, 특이도, FPR, F1-Score를 계산하는 문제는 매회 2~4문항 출제됩니다.",
    memoryTip: "💡 1초 암기: 정밀도(P) = TP/(TP+FP) [예측기준] | 재현율(R) = TP/(TP+FN) [실제기준] | F1 = 2PR / (P+R) [조화평균] | 특이도 = TN/(TN+FP)",
    corePoints: [
      "TP(True Positive): 실제 참을 참으로 올바르게 예측",
      "TN(True Negative): 실제 거짓을 거짓으로 올바르게 예측",
      "FP(False Positive, 1종 오류): 실제 거짓인데 참으로 잘못 예측",
      "FN(False Negative, 2종 오류): 실제 참인데 거짓으로 잘못 예측",
      "1) 정확도 (Accuracy): 전체 중 정답 맞춘 비율 ➔ $\\frac{TP + TN}{TP + TN + FP + FN}$ (불균형 데이터에서는 왜곡 발생)",
      "2) 정밀도 (Precision): **모델이 True로 예측한 것 중** 실제 True인 비율 ➔ $\\frac{TP}{TP + FP}$ (스팸 메일 필터링 등 FP 최소화에 중요)",
      "3) 재현율/민감도 (Recall / Sensitivity / TPR): **실제 True인 것 중** 모델이 맞춘 비율 ➔ $\\frac{TP}{TP + FN}$ (암 진단, 금융사기 등 FN 최소화에 중요)",
      "4) 특이도 (Specificity): 실제 False인 것 중 모델이 올바르게 False로 맞춘 비율 ➔ $\\frac{TN}{TN + FP}$",
      "5) 위양성률 (FPR, False Positive Rate): $1 - \\text{특이도} = \\frac{FP}{TN + FP}$",
      "6) F1-Score: 정밀도와 재현율의 **조화평균** ➔ $\\frac{2 \\times Precision \\times Recall}{Precision + Recall}$"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>지표명</th><th>계산 공식</th><th>분모 구성</th><th>중요한 적용 분야</th></tr></thead>
        <tbody>
          <tr><td><strong>정밀도 (Precision)</strong></td><td>$\\frac{TP}{TP + FP}$</td><td><strong>예측 Positive 합계</strong></td><td>스팸 메일 (정상 메일 삭제 방지)</td></tr>
          <tr><td><strong>재현율 (Recall / TPR)</strong></td><td>$\\frac{TP}{TP + FN}$</td><td><strong>실제 Positive 합계</strong></td><td>암 진단, 화재 감지 (놓치면 치명적)</td></tr>
          <tr><td><strong>특이도 (Specificity)</strong></td><td>$\\frac{TN}{TN + FP}$</td><td><strong>실제 Negative 합계</strong></td><td>정상 판정 비율</td></tr>
          <tr><td><strong>F1-Score</strong></td><td>$\\frac{2 \\times P \\times R}{P + R}$</td><td>정밀도와 재현율의 합</td><td>불균형 데이터셋 종합 평가</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'F1-Score는 정밀도와 재현율의 산술평균이다' ➔ 땡(❌)! 산술평균($\\frac{P+R}{2}$)이 아니라 **조화평균($\\frac{2PR}{P+R}$)**입니다.",
    quizKeyword: "혼동행렬",
    cardId: "c4-1"
  },
  {
    id: "mk-4-2",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "분류모형 평가",
    importance: "A+",
    title: "ROC 곡선(ROC Curve)과 AUC 면적 완벽 해석",
    summary: "분류 임계값 변화에 따른 TPR(재현율)과 FPR(1-특이도)의 궤적을 나타낸 ROC Curve와 면적(AUC).",
    memoryTip: "💡 1초 암기: X축 = FPR(위양성률, 1-특이도) | Y축 = TPR(민감도/재현율) | 좌상단(0,1)에 붙을수록 이상적 | 대각선 AUC=0.5",
    corePoints: [
      "X축: 위양성률 (FPR, False Positive Rate) $= 1 - \\text{특이도} = \\frac{FP}{TN + FP}$",
      "Y축: 진양성률 (TPR, True Positive Rate / 민감도 / 재현율) $= \\frac{TP}{TP + FN}$",
      "이상적인 완벽한 분류 모델: **좌상단 모서리 $(0, 1)$에 위치 ➔ $AUC = 1.0$** (FPR은 0이고 TPR은 1인 상태)",
      "무작위 추측 (동전 던지기 모델): 원점 $(0,0)$과 $(1,1)$을 잇는 대각선 ➔ $AUC = 0.5$",
      "AUC (Area Under Curve): ROC 곡선 아래의 면적으로 $0.5 \\sim 1.0$ 사이의 값을 가짐 (0.8 이상이면 우수, 0.9 이상이면 매우 우수)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>완벽한 분류기</th><th>일반 우수 분류기</th><th>무작위 분류기 (Random)</th></tr></thead>
        <tbody>
          <tr><td><strong>ROC 곡선 궤적</strong></td><td>좌상단 $(0, 1)$ 직행 꺾임</td><td>좌상단으로 볼록한 곡선</td><td>$y = x$ 대각선 직선</td></tr>
          <tr><td><strong>AUC 면적값</strong></td><td>$AUC = 1.0$ (최대)</td><td>$0.8 \\le AUC < 1.0$</td><td>$AUC = 0.5$</td></tr>
          <tr><td><strong>특징</strong></td><td>FPR=0이면서 TPR=1</td><td>양호한 판별력 보유</td><td>분류기로서의 가치 없음</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'ROC 곡선의 X축은 정밀도(Precision)이고 Y축은 재현율(Recall)이다' ➔ 땡(❌)! X축은 **FPR (1-특이도)**, Y축은 **TPR (재현율/민감도)**입니다. (정밀도-재현율은 PR Curve)",
    quizKeyword: "ROC",
    cardId: "c4-991"
  },
  {
    id: "mk-4-3",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "회귀모형 평가",
    importance: "A+",
    title: "회귀모형 평가지표 5종 비교 (MAE vs MSE vs RMSE vs MAPE vs R²)",
    summary: "연속형 수치 예측 오차를 측정하는 5대 지표의 수식, 이상치 민감도, 결정계수의 수학적 의미.",
    memoryTip: "💡 1초 암기: MAE(절대값/이상치덜민감) | MSE(제곱/이상치페널티) | RMSE(루트MSE/원단위) | R² = 1 - SSE/SST = SSR/SST",
    corePoints: [
      "1) MAE (Mean Absolute Error): 실제값과 예측값의 오차 절대값의 평균 ➔ $\\frac{1}{n}\\sum |y_i - \\hat{y}_i|$ (이상치 영향 덜 받음)",
      "2) MSE (Mean Squared Error): 오차 제곱의 평균 ➔ $\\frac{1}{n}\\sum (y_i - \\hat{y}_i)^2$ (큰 오차에 대해 제곱 페널티 부과, 이상치에 매우 민감)",
      "3) RMSE (Root Mean Squared Error): MSE에 제곱근을 씌워 원래 데이터와 동일한 단위로 환원 ➔ $\\sqrt{MSE}$",
      "4) MAPE (Mean Absolute Percentage Error): 오차를 실제값 대비 백분율(%)로 환산 ➔ $\\frac{100}{n}\\sum |\\frac{y_i - \\hat{y}_i}{y_i}|$ (스케일이 다른 모델 간 비교 가능, 실제값 0이면 계산 불가)",
      "5) 결정계수 ($R^2$): 총 변동 중 회귀모형이 설명하는 변동의 비율 ($0 \\le R^2 \\le 1$)",
      " - $SST = SSR + SSE$ (총제곱합 = 회귀제곱합 + 잔차제곱합)",
      " - $R^2 = \\frac{SSR}{SST} = 1 - \\frac{SSE}{SST}$ (1에 가까울수록 모형 설명력 우수)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>지표명</th><th>계산 수식</th><th>단위 및 특징</th></tr></thead>
        <tbody>
          <tr><td><strong>MAE</strong></td><td>$\\frac{1}{n}\\sum |y - \\hat{y}|$</td><td>원 데이터 단위 / 이상치에 강건(Robust)</td></tr>
          <tr><td><strong>MSE</strong></td><td>$\\frac{1}{n}\\sum (y - \\hat{y})^2$</td><td>단위의 제곱 / 큰 오차에 과도한 페널티 부과</td></tr>
          <tr><td><strong>RMSE</strong></td><td>$\\sqrt{MSE}$</td><td>원 데이터 단위 / MSE의 단위 왜곡 보정</td></tr>
          <tr><td><strong>결정계수 ($R^2$)</strong></td><td>$1 - \\frac{\\text{잔차제곱합(SSE)}}{\\text{총제곱합(SST)}}$</td><td>무차원 ($0 \\sim 1$) / 1일 때 100% 완벽 설명</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '결정계수 $R^2 = 1 - \\frac{SSR}{SST}$이다' ➔ 땡(❌)! $R^2 = \\frac{SSR}{SST} = 1 - \\frac{SSE}{SST}$입니다. (분자가 SSE임)",
    quizKeyword: "결정계수",
    cardId: "c4-2"
  },
  {
    id: "mk-4-4",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "군집모형 평가",
    importance: "A",
    title: "군집분석 평가지표 (실루엣 계수 vs Dunn Index)",
    summary: "라벨이 없는 군집 분석의 타당성을 평가하는 실루엣 계수의 수식 및 해석 범위.",
    memoryTip: "💡 1초 암기: 실루엣 계수 s(i) = (b-a)/max(a,b) | 범위: -1 ~ +1 | 0.5 이상이면 타당, 1에 가까울수록 완벽 군집",
    corePoints: [
      "실루엣 계수 (Silhouette Coefficient):",
      " - 개별 데이터 $i$에 대해 **군집 내 응집도 $a(i)$와 군집 간 분리도 $b(i)$**를 결합 평가",
      " - $a(i)$: 데이터 $i$와 자신이 속한 군집 내 다른 모든 점들 간의 평균 거리 (작을수록 응집력 높음)",
      " - $b(i)$: 데이터 $i$와 가장 가까운 다른 이웃 군집 내 모든 점들 간의 평균 거리 (클수록 잘 분리됨)",
      " - 수식: $s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}$",
      " - **범위: $-1 \\le s(i) \\le 1$** (1에 가까울수록 훌륭한 군집화, 0 근처는 경계면 위치, -1은 잘못된 군집 할당)",
      "Dunn Index: $\\frac{\\min(\\text{군집 간 거리})}{\\max(\\text{군집 내 직경/거리})}$ ➔ **클수록 군집화가 잘 됨** (분모인 군집 내 분산은 작고, 분자인 군집 간 거리는 멀어야 함)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>지표</th><th>수식 / 정의</th><th>우수한 군집의 판정 기준</th></tr></thead>
        <tbody>
          <tr><td><strong>실루엣 계수</strong></td><td>$s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}$</td><td>전체 평균 실루엣 값이 <strong>$0.5$ 이상 권장, $1$에 수렴</strong></td></tr>
          <tr><td><strong>Dunn Index</strong></td><td>$\\frac{\\text{최소 군집 간 거리}}{\\text{최대 군집 내 거리}}$</td><td><strong>값이 클수록 우수</strong> (군집 간 멀고 군집 내 조밀)</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '실루엣 계수의 범위는 0부터 1까지이다' ➔ 땡(❌)! 실루엣 계수의 범위는 **$-1$부터 $+1$까지**입니다. (-1 가능)",
    quizKeyword: "실루엣",
    cardId: "c4-2"
  },
  {
    id: "mk-4-5",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "교차 검증",
    importance: "A+",
    title: "교차 검증(Cross Validation) 4종 (K-Fold, Stratified, LOOCV, 시계열)",
    summary: "과적합을 방지하고 모델의 일반화 성능을 신뢰성 있게 추정하기 위한 교차 검증 기법 비교.",
    memoryTip: "💡 1초 암기: K-Fold(K등분 반복) ➔ Stratified(분류 타겟 비율 유지) ➔ LOOCV(1개만 검증 N번 반복) ➔ 시계열(Time-Series 앞->뒤)",
    corePoints: [
      "1) K-Fold 교차 검증: 데이터를 $K$개의 균등한 폴드로 분할하여, $K-1$개로 학습하고 1개로 검증하는 과정을 $K$번 반복 후 평균 성능 산출",
      "2) 층화 K-Fold (Stratified K-Fold): 분류(Classification) 문제에서 **각 폴드 내 타겟 클래스(0/1)의 비율이 전체 데이터의 비율과 동일하도록 유지**하며 분할 🔥 최다출제 (불균형 데이터 필수)",
      "3) LOOCV (Leave-One-Out Cross Validation): 단 1개의 데이터 포인트만 검증용으로 쓰고 나머지 $N-1$개로 학습, 이를 전체 데이터 수 $N$번 반복 (데이터가 매우 적을 때 사용, 계산 비용 막대)",
      "4) 시계열 교차 검증 (Time Series Split / Rolling): 시간 순서를 무작위로 섞지 않고 과거 데이터로 학습하여 미래 데이터를 순차적으로 검증"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>검증 기법</th><th>작동 원리</th><th>적합한 데이터 및 특징</th></tr></thead>
        <tbody>
          <tr><td><strong>K-Fold</strong></td><td>데이터를 무작위 $K$개 분할 후 교차 검증</td><td>일반 회귀 및 균형 잡힌 데이터</td></tr>
          <tr><td><strong>Stratified K-Fold</strong></td><td>각 폴드의 라벨 클래스 비율을 모집단과 일치시킴</td><td><strong>불균형 분류 데이터셋 필수</strong></td></tr>
          <tr><td><strong>LOOCV</strong></td><td>1개 샘플 검증 + $(N-1)$개 학습 $\\times N$회</td><td>소규모 극소 데이터셋 (연산량 $O(N)$)</td></tr>
          <tr><td><strong>Time Series Split</strong></td><td>미래 데이터를 학습에 사용하지 않고 순차 누적 검증</td><td>주가, 기상, 판매량 등 시계열 데이터</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '불균형 분류 데이터셋에는 일반 K-Fold 교차 검증이 가장 적합하다' ➔ 땡(❌)! 특정 폴드에 소수 클래스가 0개가 될 수 있으므로 [Stratified K-Fold]를 써야 합니다.",
    quizKeyword: "교차검증",
    cardId: "c4-992"
  },
  {
    id: "mk-4-6",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "편향-분산 트레이드오프",
    importance: "A+",
    title: "편향-분산 트레이드오프 (Bias-Variance Tradeoff) & 과적합 해결책",
    summary: "모델의 복잡도에 따른 편향(Bias)과 분산(Variance)의 상충 관계와 과대적합(Overfitting) 해결 5대 기법.",
    memoryTip: "💡 1초 암기: 과소적합(단순모형/높은편향/낮은분산) vs 과대적합(복잡모형/낮은편향/높은분산) | 총오차 = 편향² + 분산 + 노이즈",
    corePoints: [
      "총 오차 (Total Error) $= \\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Error(노이즈)}$",
      "과소적합 (Underfitting): 모델이 너무 단순하여 데이터의 기저 패턴을 학습하지 못함 ➔ **높은 편향(High Bias), 낮은 분산(Low Variance)**",
      "과대적합 (Overfitting): 모델이 너무 복잡하여 훈련 데이터의 노이즈까지 과도하게 외워버림 ➔ **낮은 편향(Low Bias), 높은 분산(High Variance)** (훈련 오차는 0에 가깝지만 테스트 오차 급증)",
      "과대적합(Overfitting) 해결 5대 전략:",
      " 1) 데이터 증강(Data Augmentation) 및 더 많은 훈련 데이터 확보",
      " 2) 모델 복잡도 축소 (트리 깊이 max_depth 제한, 가지치기 Pruning)",
      " 3) 가중치 규제(Regularization) 적용 (L1 라쏘, L2 릿지)",
      " 4) 드롭아웃(Dropout) 적용 (신경망 뉴런 무작위 비활성화)",
      " 5) 조기 종료(Early Stopping - 검증 손실이 증가하기 시작할 때 학습 중단)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>과소적합 (Underfitting)</th><th>과대적합 (Overfitting)</th></tr></thead>
        <tbody>
          <tr><td><strong>모델 복잡도</strong></td><td>너무 단순함 (Low Complexity)</td><td>너무 복잡함 (High Complexity)</td></tr>
          <tr><td><strong>편향 & 분산</strong></td><td><strong>높은 편향 (High Bias)</strong>, 낮은 분산</td><td>낮은 편향, <strong>높은 분산 (High Variance)</strong></td></tr>
          <tr><td><strong>오차 현상</strong></td><td>훈련 오차도 높고, 테스트 오차도 높음</td><td>훈련 오차는 극소화, 테스트 오차는 폭등</td></tr>
          <tr><td><strong>해결책</strong></td><td>더 복잡한 모델 사용, 피처 추가, 규제 완화</td><td>데이터 증강, 규제(L1/L2), 가지치기, 드롭아웃</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '과대적합(Overfitting) 상태에서는 편향(Bias)이 매우 높다' ➔ 땡(❌)! 과대적합은 편향이 낮고 **분산(Variance)이 비정상적으로 높은** 상태입니다.",
    quizKeyword: "과적합",
    cardId: "c4-4"
  },
  {
    id: "mk-4-7",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "모형 해석 및 XAI",
    importance: "A",
    title: "설명 가능한 인공지능 (XAI: SHAP vs LIME vs 특성 중요도)",
    summary: "블랙박스 인공지능 모델의 예측 결과를 해석하기 위한 핵심 XAI 기법 비교.",
    memoryTip: "💡 1초 암기: SHAP(게임이론 섀플리값/전역+국소 일관성) vs LIME(국소 대리모델 근사)",
    corePoints: [
      "XAI (Explainable AI): 모델이 왜 그러한 예측 결과를 도출했는지 사람이 이해할 수 있도록 근거를 설명하는 기술",
      "1) SHAP (SHapley Additive exPlanations):",
      " - 협조적 게임 이론의 **섀플리 값(Shapley Value)**에 기반",
      " - 모든 가능한 특성 조합에 대해 특정 피처의 한계 기여도를 공정하게 배분",
      " - 전역적(Global) 해석과 개별 샘플에 대한 국소적(Local) 해석 모두에서 수학적 일관성 보장 🔥 최다출제",
      "2) LIME (Local Interpretable Model-agnostic Explanations):",
      " - 관심 있는 특정 샘플 주변에 노이즈 데이터를 섭동(Perturbation) 생성",
      " - 복잡한 블랙박스 모델 대신 해석 가능한 단순 선형 모델을 **국소적(Local)으로 근사 적합**시켜 설명",
      "3) 특성 중요도 (Feature Importance): 트리 앙상블에서 해당 피처가 불순도를 얼마나 감소시켰는지 측정 (MDI, Permutation Importance)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>SHAP</th><th>LIME</th><th>Permutation Importance</th></tr></thead>
        <tbody>
          <tr><td><strong>이론적 기반</strong></td><td>게임이론 섀플리 값 (Shapley Value)</td><td>국소 대리 모형 (Local Surrogate)</td><td>특성 값 무작위 셔플 후 성능 저하 측정</td></tr>
          <tr><td><strong>해석 범위</strong></td><td>국소(Local) + 전역(Global) 모두 완벽 지원</td><td>주로 국소적(Local) 개별 예측 설명</td><td>전역적(Global) 피처 중요도</td></tr>
          <tr><td><strong>연산 비용</strong></td><td>조합 수로 인해 연산량 큼 (TreeSHAP으로 가속)</td><td>비교적 빠름</td><td>빠름</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'LIME은 게임 이론의 섀플리 값을 기반으로 전역적 특성 중요도를 계산한다' ➔ 땡(❌)! 섀플리 값 기반은 [SHAP]입니다.",
    quizKeyword: "SHAP",
    cardId: "c4-5"
  },
  {
    id: "mk-4-8",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "데이터 시각화",
    importance: "A",
    title: "시각화 차트 유형 및 활용처 매칭 (히트맵, 평행좌표, 생키 등)",
    summary: "다변량 및 비정형 데이터의 목적별 최적 시각화 도구 매칭 족보.",
    memoryTip: "💡 1초 암기: 히트맵(상관행렬/색상강도) | 평행좌표계(다차원연속형) | 생키(흐름/유입유출) | 박스플롯(분포/이상치)",
    corePoints: [
      "히트맵 (Heatmap): 2차원 격자에 수치 크기를 색상의 농도로 표현 ➔ 변수 간 상관계수 행렬, 시간대별 트래픽 시각화",
      "평행 좌표계 (Parallel Coordinates): 다차원(5개 이상의 변수) 데이터를 평행한 수직 축들 위에 꺾은선으로 연결하여 다차원 패턴 표현",
      "생키 다이어그램 (Sankey Diagram): 노드 사이의 링크 너비로 **유량(Flow)과 에너지/비용의 이동 경로**를 직관적으로 표현 (웹사이트 이탈/전환 경로)",
      "트리맵 (Treemap): 계층적(Hierarchical) 데이터를 사각형 영역의 크기와 색상으로 중첩 표현 (디스크 용량 점유율, 예산 분포)",
      "체르노프 페이스 (Chernoff Face): 다차원 변수를 사람 얼굴 부위(눈 크기, 입꼬리 등)에 매핑하여 표현"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>시각화 도구</th><th>주요 데이터 유형</th><th>최적의 분석 목적</th></tr></thead>
        <tbody>
          <tr><td><strong>히트맵 (Heatmap)</strong></td><td>2차원 행렬 데이터</td><td>상관계수 매트릭스, 시간-요일별 혼잡도</td></tr>
          <tr><td><strong>생키 다이어그램</strong></td><td>방향성 네트워크 / 경로</td><td>고객 유입·이탈 전환 퍼널 경로 분석</td></tr>
          <tr><td><strong>평행 좌표계</strong></td><td>다변량(High-D) 연속형</td><td>군집별 다차원 특징 비교</td></tr>
          <tr><td><strong>트리맵 (Treemap)</strong></td><td>계층 구조 범주형 데이터</td><td>전체 대비 카테고리별 비중 및 서브그룹 크기</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '생키 다이어그램은 다차원 변수의 상관계수 행렬을 색상으로 표현하는 데 가장 적합하다' ➔ 땡(❌)! 상관계수 행렬은 [히트맵]입니다.",
    quizKeyword: "시각화",
    cardId: "c4-6"
  },
  {
    id: "mk-1-9",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "데이터 거버넌스",
    importance: "A+",
    title: "데이터 거버넌스 4대 구성요소 & 데이터 표준화 (명칭/정의/형식)",
    summary: "전사적 데이터 자산을 효율적·안전하게 관리하기 위한 데이터 거버넌스 프레임워크와 표준 체계 3대 요소.",
    memoryTip: "💡 1초 암기: 거버넌스 4요소 = 【조직, 프로세스, 시스템, 데이터표준】 | 데이터 표준화 3요소 = 【표준 단어, 표준 용어, 표준 도메인】",
    corePoints: [
      "데이터 거버넌스(Data Governance): 데이터의 원천, 품질, 보안, 체계적 관리를 위한 전사적 관리 체계 및 조직적 의사결정 구조",
      "거버넌스 4대 구성요소: 조직(Organization), 프로세스(Process), 시스템(System), 데이터 표준화(Data Standard)",
      "데이터 표준화 3대 구성요소:",
      " 1) 표준 단어: 사업 분야에서 사용하는 단어를 단의어/동의어 정제 후 등록 (예: 고객, 금액)",
      " 2) 표준 용어: 표준 단어를 조합하여 생성한 명칭 (예: 고객 + 금액 ➔ 고객금액)",
      " 3) 표준 도메인: 데이터의 값의 범위, 타입, 길이를 정의 (예: 금액 도메인 ➔ NUMBER(15))",
      "데이터 관리 체계: 메타데이터 관리, 마스터 데이터 관리(MDM - 핵심 기준정보 통합)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>표준 단어</th><th>표준 용어</th><th>표준 도메인</th></tr></thead>
        <tbody>
          <tr><td><strong>정의</strong></td><td>기본 구성 단위 단어</td><td>단어들의 조합으로 만든 명칭</td><td>데이터의 타입, 길이, 허용값 범위</td></tr>
          <tr><td><strong>예시</strong></td><td>'고객', '매출'</td><td>'고객_매출_금액'</td><td>NUMBER(12), YYYY-MM-DD (날짜)</td></tr>
          <tr><td><strong>핵심 역할</strong></td><td>동의어 헷갈림 방지</td><td>컬럼명 통일성 확보</td><td>DB 필드 데이터 타입 일치화</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '데이터 도메인은 표준 단어를 조합하여 만든 완성된 명칭이다' ➔ 땡(❌)! 단어를 조합한 것은 [표준 용어]이며, 도메인은 [데이터의 형식 및 범위]입니다.",
    quizKeyword: "거버넌스",
    cardId: "c1-22"
  },
  {
    id: "mk-1-10",
    subject: 1,
    subjectName: "1과목 분석 기획",
    category: "하둡/스파크 에코시스템",
    importance: "A+",
    title: "하둡(Hadoop) 2.0 스택 & 스파크(Apache Spark) RDD vs DataFrame",
    summary: "분산 파일 시스템 HDFS, 분산 자원 관리자 YARN, 그리고 인메모리 초고속 처리 엔진 Spark의 핵심 메커니즘.",
    memoryTip: "💡 1초 암기: 하둡 = HDFS(저장) + YARN(자원배분) + MapReduce(디스크연산) | Spark = 인메모리(100배빠름) + RDD(불변/불변성)",
    corePoints: [
      "HDFS (Hadoop Distributed File System): 대용량 데이터를 블록(기본 128MB) 단위로 나누어 분산 저장 (NameNode = 마스터 메타데이터, DataNode = 실제 블록 저장)",
      "YARN (Yet Another Resource Negotiator): 하둡 2.0 자원 관리 및 작업 스케줄링 플랫폼 (ResourceManager + NodeManager)",
      "MapReduce: Map(데이터 쪼개기/키-값 생성) ➔ Shuffle(정렬) ➔ Reduce(합산) 단계의 디스크 기반 분산 처리",
      "Apache Spark (아파치 스파크):",
      " - **인메모리(In-Memory) 연산**으로 MapReduce 대비 최대 100배 빠름",
      " - RDD (Resilient Distributed Dataset): 병렬 처리 가능한 **불변(Immutable)** 분산 데이터 컬렉션, 장애 복구 능력 보유",
      " - DataFrame / Dataset: RDD에 스키마(Schema) 구조를 부여하여 Catalyst 최적화기 지원"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>하둡 MapReduce</th><th>아파치 스파크 (Spark)</th></tr></thead>
        <tbody>
          <tr><td><strong>연산 매체</strong></td><td>디스크 (Disk I/O 잦음)</td><td><strong>메모리 (In-Memory DRAM)</strong></td></tr>
          <tr><td><strong>처리 속도</strong></td><td>상대적으로 느림 (배치 작업에 적합)</td><td>매우 빠름 (실시간 및 반복 학습)</td></tr>
          <tr><td><strong>핵심 추상화</strong></td><td>Map & Reduce 키-값 쌍</td><td><strong>RDD / DataFrame / Dataset</strong></td></tr>
          <tr><td><strong>반복 학습</strong></td><td>매 단계 디스크 쓰기로 인공지능에 비효율</td><td>메모리 재사용으로 ML/DL 연산에 최적화</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'Spark의 RDD는 언제든지 자유롭게 요소를 변경할 수 있는 가변(Mutable) 객체이다' ➔ 땡(❌)! RDD는 읽기 전용 **불변(Immutable)** 객체입니다.",
    quizKeyword: "Spark",
    cardId: "c1-23"
  },
  {
    id: "mk-2-10",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "표본 추출 기법",
    importance: "A+",
    title: "표본 추출 4대 확률 추출 기법 비교 (단순무작위, 계통, 층화, 군집) 🔥 [최다출제]",
    summary: "시험에서 매회 1~2문제 무조건 출제되는 4가지 표본 추출(Sampling) 기법의 정의와 층화 vs 군집 1:1 영구 비교.",
    memoryTip: "💡 1초 암기: 계통(k번째 간격) | 층화(집단내 동질, 집단간 이질 -> 층별 추출) | 군집(집단내 이질, 집단간 동질 -> 군집 통째 추출)",
    corePoints: [
      "1) 단순 무작위 추출 (Simple Random Sampling): 모든 개체가 뽑힐 확률이 동일함 (난수표 사용)",
      "2) 계통 추출 (Systematic Sampling): 첫 번째 개체를 무작위로 뽑은 후 **일정한 간격 $k$번째 마다** 표본 추출 ($k = N/n$)",
      "3) 층화 추출 (Stratified Sampling):",
      " - 모집단을 **집단 내부는 동질적, 집단 간은 이질적인** 층(Layer)으로 나눔 (예: 학년별, 성별)",
      " - **각 층별로 무작위 표본을 각각 추출** ➔ 추정의 가변성/오차 최소화 (대표성 극대화)",
      "4) 군집/집단 추출 (Cluster Sampling):",
      " - 모집단을 **집단 내부는 이질적, 집단 간은 동질적인** 군집으로 나눔 (예: 학급, 구/동)",
      " - **선택된 몇 개 군집을 통째로 전수조사** ➔ 조사 비용 및 시간 대폭 절감"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>구분</th><th>층화 추출 (Stratified)</th><th>군집/집단 추출 (Cluster)</th></tr></thead>
        <tbody>
          <tr><td><strong>집단 내부 (Within)</strong></td><td><strong style="color:var(--brand);">동질적 (Homogeneous)</strong></td><td><strong style="color:var(--danger);">이질적 (Heterogeneous)</strong></td></tr>
          <tr><td><strong>집단 간 (Between)</strong></td><td><strong style="color:var(--danger);">이질적 (Heterogeneous)</strong></td><td><strong style="color:var(--brand);">동질적 (Homogeneous)</strong></td></tr>
          <tr><td><strong>추출 방식</strong></td><td><strong>모든 층에서 각각 일부 추출</strong></td><td><strong>몇 개 군집 선택 후 통째로 추출</strong></td></tr>
          <tr><td><strong>주요 목적</strong></td><td>대표성 확보 및 표본 오차 최소화</td><td>조사 비용 및 시간 대폭 절감</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '층화 추출은 집단 내부가 이질적이고 집단 간이 동질적일 때 사용한다' ➔ 땡(❌)! 거꾸로 말했습니다. 집단 내 동질/집단 간 이질이 [층화], 집단 내 이질/집단 간 동질이 [군집]입니다.",
    quizKeyword: "층화추출",
    cardId: "c2-25"
  },
  {
    id: "mk-2-11",
    subject: 2,
    subjectName: "2과목 데이터 탐색",
    category: "가설검정 통계량",
    importance: "A+",
    title: "가설검정 핵심 통계량 4종 ($Z, t, F, \\chi^2$) 및 자유도 총정리",
    summary: "검정 목적에 따른 $Z$-검정, $t$-검정, $F$-검정, 카이제곱 검정의 적용 기준과 자유도(df) 수식.",
    memoryTip: "💡 1초 암기: Z(모분산 앎/대표본) ➔ t(모분산 모름/소표본 n-1) ➔ F(두 분산 비/ANOVA) ➔ 카이제곱(독립성/범주형 (r-1)(c-1))",
    corePoints: [
      "1) Z-검정: 모분산 $\\sigma^2$을 알고 있거나, 표본 크기가 충분히 큰 경우($n \\ge 30$) 모평균 검정",
      "2) t-검정: 모분산 $\\sigma^2$을 모르고, 표본 크기가 작은 소표본($n < 30$)일 때 모평균 검정 (단일표본 자유도 $df = n-1$, 독립2표본 자유도 $df = n_1 + n_2 - 2$)",
      "3) F-검정: 두 독립적인 정규 모집단의 분산 비교 및 분산분석(ANOVA), 회귀분석 유의성 검정 ($F = \\frac{MSR}{MSE} = \\frac{s_1^2}{s_2^2}$, 분자/분모 2개의 자유도 가짐)",
      "4) 카이제곱($\\chi^2$) 검정: 범주형 변수의 적합도 검정, 교차표 독립성/동질성 검정 (분할표 자유도 $df = (r - 1)(c - 1)$)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>검정 방법</th><th>주요 활용 목적</th><th>자유도 (Degree of Freedom)</th></tr></thead>
        <tbody>
          <tr><td><strong>단일표본 t-검정</strong></td><td>모분산 모를 때 모평균 검정</td><td>$df = n - 1$</td></tr>
          <tr><td><strong>독립 2표본 t-검정</strong></td><td>두 집단의 평균 차이 비교</td><td>$df = n_1 + n_2 - 2$</td></tr>
          <tr><td><strong>분산분석 (ANOVA)</strong></td><td>3개 이상 집단 평균 비교</td><td>분자 $k-1$, 분모 $N-k$</td></tr>
          <tr><td><strong>카이제곱 독립성 검정</strong></td><td>$r \\times c$ 분할표 범주 간 관련성</td><td>$df = (r - 1)(c - 1)$</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '3행 4열 분할표의 카이제곱 검정 자유도는 12이다' ➔ 땡(❌)! 자유도는 $(3-1) \\times (4-1) = 2 \\times 3 = 6$ 입니다.",
    quizKeyword: "자유도",
    cardId: "c2-26"
  },
  {
    id: "mk-3-11",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "인공신경망",
    importance: "A+",
    title: "인공신경망 활성화 함수 (Sigmoid, ReLU, LeakyReLU, Softmax)",
    summary: "신경망 비선형성 부여 함수들의 수식, 기울기 소실(Vanishing Gradient) 극복 과정과 출력층 활성화 함수 선택 기준.",
    memoryTip: "💡 1초 암기: 은닉층 = ReLU(0이하 0, 0이상 x/기울기소실해결) | 출력층 이진분류 = Sigmoid | 출력층 다중분류 = Softmax(합=1)",
    corePoints: [
      "시그모이드 (Sigmoid): $\\sigma(x) = \\frac{1}{1 + e^{-x}}$ ➔ 출력 범위 $(0, 1)$, 양 끝단에서 미분값이 0으로 수렴하여 **기울기 소실(Vanishing Gradient) 유발** (이진 분류 출력층용)",
      "ReLU (Rectified Linear Unit): $f(x) = \\max(0, x)$ ➔ 양수 영역 미분값이 1로 유지되어 **은닉층 기울기 소실 완벽 해결** (단점: 음수 영역 뉴런 사망 Dying ReLU)",
      "Leaky ReLU: $f(x) = \\max(\\alpha x, x)$ $(\\alpha = 0.01)$ ➔ 음수 영역에 미세한 경사를 주어 Dying ReLU 방지",
      "소프트맥스 (Softmax): $S(z_i) = \\frac{e^{z_i}}{\\sum e^{z_j}}$ ➔ **출력값의 총합이 정확히 1.0이 되도록 확률 분포로 변환** (K개 클래스 다중 분류 출력층용)"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>활성화 함수</th><th>수식 / 출력 범위</th><th>주요 사용 위치 및 역할</th></tr></thead>
        <tbody>
          <tr><td><strong>Sigmoid</strong></td><td>$\\frac{1}{1+e^{-x}} \\quad (0, 1)$</td><td>이진 분류 (Binary) 출력층 / 기울기 소실 단점</td></tr>
          <tr><td><strong>ReLU</strong></td><td>$\\max(0, x) \\quad [0, \\infty)$</td><td>딥러닝 **은닉층(Hidden Layer) 기본 표준**</td></tr>
          <tr><td><strong>Softmax</strong></td><td>$\\frac{e^{z_i}}{\\sum e^{z_j}} \\quad (0, 1)$, $\\sum=1$</td><td>**다중 클래스(Multi-class) 분류 출력층**</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '다중 클래스 분류 신경망의 출력층 활성화 함수로는 시그모이드가 가장 적합하다' ➔ 땡(❌)! 다중 분류 출력층은 확률 합이 1인 [소프트맥스(Softmax)]를 써야 합니다.",
    quizKeyword: "ReLU",
    cardId: "c3-25"
  },
  {
    id: "mk-3-12",
    subject: 3,
    subjectName: "3과목 데이터 모델링",
    category: "경사하강법 옵티마이저",
    importance: "A+",
    title: "신경망 최적화 옵티마이저 계보 (SGD ➔ Momentum ➔ RMSprop ➔ Adam)",
    summary: "손실함수를 최소화하기 위한 가중치 업데이트 알고리즘의 발전 계보와 Adam 옵티마이저의 원리.",
    memoryTip: "💡 1초 암기: Momentum(관성/가속도) | RMSprop(지수이동평균 학습률조절) | Adam = Momentum + RMSprop (현재 최적 표준!)",
    corePoints: [
      "1) 경사하강법 (GD / SGD): 손실함수의 기울기(Gradient) 반대 방향으로 가중치 업데이트 ($w \\leftarrow w - \\eta \\nabla L$)",
      "2) 모멘텀 (Momentum): 이전 기울기 변화량에 관성(가속도)을 적용하여 국소 최적점(Local Minima) 탈출 유도",
      "3) Adagrad: 변화가 잦은 파라미터는 학습률을 줄이고, 드문 파라미터는 학습률을 높임 (단점: 학습이 진행될수록 학습률이 0이 됨)",
      "4) RMSprop: Adagrad의 단점을 보완하여 최근 기울기 변화에 지수이동평균(EMA) 가중치를 부여",
      "5) **Adam (Adaptive Moment Estimation)**: **모멘텀(1차 모멘트: 관성) + RMSprop(2차 모멘트: 적응형 학습률)을 결합**한 현대 딥러닝 표준 옵티마이저"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>옵티마이저</th><th>핵심 아이디어</th><th>특징 및 단점</th></tr></thead>
        <tbody>
          <tr><td><strong>SGD</strong></td><td>가장 기본 경사하강법</td><td>진동 심함, Local Minima 갇힘</td></tr>
          <tr><td><strong>Momentum</strong></td><td>관성(가속도) 도입</td><td>국소 최적점 및 안장점(Saddle Point) 용이한 탈출</td></tr>
          <tr><td><strong>RMSprop</strong></td><td>적응형 학습률 (EMA)</td><td>최근 기울기 위주 반영으로 학습 멈춤 방지</td></tr>
          <tr><td><strong>Adam</strong></td><td><strong>Momentum + RMSprop 결합</strong></td><td><strong>대부분의 딥러닝 모델에서 가장 뛰어난 성능 보장</strong></td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: 'Adam 옵티마이저는 관성(Momentum) 개념을 제외하고 오직 학습률 조정만 수행한다' ➔ 땡(❌)! Adam은 [Momentum]과 [RMSprop]을 결합한 알고리즘입니다.",
    quizKeyword: "Adam",
    cardId: "c3-26"
  },
  {
    id: "mk-4-9",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "텍스트 마이닝",
    importance: "A+",
    title: "텍스트 마이닝 TF-IDF 수식 계산 & 토픽 모델링 (LDA)",
    summary: "단어의 상대적 중요도를 계산하는 TF-IDF 공식과 잠재 디리클레 할당(LDA) 토픽 모델링.",
    memoryTip: "💡 1초 암기: TF-IDF = TF(단어빈도) × IDF(역문서빈도 log(N/df)) | 흔한 단어(의,가)는 IDF가 0에 수렴하여 중요도 감소!",
    corePoints: [
      "TF (Term Frequency): 특정 문서 내에서 단어 $t$가 등장한 빈도",
      "DF (Document Frequency): 단어 $t$가 등장한 문서의 수",
      "IDF (Inverse Document Frequency): 전체 문서 수 $N$을 $DF$로 나눈 후 자연로그를 취함 ➔ $IDF(t) = \\log\\left(\\frac{N}{DF(t)}\\right)$",
      "TF-IDF: $TF-IDF(t, d) = TF(t, d) \\times IDF(t)$",
      " - **특정 문서 $d$에서 자주 등장하면서, 전체 문서군에서는 흔하지 않은 희소 핵심 키워드**일수록 높은 점수",
      " - '은', '는', '이', '가' 등 모든 문서에 등장하는 불용어(Stopwords)는 $DF \\approx N \\implies IDF \\approx 0$이 되어 자동 배제됨",
      "LDA (Latent Dirichlet Allocation, 잠재 디리클레 할당): 문서를 여러 토픽(Topic)의 확률 혼합체로 가정하고, 각 토픽을 단어들의 확률 분포로 추출하는 대표적 비지도 토픽 모델링"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>지표 / 기법</th><th>계산 수식 / 알고리즘</th><th>의미 및 역할</th></tr></thead>
        <tbody>
          <tr><td><strong>TF (단어 빈도)</strong></td><td>문서 내 등장 횟수</td><td>해당 문서 내 단어 출현 비중</td></tr>
          <tr><td><strong>IDF (역문서 빈도)</strong></td><td>$\\log\\left(\\frac{\\text{전체 문서수 } N}{DF}\\right)$</td><td>흔한 단어 페널티, 희귀 단어 가중치 부여</td></tr>
          <tr><td><strong>LDA 토픽모델링</strong></td><td>잠재 디리클레 할당 (비지도)</td><td>대용량 문서 집합에서 숨겨진 주제(Topic) 추출</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '모든 문서에 공통으로 자주 등장하는 단어일수록 TF-IDF 값이 높아진다' ➔ 땡(❌)! 모든 문서에 흔한 단어는 IDF가 0이 되어 TF-IDF 값도 0에 수렴합니다.",
    quizKeyword: "TF-IDF",
    cardId: "c4-25"
  },
  {
    id: "mk-4-10",
    subject: 4,
    subjectName: "4과목 결과 해석",
    category: "모형 모니터링",
    importance: "A+",
    title: "데이터 시프트 & 모형 드리프트 (Data Drift vs Concept Drift vs Covariate Shift)",
    summary: "모델 배포 후 시간이 지남에 따라 성능이 저하되는 원인인 3대 드리프트 개념 비교.",
    memoryTip: "💡 1초 암기: Covariate Shift(입력 P(X) 변화) ➔ Concept Drift(관계 P(Y|X) 변화/코로나후 소비패턴) ➔ Prior Shift(타겟 P(Y) 변화)",
    corePoints: [
      "1) 공변량 시프트 (Covariate Shift): 입력 데이터의 분포 $P(X)$는 변했지만, $X$와 $Y$ 간의 관계 $P(Y|X)$는 동일함 (예: 학습 데이터는 20대 위주, 운영 데이터는 50대 위주)",
      "2) 개념 드리프트 (Concept Drift): 입력과 출력 간의 실제 관계 $P(Y|X)$ 자체가 시간에 따라 변화함 (예: 코로나19 이후 동일한 입력 소득이라도 소비 패턴 및 위험도 판정이 달라짐)",
      "3) 사후/사전 시프트 (Prior Shift): 타겟 클래스 라벨 $P(Y)$의 모집단 비율이 변화함",
      "모형 재학습(Retraining) 트리거: PSI (Population Stability Index), KS 검정 등으로 드리프트를 감지하여 자동 데이터 재학습 파이프라인 수행"
    ],
    comparisonTable: `
      <table class="mk-table">
        <thead><tr><th>드리프트 유형</th><th>변화하는 확률 분포</th><th>실제 사례 및 현상</th></tr></thead>
        <tbody>
          <tr><td><strong>공변량 시프트 (Covariate)</strong></td><td>$P(X)$ 변화 ($P(Y|X)$ 고정)</td><td>이용자 연령층/기기 분포 변화</td></tr>
          <tr><td><strong>개념 드리프트 (Concept)</strong></td><td>$P(Y|X)$ 변화</td><td>팬데믹/경기 변동으로 신용평가 기준 변화</td></tr>
          <tr><td><strong>라벨 시프트 (Prior)</strong></td><td>$P(Y)$ 변화</td><td>금융 사기(Fraud) 발생 비율 급증</td></tr>
        </tbody>
      </table>
    `,
    traps: "오답 Trap: '입력 특징 X와 타겟 Y 사이의 관계 $P(Y|X)$ 자체가 변화하는 현상을 Covariate Shift라고 한다' ➔ 땡(❌)! 입력과 타겟의 관계가 변하는 것은 [Concept Drift]입니다.",
    quizKeyword: "드리프트",
    cardId: "c4-26"
  }
];
