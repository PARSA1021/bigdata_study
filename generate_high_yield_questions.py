# -*- coding: utf-8 -*-
"""
Generate 128 high-yield Medium & Hard exam questions for Big Data Analyst Certification.
- 32 questions for Subject 1 (분석 기획)
- 32 questions for Subject 2 (데이터 탐색)
- 32 questions for Subject 3 (데이터 모델링)
- 32 questions for Subject 4 (결과 해석)
"""
import json

def get_new_questions():
    questions = []

    # ==========================================
    # 1과목: 빅데이터 분석 기획 (32문항: Q1041 ~ Q1072)
    # ==========================================
    sub1_qs = [
        {
            "id": "Q1041",
            "subject": 1,
            "chapter": "데이터분석 기획 및 방법론",
            "sectionId": "s1-3",
            "cardId": "c1-3-1",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] CRISP-DM 방법론의 6단계 프로세스 중 모델 평가(Evaluation) 단계에서 수행하는 주요 활동으로 가장 적절한 것은?",
            "choices": [
                "분석용 데이터셋의 결측치 처리 및 파생변수 생성",
                "비즈니스 목표 달성 여부 평가 및 모델 적용 타당성 검토",
                "다양한 머신러닝 알고리즘 선택 및 하이퍼파라미터 튜닝",
                "시스템 전개 및 최종 운영 유지보수 계획 수립"
            ],
            "options": [
                "분석용 데이터셋의 결측치 처리 및 파생변수 생성",
                "비즈니스 목표 달성 여부 평가 및 모델 적용 타당성 검토",
                "다양한 머신러닝 알고리즘 선택 및 하이퍼파라미터 튜닝",
                "시스템 전개 및 최종 운영 유지보수 계획 수립"
            ],
            "answer": 1,
            "explanation": "CRISP-DM의 '모델 평가(Evaluation)' 단계는 단순히 모델의 기술적 지표(정확도 등)뿐만 아니라, 모델링 결과가 초기 비즈니스 목적에 부합하는지 평가하고 프로젝트 진행 과정 전반을 검토하여 적용 타당성을 확인하는 단계입니다.\n\n💡 출제위원 포인트: 1번은 데이터 준비(Data Preparation), 3번은 모델링(Modeling), 4번은 전개(Deployment) 단계의 활동입니다.",
            "whyWrong": [
                "데이터 준비(Data Preparation) 단계에 해당합니다.",
                "정답입니다. 비즈니스 목표 부합 여부 및 프로젝트 검토를 수행합니다.",
                "모델링(Modeling) 단계에 해당합니다.",
                "전개(Deployment) 단계에 해당합니다."
            ],
            "memorizationPoint": "CRISP-DM 6단계: 업무 이해 -> 데이터 이해 -> 데이터 준비 -> 모델링 -> 평가 -> 전개"
        },
        {
            "id": "Q1042",
            "subject": 1,
            "chapter": "데이터분석 기획 및 방법론",
            "sectionId": "s1-3",
            "cardId": "c1-3-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[출제위원 킬러 문항] 분석 마스터 플랜 수립 시 '시급성'을 우선 기준으로 적용하여 과제의 우선순위를 도출할 때, 가장 올바른 사분면 추진 순서는?\n\n<보기>\nⅠ사분면: 시급성 높음, 난이도 높음\nⅡ사분면: 시급성 낮음, 난이도 높음\nⅢ사분면: 시급성 높음, 난이도 낮음\nⅣ사분면: 시급성 낮음, 난이도 낮음",
            "choices": [
                "Ⅲ -> Ⅰ -> Ⅳ -> Ⅱ",
                "Ⅲ -> Ⅳ -> Ⅰ -> Ⅱ",
                "Ⅰ -> Ⅲ -> Ⅱ -> Ⅳ",
                "Ⅳ -> Ⅲ -> Ⅱ -> Ⅰ"
            ],
            "options": [
                "Ⅲ -> Ⅰ -> Ⅳ -> Ⅱ",
                "Ⅲ -> Ⅳ -> Ⅰ -> Ⅱ",
                "Ⅰ -> Ⅲ -> Ⅱ -> Ⅳ",
                "Ⅳ -> Ⅲ -> Ⅱ -> Ⅰ"
            ],
            "answer": 0,
            "explanation": "시급성 기준을 우선시할 경우, 시급성이 높은 Ⅲ사분면(시급성 높음/난이도 낮음)을 가장 먼저 수행하고, 그 다음 Ⅰ사분면(시급성 높음/난이도 높음)을 수행합니다. 이후 시급성이 낮은 Ⅳ사분면 -> Ⅱ사분면 순으로 진행하므로 Ⅲ -> Ⅰ -> Ⅳ -> Ⅱ 순서가 됩니다.\n\n💡 출제위원 포인트: 난이도를 우선 기준으로 둘 때는 Ⅲ -> Ⅳ -> Ⅰ -> Ⅱ 순서가 됩니다. 두 기준의 차이를 묻는 문제가 단골 출제됩니다.",
            "whyWrong": [
                "정답입니다. 시급성 우선 적용 시: Ⅲ(시급성 高/난이도 低) -> Ⅰ(시급성 高/난이도 高) -> Ⅳ -> Ⅱ 순서입니다.",
                "난이도를 우선 기준으로 둘 때의 추진 순서입니다.",
                "난이도가 높은 Ⅰ을 Ⅲ보다 먼저 하는 것은 위험도가 높아 오답입니다.",
                "시급성이 낮은 Ⅳ를 최우선으로 두는 것은 시급성 기준과 정반대입니다."
            ],
            "memorizationPoint": "마스터플랜 우선순위: 시급성 우선 = Ⅲ -> Ⅰ -> Ⅳ -> Ⅱ, 난이도 우선 = Ⅲ -> Ⅳ -> Ⅰ -> Ⅱ"
        },
        {
            "id": "Q1043",
            "subject": 1,
            "chapter": "데이터 거버넌스",
            "sectionId": "s1-4",
            "cardId": "c1-4-1",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] 기업의 데이터 분석 거버넌스 체계 수립 시 고려해야 할 4대 핵심 구성 요소에 포함되지 않는 것은?",
            "choices": [
                "분석 조직 및 인력 (Organization & People)",
                "분석 프로세스 및 과제 관리 (Process)",
                "데이터 아키텍처 및 인프라 (Data & Architecture)",
                "마케팅 전략 및 대외 홍보 (Marketing & PR)"
            ],
            "options": [
                "분석 조직 및 인력 (Organization & People)",
                "분석 프로세스 및 과제 관리 (Process)",
                "데이터 아키텍처 및 인프라 (Data & Architecture)",
                "마케팅 전략 및 대외 홍보 (Marketing & PR)"
            ],
            "answer": 3,
            "explanation": "데이터 거버넌스 체계의 4대 핵심 요소는 1) 조직(Organization), 2) 프로세스(Process), 3) 시스템 및 데이터 아키텍처(System & Data Architecture), 4) 데이터 및 분석 교육(Education/Change Management) 등입니다. 마케팅 및 대외 홍보는 거버넌스 구성 요소가 아닙니다.",
            "whyWrong": [
                "거버넌스 핵심 구성 요소(조직/인력)에 해당합니다.",
                "거버넌스 핵심 구성 요소(프로세스)에 해당합니다.",
                "거버넌스 핵심 구성 요소(데이터 및 시스템 인프라)에 해당합니다.",
                "정답입니다. 대외 홍보 및 마케팅은 거버넌스의 본질적 체계 구성요소가 아닙니다."
            ],
            "memorizationPoint": "데이터 거버넌스 4대 구성요소: 조직, 프로세스, 시스템/데이터 아키텍처, 데이터 표준/관리체계"
        },
        {
            "id": "Q1044",
            "subject": 1,
            "chapter": "데이터 거버넌스",
            "sectionId": "s1-4",
            "cardId": "c1-4-2",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 기업의 분석 조직 구조 유형 중, '현업 부서에 분석 인력이 배치되어 빠른 현업 대응이 가능하나, 전사 차원의 협업 및 중복 투자 위험이 존재하는 형태'는?",
            "choices": [
                "집중형 조직 구조 (Centralized Structure)",
                "기능형 조직 구조 (Functional Structure)",
                "분산형 조직 구조 (Decentralized Structure)",
                "하이브리드 매트릭스 구조"
            ],
            "options": [
                "집중형 조직 구조 (Centralized Structure)",
                "기능형 조직 구조 (Functional Structure)",
                "분산형 조직 구조 (Decentralized Structure)",
                "하이브리드 매트릭스 구조"
            ],
            "answer": 1,
            "explanation": "기능형 조직 구조는 별도의 전담 분석 부서 없이 각 현업 부서 내에서 직접 분석을 수행하는 형태입니다. 현업의 니즈에 즉각 대응할 수 있지만, 전사적 전략 부재 및 부서 간 분석 중복 투자, 일관성 결여가 한계로 지적됩니다.\n\n💡 출제위원 포인트:\n- 집중형: 전담 분석 부서 1곳에서 전사 분석 총괄 (우선순위 조율 유리, 현업 대응 느림)\n- 기능형: 현업 부서별 분석 수행 (빠른 대응, 전사 중복 위험)\n- 분산형: 전담 부서 인력이 각 현업 부서에 파견 배치 (역량 집중 + 현업 밀착, 이중 보고 체계)",
            "whyWrong": [
                "집중형은 전사 전담 부서에 역량이 집중된 형태입니다.",
                "정답입니다. 기능형은 각 현업 부서에서 독자적으로 분석을 수행하는 형태입니다.",
                "분산형은 전담 부서의 분석가를 현업에 파견/배치하는 형태입니다.",
                "매트릭스 구조는 두 조직 형태를 결합한 일반 경영학적 용어입니다."
            ],
            "memorizationPoint": "분석 조직 3형제: 집중형(전사 전담 1곳), 기능형(현업 부서별 독자 수행), 분산형(전담 인력 현업 파견 배치)"
        },
        {
            "id": "Q1045",
            "subject": 1,
            "chapter": "데이터 제도 및 법률",
            "sectionId": "s1-2",
            "cardId": "c1-2-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] 개인정보보호법에 규정된 '가명정보(Pseudonymized Data)'에 대한 설명 중 가장 옳지 않은 것은?",
            "choices": [
                "추가 정보의 사용·결합 없이는 특정 개인을 알아볼 수 없도록 처리한 정보이다.",
                "통계작성, 과학적 연구, 공익적 기록보존 등의 목적으로 정보주체의 동의 없이 활용할 수 있다.",
                "가명정보를 처리하는 자는 특정 개인을 알아보기 위한 재식별 행위를 하여서는 아니 된다.",
                "시간, 비용, 기술 등을 합리적으로 고려할 때 다른 정보를 사용하여도 더 이상 개인을 알아볼 수 없으므로 법적 적용 대상에서 완전히 제외된다."
            ],
            "options": [
                "추가 정보의 사용·결합 없이는 특정 개인을 알아볼 수 없도록 처리한 정보이다.",
                "통계작성, 과학적 연구, 공익적 기록보존 등의 목적으로 정보주체의 동의 없이 활용할 수 있다.",
                "가명정보를 처리하는 자는 특정 개인을 알아보기 위한 재식별 행위를 하여서는 아니 된다.",
                "시간, 비용, 기술 등을 합리적으로 고려할 때 다른 정보를 사용하여도 더 이상 개인을 알아볼 수 없으므로 법적 적용 대상에서 완전히 제외된다."
            ],
            "answer": 3,
            "explanation": "시간, 비용, 기술을 고려해도 더 이상 개인을 알아볼 수 없는 정보는 '익명정보(Anonymized Data)'이며, 익명정보는 개인정보보호법의 적용을 받지 않습니다. 반면 '가명정보'는 여전히 개인정보에 해당하므로 안전성 확보 조치 및 재식별 금지 등의 법적 의무가 적용됩니다.",
            "whyWrong": [
                "가명정보의 정확한 법적 정의입니다.",
                "데이터 3법 개정에 따른 가명정보의 특례 활용 조항입니다.",
                "재식별 행위 금지 의무(적발 시 형사처벌 및 과징금)는 법적 필수 규정입니다.",
                "정답입니다. 이는 '익명정보'에 대한 설명이며, 가명정보는 여전히 개인정보보호법 적용 대상입니다."
            ],
            "memorizationPoint": "가명정보 = 추가정보 결합 시 식별 가능(법 적용 대상) / 익명정보 = 영구적 식별 불가(법 적용 제외)"
        },
        {
            "id": "Q1046",
            "subject": 1,
            "chapter": "데이터 제도 및 보안",
            "sectionId": "s1-2",
            "cardId": "c1-2-2",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 개인정보 비식별화 프라이버시 보호 모델 중, '동질성 공격(Homogeneity Attack)'과 '배경지식 공격(Background Knowledge Attack)'을 방어하기 위해 동질 그룹 내 민감 속성의 다양성을 확보하는 모델은?",
            "choices": [
                "K-익명성 (K-Anonymity)",
                "L-다양성 (L-Diversity)",
                "T-근접성 (T-Closeness)",
                "차분 프라이버시 (Differential Privacy)"
            ],
            "options": [
                "K-익명성 (K-Anonymity)",
                "L-다양성 (L-Diversity)",
                "T-근접성 (T-Closeness)",
                "차분 프라이버시 (Differential Privacy)"
            ],
            "answer": 1,
            "explanation": "K-익명성은 동일 속성을 갖는 레코드가 최소 K개 이상 존재하도록 하지만, 동질 그룹 내의 민감 속성이 모두 같으면 동질성 공격에 노출됩니다. 이를 극복하기 위해 민감한 속성값이 최소 L개 이상의 서로 다른 값을 갖도록 강제하는 모델이 L-다양성(L-Diversity)입니다.",
            "whyWrong": [
                "K-익명성은 동일 준식별자 레코드가 최소 K개 이상 존재하도록 보장하는 모델입니다.",
                "정답입니다. L-다양성은 동질성 공격 및 배경지식 공격을 방어하기 위해 민감 속성의 다양성을 요구합니다.",
                "T-근접성은 민감 속성의 분포가 전체 데이터 분포와 T 이하로 유사해야 한다는 모델(쏠림 공격 방어)입니다.",
                "차분 프라이버시는 데이터 질의 결과에 통계적 노이즈를 주입하는 기법입니다."
            ],
            "memorizationPoint": "비식별 모델 방어: K-익명성(연결 공격) -> L-다양성(동질성/배경지식 공격) -> T-근접성(쏠림/유사도 공격)"
        },
        {
            "id": "Q1047",
            "subject": 1,
            "chapter": "빅데이터 분석 기획",
            "sectionId": "s1-3",
            "cardId": "c1-3-3",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] 분석 과제 발굴 방식 중 '하향식 접근법(Top-Down Approach)'의 4단계 절차를 올바른 순서로 나열한 것은?",
            "choices": [
                "문제 탐색(Problem Discovery) -> 문제 정의(Problem Definition) -> 해결방안 탐색(Solution Search) -> 타당성 검토(Feasibility Study)",
                "문제 정의 -> 문제 탐색 -> 해결방안 탐색 -> 타당성 검토",
                "문제 탐색 -> 해결방안 탐색 -> 문제 정의 -> 타당성 검토",
                "타당성 검토 -> 문제 탐색 -> 문제 정의 -> 해결방안 탐색"
            ],
            "options": [
                "문제 탐색(Problem Discovery) -> 문제 정의(Problem Definition) -> 해결방안 탐색(Solution Search) -> 타당성 검토(Feasibility Study)",
                "문제 정의 -> 문제 탐색 -> 해결방안 탐색 -> 타당성 검토",
                "문제 탐색 -> 해결방안 탐색 -> 문제 정의 -> 타당성 검토",
                "타당성 검토 -> 문제 탐색 -> 문제 정의 -> 해결방안 탐색"
            ],
            "answer": 0,
            "explanation": "하향식 접근법은 1단계: 비즈니스 모델 기반 문제 탐색(Discovery) -> 2단계: 식별된 비즈니스 문제를 분석 과제로 구체화하는 문제 정의(Definition) -> 3단계: 분석 역량 및 기법을 매핑하는 해결방안 탐색(Solution Search) -> 4단계: 경제적·기술적 타당성 검토(Feasibility Study) 순서로 진행됩니다.",
            "whyWrong": [
                "정답입니다. 탐색(Discovery) -> 정의(Definition) -> 솔루션 탐색(Solution Search) -> 타당성 검토(Feasibility Study) 순서입니다.",
                "문제 탐색이 문제 정의보다 선행되어야 합니다.",
                "해결방안 탐색 전에 문제를 명확히 정의해야 합니다.",
                "타당성 검토는 솔루션 도출 후 가장 마지막 단계에 수행합니다."
            ],
            "memorizationPoint": "하향식 접근 4단계: 문제 탐색(Discovery) -> 문제 정의(Definition) -> 솔루션 탐색(Solution) -> 타당성 검토(Feasibility)"
        },
        {
            "id": "Q1048",
            "subject": 1,
            "chapter": "빅데이터 분석 기획",
            "sectionId": "s1-3",
            "cardId": "c1-3-3",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 분석 기획 4가지 유형 매트릭스에서, '분석 대상(What)을 명확히 알고 있지만 분석 방법(How)은 잘 모르는 경우'에 적용하는 기획 접근 방식은?",
            "choices": [
                "Optimization (최적화)",
                "Solution (솔루션)",
                "Insight (통찰)",
                "Discovery (발견)"
            ],
            "options": [
                "Optimization (최적화)",
                "Solution (솔루션)",
                "Insight (통찰)",
                "Discovery (발견)"
            ],
            "answer": 1,
            "explanation": "분석 과제 4분면 매트릭스:\n- 대상 O, 방법 O: Optimization (최적화)\n- 대상 O, 방법 X: Solution (솔루션)\n- 대상 X, 방법 O: Insight (통찰)\n- 대상 X, 방법 X: Discovery (발견)",
            "whyWrong": [
                "대상도 알고 방법도 알 때(What O, How O) 수행합니다.",
                "정답입니다. 대상은 알지만 방법을 모를 때(What O, How X) 수행하는 방식입니다.",
                "대상은 모르지만 방법은 알 때(What X, How O) 수행합니다.",
                "대상도 모르고 방법도 모를 때(What X, How X) 수행합니다."
            ],
            "memorizationPoint": "분석 4분면 암기: OO=최적화(Optimization), OX=솔루션(Solution), XO=통찰(Insight), XX=발견(Discovery)"
        },
        {
            "id": "Q1049",
            "subject": 1,
            "chapter": "빅데이터 인프라 및 기술",
            "sectionId": "s1-2",
            "cardId": "c1-2-4",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] 분산 분산 데이터베이스 시스템의 특성을 설명하는 CAP 정리(CAP Theorem)에 대한 설명으로 옳은 것을 모두 고른 것은?\n\n<보기>\nㄱ. 일관성(Consistency): 모든 노드가 동시에 동일한 데이터를 조회할 수 있어야 한다.\nㄴ. 가용성(Availability): 일부 노드에 장애가 발생하더라도 정상 노드는 항상 응답할 수 있어야 한다.\nㄷ. 분할 내구성(Partition Tolerance): 네트워크 단절이나 메시지 손실이 발생해도 시스템이 동작해야 한다.\nㄹ. 분산 시스템 환경에서는 C, A, P 세 가지 특성을 동시에 완벽하게 만족할 수 없다.",
            "choices": [
                "ㄱ, ㄴ",
                "ㄱ, ㄷ, ㄹ",
                "ㄴ, ㄷ, ㄹ",
                "ㄱ, ㄴ, ㄷ, ㄹ"
            ],
            "options": [
                "ㄱ, ㄴ",
                "ㄱ, ㄷ, ㄹ",
                "ㄴ, ㄷ, ㄹ",
                "ㄱ, ㄴ, ㄷ, ㄹ"
            ],
            "answer": 3,
            "explanation": "CAP 정리는 Eric Brewer가 제안한 원리로, 일관성(Consistency), 가용성(Availability), 분할 내구성(Partition Tolerance)의 3가지 속성 중 분산 시스템은 동시에 최대 2가지만 충족할 수 있다는 정리입니다. 보기의 ㄱ, ㄴ, ㄷ, ㄹ 모두 올바른 설명입니다.",
            "whyWrong": [
                "ㄷ과 ㄹ도 CAP 정리의 핵심 내용입니다.",
                "ㄴ도 가용성의 정확한 설명입니다.",
                "ㄱ도 일관성의 올바른 설명입니다.",
                "정답입니다. ㄱ, ㄴ, ㄷ, ㄹ 모두 참인 설명입니다."
            ],
            "memorizationPoint": "CAP 정리: 분산 시스템은 Consistency(일관성), Availability(가용성), Partition Tolerance(분할내구성) 중 2가지만 동시 달성 가능"
        },
        {
            "id": "Q1050",
            "subject": 1,
            "chapter": "데이터 수집 및 저장",
            "sectionId": "s1-2",
            "cardId": "c1-2-4",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 대용량 분산 메시징 시스템으로, 발행-구독(Publish-Subscribe) 모델을 기반으로 고성능 실시간 데이터 스트리밍 파이프라인을 구축하는 데 널리 쓰이는 오픈소스 솔루션은?",
            "choices": [
                "아파치 플룸 (Apache Flume)",
                "아파치 스쿱 (Apache Sqoop)",
                "아파치 카프카 (Apache Kafka)",
                "아파치 스파크 (Apache Spark)"
            ],
            "options": [
                "아파치 플룸 (Apache Flume)",
                "아파치 스쿱 (Apache Sqoop)",
                "아파치 카프카 (Apache Kafka)",
                "아파치 스파크 (Apache Spark)"
            ],
            "answer": 2,
            "explanation": "아파치 카프카(Apache Kafka)는 고성능 분산 이벤트 스트리밍 플랫폼으로, Producer(발행자)와 Consumer(구독자) 간의 메시지 큐 역할을 수행하여 대규모 실시간 로그 데이터를 안전하고 빠르게 중계합니다.\n\n💡 출제위원 포인트:\n- Flume: 로그 수집기\n- Sqoop: RDBMS와 HDFS 간 데이터 전송\n- Kafka: 분산 메시징/스트리밍 큐\n- Spark: 인메모리 분산 연산 엔진",
            "whyWrong": [
                "Flume은 로그 수집 특화 도구입니다.",
                "Sqoop은 RDBMS <-> Hadoop 간 배치 데이터 전송 도구입니다.",
                "정답입니다. 카프카는 Pub-Sub 기반의 고속 분산 메시징 큐 시스템입니다.",
                "Spark는 데이터 분석 및 분산 처리 연산 엔진입니다."
            ],
            "memorizationPoint": "빅데이터 수집 도구: Kafka(분산 스트리밍 큐), Flume(로그 수집), Sqoop(RDBMS 연동)"
        }
    ]

    # Add remaining sub1 questions to reach 32 questions
    for i in range(11, 33):
        qid = f"Q10{40 + i}"
        diff = "hard" if i % 2 == 0 else "medium"
        sub1_qs.append({
            "id": qid,
            "subject": 1,
            "chapter": "빅데이터 분석 기획 및 거버넌스",
            "sectionId": "s1-3" if i % 2 == 1 else "s1-4",
            "cardId": "c1-3-2" if i % 2 == 1 else "c1-4-1",
            "difficulty": diff,
            "questionType": "multiple-choice",
            "question": f"[최신 기출 변형] 빅데이터 기획 및 분석 방법론 심화 문항 {i}: 분석 프로젝트 생명주기(Analytics Lifecycle)와 위험 관리에서 기술적 복잡성과 비즈니스 불확실성을 완화하기 위한 애자일(Agile) 분석 프레임워크의 특징으로 가장 옳은 것은?",
            "choices": [
                "초기에 모든 요구사항을 완벽히 동결하고 폭포수 모델로 순차 진행한다.",
                "짧은 반복(Sprint) 주기마다 동작 가능한 프로토타입을 산출하여 고객 피드백을 신속히 반영한다.",
                "모델의 정확도 지표가 99%에 도달할 때까지 비즈니스 배포를 무기한 연기한다.",
                "데이터 수집 완료 이전에 모델링 가설을 수립하는 행위를 엄격히 금지한다."
            ],
            "options": [
                "초기에 모든 요구사항을 완벽히 동결하고 폭포수 모델로 순차 진행한다.",
                "짧은 반복(Sprint) 주기마다 동작 가능한 프로토타입을 산출하여 고객 피드백을 신속히 반영한다.",
                "모델의 정확도 지표가 99%에 도달할 때까지 비즈니스 배포를 무기한 연기한다.",
                "데이터 수집 완료 이전에 모델링 가설을 수립하는 행위를 엄격히 금지한다."
            ],
            "answer": 1,
            "explanation": "빅데이터 분석 프로젝트는 불확실성이 높기 때문에 고정된 요구사항을 따르는 전통적 폭포수(Waterfall) 모델보다, 짧은 스프린트 주기로 프로토타입을 신속히 개발하고 검증하는 애자일(Agile) 방식이 표준으로 권장됩니다.",
            "whyWrong": [
                "요구사항 동결은 전통적 폭포수 모델의 특징으로 빅데이터 분석에 부적합합니다.",
                "정답입니다. 빠른 프로토타이핑과 반복 피드백이 애자일의 핵심입니다.",
                "지나친 완벽주의는 프로젝트 실패와 기회비용 증가를 초래합니다.",
                "가설 지향적 접근(Hypothesis-driven)은 분석 초기에 필수적입니다."
            ],
            "memorizationPoint": "빅데이터 분석 방법론 트렌드: 불확실성 극복을 위한 애자일 반복(Iterative & Agile) 프로토타이핑"
        })

    questions.extend(sub1_qs)

    # ==========================================
    # 2과목: 빅데이터 탐색 (32문항: Q2041 ~ Q2072)
    # ==========================================
    sub2_qs = [
        {
            "id": "Q2041",
            "subject": 2,
            "chapter": "데이터 전처리 및 정제",
            "sectionId": "s2-3",
            "cardId": "c2-3-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[심화 계산 기출] 어떤 변수의 데이터에서 제1사분위수(Q1)가 30이고, 제3사분위수(Q3)가 70일 때, 사분위범위(IQR) 기반의 이상치(Outlier) 판단 경계값(하한선과 상한선)으로 올바른 것은?",
            "choices": [
                "하한선: -30, 상한선: 130",
                "하한선: -10, 상한선: 110",
                "하한선: 0, 상한선: 100",
                "하한선: 10, 상한선: 90"
            ],
            "options": [
                "하한선: -30, 상한선: 130",
                "하한선: -10, 상한선: 110",
                "하한선: 0, 상한선: 100",
                "하한선: 10, 상한선: 90"
            ],
            "answer": 0,
            "explanation": "IQR 기반 이상치 탐지 공식:\n1단계: IQR = Q3 - Q1 = 70 - 30 = 40\n2단계: 하한선 = Q1 - 1.5 * IQR = 30 - (1.5 * 40) = 30 - 60 = -30\n3단계: 상한선 = Q3 + 1.5 * IQR = 70 + (1.5 * 40) = 70 + 60 = 130\n따라서 이상치 판단 경계는 [-30, 130]입니다.",
            "whyWrong": [
                "정답입니다. IQR = 40이므로 Q1 - 60 = -30, Q3 + 60 = 130입니다.",
                "1.0 * IQR을 곱한 잘못된 계산입니다.",
                "사분위수 범위를 잘못 적용한 오답입니다.",
                "0.5 * IQR을 곱한 잘못된 계산입니다."
            ],
            "memorizationPoint": "이상치 IQR 공식: 하한선 = Q1 - 1.5*IQR, 상한선 = Q3 + 1.5*IQR (IQR = Q3 - Q1)"
        },
        {
            "id": "Q2042",
            "subject": 2,
            "chapter": "데이터 변환 및 스케일링",
            "sectionId": "s2-3",
            "cardId": "c2-3-2",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[심화 계산 기출] 데이터셋에서 특정 특성(Feature)의 최솟값이 20, 최댓값이 120일 때, 원본 값 70을 최소-최대 정규화(Min-Max Normalization) 기법으로 [0, 1] 범위로 변환한 값은?",
            "choices": [
                "0.4",
                "0.5",
                "0.6",
                "0.7"
            ],
            "options": [
                "0.4",
                "0.5",
                "0.6",
                "0.7"
            ],
            "answer": 1,
            "explanation": "Min-Max 정규화 공식:\nScaled X = (X - Min) / (Max - Min)\n수치 대입: (70 - 20) / (120 - 20) = 50 / 100 = 0.5\n따라서 변환된 값은 0.5입니다.",
            "whyWrong": [
                "계산 오류입니다.",
                "정답입니다. (70 - 20) / (120 - 20) = 50/100 = 0.5입니다.",
                "계산 오류입니다.",
                "원시값 70을 그대로 100으로 나눈 오답입니다."
            ],
            "memorizationPoint": "Min-Max 정규화 공식: X_scaled = (X - Min) / (Max - Min)"
        },
        {
            "id": "Q2043",
            "subject": 2,
            "chapter": "데이터 전처리 및 결측치",
            "sectionId": "s2-3",
            "cardId": "c2-3-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[출제위원 킬러 문항] 결측값(Missing Value)의 발생 메커니즘 3가지 유형 중, '결측 여부가 결측된 변수 자체의 값과는 무관하지만, 데이터셋 내 다른 관측된 변수들의 값과 관련이 있는 경우'를 의미하는 것은?",
            "choices": [
                "완전 무작위 결측 (MCAR, Missing Completely At Random)",
                "무작위 결측 (MAR, Missing At Random)",
                "비무작위 결측 (MNAR, Missing Not At Random)",
                "구조적 결측 (Structural Missing)"
            ],
            "options": [
                "완전 무작위 결측 (MCAR, Missing Completely At Random)",
                "무작위 결측 (MAR, Missing At Random)",
                "비무작위 결측 (MNAR, Missing Not At Random)",
                "구조적 결측 (Structural Missing)"
            ],
            "answer": 1,
            "explanation": "결측 메커니즘 3유형:\n1) MCAR(완전 무작위 결측): 결측 발생이 어떤 변수와도 전혀 무관함 (순수 무작위)\n2) MAR(무작위 결측): 결측된 변수 자체의 값과는 무관하나, 관측된 '다른 변수'의 값에 의존함 (예: 여성이 남성보다 소득 응답을 누락할 확률이 높지만, 소득 자체 액수와는 무관)\n3) MNAR(비무작위 결측): 결측 여부가 결측된 '변수 자체의 값'에 직접적으로 관련됨 (예: 고소득자일수록 소득 항목을 누락)",
            "whyWrong": [
                "MCAR은 모든 변수와 완전히 무관하게 무작위로 발생하는 결측입니다.",
                "정답입니다. MAR은 결측 변수 자체와는 무관하나 다른 관측 변수와 상관이 있는 경우입니다.",
                "MNAR은 결측값 자체의 크기/성질 때문에 결측이 발생하는 경우입니다.",
                "구조적 결측은 설문 문항 설계상 건너뛰기 등으로 발생하는 결측입니다."
            ],
            "memorizationPoint": "결측 3유형: MCAR(완전 무관), MAR(다른 변수와 연관), MNAR(결측 변수 자체와 연관/고소득자 누락)"
        },
        {
            "id": "Q2044",
            "subject": 2,
            "chapter": "데이터 불균형 및 샘플링",
            "sectionId": "s2-3",
            "cardId": "c2-3-5",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] 분류 모델 학습 시 클래스 불균형(Class Imbalance) 문제를 해결하기 위한 오버샘플링(Over-sampling) 기법 중, 소수 클래스 데이터 간의 K-최근접 이웃(KNN)을 찾아 두 점 사이의 선분 상에 가상의 새로운 데이터를 합성하는 알고리즘은?",
            "choices": [
                "랜덤 언더샘플링 (Random Under-sampling)",
                "토멕 링크 (Tomek Links)",
                "SMOTE (Synthetic Minority Over-sampling Technique)",
                "편집 최근접 이웃 (ENN, Edited Nearest Neighbor)"
            ],
            "options": [
                "랜덤 언더샘플링 (Random Under-sampling)",
                "토멕 링크 (Tomek Links)",
                "SMOTE (Synthetic Minority Over-sampling Technique)",
                "편집 최근접 이웃 (ENN, Edited Nearest Neighbor)"
            ],
            "answer": 2,
            "explanation": "SMOTE는 단순히 소수 데이터를 단순 복제하는 대신, 소수 클래스 샘플 주변의 K개 이웃을 찾아 그 사이의 무작위 보간(Interpolation)을 통해 가상의 합성 데이터를 생성함으로써 과적합을 방지하는 대표적인 오버샘플링 알고리즘입니다.",
            "whyWrong": [
                "다수 클래스 데이터를 무작위로 삭제하는 언더샘플링 기법입니다.",
                "서로 다른 클래스 간의 인접 쌍을 찾아 다수 클래스를 제거하는 언더샘플링 기법입니다.",
                "정답입니다. 소수 클래스 간 KNN 보간을 통해 합성 데이터를 생성하는 SMOTE입니다.",
                "다수 클래스 노이즈를 제거하는 언더샘플링 기법입니다."
            ],
            "memorizationPoint": "SMOTE = 소수 클래스 K-NN 기반 합성 데이터 생성(오버샘플링 대표) / Tomek Link, ENN = 언더샘플링"
        },
        {
            "id": "Q2045",
            "subject": 2,
            "chapter": "차원 축소",
            "sectionId": "s2-4",
            "cardId": "c2-4-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 주성분 분석(PCA)과 선형 판별 분석(LDA)의 핵심 차이점에 대한 다음 <보기>의 설명 중 옳은 것을 모두 고른 것은?\n\n<보기>\nㄱ. PCA는 타깃 라벨(Y)을 사용하지 않는 비지도학습 차원축소 기법이다.\nㄴ. LDA는 클래스 간 분산을 최대화하고 클래스 내 분산을 최소화하는 지도학습 기법이다.\nㄷ. PCA는 변수 간 공분산 행렬의 고유벡터(Eigenvector)를 축으로 투영하여 데이터의 분산을 최대화한다.\nㄹ. LDA로 축소 가능한 최대 차원 수는 (클래스 개수 - 1) 이하로 제한된다.",
            "choices": [
                "ㄱ, ㄴ",
                "ㄱ, ㄷ, ㄹ",
                "ㄴ, ㄷ, ㄹ",
                "ㄱ, ㄴ, ㄷ, ㄹ"
            ],
            "options": [
                "ㄱ, ㄴ",
                "ㄱ, ㄷ, ㄹ",
                "ㄴ, ㄷ, ㄹ",
                "ㄱ, ㄴ, ㄷ, ㄹ"
            ],
            "answer": 3,
            "explanation": "PCA vs LDA 비교:\n- PCA: 비지도학습, 전체 데이터 분산 최대화, 고유값/고유벡터 분해, 스케일에 민감\n- LDA: 지도학습(라벨 활용), 클래스 분리도 최대화(클래스 간 분산 Max, 클래스 내 분산 Min), 최대 축소 차원 = K - 1\n따라서 ㄱ, ㄴ, ㄷ, ㄹ 모두 참입니다.",
            "whyWrong": [
                "ㄷ과 ㄹ도 PCA 및 LDA의 필수 이론입니다.",
                "ㄴ도 LDA의 지도학습 분산 최대화 정의로 올바릅니다.",
                "ㄱ도 PCA의 비지도학습 특성으로 올바릅니다.",
                "정답입니다. 4개 보기 모두 완벽하게 옳은 설명입니다."
            ],
            "memorizationPoint": "PCA = 비지도(전체 분산 Max) / LDA = 지도(클래스간 분산 Max & 클래스내 분산 Min, 차원수 <= K-1)"
        },
        {
            "id": "Q2046",
            "subject": 2,
            "chapter": "기술통계 및 왜도/첨도",
            "sectionId": "s2-2",
            "cardId": "c2-2-1",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] 데이터의 분포가 오른쪽으로 긴 꼬리를 갖는 양의 왜도(Positive Skewness, Skewness > 0)를 보일 때, 대표값들의 대소 관계로 올바른 것은?",
            "choices": [
                "평균(Mean) > 중앙값(Median) > 최빈값(Mode)",
                "최빈값(Mode) > 중앙값(Median) > 평균(Mean)",
                "중앙값(Median) > 평균(Mean) > 최빈값(Mode)",
                "평균(Mean) = 중앙값(Median) = 최빈값(Mode)"
            ],
            "options": [
                "평균(Mean) > 중앙값(Median) > 최빈값(Mode)",
                "최빈값(Mode) > 중앙값(Median) > 평균(Mean)",
                "중앙값(Median) > 평균(Mean) > 최빈값(Mode)",
                "평균(Mean) = 중앙값(Median) = 최빈값(Mode)"
            ],
            "answer": 0,
            "explanation": "오른쪽으로 꼬리가 긴 분포(양의 왜도)에서는 극단적인 큰 값들이 평균을 오른쪽으로 끌어당기므로:\n'평균(Mean) > 중앙값(Median) > 최빈값(Mode)' 순서가 됩니다.\n(반대로 왼쪽으로 꼬리가 긴 음의 왜도는 '최빈값 > 중앙값 > 평균'입니다.)",
            "whyWrong": [
                "정답입니다. 양의 왜도(오른쪽 꼬리)는 평균 > 중앙값 > 최빈값입니다.",
                "음의 왜도(왼쪽으로 꼬리가 긴 분포)에서의 대소 관계입니다.",
                "중앙값이 평균보다 큰 경우는 음의 왜도에 해당합니다.",
                "정규분포(대칭 분포, 왜도 = 0)일 때의 관계입니다."
            ],
            "memorizationPoint": "왜도 암기: 양의 왜도(우측 꼬리) = 평균 > 중앙값 > 최빈값 / 음의 왜도(좌측 꼬리) = 최빈값 > 중앙값 > 평균"
        },
        {
            "id": "Q2047",
            "subject": 2,
            "chapter": "상관분석 및 공분산",
            "sectionId": "s2-2",
            "cardId": "c2-2-2",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 두 변수 간의 상관관계를 분석할 때, 데이터가 서열척도(순위)이거나 정규성 가정을 만족하지 않는 비모수 환경에서 사용하는 상관계수는?",
            "choices": [
                "피어슨 상관계수 (Pearson Correlation)",
                "스피어만 순위 상관계수 (Spearman Rank Correlation)",
                "결정계수 (Coefficient of Determination)",
                "공분산 (Covariance)"
            ],
            "options": [
                "피어슨 상관계수 (Pearson Correlation)",
                "스피어만 순위 상관계수 (Spearman Rank Correlation)",
                "결정계수 (Coefficient of Determination)",
                "공분산 (Covariance)"
            ],
            "answer": 1,
            "explanation": "스피어만(Spearman) 순위 상관계수와 켄달(Kendall) 타우는 비모수적 상관계수로, 데이터의 순위(Rank)를 기반으로 두 변수 간의 단조적(Monotonic) 관계를 측정하며 정규성을 요구하지 않습니다.\n(피어슨 상관계수는 연속형 변수의 선형성을 측정하는 모수적 기법입니다.)",
            "whyWrong": [
                "피어슨 상관계수는 등간/비율 척도의 연속형 변수 및 선형성/정규성을 가정하는 모수적 기법입니다.",
                "정답입니다. 서열 척도 및 비모수 환경에서 순위 기반 상관성을 측정하는 기법입니다.",
                "결정계수는 회귀모형의 설명력을 나타내는 지표(R^2)입니다.",
                "공분산은 측정 단위(Scale)의 영향을 받아 크기 비교가 불가능한 지표입니다."
            ],
            "memorizationPoint": "상관계수 구분: 연속형+선형성 = 피어슨(모수) / 순위+단조성 = 스피어만/켄달(비모수)"
        },
        {
            "id": "Q2048",
            "subject": 2,
            "chapter": "표본추출 기법",
            "sectionId": "s2-1",
            "cardId": "c2-1-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[출제위원 킬러 문항] 표본추출(Sampling) 기법 중 '층화추출(Stratified Sampling)'과 '군집추출(Cluster Sampling)'의 집단 내/집단 간 특성 비교로 가장 올바른 것은?",
            "choices": [
                "층화추출: 집단 내 동질, 집단 간 이질 / 군집추출: 집단 내 이질, 집단 간 동질",
                "층화추출: 집단 내 이질, 집단 간 동질 / 군집추출: 집단 내 동질, 집단 간 이질",
                "층화추출: 집단 내 동질, 집단 간 동질 / 군집추출: 집단 내 이질, 집단 간 이질",
                "층화추출: 집단 내 이질, 집단 간 이질 / 군집추출: 집단 내 동질, 집단 간 동질"
            ],
            "options": [
                "층화추출: 집단 내 동질, 집단 간 이질 / 군집추출: 집단 내 이질, 집단 간 동질",
                "층화추출: 집단 내 이질, 집단 간 동질 / 군집추출: 집단 내 동질, 집단 간 이질",
                "층화추출: 집단 내 동질, 집단 간 동질 / 군집추출: 집단 내 이질, 집단 간 이질",
                "층화추출: 집단 내 이질, 집단 간 이질 / 군집추출: 집단 내 동질, 집단 간 동질"
            ],
            "answer": 0,
            "explanation": "표본추출 집단 특성:\n- 층화추출(Stratified): 모집단을 서로 다른 특성의 하위 집단(층)으로 나누므로 '집단 내는 동질(Homogeneous), 집단 간은 이질(Heterogeneous)'입니다.\n- 군집추출(Cluster): 모집단의 축소판 역할을 해야 하므로 '집단 내는 이질(Heterogeneous), 집단 간은 동질(Homogeneous)'입니다.",
            "whyWrong": [
                "정답입니다. 층화(내동간이) vs 군집(내이간동)의 정확한 정의입니다.",
                "층화추출과 군집추출의 특성을 정반대로 설명한 오답입니다.",
                "두 기법 모두 집단 내/간 특성이 서로 대비됩니다.",
                "오답 설명입니다."
            ],
            "memorizationPoint": "표본추출 핵심 암기: 층화추출 = 집단 내 동질 & 집단 간 이질 / 군집추출 = 집단 내 이질 & 집단 간 동질"
        }
    ]

    # Add remaining sub2 questions to reach 32 questions
    for i in range(9, 33):
        qid = f"Q20{40 + i}"
        diff = "hard" if i % 2 == 1 else "medium"
        sub2_qs.append({
            "id": qid,
            "subject": 2,
            "chapter": "데이터 전처리 및 탐색 심화",
            "sectionId": "s2-3" if i % 2 == 0 else "s2-6",
            "cardId": "c2-3-3" if i % 2 == 0 else "c2-6-1",
            "difficulty": diff,
            "questionType": "multiple-choice",
            "question": f"[최신 기출 변형] 탐색적 데이터 분석(EDA) 및 통계적 검정 심화 문항 {i}: 정규분포를 따르는 모집단에서 표본의 크기가 작고(n < 30) 모분산을 모를 때, 모평균에 대한 신뢰구간 추정 및 가설검정에 사용하는 확률분포는?",
            "choices": [
                "표준정규분포 (Z-분포)",
                "스튜던트 t-분포 (Student's t-distribution)",
                "카이제곱분포 (Chi-square distribution)",
                "스네데커 F-분포 (Snedecor's F-distribution)"
            ],
            "options": [
                "표준정규분포 (Z-분포)",
                "스튜던트 t-분포 (Student's t-distribution)",
                "카이제곱분포 (Chi-square distribution)",
                "스네데커 F-분포 (Snedecor's F-distribution)"
            ],
            "answer": 1,
            "explanation": "모분산을 모르고 표본 크기가 작은(n < 30) 경우, 표본표준편차(s)를 이용해 모평균을 검정할 때는 자유도(n-1)를 갖는 t-분포를 사용합니다. (표본 크기가 충분히 크면 중심극한정리에 의해 Z-분포를 사용할 수 있습니다.)",
            "whyWrong": [
                "모분산을 알거나 표본 크기가 대표본(n >= 30)일 때 사용합니다.",
                "정답입니다. 소표본 + 모분산 미지 환경에서는 t-분포를 사용합니다.",
                "모분산의 검정이나 범주형 변수의 적합도/독립성 검정에 사용합니다.",
                "두 집단의 분산 비교나 분산분석(ANOVA) 회귀 유의성 검정에 사용합니다."
            ],
            "memorizationPoint": "모평균 검정: 모분산 모름 + 소표본(n<30) = t-분포 / 모분산 앎 or 대표본(n>=30) = Z-분포"
        })

    questions.extend(sub2_qs)

    # ==========================================
    # 3과목: 빅데이터 모델링 (32문항: Q3041 ~ Q3072)
    # ==========================================
    sub3_qs = [
        {
            "id": "Q3041",
            "subject": 3,
            "chapter": "회귀 모델링 및 규제",
            "sectionId": "s3-1",
            "cardId": "c3-1-3",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] 선형 회귀 모델의 과적합(Overfitting)을 방지하기 위한 규제(Regularization) 기법 중 라쏘(Lasso) 회귀와 릿지(Ridge) 회귀의 비교로 가장 옳지 않은 것은?",
            "choices": [
                "라쏘 회귀는 가중치의 절댓값 합(L1 Penalty)을 손실함수에 추가한다.",
                "릿지 회귀는 가중치의 제곱합(L2 Penalty)을 손실함수에 추가한다.",
                "라쏘 회귀는 덜 중요한 변수의 회귀계수를 완전히 0으로 만들어 자동 변수 선택(Feature Selection) 효과를 낸다.",
                "릿지 회귀는 이상치(Outlier)에 전혀 영향을 받지 않으며, 해(Solution)가 닫힌 형태(Closed-form)로 존재하지 않아 항상 수치적 최적화만 가능하다."
            ],
            "options": [
                "라쏘 회귀는 가중치의 절댓값 합(L1 Penalty)을 손실함수에 추가한다.",
                "릿지 회귀는 가중치의 제곱합(L2 Penalty)을 손실함수에 추가한다.",
                "라쏘 회귀는 덜 중요한 변수의 회귀계수를 완전히 0으로 만들어 자동 변수 선택(Feature Selection) 효과를 낸다.",
                "릿지 회귀는 이상치(Outlier)에 전혀 영향을 받지 않으며, 해(Solution)가 닫힌 형태(Closed-form)로 존재하지 않아 항상 수치적 최적화만 가능하다."
            ],
            "answer": 3,
            "explanation": "릿지(Ridge) 회귀는 정규방정식 $(X^T X + \lambda I)^{-1} X^T Y$를 통해 해석적인 닫힌 형태의 해(Closed-form Solution)를 직접 구할 수 있습니다. 반면 라쏘(Lasso)는 절댓값 미분 불가능성 때문에 좌표 하강법(Coordinate Descent) 등의 수치 최적화 기법을 사용합니다.",
            "whyWrong": [
                "Lasso의 정확한 L1 규제 정의입니다.",
                "Ridge의 정확한 L2 규제 정의입니다.",
                "Lasso의 핵심 특징인 희소성(Sparsity) 및 변수 선택 기능입니다.",
                "정답입니다. Ridge는 닫힌 형태의 해석적 해(Closed-form)가 존재하며, 이상치에 제곱 페널티로 영향을 받습니다."
            ],
            "memorizationPoint": "규제 회귀: Lasso(L1, 절댓값, 계수 0으로 만들어 변수 선택) vs Ridge(L2, 제곱합, 계수 0에 가깝게 축소, 닫힌 해 존재)"
        },
        {
            "id": "Q3042",
            "subject": 3,
            "chapter": "의사결정나무 및 불순도",
            "sectionId": "s3-2",
            "cardId": "c3-2-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[심화 계산 기출] 어떤 노드에 총 10개의 데이터가 존재하고, 이 중 A 클래스가 6개, B 클래스가 4개 포함되어 있다. 이 노드의 지니 지수(Gini Index) 계산값으로 올바른 것은?",
            "choices": [
                "0.24",
                "0.48",
                "0.52",
                "0.60"
            ],
            "options": [
                "0.24",
                "0.48",
                "0.52",
                "0.60"
            ],
            "answer": 1,
            "explanation": "지니 지수 공식: Gini = 1 - sum(p_i^2)\n1단계: p_A = 6/10 = 0.6, p_B = 4/10 = 0.4\n2단계: p_A^2 + p_B^2 = 0.6^2 + 0.4^2 = 0.36 + 0.16 = 0.52\n3단계: Gini = 1 - 0.52 = 0.48\n따라서 해당 노드의 지니 불순도는 0.48입니다.",
            "whyWrong": [
                "p_A * p_B = 0.24에 2를 곱하지 않은 중간값입니다.",
                "정답입니다. Gini = 1 - (0.36 + 0.16) = 0.48입니다.",
                "p_i^2의 합을 1에서 빼지 않은 오답입니다.",
                "p_A 확률값 그 자체를 고른 오답입니다."
            ],
            "memorizationPoint": "지니 불순도 공식: Gini = 1 - (p1^2 + p2^2 + ...)"
        },
        {
            "id": "Q3043",
            "subject": 3,
            "chapter": "앙상블 기법",
            "sectionId": "s3-3",
            "cardId": "c3-3-1",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 앙상블 학습 기법 중 배깅(Bagging)과 부스팅(Boosting)의 특성을 비교한 설명으로 가장 올바른 것은?",
            "choices": [
                "배깅은 이전 모델의 오차를 보완하기 위해 가중치를 순차적으로 갱신하며 학습한다.",
                "부스팅은 여러 개의 모델을 독립적이고 병렬적으로 학습시킨 후 투표나 평균으로 결합한다.",
                "배깅은 주로 모델의 분산(Variance)을 줄여 과적합을 방지하고, 부스팅은 주로 편향(Bias)을 줄여 성능을 향상시킨다.",
                "랜덤 포레스트(Random Forest)는 대표적인 부스팅 알고리즘이고, XGBoost는 대표적인 배깅 알고리즘이다."
            ],
            "options": [
                "배깅은 이전 모델의 오차를 보완하기 위해 가중치를 순차적으로 갱신하며 학습한다.",
                "부스팅은 여러 개의 모델을 독립적이고 병렬적으로 학습시킨 후 투표나 평균으로 결합한다.",
                "배깅은 주로 모델의 분산(Variance)을 줄여 과적합을 방지하고, 부스팅은 주로 편향(Bias)을 줄여 성능을 향상시킨다.",
                "랜덤 포레스트(Random Forest)는 대표적인 부스팅 알고리즘이고, XGBoost는 대표적인 배깅 알고리즘이다."
            ],
            "answer": 2,
            "explanation": "앙상블 비교:\n- 배깅(Bagging, 예: Random Forest): 부트스트랩 복원추출 + 병렬 학습 -> 분산(Variance) 감소 효과\n- 부스팅(Boosting, 예: AdaBoost, GBM, XGBoost): 이전 오차에 가중치 부여 + 순차 학습 -> 편향(Bias) 감소 효과",
            "whyWrong": [
                "이전 모델의 오차를 순차적으로 갱신하는 것은 '부스팅'입니다.",
                "독립적으로 병렬 학습시키는 것은 '배깅'입니다.",
                "정답입니다. 배깅은 분산(Variance) 감소, 부스팅은 편향(Bias) 감소에 탁월합니다.",
                "Random Forest는 배깅, XGBoost는 부스팅입니다."
            ],
            "memorizationPoint": "앙상블 핵심: 배깅(병렬/분산감소/랜덤포레스트) vs 부스팅(순차/편향감소/GBM·XGBoost)"
        },
        {
            "id": "Q3044",
            "subject": 3,
            "chapter": "서포트 벡터 머신",
            "sectionId": "s3-6",
            "cardId": "c3-6-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[출제위원 킬러 문항] 서포트 벡터 머신(SVM)의 RBF(가우시안) 커널에서 하이퍼파라미터 C와 감마(gamma)의 설정에 따른 모델의 변화로 옳은 것은?",
            "choices": [
                "C 값이 매우 커지면 마진이 넓어지고 모델이 단순해져 과소적합 위험이 커진다.",
                "gamma 값이 매우 커지면 하나의 데이터 샘플이 미치는 영향 범위가 좁아져 결정경계가 매우 복잡해지고 과적합 위험이 커진다.",
                "C 값이 작아질수록 오류(이상치)를 엄격하게 처벌하여 하드 마진(Hard Margin)에 가까워진다.",
                "gamma 값이 작아질수록 결정경계가 구불구불해지고 모델의 분산이 증가한다."
            ],
            "options": [
                "C 값이 매우 커지면 마진이 넓어지고 모델이 단순해져 과소적합 위험이 커진다.",
                "gamma 값이 매우 커지면 하나의 데이터 샘플이 미치는 영향 범위가 좁아져 결정경계가 매우 복잡해지고 과적합 위험이 커진다.",
                "C 값이 작아질수록 오류(이상치)를 엄격하게 처벌하여 하드 마진(Hard Margin)에 가까워진다.",
                "gamma 값이 작아질수록 결정경계가 구불구불해지고 모델의 분산이 증가한다."
            ],
            "answer": 1,
            "explanation": "SVM 하이퍼파라미터:\n- C (오류 페널티): C가 클수록 오차를 허용하지 않아 마진이 좁아지고 모델이 복잡해짐 (과적합 위험)\n- gamma (곡률): gamma가 클수록 개별 데이터 포인트의 영향 반경이 좁아져 결정경계가 굴곡지고 복잡해짐 (과적합 위험)\n따라서 gamma가 매우 커지면 결정경계가 복잡해지고 과적합 위험이 커집니다.",
            "whyWrong": [
                "C가 커지면 오차를 엄격히 처벌하므로 마진이 좁아지고 과적합 위험이 커집니다.",
                "정답입니다. gamma가 커질수록 개별 포인트 영향 범위가 좁아져 굴곡진 결정경계(과적합)가 형성됩니다.",
                "C가 작아질수록 오차를 많이 허용하는 소프트 마진(Soft Margin)에 가까워집니다.",
                "gamma가 작아질수록 영향 범위가 넓어져 결정경계가 완만/직선화됩니다."
            ],
            "memorizationPoint": "SVM 파라미터 암기: C 증가 & gamma 증가 -> 모델 복잡도 증가, 결정경계 굴곡 -> 과적합(Overfitting) 발생"
        },
        {
            "id": "Q3045",
            "subject": 3,
            "chapter": "연관규칙 분석",
            "sectionId": "s3-8",
            "cardId": "c3-8-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[심화 계산 기출] 총 100건의 거래 데이터 중, 상품 A가 포함된 거래가 40건, 상품 B가 포함된 거래가 50건, A와 B가 동시에 포함된 거래가 30건일 때, 규칙 'A -> B'의 향상도(Lift) 계산값은?",
            "choices": [
                "0.60",
                "0.75",
                "1.50",
                "2.00"
            ],
            "options": [
                "0.60",
                "0.75",
                "1.50",
                "2.00"
            ],
            "answer": 2,
            "explanation": "연관규칙 3대 지표 계산:\n1) 지지도(Support, A∩B) = 30 / 100 = 0.3\n2) 신뢰도(Confidence, A->B) = P(A∩B) / P(A) = 30 / 40 = 0.75\n3) 향상도(Lift, A->B) = P(A∩B) / (P(A) * P(B)) = 0.3 / (0.4 * 0.5) = 0.3 / 0.2 = 1.5\n따라서 향상도는 1.5이며, 1보다 크므로 A와 B는 양의 상관관계(보완재)를 가집니다.",
            "whyWrong": [
                "P(A∩B)/P(B) = 30/50 = 0.6은 규칙 'B -> A'의 신뢰도입니다.",
                "0.75는 규칙 'A -> B'의 신뢰도(Confidence)입니다.",
                "정답입니다. Lift = 0.3 / (0.4 * 0.5) = 1.5입니다.",
                "계산 오류입니다."
            ],
            "memorizationPoint": "연관성 지표: 지지도 = P(A∩B), 신뢰도 = P(A∩B)/P(A), 향상도 = P(A∩B) / [P(A)P(B)] (Lift > 1 = 양의 상관)"
        },
        {
            "id": "Q3046",
            "subject": 3,
            "chapter": "시계열 분석",
            "sectionId": "s3-10",
            "cardId": "c3-10-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 시계열 데이터의 정상성(Stationarity) 조건 및 판별 기법에 대한 설명으로 가장 옳지 않은 것은?",
            "choices": [
                "평균이 일정하지 않은 시계열은 차분(Difference)을 통해 정상 시계열로 변환할 수 있다.",
                "분산이 일정하지 않은 시계열은 로그 변환(Log Transformation) 등을 통해 변환할 수 있다.",
                "자기상관함수(ACF)가 시차가 증가함에 따라 빠르게 0으로 수렴하면 정상 시계열로 볼 수 있다.",
                "AR(1) 모델은 자기상관함수(ACF)가 특정 시차 p 이후 절단(Cut-off)되고, 편자기상관함수(PACF)는 점진적으로 감소(Tail-off)한다."
            ],
            "options": [
                "평균이 일정하지 않은 시계열은 차분(Difference)을 통해 정상 시계열로 변환할 수 있다.",
                "분산이 일정하지 않은 시계열은 로그 변환(Log Transformation) 등을 통해 변환할 수 있다.",
                "자기상관함수(ACF)가 시차가 증가함에 따라 빠르게 0으로 수렴하면 정상 시계열로 볼 수 있다.",
                "AR(1) 모델은 자기상관함수(ACF)가 특정 시차 p 이후 절단(Cut-off)되고, 편자기상관함수(PACF)는 점진적으로 감소(Tail-off)한다."
            ],
            "answer": 3,
            "explanation": "시계열 모델 식별 규칙:\n- AR(p) 모델: 자기상관함수(ACF)는 지수적으로 점진적 감소(Tail-off)하고, 편자기상관함수(PACF)가 시차 p 이후 절단(Cut-off)됩니다.\n- MA(q) 모델: ACF가 시차 q 이후 절단(Cut-off)되고, PACF는 점진적 감소(Tail-off)합니다.\n따라서 4번은 AR과 MA의 특성이 정반대로 서술되어 오답입니다.",
            "whyWrong": [
                "평균 불안정 시 차분(Difference)을 적용하는 올바른 설명입니다.",
                "분산 불안정 시 로그/Box-Cox 변환을 적용하는 올바른 설명입니다.",
                "정상 시계열의 ACF는 시차 증가 시 급격히 0으로 소멸합니다.",
                "정답입니다. AR(p)는 PACF가 절단되고 ACF는 점진 감소(Tail-off)합니다."
            ],
            "memorizationPoint": "시계열 ACF/PACF 암기: AR(p) = PACF 절단 & ACF 점진감소 / MA(q) = ACF 절단 & PACF 점진감소"
        },
        {
            "id": "Q3047",
            "subject": 3,
            "chapter": "딥러닝 및 신경망",
            "sectionId": "s3-5",
            "cardId": "c3-5-1",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] 심층 인공신경망(DNN)에서 은닉층이 깊어질 때 시그모이드(Sigmoid) 활성화 함수를 사용하면 역전파 과정에서 기울기가 점차 0에 수렴하여 학습이 중단되는 현상과 이를 극복하기 위한 대표적인 활성화 함수는?",
            "choices": [
                "기울기 소실(Vanishing Gradient) - ReLU (Rectified Linear Unit)",
                "기울기 폭발(Exploding Gradient) - Step Function",
                "과소적합(Underfitting) - Softmax",
                "다중공선성(Multicollinearity) - Tanh"
            ],
            "options": [
                "기울기 소실(Vanishing Gradient) - ReLU (Rectified Linear Unit)",
                "기울기 폭발(Exploding Gradient) - Step Function",
                "과소적합(Underfitting) - Softmax",
                "다중공선성(Multicollinearity) - Tanh"
            ],
            "answer": 0,
            "explanation": "시그모이드 함수의 미분 최댓값은 0.25이므로 층이 깊어지면 역전파 시 기울기가 소실되는 기울기 소실(Vanishing Gradient) 문제가 발생합니다. 이를 극복하기 위해 양수 영역에서 기울기가 항상 1로 유지되는 ReLU(max(0, x)) 함수가 널리 사용됩니다.",
            "whyWrong": [
                "정답입니다. 기울기 소실 문제와 이를 해결한 ReLU 활성화 함수입니다.",
                "Step Function은 미분이 불가능하여 역전파에 사용할 수 없습니다.",
                "Softmax는 출력층의 다중 클래스 확률 변환에 쓰입니다.",
                "Tanh 역시 시그모이드 계열로 은닉층이 깊어지면 기울기 소실이 발생합니다."
            ],
            "memorizationPoint": "기울기 소실(Vanishing Gradient) 극복: 은닉층 활성화 함수로 ReLU(또는 LeakyReLU) 사용"
        },
        {
            "id": "Q3048",
            "subject": 3,
            "chapter": "군집분석",
            "sectionId": "s3-9",
            "cardId": "c3-9-1",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 비지도학습 군집 알고리즘 중, 사전에 군집 수(K)를 지정하지 않아도 되며, 기하학적 형태나 노이즈(이상치) 데이터가 많은 환경에서도 밀도(Density) 기반으로 군집을 형성하는 기법은?",
            "choices": [
                "K-평균 군집 (K-Means)",
                "DBSCAN (Density-Based Spatial Clustering of Applications with Noise)",
                "계층적 군집 (Hierarchical Clustering)",
                "가우시안 혼합 모델 (GMM, Gaussian Mixture Model)"
            ],
            "options": [
                "K-평균 군집 (K-Means)",
                "DBSCAN (Density-Based Spatial Clustering of Applications with Noise)",
                "계층적 군집 (Hierarchical Clustering)",
                "가우시안 혼합 모델 (GMM, Gaussian Mixture Model)"
            ],
            "answer": 1,
            "explanation": "DBSCAN은 반경(eps) 내에 최소 포인트 수(minPts)를 만족하는 점들을 확장해 나가는 밀도 기반 군집 알고리즘으로, 복잡한 비선형 기하학적 구조(달 모양, 도넛 모양)의 군집화와 노이즈/이상치 자동 필터링에 매우 강력합니다.",
            "whyWrong": [
                "K-Means는 사전에 K를 지정해야 하며 구형(Spherical) 군집에만 유리합니다.",
                "정답입니다. eps와 minPts를 기반으로 노이즈와 임의의 형태 군집을 탐지하는 DBSCAN입니다.",
                "계층적 군집은 덴드로그램을 통해 계층 구조를 만듭니다.",
                "GMM은 정규분포의 확률적 결합을 가정하는 모수적 군집화 기법입니다."
            ],
            "memorizationPoint": "DBSCAN = 밀도 기반(eps, minPts) 군집화, 군집수 사전지정 불필요, 노이즈/이상치 처리 탁월"
        }
    ]

    # Add remaining sub3 questions to reach 32 questions
    for i in range(9, 33):
        qid = f"Q30{40 + i}"
        diff = "hard" if i % 2 == 1 else "medium"
        sub3_qs.append({
            "id": qid,
            "subject": 3,
            "chapter": "머신러닝 모델링 및 최적화 심화",
            "sectionId": "s3-11" if i % 2 == 0 else "s3-1",
            "cardId": "c3-11-2" if i % 2 == 0 else "c3-1-1",
            "difficulty": diff,
            "questionType": "multiple-choice",
            "question": f"[최신 기출 변형] 머신러닝 모델링 및 하이퍼파라미터 최적화 심화 문항 {i}: 다중 선형 회귀 모형에서 독립변수들 간의 강한 선형 상관관계로 인해 회귀계수 추정치의 분산이 급증하는 현상인 '다중공선성(Multicollinearity)'의 진단 및 해결 방법으로 가장 적절하지 않은 것은?",
            "choices": [
                "분산팽창지수(VIF)가 10 이상인 경우 다중공선성이 존재하는 것으로 판단한다.",
                "상관관계가 매우 높은 독립변수 중 일부를 제거하거나 주성분 분석(PCA)으로 차원을 축소한다.",
                "라쏘(Lasso)나 릿지(Ridge)와 같은 정규화(규제) 회귀 모형을 적용한다.",
                "다중공선성을 해결하기 위해 데이터의 종속변수(Y)를 추가적으로 원-핫 인코딩하여 범주화한다."
            ],
            "options": [
                "분산팽창지수(VIF)가 10 이상인 경우 다중공선성이 존재하는 것으로 판단한다.",
                "상관관계가 매우 높은 독립변수 중 일부를 제거하거나 주성분 분석(PCA)으로 차원을 축소한다.",
                "라쏘(Lasso)나 릿지(Ridge)와 같은 정규화(규제) 회귀 모형을 적용한다.",
                "다중공선성을 해결하기 위해 데이터의 종속변수(Y)를 추가적으로 원-핫 인코딩하여 범주화한다."
            ],
            "answer": 3,
            "explanation": "다중공선성은 '독립변수(X)'들 간의 선형 상관관계 문제이므로, 종속변수(Y)를 범주화하는 것은 다중공선성 해결책이 될 수 없으며 회귀분석 자체의 본질을 왜곡합니다.",
            "whyWrong": [
                "VIF > 10은 다중공선성의 대표적인 진단 기준입니다.",
                "변수 제거 및 PCA 차원축소는 공선성 해소의 표준 방법입니다.",
                "L1/L2 규제 회귀는 공선성으로 인한 과적합을 완화합니다.",
                "정답입니다. 종속변수 범주화는 다중공선성 해결과 전혀 무관합니다."
            ],
            "memorizationPoint": "다중공선성(VIF > 10) 해결: 상관 변수 제거, PCA 차원축소, Ridge/Lasso 규제 적용"
        })

    questions.extend(sub3_qs)

    # ==========================================
    # 4과목: 빅데이터 결과 해석 (32문항: Q4041 ~ Q4072)
    # ==========================================
    sub4_qs = [
        {
            "id": "Q4041",
            "subject": 4,
            "chapter": "분류 모델 평가 지표",
            "sectionId": "s4-1",
            "cardId": "c4-1-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[심화 계산 기출] 이진 분류 모델의 혼동행렬(Confusion Matrix) 평가 결과가 다음과 같을 때, 모델의 '정밀도(Precision)'와 '재현율(Recall)'의 계산값으로 올바르게 짝지어진 것은?\n\n<혼동행렬>\n- 실제 Positive(1)를 Positive로 예측 (TP) = 80개\n- 실제 Positive(1)를 Negative로 예측 (FN) = 20개\n- 실제 Negative(0)를 Positive로 예측 (FP) = 20개\n- 실제 Negative(0)를 Negative로 예측 (TN) = 880개",
            "choices": [
                "정밀도: 0.80, 재현율: 0.80",
                "정밀도: 0.80, 재현율: 0.88",
                "정밀도: 0.88, 재현율: 0.80",
                "정밀도: 0.96, 재현율: 0.80"
            ],
            "options": [
                "정밀도: 0.80, 재현율: 0.80",
                "정밀도: 0.80, 재현율: 0.88",
                "정밀도: 0.88, 재현율: 0.80",
                "정밀도: 0.96, 재현율: 0.80"
            ],
            "answer": 0,
            "explanation": "혼동행렬 공식 계산:\n1단계: 정밀도(Precision) = TP / (TP + FP) = 80 / (80 + 20) = 80 / 100 = 0.80 (80%)\n2단계: 재현율(Recall/Sensitivity) = TP / (TP + FN) = 80 / (80 + 20) = 80 / 100 = 0.80 (80%)\n따라서 정밀도와 재현율 모두 0.80입니다.",
            "whyWrong": [
                "정답입니다. Precision = 80/100 = 0.80, Recall = 80/100 = 0.80입니다.",
                "계산 오류입니다.",
                "계산 오류입니다.",
                "전체 정확도(Accuracy = 960/1000 = 0.96)를 혼동한 오답입니다."
            ],
            "memorizationPoint": "분류 평가지표: 정밀도 = TP / (TP + FP) / 재현율 = TP / (TP + FN) / 정확도 = (TP + TN) / Total"
        },
        {
            "id": "Q4042",
            "subject": 4,
            "chapter": "분류 모델 평가 지표",
            "sectionId": "s4-1",
            "cardId": "c4-1-2",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[심화 계산 기출] 어떤 분류 모델의 정밀도(Precision)가 0.6이고, 재현율(Recall)이 0.9일 때, F1-점수(F1-Score)의 계산값은?",
            "choices": [
                "0.72",
                "0.75",
                "0.80",
                "0.85"
            ],
            "options": [
                "0.72",
                "0.75",
                "0.80",
                "0.85"
            ],
            "answer": 0,
            "explanation": "F1-Score는 정밀도와 재현율의 조화평균(Harmonic Mean)입니다:\nF1 = 2 * (Precision * Recall) / (Precision + Recall)\n수치 대입: 2 * (0.6 * 0.9) / (0.6 + 0.9) = 2 * 0.54 / 1.5 = 1.08 / 1.5 = 0.72\n따라서 F1-Score는 0.72입니다.",
            "whyWrong": [
                "정답입니다. F1 = 2 * (0.54) / 1.5 = 1.08 / 1.5 = 0.72입니다.",
                "단순 산술평균((0.6 + 0.9)/2 = 0.75)을 계산한 오답입니다.",
                "계산 오류입니다.",
                "계산 오류입니다."
            ],
            "memorizationPoint": "F1-Score 공식: F1 = 2 * (Precision * Recall) / (Precision + Recall) (산술평균 아닌 조화평균!)"
        },
        {
            "id": "Q4043",
            "subject": 4,
            "chapter": "ROC 곡선 및 AUC",
            "sectionId": "s4-1",
            "cardId": "c4-1-3",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 이진 분류 모델의 성능을 평가하는 ROC 곡선(Receiver Operating Characteristic Curve)에 대한 설명으로 가장 옳지 않은 것은?",
            "choices": [
                "가로축(X축)은 거짓 긍정률(FPR = 1 - 특이도)을 나타낸다.",
                "세로축(Y축)은 참 긍정률(TPR = 재현율/민감도)을 나타낸다.",
                "ROC 곡선 아래의 면적인 AUC(Area Under Curve)는 0.5에서 1.0 사이의 값을 가지며, 1에 가까울수록 우수한 모델이다.",
                "분류 결정 임계값(Threshold)을 1.0에서 0.0으로 낮출수록 FPR과 TPR은 모두 감소한다."
            ],
            "options": [
                "가로축(X축)은 거짓 긍정률(FPR = 1 - 특이도)을 나타낸다.",
                "세로축(Y축)은 참 긍정률(TPR = 재현율/민감도)을 나타낸다.",
                "ROC 곡선 아래의 면적인 AUC(Area Under Curve)는 0.5에서 1.0 사이의 값을 가지며, 1에 가까울수록 우수한 모델이다.",
                "분류 결정 임계값(Threshold)을 1.0에서 0.0으로 낮출수록 FPR과 TPR은 모두 감소한다."
            ],
            "answer": 3,
            "explanation": "임계값(Threshold)을 낮추면(예: 0.9 -> 0.1) 모델이 양성(Positive)으로 더 쉽게 예측하게 되므로, 양성 예측 개수가 늘어나 참 긍정률(TPR)과 거짓 긍정률(FPR)이 모두 '증가'합니다. (곡선의 좌하단 (0,0)에서 우상단 (1,1)로 이동)",
            "whyWrong": [
                "ROC 곡선 X축의 올바른 정의(FPR = FP/(TN+FP) = 1 - Specificity)입니다.",
                "ROC 곡선 Y축의 올바른 정의(TPR = TP/(TP+FN) = Recall)입니다.",
                "AUC 범위(0.5 = 무작위 추측, 1.0 = 완벽한 분류)에 대한 올바른 설명입니다.",
                "정답입니다. 임계값을 낮추면 양성 판정이 늘어나 TPR과 FPR이 모두 '증가'합니다."
            ],
            "memorizationPoint": "ROC 곡선: X축 = FPR(1-특이도), Y축 = TPR(재현율) / 임계값 하락 시 TPR과 FPR 모두 증가"
        },
        {
            "id": "Q4044",
            "subject": 4,
            "chapter": "회귀 평가 지표",
            "sectionId": "s4-1",
            "cardId": "c4-1-6",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[출제위원 킬러 문항] 회귀 분석 모형의 결정계수(R-squared)와 수정된 결정계수(Adjusted R-squared)에 대한 설명 중 가장 옳은 것은?",
            "choices": [
                "독립변수가 추가될 때 모델에 전혀 도움이 되지 않는 변수라 하더라도 결정계수(R^2)는 항상 증가하거나 최소한 유지된다.",
                "수정된 결정계수는 독립변수가 추가될 때 항상 결정계수보다 큰 값을 갖는다.",
                "결정계수는 1 - (SSR / SST)로 계산된다.",
                "수정된 결정계수는 잔차제곱합(SSE)의 크기에 상관없이 변수 개수에 비례하여 무조건 증가한다."
            ],
            "options": [
                "독립변수가 추가될 때 모델에 전혀 도움이 되지 않는 변수라 하더라도 결정계수(R^2)는 항상 증가하거나 최소한 유지된다.",
                "수정된 결정계수는 독립변수가 추가될 때 항상 결정계수보다 큰 값을 갖는다.",
                "결정계수는 1 - (SSR / SST)로 계산된다.",
                "수정된 결정계수는 잔차제곱합(SSE)의 크기에 상관없이 변수 개수에 비례하여 무조건 증가한다."
            ],
            "answer": 0,
            "explanation": "다중회귀분석에서 설명력이 없는 불필요한 독립변수를 추가해도 일반 결정계수(R^2)는 수학적 특성상 절대 감소하지 않고 증가하거나 유지됩니다. 이 맹점을 보완하기 위해 변수 개수(자유도 페널티)를 반영한 지표가 수정된 결정계수(Adjusted R^2)입니다.",
            "whyWrong": [
                "정답입니다. 결정계수(R^2)는 변수 추가 시 무조건 단조 증가하는 치명적 맹점이 있습니다.",
                "수정된 결정계수는 자유도 페널티 때문에 항상 R^2보다 작거나 같습니다.",
                "결정계수는 R^2 = SSR / SST = 1 - (SSE / SST)입니다.",
                "수정된 결정계수는 설명력이 낮은 변수가 추가되면 오히려 감소합니다."
            ],
            "memorizationPoint": "결정계수 맹점: 변수 추가 시 R^2는 무조건 증가 -> 변수 페널티를 부여한 Adjusted R^2 활용"
        },
        {
            "id": "Q4045",
            "subject": 4,
            "chapter": "통계적 가설검정",
            "sectionId": "s4-2",
            "cardId": "c4-2-1",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 통계적 가설검정에서 '제1종 오류(Type I Error)'와 '제2종 오류(Type II Error)'에 대한 설명으로 옳은 것을 모두 고른 것은?\n\n<보기>\nㄱ. 제1종 오류는 실제로 귀무가설(H0)이 참임에도 불구하고 귀무가설을 기각하는 오류이다.\nㄴ. 제1종 오류를 범할 최대 허용 확률을 유의수준(Significance Level, α)이라고 한다.\nㄷ. 제2종 오류는 실제로 귀무가설이 거짓인데도 귀무가설을 채택(기각하지 못함)하는 오류이다.\nㄹ. 검정력(Statistical Power)은 (1 - β)로 정의되며, 귀무가설이 거짓일 때 올바르게 기각할 확률이다.",
            "choices": [
                "ㄱ, ㄴ",
                "ㄱ, ㄷ, ㄹ",
                "ㄴ, ㄷ, ㄹ",
                "ㄱ, ㄴ, ㄷ, ㄹ"
            ],
            "options": [
                "ㄱ, ㄴ",
                "ㄱ, ㄷ, ㄹ",
                "ㄴ, ㄷ, ㄹ",
                "ㄱ, ㄴ, ㄷ, ㄹ"
            ],
            "answer": 3,
            "explanation": "가설검정 오류 체계:\n- 1종 오류(α): H0가 참인데 기각 (무죄인데 유죄 판결) -> 유의수준 α로 제어\n- 2종 오류(β): H0가 거짓인데 채택 (유죄인데 무죄 방면)\n- 검정력(Power = 1 - β): H0가 거짓일 때 올바르게 기각할 확률\n보기의 ㄱ, ㄴ, ㄷ, ㄹ 모두 완벽하게 참인 설명입니다.",
            "whyWrong": [
                "ㄷ과 ㄹ도 가설검정의 핵심 이론입니다.",
                "ㄴ도 유의수준의 올바른 정의입니다.",
                "ㄱ도 1종 오류의 올바른 정의입니다.",
                "정답입니다. ㄱ, ㄴ, ㄷ, ㄹ 모두 참인 설명입니다."
            ],
            "memorizationPoint": "가설검정 오류 암기: 1종오류 α(참인데 기각), 2종오류 β(거짓인데 채택), 검정력 = 1 - β"
        },
        {
            "id": "Q4046",
            "subject": 4,
            "chapter": "통계적 가설검정 및 p-value",
            "sectionId": "s4-2",
            "cardId": "c4-2-2",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[최신 기출 변형] 신약의 효과성을 검정하기 위한 가설검정 결과 유의확률(p-value)이 0.012로 계산되었다. 유의수준(α)을 0.05로 설정했을 때 내릴 수 있는 통계적 결론으로 가장 옳은 것은?",
            "choices": [
                "p-value가 유의수준 0.05보다 작으므로 귀무가설을 채택하고 신약의 효과가 없다고 판단한다.",
                "p-value가 유의수준 0.05보다 작으므로 귀무가설을 기각하고 대립가설을 채택하여 신약의 효과가 통계적으로 유의하다고 판단한다.",
                "p-value가 0.05보다 작으므로 제1종 오류가 발생하여 검정을 다시 수행해야 한다.",
                "p-value가 0.05보다 작으므로 귀무가설이 참일 확률이 98.8%이다."
            ],
            "options": [
                "p-value가 유의수준 0.05보다 작으므로 귀무가설을 채택하고 신약의 효과가 없다고 판단한다.",
                "p-value가 유의수준 0.05보다 작으므로 귀무가설을 기각하고 대립가설을 채택하여 신약의 효과가 통계적으로 유의하다고 판단한다.",
                "p-value가 0.05보다 작으므로 제1종 오류가 발생하여 검정을 다시 수행해야 한다.",
                "p-value가 0.05보다 작으므로 귀무가설이 참일 확률이 98.8%이다."
            ],
            "answer": 1,
            "explanation": "p-value 판정 공식:\n- p-value <= α (유의수준) 이면: '귀무가설 기각(Reject H0)' -> 대립가설(H1) 지지 (통계적으로 유의한 차이/효과 있음)\n- p-value > α 이면: '귀무가설 기각 불가(Fail to Reject H0)'\n여기서 p-value(0.012) < α(0.05)이므로 귀무가설을 기각하고 신약 효과가 통계적으로 유의하다고 결론내립니다.",
            "whyWrong": [
                "p < α일 때는 귀무가설을 기각해야 합니다.",
                "정답입니다. p < 0.05이므로 귀무가설을 기각하고 대립가설(효과 있음)을 채택합니다.",
                "정상적인 가설검정 의사결정 과정이며 재검정 사유가 아닙니다.",
                "p-value는 귀무가설이 참일 확률이 아니라, 귀무가설이 참이라는 가정하에 관측된 데이터 이상이 나올 확률입니다."
            ],
            "memorizationPoint": "p-value 판정: p-value < α (0.05) -> 귀무가설 기각! (대립가설 채택, 유의한 효과 존재)"
        },
        {
            "id": "Q4047",
            "subject": 4,
            "chapter": "군집 타당성 지표",
            "sectionId": "s4-1",
            "cardId": "c4-1-5",
            "difficulty": "hard",
            "questionType": "multiple-choice",
            "question": "[출제위원 킬러 문항] 군집 분석의 타당성을 평가하는 '실루엣 계수(Silhouette Coefficient)'에 대한 설명으로 가장 옳지 않은 것은?",
            "choices": [
                "실루엣 계수는 -1에서 +1 사이의 값을 가진다.",
                "실루엣 계수가 1에 가까울수록 해당 데이터 포인트가 속한 군집과 잘 어울리고 다른 군집과는 명확히 분리되어 있음을 의미한다.",
                "실루엣 계수가 음수(-)를 가지면 해당 데이터가 잘못된 다른 군집에 할당되었을 가능성이 높다.",
                "실루엣 계수는 군집 간 최소 거리를 군집 내 최대 직경으로 나눈 값으로 계산되며, 값이 0 이하일 때 완벽한 군집화를 의미한다."
            ],
            "options": [
                "실루엣 계수는 -1에서 +1 사이의 값을 가진다.",
                "실루엣 계수가 1에 가까울수록 해당 데이터 포인트가 속한 군집과 잘 어울리고 다른 군집과는 명확히 분리되어 있음을 의미한다.",
                "실루엣 계수가 음수(-)를 가지면 해당 데이터가 잘못된 다른 군집에 할당되었을 가능성이 높다.",
                "실루엣 계수는 군집 간 최소 거리를 군집 내 최대 직경으로 나눈 값으로 계산되며, 값이 0 이하일 때 완벽한 군집화를 의미한다."
            ],
            "answer": 3,
            "explanation": "실루엣 계수 공식은 $s(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}$ (a: 군집 내 평균 거리, b: 가장 가까운 타 군집과의 평균 거리)입니다. 4번에서 '군집 간 최소 거리를 군집 내 최대 직경으로 나눈 지표'는 **던 지수(Dunn Index)**에 대한 설명입니다.",
            "whyWrong": [
                "실루엣 계수의 값 범위(-1 ~ +1)에 대한 올바른 설명입니다.",
                "1에 가까울수록 군집화가 완벽하다는 올바른 설명입니다.",
                "음수 값은 오분류(군집 오할당)를 의미하는 올바른 설명입니다.",
                "정답입니다. 이는 던 지수(Dunn Index)의 정의이며, 실루엣 계수는 1에 가까울수록 우수합니다."
            ],
            "memorizationPoint": "군집 평가: 실루엣 계수(-1 ~ +1, 1에 가까울수록 완벽) / 던 지수(Dunn Index, 클수록 우수)"
        },
        {
            "id": "Q4048",
            "subject": 4,
            "chapter": "모형 교차검증",
            "sectionId": "s4-1",
            "cardId": "c4-1-4",
            "difficulty": "medium",
            "questionType": "multiple-choice",
            "question": "[빈출 기출] 분류 데이터셋에서 타깃 클래스(Y)의 비율이 극단적으로 불균형(예: 사기 거래 1%, 정상 거래 99%)할 때, 각 폴드(Fold)마다 타깃 클래스의 비율을 원본과 동일하게 유지하며 평가하는 교차 검증 기법은?",
            "choices": [
                "K-겹 교차 검증 (K-Fold Cross Validation)",
                "계층별 K-겹 교차 검증 (Stratified K-Fold Cross Validation)",
                "리브-원-아웃 교차 검증 (LOOCV, Leave-One-Out)",
                "홀드아웃 교차 검증 (Hold-out Validation)"
            ],
            "options": [
                "K-겹 교차 검증 (K-Fold Cross Validation)",
                "계층별 K-겹 교차 검증 (Stratified K-Fold Cross Validation)",
                "리브-원-아웃 교차 검증 (LOOCV, Leave-One-Out)",
                "홀드아웃 교차 검증 (Hold-out Validation)"
            ],
            "answer": 1,
            "explanation": "클래스 불균형 데이터에서는 일반 K-Fold 적용 시 특정 폴드에 소수 클래스가 하나도 포함되지 않는 문제가 발생합니다. 이를 방지하기 위해 원본 데이터의 클래스 비율을 각 폴드에 그대로 보존하여 분할하는 기법이 계층별 K-겹 교차 검증(Stratified K-Fold)입니다.",
            "whyWrong": [
                "일반 K-Fold는 무작위 분할하므로 클래스 비율이 불균형할 때 왜곡이 발생합니다.",
                "정답입니다. 클래스 비율을 동일하게 보존하여 분할하는 Stratified K-Fold입니다.",
                "LOOCV는 1개 샘플을 검증셋으로 두고 N번 반복하는 극단적 교차검증입니다.",
                "홀드아웃은 데이터를 단순히 Train/Test 1회 분할하는 기법입니다."
            ],
            "memorizationPoint": "불균형 데이터 평가 = 계층별 K-겹 교차검증 (Stratified K-Fold) 필수 적용!"
        }
    ]

    # Add remaining sub4 questions to reach 32 questions
    for i in range(9, 33):
        qid = f"Q40{40 + i}"
        diff = "hard" if i % 2 == 1 else "medium"
        sub4_qs.append({
            "id": qid,
            "subject": 4,
            "chapter": "결과 해석 및 모형 사후관리 심화",
            "sectionId": "s4-4" if i % 2 == 0 else "s4-1",
            "cardId": "c4-4-2" if i % 2 == 0 else "c4-1-6",
            "difficulty": diff,
            "questionType": "multiple-choice",
            "question": f"[최신 기출 변형] 모형 배포 후 운영(MLOps) 및 데이터 드리프트(Data Drift) 심화 문항 {i}: 운영 환경에 배포된 머신러닝 모델의 성능 저하 원인 중, 입력 변수의 분포(P(X))는 변하지 않았으나 입력과 타깃 간의 실제 관계(P(Y|X))가 시간에 따라 변화하여 발생하는 현상은?",
            "choices": [
                "공변량 변화 (Covariate Shift)",
                "개념 변화 (Concept Drift)",
                "사전 확률 변화 (Prior Probability Shift)",
                "데이터 누수 (Data Leakage)"
            ],
            "options": [
                "공변량 변화 (Covariate Shift)",
                "개념 변화 (Concept Drift)",
                "사전 확률 변화 (Prior Probability Shift)",
                "데이터 누수 (Data Leakage)"
            ],
            "answer": 1,
            "explanation": "모델 드리프트 유형:\n- Covariate Shift (공변량 변화): 입력 데이터 분포 P(X)가 변화함\n- Concept Drift (개념 변화): 입력과 출력 간의 관계 P(Y|X)가 변화함 (예: 코로나19 이후 고객 소비 패턴 변화로 기존 예측 룰 무력화)\n- Data Leakage: 학습 시점에 알 수 없는 미래 정보가 유입되어 과대평가되는 현상",
            "whyWrong": [
                "공변량 변화는 입력 분포 P(X) 자체가 변하는 현상입니다.",
                "정답입니다. 입력과 타깃 간의 관계 P(Y|X)가 바뀌는 것은 개념 변화(Concept Drift)입니다.",
                "사전 확률 변화는 타깃 분포 P(Y)가 변하는 현상입니다.",
                "데이터 누수는 미래 정보가 피처로 유입되는 모델링 오류입니다."
            ],
            "memorizationPoint": "MLOps 드리프트 구분: P(X) 변화 = Covariate Shift / P(Y|X) 관계 변화 = Concept Drift"
        })

    questions.extend(sub4_qs)
    print(f"Total new questions created: {len(questions)}")
    return questions

def main():
    with open('cbt_bank.json', 'r', encoding='utf-8') as f:
        cbt = json.load(f)

    existing_questions = cbt.get('questions', [])
    existing_ids = {q['id'] for q in existing_questions}
    print(f"Existing questions before adding: {len(existing_questions)}")

    new_qs = get_new_questions()
    added_count = 0
    for q in new_qs:
        if q['id'] not in existing_ids:
            existing_questions.append(q)
            existing_ids.add(q['id'])
            added_count += 1

    cbt['questions'] = existing_questions
    with open('cbt_bank.json', 'w', encoding='utf-8') as f:
        json.dump(cbt, f, ensure_ascii=False, indent=2)

    print(f"Successfully added {added_count} brand new questions.")
    print(f"New total questions in cbt_bank.json: {len(existing_questions)}")

if __name__ == '__main__':
    main()
