# 콘서트 알림 앱 업데이트 가이드

## 🔄 캐시 문제 해결 방법

이전 버전의 데이터가 계속 보이는 경우, 아래 방법들을 시도해주세요.

### 방법 1: 브라우저 캐시 완전 삭제 (권장)

#### Chrome / Edge
1. `F12` 또는 `Ctrl + Shift + I`로 개발자 도구 열기
2. `Application` 탭 클릭
3. 왼쪽 메뉴에서 `Storage` 선택
4. `Clear site data` 버튼 클릭
5. 페이지 새로고침 (`F5`)

#### Firefox
1. `F12`로 개발자 도구 열기
2. `Storage` 탭 클릭
3. `Service Workers` 선택
4. `Unregister` 클릭
5. 캐시 삭제 후 새로고침

### 방법 2: Service Worker 수동 제거

#### Chrome / Edge
1. 주소창에 입력: `chrome://serviceworker-internals/`
2. 해당 사이트 찾기
3. `Unregister` 클릭
4. 브라우저 캐시 삭제 (`Ctrl + Shift + Delete`)
5. 사이트 재접속

### 방법 3: 강력 새로고침
- Windows: `Ctrl + Shift + R` 또는 `Ctrl + F5`
- Mac: `Cmd + Shift + R`

### 방법 4: 시크릿 모드로 테스트
- Chrome: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`

---

## 📝 업데이트 내역

### v2 (현재 버전)
- ✅ Service Worker 캐싱 전략 변경 (Cache First → Network First)
- ✅ 캐시 버전 업데이트 (v1 → v2)
- ✅ 항상 최신 콘서트 데이터 표시
- ✅ 오프라인에서도 이전 데이터 접근 가능

### 주요 개선사항
- **Network First 전략**: 인터넷이 연결되어 있으면 항상 최신 데이터를 가져옵니다
- **자동 캐시 삭제**: 새 버전 설치 시 이전 캐시 자동 삭제
- **오프라인 지원**: 네트워크가 없을 때만 캐시된 데이터 사용

---

## 🚀 배포 시 주의사항

1. **Service Worker 버전 업데이트**: 콘서트 데이터 변경 시 `service-worker.js`의 `CACHE_NAME`을 증가시키세요
   ```javascript
   const CACHE_NAME = 'concert-alert-v3'; // v2 → v3
   ```

2. **사용자 안내**: 대규모 업데이트 시 사용자에게 캐시 삭제 안내

3. **테스트**: 시크릿 모드에서 테스트하여 캐시 영향 없이 확인

---

## 💡 개발자 팁

### 개발 중 캐시 비활성화
Chrome DevTools → Network 탭 → "Disable cache" 체크

### Service Worker 즉시 업데이트
```javascript
// service-worker.js의 install 이벤트에 이미 적용됨
self.skipWaiting();
```

### 캐시 전략 이해
- **Network First**: 최신 데이터 우선, 오프라인 시 캐시 사용 (현재 적용)
- **Cache First**: 빠른 로딩, 업데이트 느림 (이전 버전)

---

## 🔧 문제 해결

### Q: 여전히 이전 데이터가 보여요
A: 브라우저를 완전히 종료하고 다시 열어보세요

### Q: 오프라인에서 작동하지 않아요
A: 한 번 이상 온라인 상태에서 접속해야 캐시가 생성됩니다

### Q: 모바일에서는 어떻게 하나요?
A: 
- iOS Safari: 설정 → Safari → 고급 → 웹사이트 데이터 → 해당 사이트 삭제
- Android Chrome: 설정 → 개인정보 보호 → 인터넷 사용 기록 삭제

---

**문의사항이 있으시면 GenCoder 팀에 연락해주세요!** 🎵
