// ============================================
// MoveON 메인 앱 로직
// ============================================

let currentPage = 'home';

// ==================== 초기화 ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 MoveON 앱 시작!');
    
    // 스플래시 화면 3초 후 자동 전환
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
    }, 3000);
    
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
        
        // 로그인 상태면 사용자 데이터 가져오기
        if (currentUser) {
            const userDoc = await db.collection('users').doc(currentUser.uid).get();
            userData = userDoc.data();
            
            // 오늘 이미 완료했는지 확인
            const today = new Date().toISOString().split('T')[0];
            const workout = getTodayWorkout(userData);
            const todayWorkout = await db.collection('workouts')
                .where('userId', '==', currentUser.uid)
                .where('date', '==', today)
                .where('workoutId', '==', workout.id)
                .get();
            
            isCompleted = !todayWorkout.empty;
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
        <div style="background: white; border-radius: 16px; padding: 20px; box-shadow: var(--shadow-sm); margin-bottom: 20px;">
            <h3 style="text-align: center; margin-bottom: 16px; color: var(--secondary-color);">
                ${year}년 ${month + 1}월
            </h3>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center;">
                <div style="color: red; font-weight: 600;">일</div>
                <div style="font-weight: 600;">월</div>
                <div style="font-weight: 600;">화</div>
                <div style="font-weight: 600;">수</div>
                <div style="font-weight: 600;">목</div>
                <div style="font-weight: 600;">금</div>
                <div style="color: blue; font-weight: 600;">토</div>
    `;
    
    // 빈 칸 채우기
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div></div>';
    }
    
    // 날짜 채우기
    for (let date = 1; date <= lastDate; date++) {
        const isToday = date === today.getDate();
        const hasWorkout = workoutDates.has(date);
        
        calendarHTML += `
            <div style="
                padding: 8px;
                border-radius: 8px;
                ${isToday ? 'background: var(--primary-color); color: white; font-weight: 700;' : ''}
                ${hasWorkout && !isToday ? 'background: rgba(61, 220, 151, 0.2);' : ''}
                position: relative;
            ">
                ${date}
                ${hasWorkout ? '<div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--primary-color); border-radius: 50%;"></div>' : ''}
            </div>
        `;
    }
    
    calendarHTML += '</div></div>';
    container.innerHTML = calendarHTML;
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
    
    let listHTML = '<div style="background: white; border-radius: 16px; padding: 20px; box-shadow: var(--shadow-sm);">';
    listHTML += '<h3 style="margin-bottom: 16px; color: var(--secondary-color);">최근 운동 기록</h3>';
    
    records.slice(0, 10).forEach(data => {
        const date = new Date(data.completedAt);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        
        listHTML += `
            <div style="padding: 12px; border-bottom: 1px solid var(--gray-100); display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${data.workoutName}</strong>
                    <div style="font-size: 12px; color: var(--gray-500); margin-top: 4px;">
                        ${data.type} · ${data.duration}분 · ${data.calories}kcal
                    </div>
                </div>
                <div style="color: var(--gray-400); font-size: 14px;">
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
    
    if (facilities.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray-400);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px;"></i>
                <p>검색 결과가 없습니다.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    facilities.forEach(facility => {
        html += `
            <div style="background: white; border-radius: 16px; padding: 20px; margin-bottom: 16px; box-shadow: var(--shadow-sm);">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                    <div>
                        <h3 style="color: var(--secondary-color); margin-bottom: 4px;">${facility.name}</h3>
                        <span style="background: var(--gray-100); padding: 4px 12px; border-radius: 12px; font-size: 12px; color: var(--gray-600);">
                            ${facility.type}
                        </span>
                    </div>
                    <button onclick="toggleFavorite(${facility.id})" style="background: none; border: none; cursor: pointer; font-size: 24px;">
                        ${facility.isFavorite ? '⭐' : '☆'}
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
                
                <button onclick="alert('지도 기능은 추후 추가 예정입니다!')" style="width: 100%; margin-top: 16px; padding: 12px; background: var(--primary-color); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-map"></i> 길찾기
                </button>
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
    // 알림 토글
    const notificationToggle = document.getElementById('notification-toggle');
    const notificationTimeSetting = document.getElementById('notification-time-setting');
    
    notificationToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            notificationTimeSetting.style.display = 'flex';
            alert('알림이 활성화되었습니다!');
        } else {
            notificationTimeSetting.style.display = 'none';
            alert('알림이 비활성화되었습니다.');
        }
    });
    
    // 다크모드 토글
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    darkModeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            alert('다크 모드가 활성화되었습니다!');
        } else {
            document.body.classList.remove('dark-mode');
            alert('다크 모드가 비활성화되었습니다.');
        }
    });
}

function loadSettings() {
    // 저장된 설정 불러오기 (나중에 구현)
    console.log('설정 로드');
}

console.log('✨ 메인 앱 로직 로드 완료!');
