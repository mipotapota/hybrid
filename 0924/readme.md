# 🌟 공공데이터 통합 플랫폼

> **한국 공공데이터포털(data.go.kr) API를 활용한 통합 정보 서비스**

## 📋 목차

- [소개](#-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [데모](#-데모)
- [설치 및 실행](#-설치-및-실행)
- [API 설정](#-api-설정)
- [사용법](#-사용법)
- [스크린샷](#-스크린샷)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)
- [연락처](#-연락처)

## 🚀 소개

공공데이터 통합 플랫폼은 한국의 공공데이터포털에서 제공하는 다양한 API를 활용하여 시민들에게 필요한 정보를 통합적으로 제공하는 웹 플랫폼입니다. 

날씨, 부동산, 관광 정보를 한 곳에서 편리하게 조회할 수 있으며, 모든 기기에서 최적화된 사용자 경험을 제공합니다.

### ✨ 특징

- 🌤️ **실시간 날씨 정보** - 기상청 API를 통한 상세 날씨 예보
- 🏢 **부동산 실거래가** - 서울시 부동산 시장 분석
- 🗺️ **관광지 날씨** - 여행 계획을 위한 관광기후지수
- 📱 **완벽한 반응형** - 모바일부터 데스크톱까지
- 🎨 **모던 UI/UX** - 프로페셔널하고 직관적인 디자인
- ⚡ **고성능** - 최적화된 로딩과 부드러운 애니메이션

## 🎯 주요 기능

### 1. 🌤️ 실시간 날씨 정보
- **기상청 단기예보 API** 연동
- 시간별 기온/습도 변화 차트
- 풍향, 풍속, 강수량 실시간 모니터링
- 격자 좌표 기반 정확한 지역별 예보

### 2. 🏢 부동산 실거래가 분석
- **서울시 부동산 실거래가 API** 연동
- 자치구별/월별 거래량 통계
- 평균/최고/최저 거래금액 분석
- 아파트, 오피스텔, 연립다세대 필터링
- 인터랙티브 차트와 테이블

### 3. 🗺️ 관광지 날씨 서비스
- **관광지 날씨 정보 API** 연동
- 지역별 관광기후지수 제공
- 활동별 추천도 분석 (관광, 등산, 해변, 축제)
- 주간 날씨 전망
- 월별 관광기후지수 추이

### 4. 🎨 사용자 경험
- **햄버거 메뉴** - 모바일 최적화 네비게이션
- **터치 제스처** - 스와이프 사이드바 제어
- **키보드 네비게이션** - 접근성 지원
- **자동 새로고침** - 5분마다 데이터 업데이트
- **PWA 지원** - 앱처럼 설치 가능

## 🛠 기술 스택

### Frontend
- **HTML5** - 시맨틱 마크업
- **CSS3** - Grid, Flexbox, CSS Variables
- **JavaScript (ES6+)** - 모던 JavaScript
- **Chart.js** - 데이터 시각화
- **Web APIs** - Fetch, Service Worker, Local Storage

### Design
- **Inter Font** - 모던 타이포그래피
- **CSS Grid & Flexbox** - 반응형 레이아웃
- **CSS Custom Properties** - 테마 시스템
- **Backdrop Filter** - 글래스모피즘 효과

### APIs
- **기상청 단기예보 조회서비스**
- **서울시 부동산 실거래가 정보**  
- **관광지 날씨 정보 서비스**

## 🎬 데모

### 🌐 라이브 데모
👉 [https://your-username.github.io/public-data-platform](https://your-username.github.io/public-data-platform)

### 📱 모바일 데모
<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/mobile-demo.gif" alt="모바일 데모" width="300"/>
</p>

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/public-data-platform.git
cd public-data-platform
```

### 2. 로컬 서버 실행

#### Python 사용
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Node.js 사용
```bash
# http-server 설치 (전역)
npm install -g http-server

# 서버 실행
http-server
```

#### Live Server (VSCode)
1. VSCode에서 Live Server 확장프로그램 설치
2. `index.html` 파일에서 우클릭 → "Open with Live Server"

### 3. 브라우저에서 확인
```
http://localhost:8000
```

## 🔑 API 설정

실제 공공데이터를 연동하려면 API 인증키가 필요합니다.

### 1. 공공데이터포털 가입 및 API 신청

#### 🌤️ 기상청 단기예보 API
1. [공공데이터포털](https://www.data.go.kr) 회원가입
2. "기상청_단기예보 ((구)_동네예보) 조회서비스" 검색
3. 활용신청 → 승인 대기 → 인증키 발급

#### 🏢 서울시 부동산 API  
1. [서울열린데이터광장](https://data.seoul.go.kr) 회원가입
2. "서울시 부동산 실거래가 정보" API 신청
3. 인증키 발급

#### 🗺️ 관광지 날씨 API
1. [공공데이터포털](https://www.data.go.kr)에서
2. "관광지 날씨 정보" 검색 및 신청
3. 인증키 발급

### 2. API 키 설정

#### 환경변수 파일 생성
```bash
# .env 파일 생성
WEATHER_API_KEY=your_weather_api_key_here
REALESTATE_API_KEY=your_realestate_api_key_here
TOURISM_API_KEY=your_tourism_api_key_here
```

#### JavaScript에서 API 키 사용
```javascript
// config.js (실제 운영시)
const API_CONFIG = {
    WEATHER: {
        key: process.env.WEATHER_API_KEY,
        baseUrl: 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0'
    },
    REALESTATE: {
        key: process.env.REALESTATE_API_KEY,
        baseUrl: 'http://openapi.seoul.go.kr:8088'
    },
    TOURISM: {
        key: process.env.TOURISM_API_KEY,
        baseUrl: 'http://apis.data.go.kr/1360000/TourStnInfoService'
    }
};
```

### 3. CORS 해결 방안

공공데이터 API는 브라우저 CORS 정책으로 인해 직접 호출이 제한됩니다.

#### Option 1: 백엔드 프록시 서버
```javascript
// Express.js 예시
app.get('/api/weather', async (req, res) => {
    const response = await fetch(`${WEATHER_API_URL}?serviceKey=${API_KEY}&...`);
    const data = await response.json();
    res.json(data);
});
```

#### Option 2: Netlify/Vercel Functions
```javascript
// netlify/functions/weather.js
exports.handler = async (event, context) => {
    const response = await fetch(weatherApiUrl);
    return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(await response.json())
    };
};
```

## 💡 사용법

### 기본 사용법

1. **메뉴 네비게이션**
   - 사이드바에서 원하는 서비스 선택
   - 모바일에서는 햄버거 메뉴 사용

2. **날씨 조회**
   - 격자 X, Y 좌표 입력
   - "날씨 조회" 버튼 클릭
   - 실시간 날씨 정보 및 차트 확인

3. **부동산 조회**
   - 자치구, 물건구분, 연도 선택
   - "조회" 버튼 클릭
   - 통계 및 상세 거래 정보 확인

4. **관광지 날씨**
   - 관광지역, 계절, 활동유형 선택
   - "조회" 버튼 클릭
   - 관광기후지수 및 활동 추천도 확인

### 고급 사용법

#### 키보드 단축키
- `Esc` - 모바일 메뉴 닫기
- `↑/↓` - 메뉴 항목 이동
- `Tab` - 포커스 이동

#### 터치 제스처 (모바일)
- **왼쪽 스와이프** - 사이드바 닫기
- **오른쪽 스와이프** - 사이드바 열기

## 📸 스크린샷

### 🖥️ 데스크톱
<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/desktop-weather.png" alt="데스크톱 날씨" width="400"/>
  <img src="https://user-images.githubusercontent.com/placeholder/desktop-realestate.png" alt="데스크톱 부동산" width="400"/>
</p>

### 📱 모바일
<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/mobile-menu.png" alt="모바일 메뉴" width="250"/>
  <img src="https://user-images.githubusercontent.com/placeholder/mobile-weather.png" alt="모바일 날씨" width="250"/>
  <img src="https://user-images.githubusercontent.com/placeholder/mobile-tourism.png" alt="모바일 관광" width="250"/>
</p>

### 🎨 다크 모드 (준비중)
<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/dark-mode.png" alt="다크 모드" width="600"/>
</p>

## 🔄 업데이트 로그

### v1.0.0 (2024-09-24)
- ✨ 초기 릴리즈
- 🌤️ 날씨 정보 서비스 구현
- 🏢 부동산 실거래가 서비스 구현  
- 🗺️ 관광지 날씨 서비스 구현
- 📱 반응형 디자인 완성
- 🎨 프로페셔널 UI/UX 디자인

### 계획된 업데이트
- [ ] 🌙 다크 모드 지원
- [ ] 🔄 실시간 데이터 연동
- [ ] 📊 더 많은 차트 유형
- [ ] 🗺️ 지도 연동
- [ ] 🔔 알림 기능
- [ ] 💾 즐겨찾기 기능

## 🤝 기여하기

프로젝트에 기여해주세요! 모든 종류의 기여를 환영합니다.

### 기여 방법

1. **Fork** 이 저장소를 포크합니다
2. **Branch** 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. **Push** 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. **Pull Request** 풀 리퀘스트를 생성합니다

### 기여 가이드라인

#### 🐛 버그 리포트
- 이슈 템플릿을 사용해주세요
- 재현 가능한 단계를 포함해주세요
- 스크린샷이나 GIF를 첨부해주세요

#### ✨ 새로운 기능 제안
- 기능 설명과 사용 사례를 포함해주세요
- 가능하다면 목업이나 스케치를 첨부해주세요

#### 🎨 디자인 개선
- Before/After 스크린샷을 포함해주세요
- 접근성을 고려해주세요

### 코드 스타일

```javascript
// ✅ Good
function getData() {
    return fetch('/api/data')
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// ❌ Bad  
function getData(){
return fetch('/api/data').then(response=>response.json()).catch(error=>console.error('Error:',error));
}
```

## 📄 라이선스

이 프로젝트는 **MIT 라이선스**를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

```
MIT License

Copyright (c) 2024 공공데이터 통합 플랫폼

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

### 🙏 감사의 말

이 프로젝트는 다음의 오픈소스 프로젝트들의 도움을 받았습니다:
- [Chart.js](https://www.chartjs.org/) - 데이터 시각화
- [Inter Font](https://rsms.me/inter/) - 타이포그래피
- [공공데이터포털](https://www.data.go.kr) - 데이터 제공

---

⭐ **이 프로젝트가 유용했다면 Star를 눌러주세요!** ⭐
