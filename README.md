# 📱 Apache Cordova를 활용한 앱 개발 수업

## 📌 수업 개요
Apache Cordova는 **HTML, CSS, JavaScript**를 활용하여 크로스 플랫폼 모바일 애플리케이션을 개발할 수 있는 프레임워크입니다.  
본 수업에서는 Cordova의 기본 개념부터 실무 적용까지 다루며, 실제 앱을 제작해보는 경험을 제공합니다.

---

## 🎯 학습 목표
- Cordova의 구조와 동작 원리 이해
- 크로스 플랫폼 앱 개발 환경 구축
- 기본적인 앱 제작 및 실행
- 플러그인 활용을 통한 네이티브 기능 연동
- 앱 빌드 및 배포 프로세스 습득

---

## 🛠️ 개발 환경 준비
1. **Node.js 설치**
   - Cordova CLI는 Node.js 환경에서 동작하므로, 최신 LTS 버전 설치 필요
   - [https://nodejs.org](https://nodejs.org) 접속 후 다운로드

2. **Cordova CLI 설치**
   ```bash
   npm install -g cordova
   ```

3. **플랫폼별 SDK 준비**
   - **Android**: Android Studio 및 SDK 설치
   - **iOS**: Xcode 설치 (macOS 환경 필요)

---

## 📂 Cordova 프로젝트 구조
```plaintext
myApp/
 ├── config.xml        # 앱 구성 정보
 ├── hooks/            # 빌드 시 실행되는 스크립트
 ├── platforms/        # 플랫폼별 빌드 결과물
 ├── plugins/          # 설치된 플러그인
 ├── www/              # HTML, CSS, JS 리소스 (핵심 코드)
 └── package.json
```

---

## ✨ 기본 앱 만들기
1. **프로젝트 생성**
   ```bash
   cordova create myApp com.example.myapp MyApp
   ```

2. **플랫폼 추가**
   ```bash
   cd myApp
   cordova platform add android
   cordova platform add ios
   ```

3. **앱 실행**
   ```bash
   cordova run android
   cordova run ios
   ```

---

## 🔌 플러그인 사용하기
Cordova의 강점은 **네이티브 API 접근**입니다.  
예: 기기 카메라 사용
```bash
cordova plugin add cordova-plugin-camera
```

```javascript
navigator.camera.getPicture(onSuccess, onFail, {
  quality: 50,
  destinationType: Camera.DestinationType.DATA_URL
});

function onSuccess(imageData) {
  document.getElementById('myImage').src = "data:image/jpeg;base64," + imageData;
}
function onFail(message) {
  alert('Failed because: ' + message);
}
```

---

## 🚀 앱 빌드 및 배포
1. **APK 빌드 (Android)**
   ```bash
   cordova build android --release
   ```

2. **App Store 배포 (iOS)**
   - Xcode에서 프로젝트 열기 → Archive → App Store Connect 업로드

---

## 📘 수업 커리큘럼
1. Cordova 개요 및 환경 설정
2. 기본 프로젝트 생성 및 실행
3. Cordova 프로젝트 구조 이해
4. 플러그인 활용 (카메라, 위치, 파일 시스템 등)
5. UI/UX 개선 및 하이브리드 앱 최적화
6. 빌드 및 배포 실습
7. 팀 프로젝트: 간단한 하이브리드 앱 개발

---

## 📑 참고 자료
- [Apache Cordova 공식 문서](https://cordova.apache.org/)
- [Cordova Plugins 레지스트리](https://cordova.apache.org/plugins/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## ✅ 기대 효과
- **멀티 플랫폼 앱 개발 능력 습득**
- **웹 기술을 활용한 모바일 앱 개발 역량 강화**
- **실무에 적용 가능한 빌드 및 배포 경험**
