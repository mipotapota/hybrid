// 콘서트 데이터 (과거 공연 포함)
const concerts = [
  // === 과거 공연 (2024년 10월~11월) ===
  {
    id: 101,
    title: "2024 DAY6 FOREVER YOUNG",
    artist: "데이식스 (DAY6)",
    ticketOpenDate: "2024년 9월 15일 오후 8시",
    startDate: "2024-10-18",
    endDate: "2024-10-20",
    startTime: "19:00",
    duration: "150분",
    venue: "인스파이어 아레나",
    location: "인천광역시 중구 공항문화로 127",
    ageRating: "만 7세 이상",
    price: "₩132,000 ~ ₩154,000",
    ticketUrl: "https://ticket.interpark.com/",
  },
  {
    id: 102,
    title: "2024 IU HEREH WORLD TOUR CONCERT ENCORE",
    artist: "아이유 (IU)",
    ticketOpenDate: "2024년 8월 20일 오후 8시",
    startDate: "2024-09-21",
    endDate: "2024-09-22",
    startTime: "19:00",
    duration: "180분",
    venue: "서울월드컵경기장",
    location: "서울특별시 마포구 월드컵로 240",
    ageRating: "전체 관람가",
    price: "₩143,000 ~ ₩165,000",
    ticketUrl: "https://ticket.melon.com/",
  },
  {
    id: 103,
    title: "싸이흠뻑쇼 2024",
    artist: "싸이 (PSY)",
    ticketOpenDate: "2024년 6월 10일 오후 8시",
    startDate: "2024-08-02",
    endDate: "2024-08-04",
    startTime: "18:00",
    duration: "150분",
    venue: "잠실종합운동장 주경기장",
    location: "서울특별시 송파구 올림픽로 25",
    ageRating: "만 7세 이상",
    price: "₩99,000 ~ ₩132,000",
    ticketUrl: "https://ticket.interpark.com/",
  },
  {
    id: 104,
    title: "2024 Paul Kim Concert",
    artist: "폴킴 (Paul Kim)",
    ticketOpenDate: "2024년 9월 25일 오후 8시",
    startDate: "2024-11-01",
    endDate: "2024-11-03",
    startTime: "20:00",
    duration: "120분",
    venue: "올림픽공원 올림픽홀",
    location: "서울특별시 송파구 올림픽로 424",
    ageRating: "만 7세 이상",
    price: "₩121,000 ~ ₩143,000",
    ticketUrl: "https://ticket.yes24.com/",
  },
  {
    id: 105,
    title: "2024 10CM CONCERT",
    artist: "10CM (십센치)",
    ticketOpenDate: "2024년 9월 5일 오후 8시",
    startDate: "2024-10-25",
    endDate: "2024-10-27",
    startTime: "19:30",
    duration: "120분",
    venue: "예스24 라이브홀",
    location: "서울특별시 광진구 광나루로 56길 85",
    ageRating: "만 8세 이상",
    price: "₩99,000 ~ ₩110,000",
    ticketUrl: "https://ticket.yes24.com/",
  },
  
  // === 예정 공연 (2025년~) ===
  {
    id: 1,
    title: "2025 성시경 연말 콘서트",
    artist: "성시경",
    ticketOpenDate: "전일17시(월~토 관람 시)까지/전일 11시(일요일 관람 시)까지",
    startDate: "2025-12-25",
    endDate: "2025-12-28",
    startTime: "18:00",
    duration: "120분",
    venue: "KSPO DOME",
    location: "서울특별시 송파구 올림픽로 424 (방이동 88-2) 올림픽공원",
    ageRating: "초등학생이상",
    price: "₩121,000 ~ ₩165,000",
    ticketUrl: "https://ticket.interpark.com/",
  },
  {
    id: 2,
    title: "임영웅 IM HERO TOUR 2025 - 서울",
    artist: "임영웅",
    ticketOpenDate: "관람 4시간 전까지",
    startDate: "2025-11-21",
    endDate: "2025-11-30",
    startTime: "17:00",
    duration: "150분",
    venue: "KSPO DOME",
    location: "서울특별시 송파구 올림픽로 424 (방이동 88-2) 올림픽공원",
    ageRating: "만 7세이상",
    price: "₩154,000 ~ ₩176,000",
    ticketUrl: "https://ticket.interpark.com/",
  },
  {
    id: 3,
    title: "2025 이무진 소극장 콘서트 ［오늘의, eMUtion］",
    artist: "이무진",
    ticketOpenDate: "전일17시(월~토 관람 시)까지/전일 11시(일요일 관람 시)까지",
    startDate: "2025-12-20",
    endDate: "2025-12-25",
    startTime: "18:00",
    duration: "100분",
    venue: "메사홀",
    location: "서울특별시 중구 남대문시장10길 2(회현동1가) 10층",
    ageRating: "8세 이상",
    price: "₩132,000",
    ticketUrl: "https://ticket.melon.com/",
  },
  {
    id: 4,
    title: "2025-26 로이킴 LIVE TOUR ［ja, daumm］ - 서울",
    artist: "로이킴",
    ticketOpenDate: "2025년 11월 18일(화) 7:00PM",
    startDate: "2025-12-12",
    endDate: "2025-12-14",
    startTime: "20:00",
    duration: "120분",
    venue: "티켓링크 라이브 아레나 (올림픽 핸드볼경기장)",
    location: "서울특별시 송파구 올림픽로 424 (방이동 88-2) 올림픽공원",
    ageRating: "만 7세이상",
    price: "₩143,000 ~ ₩154,000",
    ticketUrl: "https://www.ticketlink.co.kr/",
  },
  {
    id: 5,
    title: "백예린 2025 Live 〈wanna see you dance again〉",
    artist: "백예린",
    ticketOpenDate: "전일 23시 59분까지",
    startDate: "2025-11-20",
    endDate: "2025-11-23",
    startTime: "20:00",
    duration: "120분",
    venue: "에스팩토리",
    location: "서울특별시 성동구 연무장15길 11",
    ageRating: "만 11세이상",
    price: "₩110,000",
    ticketUrl: "https://ticket.yes24.com/",
  },
  {
    id: 6,
    title: "tuki. 1ST ASIA TOUR 2026 IN SEOUL",
    artist: "tuki",
    ticketOpenDate: "전일17시(월~토 관람 시)까지/전일 11시(일요일 관람 시)까지",
    startDate: "2026-04-11",
    endDate: "2026-04-12",
    startTime: "19:00",
    duration: "100분",
    venue: "인스파이어 아레나",
    location: "인천광역시 중구 공항문화로 127(운서동)",
    ageRating: "만 8세이상",
    price: "₩143,000 ~ ₩154,000",
    ticketUrl: "https://ticket.interpark.com/",
  },
  {
    id: 7,
    title: "2025 카즈미 타테이시 트리오 내한공연-지브리, 재즈를 만나다 - 부산",
    artist: "카즈미 타테이시 트리오",
    ticketOpenDate: "전일17시(월~토 관람 시)까지/전일 11시(일요일 관람 시)까지",
    startDate: "2025-12-24",
    endDate: "2025-12-24",
    startTime: "19:30",
    duration: "100분",
    venue: "금정문화회관 금빛누리홀",
    location: "부산광역시 금정구 구서1동 481",
    ageRating: "만 7세이상",
    price: "₩44,000 ~ ₩77,000",
    ticketUrl: "https://ticket.interpark.com/",
  },
  {
    id: 8,
    title: "2025 카즈미 타테이시 트리오 내한공연-크리스마스, 재즈를 만나다-",
    artist: "카즈미 타테이시 트리오",
    ticketOpenDate: "전일17시(월~토 관람 시)까지/전일 11시(일요일 관람 시)까지",
    startDate: "2025-12-14",
    endDate: "2025-12-14",
    startTime: "15:00",
    duration: "100분",
    venue: "성남아트센터 콘서트홀",
    location: "경기도 성남시 분당구 성남대로 808(야탑동) , 성남아트센터",
    ageRating: "만 7세이상",
    ticketUrl: "https://ticket.interpark.com/",
    price: "₩44,000 ~ ₩77,000",
  },
  {
    id: 9,
    title: "2026 다비치 콘서트 〈TIME CAPSULE : 시간을 잇다〉",
    artist: "다비치",
    ticketOpenDate: "관람일 11시까지",
    startDate: "2026-01-24",
    endDate: "2026-01-25",
    startTime: "18:00",
    duration: "120분",
    venue: "올림픽공원 KSPO DOME",
    location: "서울특별시 송파구 올림픽로 424 (방이동 88-2) 올림픽공원",
    ageRating: "만 8세이상",
    price: "₩143,000 ~ ₩165,000",
    ticketUrl: "https://ticket.melon.com/",
  },
  {
    id: 10,
    title: "2025 이문세 ‘The Best’",
    artist: "이문세",
    ticketOpenDate: "관람 3시간 전까지",
    startDate: "2025-12-13",
    endDate: "2025-12-14",
    startTime: "18:00",
    duration: "120분",
    venue: "KSPO DOME",
    location: "서울특별시 송파구 올림픽로 424(방이동) KSPO DOME(체조경기장)",
    ageRating: "만 7세이상",
    price: "₩132,000 ~ ₩176,000",
    ticketUrl: "https://ticket.interpark.com/",
  },
  {
    id: 11,
    title: "2025 다이나믹 듀오 단독 콘서트 “가끔씩 오래 보자” - 서울",
    artist: "다이나믹 듀오",
    ticketOpenDate: "전일17시(월~토 관람 시)까지/전일 11시(일요일 관람 시)까지",
    startDate: "2026-01-23",
    endDate: "2026-01-25",
    startTime: "20:00",
    duration: "120분",
    venue: "장충체육관",
    location: "서울특별시 중구 동호로 241(장충동2가)",
    ageRating: "만 7세이상",
    price: "₩132,000",
    ticketUrl: "https://ticket.yes24.com/",
  },
  {
    id: 12,
    title: "2025 SEO EUNKWANG CONCERT 〈My Page〉 in Seoul",
    artist: "서은광",
    ticketOpenDate: "관람 5시간 전까지",
    startDate: "2025-12-20",
    endDate: "2025-12-21",
    startTime: "18:00",
    duration: "120분",
    venue: "블루스퀘어 SOL트래블홀",
    location: "서울특별시 용산구 이태원로 294 블루스퀘어(한남동)",
    ageRating: "만 8세이상",
    price: "₩143,000 ~ ₩165,000",
    ticketUrl: "https://ticket.interpark.com/",
  },
];

