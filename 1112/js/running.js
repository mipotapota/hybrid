// ============================================
// MoveON 러닝 기능
// ============================================

let runningState = {
    isRunning: false,
    isPaused: false,
    startTime: null,
    pauseTime: null,
    totalPausedTime: 0,
    distance: 0,
    path: [],
    goalType: 'free',
    goalDistance: null,
    watchId: null,
    updateInterval: null,
    lastPosition: null
};

const CALORIES_PER_KM = 60; // 평균 체중 기준 대략적인 값
const UPDATE_INTERVAL = 1000; // 1초마다 업데이트

// ==================== 페이지 로드 시 초기화 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 목표 설정 라디오 버튼 이벤트
    const goalRadios = document.querySelectorAll('input[name="goal-type"]');
    goalRadios.forEach(radio => {
        radio.addEventListener('change', handleGoalChange);
    });

    // 사용자 지정 입력
    const customInput = document.getElementById('goal-custom-value');
    if (customInput) {
        customInput.addEventListener('input', function() {
            if (this.value > 0) {
                document.getElementById('goal-custom').checked = true;
                runningState.goalType = 'custom';
                runningState.goalDistance = parseFloat(this.value);
            }
        });
    }

    // 최근 러닝 기록 로드
    loadRecentRuns();
});

// ==================== 목표 설정 토글 ====================
function toggleGoalSettings() {
    const settings = document.getElementById('goal-settings');
    const icon = document.getElementById('goal-toggle-icon');
    
    if (settings.classList.contains('expanded')) {
        settings.classList.remove('expanded');
        icon.classList.remove('rotated');
    } else {
        settings.classList.add('expanded');
        icon.classList.add('rotated');
    }
}

// ==================== 목표 변경 핸들러 ====================
function handleGoalChange(event) {
    const value = event.target.value;
    const customInput = document.getElementById('goal-custom-value');
    
    if (value === 'free') {
        runningState.goalType = 'free';
        runningState.goalDistance = null;
        customInput.disabled = true;
        customInput.value = '';
    } else if (value === 'custom') {
        runningState.goalType = 'custom';
        runningState.goalDistance = parseFloat(customInput.value) || 5;
        customInput.disabled = false;
        customInput.focus();
    } else {
        runningState.goalType = 'fixed';
        runningState.goalDistance = parseFloat(value);
        customInput.disabled = true;
        customInput.value = '';
    }
}

// ==================== 러닝 시작 ====================
async function startRunning() {
    // 위치 권한 확인
    if (!navigator.geolocation) {
        alert('이 기기는 GPS를 지원하지 않습니다.');
        return;
    }

    try {
        // 초기 위치 가져오기
        const position = await getCurrentPositionAsync();
        
        // 상태 초기화
        runningState.isRunning = true;
        runningState.isPaused = false;
        runningState.startTime = Date.now();
        runningState.pauseTime = null;
        runningState.totalPausedTime = 0;
        runningState.distance = 0;
        runningState.path = [{
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: Date.now()
        }];
        runningState.lastPosition = position.coords;

        // UI 전환
        document.getElementById('running-ready').style.display = 'none';
        document.getElementById('running-active').style.display = 'flex';

        // 목표 진행률 표시 (목표가 있을 경우)
        if (runningState.goalType !== 'free') {
            const goalProgress = document.getElementById('running-goal-progress');
            goalProgress.style.display = 'block';
            document.getElementById('goal-distance-text').textContent = 
                runningState.goalDistance.toFixed(1) + ' km';
        }

        // GPS 추적 시작
        startGPSTracking();

        // 통계 업데이트 시작
        startStatsUpdate();

        console.log('🏃 러닝 시작!');
    } catch (error) {
        console.error('❌ 위치 가져오기 실패:', error);
        alert('위치 정보를 가져올 수 없습니다. GPS를 켜주세요.');
    }
}

