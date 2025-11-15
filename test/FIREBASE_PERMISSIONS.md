# Firebase 권한 설정 가이드

## 🔥 문제: "Missing or insufficient permissions" 오류

달성률 초기화 시 권한 오류가 발생하는 경우, Firebase Firestore 보안 규칙을 설정해야 합니다.

---

## 📝 해결 방법 1: Firebase Console에서 직접 설정

### 1단계: Firebase Console 접속
```
https://console.firebase.google.com/
→ 프로젝트 선택
```

### 2단계: Firestore 규칙 설정
```
왼쪽 메뉴 → Firestore Database
→ 규칙(Rules) 탭 클릭
```

### 3단계: 규칙 복사-붙여넣기
아래 규칙을 **전체 복사**해서 붙여넣기:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 사용자 문서 규칙
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 운동 기록 규칙
    match /workouts/{workoutId} {
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // 시설 즐겨찾기 규칙
    match /favorites/{favoriteId} {
      allow read, write, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

### 4단계: 게시
```
"게시" 또는 "Publish" 버튼 클릭
```

---

## 📝 해결 방법 2: Firebase CLI로 배포

### 1단계: Firebase CLI 설치 (이미 설치되어 있으면 스킵)
```bash
npm install -g firebase-tools
```

### 2단계: Firebase 로그인
```bash
firebase login
```

### 3단계: 프로젝트 초기화 (이미 되어 있으면 스킵)
```bash
firebase init firestore
```

### 4단계: firestore.rules 파일 확인
프로젝트 폴더에 `firestore.rules` 파일이 있는지 확인

### 5단계: 규칙 배포
```bash
firebase deploy --only firestore:rules
```

---

## ✅ 규칙 설명

### users 컬렉션
```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```
- 로그인한 사용자만 자신의 프로필을 읽고 수정 가능

### workouts 컬렉션
```javascript
match /workouts/{workoutId} {
  allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
  allow read, update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
}
```
- 로그인한 사용자만 자신의 운동 기록 생성 가능
- 자신의 기록만 읽기/수정/삭제 가능
- **delete 권한이 중요!** (달성률 초기화에 필요)

---

## 🔒 보안 규칙 설명

### ✅ 안전한 규칙 (현재 사용)
```javascript
// 본인의 데이터만 접근 가능
allow read, write, delete: if request.auth != null && resource.data.userId == request.auth.uid;
```

### ❌ 테스트용 규칙 (절대 프로덕션에서 사용 금지!)
```javascript
// 모든 사람이 모든 데이터에 접근 가능 (위험!)
allow read, write: if true;
```

---

## 🧪 규칙 테스트

### Firebase Console에서 테스트
```
Firestore Database → 규칙(Rules) 탭
→ 시뮬레이터 사용

테스트 케이스:
1. 위치: /workouts/{workoutId}
2. 인증 UID: (사용자 UID 입력)
3. 요청: delete
4. 실행 → "허용됨" 확인
```

---

## 📱 앱에서 확인

### 1. 규칙 적용 후
```
설정 → 달성률 초기화 → 확인
```

### 2. 콘솔 확인 (F12)
```
✅ 성공:
🔄 달성률 초기화 시작...
삭제할 운동 기록: 3 개
✅ 운동 기록 삭제 완료
✅ 달성률 초기화 완료!

❌ 여전히 실패:
권한 규칙 재확인 필요
```

---

## 🆘 여전히 안 되는 경우

### 1. 로그아웃 후 재로그인
```
설정 → 로그아웃
→ 다시 로그인
```

### 2. 브라우저 캐시 삭제
```
Ctrl + Shift + Delete
→ 전체 삭제
```

### 3. Firebase 콘솔에서 인덱스 확인
```
Firestore Database → 인덱스 탭
→ 복합 인덱스가 필요하다는 오류가 있으면 링크 클릭해서 생성
```

### 4. 개발자 도구 콘솔 확인
```
F12 → Console 탭
→ 정확한 오류 메시지 확인
```

---

## 💡 참고 문서

- [Firebase 보안 규칙 가이드](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase 규칙 테스트](https://firebase.google.com/docs/rules/unit-tests)

---

## 📞 도움이 필요하면

Firebase Console에서 규칙을 복사해서 보내주세요:
```
Firestore Database → 규칙 탭 → 전체 복사
```