// 로컬 스토리지 키
const STORAGE_KEY = "concert-notifications";
const CUSTOM_ALERTS_KEY = "concert-custom-alerts";

// 알림 상태 불러오기
function getNotificationStates() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // 기본값: 모든 알림 OFF
  const defaultStates = {};
  concerts.forEach((concert) => {
    defaultStates[concert.id] = false;
  });
  return defaultStates;
}

// 알림 상태 저장하기
function saveNotificationState(concertId, isEnabled) {
  const states = getNotificationStates();
  states[concertId] = isEnabled;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
}

// 커스텀 알림 가져오기
function getCustomAlerts(concertId) {
  const stored = localStorage.getItem(CUSTOM_ALERTS_KEY);
  const allAlerts = stored ? JSON.parse(stored) : {};
  return allAlerts[concertId] || [];
}

// 모든 커스텀 알림 가져오기
function getAllCustomAlerts() {
  const stored = localStorage.getItem(CUSTOM_ALERTS_KEY);
  return stored ? JSON.parse(stored) : {};
}

// 🔥 네이티브 알림 예약
function scheduleNativeNotification(notificationId, alertTime, concertTitle) {
  // Cordova 환경 체크
  if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.notification && cordova.plugins.notification.local) {
    
    cordova.plugins.notification.local.schedule({
      id: notificationId,
      title: '🎵 콘서트 알림',
      text: `${concertTitle} 공연이 곧 시작됩니다!`,
      trigger: { at: new Date(alertTime) },
      sound: 'default',
      vibrate: true,
      led: { color: '#6366f1', on: 500, off: 500 },
      smallIcon: 'res://icon',
      data: { concertTitle: concertTitle }
    });
    
    console.log('네이티브 알림 예약 완료:', notificationId, alertTime);
  } else {
    console.log('네이티브 플러그인 없음 - PWA 모드');
  }
}

