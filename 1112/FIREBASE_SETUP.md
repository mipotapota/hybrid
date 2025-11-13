# 🔥 MoveON Firebase 설정 가이드

## 📋 목차
1. [Firebase 프로젝트 생성](#1-firebase-프로젝트-생성)
2. [웹 앱 등록](#2-웹-앱-등록)
3. [Authentication 설정](#3-authentication-설정)
4. [Firestore Database 설정](#4-firestore-database-설정)
5. [코드에 설정 정보 입력](#5-코드에-설정-정보-입력)
6. [테스트 실행](#6-테스트-실행)

---

## 1. Firebase 프로젝트 생성

### Step 1: Firebase Console 접속
👉 https://console.firebase.google.com/

### Step 2: 새 프로젝트 만들기
1. **"프로젝트 추가"** 버튼 클릭
2. **프로젝트 이름**: `moveon-app` (또는 원하는 이름)
3. **Google Analytics**: "계속"을 눌러 권장 설정으로 진행
4. **Analytics 계정**: 기본 계정 선택 후 "프로젝트 만들기"

⏱️ 약 30초 소요

---

## 2. 웹 앱 등록

### Step 1: 웹 앱 추가
1. 프로젝트 개요 페이지에서 **"</>" (웹)** 아이콘 클릭
2. **앱 닉네임**: `MoveON`
3. **Firebase Hosting 설정**: 체크 안 함 (나중에 설정)
4. **"앱 등록"** 버튼 클릭

### Step 2: SDK 구성 복사
```javascript
// 이런 형태의 코드가 표시됩니다
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "moveon-app.firebaseapp.com",
  projectId: "moveon-app",
  storageBucket: "moveon-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:..."
};
```

⚠️ **중요**: 이 설정 정보를 복사해두세요!

---

## 3. Authentication 설정

### Step 1: Authentication 메뉴 이동
1. 왼쪽 사이드바에서 **"빌드" > "Authentication"** 클릭
2. **"시작하기"** 버튼 클릭

### Step 2: 로그인 방법 설정

#### 이메일/비밀번호 로그인
1. **Sign-in method** 탭 클릭
2. **"이메일/비밀번호"** 클릭
3. 첫 번째 **"사용 설정"** 토글 ON
4. **"저장"** 클릭

#### Google 로그인
1. **"Google"** 클릭
2. **"사용 설정"** 토글 ON
3. **프로젝트 공개용 이름**: `MoveON`
4. **프로젝트 지원 이메일**: 본인 이메일 선택
5. **"저장"** 클릭

✅ 완료!

---

## 4. Firestore Database 설정

### Step 1: Firestore Database 생성
1. 왼쪽 사이드바에서 **"빌드" > "Firestore Database"** 클릭
2. **"데이터베이스 만들기"** 버튼 클릭

### Step 2: 보안 규칙 선택
1. **"테스트 모드에서 시작"** 선택
   - ⚠️ 개발 중에만 사용! 나중에 프로덕션 모드로 변경
2. **"다음"** 클릭

### Step 3: 위치 설정
1. **위치**: `asia-northeast3 (Seoul)` 선택
   - 한국 사용자에게 가장 빠른 속도
2. **"사용 설정"** 클릭

⏱️ 약 1분 소요

### Step 4: 보안 규칙 설정 (중요!)

1. **"규칙"** 탭 클릭
2. 아래 규칙을 복사해서 붙여넣기:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 사용자 프로필 컬렉션
    match /users/{userId} {
      // 로그인한 사용자만 읽기 가능
      allow read: if request.auth != null;
      // 본인 데이터만 수정 가능
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 운동 기록 컬렉션
    match /workouts/{workoutId} {
      // 로그인한 사용자만 읽기 가능
      allow read: if request.auth != null;
      // 본인 운동 기록만 작성/수정 가능
      allow write: if request.auth != null && 
                      request.resource.data.userId == request.auth.uid;
    }
    
    // 즐겨찾기 컬렉션
    match /favorites/{favoriteId} {
      // 로그인한 사용자만 읽기 가능
      allow read: if request.auth != null;
      // 본인 즐겨찾기만 추가/삭제 가능
      allow write: if request.auth != null && 
                      request.resource.data.userId == request.auth.uid;
    }
  }
}
```

3. **"게시"** 버튼 클릭

✅ 보안 규칙 설정 완료!

---

## 5. 코드에 설정 정보 입력

### Step 1: firebase-config.js 파일 열기
`moveon-app/js/firebase-config.js` 파일을 열어주세요.

### Step 2: Firebase 설정 정보 입력

**현재 코드:**
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

**변경 후:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",  // 여기에 복사한 값 붙여넣기
    authDomain: "moveon-app.firebaseapp.com",
    projectId: "moveon-app",
    storageBucket: "moveon-app.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:..."
};
```

⚠️ **주의**: 본인의 Firebase 프로젝트 설정 값을 정확히 입력하세요!

---

## 6. 테스트 실행

### Step 1: 로컬 서버 실행

#### VS Code 사용시:
1. **Live Server** 확장 프로그램 설치
2. `index.html` 파일에서 우클릭
3. **"Open with Live Server"** 클릭

#### Python 사용시:
```bash
cd moveon-app
python -m http.server 8000
```
그리고 브라우저에서 `http://localhost:8000` 접속

### Step 2: 회원가입 테스트
1. 앱이 로드되면 **"회원가입"** 탭 클릭
2. 정보 입력:
   - 닉네임: `김산`
   - 이메일: `test@moveon.com`
   - 비밀번호: `test123`
   - 나이: `25`
   - 성별: 선택
3. **"회원가입"** 버튼 클릭

✅ "환영합니다, 김산님! 🎉" 메시지가 뜨면 성공!

### Step 3: Firebase Console에서 확인

1. Firebase Console > **"빌드" > "Authentication"**
2. **Users** 탭에서 방금 가입한 계정 확인

3. **"빌드" > "Firestore Database"**
4. `users` 컬렉션에서 사용자 데이터 확인

---

## 🎉 설정 완료!

모든 설정이 완료되었습니다! 이제 MoveON 앱을 마음껏 사용하세요!

### 다음 단계:
- ✅ 오늘의 운동 완료하기
- ✅ 주변 시설 둘러보기
- ✅ 프로필 수정하기
- ✅ 다크 모드 켜보기

---

## ❗ 문제 해결

### "Firebase not defined" 오류
- 인터넷 연결 확인
- CDN 링크가 제대로 로드되는지 확인

### "Permission denied" 오류
- Firestore 보안 규칙이 제대로 설정되었는지 확인
- 로그인이 되어 있는지 확인

### 로그인이 안 되는 경우
- Firebase Console에서 Authentication이 활성화되었는지 확인
- firebase-config.js의 설정 값이 정확한지 확인

---

## 📞 도움이 필요하면?

1. Firebase 공식 문서: https://firebase.google.com/docs
2. Stack Overflow: https://stackoverflow.com/questions/tagged/firebase
3. 팀원들과 상의하기!

---

**Made with ❤️ by GenCoder Team**
**MoveON - 오늘도 한 걸음 더**
