// ============================================
// Firebase 설정 파일
// ============================================

// ⚠️ 중요: 여기에 Firebase 프로젝트 설정을 입력하세요
// Firebase Console (https://console.firebase.google.com/)에서 
// 프로젝트 생성 후 설정 정보를 복사해서 붙여넣으세요

const firebaseConfig = {
   apiKey: "AIzaSyD5JjwFWNAbnOdM2iZVUp9TxgDFF-awd0k",
   authDomain: "gencoder-e82ae.firebaseapp.com",
   projectId: "gencoder-e82ae",
   storageBucket: "gencoder-e82ae.firebasestorage.app",
   messagingSenderId: "295375468656",
   appId: "1:295375468656:web:d964ed278d649cacb39cb5",
   measurementId: "G-VFJMXK8X85"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase 서비스 초기화
const auth = firebase.auth();
const db = firebase.firestore();

// Google 로그인 프로바이더
const googleProvider = new firebase.auth.GoogleAuthProvider();

console.log('🔥 Firebase 초기화 완료!');

// ============================================
// Firebase 설정 가이드
// ============================================
/*
1. Firebase Console 접속
  👉 https://console.firebase.google.com/

2. 새 프로젝트 만들기
  - 프로젝트 이름: moveon-app (또는 원하는 이름)
  - Google Analytics: 선택 (권장)

3. 웹 앱 추가
  - 앱 닉네임: MoveON
  - Firebase Hosting 설정: 나중에

4. Firebase SDK 구성 복사
  - firebaseConfig 객체를 위의 코드에 붙여넣기

5. Authentication 활성화
  - Authentication > Sign-in method
  - 이메일/비밀번호: 사용 설정
  - Google: 사용 설정

6. Firestore Database 생성
  - Firestore Database > 데이터베이스 만들기
  - 테스트 모드로 시작 (나중에 보안 규칙 설정)
  - 위치: asia-northeast3 (서울)

7. 보안 규칙 설정 (Firestore)
  - 아래 규칙을 복사해서 붙여넣기:

rules_version = '2';
service cloud.firestore {
 match /databases/{database}/documents {
   // 사용자 프로필
   match /users/{userId} {
     allow read: if request.auth != null;
     allow write: if request.auth != null && request.auth.uid == userId;
   }
   
   // 운동 기록
   match /workouts/{workoutId} {
     allow read: if request.auth != null;
     allow write: if request.auth != null && request.resource.data.userId == request.auth.uid;
   }
   
   // 즐겨찾기
   match /favorites/{favoriteId} {
     allow read: if request.auth != null;
     allow write: if request.auth != null && request.resource.data.userId == request.auth.uid;
   }
 }
}

8. 완료!
  - 이제 앱을 실행하면 Firebase와 연동됩니다
*/
