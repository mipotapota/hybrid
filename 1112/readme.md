#[README.md](https://github.com/user-attachments/files/23560117/README.md)
# 🏃 MoveON - 오늘도 한 걸음 더

> 국민체육진흥공단 공공데이터를 활용한 맞춤형 운동 추천 플랫폼

![MoveON Logo](https://via.placeholder.com/800x200/3DDC97/FFFFFF?text=MoveON)

---

## 📱 프로젝트 소개

**MoveON**은 국민 모두가 건강한 삶을 누릴 수 있도록 돕는 운동 추천 및 관리 웹 애플리케이션입니다.

### 🎯 주요 기능

1. **오늘의 추천 운동**
   - AI 기반 사용자 맞춤형 운동 추천
   - 난이도별, 유형별 다양한 운동 제공
   - 운동 완료 체크 및 기록

2. **운동 기록 관리**
   - 달력 형태의 직관적인 기록 확인
   - 주간/월간 통계 시각화
   - 달성률 계산 및 목표 관리

3. **주변 운동 시설 정보** 🗺️
   - 공공체육시설 데이터 활용
   - **네이버 지도 연동** (NEW!)
   - 현재 위치 기반 주변 시설 표시
   - 시설 마커 클릭으로 상세 정보 확인
   - 네이버 지도 길찾기 기능
   - 거리순 시설 목록
   - 즐겨찾기 기능
   - 운영시간, 프로그램 정보 제공

4. **사용자 프로필**
   - 개인 정보 관리
   - 운동 통계 요약
   - 즐겨찾기한 시설 모아보기

5. **맞춤 설정**
   - 운동 알림 설정
   - 다크 모드 지원
   - 데이터 관리

---

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: 반응형 디자인, CSS Grid/Flexbox
- **JavaScript (ES6+)**: 모던 자바스크립트

### Backend & Database
- **Firebase Authentication**: 사용자 인증 (이메일/Google)
- **Cloud Firestore**: NoSQL 실시간 데이터베이스

### Libraries & Tools
- **Font Awesome**: 아이콘
- **Pretendard Font**: 한글 웹폰트
- **Firebase SDK 10.7.1**: Firebase 서비스 연동
- **Naver Maps API**: 지도 및 위치 기반 서비스 (NEW!)

---

## 🎨 디자인 컨셉

### 컬러 팔레트
- **Primary**: `#3DDC97` (민트) - 건강, 활력
- **Secondary**: `#1A2B4C` (네이비) - 신뢰, 전문성
- **Accent**: `#FF6B00` (주황) - 열정, 에너지

### 디자인 철학
- **프로페셔널**: 국민체육진흥공단의 신뢰감
- **친근함**: 모든 연령대가 쉽게 사용 가능
- **모던함**: 최신 트렌드를 반영한 UI/UX

---

## 📂 프로젝트 구조

```
moveon-app/
├── index.html              # 메인 HTML
├── css/
│   └── style.css          # 스타일시트
├── js/
│   ├── firebase-config.js # Firebase 설정
│   ├── auth.js            # 사용자 인증
│   ├── data.js            # 데이터 관리
│   └── app.js             # 메인 앱 로직
├── FIREBASE_SETUP.md      # Firebase 설정 가이드
└── README.md              # 프로젝트 문서
```

---

## 🚀 시작하기

### 1. 프로젝트 다운로드
```bash
# Git Clone (저장소가 있는 경우)
git clone https://github.com/your-repo/moveon-app.git
cd moveon-app

# 또는 압축 파일 다운로드 후 압축 해제
```

### 2. Firebase 설정
📖 [FIREBASE_SETUP.md](FIREBASE_SETUP.md) 가이드를 따라 Firebase 프로젝트를 설정하세요.

**핵심 단계:**
1. Firebase 프로젝트 생성
2. Authentication 활성화 (이메일/Google)
3. Firestore Database 생성
4. 보안 규칙 설정
5. `js/firebase-config.js`에 설정 정보 입력

### 3. 네이버 지도 API 설정 (선택사항)
🗺️ [NAVER_MAP_SETUP.md](NAVER_MAP_SETUP.md) 가이드를 따라 지도 기능을 활성화하세요.

**핵심 단계:**
1. 네이버 클라우드 플랫폼 가입
2. AI·NAVER API → Maps 서비스 신청
3. Client ID 발급
4. `index.html`에서 `YOUR_CLIENT_ID`를 발급받은 ID로 변경

⚠️ **지도 기능을 사용하지 않으려면** 이 단계를 건너뛰어도 됩니다. 목록 보기는 정상 작동합니다.

### 4. 로컬 서버 실행

#### VS Code (추천)
1. **Live Server** 확장 프로그램 설치
2. `index.html` 우클릭 → "Open with Live Server"

#### Python
```bash
python -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

#### Node.js
```bash
npx http-server -p 8000
# 브라우저에서 http://localhost:8000 접속
```

### 4. 앱 사용하기
1. 회원가입 또는 Google 로그인
2. 오늘의 추천 운동 확인
3. 운동 완료 후 체크
4. 주변 시설 둘러보기

---

## 📊 공공데이터 활용

### 사용 데이터
1. **공공체육시설 정보** (data.go.kr)
   - 전국 공공체육시설 위치 및 상세 정보
   - 운영시간, 프로그램, 연락처

2. **공공체육시설 강좌 정보** (bigdata-culture.kr)
   - 5만+ 건의 강좌 데이터
   - 맞춤형 운동 추천에 활용

3. **국민체력측정 데이터** (bigdata-culture.kr)
   - 연령별, 성별 체력 데이터
   - 추천 알고리즘 개선

### 데이터 활용 방식
- **운동 추천**: 사용자 정보 + 체력 데이터 기반
- **시설 정보**: 위치 기반 가까운 시설 추천
- **프로그램 매칭**: 사용자 관심사와 시설 프로그램 매칭

---

## 👥 팀 소개

### GenCoder Team
- **팀장**: [팀장 이름]
- **개발**: 김산, 이예진
- **문서/발표**: [조원중 이름]

### 프로젝트 기간
- **시작**: 2025년 11월 13일
- **발표**: 2025년 11월 19일
- **대회 제출**: 2025년 12월 7일

---

## 🏆 참가 대회

**2025년도 국민체육진흥공단 공공데이터 활용 경진대회**

- **부문**: 서비스(웹·앱) 개발 부문
- **목표**: 공공데이터를 활용한 국민 건강 증진 서비스
- **기대 효과**:
  - 공공체육시설 활용도 증가
  - 국민 운동 참여율 향상
  - 건강한 생활 습관 형성

---

## 🎓 중학생도 따라할 수 있는 개발 가이드

### 필요한 준비물
1. 컴퓨터 (Windows/Mac/Linux)
2. 인터넷 연결
3. 웹 브라우저 (Chrome 권장)
4. VS Code (무료 프로그램)

### 단계별 가이드
1. **HTML 이해하기**: 웹페이지의 뼈대
2. **CSS 꾸미기**: 예쁘게 만들기
3. **JavaScript 동작**: 클릭하면 반응하게
4. **Firebase 연결**: 데이터 저장하기

📖 자세한 가이드는 `TUTORIAL.md`를 참고하세요!

---

## 📸 스크린샷

### 홈 화면
![Home](https://via.placeholder.com/600x400/3DDC97/FFFFFF?text=Home+Screen)

### 운동 기록
![Record](https://via.placeholder.com/600x400/1A2B4C/FFFFFF?text=Workout+Record)

### 주변 시설
![Facility](https://via.placeholder.com/600x400/3DDC97/FFFFFF?text=Nearby+Facilities)

---

## 📝 향후 개발 계획

### Phase 1 (현재)
- ✅ 기본 UI/UX 완성
- ✅ Firebase 인증 연동
- ✅ 운동 추천 알고리즘
- ✅ 기록 관리 시스템

### Phase 2 (12월 7일까지)
- [ ] 실제 공공데이터 API 연동
- [ ] 카카오맵 / 네이버맵 연동
- [ ] 운동 알림 푸시 기능
- [ ] 친구 초대 / 랭킹 시스템
- [ ] PWA (Progressive Web App) 전환

### Phase 3 (앱스토어 배포)
- [ ] 실제 사용자 테스트
- [ ] 성능 최적화
- [ ] 다국어 지원
- [ ] iOS/Android 네이티브 앱 전환

---

## 🐛 알려진 이슈

1. **지도 기능**: 현재 개발 중 (카카오맵 API 연동 예정)
2. **알림 기능**: 브라우저 알림만 지원 (푸시 알림 추가 예정)
3. **오프라인 모드**: 현재 미지원 (PWA 전환 후 지원 예정)

---

## 🤝 기여하기

버그 리포트나 기능 제안은 언제나 환영합니다!

1. 이슈 등록: [Issues](https://github.com/your-repo/issues)
2. Pull Request 제출
3. 팀원에게 직접 연락

---

## 📄 라이선스

이 프로젝트는 학교 프로젝트 및 경진대회 출품을 위해 제작되었습니다.

**사용 데이터**:
- 국민체육진흥공단 공공데이터 (공공누리 제1유형)
- 공공데이터포털 (data.go.kr)
- 문화빅데이터플랫폼 (bigdata-culture.kr)

---

## 📞 문의

- **Email**: [팀 대표 이메일]
- **GitHub**: [프로젝트 저장소]
- **발표 자료**: [링크]

---

## 🙏 감사의 말

- 국민체육진흥공단의 공공데이터 개방에 감사드립니다
- 지도교수님의 조언에 감사드립니다
- 팀원들의 노력에 감사드립니다

---

<div align="center">

**MoveON - 오늘도 한 걸음 더 🏃**

Made with ❤️ by GenCoder Team

[🏠 홈으로](.) | [📖 Firebase 설정](FIREBASE_SETUP.md) | [🎓 튜토리얼](TUTORIAL.md)

</div>
