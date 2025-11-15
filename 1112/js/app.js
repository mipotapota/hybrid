// ============================================
// MoveON 메인 앱 로직
// ============================================

let currentPage = 'home';
let isFavoriteMode = false; // 즐겨찾기 모드 플래그

// ==================== 초기화 ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 MoveON 앱 시작!');
    
    // 다크모드 설정 복원 (즉시 적용)
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        console.log('🌙 다크 모드 복원');
    }
    
    // 스플래시 화면 즉시 넘김
    document.getElementById('splash-screen').style.display = 'none';
    
    // 홈 페이지 데이터 로드
    loadPageData('home');
    
    // 네비게이션 버튼 이벤트
    setupNavigation();
    
    // 설정 토글 이벤트
    setupSettings();
    
    // 시설 검색 이벤트
    setupFacilitySearch();
});

// ==================== 네비게이션 설정 ====================
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-page');
            switchPage(page);
        });
    });
}

function switchPage(pageName) {
    // 모든 페이지 숨기기
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 모든 네비게이션 버튼 비활성화
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 선택한 페이지 표시
    document.getElementById(`${pageName}-page`).classList.add('active');
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    
    currentPage = pageName;
    
    // 페이지별 데이터 로드
    // 단, 즐겨찾기 모드로 시설 페이지 전환 시에는 자동 로드 안 함
    if (pageName === 'facility' && isFavoriteMode) {
        // showFavorites에서 직접 처리하므로 여기선 아무것도 안 함
        return;
    } else if (pageName !== 'facility') {
        isFavoriteMode = false; // 다른 페이지로 가면 모드 해제
    }
    
    loadPageData(pageName);
}

// ==================== 페이지별 데이터 로드 ====================
function loadPageData(pageName) {
    switch(pageName) {
        case 'home':
            loadTodayWorkout();
            loadWorkoutStats();
            break;
        case 'record':
            loadWorkoutRecords();
            break;
        case 'facility':
            loadFacilities();
            break;
        case 'profile':
            loadUserData();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// ==================== 홈 페이지: 오늘의 운동 로드 ====================
async function loadTodayWorkout() {
    try {
        let userData = null;
        let isCompleted = false;
        const today = new Date().toISOString().split('T')[0];
        
        // 로그인 상태면 사용자 데이터 가져오기
        if (currentUser) {
            const userDoc = await db.collection('users').doc(currentUser.uid).get();
            userData = userDoc.data();
            
            // 오늘 이미 완료했는지 Firebase에서 확인
            const workout = getTodayWorkout(userData);
            const todayWorkout = await db.collection('workouts')
                .where('userId', '==', currentUser.uid)
                .where('date', '==', today)
                .where('workoutId', '==', workout.id)
                .get();
            
            isCompleted = !todayWorkout.empty;
        } else {
            // 로그인 안 한 경우 localStorage에서 확인
            const completedDate = localStorage.getItem('lastCompletedWorkout');
            isCompleted = completedDate === today;
        }
        
        // 오늘의 추천 운동 가져오기 (로그인 없어도 가능)
        const workout = getTodayWorkout(userData);
        
        // UI 업데이트
        const container = document.getElementById('today-workout');
        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                <div>
                    <h3>${workout.name}</h3>
                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                        <span style="background: rgba(255,255,255,0.3); padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                            ${workout.type}
                        </span>
                        <span style="background: rgba(255,255,255,0.3); padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                            ${workout.difficulty}
                        </span>
                    </div>
                </div>
                <div style="font-size: 40px;">
                    ${workout.type === '근력' ? '💪' : workout.type === '유산소' ? '🏃' : '🧘'}
                </div>
            </div>
            
            <div class="workout-meta">
                <div class="workout-meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${workout.duration}분</span>
                </div>
                <div class="workout-meta-item">
                    <i class="fas fa-redo"></i>
                    <span>${workout.sets}세트</span>
                </div>
                <div class="workout-meta-item">
                    <i class="fas fa-fire"></i>
                    <span>${workout.calories} kcal</span>
                </div>
            </div>
            
            <p style="margin: 16px 0; opacity: 0.9;">${workout.description}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 16px 0; font-size: 14px;">
                <div>
                    <strong>목표 근육:</strong> ${workout.targetMuscle}
                </div>
                <div>
                    <strong>준비물:</strong> ${workout.equipment}
                </div>
            </div>
            
            <button class="workout-complete-btn" onclick="completeWorkout(${JSON.stringify(workout).replace(/"/g, '&quot;')})" ${isCompleted ? 'disabled' : ''}>
                ${isCompleted ? '✅ 오늘 완료함' : '✓ 운동 완료 체크'}
            </button>
        `;
        
        if (isCompleted) {
            container.querySelector('.workout-complete-btn').style.opacity = '0.6';
            container.querySelector('.workout-complete-btn').style.cursor = 'not-allowed';
        }
        
    } catch (error) {
        console.error('❌ 오늘의 운동 로드 오류:', error);
        document.getElementById('today-workout').innerHTML = `
            <p style="color: white; text-align: center;">운동을 불러오는 중 오류가 발생했습니다.</p>
        `;
    }
}

// ==================== 운동 기록 페이지 ====================
async function loadWorkoutRecords() {
    if (!currentUser) return;
    
    try {
        // 이번 달 시작일
        const monthStart = new Date();
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);
        
        // 모든 운동 기록 조회 (인덱스 불필요)
        const records = await db.collection('workouts')
            .where('userId', '==', currentUser.uid)
            .get();
        
        // 클라이언트 측에서 이번 달 필터링 및 정렬
        const monthRecords = [];
        records.forEach(doc => {
            const data = doc.data();
            const completedAt = data.completedAt?.toDate();
            
            if (completedAt && completedAt >= monthStart) {
                monthRecords.push({
                    id: doc.id,
                    ...data,
                    completedAt: completedAt
                });
            }
        });
        
        // 최신순 정렬
        monthRecords.sort((a, b) => b.completedAt - a.completedAt);
        
        // 달력 표시
        displayCalendar(monthRecords);
        
        // 달성률 계산
        const totalDays = new Date().getDate();
        const workoutDays = new Set(monthRecords.map(r => r.date)).size;
        const achievementRate = Math.round((workoutDays / totalDays) * 100);
        
        document.getElementById('month-progress').innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 48px; font-weight: 800; color: var(--primary-color);">
                    ${achievementRate}%
                </div>
                <div style="color: var(--gray-500); margin-top: 8px;">
                    ${workoutDays}일 / ${totalDays}일 운동 완료
                </div>
            </div>
        `;
        
        // 기록 리스트 표시
        displayRecordList(monthRecords);
        
    } catch (error) {
        console.error('❌ 기록 로드 오류:', error);
    }
}

