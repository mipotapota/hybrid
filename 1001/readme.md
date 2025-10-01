# 🏨 ドーミーイン津駅 (도미 인 쓰역) 공식 웹사이트

일본 미에현 쓰시에 위치한 **도미 인 쓰역 호텔**의 공식 웹사이트 프로젝트입니다.

## 📋 프로젝트 소개

이 프로젝트는 도미 인 쓰역 호텔을 소개하는 반응형 웹사이트입니다. 천연온천과 편리한 위치, 고급스러운 객실을 갖춘 호텔의 매력을 효과적으로 전달합니다.

### ✨ 주요 기능

- 📱 **완벽한 반응형 디자인** - 모바일, 태블릿, 데스크톱 모든 기기 지원
- 🎨 **Bootstrap 5 프레임워크** - 최신 CSS 프레임워크 적용
- 🗺️ **구글 맵 통합** - 호텔 위치를 지도로 확인 가능
- 🎥 **YouTube 영상 임베드** - 호텔 소개 영상 제공
- ⚡ **빠른 로딩 속도** - CDN을 통한 최적화된 리소스 로드
- 🎯 **스무스 스크롤** - 부드러운 네비게이션 경험

## 🏗️ 웹사이트 구조

### 페이지 섹션

1. **🏠 홈 (Hero Section)**
   - 호텔의 첫인상을 전달하는 히어로 섹션
   - 매력적인 비주얼과 메시지

2. **⭐ 특징 (Features)**
   - 천연온천 대욕장
   - 역세권 입지 (쓰역에서 도보 3분)
   - 조식 뷔페
   - 무료 Wi-Fi
   - 주차장 완비
   - 24시간 프론트 운영

3. **🛏️ 객실 (Rooms)**
   - 다양한 객실 타입 소개
   - 고품질 이미지 갤러리
   - 호버 효과를 통한 상세 정보

4. **♨️ 천연온천 (Onsen)**
   - 온천 시설 소개
   - 영업시간 및 효능 안내
   - 사우나 및 부대시설 정보

5. **🎬 소개영상 (Video)**
   - YouTube 호텔 투어 영상
   - 반응형 비디오 플레이어

6. **📍 오시는 길 (Access)**
   - 구글 맵 임베드
   - 상세한 교통 안내
   - 전화번호 및 연락처 정보

## 🛠️ 사용 기술

### 프론트엔드
- **HTML5** - 시맨틱 마크업
- **CSS3** - 커스텀 스타일링
- **JavaScript (ES6+)** - 인터랙티브 기능

### 프레임워크 & 라이브러리
- **Bootstrap 5.3.2** - 반응형 UI 프레임워크
- **Font Awesome 6.4.2** - 아이콘 라이브러리

### 외부 서비스
- **Google Maps API** - 지도 서비스
- **YouTube Embed** - 비디오 스트리밍

## 🚀 GitHub Pages 배포 방법

### 1단계: 저장소 생성
```bash
# 로컬에 디렉토리 생성
mkdir dormyinn-tsu
cd dormyinn-tsu

# Git 초기화
git init
```

### 2단계: 파일 추가
```bash
# index.html 파일 생성 (위의 코드 복사)
# 파일을 저장소에 추가
git add index.html
git commit -m "Initial commit: 도미 인 쓰역 웹사이트 추가"
```

### 3단계: GitHub에 푸시
```bash
# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/your-username/dormyinn-tsu.git
git branch -M main
git push -u origin main
```

### 4단계: GitHub Pages 활성화
1. GitHub 저장소 페이지로 이동
2. **Settings** 클릭
3. 왼쪽 메뉴에서 **Pages** 선택
4. **Source**에서 `main` 브랜치 선택
5. **Save** 클릭

### 5단계: 접속
약 1-2분 후 다음 주소로 접속:
```
https://your-username.github.io/dormyinn-tsu/
```

## 📂 프로젝트 구조

```
dormyinn-tsu/
│
├── index.html          # 메인 HTML 파일
├── README.md          # 프로젝트 설명 (이 파일)
│
└── assets/            # (선택사항) 추가 리소스
    ├── images/        # 로컬 이미지
    └── docs/          # 추가 문서
```

