# 🎵 콘서트 알림 PWA (Progressive Web App)

**GenCoder Team 프로젝트**

## 📋 프로젝트 개요

콘서트 일정을 관리하고 알림을 설정할 수 있는 Progressive Web App입니다.

### 팀원
- **김산** (팀장, 개발)
- **이예진** (개발)
- **강민우** (문서정리 및 PPT/발표)

### 개발 기간
- 2024년 11월 19일 ~ 11월 26일
- 발표일: 2024년 11월 26일

## ✨ 주요 기능

1. **콘서트 목록 표시**
   - 타이틀, 가수, 날짜/시간, 장소 정보 표시
   - 카드 형식의 깔끔한 UI

2. **상세정보 모달**
   - 콘서트 클릭 시 상세 정보 표시
   - 공연장, 가격, 설명 등 추가 정보

3. **알림 기능**
   - 콘서트별 개별 알림 on/off 가능
   - 기본값: 알림 ON
   - localStorage로 영구 저장

4. **자동 비활성화**
   - 지난 일정은 자동으로 색상 변경
   - 지난 일정의 알림은 비활성화

5. **PWA 기능**
   - 오프라인 지원
   - 홈 화면에 설치 가능
   - 앱처럼 사용 가능

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 반응형 디자인, 그라데이션, 애니메이션
- **JavaScript (ES6+)**: 동적 기능, localStorage, Service Worker
- **PWA**: manifest.json, Service Worker, 오프라인 캐싱

## 📁 파일 구조

```
concert-pwa/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── app.js              # 메인 JavaScript 로직
├── manifest.json       # PWA 매니페스트
├── service-worker.js   # 서비스 워커 (오프라인 지원)
├── icon-192.png        # 192x192 앱 아이콘
├── icon-512.png        # 512x512 앱 아이콘
├── icon.svg            # 원본 SVG 아이콘
└── README.md           # 프로젝트 설명서
```

## 🚀 실행 방법

### 방법 1: 로컬 서버 실행 (권장)

PWA는 HTTPS 또는 localhost에서만 작동하므로 로컬 서버가 필요합니다.

#### Python 사용
```bash
# Python 3
python -m http.server 8000

# 브라우저에서 접속
# http://localhost:8000
```

#### Node.js 사용
```bash
# http-server 설치 (전역)
npm install -g http-server

# 서버 실행
http-server -p 8000

# 브라우저에서 접속
# http://localhost:8000
```

#### VS Code Live Server 사용
1. VS Code에서 "Live Server" 확장 설치
2. index.html 우클릭 → "Open with Live Server"

### 방법 2: 파일 직접 열기 (제한적)

```bash
# 브라우저에서 index.html 직접 열기
# 주의: PWA 기능 (서비스 워커, 설치)은 작동하지 않음
```

## 📱 PWA 설치 방법

### 데스크톱 (Chrome/Edge)
1. 웹사이트 방문
2. 주소창 오른쪽 "설치" 버튼 클릭
3. 또는 메뉴 → "앱 설치"

### 모바일 (Android)
1. 웹사이트 방문
2. 메뉴 → "홈 화면에 추가"

### 모바일 (iOS)
1. Safari에서 웹사이트 방문
2. 공유 버튼 → "홈 화면에 추가"

## 🎨 디자인 특징

- **콘서트 테마**: 보라색/핑크 그라데이션
- **심플하고 깔끔한 UI**: 최소한의 요소로 구성
- **카드 기반 레이아웃**: 정보의 명확한 구분
- **부드러운 애니메이션**: 호버 효과, 모달 전환
- **반응형 디자인**: 모바일/태블릿/데스크톱 대응

## 💾 데이터 저장

- **localStorage** 사용
- 알림 on/off 상태 영구 저장
- 새로고침 후에도 설정 유지
- 브라우저 데이터 삭제 시 초기화

## 🔧 커스터마이징

### 콘서트 데이터 추가/수정

`app.js` 파일의 `concerts` 배열을 수정:

```javascript
const concerts = [
    {
        id: 1,
        title: "콘서트 제목",
        artist: "아티스트 이름",
        date: "2024-12-31",
        time: "19:00",
        venue: "공연장",
        location: "주소",
        description: "설명",
        price: "₩100,000 ~ ₩150,000"
    },
    // ... 추가 콘서트
];
```

### 색상 테마 변경

`style.css` 파일의 `:root` 변수 수정:

```css
:root {
    --primary-color: #6366f1;    /* 메인 색상 */
    --secondary-color: #8b5cf6;  /* 보조 색상 */
    --accent-color: #ec4899;     /* 강조 색상 */
    /* ... */
}
```

## 🧪 테스트 방법

1. **기본 기능 테스트**
   - 콘서트 목록이 정상적으로 표시되는지 확인
   - 각 카드의 정보가 정확한지 확인

2. **알림 토글 테스트**
   - 알림 스위치 on/off 동작 확인
   - 새로고침 후 상태 유지 확인

3. **상세정보 모달 테스트**
   - "상세정보 →" 클릭 시 모달 표시
   - 모달 외부 클릭 또는 X 버튼으로 닫기

4. **지난 일정 테스트**
   - 과거 날짜의 콘서트가 흐리게 표시되는지 확인
   - 지난 일정의 알림이 비활성화되는지 확인

5. **반응형 테스트**
   - 모바일/태블릿/데스크톱 화면에서 확인
   - 브라우저 개발자 도구로 다양한 화면 크기 테스트

6. **PWA 기능 테스트**
   - 오프라인 상태에서 앱 로드 확인
   - 홈 화면 추가 기능 확인

## 📊 브라우저 지원

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ⚠️ Internet Explorer: 지원 안 함

## 🐛 알려진 문제

1. iOS Safari에서 PWA 설치 후 푸시 알림 제한
2. 일부 구형 브라우저에서 Service Worker 미지원

## 🔄 향후 개선 사항

- [ ] 실제 푸시 알림 구현
- [ ] 백엔드 연동 (콘서트 데이터 API)
- [ ] 사용자 계정 시스템
- [ ] 티켓 예매 링크 연동
- [ ] 콘서트 검색 및 필터 기능
- [ ] 즐겨찾기 기능

## 📞 문의

GenCoder Team
- 김산 (팀장)
- 이예진
- 강민우

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

---

**Made with ❤️ by GenCoder Team**