function displayCalendar(records) {
    const container = document.getElementById('calendar-container');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // 이번 달의 첫날과 마지막 날
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    // 운동한 날짜들
    const workoutDates = new Set(records.map(r => {
        const date = r.date;
        return parseInt(date.split('-')[2]);
    }));
    
    let calendarHTML = `
        <div class="calendar-container">
            <h3 class="calendar-header">
                ${year}년 ${month + 1}월
            </h3>
            <div class="calendar-grid">
                <div class="calendar-weekday" style="color: #EF4444;">일</div>
                <div class="calendar-weekday">월</div>
                <div class="calendar-weekday">화</div>
                <div class="calendar-weekday">수</div>
                <div class="calendar-weekday">목</div>
                <div class="calendar-weekday">금</div>
                <div class="calendar-weekday" style="color: #3B82F6;">토</div>
    `;
    
    // 빈 칸 채우기
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div></div>';
    }
    
    // 날짜 채우기
    for (let date = 1; date <= lastDate; date++) {
        const isToday = date === today.getDate();
        const hasWorkout = workoutDates.has(date);
        
        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' today';
        if (hasWorkout) dayClass += ' has-workout';
        
        // 날짜 클릭 가능하게 만들기
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        
        calendarHTML += `
            <div class="${dayClass}" onclick="showDayWorkouts('${dateStr}')" style="cursor: pointer;">
                ${date}
                ${hasWorkout ? '<div class="workout-dot"></div>' : ''}
            </div>
        `;
    }
    
    calendarHTML += '</div></div>';
    container.innerHTML = calendarHTML;
}

