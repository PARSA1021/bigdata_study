import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Declaration
content = content.replace('const mockPreset10th = document.getElementById("mockPreset10th");', 
                          'const mockPreset11th = document.getElementById("mockPreset11th");\n  const mockPreset10th = document.getElementById("mockPreset10th");')

# 2. SUBJECT_NAMES
content = content.replace('"exam10th": "🏆 10회 기출문제 (80제)",',
                          '"exam11th": "🔥 11회 기출문제 (최신 80제)",\n    "exam10th": "🏆 10회 기출문제 (80제)",')

# 3. initMockExam condition
content = content.replace('if (currentMockPreset === "10th") {',
                          'if (currentMockPreset === "11th") {\n      mockQuizzes = allQuizzes.filter(q => q.sectionId === "exam11th");\n    } else if (currentMockPreset === "10th") {')

# 4. ForEach
content = content.replace('[mockPreset10th, mockPreset4th, mockPresetRandom].forEach',
                          '[mockPreset11th, mockPreset10th, mockPreset4th, mockPresetRandom].forEach')

# 5. activeBtn logic
content = content.replace('if (currentMockPreset === "10th") activeBtn = mockPreset10th;',
                          'if (currentMockPreset === "11th") activeBtn = mockPreset11th;\n    else if (currentMockPreset === "10th") activeBtn = mockPreset10th;')

# 6. Event Listener
old_event = '''if (mockPreset10th) {
    mockPreset10th.addEventListener("click", () => initMockExam("10th"));
  }'''
new_event = '''if (mockPreset11th) {
    mockPreset11th.addEventListener("click", () => initMockExam("11th"));
  }
  if (mockPreset10th) {
    mockPreset10th.addEventListener("click", () => initMockExam("10th"));
  }'''
content = content.replace(old_event, new_event)

# random mode filter (exclude 11th too)
content = content.replace('q.sectionId !== "exam10th"', 'q.sectionId !== "exam10th" && q.sectionId !== "exam11th"')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('app.js updated successfully.')
