# GitHub 호스팅 가이드

## 🌐 베스킨라빈스 도감 게임을 인터넷에 올리기

이 가이드를 따라하면 여러분의 게임을 **무료로** 인터넷에 올릴 수 있어요!

---

## 🎯 준비물

1. **GitHub 계정** (무료)
   - https://github.com 에서 가입

2. **프로젝트 파일**
   - `www` 폴더 전체

3. **5분의 시간**

---

## 📝 Step 1: GitHub 가입 (3분)

### 1-1. GitHub 접속
```
https://github.com
```

### 1-2. Sign Up 클릭
- Username: 원하는 아이디 (영문)
- Email: 이메일 주소
- Password: 비밀번호 (8자 이상)

### 1-3. 이메일 인증
- 받은 메일에서 "Verify" 클릭

---

## 🚀 Step 2: Repository 만들기 (2분)

### 2-1. New Repository
1. 로그인 후 우측 상단 "+" 클릭
2. "New repository" 선택

### 2-2. 설정하기
```
Repository name: baskin-collection-game
Description: 베스킨라빈스 도감 수집 게임
Public ✅ (체크)
Add a README file ✅ (체크)
```

### 2-3. Create Repository 클릭

---

## 📤 Step 3: 파일 업로드 (3분)

### 3-1. Upload Files
1. "Add file" 버튼 클릭
2. "Upload files" 선택

### 3-2. 파일 드래그
```
www 폴더 안의 모든 파일을 드래그해서 올리기:
- index.html
- css/
- js/
- pages/
```

### 3-3. Commit
```
Commit message: "초기 업로드"
"Commit changes" 클릭
```

---

## 🌟 Step 4: GitHub Pages 설정 (2분)

### 4-1. Settings 이동
1. Repository 페이지에서
2. 상단 "Settings" 탭 클릭

### 4-2. Pages 설정
1. 왼쪽 메뉴에서 "Pages" 클릭
2. Source 설정:
   ```
   Branch: main
   Folder: / (root)
   ```
3. "Save" 클릭

### 4-3. 완료!
```
✅ Your site is live at:
https://사용자이름.github.io/baskin-collection-game/
```

---

## 🎉 Step 5: 게임 확인하기 (1분)

### 5-1. 링크 접속
- 5분 정도 기다린 후
- 위의 링크로 접속

### 5-2. 테스트
- 출석체크 작동하는지
- 뽑기 작동하는지
- 도감 보이는지

### 5-3. 공유하기
- 친구들에게 링크 공유!
- QR 코드 만들기

---

## 🔧 Step 6: 파일 수정하기

### 방법 1: 웹에서 직접 수정

1. **파일 선택**
   ```
   index.html 클릭
   ```

2. **편집 아이콘 클릭**
   - 연필 모양 아이콘

3. **수정하기**
   ```html
   <h1>베스킨라빈스 도감</h1>
   →
   <h1>나만의 도감</h1>
   ```

4. **저장하기**
   ```
   Commit message: "제목 변경"
   "Commit changes" 클릭
   ```

5. **확인**
   - 1~2분 후 링크 새로고침

### 방법 2: VS Code에서 수정 후 업로드

1. **로컬에서 수정**
2. **GitHub에서 Upload files**
3. **기존 파일 덮어쓰기**

---

## 📱 Step 7: QR 코드 만들기

### 7-1. QR 코드 생성기 접속
```
https://www.qr-code-generator.com
```

### 7-2. URL 입력
```
https://사용자이름.github.io/baskin-collection-game/
```

### 7-3. 다운로드
- "Download" 클릭
- 이미지 저장

### 7-4. 활용
- 발표 자료에 삽입
- 친구들이 폰으로 스캔
- 즉시 게임 플레이!

---

## 🎨 Step 8: 커스텀 도메인 (선택)

### 무료 도메인 받기

1. **Freenom 접속**
   ```
   https://www.freenom.com
   ```

2. **도메인 검색**
   ```
   mybaskin.tk (무료!)
   ```

3. **GitHub Pages 설정**
   - Settings → Pages
   - Custom domain 입력
   - Save

---

## 🔍 Step 9: 분석 도구 추가 (선택)

### Google Analytics

1. **계정 만들기**
   ```
   https://analytics.google.com
   ```