// 선택한 날짜의 운동 기록 표시
async function showDayWorkouts(dateStr) {
    if (!currentUser) return;
    
    try {
        console.log('📅 선택한 날짜:', dateStr);
        
        // 해당 날짜의 운동 기록 가져오기
        const dayWorkouts = await db.collection('workouts')
            .where('userId', '==', currentUser.uid)
            .where('date', '==', dateStr)
            .get();
        
        const records = [];
        dayWorkouts.forEach(doc => {
            const data = doc.data();
            records.push({
                id: doc.id,
                ...data,
                completedAt: data.completedAt?.toDate()
            });
        });
        
        // 날짜 포맷팅
        const [year, month, day] = dateStr.split('-');
        const displayDate = `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
        
        // 기록 리스트 업데이트
        const container = document.getElementById('record-list');
        
        if (records.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--gray-400);">
                    <i class="fas fa-calendar-times" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <p><strong>${displayDate}</strong></p>
                    <p style="margin-top: 8px;">이 날은 운동 기록이 없습니다</p>
                    <button onclick="loadWorkoutRecords()" style="margin-top: 16px; padding: 8px 16px; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">
                        전체 기록 보기
                    </button>
                </div>
            `;
            return;
        }
        
        // 시간순 정렬
        records.sort((a, b) => b.completedAt - a.completedAt);
        
        let listHTML = `
            <div style="margin-bottom: 20px; padding: 16px; background: var(--primary-color); color: white; border-radius: 12px; text-align: center;">
                <h3 style="margin: 0;">${displayDate}</h3>
                <p style="margin: 8px 0 0 0; opacity: 0.9;">총 ${records.length}회 운동</p>
            </div>
        `;
        
        records.forEach(record => {
            const time = record.completedAt.toLocaleTimeString('ko-KR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            listHTML += `
                <div class="record-item">
                    <div class="record-icon">
                        ${record.type === '근력' ? '💪' : record.type === '유산소' ? '🏃' : '🧘'}
                    </div>
                    <div class="record-info">
                        <h4>${record.workoutName}</h4>
                        <div class="record-meta">
                            <span><i class="fas fa-tag"></i> ${record.type}</span>
                            <span><i class="fas fa-clock"></i> ${record.duration}분</span>
                            <span><i class="fas fa-fire"></i> ${record.calories} kcal</span>
                        </div>
                        <div style="color: var(--gray-500); font-size: 12px; margin-top: 4px;">
                            <i class="fas fa-clock"></i> ${time}
                        </div>
                    </div>
                </div>
            `;
        });
        
        listHTML += `
            <button onclick="loadWorkoutRecords()" style="width: 100%; margin-top: 16px; padding: 12px; background: var(--gray-100); color: var(--secondary-color); border: none; border-radius: 12px; cursor: pointer; font-weight: 600;">
                <i class="fas fa-list"></i> 전체 기록 보기
            </button>
        `;
        
        container.innerHTML = listHTML;
        
    } catch (error) {
        console.error('❌ 날짜별 기록 조회 오류:', error);
    }
}

function displayRecordList(records) {
    const container = document.getElementById('record-list');
    
    if (records.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray-400);">
                <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px;"></i>
                <p>아직 운동 기록이 없습니다.</p>
            </div>
        `;
        return;
    }
    
    let listHTML = '<div class="record-container">';
    listHTML += '<h3 class="record-header">최근 운동 기록</h3>';
    
    records.slice(0, 10).forEach((data, index) => {
        const date = new Date(data.completedAt);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        
        const isLast = index === records.slice(0, 10).length - 1;
        
        listHTML += `
            <div class="record-item ${isLast ? 'last' : ''}">
                <div class="record-info">
                    <strong class="record-name">${data.workoutName}</strong>
                    <div class="record-meta">
                        ${data.type} · ${data.duration}분 · ${data.calories}kcal
                    </div>
                </div>
                <div class="record-date">
                    ${dateStr}
                </div>
            </div>
        `;
    });
    
    listHTML += '</div>';
    container.innerHTML = listHTML;
}

// ==================== 시설 페이지 ====================
async function loadFacilities() {
    // 검색 바 보이기 & 제목 복원 (일반 모드)
    const searchBar = document.getElementById('facility-search-bar');
    const pageTitle = document.getElementById('facility-page-title');
    if (searchBar) searchBar.style.display = 'flex';
    if (pageTitle) pageTitle.textContent = '주변 운동 시설';
    
    const container = document.getElementById('facility-list');
    
    // 로딩 표시
    container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--gray-400);">
            <div class="loading-spinner" style="margin: 0 auto 16px;"></div>
            <p>공공데이터를 불러오는 중...</p>
        </div>
    `;
    
    try {
        // 실제 공공데이터 API 호출!
        const facilities = await fetchPublicFacilities('서울특별시', 1, 20);
        
        // 즐겨찾기 상태 복원 (Firebase에서)
        if (currentUser) {
            const favorites = await db.collection('favorites')
                .where('userId', '==', currentUser.uid)
                .get();
            
            const favoriteIds = favorites.docs.map(doc => doc.data().facilityId);
            facilities.forEach(f => {
                f.isFavorite = favoriteIds.includes(f.id);
            });
        }
        
        displayFacilities(facilities);
        
    } catch (error) {
        console.error('❌ 시설 로드 오류:', error);
        // 오류 시 샘플 데이터 사용
        displayFacilities(sampleFacilities);
    }
}

function displayFacilities(facilities) {
    const container = document.getElementById('facility-list');
    
    // 전체 시설 데이터 저장 (필터링용)
    allFacilitiesData = facilities;
    
    if (facilities.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray-400);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px;"></i>
                <p>검색 결과가 없습니다.</p>
            </div>
        `;
        return;
    }
    
    // 지도에 시설 데이터 전달 (map.js에서 사용)
    if (typeof setFacilityDataForMap === 'function') {
        setFacilityDataForMap(facilities);
    }
    
    let html = '';
    
    facilities.forEach(facility => {
        const favoriteIcon = facility.isFavorite 
            ? '<i class="fas fa-star" style="color: #FFD700;"></i>' 
            : '<i class="far fa-star" style="color: var(--gray-400);"></i>';
        
        html += `
            <div class="facility-card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                    <div>
                        <h3 class="facility-name" style="color: var(--secondary-color); margin-bottom: 4px;">${facility.name}</h3>
                        <span class="facility-type" style="background: var(--gray-100); padding: 4px 12px; border-radius: 12px; font-size: 12px; color: var(--gray-600);">
                            ${facility.type}
                        </span>
                    </div>
                    <button onclick="toggleFavorite(${facility.id})" 
                            style="background: none; border: none; cursor: pointer; font-size: 24px; padding: 4px 8px; transition: transform 0.2s;"
                            onmouseover="this.style.transform='scale(1.2)'"
                            onmouseout="this.style.transform='scale(1)'">
                        ${favoriteIcon}
                    </button>
                </div>
                
                <div style="color: var(--gray-600); font-size: 14px; margin: 8px 0;">
                    <i class="fas fa-map-marker-alt" style="color: var(--primary-color); margin-right: 8px;"></i>
                    ${facility.address}
                </div>
                
                <div style="color: var(--gray-600); font-size: 14px; margin: 8px 0;">
                    <i class="fas fa-walking" style="color: var(--primary-color); margin-right: 8px;"></i>
                    ${facility.distance}
                </div>
                
                <div style="color: var(--gray-600); font-size: 14px; margin: 8px 0;">
                    <i class="fas fa-clock" style="color: var(--primary-color); margin-right: 8px;"></i>
                    ${facility.hours}
                </div>
                
                ${facility.phone !== '-' ? `
                    <div style="color: var(--gray-600); font-size: 14px; margin: 8px 0;">
                        <i class="fas fa-phone" style="color: var(--primary-color); margin-right: 8px;"></i>
                        ${facility.phone}
                    </div>
                ` : ''}
                
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--gray-100);">
                    <strong style="font-size: 12px; color: var(--gray-500);">이용 가능한 프로그램:</strong>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
                        ${facility.programs.map(p => `
                            <span style="background: rgba(61, 220, 151, 0.1); color: var(--primary-color); padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                                ${p}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                ${(facility.latitude || facility.lat) && (facility.longitude || facility.lng) ? `
                    <button class="directions-btn" onclick="openNaverMapDirections(${facility.latitude || facility.lat}, ${facility.longitude || facility.lng}, '${facility.name.replace(/'/g, "\\'")}')" style="width: 100%; margin-top: 16px; padding: 12px; background: var(--primary-color); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        <i class="fas fa-directions" style="margin-right: 6px;"></i> 길찾기
                    </button>
                ` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ==================== 시설 검색 ====================
function setupFacilitySearch() {
    const searchInput = document.getElementById('facility-search');
    
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        
        if (keyword === '') {
            displayFacilities(sampleFacilities);
            return;
        }
        
        const filtered = sampleFacilities.filter(f => {
            return f.name.toLowerCase().includes(keyword) ||
                   f.type.toLowerCase().includes(keyword) ||
                   f.address.toLowerCase().includes(keyword) ||
                   f.programs.some(p => p.toLowerCase().includes(keyword));
        });
        
        displayFacilities(filtered);
    });
}

// ==================== 설정 ====================
function setupSettings() {
    console.log('⚙️ setupSettings 호출됨');
    
    // 알림 토글 (현재 사용 안 함 - 모달로 변경됨)
    const notificationToggle = document.getElementById('notification-toggle');
    const notificationTimeSetting = document.getElementById('notification-time-setting');
    
    if (notificationToggle && notificationTimeSetting) {
        notificationToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                notificationTimeSetting.style.display = 'flex';
            } else {
                notificationTimeSetting.style.display = 'none';
            }
        });
    }
    
    // 다크모드 토글
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    console.log('🔍 다크모드 토글 찾기:', darkModeToggle);
    
    if (!darkModeToggle) {
        console.warn('⚠️ dark-mode-toggle 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 저장된 다크모드 설정 불러오기
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    console.log('💾 저장된 다크모드:', savedDarkMode);
    
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
        console.log('✅ 다크모드 복원 완료');
    }
    
    // 기존 이벤트 제거 후 새로 등록 (중복 방지)
    const newToggle = darkModeToggle.cloneNode(true);
    darkModeToggle.parentNode.replaceChild(newToggle, darkModeToggle);
    
    newToggle.addEventListener('change', function(e) {
        console.log('🔄 다크모드 토글 클릭! checked:', this.checked);
        
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
            console.log('✅ 다크 모드 활성화 완료');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
            console.log('✅ 라이트 모드 활성화 완료');
        }
    });
    
    console.log('✅ 다크모드 이벤트 리스너 등록 완료');
}

function loadSettings() {
    // 다크모드 설정 복원
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    console.log('💾 저장된 다크모드 설정:', savedDarkMode);
}

// ==================== 알림 패널 ====================
function toggleNotifications() {
    const panel = document.getElementById('notification-panel');
    const isVisible = panel.style.display !== 'none';
    
    if (isVisible) {
        // 패널 닫기
        panel.style.display = 'none';
    } else {
        // 패널 열기
        panel.style.display = 'block';
        loadNotifications();
    }
}

function closeNotifications() {
    const panel = document.getElementById('notification-panel');
    panel.style.display = 'none';
}

function loadNotifications() {
    // 실제로는 Firebase에서 알림 가져오기
    const notificationList = document.getElementById('notification-list');
    
    // 샘플 알림 (나중에 실제 데이터로 교체)
    const notifications = [
        {
            id: 1,
            title: '운동 완료!',
            message: '오늘의 추천 운동을 완료했습니다 🎉',
            time: '5분 전',
            unread: true
        },
        {
            id: 2,
            title: '새로운 추천 운동',
            message: '오늘의 운동이 업데이트되었습니다',
            time: '1시간 전',
            unread: false
        }
    ];
    
    if (notifications.length === 0) {
        notificationList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray-400);">
                <i class="fas fa-bell-slash" style="font-size: 48px; margin-bottom: 16px;"></i>
                <p>새로운 알림이 없습니다</p>
            </div>
        `;
    } else {
        let html = '';
        notifications.forEach(notif => {
            html += `
                <div class="notification-item ${notif.unread ? 'unread' : ''}" onclick="closeNotifications()">
                    <div style="font-weight: 600; color: var(--secondary-color); margin-bottom: 4px;">
                        ${notif.title}
                    </div>
                    <div style="font-size: 14px; color: var(--gray-600); margin-bottom: 8px;">
                        ${notif.message}
                    </div>
                    <div style="font-size: 12px; color: var(--gray-400);">
                        ${notif.time}
                    </div>
                </div>
            `;
        });
        notificationList.innerHTML = html;
    }
}