// 🔥 네이티브 알림 취소
function cancelNativeNotification(notificationId) {
  if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.notification && cordova.plugins.notification.local) {
    cordova.plugins.notification.local.cancel(notificationId, function() {
      console.log('네이티브 알림 취소:', notificationId);
    });
  }
}

// 커스텀 알림 추가
function addCustomAlert(concertId, alertTime, concertTitle, silent = false) {
  const allAlerts = getAllCustomAlerts();
  if (!allAlerts[concertId]) {
    allAlerts[concertId] = [];
  }
  
  // 고유 ID 생성 (타임스탬프 + 랜덤)
  const notificationId = Date.now() + Math.floor(Math.random() * 1000);
  
  allAlerts[concertId].push({
    id: notificationId,
    alertTime: alertTime,
    concertTitle: concertTitle,
    notified: false
  });
  
  localStorage.setItem(CUSTOM_ALERTS_KEY, JSON.stringify(allAlerts));
  
  // 🔥 네이티브 알림 예약
  scheduleNativeNotification(notificationId, alertTime, concertTitle);
  
  if (!silent) {
    alert('알림이 추가되었습니다!');
  }
}

// 커스텀 알림 삭제
function deleteCustomAlert(concertId, index) {
  const allAlerts = getAllCustomAlerts();
  if (allAlerts[concertId]) {
    const alertToDelete = allAlerts[concertId][index];
    
    // 🔥 네이티브 알림 취소
    if (alertToDelete && alertToDelete.id) {
      cancelNativeNotification(alertToDelete.id);
    }
    
    allAlerts[concertId].splice(index, 1);
    if (allAlerts[concertId].length === 0) {
      delete allAlerts[concertId];
    }
    localStorage.setItem(CUSTOM_ALERTS_KEY, JSON.stringify(allAlerts));
  }
}

