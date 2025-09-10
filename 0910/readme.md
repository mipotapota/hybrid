# 🎨 반응형 포트폴리오 웹사이트

김학생의 개인 포트폴리오 웹사이트입니다. HTML5, CSS3, JavaScript를 사용하여 제작된 반응형 웹사이트입니다.

## 📁 파일 구조

```
portfolio/
├── index.html          # 메인 페이지 (소개)
├── reports.html        # 레포트 페이지
├── projects.html       # 프로젝트 페이지
├── portfolio.html      # 포트폴리오 페이지
├── style.css           # 스타일시트
├── script.js           # JavaScript 파일
├── README.md           # 프로젝트 설명
└── assets/             # 미디어 파일 폴더
    ├── intro-audio.mp3     # 자기소개 음성 파일
    ├── intro-audio.wav     # 자기소개 음성 파일 (대체)
    ├── project-demo.mp4    # 프로젝트 데모 비디오
    └── project-demo.webm   # 프로젝트 데모 비디오 (대체)
```

## 🌟 주요 기능

### 📱 4개 페이지 구성
- **소개 페이지** (`index.html`) - 개인 정보, 스킬, 오디오 메시지
- **레포트 페이지** (`reports.html`) - 학습 레포트 4개 (카드 형태)
- **프로젝트 페이지** (`projects.html`) - 주요 프로젝트 3개 + 비디오 섹션
- **포트폴리오 페이지** (`portfolio.html`) - 타임라인, 수상내역, 연락처

### 🎵🎬 멀티미디어
- **오디오**: 소개 페이지의 자기소개 음성 메시지
- **비디오**: 프로젝트 페이지의 데모 영상

### 📱 반응형 디자인
- 데스크탑, 태블릿, 모바일 완벽 지원
- 유연한 그리드 레이아웃
- 햄버거 메뉴 (모바일)

### 🎨 모던한 UI/UX
- 그라디언트 배경
- 글래스모피즘 효과
- 부드러운 애니메이션
- 호버 효과 및 트랜지션

## 🚀 설치 및 실행

1. **파일 다운로드**
   ```bash
   # 모든 파일을 하나의 폴더에 저장
   mkdir portfolio
   cd portfolio
   ```

2. **미디어 파일 준비**
   ```
   assets/
   ├── intro-audio.mp3      # 자기소개 음성 파일 추가
   ├── intro-audio.wav      # 대체 오디오 파일
   ├── project-demo.mp4     # 프로젝트 데모 비디오 추가
   └── project-demo.webm    # 대체 비디오 파일
   ```

3. **웹 서버 실행**
   ```bash
   # Python 3 사용 시
   python -m http.server 8000
   
   # Python 2 사용 시
   python -m SimpleHTTPServer 8000
   
   # Node.js 사용 시 (live-server)
   npx live-server
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:8000
   ```

## 🛠️ 커스터마이징

### 개인 정보 수정
각 HTML 파일에서 다음 정보를 수정하세요:
- 이름: "김학생" → 실제 이름
- 연락처: 이메일, 전화번호
- 소개글, 프로젝트 내용, 경력 등

### 색상 변경
`style.css`에서 CSS 변수를 수정하여 색상을 변경할 수 있습니다:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #333;
    --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### 미디어 파일 추가
1. `assets/` 폴더에 파일 추가
2. HTML에서 파일 경로 수정
```html
<!-- 오디오 -->
<source src="assets/your-audio.mp3" type="audio/mpeg">

<!-- 비디오 -->
<source src="assets/your-video.mp4" type="video/mp4">
```

## 📱 반응형 브레이크포인트

```css
/* 데스크탑 */
@media (min-width: 1024px) { ... }

/* 태블릿 */
@media (max-width: 768px) { ... }

/* 모바일 */
@media (max-width: 480px) { ... }
```

## 🎯 주요 JavaScript 기능

- `toggleMobile()` - 모바일 메뉴 토글
- `animateOnScroll()` - 스크롤 애니메이션
- `setupCardEffects()` - 카드 호버 효과
- `searchContent()` - 컨텐츠 검색
- `toggleDarkMode()` - 다크모드 전환

## 🌐 브라우저 지원

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 라이센스

이 프로젝트는 학습 목적으로 제작되었으며, 자유롭게 사용하실 수 있습니다.

## 📞 문의사항

궁금한 점이 있으시면 언제든 연락주세요!

- 📧 이메일: student@email.com
- 📱 전화: 010-1234-5678
- 🐙 GitHub: github.com/student

---

⭐ **Tip**: 실제 사용 시 개인 정보와 프로젝트 내용을 실제 내용으로 수정하세요!

# 반응형 자기소개페이지만들기
### 단 4개 이상의 페이지 구성(오디오와 비디오 필히 포함)
### 1. 간단한 소개 페이지
### 2. 레포트
### 3. 프로젝트
### 4. 포트폴리오


# 레포트 : 러버블 ai를 이용하여 자기 소개 앱 만들어 오기