// ==================== GPS 추적 시작 ====================
function startGPSTracking() {
    if (!navigator.geolocation) return;

    runningState.watchId = navigator.geolocation.watchPosition(
        (position) => {
            if (runningState.isPaused) return;

            const coords = position.coords;
            const newPoint = {
                lat: coords.latitude,
                lng: coords.longitude,
                timestamp: Date.now()
            };

            // 경로에 추가
            runningState.path.push(newPoint);

            // 거리 계산
            if (runningState.lastPosition) {
                const dist = calculateDistance(
                    runningState.lastPosition.latitude,
                    runningState.lastPosition.longitude,
                    coords.latitude,
                    coords.longitude
                );
                runningState.distance += dist;
            }

            runningState.lastPosition = coords;

            // 목표 달성 확인
            if (runningState.goalType !== 'free' && 
                runningState.distance >= runningState.goalDistance) {
                goalAchieved();
            }
        },
        (error) => {
            console.error('GPS 오류:', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

// ==================== 통계 업데이트 시작 ====================
function startStatsUpdate() {
    runningState.updateInterval = setInterval(() => {
        if (!runningState.isPaused) {
            updateRunningStats();
        }
    }, UPDATE_INTERVAL);
}

// ==================== 통계 업데이트 ====================
function updateRunningStats() {
    const now = Date.now();
    const elapsed = now - runningState.startTime - runningState.totalPausedTime;
    
    // 시간 (HH:MM:SS)
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('running-time').textContent = timeStr;

    // 거리 (km)
    document.getElementById('running-distance').textContent = 
        runningState.distance.toFixed(2) + ' km';

    // 페이스 (분/km)
    let pace = '-:--';
    if (runningState.distance > 0.1) {
        const paceMinutes = (elapsed / 60000) / runningState.distance;
        const paceMin = Math.floor(paceMinutes);
        const paceSec = Math.floor((paceMinutes - paceMin) * 60);
        pace = `${paceMin}'${String(paceSec).padStart(2, '0')}"/km`;
    }
    document.getElementById('running-pace').textContent = pace;

    // 속도 (km/h)
    let speed = 0;
    if (elapsed > 0) {
        speed = (runningState.distance / (elapsed / 3600000));
    }
    document.getElementById('running-speed').textContent = speed.toFixed(1) + ' km/h';

    // 칼로리 (대략적)
    const calories = Math.round(runningState.distance * CALORIES_PER_KM);
    document.getElementById('running-calories').textContent = calories + ' kcal';

    // 목표 진행률
    if (runningState.goalType !== 'free') {
        const progress = Math.min((runningState.distance / runningState.goalDistance) * 100, 100);
        document.getElementById('goal-progress-fill').style.width = progress + '%';
        document.getElementById('goal-percentage').textContent = progress.toFixed(0) + '%';
    }
}

// ==================== 일시정지 ====================
function pauseRunning() {
    runningState.isPaused = true;
    runningState.pauseTime = Date.now();
    
    document.getElementById('btn-pause').style.display = 'none';
    document.getElementById('btn-resume').style.display = 'flex';
    
    console.log('⏸️ 러닝 일시정지');
}

// ==================== 재개 ====================
function resumeRunning() {
    const pauseDuration = Date.now() - runningState.pauseTime;
    runningState.totalPausedTime += pauseDuration;
    runningState.isPaused = false;
    runningState.pauseTime = null;
    
    document.getElementById('btn-pause').style.display = 'flex';
    document.getElementById('btn-resume').style.display = 'none';
    
    console.log('▶️ 러닝 재개');
}

// ==================== 종료 ====================
async function finishRunning() {
    if (!confirm('러닝을 종료하시겠습니까?')) {
        return;
    }

    // GPS 추적 중지
    if (runningState.watchId) {
        navigator.geolocation.clearWatch(runningState.watchId);
    }

    // 통계 업데이트 중지
    if (runningState.updateInterval) {
        clearInterval(runningState.updateInterval);
    }

    // 최종 통계
    const elapsed = Date.now() - runningState.startTime - runningState.totalPausedTime;
    const runData = {
        date: new Date().toISOString(),
        duration: elapsed,
        distance: runningState.distance,
        path: runningState.path,
        goalType: runningState.goalType,
        goalDistance: runningState.goalDistance,
        calories: Math.round(runningState.distance * CALORIES_PER_KM),
        avgPace: runningState.distance > 0 ? (elapsed / 60000) / runningState.distance : 0,
        avgSpeed: (runningState.distance / (elapsed / 3600000))
    };

    // Firebase에 저장
    await saveRunToFirebase(runData);

    // 결과 표시
    showRunResult(runData);

    // 상태 초기화
    resetRunningState();

    // UI 복귀
    document.getElementById('running-active').style.display = 'none';
    document.getElementById('running-ready').style.display = 'block';
    document.getElementById('running-goal-progress').style.display = 'none';

    console.log('🏁 러닝 종료!', runData);
}

// ==================== 목표 달성 ====================
function goalAchieved() {
    // 진동 (모바일)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }

    // 알림
    alert(`🎉 축하합니다! ${runningState.goalDistance}km 목표를 달성했습니다!`);

    console.log('🎯 목표 달성!');
}

// ==================== Firebase에 저장 ====================
async function saveRunToFirebase(runData) {
    if (!currentUser) return;

    try {
        await db.collection('runs').add({
            userId: currentUser.uid,
            ...runData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // 사용자 통계 업데이트
        const userRef = db.collection('users').doc(currentUser.uid);
        await userRef.update({
            totalRuns: firebase.firestore.FieldValue.increment(1),
            totalDistance: firebase.firestore.FieldValue.increment(runData.distance),
            totalRunTime: firebase.firestore.FieldValue.increment(runData.duration)
        });

        console.log('✅ 러닝 기록 저장 완료');
    } catch (error) {
        console.error('❌ 저장 실패:', error);
    }
}

// ==================== 결과 표시 ====================
function showRunResult(runData) {
    const hours = Math.floor(runData.duration / 3600000);
    const minutes = Math.floor((runData.duration % 3600000) / 60000);
    const seconds = Math.floor((runData.duration % 60000) / 1000);
    const timeStr = `${hours}시간 ${minutes}분 ${seconds}초`;

    const paceMin = Math.floor(runData.avgPace);
    const paceSec = Math.floor((runData.avgPace - paceMin) * 60);

    alert(`
🏃 러닝 완료!

⏱️ 시간: ${timeStr}
📏 거리: ${runData.distance.toFixed(2)} km
⚡ 평균 페이스: ${paceMin}'${paceSec}"/km
🚀 평균 속도: ${runData.avgSpeed.toFixed(1)} km/h
🔥 칼로리: ${runData.calories} kcal
${runData.goalType !== 'free' ? `\n🎯 목표: ${runData.goalDistance} km` : ''}
    `.trim());

    // 최근 기록 새로고침
    loadRecentRuns();
}

// ==================== 상태 초기화 ====================
function resetRunningState() {
    runningState = {
        isRunning: false,
        isPaused: false,
        startTime: null,
        pauseTime: null,
        totalPausedTime: 0,
        distance: 0,
        path: [],
        goalType: 'free',
        goalDistance: null,
        watchId: null,
        updateInterval: null,
        lastPosition: null
    };
}

// ==================== 최근 러닝 기록 로드 ====================
async function loadRecentRuns() {
    if (!currentUser) {
        document.getElementById('recent-runs-list').innerHTML = 
            '<p style="text-align: center; color: var(--gray-500); padding: 20px;">로그인이 필요합니다</p>';
        return;
    }

    try {
        const snapshot = await db.collection('runs')
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .limit(5)
            .get();

        const container = document.getElementById('recent-runs-list');
        
        if (snapshot.empty) {
            container.innerHTML = 
                '<p style="text-align: center; color: var(--gray-500); padding: 20px;">아직 러닝 기록이 없습니다</p>';
            return;
        }

        container.innerHTML = '';
        snapshot.forEach(doc => {
            const run = doc.data();
            const item = createRunItem(run);
            container.appendChild(item);
        });

        console.log('✅ 최근 러닝 기록 로드:', snapshot.size);
    } catch (error) {
        console.error('❌ 러닝 기록 로드 실패:', error);
    }
}

// ==================== 러닝 기록 아이템 생성 ====================
function createRunItem(run) {
    const div = document.createElement('div');
    div.className = 'run-item';

    const date = run.date ? new Date(run.date) : new Date();
    const dateStr = date.toLocaleDateString('ko-KR', { 
        month: 'long', 
        day: 'numeric',
        weekday: 'short'
    });

    const hours = Math.floor(run.duration / 3600000);
    const minutes = Math.floor((run.duration % 3600000) / 60000);
    const timeStr = hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;

    const paceMin = Math.floor(run.avgPace);
    const paceSec = Math.floor((run.avgPace - paceMin) * 60);
    const paceStr = `${paceMin}'${String(paceSec).padStart(2, '0')}"`;

    div.innerHTML = `
        <div class="run-item-header">
            <div class="run-date">${dateStr}</div>
            ${run.goalType !== 'free' ? `<div class="run-goal-badge">🎯 ${run.goalDistance}km</div>` : ''}
        </div>
        <div class="run-stats-mini">
            <div class="run-stat-mini">
                <div class="run-stat-mini-value">${run.distance.toFixed(2)}</div>
                <div class="run-stat-mini-label">km</div>
            </div>
            <div class="run-stat-mini">
                <div class="run-stat-mini-value">${timeStr}</div>
                <div class="run-stat-mini-label">시간</div>
            </div>
            <div class="run-stat-mini">
                <div class="run-stat-mini-value">${paceStr}</div>
                <div class="run-stat-mini-label">페이스</div>
            </div>
        </div>
    `;

    return div;
}

// ==================== 유틸리티: 현재 위치 가져오기 (Promise) ====================
function getCurrentPositionAsync() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    });
}

// ==================== 유틸리티: 두 지점 간 거리 계산 (km) ====================
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

console.log('✨ 러닝 모듈 로드 완료!');