2. **추적 코드 받기**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```

3. **index.html에 추가**
   - `<head>` 태그 안에 삽입

4. **통계 확인**
   - 방문자 수
   - 페이지뷰
   - 사용 시간

---

## 💡 Step 10: 최적화 팁

### 10-1. 로딩 속도 개선

**이미지 압축**
```
TinyPNG.com 사용
파일 크기 50% 감소
```

**CSS/JS 압축**
```
Minifier 도구 사용
```

### 10-2. SEO 최적화

**meta 태그 추가**
```html
<meta name="description" content="베스킨라빈스 도감 수집 게임">
<meta name="keywords" content="베스킨라빈스, 도감, 게임">
```

### 10-3. 모바일 최적화

**viewport 확인**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 🐛 문제 해결

### Q1: 404 에러가 나요!
**A**: 파일 구조 확인
```
❌ 틀린 구조:
baskin-collection-game/
└── www/
    └── index.html

✅ 올바른 구조:
baskin-collection-game/
└── index.html
```

**해결법**: www 폴더 안의 파일들을 root로 옮기기

### Q2: 링크가 작동 안 해요!
**A**: 5분 후 다시 시도
```
GitHub Pages는 빌드 시간이 필요해요
Actions 탭에서 진행 상황 확인
```

### Q3: 업데이트가 안 보여요!
**A**: 캐시 문제
```
1. Ctrl + Shift + R (강력 새로고침)
2. 시크릿 모드로 접속
```

### Q4: CSS가 안 먹혀요!
**A**: 경로 확인
```html
❌ <link rel="stylesheet" href="/css/style.css">
✅ <link rel="stylesheet" href="css/style.css">
```

### Q5: localStorage가 안 돼요!
**A**: HTTPS 필요
```
GitHub Pages는 자동으로 HTTPS 제공
http:// 를 https:// 로 변경
```

---

## 📊 현재 호스팅 정보

### 프로젝트 정보
```
프로젝트명: baskin-collection-game
버전: 1.0.0
최종 업데이트: 2025.11.07
```

### 호스팅 URL (예시)
```
https://teamgencoder.github.io/baskin-collection-game/
```

### 통계
- 파일 크기: 약 45KB
- 페이지 수: 6개
- 로딩 시간: < 1초

---

## 🎯 완성 체크리스트

### GitHub 설정
- [ ] GitHub 계정 생성
- [ ] Repository 생성
- [ ] 파일 업로드 완료
- [ ] GitHub Pages 활성화
- [ ] 링크 작동 확인

### 최적화
- [ ] 404 페이지 추가
- [ ] favicon 추가
- [ ] meta 태그 설정
- [ ] 모바일 테스트

### 공유
- [ ] 링크 복사
- [ ] QR 코드 생성
- [ ] README 업데이트
- [ ] 친구들과 공유

---

## 🌟 추가 기능

### README.md 작성

```markdown
# 베스킨라빈스 도감 게임

![게임 스크린샷](screenshot.png)

## 🎮 게임 플레이
[여기서 플레이하기](https://사용자이름.github.io/baskin-collection-game/)

## 📖 소개
베스킨라빈스 아이스크림을 수집하는 도감 게임입니다.

## ⭐ 특징
- 30종 기본맛 + 12종 이달의 맛
- 출석체크 & 퀴즈 시스템
- 포인트 마일스톤 보상
- 확률형 기프티콘

## 👥 팀
Team GenCoder
- 김산: 기획 총괄
- 이예진: 디자인
- 강민우: 테스트

## 📅 개발 기간
2025.11.05 ~ 2025.11.07 (3일)

## 🛠️ 기술 스택
- HTML5 / CSS3 / JavaScript
- Cordova
- LocalStorage

## 📄 라이센스
MIT License
```

---

## 📞 도움말

### GitHub 공식 문서
- https://docs.github.com/ko

### GitHub Pages 가이드
- https://pages.github.com

### 커뮤니티
- GitHub Community Forum
- Stack Overflow

---

## 🎉 축하합니다!

**여러분의 게임이 전세계에 공개되었습니다!** 🌍

### 다음 단계
1. 친구들에게 공유
2. 피드백 받기
3. 업데이트하기
4. 포트폴리오에 추가

---

**작성일**: 2025.11.07  
**작성자**: Team GenCoder  
**난이도**: ⭐⭐☆☆☆ (초급)  
**소요 시간**: 10분