// 페이지 전환 시 알림 패널 닫기
const originalSwitchPage = switchPage;
switchPage = function(pageName) {
    closeNotifications();
    originalSwitchPage(pageName);
};

// ==================== 모달 함수 ====================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 스크롤 복원
    }
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// ==================== 알림 설정 ====================
function openNotificationModal() {
    // 현재 설정 불러오기
    const notificationEnabled = localStorage.getItem('notificationEnabled') === 'true';
    const notificationTime = localStorage.getItem('notificationTime') || '09:00';
    const notificationMessage = localStorage.getItem('notificationMessage') || '오늘도 운동 시간이에요! 💪';
    
    document.getElementById('modal-notification-toggle').checked = notificationEnabled;
    document.getElementById('modal-notification-time').value = notificationTime;
    document.getElementById('notification-message').value = notificationMessage;
    
    // 토글에 따라 시간 입력 표시/숨김
    toggleNotificationTime();
    
    openModal('notification-modal');
}

function toggleNotificationTime() {
    const toggle = document.getElementById('modal-notification-toggle');
    const timeInput = document.getElementById('modal-notification-time');
    const messageInput = document.getElementById('notification-message');
    
    // 토글 상태에 따라 입력 필드 활성화/비활성화
    if (toggle.checked) {
        timeInput.disabled = false;
        messageInput.disabled = false;
        timeInput.style.opacity = '1';
        messageInput.style.opacity = '1';
    } else {
        timeInput.disabled = true;
        messageInput.disabled = true;
        timeInput.style.opacity = '0.5';
        messageInput.style.opacity = '0.5';
    }
}