// 콘서트의 모든 알림 삭제
function deleteAllCustomAlerts(concertId) {
  const allAlerts = getAllCustomAlerts();
  if (allAlerts[concertId]) {
    
    // 🔥 모든 네이티브 알림 취소
    allAlerts[concertId].forEach(alert => {
      if (alert.id) {
        cancelNativeNotification(alert.id);
      }
    });
    
    delete allAlerts[concertId];
    localStorage.setItem(CUSTOM_ALERTS_KEY, JSON.stringify(allAlerts));
  }
}

// 알림 시간 포맷팅
function formatAlertTime(alertTime) {
  const date = new Date(alertTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 알림 시간 짧은 포맷팅 (카드용)
function formatAlertTimeShort(alertTime) {
  const date = new Date(alertTime);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}.${day} ${hours}:${minutes}`;
}

// 다음 알림 찾기
function getNextAlert(alerts) {
  const now = new Date();
  const futureAlerts = alerts
    .filter(alert => new Date(alert.alertTime) > now)
    .sort((a, b) => new Date(a.alertTime) - new Date(b.alertTime));
  
  return futureAlerts.length > 0 ? futureAlerts[0].alertTime : null;
}

// 알림 체크 및 발송
function checkAndSendAlerts() {
  const allAlerts = getAllCustomAlerts();
  const now = new Date();
  let hasChanges = false;
  
  Object.keys(allAlerts).forEach(concertId => {
    allAlerts[concertId].forEach((alert, index) => {
      if (!alert.notified) {
        const alertDate = new Date(alert.alertTime);
        
        // 알림 시간이 지났는지 확인 (1분 이내)
        const timeDiff = now - alertDate;
        if (timeDiff >= 0 && timeDiff < 60000) {
          // 브라우저 알림 보내기
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("🎵 콘서트 알림", {
              body: `${alert.concertTitle}\n설정하신 알림 시간입니다!`,
              icon: "icon-192.png",
              badge: "icon-192.png",
              vibrate: [200, 100, 200],
              tag: `concert-${concertId}-${index}`
            });
          }
          
          // 알림 발송 완료 표시
          allAlerts[concertId][index].notified = true;
          hasChanges = true;
        }
      }
    });
  });
  
  // 변경사항이 있으면 저장
  if (hasChanges) {
    localStorage.setItem(CUSTOM_ALERTS_KEY, JSON.stringify(allAlerts));
  }
}

// 날짜가 지났는지 확인 (범위 날짜의 경우 endDate 기준)
function isPastDate(startDate, endDate, startTime) {
  const concertEndDateTime = new Date(`${endDate}T${startTime}`);
  const now = new Date();
  return concertEndDateTime < now;
}

// 날짜 포맷팅
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];
  return `${year}.${month}.${day} (${dayName})`;
}

// 날짜 범위 포맷팅 (단일 날짜 또는 범위 날짜)
function formatDateRange(startDate, endDate) {
  if (startDate === endDate) {
    // 단일 날짜
    return formatDate(startDate);
  } else {
    // 범위 날짜
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  }
}

// 콘서트 카드 생성
function createConcertCard(concert) {
  const isPast = isPastDate(
    concert.startDate,
    concert.endDate,
    concert.startTime
  );
  const notificationStates = getNotificationStates();
  const isNotificationOn = notificationStates[concert.id];
  
  // 설정된 알림 정보
  const customAlerts = getCustomAlerts(concert.id);
  const alertCount = customAlerts.length;
  const nextAlert = customAlerts.length > 0 ? getNextAlert(customAlerts) : null;

  const card = document.createElement("div");
  card.className = `concert-card ${isPast ? "past" : ""}`;
  card.innerHTML = `
        <div class="concert-header">
            <h2 class="concert-title">${concert.title}</h2>
        </div>
        <div class="concert-artist">${concert.artist}</div>
        <div class="concert-info">
            <div class="info-item">
                <span class="info-icon">📅</span>
                <span>${formatDateRange(
                  concert.startDate,
                  concert.endDate
                )}</span>
            </div>
            <div class="info-item">
                <span class="info-icon">📍</span>
                <span>${concert.venue}</span>
            </div>
            ${isNotificationOn && alertCount > 0 ? `
            <div class="info-item alert-info">
                <span class="info-icon">🔔</span>
                <span class="alert-count">${alertCount}개 알림 설정 ${nextAlert ? `· 다음: ${formatAlertTimeShort(nextAlert)}` : ''}</span>
            </div>
            ` : ''}
        </div>
        <div class="concert-footer">
            <div class="footer-left">
                <span class="view-details" data-id="${concert.id}">상세정보 →</span>
                ${isNotificationOn && !isPast ? `<button class="view-alerts-btn" data-concert-id="${concert.id}">🔔 알림 확인</button>` : ''}
            </div>
            <div class="notification-toggle">
                <span class="toggle-label">${isPast ? "종료" : "알림"}</span>
                <label class="switch">
                    <input type="checkbox" 
                           data-id="${concert.id}" 
                           ${isNotificationOn ? "checked" : ""} 
                           ${isPast ? "disabled" : ""}>
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    `;

  // 상세정보 클릭 이벤트
  const detailsBtn = card.querySelector(".view-details");
  detailsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showModal(concert);
  });

  // 알림 확인 버튼 이벤트
  const viewAlertsBtn = card.querySelector('.view-alerts-btn');
  if (viewAlertsBtn) {
    viewAlertsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showAlertModal(concert);
    });
  }

  // 알림 토글 이벤트
  const toggleInput = card.querySelector('input[type="checkbox"]');
  toggleInput.addEventListener("change", (e) => {
    e.stopPropagation();
    const isEnabled = e.target.checked;
    
    if (isEnabled) {
      // 알림 켜기: 모달만 열기 (자동 알림 추가 X)
      saveNotificationState(concert.id, true);
      showAlertModal(concert);
    } else {
      // 알림 끄기: 모든 알림 삭제
      deleteAllCustomAlerts(concert.id);
      saveNotificationState(concert.id, false);
      alert('알림이 해제되었습니다.');
      renderConcerts();
    }
  });

  return card;
}

// 모달 표시
function showModal(concert) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const isPast = isPastDate(
    concert.startDate,
    concert.endDate,
    concert.startTime
  );

  modalBody.innerHTML = `
        <h2 class="modal-title">${concert.title}</h2>
        <div class="modal-artist">${concert.artist}</div>
        ${concert.ticketUrl ? `
        <div class="ticket-link-container">
            <a href="${concert.ticketUrl}" target="_blank" rel="noopener noreferrer" class="ticket-link">
                🎫 티켓 구매하기
            </a>
        </div>
        ` : ''}
        <div class="modal-details">
            <div class="detail-item">
                <span class="detail-icon">📅</span>
                <div class="detail-content">
                    <div class="detail-label">공연기간</div>
                    <div class="detail-value">${formatDateRange(
                      concert.startDate,
                      concert.endDate
                    )}</div>
                </div>
            </div>
            <div class="detail-item">
                <span class="detail-icon">📍</span>
                <div class="detail-content">
                    <div class="detail-label">공연장</div>
                    <div class="detail-value">${concert.venue}<br>${
    concert.location
  }</div>
                </div>
            </div>
            <div class="detail-item">
                <span class="detail-icon">🕐</span>
                <div class="detail-content">
                    <div class="detail-label">공연 시작 시간</div>
                    <div class="detail-value">${concert.startTime}</div>
                </div>
            </div>
            <div class="detail-item">
                <span class="detail-icon">⏱️</span>
                <div class="detail-content">
                    <div class="detail-label">공연 시간</div>
                    <div class="detail-value">${concert.duration}</div>
                </div>
            </div>
            <div class="detail-item">
                <span class="detail-icon">🎟️</span>
                <div class="detail-content">
                    <div class="detail-label">예매 가능 시간</div>
                    <div class="detail-value">${concert.ticketOpenDate}</div>
                </div>
            </div>
            <div class="detail-item">
                <span class="detail-icon">💰</span>
                <div class="detail-content">
                    <div class="detail-label">티켓 가격</div>
                    <div class="detail-value">${concert.price}</div>
                </div>
            </div>
            <div class="detail-item">
                <span class="detail-icon">👥</span>
                <div class="detail-content">
                    <div class="detail-label">관람연령</div>
                    <div class="detail-value">${concert.ageRating}</div>
                </div>
            </div>
            ${
              isPast
                ? '<div class="detail-item" style="color: var(--text-disabled);"><span class="detail-icon">⏰</span><div class="detail-content"><div class="detail-value">이 공연은 종료되었습니다.</div></div></div>'
                : ""
            }
        </div>
    `;

  modal.classList.add("active");
}

// 모달 닫기
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
}

// 알림 설정 모달 표시
function showAlertModal(concert) {
  const alertModal = document.getElementById("alert-modal");
  const alertModalBody = document.getElementById("alert-modal-body");
  
  // 저장된 알림 가져오기
  const customAlerts = getCustomAlerts(concert.id);
  const alertsHTML = customAlerts.length > 0 
    ? customAlerts.map((alert, index) => `
        <div class="custom-alert-item">
          <span>📅 ${formatAlertTime(alert.alertTime)}</span>
          <button class="delete-alert-btn" data-concert-id="${concert.id}" data-index="${index}">삭제</button>
        </div>
      `).join('')
    : '<p class="no-alerts">설정된 알림이 없습니다</p>';

  // 알림 설정 가능한 최대 날짜 계산 (콘서트 끝나는 날 23:59)
  const concertEndDate = new Date(concert.endDate);
  const maxAlertDate = new Date(concertEndDate);
  maxAlertDate.setHours(23, 59);
  const maxDateString = maxAlertDate.toISOString().slice(0, 16);
  
  // 현재 시간
  const now = new Date();
  const minDateString = now.toISOString().slice(0, 16);

  alertModalBody.innerHTML = `
        <div class="alert-modal-header">
          <h2 class="modal-title">🔔 알림 설정</h2>
          <p class="concert-name">${concert.title} - ${concert.artist}</p>
        </div>
        <div class="alert-modal-content-body">
            <div class="alert-section">
                <h3 class="section-title">설정된 알림</h3>
                <div class="custom-alerts-list">
                    ${alertsHTML}
                </div>
            </div>
            
            <div class="alert-section">
                <h3 class="section-title">새 알림 추가</h3>
                <div class="alert-input-group">
                    <input 
                      type="datetime-local" 
                      id="alert-datetime" 
                      class="alert-datetime-input"
                      min="${minDateString}"
                      max="${maxDateString}"
                    >
                    <button class="add-alert-btn" data-concert-id="${concert.id}">알림 추가</button>
                </div>
                <p class="alert-help-text">💡 콘서트 끝나는 날(${formatDate(concert.endDate)})까지 설정 가능</p>
            </div>
        </div>
    `;

  // 알림 추가 버튼 이벤트
  const addAlertBtn = alertModalBody.querySelector('.add-alert-btn');
  addAlertBtn.addEventListener('click', () => {
    const datetimeInput = alertModalBody.querySelector('#alert-datetime');
    const alertTime = datetimeInput.value;
    
    if (!alertTime) {
      alert('알림 날짜와 시간을 선택해주세요.');
      return;
    }
    
    const alertDate = new Date(alertTime);
    const now = new Date();
    
    if (alertDate <= now) {
      alert('미래 시간을 선택해주세요.');
      return;
    }
    
    // 콘서트 끝나는 날까지만 가능
    if (alertDate > maxAlertDate) {
      alert(`알림은 콘서트 끝나는 날(${formatDate(concert.endDate)})까지만 설정 가능합니다.`);
      return;
    }
    
    addCustomAlert(concert.id, alertTime, concert.title);
    showAlertModal(concert); // 모달 새로고침
    renderConcerts(); // 메인 카드 새로고침
  });
  
  // 알림 삭제 버튼 이벤트
  const deleteButtons = alertModalBody.querySelectorAll('.delete-alert-btn');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const concertId = parseInt(e.target.dataset.concertId);
      const index = parseInt(e.target.dataset.index);
      deleteCustomAlert(concertId, index);
      showAlertModal(concert); // 모달 새로고침
      renderConcerts(); // 메인 카드 새로고침
    });
  });

  alertModal.classList.add("active");
}

// 알림 모달 닫기
function closeAlertModal() {
  const alertModal = document.getElementById("alert-modal");
  alertModal.classList.remove("active");
  
  // 모든 콘서트 체크: 알림이 하나도 없는데 ON 상태면 OFF로 변경
  concerts.forEach(concert => {
    const notificationStates = getNotificationStates();
    const customAlerts = getCustomAlerts(concert.id);
    
    if (notificationStates[concert.id] && customAlerts.length === 0) {
      // 알림 ON인데 설정된 알림이 없으면 OFF로
      saveNotificationState(concert.id, false);
    }
  });
  
  // 카드 새로고침
  renderConcerts();
}

// 알림 표시 (시뮬레이션)
function showNotification(concert, isEnabled) {
  if ("Notification" in window && Notification.permission === "granted") {
    if (isEnabled) {
      new Notification("알림 설정됨", {
        body: `${concert.title}의 알림이 활성화되었습니다.`,
        icon: "icon-192.png",
      });
    }
  }
}

// 알림 권한 요청
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

// 콘서트 목록 렌더링
function renderConcerts(searchQuery = '') {
  const concertList = document.getElementById("concert-list");
  concertList.innerHTML = "";

  // 콘서트를 날짜순으로 정렬 (가까운 날짜가 먼저)
  let sortedConcerts = [...concerts].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateA - dateB;
  });

  // 검색 필터링
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    sortedConcerts = sortedConcerts.filter(concert => 
      concert.title.toLowerCase().includes(query) ||
      concert.artist.toLowerCase().includes(query) ||
      concert.venue.toLowerCase().includes(query) ||
      concert.location.toLowerCase().includes(query)
    );
  }

  // 검색 결과가 없을 때
  if (sortedConcerts.length === 0) {
    concertList.innerHTML = `
      <div class="no-results">
        <p>😢 검색 결과가 없습니다.</p>
        <p class="no-results-sub">다른 키워드로 검색해보세요.</p>
      </div>
    `;
    return;
  }

  sortedConcerts.forEach((concert) => {
    const card = createConcertCard(concert);
    concertList.appendChild(card);
  });
}

// 검색 기능
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    // 클리어 버튼 표시/숨김
    if (query) {
      searchClear.classList.remove('hidden');
    } else {
      searchClear.classList.add('hidden');
    }
    
    // 검색 실행
    renderConcerts(query);
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.classList.add('hidden');
    renderConcerts();
    searchInput.focus();
  });
}

// PWA 설치 프롬프트
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // 이미 설치 프롬프트를 무시했는지 확인
  const dismissed = localStorage.getItem("install-prompt-dismissed");
  if (!dismissed) {
    const installPrompt = document.getElementById("install-prompt");
    installPrompt.classList.remove("hidden");
  }
});

document
  .getElementById("install-button")
  ?.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      deferredPrompt = null;
    }
    document.getElementById("install-prompt").classList.add("hidden");
  });

document.getElementById("install-dismiss")?.addEventListener("click", () => {
  document.getElementById("install-prompt").classList.add("hidden");
  localStorage.setItem("install-prompt-dismissed", "true");
});

// 모달 이벤트 리스너
document.getElementById("modal-close")?.addEventListener("click", closeModal);
document.getElementById("modal")?.addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    closeModal();
  }
});

// 알림 모달 이벤트 리스너
document.getElementById("alert-modal-close")?.addEventListener("click", closeAlertModal);
document.getElementById("alert-modal")?.addEventListener("click", (e) => {
  if (e.target.id === "alert-modal") {
    closeAlertModal();
  }
});

// 서비스 워커 등록
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

// 초기화
// 🔥 네이티브 알림 복원 (앱 재시작 시)
function restoreNativeNotifications() {
  const allAlerts = getAllCustomAlerts();
  let restoredCount = 0;
  
  Object.keys(allAlerts).forEach(concertId => {
    allAlerts[concertId].forEach(alert => {
      const alertTime = new Date(alert.alertTime);
      const now = new Date();
      
      // 미래 알림만 복원
      if (alertTime > now && alert.id) {
        scheduleNativeNotification(alert.id, alert.alertTime, alert.concertTitle);
        restoredCount++;
      }
    });
  });
  
  console.log(`${restoredCount}개의 알림 복원 완료`);
}

// 🔥 Cordova deviceready 이벤트
document.addEventListener('deviceready', function() {
  console.log('✅ Cordova 준비 완료!');
  
  // 네이티브 알림 권한 확인
  if (cordova.plugins && cordova.plugins.notification && cordova.plugins.notification.local) {
    cordova.plugins.notification.local.hasPermission(function(granted) {
      console.log('알림 권한:', granted);
      if (!granted) {
        cordova.plugins.notification.local.requestPermission(function(granted) {
          console.log('알림 권한 요청 결과:', granted);
        });
      }
    });
    
    // 저장된 알림 복원
    restoreNativeNotifications();
    
    // 알림 클릭 이벤트
    cordova.plugins.notification.local.on('click', function(notification) {
      console.log('알림 클릭:', notification);
      // 앱 포그라운드로 가져오기
    });
  }
}, false);

// DOM 로드 완료
document.addEventListener("DOMContentLoaded", () => {
  renderConcerts();
  requestNotificationPermission();
  initSearch(); // 검색 기능 초기화
  
  // PWA 환경을 위한 알림 체크 (30초마다)
  // 네이티브 앱에서는 시스템이 알림 관리
  setInterval(checkAndSendAlerts, 30000);
  checkAndSendAlerts();
});