## 🎨 디자인 컨셉

### 컬러 팔레트
- **Primary Color**: `#2c5ba6` (신뢰감 있는 블루)
- **Secondary Color**: `#f8b500` (따뜻한 골드)
- **Text Color**: `#333` (가독성 높은 다크 그레이)
- **Background**: `#f8f9fa` (부드러운 라이트 그레이)

### 타이포그래피
- 일본어: Hiragino Kaku Gothic Pro, Meiryo
- 숫자/영문: 시스템 기본 폰트

### 디자인 원칙
- **미니멀리즘** - 깔끔하고 정돈된 레이아웃
- **일관성** - 모든 섹션에 통일된 디자인 언어
- **접근성** - 명확한 대비와 읽기 쉬운 폰트
- **인터랙션** - 직관적인 호버 효과와 애니메이션

## 📱 반응형 브레이크포인트

```css
/* 모바일 */
@media (max-width: 768px) { ... }

/* 태블릿 */
@media (min-width: 769px) and (max-width: 1024px) { ... }

/* 데스크톱 */
@media (min-width: 1025px) { ... }
```

## ⚡ 성능 최적화

- **CDN 사용** - Bootstrap과 Font Awesome을 CDN에서 로드
- **이미지 최적화** - Unsplash를 통한 최적화된 이미지 사용
- **지연 로딩** - Google Maps의 lazy loading 적용
- **코드 압축** - 프로덕션용 minified 버전 사용

## 🔒 보안 고려사항

- HTTPS를 통한 모든 리소스 로드
- 외부 스크립트는 신뢰할 수 있는 CDN에서만 사용
- XSS 방지를 위한 적절한 입력 검증

## 🌐 브라우저 호환성

- ✅ Chrome (최신 버전)
- ✅ Firefox (최신 버전)
- ✅ Safari (최신 버전)
- ✅ Edge (최신 버전)
- ✅ 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 📝 라이선스

이 프로젝트는 교육 및 포트폴리오 목적으로 제작되었습니다.

## 👨‍💻 개발자 정보

**프로젝트 제작**: 웹 개발 과제 프로젝트
**제작 목적**: 가고 싶은 회사(호텔) 소개 웹사이트 제작

## 📞 호텔 연락처

- **주소**: 〒514-0009 三重県津市羽所町345
- **전화**: 059-213-5489
- **이메일**: info@dormyinn-tsu.com
- **공식 유튜브**: [호텔 소개 영상](https://youtu.be/1lg9-plNxk4)

## 🔄 업데이트 내역

### v1.0.0 (2025-10-01)
- ✨ 초기 릴리즈
- 🎨 Bootstrap 5 프레임워크 적용
- 📱 완전한 반응형 디자인 구현
- 🗺️ Google Maps 통합
- 🎥 YouTube 영상 임베드
- ♨️ 온천 정보 섹션 추가

## 🎯 향후 개선 계획

- [ ] 다국어 지원 (한국어, 영어, 중국어)
- [ ] 실시간 예약 시스템 통합
- [ ] 객실 가격 및 프로모션 정보
- [ ] 고객 리뷰 섹션
- [ ] 블로그/뉴스 섹션
- [ ] SEO 최적화
- [ ] 이미지 갤러리 확장
- [ ] 360도 가상 투어

## 💡 기여하기

이 프로젝트에 기여하고 싶으시다면:

1. Fork 하기
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 🙏 감사의 말

- **Bootstrap Team** - 훌륭한 UI 프레임워크 제공
- **Font Awesome** - 아이콘 라이브러리
- **Unsplash** - 고품질 이미지 제공
- **Google Maps** - 지도 서비스
- **도미 인 호텔** - 영감을 준 실제 호텔

## 📚 참고 자료

- [Bootstrap 공식 문서](https://getbootstrap.com/docs/5.3/)
- [Font Awesome 아이콘](https://fontawesome.com/icons)
- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed)
- [YouTube Embed Parameters](https://developers.google.com/youtube/player_parameters)

---

**Made with ❤️ for Dormy Inn Tsu Station**

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!
