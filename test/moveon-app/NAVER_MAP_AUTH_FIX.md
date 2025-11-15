# 네이버 지도 인증 오류 해결 가이드

## ❌ 오류: "네이버 지도 Open API 인증이 실패했습니다"

이 오류는 네이버 클라우드 플랫폼에서 Application 설정이 제대로 되지 않았을 때 발생합니다.

---

## ✅ 해결 방법

### 1단계: 네이버 클라우드 콘솔 접속

```
https://console.ncloud.com/
→ 로그인
→ Services
→ AI·NAVER API
→ AI·NAVER API 선택
```

---

### 2단계: Application 설정 확인

#### ✅ 체크사항 1: Service 선택
```
Application 상세 페이지에서 확인:

✅ Maps (필수!)
□ Directions 5 (선택)
□ Geocoding (선택)
□ Reverse Geocoding (선택)
```

**중요:** 반드시 **"Maps"**에 체크되어 있어야 합니다!

---

#### ✅ 체크사항 2: 서비스 환경
```
서비스 환경: Web Dynamic Map
```

---

#### ✅ 체크사항 3: Web 서비스 URL
```
반드시 현재 사용 중인 localhost 주소를 등록해야 합니다!

예시:
http://localhost:8801
http://localhost:8080
http://127.0.0.1:8801
http://127.0.0.1:8080
```

**⚠️ 포트 번호가 정확히 일치해야 합니다!**

현재 사용 중인 주소를 확인하려면:
```
브라우저 주소창 확인
예: http://localhost:8801 사용 중이면
    → http://localhost:8801 등록
```

---

#### ✅ 체크사항 4: HTTP Referrer (선택사항)
```
더 강력한 보안을 위해 설정:

http://localhost:8801/*
http://localhost:8080/*
```

---

### 3단계: 설정 저장
```
모든 설정 확인 후
→ "수정" 또는 "저장" 버튼 클릭
→ 변경사항 적용 (몇 초 소요)
```

---

### 4단계: 브라우저 캐시 삭제
```
Ctrl + Shift + Delete
→ 캐시 삭제
→ 페이지 새로고침 (Ctrl + Shift + R)
```

---

## 🔍 설정 예시

### 올바른 설정
```
Application 이름: MoveON
Client ID: 0ecpw0kcgp

Service:
✅ Maps (체크됨!)
□ Directions 5
□ Geocoding

서비스 환경: Web Dynamic Map

Web 서비스 URL:
http://localhost:8801
http://localhost:8080
http://127.0.0.1:8801

HTTP Referrer (선택):
http://localhost:8801/*
http://localhost:8080/*
```

---

## 📸 스크린샷의 API 정보는?

스크린샷에 나온 내용:
```
x-ncp-apigw-api-key-id: Client ID
x-ncp-apigw-api-key: Client Secret
```

**이것은 서버 측 API용 헤더입니다.**

우리가 사용하는 **브라우저용 Maps JavaScript API**는:
- ✅ URL에 `ncpClientId` 파라미터만 필요
- ❌ HTTP 헤더에 Client Secret 불필요
- ❌ 서버 측 코드 불필요

**따라서 스크린샷의 요청 헤더 정보는 신경 쓰지 않아도 됩니다!**

---

## 🧪 테스트

### 1. 설정 완료 후 확인
```
1. 브라우저 새로고침 (Ctrl + Shift + R)
2. 시설 페이지 이동
3. "지도" 탭 클릭
4. 지도가 정상 표시되는지 확인
```

### 2. 개발자 도구 확인 (F12)
```
Console 탭 확인:

✅ 정상:
🗺️ 네이버 지도 초기화 시작...
✅ 지도 생성 완료
📍 현재 위치: {lat: ..., lng: ...}
✅ 현재 위치 마커 추가
📍 시설 마커 5개 추가 중...
✅ 시설 마커 5개 추가 완료

❌ 오류:
네이버 지도 Open API 인증이 실패했습니다
→ Web 서비스 URL 재확인 필요
```

---

## 🔄 여전히 안 되는 경우

### 방법 1: Application 재생성
```
1. 기존 Application 삭제
2. 새로 생성
3. Maps 서비스 체크
4. Web 서비스 URL 등록
5. 새로운 Client ID 발급
6. index.html에 새 ID 적용
```

### 방법 2: 포트 변경
```
현재: http://localhost:8801
시도: http://localhost:8080

Web 서비스 URL에 8080도 추가
→ 8080 포트로 서버 재시작
```

### 방법 3: 콘솔 오류 확인
```
F12 → Console 탭
→ 정확한 오류 메시지 복사
→ 네이버 클라우드 지원팀 문의
```

---

## 💬 추가 도움말

### 네이버 클라우드 고객센터
```
https://www.ncloud.com/support
→ 1:1 문의
→ "Maps API 인증 실패" 관련 문의
```

### 네이버 Maps API 문서
```
https://guide.ncloud-docs.com/docs/navermaps-overview
```

---

## ✅ 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] 네이버 클라우드 콘솔 로그인
- [ ] Application 찾기 (MoveON)
- [ ] Maps 서비스 체크 확인
- [ ] Web 서비스 URL 등록 (http://localhost:8801)
- [ ] 설정 저장
- [ ] 브라우저 캐시 삭제
- [ ] 페이지 새로고침
- [ ] 지도 정상 표시 확인
- [ ] Console 오류 없음 확인

모두 체크되면 완료! 🎉

---

## 🚨 중요!

**Web 서비스 URL은 정확히 일치해야 합니다:**

❌ 틀린 예:
```
등록: http://localhost:8080
실제: http://localhost:8801
→ 인증 실패!
```

✅ 올바른 예:
```
등록: http://localhost:8801
실제: http://localhost:8801
→ 인증 성공!
```

**포트 번호(8801, 8080 등)를 정확히 확인하세요!**
