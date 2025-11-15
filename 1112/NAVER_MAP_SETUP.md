# 네이버 지도 API 설정 가이드

## 🗺️ 네이버 지도 API 사용하기

MoveON 앱에 지도 기능을 추가하기 위해 네이버 클라우드 플랫폼의 Maps API를 사용합니다.

---

## 📝 1단계: 네이버 클라우드 플랫폼 가입

### 1. 네이버 클라우드 플랫폼 접속
```
https://www.ncloud.com/
```

### 2. 회원가입 또는 로그인
- 네이버 계정으로 로그인
- 본인 인증 (휴대폰 인증)

### 3. 콘솔 접속
```
로그인 → 콘솔 클릭
```

---

## 🔑 2단계: API 키 발급

### 1. AI·NAVER API 선택
```
콘솔 메인 화면
→ Services
→ AI·NAVER API
→ AI·NAVER API
```

### 2. Application 등록
```
Application 등록 버튼 클릭

설정:
- Application 이름: MoveON
- Service 선택: 
  ✅ Maps
  ✅ Geocoding (선택사항)
  ✅ Directions5 (길찾기용)
- 서비스 환경: Web Dynamic Map
```

### 3. Web 서비스 URL 등록
```
Web 서비스 URL: http://localhost:8080
(또는 실제 배포 URL)
```

### 4. 인증 정보 확인
```
등록 완료 후:
- Client ID: 복사 (예: abc123xyz456)
- Client Secret: 복사 (선택사항)
```

---

## 💻 3단계: 코드에 적용

### index.html에 API 스크립트 추가

`index.html`의 `</head>` 태그 **바로 위**에 추가:

```html
<!-- 네이버 지도 API -->
<script type="text/javascript" 
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID"></script>
```

⚠️ **YOUR_CLIENT_ID를 발급받은 Client ID로 변경!**

예시:
```html
<script type="text/javascript" 
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=abc123xyz456"></script>
```

---

## 🧪 4단계: 테스트

### 1. index.html 파일 수정
위의 스크립트 태그 추가

### 2. 로컬 서버 실행
```bash
# Python이 설치되어 있다면:
python -m http.server 8080

# 또는 Node.js:
npx http-server -p 8080
```

### 3. 브라우저에서 확인
```
http://localhost:8080
→ 시설 페이지 이동
→ 지도가 표시되는지 확인
```

### 4. 개발자 도구 확인 (F12)
```
Console 탭에서 오류 확인:
✅ 정상: 오류 없음
❌ 오류: "Uncaught ReferenceError: naver is not defined"
   → API 키 확인 필요
```

---

## 📍 지도 기능 설명

### 1. 현재 위치 표시
- Geolocation API로 사용자 위치 자동 감지
- 파란색 마커로 표시

### 2. 주변 시설 표시
- 서울시 체육시설 API 데이터 사용
- 시설별 마커 표시:
  - 🏋️ 헬스장: 빨간 마커
  - 🏃 운동장: 파란 마커
  - 🏊 수영장: 초록 마커

### 3. 시설 정보 보기
- 마커 클릭 → 정보창 표시
- 시설명, 주소, 전화번호 등

### 4. 길찾기
- "길찾기" 버튼 클릭
- 네이버 지도 앱 또는 웹으로 연결
- 자동으로 경로 안내

---

## 🔒 보안 설정

### Web 서비스 URL 제한 (권장)
```
네이버 클라우드 콘솔
→ Application 설정
→ Web 서비스 URL에 실제 도메인만 추가

예:
- http://localhost:8080 (개발용)
- https://moveon.example.com (배포용)
```

### Referrer 제한
```
HTTP Referrer:
- http://localhost:8080/*
- https://moveon.example.com/*
```

---

## 💰 요금 정보

### 무료 사용량 (2024년 기준)
- **Maps API**: 월 100,000건 무료
- **Geocoding**: 월 100,000건 무료
- **Directions**: 월 100,000건 무료

### 예상 사용량
- 일일 사용자 100명 × 지도 로드 5회 = 500건/일
- 월 사용량: 약 15,000건
- ✅ **무료 범위 내**

---

## 🆘 문제 해결

### 지도가 안 보여요
```
1. F12 → Console 탭 확인
2. Client ID 확인 (복사 오류?)
3. Web 서비스 URL 확인
4. 스크립트 로드 확인 (Network 탭)
```

### "Uncaught ReferenceError: naver is not defined"
```
→ API 스크립트가 로드되지 않음
→ Client ID 확인
→ 인터넷 연결 확인
```

### 마커가 안 보여요
```
→ 시설 데이터의 위도/경도 확인
→ Console에서 오류 메시지 확인
```

### 길찾기가 안 돼요
```
→ 네이버 지도 앱 설치 확인 (모바일)
→ 팝업 차단 해제 (PC)
```

---

## 📚 참고 문서

- [네이버 지도 API 가이드](https://guide.ncloud-docs.com/docs/navermaps-overview)
- [네이버 Maps API v3](https://navermaps.github.io/maps.js.ncp/docs/)
- [Geolocation API](https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API)

---

## 📞 지원

API 키 발급이나 설정에 문제가 있으면:
1. 네이버 클라우드 고객센터: https://www.ncloud.com/support
2. 네이버 지도 API 문의: https://www.ncloud.com/support/question

---

## ✅ 설정 완료 체크리스트

- [ ] 네이버 클라우드 플랫폼 가입
- [ ] Application 등록
- [ ] Client ID 발급
- [ ] Web 서비스 URL 등록
- [ ] index.html에 스크립트 추가
- [ ] Client ID 코드에 적용
- [ ] 로컬 서버에서 테스트
- [ ] 지도 표시 확인
- [ ] 마커 표시 확인
- [ ] 길찾기 기능 확인

모두 체크되면 완료! 🎉