// 토글 변경 감지
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('modal-notification-toggle');
    if (toggle) {
        toggle.addEventListener('change', toggleNotificationTime);
    }
});

function saveNotification() {
    const enabled = document.getElementById('modal-notification-toggle').checked;
    const time = document.getElementById('modal-notification-time').value;
    const message = document.getElementById('notification-message').value.trim();
    
    // localStorage에 저장
    localStorage.setItem('notificationEnabled', enabled);
    localStorage.setItem('notificationTime', time);
    localStorage.setItem('notificationMessage', message || '오늘도 운동 시간이에요! 💪');
    
    console.log('✅ 알림 설정 저장:', { enabled, time, message });
    
    closeModal('notification-modal');
    
    // 성공 메시지
    const successMsg = document.createElement('div');
    successMsg.textContent = enabled ? `✅ 알림이 ${time}에 설정되었습니다!` : '✅ 알림이 비활성화되었습니다.';
    successMsg.style.cssText = 'position: fixed; top: 80px; left: 50%; transform: translateX(-50%); background: var(--primary-color); color: var(--gray-900); padding: 12px 24px; border-radius: 12px; font-weight: 600; z-index: 10001; animation: fadeIn 0.3s;';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
}

// ==================== 달성률 초기화 ====================
async function resetProgress() {
    console.log('🔄 resetProgress 호출됨');
    console.log('currentUser:', typeof currentUser !== 'undefined' ? currentUser : 'undefined');
    console.log('db:', typeof db !== 'undefined' ? db : 'undefined');
    
    // 전역 변수 확인
    if (typeof currentUser === 'undefined' || !currentUser) {
        alert('로그인이 필요합니다.');
        return;
    }
    
    if (typeof db === 'undefined') {
        alert('Firebase 연결 오류입니다. 페이지를 새로고침 해주세요.');
        return;
    }
    
    const confirmed = confirm('정말로 달성률을 초기화하시겠습니까?\n모든 운동 기록과 달성한 목표가 삭제됩니다.');
    
    if (!confirmed) {
        return;
    }
    
    try {
        console.log('🔄 달성률 초기화 시작...');
        console.log('사용자 UID:', currentUser.uid);
        
        // localStorage 초기화
        localStorage.removeItem('lastCompletedWorkout');
        
        // 운동 기록 삭제 (개별 삭제)
        const workoutsSnapshot = await db.collection('workouts')
            .where('userId', '==', currentUser.uid)
            .get();
        
        console.log('삭제할 운동 기록:', workoutsSnapshot.size, '개');
        
        if (workoutsSnapshot.size > 0) {
            // 개별 삭제로 변경
            const deletePromises = [];
            workoutsSnapshot.docs.forEach(doc => {
                deletePromises.push(doc.ref.delete());
            });
            await Promise.all(deletePromises);
            console.log('✅ 운동 기록 삭제 완료');
        }
        
        // 사용자 통계 초기화
        await db.collection('users').doc(currentUser.uid).update({
            totalWorkouts: 0,
            weeklyWorkouts: 0,
            currentStreak: 0,
            achievements: []
        });
        
        console.log('✅ 달성률 초기화 완료!');
        
        // 성공 메시지
        const successMsg = document.createElement('div');
        successMsg.textContent = '✅ 달성률이 초기화되었습니다!';
        successMsg.style.cssText = 'position: fixed; top: 80px; left: 50%; transform: translateX(-50%); background: var(--primary-color); color: var(--gray-900); padding: 12px 24px; border-radius: 12px; font-weight: 600; z-index: 10001; animation: fadeIn 0.3s;';
        document.body.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 3000);
        
        // 페이지 새로고침
        setTimeout(() => {
            loadPageData('home');
            if (currentPage === 'profile') {
                loadUserData();
            }
        }, 1000);
        
    } catch (error) {
        console.error('❌ 초기화 오류 상세:', error);
        console.error('오류 스택:', error.stack);
        alert('초기화 중 오류가 발생했습니다.\n\n오류: ' + error.message + '\n\nFirebase 권한 설정이 필요할 수 있습니다.');
    }
}

