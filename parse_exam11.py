import json
import re
import sys

def load_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def parse_exam11():
    text_path = r'C:\Users\USER\Desktop\빅데이터분석기사_11회_기출문제.txt'
    with open(text_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 텍스트가 여러 질문으로 되어 있음.
    # 각 질문은 "기출문제 X."로 시작함.
    # 예: 기출문제 1. 키워드 : 빅데이터 기술\n 질문내용 \n ①~④ \n 정답 : X번 \n 해설 \n ...
    
    questions = []
    
    # 기출문제 단위로 분할
    blocks = re.split(r'(기출문제\s*\d+\.\s*키워드\s*:\s*)', content)
    
    # blocks[0]는 기출문제 전의 텍스트(예: 제 1과목 ...)
    # 이후 홀수 인덱스(1, 3, 5...)는 '기출문제 X. 키워드 : ' 매치부분
    # 짝수 인덱스(2, 4, 6...)는 기출문제 내용
    
    current_subject = 1
    
    for i in range(1, len(blocks), 2):
        header = blocks[i] # "기출문제 X. 키워드 : "
        body = blocks[i+1] # 키워드명 \n 질문 \n 보기 \n 정답 \n 해설
        
        # 문제 번호 추출
        m = re.search(r'기출문제\s*(\d+)\.', header)
        if m:
            q_num = int(m.group(1))
            if q_num >= 1 and q_num <= 20: current_subject = 1
            elif q_num >= 21 and q_num <= 40: current_subject = 2
            elif q_num >= 41 and q_num <= 60: current_subject = 3
            elif q_num >= 61 and q_num <= 80: current_subject = 4
        else:
            continue
            
        # 1과목 ~ 4과목 텍스트를 제거하기 위해 정제
        body = re.sub(r'제\s*[1-4]과목\s*:\s*[^\n]+', '', body)
        
        lines = body.strip().split('\n')
        
        # 첫째 줄은 키워드 (예: 빅데이터 기술)
        keyword = lines[0].strip()
        
        # 다음은 문제 질문 텍스트
        question_text = ""
        idx = 1
        while idx < len(lines):
            line = lines[idx].strip()
            if line.startswith('①') or line.startswith('1)'):
                break
            if line:
                question_text += line + "\n"
            idx += 1
            
        question_text = question_text.strip()
        
        # 옵션 찾기
        options = ["", "", "", ""]
        opt_idx = 0
        while idx < len(lines):
            line = lines[idx].strip()
            if '정답' in line and ':' in line:
                break
            
            # 옵션 파싱 로직 강화
            if line.startswith('①') or line.startswith('1)') or line.startswith('1.'):
                options[0] = re.sub(r'^[①1\)\.]\s*', '', line)
                opt_idx = 0
            elif line.startswith('②') or line.startswith('2)') or line.startswith('2.'):
                options[1] = re.sub(r'^[②2\)\.]\s*', '', line)
                opt_idx = 1
            elif line.startswith('③') or line.startswith('3)') or line.startswith('3.'):
                options[2] = re.sub(r'^[③3\)\.]\s*', '', line)
                opt_idx = 2
            elif line.startswith('④') or line.startswith('4)') or line.startswith('4.'):
                options[3] = re.sub(r'^[④4\)\.]\s*', '', line)
                opt_idx = 3
            elif line:
                # 옵션이 여러 줄인 경우
                options[opt_idx] += " " + line
                
            idx += 1
            
        # 정답 찾기
        answer = 1
        while idx < len(lines):
            line = lines[idx].strip()
            if '정답' in line and ':' in line:
                # "정답 : ②번" 등에서 숫자 추출
                ans_str = line.split(':')[1].strip()
                if '1' in ans_str or '①' in ans_str: answer = 1
                elif '2' in ans_str or '②' in ans_str: answer = 2
                elif '3' in ans_str or '③' in ans_str: answer = 3
                elif '4' in ans_str or '④' in ans_str: answer = 4
                idx += 1
                break
            idx += 1
            
        # 해설 찾기
        explanation = ""
        while idx < len(lines):
            line = lines[idx].strip()
            if line == '해설':
                idx += 1
                continue
            if line:
                explanation += line + "\n"
            idx += 1
            
        explanation = explanation.strip()
        
        # JSON 객체 조립
        q_obj = {
            "id": f"Q11_{current_subject}_{q_num}",
            "sectionId": "exam11th",
            "subject": current_subject,
            "chapter": keyword,
            "question": f"[11회 기출] {question_text}",
            "options": [o.strip() for o in options],
            "answer": answer,
            "explanation": explanation
        }
        
        questions.append(q_obj)

    print(f"Parsed {len(questions)} questions.")
    
    # cbt_bank.json에 반영
    cbt = load_json('cbt_bank.json')
    # 기존 exam11th 지우기 (만약 있다면)
    cbt['questions'] = [q for q in cbt.get('questions', []) if q.get('sectionId') != 'exam11th']
    cbt['questions'].extend(questions)
    
    save_json('cbt_bank.json', cbt)
    print(f"Successfully added 11th exam questions to cbt_bank.json. Total CBT length: {len(cbt['questions'])}")

if __name__ == '__main__':
    parse_exam11()
