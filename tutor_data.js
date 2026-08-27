/**
 * KNOWWAY (노웨이) 1:1 AI 튜터 16단계 마스터 커리큘럼 데이터베이스
 * 빅데이터분석기사 필기시험 합격 전용: 개념 이해 -> 비교 -> 암기 -> 함정 -> 문제 -> 이해도 검증
 */

const TUTOR_CURRICULUM = [
  // ========================================================
  // 1단계. 표본추출
  // ========================================================
  {
    stageId: 1,
    stageNumber: 1,
    title: "1단계. 표본추출 기법",
    subtitle: "단순무작위 · 계통 · 층화 · 군집 완벽 구분",
    icon: "🎯",
    subjectNumber: 2,
    subjectName: "2과목 · 데이터 탐색",
    summaryTag: "각 집단에서 뽑기 vs 집단 자체를 뽑기",
    concepts: [
      {
        id: "c1-1-simple",
        name: "단순무작위추출",
        engName: "Simple Random Sampling",
        oneLineDef: "모집단의 모든 원소가 표본으로 뽑힐 확률이 동일하도록 아무런 인위적 조작 없이 무작위로 추출하는 방법.",
        easyExplain: "모든 사람의 이름을 적은 종이를 상자에 넣고 잘 섞은 뒤 눈 감고 제비뽑기하듯 무작위로 뽑는 방식입니다.",
        analogy: "로또 추첨 기계에서 45개의 공이 모두 똑같은 확률로 뽑히는 것과 같습니다.",
        superEasyAnalogy: "바구니에 담긴 100개의 사탕 중 눈을 감고 손에 잡히는 사탕 5개를 그냥 꺼내는 것입니다.",
        keywords: ["동일한 확률", "난수표", "제비뽑기", "무작위", "임의 추출"],
        examExpressions: [
          "모집단의 모든 개체가 동일한 확률로 선택된다.",
          "난수표나 컴퓨터 난수 생성기를 사용하여 표본을 추출한다."
        ],
        confusingConcept: "계통표본추출 (일정한 규칙/간격이 있는 계통추출과 달리, 단순랜덤은 완전히 규칙 없는 무작위입니다).",
        comparisonTable: {
          headers: ["구분", "단순무작위추출", "계통표본추출"],
          rows: [
            ["추출 규칙", "아무 규칙 없이 순수 무작위", "첫 번째만 무작위, 이후 k번째 간격"],
            ["추출 도구", "난수표, 무작위 번호표", "일정한 간격(k = N/n) 계산"],
            ["주의점", "모집단 목록 필요", "모집단에 주기성 존재 시 편향 발생"]
          ]
        },
        memorizationRule: "단순랜덤 ➔ 그냥 무작위 (규칙 없음, 동일 확률)",
        traps: [
          "함정 선지: '일정한 간격(k번째)으로 번호를 매겨 추출한다' ➔ 단순무작위가 아니라 '계통추출'입니다.",
          "함정 선지: '집단을 나누어 각 집단에서 무작위로 뽑는다' ➔ 단순무작위가 아니라 '층화추출'입니다."
        ],
        threeSecKey: "지문에 '동일한 확률', '난수표', '순수 무작위'가 나오면 ➔ 단순무작위추출!",
        questions: [
          {
            qId: "q1-1-1",
            level: 1,
            questionText: "다음 중 빅데이터 분석을 위한 표본추출 시, 모집단의 모든 구성원이 표본으로 선택될 확률이 동등하며 난수표나 컴퓨터 무작위 번호를 활용하여 표본을 추출하는 기법은?",
            options: [
              "① 계통표본추출 (Systematic Sampling)",
              "② 층화표본추출 (Stratified Sampling)",
              "③ 단순무작위추출 (Simple Random Sampling)",
              "④ 군집표본추출 (Cluster Sampling)"
            ],
            correctAnswer: 2,
            reasonKeywords: ["모든 구성원이 동등한 확률", "난수표를 사용한 순수 무작위"],
            explanation: {
              correctReason: "단순무작위추출(Simple Random Sampling)은 모집단 내 모든 개체가 추출될 확률이 정확히 같고, 난수표나 난수 생성기를 통해 임의 추출하는 가장 기초적인 확률표본추출법입니다.",
              wrongBreakdowns: [
                "① 계통표본추출: 첫 번째 표본만 무작위로 정하고 이후 '일정한 간격(k)'으로 뽑는 방식입니다.",
                "② 층화표본추출: 모집단을 동질적 층으로 나눈 뒤 '각 층에서 무작위'로 뽑는 방식입니다.",
                "④ 군집표본추출: 모집단을 군집으로 나눈 후 '군집 자체를 무작위 선택'하여 전수조사하는 방식입니다."
              ]
            }
          },
          {
            qId: "q1-1-2",
            level: 2,
            questionText: "단순무작위추출(Simple Random Sampling)에 대한 설명으로 가장 옳지 않은 것은?",
            options: [
              "① 모집단의 모든 단위가 표본으로 추출될 확률이 동일하다.",
              "② 표본추출틀(Sampling Frame)이 전체 모집단에 대해 완전히 확보되어 있어야 한다.",
              "③ 모집단에 일정한 주기성이 존재할 경우 표본의 편향(Bias)이 심각해질 수 있다.",
              "④ 분석가의 주관적 판단이나 인위적 개입 없이 난수표 등을 활용하여 추출한다."
            ],
            correctAnswer: 2,
            reasonKeywords: ["주기성에 의한 편향 위험은 계통추출의 특성"],
            explanation: {
              correctReason: "③번은 '계통표본추출(Systematic Sampling)'의 전형적인 단점 및 함정입니다. 계통추출은 일정한 간격 k마다 뽑기 때문에 모집단에 주기성(예: 7일 주기, 주말 등)이 있으면 편향이 생깁니다. 단순무작위추출은 주기성과 무관합니다.",
              wrongBreakdowns: [
                "① 맞음: 모든 단위의 추출 확률이 완전히 동일합니다.",
                "② 맞음: 전체 모집단 목록(표본추출틀)이 반드시 사전에 있어야 난수를 부여해 뽑을 수 있습니다.",
                "④ 맞음: 주관적 판단 없이 객관적인 난수를 사용합니다."
              ]
            }
          }
        ]
      },
      {
        id: "c1-2-systematic",
        name: "계통표본추출",
        engName: "Systematic Sampling",
        oneLineDef: "모집단 목록에 일련번호를 부여하고, 첫 번째 표본만 무작위로 선정한 뒤 이후 '일정한 간격(k)'마다 표본을 추출하는 방법.",
        easyExplain: "줄 서 있는 사람들에게 1번부터 번호를 매긴 뒤, 처음에 3번을 뽑았으면 그 뒤로 10명 간격으로 13번, 23번, 33번...을 차례대로 뽑는 방식입니다.",
        analogy: "공장에서 생산 라인을 지나가는 제품 중 매 50번째 제품마다 꺼내서 불량 검사를 하는 것과 같습니다.",
        superEasyAnalogy: "출석부에서 3번 학생을 뽑고, 5명씩 건너뛰며 8번, 13번, 18번 학생을 청소당번으로 뽑는 것입니다.",
        keywords: ["일정한 간격 k", "k = N/n", "주기성 주의", "체계적 추출"],
        examExpressions: [
          "모집단 크기 N을 표본 크기 n으로 나눈 간격 k를 기준으로 표본을 추출한다.",
          "첫 번째 원소는 무작위로 선택하고 이후 매 k번째 원소를 추출한다.",
          "모집단에 주기성이 존재하는 경우 특정 특성만 과대/과소 추출되는 편향 위험이 있다."
        ],
        confusingConcept: "단순무작위추출 vs 계통표본추출 (계통추출은 '간격 k'라는 명확한 규칙이 존재합니다).",
        comparisonTable: {
          headers: ["구분", "계통표본추출", "단순무작위추출"],
          rows: [
            ["추출 방법", "첫 번호 무작위 + 매 k번째 추출", "모든 번호를 난수로 각각 추출"],
            ["장점", "표본 추출이 매우 간편하고 빠름", "주기성에 영향받지 않고 완벽한 독립성"],
            ["치명적 약점", "모집단의 주기성(Cycle)과 간격이 일치하면 편향 발생", "대규모 모집단에서 일일이 난수 부여가 번거로움"]
          ]
        },
        memorizationRule: "계통 ➔ 일정한 간격 k (첫 번째만 랜덤, 이후 간격 유지, 주기성 위험!)",
        traps: [
          "함정 선지: '계통표본추출은 모집단에 주기성이 있어도 표본의 대표성이 완벽히 유지된다' ➔ 거짓! 주기성과 간격이 겹치면 치명적 편향이 발생합니다.",
          "함정 선지: '모든 표본을 완전히 독립적인 난수로 각각 추출한다' ➔ 단순무작위 설명입니다."
        ],
        threeSecKey: "지문에 '일정한 간격', '매 k번째', '주기성 편향'이 나오면 ➔ 계통표본추출!",
        questions: [
          {
            qId: "q1-2-1",
            level: 1,
            questionText: "10,000명의 고객 목록에서 500명의 표본을 추출하고자 한다. 1부터 20 사이에서 난수를 하나 발생시켜 첫 번째 고객을 7번으로 정한 후, 매 20번째마다(27번, 47번, 67번...) 고객을 추출하는 표본추출 기법은?",
            options: [
              "① 단순무작위추출",
              "② 계통표본추출",
              "③ 층화표본추출",
              "④ 군집표본추출"
            ],
            correctAnswer: 1,
            reasonKeywords: ["일정한 간격(매 20번째)", "첫 번째만 난수 후 간격 추출"],
            explanation: {
              correctReason: "간격 k(= 10,000 / 500 = 20)를 설정하고 첫 표본(7번) 선정 후 일정한 간격 20마다 추출하는 방법은 전형적인 '계통표본추출(Systematic Sampling)'입니다.",
              wrongBreakdowns: [
                "① 단순무작위: 500개 번호를 모두 제각각 난수로 뽑아야 합니다.",
                "③ 층화표본추출: 고객을 연령대나 성별로 분류한 뒤 각 층에서 뽑아야 합니다.",
                "④ 군집표본추출: 특정 지역이나 지점 자체를 뽑아 전수조사해야 합니다."
              ]
            }
          }
        ]
      },
      {
        id: "c1-3-stratified",
        name: "층화표본추출",
        engName: "Stratified Sampling",
        oneLineDef: "모집단을 서로 겹치지 않는 동질적인 하위 집단(층)으로 분할한 후, '각 층(집단)에서' 무작위로 표본을 추출하는 방법.",
        easyExplain: "전교생을 1학년, 2학년, 3학년으로 나눈 뒤, 각 학년마다 골고루 20명씩 뽑아서 전교생의 의견을 대표하게 만드는 방식입니다.",
        analogy: "과일 바구니에서 사과 층, 배 층, 귤 층을 만들고, 사과에서 2개, 배에서 2개, 귤에서 2개씩 골고루 꺼내는 것과 같습니다.",
        superEasyAnalogy: "남학생 100명, 여학생 100명이 있을 때 남학생 방에서 10명, 여학생 방에서 10명을 각각 뽑는 것입니다.",
        keywords: ["각 층에서 무작위 추출", "층 내 동질적, 층 간 이질적", "비례/불비례 층화", "집단 내 동질"],
        examExpressions: [
          "모집단을 여러 개의 이질적인 층으로 구분하고, 각 층 내부는 동질적이다.",
          "각 집단(층)에서 표본을 무작위로 추출한다.",
          "모집단의 비율에 맞추어 표본을 추출하는 비례 층화추출을 적용할 수 있다."
        ],
        confusingConcept: "군집표본추출 (층화는 '각 집단에서' 일부씩 뽑고, 군집은 '집단 자체를' 통째로 뽑습니다!).",
        comparisonTable: {
          headers: ["구분", "층화표본추출 (Stratified)", "군집표본추출 (Cluster)"],
          rows: [
            ["추출 단위", "각 층(집단) 내부에서 일부 표본 추출", "군집(집단) 자체를 무작위 선택하여 전수조사"],
            ["집단 내부 특성", "층 내부는 동질적 (예: 1학년끼리 동질)", "군집 내부는 이질적 (예: 한 학교 안에 1,2,3학년 다 있음)"],
            ["집단 간 특성", "층끼리는 이질적 (1학년 vs 2학년 vs 3학년)", "군집끼리는 동질적 (A학교 ≈ B학교 ≈ C학교)"],
            ["핵심 목적", "표본의 대표성 및 추정 정밀도 극대화", "조사 비용 및 시간 절약"]
          ]
        },
        memorizationRule: "층화 ➔ 각 층에서 뽑기! (층 내 동질, 층 간 이질)",
        traps: [
          "함정 선지: '층화추출에서 층 내부는 이질적이고 층 간은 동질적이다' ➔ 완벽한 거짓! 층 내부는 '동질적', 층 간은 '이질적'입니다.",
          "함정 선지: '모집단에서 특정 군집을 무작위로 선택하여 해당 군집 전체를 조사한다' ➔ 군집추출 설명입니다."
        ],
        threeSecKey: "지문에 '각 집단에서 무작위 추출', '층 내 동질, 층 간 이질', '비례 층화'가 나오면 ➔ 층화표본추출!",
        questions: [
          {
            qId: "q1-3-1",
            level: 1,
            questionText: "모집단을 특성에 따라 여러 개의 하위 집단으로 분류할 때, 하위 집단 내부는 동질적이고 집단 간에는 이질적이 되도록 구성한 후, '각 집단에서' 무작위로 표본을 추출하는 기법은?",
            options: [
              "① 군집표본추출 (Cluster Sampling)",
              "② 층화표본추출 (Stratified Sampling)",
              "③ 계통표본추출 (Systematic Sampling)",
              "④ 판단표본추출 (Judgment Sampling)"
            ],
            correctAnswer: 1,
            reasonKeywords: ["각 집단에서 무작위 추출", "집단 내 동질, 집단 간 이질"],
            explanation: {
              correctReason: "모집단을 층(하위집단)으로 나누고 '각 집단에서' 표본을 추출하며, '층 내 동질, 층 간 이질'을 만족하는 기법은 '층화표본추출(Stratified Sampling)'입니다.",
              wrongBreakdowns: [
                "① 군집표본추출: '집단 자체를 무작위 선택'하며, 군집 내부는 이질적이고 군집 간은 동질적이어야 합니다.",
                "③ 계통표본추출: 일정한 간격 k마다 추출하는 방식입니다.",
                "④ 판단표본추출: 연구자의 주관적 판단으로 뽑는 비확률추출법입니다."
              ]
            }
          },
          {
            qId: "q1-3-2",
            level: 2,
            questionText: "표본추출 기법에 관한 설명 중 출제자의 함정이 포함된 보기이다. 가장 옳지 않은 것은?",
            options: [
              "① 층화표본추출은 단순무작위추출보다 표본오차를 줄이고 대표성을 높일 수 있다.",
              "② 층화표본추출 시 각 층의 크기에 비례하여 표본 수를 배분하는 방식을 비례 층화추출이라 한다.",
              "③ 층화표본추출은 층 내부가 최대한 이질적이고 층 간에는 동질적이 되도록 집단을 구분해야 효과적이다.",
              "④ 군집표본추출은 조사 비용과 시간을 크게 절약할 수 있으나 층화추출에 비해 표본오차가 커질 위험이 있다."
            ],
            correctAnswer: 2,
            reasonKeywords: ["층화추출은 층 내 동질, 층 간 이질이어야 함"],
            explanation: {
              correctReason: "③번이 대표적인 단골 함정 선지입니다! 층화표본추출은 '층 내부는 동질적(같은 성격끼리 모음)', '층 간은 이질적(층끼리는 서로 다름)'이어야 표본오차가 최소화됩니다. 군집추출과 정반대로 설명되어 있으므로 틀렸습니다.",
              wrongBreakdowns: [
                "① 맞음: 골고루 추출하므로 단순랜덤보다 분산이 작고 대표성이 높습니다.",
                "② 맞음: 모집단 비율에 맞추어 표본 수를 나누는 것을 비례 층화추출이라 합니다.",
                "④ 맞음: 군집추출은 현장 조사가 쉬워 비용이 절약되지만 표본오차는 상대적으로 큽니다."
              ]
            }
          }
        ]
      },
      {
        id: "c1-4-cluster",
        name: "군집표본추출",
        engName: "Cluster Sampling",
        oneLineDef: "모집단을 여러 개의 군집(Cluster)으로 나눈 뒤, '군집 자체를' 무작위로 선택하여 선정된 군집의 구성원을 전수 조사하거나 표본을 추출하는 방법.",
        easyExplain: "전국의 모든 초등학교 학생을 조사하기 어려우니, 전국 학교 중 5개 학교를 제비뽑기로 뽑아서 그 5개 학교의 전교생을 조사하는 방식입니다.",
        analogy: "귤 상자 100개가 있을 때 귤을 하나씩 낱개로 꺼내지 않고, 3개의 상자 자체를 무작위로 골라 그 상자 안의 귤을 전부 확인하는 것과 같습니다.",
        superEasyAnalogy: "아파트 101동, 102동, 103동... 중 105동 하나만 무작위로 뽑아서 105동 주민 전체를 설문조사하는 것입니다.",
        keywords: ["군집 자체를 무작위 선택", "군집 내 이질적, 군집 간 동질적", "비용/시간 절약", "다단계 추출"],
        examExpressions: [
          "모집단을 여러 개의 소그룹(군집)으로 나누고, 무작위로 몇 개의 군집을 선택한다.",
          "선택된 군집 내의 모든 대상을 전수 조사한다.",
          "지리적으로 넓게 분포된 모집단 조사 시 시간과 비용을 절감하기 위해 사용된다."
        ],
        confusingConcept: "층화표본추출 (층화는 '모든 층에서 조금씩' 뽑고, 군집은 '선택된 몇 개 군집만 통째로' 뽑습니다).",
        comparisonTable: {
          headers: ["비교 항목", "층화표본추출", "군집표본추출"],
          rows: [
            ["추출 슬로건", "각 집단에서 골고루 뽑기!", "집단 자체를 통째로 뽑기!"],
            ["조사 대상", "모든 층에서 표본이 반드시 포함됨", "선택되지 않은 군집은 조사 대상에서 완전히 제외됨"],
            ["내부 특성", "층 내부는 동질적 (Homogeneous)", "군집 내부는 이질적 (Heterogeneous)"],
            ["간 특성", "층 간은 이질적 (Heterogeneous)", "군집 간은 동질적 (Homogeneous)"]
          ]
        },
        memorizationRule: "군집 ➔ 군집 자체를 뽑기! (군집 내 이질, 군집 간 동질, 비용 절약)",
        traps: [
          "함정 선지: '군집표본추출은 모든 군집에서 표본을 골고루 추출한다' ➔ 거짓! 일부 군집만 뽑아 전수조사합니다.",
          "함정 선지: '군집 내부는 동질적이고 군집 간은 이질적이다' ➔ 층화추출 설명입니다. 군집은 '군집 내 이질, 군집 간 동질'입니다."
        ],
        threeSecKey: "지문에 '집단 자체를 무작위 선택', '군집 내 이질, 군집 간 동질', '비용과 시간 절약'이 나오면 ➔ 군집표본추출!",
        questions: [
          {
            qId: "q1-4-1",
            level: 1,
            questionText: "서울시 고등학생의 인터넷 이용 실태를 조사하기 위해, 서울시 내 전체 고등학교 목록 중 무작위로 10개 학교를 선정한 후 선정된 10개 학교의 학생 전원을 조사하는 표본추출 방법은?",
            options: [
              "① 단순무작위추출 (Simple Random Sampling)",
              "② 계통표본추출 (Systematic Sampling)",
              "③ 층화표본추출 (Stratified Sampling)",
              "④ 군집표본추출 (Cluster Sampling)"
            ],
            correctAnswer: 3,
            reasonKeywords: ["10개 학교(군집 자체)를 무작위 선정하여 전원 조사"],
            explanation: {
              correctReason: "학교라는 집단(군집) 자체를 무작위로 선택하여 해당 학교 학생 전원을 조사하는 방식은 전형적인 '군집표본추출(Cluster Sampling)'입니다.",
              wrongBreakdowns: [
                "① 단순무작위: 서울시 전체 고등학생 번호표에서 1,000명을 무작위 추첨해야 합니다.",
                "② 계통추출: 학생 명부에서 매 k번째 학생을 뽑아야 합니다.",
                "③ 층화추출: 서울시 모든 고등학교에서 각 학교마다 10명씩 골고루 뽑아야 합니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 2단계. 데이터 품질
  // ========================================================
  {
    stageId: 2,
    stageNumber: 2,
    title: "2단계. 데이터 품질 특성",
    subtitle: "정확성 · 완전성 · 일관성 · 유효성 · 적시성 5대 요소",
    icon: "💎",
    subjectNumber: 1,
    subjectName: "1과목 · 빅데이터 분석 기획",
    summaryTag: "실제값(정확) vs 결측없음(완전) vs 규칙준수(유효) vs 시스템일치(일관)",
    concepts: [
      {
        id: "c2-1-accuracy",
        name: "정확성 (Accuracy)",
        engName: "Accuracy",
        oneLineDef: "데이터의 값이 현실 세계에 존재하는 실제 참값(True Value)과 얼마나 일치하는지를 나타내는 특성.",
        easyExplain: "실제 내 나이가 25세인데 데이터베이스에도 정확히 '25'라고 적혀 있는 것을 말합니다.",
        analogy: "과녁의 정중앙에 화살이 정확하게 꽂힌 상태입니다.",
        superEasyAnalogy: "체중계에 올라갔을 때 내 실제 몸무게 70kg이 오차 없이 70kg으로 찍히는 것입니다.",
        keywords: ["실제 참값과 일치", "오류 없는 값", "현실 반영", "오차 최소화"],
        examExpressions: ["데이터가 실세계의 사실을 왜곡 없이 정확하게 반영하고 있는 정도"],
        confusingConcept: "유효성 Validity (유효성은 '형식과 규칙 준수'이고, 정확성은 '실제 참값 일치'입니다. 예: 주민번호 형식은 맞으나 남의 번호면 유효하지만 부정확).",
        comparisonTable: {
          headers: ["구분", "정확성 (Accuracy)", "유효성 (Validity)"],
          rows: [
            ["질문", "실제 참값과 맞는가?", "정해진 형식/도메인 규칙을 지키는가?"],
            ["예시", "실제 주소지가 서울인데 DB에도 '서울'로 기록됨", "생년월일이 YYYY-MM-DD 포맷(2025-02-30은 날짜 오류로 유효성 위배)"]
          ]
        },
        memorizationRule: "정확성 ➔ 실제 값과 맞는가? (참값 일치)",
        traps: ["형식에 맞게 입력되었다고 해서 반드시 정확한 것은 아닙니다."],
        threeSecKey: "지문에 '실제 참값과 일치', '현실 세계의 사실 반영'이 나오면 ➔ 정확성(Accuracy)!",
        questions: [
          {
            qId: "q2-1-1",
            level: 1,
            questionText: "데이터 품질 관리 지표 중, 데이터베이스에 저장된 데이터의 값이 현실 세계의 실제 객체나 사건의 참값(True Value)과 오차 없이 일치하는 정도를 의미하는 것은?",
            options: ["① 완전성 (Completeness)", "② 정확성 (Accuracy)", "③ 일관성 (Consistency)", "④ 유효성 (Validity)"],
            correctAnswer: 1,
            reasonKeywords: ["실제 참값(True Value)과 일치"],
            explanation: {
              correctReason: "실세계의 참값과 데이터의 일치 여부를 나타내는 지표는 '정확성(Accuracy)'입니다.",
              wrongBreakdowns: [
                "① 완전성: 누락되거나 빠진 필수 데이터가 없는 정도입니다.",
                "③ 일관성: 여러 시스템 간 데이터가 모순 없이 동일한 정도입니다.",
                "④ 유효성: 데이터 형식, 범위, 비즈니스 규칙을 준수하는 정도입니다."
              ]
            }
          }
        ]
      },
      {
        id: "c2-2-completeness",
        name: "완전성 (Completeness)",
        engName: "Completeness",
        oneLineDef: "업무 수행 및 분석에 필요한 필수 데이터 항목에 누락(결측값, Null)이나 공백이 없는 정도.",
        easyExplain: "회원가입 양식에서 이름, 전화번호, 이메일 등 필수 입력 항목이 하나도 빠짐없이 꽉 채워져 있는 상태입니다.",
        analogy: "직소 퍼즐 1,000 피스 중 단 한 조각도 잃어버리지 않고 1,000개가 온전히 다 있는 상태입니다.",
        superEasyAnalogy: "주문서에 배송지 주소가 빈칸(Null) 없이 완벽히 적혀 있는 것입니다.",
        keywords: ["누락 없음", "결측치(Null) 부재", "필수 항목 충족", "빈값 없음"],
        examExpressions: ["필수적인 데이터 항목에 결측이나 공백 없이 온전하게 채워져 있는 정도"],
        confusingConcept: "정확성 (값이 채워져 있어 완전하더라도, 엉뚱한 가짜 정보라면 완전하지만 부정확합니다).",
        comparisonTable: {
          headers: ["구분", "완전성 (Completeness)", "일관성 (Consistency)"],
          rows: [
            ["핵심 점검", "빠진 값(Null)이 없는가?", "여러 곳의 데이터가 서로 모순되지 않는가?"],
            ["오류 사례", "고객 테이블의 전화번호 칼럼이 빈칸(NULL)임", "영업 시스템의 고객 주소와 배송 시스템의 고객 주소가 서로 다름"]
          ]
        },
        memorizationRule: "완전성 ➔ 빠진 값(Null)이 없는가?",
        traps: ["함정 선지: '데이터가 정해진 규칙을 만족한다' ➔ 유효성입니다."],
        threeSecKey: "지문에 '누락/결측 없음', '필수값 충족', '온전한 보존'이 나오면 ➔ 완전성(Completeness)!",
        questions: [
          {
            qId: "q2-2-1",
            level: 1,
            questionText: "데이터 품질 기준 중 고객 데이터베이스에서 필수 입력 항목인 '휴대전화번호' 및 '주소' 필드에 결측값(NULL)이 존재하지 않고 온전하게 저장되어 있는 비율을 측정하는 지표는?",
            options: ["① 적시성 (Timeliness)", "② 유효성 (Validity)", "③ 완전성 (Completeness)", "④ 일관성 (Consistency)"],
            correctAnswer: 2,
            reasonKeywords: ["결측값(NULL) 없이 온전하게 저장"],
            explanation: {
              correctReason: "필수 데이터 항목이 결측 없이 온전히 채워진 상태를 측정하는 것은 '완전성(Completeness)'입니다.",
              wrongBreakdowns: [
                "① 적시성: 요구되는 시점에 최신 데이터가 제공되는지 여부입니다.",
                "② 유효성: 전화번호 포맷(010-XXXX-XXXX) 형식을 지켰는지 여부입니다.",
                "④ 일관성: 다른 시스템 간 데이터 충돌이 없는지 여부입니다."
              ]
            }
          }
        ]
      },
      {
        id: "c2-3-consistency",
        name: "일관성 (Consistency)",
        engName: "Consistency",
        oneLineDef: "동일한 의미를 갖는 데이터가 서로 다른 시스템, 테이블, 또는 시점 간에 모순이나 충돌 없이 동일하게 유지되는 정도.",
        easyExplain: "내 주소를 은행 앱에서 바꿨을 때 카드 앱, 보험 앱에서도 똑같은 새 주소로 모순 없이 일치하는 상태입니다.",
        analogy: "집에 있는 벽시계와 내 손목시계, 스마트폰 시계가 모두 정확히 같은 시간을 가리키고 있는 것과 같습니다.",
        superEasyAnalogy: "내 전화번호가 인사팀 명부와 사내 메신저 프로필에 똑같이 적혀 있는 것입니다.",
        keywords: ["시스템 간 모순 없음", "데이터 충돌 부재", "상호 일치", "연계 정합성"],
        examExpressions: [
          "동일한 데이터가 여러 시스템이나 데이터베이스 간에 상호 모순 없이 일치하는 정도",
          "데이터 간의 논리적 연결과 관계에 충돌이 없는 상태"
        ],
        confusingConcept: "유효성 (유효성은 개별 데이터 1건의 형식 준수, 일관성은 여러 시스템/테이블 간의 상호 일치).",
        comparisonTable: {
          headers: ["품질 요소", "핵심 질문", "시험장 3초 키워드"],
          rows: [
            ["정확성", "실제 참값과 맞는가?", "참값(True Value) 일치"],
            ["완전성", "빠진 값이 없는가?", "결측치(Null) 없음"],
            ["일관성", "여러 시스템 간 값이 같은가?", "모순 없음, 상호 일치"],
            ["유효성", "규칙과 형식을 지켰는가?", "포맷/도메인/유효범위 준수"],
            ["적시성", "최신 데이터인가?", "필요한 시점, 최신성 유지"]
          ]
        },
        memorizationRule: "일관성 ➔ 여러 시스템의 값이 모순 없이 같은가?",
        traps: ["'값의 형식이 맞다'는 일관성이 아니라 유효성입니다."],
        threeSecKey: "지문에 '여러 시스템 간 모순 없음', '상호 일치'가 나오면 ➔ 일관성(Consistency)!",
        questions: [
          {
            qId: "q2-3-1",
            level: 1,
            questionText: "기업 내 CRM 시스템의 고객 등급 정보와 ERP 시스템에 저장된 고객 등급 정보가 서로 모순되거나 충돌하지 않고 동일하게 유지되는 데이터 품질 특성은?",
            options: ["① 유효성 (Validity)", "② 적시성 (Timeliness)", "③ 정확성 (Accuracy)", "④ 일관성 (Consistency)"],
            correctAnswer: 3,
            reasonKeywords: ["CRM과 ERP 등 여러 시스템 간 모순 없이 동일 유지"],
            explanation: {
              correctReason: "다양한 시스템 간에 동일 데이터가 상호 충돌 없이 일치하는 품질 요소는 '일관성(Consistency)'입니다.",
              wrongBreakdowns: [
                "① 유효성: 등급 코드가 허용된 규칙(VIP, GOLD, SILVER) 내에 있는지 여부입니다.",
                "② 적시성: 변경된 등급이 지연 없이 즉시 반영되었는지 여부입니다.",
                "③ 정확성: 해당 고객의 실제 구매 실적에 따른 진짜 등급과 맞는지 여부입니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 3단계. 통계 검정
  // ========================================================
  {
    stageId: 3,
    stageNumber: 3,
    title: "3단계. 통계적 가설검정",
    subtitle: "정규성 검정 · t-검정 · 비모수 검정 선택 트리",
    icon: "📊",
    subjectNumber: 2,
    subjectName: "2과목 · 데이터 탐색",
    summaryTag: "집단 수 ➔ 독립/대응 ➔ 정규성 만족 여부 ➔ 검정법 결정",
    concepts: [
      {
        id: "c3-1-normality",
        name: "정규성 검정",
        engName: "Normality Test (Shapiro-Wilk, K-S, Q-Q Plot)",
        oneLineDef: "수집된 표본 데이터가 정규분포(Normal Distribution)를 따르는 모집단으로부터 추출되었는지를 통계적으로 검증하는 방법.",
        easyExplain: "t-검정이나 분산분석 같은 표준 통계 기법(모수 검정)을 쓰기 전에, 데이터가 '종 모양 정규분포' 규칙을 잘 지키고 있는지 입장 검사를 하는 것입니다.",
        analogy: "놀이공원에서 롤러코스터를 타기 전 키 제한(정규성)을 통과하는지 먼저 재보는 것과 같습니다.",
        superEasyAnalogy: "시험 점수 분포가 가운데가 불룩하고 양쪽이 완만한 예쁜 종 모양인지 그래프와 수치로 확인하는 것입니다.",
        keywords: ["Shapiro-Wilk (샤피로-윌크, 소표본)", "Kolmogorov-Smirnov (K-S, 대표본)", "Q-Q Plot (시각적 직선)", "귀무가설: 정규분포를 따른다"],
        examExpressions: [
          "샤피로-윌크(Shapiro-Wilk) 검정은 소표본(일반적으로 n < 2,000)의 정규성 검정에 적합하다.",
          "Q-Q Plot에서 점들이 45도 대각선에 가까울수록 정규성을 만족한다고 판단한다.",
          "정규성 검정의 귀무가설($H_0$)은 '데이터가 정규분포를 따른다'이며, p-value > 0.05이면 정규성을 만족한다."
        ],
        confusingConcept: "등분산성 검정 Levene Test (정규성 검정은 정규분포 여부, 등분산성 검정은 집단 간 분산 일치 여부입니다).",
        comparisonTable: {
          headers: ["도구/검정법", "유형", "주요 특징 및 표본 크기"],
          rows: [
            ["Q-Q Plot", "시각적 그래프", "점들이 45도 대각선 직선상에 위치할수록 정규성 만족"],
            ["Shapiro-Wilk", "수치적 가설검정", "소규모 표본(n < 2,000)에서 검정력이 가장 우수"],
            ["Kolmogorov-Smirnov", "수치적 가설검정", "표본 데이터의 누적분포와 이론적 정규분포의 최대 차이 검정 (대표본)"]
          ]
        },
        memorizationRule: "정규성 ➔ 샤피로(소표본) / K-S(대표본) / Q-Q Plot(대각선 직선)",
        traps: [
          "함정 선지: '정규성 검정에서 p-value < 0.05이면 정규분포를 따른다' ➔ 거짓! p-value가 0.05보다 커야 귀무가설(정규성)을 채택합니다.",
          "함정 선지: 't-검정은 정규성을 만족하지 않아도 언제나 모수 검정으로 수행할 수 있다' ➔ 비모수 검정(맨-휘트니, 윌콕슨)을 써야 합니다."
        ],
        threeSecKey: "지문에 'Shapiro-Wilk', 'K-S', 'Q-Q Plot 45도 직선'이 나오면 ➔ 정규성 검정!",
        questions: [
          {
            qId: "q3-1-1",
            level: 1,
            questionText: "표본 데이터의 정규성(Normality) 만족 여부를 판별하기 위한 방법으로 가장 거리가 먼 것은?",
            options: [
              "① Shapiro-Wilk Test",
              "② Kolmogorov-Smirnov Test",
              "③ Q-Q Plot (Quantile-Quantile Plot)",
              "④ Durbin-Watson Test"
            ],
            correctAnswer: 3,
            reasonKeywords: ["Durbin-Watson은 회귀분석 잔차의 자기상관(독립성) 검정"],
            explanation: {
              correctReason: "④번 더빈-왓슨(Durbin-Watson) 검정은 회귀분석에서 잔차의 '자기상관성(독립성)'을 검정하는 도구이며, 정규성 검정 도구가 아닙니다.",
              wrongBreakdowns: [
                "① Shapiro-Wilk: 대표적인 소표본 정규성 검정법입니다.",
                "② Kolmogorov-Smirnov: 대표본 경험 누적분포 기반 정규성 검정법입니다.",
                "③ Q-Q Plot: 잔차나 데이터가 정규분포를 따르는지 시각적으로 직선 여부를 확인하는 플롯입니다."
              ]
            }
          }
        ]
      },
      {
        id: "c3-2-ttest-tree",
        name: "2집단 평균 비교 검정 선택 트리",
        engName: "Two-sample Hypothesis Test Tree (t-Test vs Non-parametric)",
        oneLineDef: "비교하고자 하는 두 집단의 성격(독립 vs 대응)과 데이터의 정규성 충족 여부에 따라 모수적(t-검정) 또는 비모수적 검정법을 선택하는 체계.",
        easyExplain: "남학생 vs 여학생처럼 서로 다른 두 집단을 비교하는지, 다이어트 약 복용 전 vs 후처럼 같은 사람을 두 번 잰 것인지, 그리고 정규분포를 따르는지에 따라 알맞은 검정 도구를 고르는 것입니다.",
        analogy: "환자의 증상(독립/대응)과 체질(정규성 유무)에 따라 양약(모수 검정)을 처방할지 한약(비모수 검정)을 처방할지 고르는 것과 같습니다.",
        superEasyAnalogy: "서로 다른 A반 vs B반 시험 점수 비교(독립)냐, A반 학생들의 중간고사 vs 기말고사 비교(대응)냐를 구분하는 것입니다.",
        keywords: ["독립 2집단", "대응표본 (Paired)", "모수 (t-test)", "비모수 (Mann-Whitney, Wilcoxon)"],
        examExpressions: [
          "독립된 두 집단의 평균 차이 검정 시 정규성을 만족하면 독립표본 t-검정, 만족하지 않으면 맨-휘트니 U 검정(Mann-Whitney U Test)을 적용한다.",
          "동일 대상의 사전-사후(대응) 비교 시 정규성을 만족하면 대응표본 t-검정, 만족하지 않으면 윌콕슨 부호순위 검정(Wilcoxon Signed-Rank Test)을 적용한다."
        ],
        confusingConcept: "Mann-Whitney U vs Wilcoxon Signed-Rank (Mann-Whitney는 독립 2집단 비모수, Wilcoxon Signed-Rank는 대응 2집단 비모수입니다).",
        comparisonTable: {
          headers: ["집단 관계", "정규성 만족 (모수 검정)", "정규성 미만족 (비모수 검정)"],
          rows: [
            ["독립 2집단 (서로 다른 두 집단)", "독립표본 t-검정 (Two-sample t-test)", "맨-휘트니 U 검정 (Mann-Whitney U Test)"],
            ["대응 2집단 (동일 대상 전/후)", "대응표본 t-검정 (Paired t-test)", "윌콕슨 부호순위 검정 (Wilcoxon Signed-Rank)"]
          ]
        },
        memorizationRule: "독립+정규성X ➔ 맨-휘트니(Mann-Whitney) / 대응+정규성X ➔ 윌콕슨(Wilcoxon Signed-Rank)",
        traps: [
          "함정 선지: '동일 집단의 전-후 비교에서 정규성을 만족하지 못할 때 맨-휘트니 U 검정을 쓴다' ➔ 거짓! 대응표본 비모수는 '윌콕슨 부호순위 검정'입니다."
        ],
        threeSecKey: "독립 2집단 비모수 ➔ 맨-휘트니 / 대응(전후) 비모수 ➔ 윌콕슨 부호순위!",
        questions: [
          {
            qId: "q3-2-1",
            level: 1,
            questionText: "신약 투약 전과 투약 후 동일 환자 20명의 혈압 변화를 비교하고자 한다. 표본의 크기가 작고 Shapiro-Wilk 정규성 검정 결과 p-value가 0.01로 나타나 정규성을 만족하지 못할 때, 가장 적절한 가설검정 방법은?",
            options: [
              "① 독립표본 t-검정 (Two-sample t-test)",
              "② 대응표본 t-검정 (Paired t-test)",
              "③ 맨-휘트니 U 검정 (Mann-Whitney U test)",
              "④ 윌콕슨 부호순위 검정 (Wilcoxon Signed-Rank test)"
            ],
            correctAnswer: 3,
            reasonKeywords: ["동일 대상 전-후(대응표본)", "정규성 미만족(비모수)"],
            explanation: {
              correctReason: "동일 환자의 투약 전-후 비교는 '대응(Paired)' 관계이며, p-value=0.01 < 0.05로 정규성을 기각하므로 '비모수 검정'인 '윌콕슨 부호순위 검정(Wilcoxon Signed-Rank test)'을 사용해야 합니다.",
              wrongBreakdowns: [
                "① 독립표본 t-검정: 서로 다른 독립 2집단이면서 정규성을 만족할 때 사용합니다.",
                "② 대응표본 t-검정: 대응 관계이지만 정규성을 만족할 때 사용합니다.",
                "③ 맨-휘트니 U 검정: 서로 다른 독립 2집단이면서 정규성을 만족하지 못할 때 사용합니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 4단계. 분류 평가 지표
  // ========================================================
  {
    stageId: 4,
    stageNumber: 4,
    title: "4단계. 분류 모델 평가 지표",
    subtitle: "혼동행렬 · 정밀도 · 재현율 · 특이도 · ROC/AUC 완벽 정복",
    icon: "📐",
    subjectNumber: 4,
    subjectName: "4과목 · 빅데이터 결과 해석",
    summaryTag: "예측 양성 중(정밀도) vs 실제 양성 중(민감도/재현율) vs 실제 음성 중(특이도)",
    concepts: [
      {
        id: "c4-1-metrics",
        name: "정밀도, 재현율, 특이도 분모 구분법",
        engName: "Precision, Recall/Sensitivity, Specificity",
        oneLineDef: "이진 분류 모델의 혼동행렬(Confusion Matrix)에서 분모의 기준(실제값 vs 모델 예측값)에 따라 분류 성능을 측정하는 핵심 지표들.",
        easyExplain: "공식을 외우려 하지 말고 '분모가 무엇을 기준으로 삼는가'를 기억하세요. 모델이 양성이라고 우긴 것 중 맞춘 비율(정밀도) vs 진짜 양성 환자 중 모델이 찾아낸 비율(재현율)입니다.",
        analogy: "스팸 메일 필터(정밀도 중요: 중요한 일반 메일을 스팸으로 오분류하면 큰일) vs 암 환자 진단(재현율 중요: 진짜 암 환자를 놓치면 환자 사망).",
        superEasyAnalogy: "사냥꾼이 쏜 총알 10발 중 명중한 비율(정밀도) vs 숲속에 있던 사슴 10마리 중 잡은 비율(재현율).",
        keywords: [
          "정밀도(Precision): 예측 Positive 중 실제 Positive (TP / (TP+FP))",
          "재현율/민감도(Recall/Sensitivity): 실제 Positive 중 예측 Positive (TP / (TP+FN))",
          "특이도(Specificity): 실제 Negative 중 예측 Negative (TN / (TN+FP))",
          "F1-Score: 정밀도와 재현율의 조화평균"
        ],
        examExpressions: [
          "모델이 양성(Positive)으로 예측한 대상 중 실제 양성인 비율은 정밀도(Precision)이다.",
          "실제 양성(Positive)인 대상 중에서 모델이 양성으로 올바르게 감지한 비율은 재현율(Recall) 또는 민감도(Sensitivity)이다.",
          "실제 음성(Negative)인 대상 중에서 모델이 음성으로 올바르게 예측한 비율은 특이도(Specificity)이다."
        ],
        confusingConcept: "정밀도 vs 재현율 (정밀도는 분모가 '예측 양성(TP+FP)', 재현율은 분모가 '실제 양성(TP+FN)').",
        comparisonTable: {
          headers: ["지표명", "분모의 의미 (기준)", "공식", "중요 적용 분야"],
          rows: [
            ["정밀도 (Precision)", "모델이 '양성'이라고 예측한 전체 (TP + FP)", "TP / (TP + FP)", "스팸 메일 필터링, 검색 엔진"],
            ["재현율 / 민감도 (Recall)", "실제 '양성'인 데이터 전체 (TP + FN)", "TP / (TP + FN)", "암 진단, 금융 사기(FDS) 탐지"],
            ["특이도 (Specificity)", "실제 '음성'인 데이터 전체 (TN + FP)", "TN / (TN + FP)", "정상인을 정상으로 판정하는 능력"],
            ["위양성률 (FPR)", "1 - 특이도 (실제 음성 중 양성 오분류)", "FP / (TN + FP)", "ROC 곡선의 X축 지표"]
          ]
        },
        memorizationRule: "예측 양성 중 ➔ 정밀도 / 실제 양성 중 ➔ 민감도(Recall) / 실제 음성 중 ➔ 특이도",
        traps: [
          "함정 선지: '암 진단 모델에서는 정밀도가 재현율보다 훨씬 중요하다' ➔ 거짓! 암 환자를 음성으로 놓치는 FN이 치명적이므로 '재현율'이 최우선입니다.",
          "함정 선지: 'F1-Score는 정밀도와 재현율의 산술평균이다' ➔ 거짓! 산술평균이 아니라 '조화평균'입니다."
        ],
        threeSecKey: "분모가 '예측 양성'이면 정밀도, 분모가 '실제 양성'이면 재현율(민감도), 분모가 '실제 음성'이면 특이도!",
        questions: [
          {
            qId: "q4-1-1",
            level: 1,
            questionText: "분류 모델의 혼동 행렬에서 TP=80, FP=20, FN=10, TN=90일 때, '모델이 양성(Positive)으로 예측한 것 중에서 실제 양성인 비율'을 나타내는 정밀도(Precision)의 값은?",
            options: ["① 0.80", "② 0.88", "③ 0.85", "④ 0.90"],
            correctAnswer: 0,
            reasonKeywords: ["정밀도 = TP / (TP + FP) = 80 / (80 + 20) = 0.80"],
            explanation: {
              correctReason: "정밀도(Precision)는 '예측 양성 중 실제 양성' 비율이므로 공식은 TP / (TP + FP) = 80 / (80 + 20) = 80 / 100 = 0.80 입니다.",
              wrongBreakdowns: [
                "② 0.88: 재현율(Recall) = TP / (TP + FN) = 80 / 90 ≈ 0.888 입니다.",
                "③ 0.85: 정확도(Accuracy) = (TP + TN) / 전체 = 170 / 200 = 0.85 입니다.",
                "④ 0.90: 특이도(Specificity) = TN / (TN + FP) = 90 / 110 ≈ 0.818 입니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 5단계. 파라미터 vs 하이퍼파라미터
  // ========================================================
  {
    stageId: 5,
    stageNumber: 5,
    title: "5단계. 파라미터 vs 하이퍼파라미터",
    subtitle: "학습 중 자동 결정 vs 학습 전 사용자 설정 완벽 구분",
    icon: "⚙️",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "모델이 학습(파라미터) vs 사용자가 직접 설정(하이퍼파라미터)",
    concepts: [
      {
        id: "c5-1-params",
        name: "파라미터와 하이퍼파라미터 구분",
        engName: "Parameters vs Hyperparameters",
        oneLineDef: "파라미터는 데이터 학습을 통해 모델 내부에서 자동으로 결정되는 값이고, 하이퍼파라미터는 모델 학습 전에 사용자가 직접 외부에서 지정하는 설정값.",
        easyExplain: "자동차 엔진이 주행하면서 스스로 조절하는 연료 분사량(파라미터) vs 운전자가 출발 전에 손으로 맞추는 에어컨 온도나 내비게이션 목적지(하이퍼파라미터).",
        analogy: "시험 공부를 하면서 머릿속에 쌓이는 지식의 양(파라미터) vs 공부를 시작하기 전에 내가 정하는 공부 시간, 책 권수(하이퍼파라미터).",
        superEasyAnalogy: "오븐이 요리하면서 내부 열선에 가하는 전력량(파라미터) vs 사용자가 다이얼로 맞추는 180도, 20분 설정(하이퍼파라미터).",
        keywords: [
          "파라미터: 가중치(Weight), 편향(Bias), 회귀 계수",
          "하이퍼파라미터: 학습률(Learning Rate), 은닉층 수, 뉴런 수, 트리 깊이(Max Depth), KNN의 K, 규제 강도(C, Alpha)"
        ],
        examExpressions: [
          "모델 학습 전에 분석가가 직접 설정해야 하는 값은 하이퍼파라미터(Hyperparameter)이다.",
          "경사하강법 등 최적화 알고리즘에 의해 데이터로부터 자동으로 학습되는 매개변수는 파라미터(Parameter)이다."
        ],
        confusingConcept: "가중치 w (파라미터) vs 학습률 lr (하이퍼파라미터).",
        comparisonTable: {
          headers: ["구분", "파라미터 (Parameter)", "하이퍼파라미터 (Hyperparameter)"],
          rows: [
            ["결정 주체", "데이터 학습을 통해 알고리즘이 자동 결정", "학습 시작 전 분석가(사용자)가 직접 수동 설정"],
            ["결정 시점", "모델 학습(Training) 도중", "모델 학습(Training) 시작 전"],
            ["대표 예시", "인공신경망 가중치(W) 및 편향(b), 선형회귀 기울기 및 절편", "학습률(Learning Rate), 배치 크기, 에포크, 의사결정나무 최대 깊이, K-means의 K"]
          ]
        },
        memorizationRule: "학습 전 사용자가 직접 설정 ➔ 무조건 하이퍼파라미터!",
        traps: [
          "함정 선지: '인공신경망의 가중치(Weight)는 분석가가 모델 학습 전에 최적값으로 직접 설정해야 한다' ➔ 거짓! 가중치는 모델이 역전파로 스스로 학습하는 파라미터입니다."
        ],
        threeSecKey: "지문에 '학습 전에 사용자가 설정', '튜닝 대상'이 나오면 ➔ 하이퍼파라미터!",
        questions: [
          {
            qId: "q5-1-1",
            level: 1,
            questionText: "머신러닝 및 딥러닝 모델에서 '하이퍼파라미터(Hyperparameter)'에 해당하는 것만을 모두 고른 것은?\n[ㄱ. 신경망의 가중치(Weight)  ㄴ. 학습률(Learning Rate)  ㄷ. 선형회귀의 절편(Bias)  ㄹ. 의사결정나무의 최대 깊이(Max Depth)  ㅁ. KNN의 이웃 수(K)]",
            options: [
              "① ㄱ, ㄷ",
              "② ㄴ, ㄹ, ㅁ",
              "③ ㄱ, ㄴ, ㄹ",
              "④ ㄷ, ㄹ, ㅁ"
            ],
            correctAnswer: 1,
            reasonKeywords: ["학습 전 사용자가 설정하는 값은 학습률, 트리 깊이, K"],
            explanation: {
              correctReason: "ㄴ. 학습률, ㄹ. 트리 최대 깊이, ㅁ. KNN의 K는 모두 학습 시작 전에 분석가가 직접 지정하는 '하이퍼파라미터'입니다. ㄱ(가중치)과 ㄷ(절편)은 학습 도중 최적화되는 '파라미터'입니다.",
              wrongBreakdowns: [
                "① ㄱ, ㄷ: 모델 내부 파라미터입니다.",
                "③ ㄱ 포함 오류: 가중치는 파라미터입니다.",
                "④ ㄷ 포함 오류: 절편은 파라미터입니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 6단계. 과소적합과 과대적합
  // ========================================================
  {
    stageId: 6,
    stageNumber: 6,
    title: "6단계. 과소적합 vs 과대적합",
    subtitle: "Underfitting · Overfitting · 학습 곡선 완벽 판별",
    icon: "📈",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "공부 부족(과소적합) vs 기출만 달달 외움(과대적합)",
    concepts: [
      {
        id: "c6-1-overfitting",
        name: "과소적합과 과대적합",
        engName: "Underfitting vs Overfitting",
        oneLineDef: "과소적합은 모델이 너무 단순하여 훈련 데이터조차 학습하지 못한 상태, 과대적합은 훈련 데이터의 노이즈까지 과도하게 외워 새로운 데이터에 대한 일반화 성능이 떨어진 상태.",
        easyExplain: "과소적합은 공부를 너무 안 해서 모의고사도 수능도 다 망친 학생, 과대적합은 문제집 답만 달달 외워서 모의고사는 100점인데 수능 날 처음 보는 변형 문제는 다 틀린 학생입니다.",
        analogy: "몸에 너무 헐렁해서 흘러내리는 옷(과소적합) vs 몸에 너무 꽉 끼어서 숨도 못 쉬고 움직이지도 못하는 맞춤옷(과대적합).",
        superEasyAnalogy: "고양이 사진 1장만 보고 '모든 고양이는 갈색이다'라고 착각하는 것(과소적합) vs 우리 집 고양이의 털 개수와 점 위치까지 다 외워서 다른 집 고양이를 고양이라고 인정 못 하는 것(과대적합).",
        keywords: [
          "과소적합: High Bias (고편향), 훈련 오차 높음, 검증 오차 높음",
          "과대적합: High Variance (고분산), 훈련 오차 매우 낮음, 검증 오차 급증",
          "해결책(과대적합 방지): 데이터 증강, 규제(L1/L2), 드롭아웃, 조기종료(Early Stopping), 가지치기"
        ],
        examExpressions: [
          "훈련 데이터셋에서는 오차가 매우 작으나 검증 데이터셋에서는 오차가 급격히 증가하는 현상을 과대적합(Overfitting)이라 한다.",
          "학습 곡선(Learning Curve)에서 검증 손실(Validation Loss)이 감소하다가 다시 증가하기 시작하는 지점이 과대적합 발생 지점이다."
        ],
        confusingConcept: "과소적합(High Bias) vs 과대적합(High Variance).",
        comparisonTable: {
          headers: ["비교 항목", "과소적합 (Underfitting)", "과대적합 (Overfitting)"],
          rows: [
            ["원인", "모델이 너무 단순함, 특성 부족", "모델이 너무 복잡함, 훈련 데이터 노이즈까지 학습"],
            ["훈련 데이터 오차", "높음 (Training Error High)", "매우 낮음 (Training Error Low)"],
            ["검증 데이터 오차", "높음 (Validation Error High)", "매우 높음 (Validation Error High)"],
            ["편향/분산 상태", "높은 편향 (High Bias), 낮은 분산", "낮은 편향, 높은 분산 (High Variance)"],
            ["해결 방법", "모델 복잡도 증가, 변수 추가", "데이터 증강, 규제(L1/L2), 드롭아웃, 조기종료"]
          ]
        },
        memorizationRule: "과대적합 ➔ 훈련은 만점, 검증은 빵점 (검증 오차가 다시 증가하는 순간 발생!)",
        traps: [
          "함정 선지: '과대적합이 발생하면 훈련 오차와 검증 오차가 모두 증가한다' ➔ 거짓! 훈련 오차는 계속 줄어들지만 검증 오차만 증가합니다."
        ],
        threeSecKey: "지문에 '검증 오차가 다시 증가', '훈련 성능만 높고 일반화 실패'가 나오면 ➔ 과대적합(Overfitting)!",
        questions: [
          {
            qId: "q6-1-1",
            level: 1,
            questionText: "머신러닝 모델 학습 과정에서 에포크(Epoch)가 증가함에 따라 훈련 오차(Training Error)는 지속적으로 감소하지만, 검증 오차(Validation Error)는 일정 시점 이후 다시 증가하는 현상과 이에 대한 해결책으로 가장 적절한 것은?",
            options: [
              "① 과소적합 (Underfitting) - 모델 복잡도를 증가시킨다.",
              "② 과대적합 (Overfitting) - 드롭아웃(Dropout) 및 정규화(L1/L2)를 적용한다.",
              "③ 과소적합 (Underfitting) - 피처 수를 대폭 축소한다.",
              "④ 과대적합 (Overfitting) - 학습률을 비정상적으로 극대화한다."
            ],
            correctAnswer: 1,
            reasonKeywords: ["검증 오차가 다시 증가하는 것은 과대적합", "해결책은 드롭아웃/규제 적용"],
            explanation: {
              correctReason: "훈련 오차는 줄어드는데 검증 오차가 다시 커지는 현상은 '과대적합(Overfitting)'이며, 이를 완화하기 위해 드롭아웃, L1/L2 규제, 데이터 증강, 조기종료 등을 적용합니다.",
              wrongBreakdowns: [
                "① 과소적합이 아닙니다.",
                "③ 과소적합 설명이 아닙니다.",
                "④ 학습률을 비정상적으로 높이면 발산(Divergence)하여 학습이 실패합니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 7단계. Lasso와 Ridge
  // ========================================================
  {
    stageId: 7,
    stageNumber: 7,
    title: "7단계. Lasso vs Ridge 규제",
    subtitle: "L1 (절댓값, 0으로 만듦) vs L2 (제곱, 0에 가깝게 축소)",
    icon: "⚖️",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "L1은 0으로 만든다(Lasso) vs L2는 작게 줄인다(Ridge)",
    concepts: [
      {
        id: "c7-1-lasso-ridge",
        name: "Lasso(L1)와 Ridge(L2) 완벽 비교",
        engName: "Lasso (L1 Regularization) vs Ridge (L2 Regularization)",
        oneLineDef: "과대적합을 방지하기 위해 손실함수에 가중치 패널티를 부여하는 기법으로, Lasso는 가중치 절댓값 합(L1)을 더해 일부 변수를 0으로 만들고, Ridge는 가중치 제곱 합(L2)을 더해 가중치를 0에 가깝게 줄임.",
        easyExplain: "Lasso는 쓸모없는 변수의 스위치를 아예 '0(OFF)'으로 꺼버려서 변수를 자동 선택해주는 다이어트이고, Ridge는 모든 변수를 다 살려두되 힘(가중치)만 골고루 약하게 빼주는 다이어트입니다.",
        analogy: "방 청소할 때 안 쓰는 물건을 쓰레기통에 완전히 버리기(Lasso) vs 물건을 버리지 않고 압축팩에 넣어 부피만 줄여두기(Ridge).",
        superEasyAnalogy: "Lasso = 가차없이 퇴출(가중치 0), Ridge = 월급만 깎고 유지(가중치 축소).",
        keywords: [
          "Lasso: L1 규제, 가중치 절댓값 합, 가중치를 정확히 0으로 만듦, 변수 선택(Feature Selection), 희소(Sparse) 모델",
          "Ridge: L2 규제, 가중치 제곱 합, 가중치를 0에 가깝게 축소(Shrinkage), 다중공선성 완화"
        ],
        examExpressions: [
          "L1 규제(Lasso)는 불필요한 변수의 회귀 계수를 0으로 만들어 변수 선택 효과를 가진다.",
          "L2 규제(Ridge)는 가중치를 0에 가깝게 줄이지만 완전히 0으로 만들지는 않는다."
        ],
        confusingConcept: "Lasso(L1, 절댓값, 0) vs Ridge(L2, 제곱, 0에 가깝게).",
        comparisonTable: {
          headers: ["비교 항목", "Lasso (라쏘)", "Ridge (릿지)"],
          rows: [
            ["규제 종류", "L1 규제", "L2 규제"],
            ["패널티 형태", "가중치 절댓값 합 ( $\\sum \|w\|$ )", "가중치 제곱 합 ( $\\sum w^2$ )"],
            ["가중치 결과", "일부 가중치를 정확히 '0'으로 만듦", "가중치를 '0에 가깝게 작게' 줄임 (0은 아님)"],
            ["특징적 효과", "변수 선택 (Feature Selection) & Sparse 모델 생성", "다중공선성 문제 완화 & 부드러운 가중치 축소"]
          ]
        },
        memorizationRule: "★ 황금 암기 공식: L1은 0으로 만든다! L2는 작게 줄인다!",
        traps: [
          "함정 선지: 'Ridge 회귀는 중요하지 않은 변수의 계수를 정확히 0으로 만들어 모델에서 제거한다' ➔ 거짓! 계수를 0으로 만드는 것은 'Lasso'입니다."
        ],
        threeSecKey: "지문에 '가중치 0', '변수 선택', 'L1'이 나오면 Lasso! / '0에 가깝게 축소', 'L2'가 나오면 Ridge!",
        questions: [
          {
            qId: "q7-1-1",
            level: 1,
            questionText: "선형 회귀 모델의 과대적합을 방지하기 위한 정규화(Regularization) 기법 중, 손실함수에 가중치의 절댓값 합(L1 패널티)을 추가하여 영향력이 미미한 변수의 가중치를 '완전히 0'으로 만듦으로써 변수 선택(Feature Selection) 효과를 제공하는 알고리즘은?",
            options: [
              "① Ridge 회귀",
              "② Lasso 회귀",
              "③ 로지스틱 회귀",
              "④ 주성분 회귀 (PCR)"
            ],
            correctAnswer: 1,
            reasonKeywords: ["L1 패널티(절댓값)", "가중치를 완전히 0으로 만들어 변수 선택"],
            explanation: {
              correctReason: "가중치의 절댓값 합(L1)을 패널티로 부여하여 일부 계수를 정확히 0으로 만들고 변수 선택을 수행하는 기법은 'Lasso 회귀'입니다.",
              wrongBreakdowns: [
                "① Ridge 회귀: 가중치 제곱 합(L2)을 사용하여 가중치를 0에 가깝게 줄이지만 0으로 만들지는 못합니다.",
                "③ 로지스틱 회귀: 범주형 종속변수를 분류하는 모델입니다.",
                "④ 주성분 회귀: PCA로 차원 축소 후 회귀를 수행하는 방법입니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 8단계. 회귀와 분류
  // ========================================================
  {
    stageId: 8,
    stageNumber: 8,
    title: "8단계. 회귀 vs 분류 모델",
    subtitle: "선형회귀 · 로지스틱회귀 · Sigmoid · Softmax 완벽 구분",
    icon: "🔀",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "로지스틱회귀는 '분류' 모델! 이진=Sigmoid vs 다중=Softmax",
    concepts: [
      {
        id: "c8-1-logistic",
        name: "로지스틱 회귀와 활성화 함수",
        engName: "Linear vs Logistic Regression & Sigmoid vs Softmax",
        oneLineDef: "선형 회귀는 연속형 수치를 예측하는 회귀 모델인 반면, 로지스틱 회귀는 이름에 회귀가 붙어있지만 오즈비와 시그모이드 함수를 통해 0~1 사이 확률을 계산하는 '분류(Classification)' 모델.",
        easyExplain: "내일의 기온(25.4도)을 맞히는 것은 선형 회귀, 내일 비가 올 확률(80%)을 계산해서 '비 옴/안 옴'을 판별하는 것은 로지스틱 회귀입니다.",
        analogy: "키나 몸무게 같은 연속 수치 측정기(선형 회귀) vs 합격/불합격 판정기(로지스틱 회귀).",
        superEasyAnalogy: "동전 앞/뒤 맞히기 = 이진 분류(Sigmoid), 가위/바위/보 3개 중 하나 맞히기 = 다중 분류(Softmax).",
        keywords: [
          "로지스틱 회귀: 분류 모델, 오즈비(Odds Ratio), 로짓 변환(Logit), 0~1 확률",
          "시그모이드(Sigmoid): 이진 분류(0 or 1)",
          "소프트맥스(Softmax): 다중 클래스 분류(확률 합 = 1)"
        ],
        examExpressions: [
          "로지스틱 회귀분석은 종속변수가 범주형(이진 또는 다항)인 경우에 적용하는 분류 기법이다.",
          "이진 분류의 출력층에는 시그모이드 함수를, 3개 이상 다중 클래스 분류에는 소프트맥스 함수를 주로 사용한다."
        ],
        confusingConcept: "로지스틱 '회귀'라는 이름 때문에 연속형 값을 예측하는 회귀 모델로 착각하는 함정.",
        comparisonTable: {
          headers: ["비교 항목", "선형 회귀 (Linear Regression)", "로지스틱 회귀 (Logistic Regression)"],
          rows: [
            ["문제 유형", "회귀 (Regression)", "분류 (Classification)"],
            ["종속변수 형태", "연속형 수치 (예: 주가, 매출액, 기온)", "범주형 (예: 합격/불합격, 스팸/정상, 질병 유/무)"],
            ["출력 범위", "$-\\infty \\sim +\\infty$ (실수 전체)", "$0 \\sim 1$ (발생 확률)"],
            ["핵심 함수", "선형 방정식 ( $y = wx + b$ )", "로짓 변환 및 시그모이드 (Sigmoid) 함수"]
          ]
        },
        memorizationRule: "로지스틱 회귀는 '분류'다! 2개는 Sigmoid, 3개 이상은 Softmax!",
        traps: [
          "함정 선지: '로지스틱 회귀는 연속형 수치 데이터를 예측하는 대표적인 선형 회귀 모델이다' ➔ 완벽한 거짓! 로지스틱 회귀는 '범주형 분류' 모델입니다.",
          "함정 선지: '3개 이상의 다중 클래스를 분류할 때 단일 시그모이드 함수를 그대로 출력층에 사용한다' ➔ 거짓! 다중 클래스는 '소프트맥스(Softmax)'를 사용합니다."
        ],
        threeSecKey: "지문에 '로지스틱 회귀'가 나오면 ➔ 분류/확률! / '다중 클래스 확률 합=1'이 나오면 ➔ Softmax!",
        questions: [
          {
            qId: "q8-1-1",
            level: 1,
            questionText: "로지스틱 회귀분석(Logistic Regression)에 대한 설명으로 가장 옳지 않은 것은?",
            options: [
              "① 종속변수가 범주형 데이터일 때 사건 발생 확률을 예측하여 분류를 수행한다.",
              "② 성공 확률 $p$와 실패 확률 $1-p$의 비율인 승산비(Odds Ratio)에 자연로그를 취하는 로짓 변환을 사용한다.",
              "③ 출력값이 0과 1 사이의 확률값으로 매핑되도록 시그모이드(Sigmoid) 함수를 활용한다.",
              "④ 종속변수가 연속형 수치일 때 최소제곱법(OLS)을 통해 최적 회귀선을 도출하는 회귀 기법이다."
            ],
            correctAnswer: 3,
            reasonKeywords: ["로지스틱 회귀는 연속형 수치가 아니라 범주형 분류 모델"],
            explanation: {
              correctReason: "④번은 '일반 선형 회귀(Linear Regression)'에 대한 설명입니다. 로지스틱 회귀는 종속변수가 범주형일 때 최대우도추정법(MLE)을 이용해 분류를 수행합니다.",
              wrongBreakdowns: [
                "① 맞음: 사건 발생 확률 기반 분류 모델입니다.",
                "② 맞음: 오즈비에 로그를 씌운 로짓 변환을 사용합니다.",
                "③ 맞음: 시그모이드 함수를 통해 0~1 사이 확률로 출력합니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 9단계. Decision Tree와 Random Forest
  // ========================================================
  {
    stageId: 9,
    stageNumber: 9,
    title: "9단계. Decision Tree vs Random Forest",
    subtitle: "단일 나무 vs 앙상블 배깅(Bagging)과 변수 무작위 선택",
    icon: "🌲",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "나무 1개(의사결정나무) vs 여러 나무 + Bagging + 변수 무작위 선택(랜덤포레스트)",
    concepts: [
      {
        id: "c9-1-tree-forest",
        name: "의사결정나무와 랜덤 포레스트 비교",
        engName: "Decision Tree vs Random Forest",
        oneLineDef: "의사결정나무는 if-else 규칙으로 데이터를 분할하는 단일 나무 모델이고, 랜덤 포레스트는 여러 의사결정나무를 복원추출(Bootstrap)과 '변수 무작위 선택'으로 병렬 학습시키는 배깅(Bagging) 앙상블 모델.",
        easyExplain: "의사결정나무는 전문가 1명이 혼자 스무고개 하듯 판단하는 것이고, 랜덤 포레스트는 여러 전문가들이 서로 다른 관점과 질문으로 회의해서 다수결 투표로 결정하는 것입니다.",
        analogy: "독재자 1명의 판단(의사결정나무, 편향되기 쉽고 불안정) vs 여러 시민의 집단지성 투표(랜덤 포레스트, 안정적이고 정확).",
        superEasyAnalogy: "나무 1그루 vs 울창한 숲 전체.",
        keywords: [
          "Decision Tree: 해석력 우수(White Box), 과적합 취약, 분할 지표(지니 지수, 엔트로피)",
          "Random Forest: Bagging(배깅), 복원추출(Bootstrap), 분할 시 '변수 무작위 부분 선택', 분류는 다수결, 회귀는 평균"
        ],
        examExpressions: [
          "랜덤 포레스트는 여러 개의 의사결정나무를 생성하고 각 노드 분할 시 모든 변수가 아닌 '무작위로 선택된 일부 변수 후보' 중에서 최적 분할을 수행한다.",
          "의사결정나무의 분할 지표로 범주형 목표변수에는 지니 지수, 엔트로피, 카이제곱 통계량이 사용된다."
        ],
        confusingConcept: "Random Forest의 변수 선택 (모든 변수를 다 쓰는 게 아니라 '무작위 일부 변수'만 씁니다!).",
        comparisonTable: {
          headers: ["비교 항목", "의사결정나무 (Decision Tree)", "랜덤 포레스트 (Random Forest)"],
          rows: [
            ["구조", "단 1개의 트리 모델", "수백~수천 개의 트리 앙상블"],
            ["앙상블 기법", "해당 없음", "배깅 (Bagging, Bootstrap Aggregating)"],
            ["변수 활용", "노드 분할 시 모든 독립변수를 검토", "노드 분할 시 '무작위로 일부 변수'만 추출하여 검토"],
            ["해석 용이성", "매우 높음 (White Box, if-else 시각화)", "낮음 (Black Box 앙상블)"],
            ["과적합 위험", "매우 높음 (가지치기 필수)", "매우 낮음 (일반화 성능 우수, 분산 감소)"]
          ]
        },
        memorizationRule: "랜덤포레스트 ➔ 배깅 + 데이터 랜덤 복원추출 + '변수도 무작위 부분 선택'!",
        traps: [
          "함정 선지: '랜덤 포레스트는 노드를 분할할 때 항상 모든 변수를 대상으로 정보획득량을 계산한다' ➔ 거짓! 나무 간 상관성을 줄이기 위해 '무작위로 일부 변수만 골라' 분할합니다.",
          "함정 선지: '랜덤 포레스트는 이전 트리의 오차를 다음 트리가 순차적으로 학습하는 부스팅 방식이다' ➔ 배깅(병렬 독립 학습)입니다."
        ],
        threeSecKey: "지문에 '여러 의사결정나무 + Bagging + 변수 무작위 선택'이 나오면 ➔ Random Forest!",
        questions: [
          {
            qId: "q9-1-1",
            level: 1,
            questionText: "랜덤 포레스트(Random Forest) 알고리즘에 대한 설명 중 출제자의 함정이 포함된 옳지 않은 선지는?",
            options: [
              "① 여러 개의 의사결정나무를 앙상블하여 예측력을 향상시키는 배깅(Bagging) 계열 모델이다.",
              "② 원본 데이터로부터 복원추출을 통해 생성된 부트스트랩(Bootstrap) 샘플로 개별 트리를 학습시킨다.",
              "③ 각 트리 노드를 분할할 때 데이터의 모든 독립변수를 사용하여 최적의 분할 기준을 도출한다.",
              "④ 최종 분류 결과는 개별 트리들의 예측 결과를 다수결 투표(Voting)로 결정한다."
            ],
            correctAnswer: 2,
            reasonKeywords: ["노드 분할 시 모든 변수가 아니라 무작위로 선택된 일부 변수만 사용"],
            explanation: {
              correctReason: "③번이 시험 단골 함정입니다! 랜덤 포레스트는 트리 간의 상관관계를 낮추고 다양성을 확보하기 위해, 노드 분할 시 전체 변수가 아니라 '무작위로 선정된 일부 독립변수 후보(예: $\\sqrt{p}$)'만을 대상으로 최적 분할을 수행합니다.",
              wrongBreakdowns: [
                "① 맞음: 배깅 기반 대표 앙상블 기법입니다.",
                "② 맞음: 복원추출(Bootstrap)로 서브 데이터셋을 만듭니다.",
                "④ 맞음: 분류는 다수결(Voting), 회귀는 평균(Averaging)입니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 10단계. SVM (Support Vector Machine)
  // ========================================================
  {
    stageId: 10,
    stageNumber: 10,
    title: "10단계. 서포트 벡터 머신 (SVM)",
    subtitle: "초평면 · 마진 최대화 · 서포트 벡터 · 커널 트릭",
    icon: "🛡️",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "마진 최대화(SVM) & 커널 트릭(저차원 비선형 ➔ 고차원 선형 매핑)",
    concepts: [
      {
        id: "c10-1-svm",
        name: "SVM의 핵심 원리와 커널 트릭",
        engName: "Support Vector Machine & Kernel Trick",
        oneLineDef: "서로 다른 클래스의 데이터들을 분리하는 결정 경계(초평면)와 데이터 포인트 사이의 거리인 '마진(Margin)'을 최대화하는 분류 알고리즘.",
        easyExplain: "두 나라의 국경선(초평면)을 그을 때, 국경선 바로 근처에 있는 초소(서포트 벡터)들과 국경선 사이의 완충지대(마진) 폭을 최대한 넓게 확보해서 안전한 경계를 만드는 방법입니다.",
        analogy: "도로 중앙선을 그릴 때 양쪽 차선의 가장 안쪽 차들과의 거리를 최대한 널찍하게 띄워 사고 위험을 줄이는 것.",
        superEasyAnalogy: "평면(2차원)에서는 직선으로 도저히 가를 수 없는 복잡한 점들을, 공중(3차원 고차원)으로 띄워 올려서 칼판으로 싹둑 잘라내는 마법(커널 트릭).",
        keywords: [
          "초평면(Hyperplane): 결정 경계",
          "마진(Margin): 결정 경계와 서포트 벡터 사이 거리, '마진 최대화'",
          "서포트 벡터(Support Vector): 결정 경계 결정에 직접 관여하는 최외곽 데이터",
          "커널 트릭(Kernel Trick): 저차원 비선형 데이터를 고차원 공간으로 매핑하여 선형 분리 가능하게 함 (RBF, 다항식 등)"
        ],
        examExpressions: [
          "SVM의 목적은 클래스를 구분하는 결정 초평면과 가장 가까운 학습 데이터 간의 마진(Margin)을 최대화하는 것이다.",
          "비선형 분류 문제를 해결하기 위해 커널 함수(Kernel Function)를 사용하여 원본 데이터를 고차원 특징 공간으로 매핑한다."
        ],
        confusingConcept: "선형 전용 vs 비선형 가능 (SVM은 커널 트릭을 통해 강력한 비선형 분류가 가능합니다!).",
        comparisonTable: {
          headers: ["SVM 핵심 구성요소", "역할 및 시험 출제 포인트"],
          rows: [
            ["결정 초평면 (Hyperplane)", "데이터 공간을 두 클래스로 양분하는 n-1 차원의 결정 경계"],
            ["마진 (Margin)", "초평면과 서포트 벡터 사이의 수직 거리 ➔ '마진을 최대화'하는 것이 SVM의 핵심"],
            ["서포트 벡터 (Support Vector)", "초평면에 가장 가까운 데이터들 (이 데이터들만 초평면 위치 결정에 영향)"],
            ["커널 트릭 (Kernel Trick)", "고차원 계산 없이 내적 연산만으로 비선형 분리 경계를 형성 (RBF 커널 빈출)"]
          ]
        },
        memorizationRule: "SVM ➔ 마진 최대화! 커널 트릭 ➔ 비선형을 고차원 선형으로 매핑!",
        traps: [
          "함정 선지: 'SVM은 오직 선형 분리 가능한 데이터에만 적용할 수 있는 선형 전용 모델이다' ➔ 거짓! 커널 트릭으로 복잡한 비선형 분류가 가능합니다.",
          "함정 선지: '모든 데이터 포인트가 초평면의 기울기와 절편 결정에 동일하게 기여한다' ➔ 거짓! 경계에 인접한 '서포트 벡터'들만 결정에 관여합니다."
        ],
        threeSecKey: "지문에 '마진 최대화', '서포트 벡터', '커널 트릭'이 나오면 ➔ SVM!",
        questions: [
          {
            qId: "q10-1-1",
            level: 1,
            questionText: "서포트 벡터 머신(SVM)에 대한 설명으로 가장 옳지 않은 것은?",
            options: [
              "① 결정 초평면과 서포트 벡터 간의 거리인 마진(Margin)을 최대화하는 것을 목표로 한다.",
              "② 결정 경계 형성에 영향을 미치는 데이터 포인트는 전체 데이터가 아니라 소수의 서포트 벡터이다.",
              "③ 비선형 데이터를 고차원 특징 공간으로 사상(Mapping)시켜 선형 분리가 가능하도록 하는 커널 트릭(Kernel Trick)을 적용할 수 있다.",
              "④ 데이터셋에 이상치가 단 1개라도 포함되면 결정 경계가 완전히 붕괴되어 적용이 불가능하다."
            ],
            correctAnswer: 3,
            reasonKeywords: ["슬랙 변수(Soft Margin)를 통해 이상치를 허용하며 강건하게 학습 가능"],
            explanation: {
              correctReason: "④번이 틀렸습니다! SVM은 소프트 마진(Soft Margin, 슬랙 변수 C)을 사용하여 어느 정도의 오분류와 이상치를 허용함으로써 이상치가 있어도 매우 강건하게 작동합니다.",
              wrongBreakdowns: [
                "① 맞음: 마진 최대화가 SVM의 핵심 정의입니다.",
                "② 맞음: 서포트 벡터만이 초평면 위치를 결정합니다.",
                "③ 맞음: 커널 트릭을 통해 비선형 문제를 해결합니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 11단계. 군집분석 (Clustering)
  // ========================================================
  {
    stageId: 11,
    stageNumber: 11,
    title: "11단계. 군집분석 (Clustering)",
    subtitle: "K-means · K-medoids · GMM · DBSCAN 완벽 비교",
    icon: "🔮",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "K 사전 지정 필요(K-means, GMM) vs 군집 수 미리 정하지 않음(DBSCAN)",
    concepts: [
      {
        id: "c11-1-clustering",
        name: "K-means vs DBSCAN 등 군집 알고리즘 비교",
        engName: "K-means, K-medoids, GMM, DBSCAN",
        oneLineDef: "K-means는 군집 수 K를 사전에 정하고 중심점과의 거리를 최소화하는 분할 군집인 반면, DBSCAN은 군집 수 K를 미리 정하지 않고 데이터의 밀도를 기반으로 기하학적 형태의 군집과 노이즈를 찾아내는 군집 기법.",
        easyExplain: "K-means는 사람들에게 '무조건 3개 조(K=3)로 뭉쳐!'라고 미리 조 개수를 지정하는 것이고, DBSCAN은 조 개수를 지정하지 않고 '서로 가까이 옹기종기 모여있는 사람들끼리 알아서 조를 만들고, 혼자 뚝 떨어진 사람은 외톨이(노이즈)로 분류해!'라고 하는 것입니다.",
        analogy: "동그란 모양으로만 자르는 쿠키 커터(K-means) vs 모래사장에 뭉쳐있는 조개껍데기 무리를 자연스럽게 둘러싸는 것(DBSCAN).",
        superEasyAnalogy: "K-means = K개 조 미리 배정, DBSCAN = 빽빽한 곳끼리 자연 형성 + 노이즈 자동 감지.",
        keywords: [
          "K-means: 군집 수 K 사전 지정, 거리 기반, 이상치에 취약(평균 중심점), 구형 군집",
          "K-medoids (PAM): 실제 데이터 포인트를 대표점(Medoid)으로 사용하여 이상치에 강건",
          "GMM (가우시안 혼합): 확률 기반 군집, EM 알고리즘, 타원형 군집 가능, K 사전 지정 필요",
          "DBSCAN: '군집 수 K를 미리 정하지 않음', 밀도 기반, 임의의 기하학적 형태 군집 가능, 이상치/노이즈 자동 분리, eps 및 MinPts 설정"
        ],
        examExpressions: [
          "DBSCAN은 군집의 개수(K)를 사전에 설정할 필요가 없으며, 밀도 기반으로 노이즈와 이상치를 자동으로 판별한다.",
          "K-means는 이상치(Outlier)에 민감하며, 볼록한 구형(Spherical) 형태의 군집 형성에 적합하다."
        ],
        confusingConcept: "K 사전 지정 여부 (K-means/K-medoids/GMM은 K 필요, DBSCAN은 K 불필요).",
        comparisonTable: {
          headers: ["알고리즘", "군집 수(K) 사전 지정", "군집 형태", "이상치(노이즈) 처리"],
          rows: [
            ["K-means", "필수 (K 지정)", "볼록한 구형 군집만 가능", "이상치에 매우 취약 (평균 왜곡)"],
            ["K-medoids", "필수 (K 지정)", "구형 군집", "실제 중심점 사용으로 이상치에 강건"],
            ["GMM", "필수 (가우시안 개수 지정)", "타원형 등 다양한 분포 군집", "확률적 소프트 군집"],
            ["DBSCAN", "불필요 (K 지정 안 함!)", "초승달, 도넛 등 임의의 복잡한 형태 가능", "노이즈/이상치를 스스로 감지하여 제외"]
          ]
        },
        memorizationRule: "★ 군집 수 K를 미리 정하지 않는 밀도 기반 알고리즘 ➔ 무조건 DBSCAN!",
        traps: [
          "함정 선지: 'DBSCAN은 사용자가 사전에 최적 군집 수 K를 반드시 하이퍼파라미터로 지정해야 한다' ➔ 완전한 거짓! DBSCAN은 K를 지정하지 않습니다."
        ],
        threeSecKey: "지문에 '군집 수 K 사전 지정 불필요', '밀도 기반', '기하학적/임의 형태', '노이즈 자동 감지'가 나오면 ➔ DBSCAN!",
        questions: [
          {
            qId: "q11-1-1",
            level: 1,
            questionText: "다음 중 비지도학습의 군집 분석 알고리즘 중, 분석가가 군집의 개수(K)를 사전에 지정할 필요가 없으며, 데이터의 밀도(Density)를 기반으로 초승달 모양 등 임의의 기하학적 형태를 가진 군집을 탐색하고 노이즈(이상치)를 자동으로 감지해내는 기법은?",
            options: [
              "① K-Means Clustering",
              "② GMM (Gaussian Mixture Model)",
              "③ DBSCAN (Density-Based Spatial Clustering)",
              "④ K-Medoids (PAM)"
            ],
            correctAnswer: 2,
            reasonKeywords: ["군집 수 K 사전 지정 불필요", "밀도 기반 및 임의 형태 군집 탐색"],
            explanation: {
              correctReason: "군집의 개수(K)를 미리 정하지 않고 반경(eps)과 최소 이웃 점 개수(MinPts)를 기준으로 밀도 기반 군집화 및 노이즈 검출을 수행하는 알고리즘은 'DBSCAN'입니다.",
              wrongBreakdowns: [
                "① K-Means: 군집 수 K를 사전에 지정해야 합니다.",
                "② GMM: 혼합할 가우시안 분포의 개수(K)를 지정해야 합니다.",
                "④ K-Medoids: 군집 수 K를 사전에 지정해야 합니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 12단계. 변수 선택
  // ========================================================
  {
    stageId: 12,
    stageNumber: 12,
    title: "12단계. 변수 선택 (Feature Selection)",
    subtitle: "Filter · Wrapper · Embedded · 다중공선성(VIF)",
    icon: "🧲",
    subjectNumber: 2,
    subjectName: "2과목 · 데이터 탐색",
    summaryTag: "Filter(통계량, 독립적) vs Wrapper(반복 모델 평가) vs Embedded(모델 학습 내장)",
    concepts: [
      {
        id: "c12-1-selection",
        name: "Filter, Wrapper, Embedded 기법 완벽 구분",
        engName: "Filter vs Wrapper vs Embedded Methods",
        oneLineDef: "변수 선택 기법 3종: Filter는 모델과 무관하게 통계적 지표로 선택, Wrapper는 모델 예측 성능을 반복 평가하여 최적 조합 선택, Embedded는 모델 학습 자체에 변수 선택이 내장된 방식.",
        easyExplain: "Filter는 키/체중 같은 기초 신체검사표만 보고 선수를 거르는 것(빠름), Wrapper는 직접 실전 경기를 수십 번 뛰게 해보고 제일 잘하는 팀 조합을 뽑는 것(정확하지만 시간 오래 걸림), Embedded는 감독이 훈련을 시키면서 자연스럽게 주전 선수를 정하는 것(Lasso, 트리).",
        analogy: "서류 심사만으로 합격자 거르기(Filter) vs 오디션을 여러 번 치르며 멤버 조합 맞추기(Wrapper) vs 연수원에서 교육받는 도중 자연스럽게 선발되기(Embedded).",
        superEasyAnalogy: "Filter = 통계량 계산, Wrapper = 전진선택/후진제거 반복, Embedded = Lasso/트리 내장.",
        keywords: [
          "Filter: 모델 학습 없음, 상관계수, 카이제곱, ANOVA, 상호정보량(비선형 측정 가능), 속도 빠름",
          "Wrapper: 특정 머신러닝 모델 사용, 전진 선택(Forward), 후진 제거(Backward), 단계적 선택(Stepwise), 과적합 위험, 계산 비용 큼",
          "Embedded: 모델 학습 과정에서 자체 선택, Lasso(L1), Decision Tree / Random Forest 변수 중요도",
          "다중공선성(Multicollinearity): VIF >= 10이면 다중공선성 존재"
        ],
        examExpressions: [
          "Filter 기법은 머신러닝 알고리즘을 사용하지 않고 독립변수와 종속변수 간의 통계적 척도를 기준으로 변수를 선택한다.",
          "Wrapper 기법은 변수 부분집합을 변경해가며 모델의 성능을 반복적으로 평가하는 방식(전진선택법, 후진제거법)이다.",
          "상호정보량(Mutual Information)은 두 변수 간의 선형 관계뿐만 아니라 비선형적 의존성도 측정할 수 있다."
        ],
        confusingConcept: "Filter는 모델 검증을 하지 않습니다! (교차검증이나 모델 학습을 수행하는 것은 Wrapper입니다).",
        comparisonTable: {
          headers: ["구분", "Filter 기법", "Wrapper 기법", "Embedded 기법"],
          rows: [
            ["모델 사용 여부", "사용 안 함 (통계적 지표만 사용)", "사용함 (모델 성능 반복 평가)", "모델 학습 자체에 포함"],
            ["대표 알고리즘", "상관계수, 카이제곱, 상호정보량(MI)", "전진 선택법, 후진 제거법, 유전 알고리즘", "Lasso (L1 규제), 의사결정나무 중요도"],
            ["연산 속도", "매우 빠름 (대용량 적합)", "매우 느림 (조합 폭발)", "중간"],
            ["과적합 위험", "낮음", "높음 (특정 모델에 과적합)", "낮음 (규제 포함)"]
          ]
        },
        memorizationRule: "Filter ➔ 통계적 척도(모델X) / Wrapper ➔ 전진/후진 반복 평가 / Embedded ➔ Lasso/트리 내장",
        traps: [
          "함정 선지: 'Filter 방식은 교차검증(Cross Validation)을 통해 변수 부분집합의 예측 오차를 평가하여 선택한다' ➔ 거짓! 교차검증으로 반복 평가하는 것은 'Wrapper'입니다."
        ],
        threeSecKey: "지문에 '통계적 척도로 모델 없이 선택' ➔ Filter! / '전진선택/후진제거 반복' ➔ Wrapper! / 'L1, 트리 중요도' ➔ Embedded!",
        questions: [
          {
            qId: "q12-1-1",
            level: 1,
            questionText: "특성 선택(Feature Selection) 방법 중 'Filter 기법'에 대한 설명으로 가장 올바른 것은?",
            options: [
              "① 예측 모델을 사용하여 변수 부분집합의 예측 성능을 반복적으로 평가한다.",
              "② 전진 선택법(Forward Selection)과 후진 제거법(Backward Elimination)이 대표적이다.",
              "③ 머신러닝 알고리즘의 학습 과정과 독립적으로 통계적 척도(상관계수, 카이제곱 등)를 활용하여 변수를 선별한다.",
              "④ Lasso 회귀와 같이 모델 학습 과정에서 가중치 규제를 통해 변수를 자동 선택한다."
            ],
            correctAnswer: 2,
            reasonKeywords: ["모델 학습과 독립적으로 통계적 척도를 사용"],
            explanation: {
              correctReason: "Filter 기법은 특정 예측 모델을 학습시키지 않고, 상관계수나 카이제곱 등 변수 자체의 통계적 척도로 빠르게 변수를 선택하는 방법입니다.",
              wrongBreakdowns: [
                "① Wrapper 기법에 대한 설명입니다.",
                "② Wrapper 기법의 대표적 탐색 알고리즘입니다.",
                "④ Embedded 기법(Lasso)에 대한 설명입니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 13단계. 불균형 데이터
  // ========================================================
  {
    stageId: 13,
    stageNumber: 13,
    title: "13단계. 데이터 불균형 처리",
    subtitle: "Oversampling · Undersampling · SMOTE 합성 원리",
    icon: "⚖️",
    subjectNumber: 2,
    subjectName: "2과목 · 데이터 탐색",
    summaryTag: "소수 증가(오버) vs 다수 축소(언더) vs SMOTE(단순 복제 X, 새로운 합성 샘플 생성)",
    concepts: [
      {
        id: "c13-1-imbalance",
        name: "불균형 데이터와 SMOTE 원리",
        engName: "Oversampling, Undersampling, SMOTE",
        oneLineDef: "정상(99%) 대 사기(1%)처럼 클래스 비율이 극도로 편향된 데이터를 다루는 기법으로, SMOTE는 소수 클래스 데이터를 단순 복제하는 것이 아니라 이웃 데이터 사이에 '새로운 합성 샘플(Synthetic Sample)'을 보간 생성하는 오버샘플링 기법.",
        easyExplain: "사기 거래 데이터가 너무 적을 때, 똑같은 사기 거래를 복사-붙여넣기(단순 복제)하면 과적합이 생기므로, 사기 거래 A와 사기 거래 B 사이의 중간 지점에 '비슷한 새로운 가짜 사기 거래'를 지능적으로 만들어내는 방식(SMOTE)입니다.",
        analogy: "동일한 사진을 복사기에서 수백 장 복사하기(단순 오버샘플링 ➔ 과적합) vs 포토샵으로 두 사진을 자연스럽게 합성해서 새로운 인물 사진 만들기(SMOTE).",
        superEasyAnalogy: "SMOTE = 소수 데이터의 K-최근접 이웃(KNN)을 찾아 선을 긋고, 그 선 위에 새로운 인공 점을 찍어 늘리기.",
        keywords: [
          "Oversampling: 소수 클래스 증가, 정보 손실 없음, 과대적합 위험",
          "Undersampling: 다수 클래스 축소, 학습 속도 빠름, 유용한 정보 손실 위험",
          "SMOTE (Synthetic Minority Over-sampling): 소수 클래스 데이터와 그 KNN 사이의 보간(Interpolation)을 통해 '새로운 합성 샘플' 생성"
        ],
        examExpressions: [
          "SMOTE는 소수 클래스 데이터를 단순 복제하지 않고, 소수 데이터와 그 이웃 간의 거리를 고려하여 새로운 가상 데이터를 합성한다.",
          "불균형 데이터셋에서는 Accuracy(정확도)보다 F1-Score, ROC-AUC, PR-AUC를 평가지표로 사용해야 한다."
        ],
        confusingConcept: "SMOTE는 단순 복제가 아닙니다! (단순 복제는 Random Oversampling이고, SMOTE는 합성 생성입니다).",
        comparisonTable: {
          headers: ["구분", "Random Oversampling", "SMOTE (합성 오버샘플링)", "Undersampling"],
          rows: [
            ["동작 원리", "소수 클래스 데이터를 단순 무작위 복제", "소수 데이터와 KNN 이웃 사이에 새로운 가상 샘플 합성", "다수 클래스 데이터를 무작위 삭제"],
            ["장점", "구현이 간단함, 정보 보존", "단순 복제로 인한 과적합 완화", "데이터 크기 축소로 학습 속도 향상"],
            ["단점/위험", "과대적합(Overfitting) 발생 가능성 높음", "경계선 노이즈 생성 가능성", "다수 클래스의 중요한 정보 손실(Information Loss)"]
          ]
        },
        memorizationRule: "★ SMOTE는 단순 복제 X ➔ 소수 클래스 이웃 사이 '새로운 합성 샘플' 생성!",
        traps: [
          "함정 선지: 'SMOTE 알고리즘은 소수 클래스의 원본 데이터를 동일하게 복제하여 데이터 수를 늘린다' ➔ 완벽한 거짓! 새로운 합성 샘플을 만듭니다."
        ],
        threeSecKey: "지문에 'SMOTE', '소수 클래스 합성 생성', 'KNN 보간'이 나오면 ➔ SMOTE 오버샘플링!",
        questions: [
          {
            qId: "q13-1-1",
            level: 1,
            questionText: "불균형 데이터(Imbalanced Data) 처리를 위한 SMOTE(Synthetic Minority Over-sampling Technique) 알고리즘에 대한 설명으로 가장 옳지 않은 것은?",
            options: [
              "① 소수 클래스(Minority Class)의 데이터 수를 증가시키는 오버샘플링 기법이다.",
              "② 소수 클래스 데이터와 그 K-최근접 이웃(KNN) 사이의 선분 상에 새로운 합성 샘플을 생성한다.",
              "③ 소수 클래스 데이터를 단순 중복 복제(Duplication)하여 과대적합을 유발하는 단점을 완화한다.",
              "④ 다수 클래스(Majority Class)의 데이터를 무작위로 제거하여 클래스 간 균형을 맞춘다."
            ],
            correctAnswer: 3,
            reasonKeywords: ["SMOTE는 소수 클래스 생성 기법이지 다수 클래스를 제거하는 언더샘플링이 아님"],
            explanation: {
              correctReason: "④번은 '언더샘플링(Undersampling)'에 대한 설명입니다. SMOTE는 소수 클래스의 가상 샘플을 만들어내는 대표적인 '오버샘플링' 기법입니다.",
              wrongBreakdowns: [
                "① 맞음: 소수 클래스를 늘리는 오버샘플링입니다.",
                "② 맞음: KNN을 이용해 선분 상에 가상 데이터를 합성합니다.",
                "③ 맞음: 단순 복제의 과적합 문제를 해결합니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 14단계. 연관규칙 (Association Rule)
  // ========================================================
  {
    stageId: 14,
    stageNumber: 14,
    title: "14단계. 연관규칙 (Association Rule)",
    subtitle: "지지도(Support) · 신뢰도(Confidence) · 향상도(Lift) 공식과 계산",
    icon: "🛒",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "전체 중 A와 B(지지도) vs A 중 B(신뢰도) vs 독립 대비 배수(향상도)",
    concepts: [
      {
        id: "c14-1-association",
        name: "지지도, 신뢰도, 향상도 3대 지표 공식",
        engName: "Support, Confidence, Lift",
        oneLineDef: "장바구니 분석(Market Basket Analysis)에서 품목 A와 B 간의 연관성을 평가하는 3가지 지표: 지지도는 전체 중 둘 다 구매할 확률, 신뢰도는 A를 샀을 때 B도 살 조건부 확률, 향상도는 A 구매가 B 구매를 얼마나 증가시키는지(우연 대비 배수).",
        easyExplain: "마트 영수증 100장 중 맥주와 기저귀가 둘 다 적힌 영수증 비율(지지도), 맥주를 산 사람 40명 중 기저귀도 같이 산 사람 비율(신뢰도), 맥주를 사면 기저귀를 그냥 평소보다 몇 배 더 많이 사는지(향상도: 1이면 무관, 1보다 크면 찰떡궁합).",
        analogy: "지지도 = 전체 손님 중 삼겹살과 소주를 둘 다 시킨 테이블 비율, 신뢰도 = 삼겹살 시킨 테이블 중 소주도 시킨 비율, 향상도 = 삼겹살 시키면 소주 주문 확률이 평소의 3배로 뛰는가.",
        superEasyAnalogy: "Support = P(A ∩ B), Confidence = P(A ∩ B) / P(A), Lift = Confidence / P(B).",
        keywords: [
          "지지도(Support): $P(A \\cap B) = n(A \\cap B) / N$",
          "신뢰도(Confidence): $P(B|A) = n(A \\cap B) / n(A)$",
          "향상도(Lift): $Confidence(A \\rightarrow B) / P(B) = P(A \\cap B) / (P(A) \\cdot P(B))$",
          "향상도 해석: Lift = 1 (독립, 무관), Lift > 1 (양의 상관, 의미 있는 규칙), Lift < 1 (음의 상관)"
        ],
        examExpressions: [
          "품목 A와 B가 동시에 포함된 거래 수의 비율을 지지도(Support)라 한다.",
          "품목 A를 포함하는 거래 중에서 품목 B도 함께 포함하는 거래의 비율을 신뢰도(Confidence)라 한다.",
          "향상도(Lift)가 1이면 두 품목은 서로 독립이며, 1보다 클수록 A가 B의 구매에 긍정적 영향을 미친다."
        ],
        confusingConcept: "Confidence vs Lift (Confidence는 단순 조건부 확률이고, Lift는 품목 B 자체의 기본 구매율까지 나누어 우연성을 보정한 지표).",
        comparisonTable: {
          headers: ["지표명", "공식", "분모의 의미", "판정 기준"],
          rows: [
            ["지지도 (Support)", "$P(A \\cap B)$", "전체 거래 수 ($N$)", "최소 지지도 이상이어야 빈발 항목으로 채택"],
            ["신뢰도 (Confidence)", "$\\frac{P(A \\cap B)}{P(A)}$", "조건 품목 A의 거래 수 ($n(A)$)", "최소 신뢰도 이상이어야 유의미한 규칙"],
            ["향상도 (Lift)", "$\\frac{P(A \\cap B)}{P(A) \\cdot P(B)}$", "A 확률 $\\times$ B 확률 (우연히 같이 살 확률)", "Lift > 1: 양의 상관 / Lift = 1: 독립 / Lift < 1: 음의 상관"]
          ]
        },
        memorizationRule: "★ 지지도=전체 중 둘다 / 신뢰도=A 중 둘다 / 향상도=신뢰도 ÷ B확률 (Lift > 1이어야 좋은 규칙!)",
        traps: [
          "함정 선지: '향상도가 0이면 두 품목은 서로 독립이다' ➔ 거짓! 독립일 때 향상도는 '1'입니다 (0이 아님!).",
          "함정 선지: '신뢰도 $A \\rightarrow B$ 와 $B \\rightarrow A$ 는 항상 같다' ➔ 거짓! 분모가 각각 $P(A)$와 $P(B)$이므로 다릅니다."
        ],
        threeSecKey: "Lift = 1 이면 독립! Lift > 1 이면 긍정적 연관! 신뢰도는 P(A∩B)/P(A)!",
        questions: [
          {
            qId: "q14-1-1",
            level: 1,
            questionText: "총 1,000건의 마트 거래 데이터에서 '빵'이 포함된 거래가 400건, '우유'가 포함된 거래가 500건, '빵과 우유'가 동시에 포함된 거래가 300건일 때, 연관규칙 [빵 ➔ 우유]에 대한 지지도(Support)와 향상도(Lift)는 각각 얼마인가?",
            options: [
              "① 지지도: 0.3, 향상도: 1.5",
              "② 지지도: 0.4, 향상도: 1.2",
              "③ 지지도: 0.3, 향상도: 0.75",
              "④ 지지도: 0.5, 향상도: 1.0"
            ],
            correctAnswer: 0,
            reasonKeywords: [
              "지지도 = 300 / 1000 = 0.3",
              "신뢰도 = 300 / 400 = 0.75",
              "향상도 = 0.75 / (500 / 1000) = 0.75 / 0.5 = 1.5"
            ],
            explanation: {
              correctReason: "1) 지지도(Support) = 300 / 1000 = 0.3\n2) 신뢰도(Confidence) = 300 / 400 = 0.75\n3) P(우유) = 500 / 1000 = 0.5\n4) 향상도(Lift) = 신뢰도 / P(우유) = 0.75 / 0.5 = 1.5 입니다.",
              wrongBreakdowns: [
                "② 지지도 0.4는 P(빵)입니다.",
                "③ 향상도 0.75는 신뢰도(Confidence) 값입니다.",
                "④ 지지도 0.5는 P(우유)입니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 15단계. 경사하강법 및 옵티마이저
  // ========================================================
  {
    stageId: 15,
    stageNumber: 15,
    title: "15단계. 경사하강법 및 최적화 (Optimizers)",
    subtitle: "SGD · Momentum · NAG · Adagrad · RMSprop · Adam",
    icon: "⚡",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "SGD(1개씩, 진동/탈출) vs Momentum(관성) vs NAG(미리 갈 위치 기울기 확인) vs Adam",
    concepts: [
      {
        id: "c15-1-optimizers",
        name: "경사하강법과 고급 옵티마이저 비교",
        engName: "Gradient Descent & Advanced Optimizers",
        oneLineDef: "손실함수를 최소화하기 위해 파라미터를 반복 갱신하는 알고리즘으로, SGD는 1개 데이터로 빠르게 갱신하며 진동을 통해 국소 최솟값을 탈출하고, Momentum은 관성을, NAG는 미리 갈 위치의 기울기를 확인하며, Adam은 Momentum과 RMSprop을 결합한 알고리즘.",
        easyExplain: "안개 낀 산에서 가장 낮은 골짜기로 내려가는 방법: Batch는 산 전체 지도를 다 보고 신중하게 한 발 가기, SGD는 발 닿는 곳마다 마구 뛰어내려가며 웅덩이(Local Minima)를 튀어나오기, Momentum은 썰매 타듯 관성 붙이기, NAG는 브레이크 밟을 지점을 미리 내다보기, Adam은 가장 똑똑한 자동 주행 썰매.",
        analogy: "일반 자전거(SGD: 울퉁불퉁 흔들림) ➔ 가속도 붙은 자전거(Momentum) ➔ 전방 위험을 미리 보고 감속하는 자전거(NAG) ➔ AI 스마트 전기자전거(Adam).",
        superEasyAnalogy: "NAG ➔ '앞으로 갈 위치의 기울기를 미리 확인'해서 감속 브레이크!",
        keywords: [
          "Batch GD: 전체 데이터 사용, 안정적이지만 느림",
          "SGD (확률적 경사하강법): 데이터 1개씩 무작위 추출, 진동/노이즈 심함, Local Minima 탈출 가능",
          "Mini-batch: 데이터 일부 묶음(배치 크기)씩 갱신",
          "Momentum: 이전 이동 방향(관성) 누적",
          "NAG (Nesterov Accelerated Gradient): '앞으로 이동할 위치의 기울기를 미리 확인'하여 오버슈팅 방지",
          "Adam (Adaptive Moment Estimation): Momentum + RMSprop 결합, 현대 딥러닝 표준"
        ],
        examExpressions: [
          "NAG는 관성 방향으로 미리 이동한 후의 기울기를 계산하여 모멘텀의 과도한 오버슈팅을 방지한다.",
          "Adam은 과거 기울기의 지수 가중 이동평균(모멘텀)과 제곱의 이동평균(RMSprop)을 결합한 최적화 알고리즘이다."
        ],
        confusingConcept: "Momentum vs NAG (Momentum은 현재 위치 기울기 + 관성, NAG는 '관성으로 미리 가본 자리'의 기울기를 확인).",
        comparisonTable: {
          headers: ["옵티마이저", "핵심 원리 및 차별점", "시험장 3초 키워드"],
          rows: [
            ["SGD", "1개 샘플마다 갱신, 노이즈와 진동", "국소 최솟값(Local Minima) 탈출 가능"],
            ["Momentum", "이전 운동량(관성)을 가속도로 활용", "관성 유지, 안장점 탈출"],
            ["NAG", "관성 방향으로 '미리 한 걸음 이동한 위치의 기울기' 확인", "앞으로 갈 위치의 기울기 미리 확인"],
            ["Adagrad", "자주 변하는 파라미터는 학습률을 작게, 드문 파라미터는 크게", "학습률 감쇄 (뒤로 갈수록 학습 멈춤)"],
            ["RMSprop", "지수이동평균을 적용해 Adagrad의 학습률 급감 문제 해결", "최근 기울기 가중치 반영"],
            ["Adam", "Momentum(방향) + RMSprop(보폭)의 결합", "현존 최고 범용 옵티마이저"]
          ]
        },
        memorizationRule: "★ 앞으로 갈 위치의 기울기를 미리 확인 ➔ 무조건 NAG! 모멘텀+RMSprop ➔ Adam!",
        traps: [
          "함정 선지: 'SGD는 진동 없이 완벽하게 직선으로 손실함수의 전역 최솟값에 수렴한다' ➔ 거짓! 노이즈와 진동이 매우 심합니다.",
          "함정 선지: 'Momentum은 다음 이동 위치의 기울기를 미리 측정하여 급정거한다' ➔ NAG 설명입니다."
        ],
        threeSecKey: "지문에 '앞으로 갈 위치의 기울기를 미리 확인'이 나오면 ➔ NAG(Nesterov)!",
        questions: [
          {
            qId: "q15-1-1",
            level: 1,
            questionText: "딥러닝 최적화(Optimizer) 알고리즘 중, 모멘텀(Momentum)이 갖는 관성으로 인한 과도한 이동(Overshooting) 문제를 해결하기 위해, '모멘텀 방향으로 먼저 이동한 미래 지점에서의 기울기를 미리 계산'하여 파라미터를 갱신하는 기법은?",
            options: [
              "① AdaGrad",
              "② RMSprop",
              "③ NAG (Nesterov Accelerated Gradient)",
              "④ Adam (Adaptive Moment Estimation)"
            ],
            correctAnswer: 2,
            reasonKeywords: ["모멘텀 방향으로 먼저 이동한 위치의 기울기를 미리 계산"],
            explanation: {
              correctReason: "관성 방향으로 미리 한 걸음 이동한 위치의 기울기를 확인하여 적절히 제동을 거는 기법은 'NAG(Nesterov Accelerated Gradient)'입니다.",
              wrongBreakdowns: [
                "① AdaGrad: 파라미터별로 학습률을 누적 감소시키는 방식입니다.",
                "② RMSprop: AdaGrad의 학습 정체 문제를 지수이동평균으로 개선한 방식입니다.",
                "④ Adam: Momentum과 RMSprop의 장점을 결합한 방식입니다."
              ]
            }
          }
        ]
      }
    ]
  },

  // ========================================================
  // 16단계. Attention과 Transformer
  // ========================================================
  {
    stageId: 16,
    stageNumber: 16,
    title: "16단계. Attention과 Transformer",
    subtitle: "어텐션 · 셀프 어텐션 · 인코더 · 디코더 · 장기 의존성",
    icon: "🤖",
    subjectNumber: 3,
    subjectName: "3과목 · 빅데이터 모델링",
    summaryTag: "Attention(중요 정보 집중, 장기의존성 해결) & Transformer(순환 구조 없는 병렬 처리)",
    concepts: [
      {
        id: "c16-1-transformer",
        name: "Attention 메커니즘과 Transformer 구조",
        engName: "Attention, Self-Attention, Encoder, Decoder, Transformer",
        oneLineDef: "Attention은 입력 시퀀스 전체에서 현재 예측에 가장 중요한 단어들에 가중치를 집중 부여하여 RNN의 장기 의존성(Long-term Dependency) 및 정보 손실 문제를 해결한 메커니즘이며, Transformer는 RNN/CNN 없이 오직 Self-Attention만으로 구성된 신경망 아키텍처.",
        easyExplain: "긴 영어 문장을 번역할 때, 문장 전체를 하나의 작은 가방(RNN 고정 벡터)에 억지로 구겨 넣지 않고, '그것(It)'이라는 단어를 번역할 때 원문의 '원숭이(Monkey)'와 '바나나(Banana)' 중 어디에 시선을 집중(Attention)해야 하는지 가중치를 매기는 방식입니다.",
        analogy: "두꺼운 책을 읽을 때 내용을 머릿속에 다 외우려고 끙끙대지 않고(RNN), 중요한 핵심 문장에 형광펜을 칠해가며(Attention) 한눈에 전체 페이지를 펼쳐놓고 보는 것(Transformer 병렬 처리).",
        superEasyAnalogy: "Encoder = 문장을 읽고 깊은 맥락을 이해하는 뇌(예: BERT), Decoder = 단어를 하나씩 생성하는 입(예: GPT).",
        keywords: [
          "Attention: 중요한 정보에 가중치 집중, '장기 의존성(Long-term Dependency)' 문제 해결",
          "Self-Attention: 같은 문장 내부의 단어들 간의 상호 관계(Q, K, V) 계산",
          "Transformer: RNN 구조 완전 배제, 완전 병렬 처리 가능",
          "Encoder: 입력 문장의 맥락과 의미를 표현 (예: BERT)",
          "Decoder: 이전 토큰들을 기반으로 다음 토큰 생성 (예: GPT)"
        ],
        examExpressions: [
          "어텐션(Attention) 메커니즘은 RNN의 고정 길이 벡터로 인한 정보 손실과 장기 의존성 문제를 극복하기 위해 제안되었다.",
          "트랜스포머(Transformer) 모델은 순환 신경망(RNN)을 사용하지 않고 셀프 어텐션(Self-Attention) 구조만을 사용하여 병렬 처리가 가능하다."
        ],
        confusingConcept: "RNN의 순차 처리 vs Transformer의 완전 병렬 Attention 처리.",
        comparisonTable: {
          headers: ["구분", "순환 신경망 (RNN / LSTM)", "트랜스포머 (Transformer)"],
          rows: [
            ["기본 구조", "단어를 시간 순서대로 1개씩 순차 처리", "순환 구조 없이 전체 시퀀스를 한 번에 병렬 처리 (Self-Attention)"],
            ["장기 의존성", "문장이 길어지면 초기 정보가 소실됨", "모든 단어 간의 거리가 1로 일정하여 장기 의존성 완벽 해결"],
            ["학습 속도", "순차 연산으로 GPU 병렬화 불가 (느림)", "행렬 연산으로 대규모 병렬 학습 가능 (매우 빠름)"],
            ["대표 모델", "Vanilla RNN, LSTM, GRU", "BERT (인코더), GPT (디코더), T5"]
          ]
        },
        memorizationRule: "★ Attention ➔ 중요한 정보에 집중 & 장기 의존성 해결! Transformer ➔ RNN 없는 완전 병렬 Self-Attention!",
        traps: [
          "함정 선지: '트랜스포머는 RNN의 순환 은닉 상태(Hidden State)를 기반으로 동작한다' ➔ 거짓! RNN을 완전히 제거했습니다.",
          "함정 선지: '어텐션 메커니즘은 문장의 모든 단어에 항상 동일한 가중치를 균등 배분한다' ➔ 거짓! 중요도에 따라 차등 가중치를 둡니다."
        ],
        threeSecKey: "지문에 '중요 정보에 가중치 집중', '장기 의존성 해결', 'RNN 없는 병렬 Self-Attention' ➔ Attention & Transformer!",
        questions: [
          {
            qId: "q16-1-1",
            level: 1,
            questionText: "자연어 처리(NLP) 분야에서 제안된 어텐션 메커니즘(Attention Mechanism) 및 트랜스포머(Transformer) 모델에 대한 설명으로 가장 옳지 않은 것은?",
            options: [
              "① 어텐션 메커니즘은 기존 RNN 기반 Seq2Seq 모델의 고정 크기 맥락 벡터로 인한 정보 손실 및 장기 의존성(Long-term Dependency) 한계를 극복하였다.",
              "② 트랜스포머 모델은 순환 신경망(RNN)과 합성곱 신경망(CNN)을 결합하여 순차적으로 시계열 데이터를 학습한다.",
              "③ 셀프 어텐션(Self-Attention)은 쿼리(Query), 키(Key), 값(Value) 벡터 간의 유사도를 계산하여 문장 내부 단어들 간의 상호 관계를 파악한다.",
              "④ 인코더(Encoder)는 입력 텍스트의 문맥을 압축 및 표현하는 데 특화되어 있으며, 디코더(Decoder)는 다음 단어를 순차적으로 생성하는 언어 생성에 특화되어 있다."
            ],
            correctAnswer: 1,
            reasonKeywords: ["트랜스포머는 RNN과 CNN을 쓰지 않고 오직 Self-Attention으로만 구성됨"],
            explanation: {
              correctReason: "②번이 틀렸습니다! 트랜스포머(Transformer)의 논문 제목이 'Attention Is All You Need'인 것처럼, RNN이나 CNN을 전혀 사용하지 않고 오직 어텐션(Attention) 메커니즘만으로 아키텍처를 구축하여 완전한 병렬 처리를 달성했습니다.",
              wrongBreakdowns: [
                "① 맞음: Attention의 핵심 등장 배경입니다.",
                "③ 맞음: Self-Attention의 Q, K, V 연산 원리입니다.",
                "④ 맞음: 인코더(BERT 계열)와 디코더(GPT 계열)의 역할 분담입니다."
              ]
            }
          }
        ]
      }
    ]
  }
];

// 3초 판단 치트키 플래시카드 마스터 딕셔너리
const THREE_SEC_CHEATS = [
  { keyword: "각 집단에서 무작위로 표본 추출", concept: "층화표본추출", stage: 1, hint: "층 내 동질, 층 간 이질" },
  { keyword: "집단 자체를 무작위로 통째 선택", concept: "군집표본추출", stage: 1, hint: "군집 내 이질, 군집 간 동질" },
  { keyword: "첫 번째만 랜덤, 이후 일정한 간격 k", concept: "계통표본추출", stage: 1, hint: "주기성 주의" },
  { keyword: "실제 참값(True Value)과 일치", concept: "정확성 (Accuracy)", stage: 2, hint: "오차 없는 실제값" },
  { keyword: "필수 데이터에 결측값(Null) 없음", concept: "완전성 (Completeness)", stage: 2, hint: "누락/공백 부재" },
  { keyword: "여러 시스템 간 데이터 모순 없음", concept: "일관성 (Consistency)", stage: 2, hint: "상호 일치" },
  { keyword: "소표본(n < 2000) 대표 정규성 검정", concept: "Shapiro-Wilk 검정", stage: 3, hint: "정규분포 검정" },
  { keyword: "독립 2집단 + 정규성 미만족(비모수)", concept: "맨-휘트니 U 검정", stage: 3, hint: "독립 비모수" },
  { keyword: "대응 2집단(전후) + 정규성 미만족(비모수)", concept: "윌콕슨 부호순위 검정", stage: 3, hint: "대응 비모수" },
  { keyword: "예측 양성(TP+FP) 중 실제 양성(TP)", concept: "정밀도 (Precision)", stage: 4, hint: "스팸 필터" },
  { keyword: "실제 양성(TP+FN) 중 예측 양성(TP)", concept: "재현율 (Recall / 민감도)", stage: 4, hint: "암 진단" },
  { keyword: "실제 음성(TN+FP) 중 예측 음성(TN)", concept: "특이도 (Specificity)", stage: 4, hint: "1 - FPR" },
  { keyword: "학습 전 분석가(사용자)가 직접 설정", concept: "하이퍼파라미터", stage: 5, hint: "학습률, K, 은닉층수" },
  { keyword: "학습 과정에서 모델이 자동 결정", concept: "파라미터", stage: 5, hint: "가중치 W, 편향 b" },
  { keyword: "훈련 오차는 주는데 검증 오차가 재상승", concept: "과대적합 (Overfitting)", stage: 6, hint: "High Variance" },
  { keyword: "L1 규제, 일부 가중치를 '정확히 0'으로", concept: "Lasso 회귀", stage: 7, hint: "변수 선택, Sparse" },
  { keyword: "L2 규제, 가중치를 '0에 가깝게 작게'", concept: "Ridge 회귀", stage: 7, hint: "가중치 축소" },
  { keyword: "이름은 회귀이나 범주형 확률 예측 분류 모델", concept: "로지스틱 회귀", stage: 8, hint: "Sigmoid" },
  { keyword: "다중 클래스 분류 시 확률 총합 1 정규화", concept: "소프트맥스 (Softmax)", stage: 8, hint: "3개 이상 분류" },
  { keyword: "여러 나무 + Bagging + '변수 무작위 선택'", concept: "Random Forest", stage: 9, hint: "변수 부분집합" },
  { keyword: "초평면과 서포트 벡터 사이 마진 최대화", concept: "SVM", stage: 10, hint: "Support Vector" },
  { keyword: "저차원 비선형을 고차원 선형으로 매핑", concept: "커널 트릭 (Kernel Trick)", stage: 10, hint: "RBF 커널" },
  { keyword: "군집 수 K를 미리 정하지 않는 밀도 기반", concept: "DBSCAN", stage: 11, hint: "노이즈 자동 감지" },
  { keyword: "모델 학습 없이 통계적 척도로만 변수 선택", concept: "Filter 기법", stage: 12, hint: "상관계수, 카이제곱" },
  { keyword: "소수 데이터 단순 복제 X, 새로운 합성 샘플 생성", concept: "SMOTE 오버샘플링", stage: 13, hint: "KNN 보간" },
  { keyword: "A를 샀을 때 B도 구매할 조건부 확률", concept: "신뢰도 (Confidence)", stage: 14, hint: "P(A∩B) / P(A)" },
  { keyword: "A 구매 시 B 구매율 증가 배수 (Lift=1 독립)", concept: "향상도 (Lift)", stage: 14, hint: "Lift > 1 양의 상관" },
  { keyword: "앞으로 이동할 위치의 기울기를 미리 확인", concept: "NAG (Nesterov)", stage: 15, hint: "과도한 오버슈팅 방지" },
  { keyword: "중요 정보에 가중치 집중 & 장기의존성 해결", concept: "Attention 메커니즘", stage: 16, hint: "형광펜 가중치" },
  { keyword: "RNN 없는 완전 병렬 Self-Attention 모델", concept: "트랜스포머 (Transformer)", stage: 16, hint: "Attention Is All You Need" },
  { keyword: "특이값/이상치 상하한선 치환 및 잡음 추가", concept: "특이화 (Outlier Truncation)", stage: 2, hint: "비식별 조치" },
  { keyword: "원시 데이터 무가공 저장, Schema-on-Read", concept: "데이터 레이크 (Data Lake)", stage: 1, hint: "비정형 저장소" },
  { keyword: "문제 탐색 ➔ 문제 정의 ➔ 해결방안 ➔ 타당성", concept: "하향식 접근법 (Top-down)", stage: 1, hint: "Problem First" },
  { keyword: "평균 > 중앙값 > 최빈값 (오른쪽 긴 꼬리)", concept: "양의 왜도 (Skewness > 0)", stage: 3, hint: "평 > 중 > 최" },
  { keyword: "게임 이론 섀플리 값 기반 공정 기여도 산출", concept: "SHAP (XAI)", stage: 10, hint: "Shapley Value" },
  { keyword: "국소 섭동 생성 ➔ 선형 대리 모델 근사", concept: "LIME (XAI)", stage: 10, hint: "Local Surrogate" },
  { keyword: "실제값 대비 백분율 오차, 스케일 독립 지표", concept: "MAPE", stage: 4, hint: "Percentage Error" },
  { keyword: "학습해야 할 가중치 파라미터가 0개인 계층", concept: "풀링 계층 (Pooling)", stage: 15, hint: "다운샘플링" },
  { keyword: "우연에 의한 일치 확률을 배제한 일치도", concept: "코헨의 카파 계수 (Kappa)", stage: 4, hint: "일치도 측정" },
  { keyword: "다중공선성 존재 위험 판단 기준 (Tolerance <= 0.1)", concept: "VIF >= 10", stage: 12, hint: "분산팽창요인" },
  { keyword: "경계면 최근접 이웃 쌍 탐색 후 다수 제거", concept: "토멕 링크 (Tomek Links)", stage: 13, hint: "언더샘플링" },
  { keyword: "변수 간 상관관계와 공분산을 반영한 거리", concept: "마할라노비스 거리", stage: 11, hint: "타원형 분포" },
  { keyword: "주변 문맥 단어들로 중심 단어 하나를 예측", concept: "CBOW (Word2Vec)", stage: 16, hint: "주변 ➔ 중심" },
  { keyword: "중심 단어 하나로 주변 문맥 단어들을 예측", concept: "Skip-Gram (Word2Vec)", stage: 16, hint: "중심 ➔ 주변" }
];

window.TUTOR_CURRICULUM = TUTOR_CURRICULUM;
window.THREE_SEC_CHEATS = THREE_SEC_CHEATS;