console.log('✨ 메인 앱 로직 로드 완료!');

// ==================== 시설 필터 기능 ====================
let allFacilitiesData = []; // 전체 시설 데이터 저장

// 필터 모달 열기
window.openFilterModal = function() {
    openModal('filter-modal');
}

// 전체 선택 토글
window.toggleAllFilters = function() {
    const allCheckbox = document.getElementById('filter-all');
    const typeCheckboxes = document.querySelectorAll('.filter-type');
    
    typeCheckboxes.forEach(checkbox => {
        checkbox.checked = allCheckbox.checked;
    });
}

// 필터 초기화
window.resetFilters = function() {
    document.getElementById('filter-all').checked = true;
    document.querySelectorAll('.filter-type').forEach(cb => cb.checked = true);
    document.getElementById('distance-filter').value = 5;
    document.getElementById('distance-value').textContent = '5km';
}

// 필터 적용
window.applyFilters = function() {
    console.log('🔍 필터 적용 중...');
    
    // 선택된 시설 유형 가져오기
    const selectedTypes = [];
    document.querySelectorAll('.filter-type:checked').forEach(checkbox => {
        selectedTypes.push(checkbox.value);
    });
    
    // 거리 제한 가져오기 (km)
    const maxDistance = parseFloat(document.getElementById('distance-filter').value);
    
    console.log('선택된 유형:', selectedTypes);
    console.log('최대 거리:', maxDistance, 'km');
    
    // 필터링
    let filtered = allFacilitiesData.filter(facility => {
        // 유형 필터
        const typeMatch = selectedTypes.length === 0 || 
                         selectedTypes.some(type => facility.type && facility.type.includes(type));
        
        // 거리 필터 (시설에 거리 정보가 있는 경우)
        const distanceMatch = !facility.distanceValue || facility.distanceValue <= maxDistance;
        
        return typeMatch && distanceMatch;
    });
    
    console.log(`✅ ${allFacilitiesData.length}개 중 ${filtered.length}개 시설 필터링`);
    
    // 필터링된 결과 표시
    displayFacilities(filtered);
    
    // 모달 닫기
    closeModal('filter-modal');
    
    // 성공 메시지
    const msg = document.createElement('div');
    msg.textContent = `${filtered.length}개 시설이 검색되었습니다`;
    msg.style.cssText = 'position: fixed; top: 80px; left: 50%; transform: translateX(-50%); background: var(--primary-color); color: white; padding: 12px 24px; border-radius: 12px; font-weight: 600; z-index: 10001;';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
}

console.log('✨ 필터 기능 로드 완료!');
