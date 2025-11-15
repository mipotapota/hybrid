// ============================================
// 운동 데이터 관리
// ============================================

// 운동 종목 데이터
const exerciseDatabase = [
    // 근력 운동
    {
        id: 1,
        name: '팔굽혀펴기',
        type: '근력',
        difficulty: '초급',
        duration: 10,
        sets: 3,
        reps: 10,
        calories: 50,
        description: '상체 근력을 키우는 기본 운동입니다.',
        targetMuscle: '가슴, 삼두근',
        equipment: '없음'
    },
    {
        id: 2,
        name: '스쿼트',
        type: '근력',
        difficulty: '초급',
        duration: 15,
        sets: 3,
        reps: 15,
        calories: 80,
        description: '하체 근력 강화에 최고의 운동입니다.',
        targetMuscle: '대퇴사두근, 둔근',
        equipment: '없음'
    },
    {
        id: 3,
        name: '플랭크',
        type: '근력',
        difficulty: '중급',
        duration: 10,
        sets: 3,
        reps: '30초',
        calories: 40,
        description: '코어 근육을 강화하는 운동입니다.',
        targetMuscle: '복근, 코어',
        equipment: '없음'
    },
    {
        id: 4,
        name: '런지',
        type: '근력',
        difficulty: '중급',
        duration: 12,
        sets: 3,
        reps: 12,
        calories: 70,
        description: '하체 균형과 근력을 키웁니다.',
        targetMuscle: '대퇴사두근, 둔근',
        equipment: '없음'
    },
    
    // 유산소 운동
    {
        id: 5,
        name: '빠르게 걷기',
        type: '유산소',
        difficulty: '초급',
        duration: 30,
        sets: 1,
        reps: '30분',
        calories: 150,
        description: '가장 쉽고 효과적인 유산소 운동입니다.',
        targetMuscle: '전신',
        equipment: '없음'
    },
    {
        id: 6,
        name: '제자리 뛰기',
        type: '유산소',
        difficulty: '중급',
        duration: 15,
        sets: 3,
        reps: '3분',
        calories: 100,
        description: '좁은 공간에서도 할 수 있는 유산소 운동입니다.',
        targetMuscle: '전신',
        equipment: '없음'
    },
    {
        id: 7,
        name: '버피 테스트',
        type: '유산소',
        difficulty: '고급',
        duration: 15,
        sets: 3,
        reps: 10,
        calories: 120,
        description: '전신을 사용하는 고강도 운동입니다.',
        targetMuscle: '전신',
        equipment: '없음'
    },
    
    // 스트레칭
    {
        id: 8,
        name: '목 스트레칭',
        type: '스트레칭',
        difficulty: '초급',
        duration: 5,
        sets: 1,
        reps: '10회',
        calories: 10,
        description: '목과 어깨의 긴장을 풀어줍니다.',
        targetMuscle: '목, 승모근',
        equipment: '없음'
    },
    {
        id: 9,
        name: '전신 스트레칭',
        type: '스트레칭',
        difficulty: '초급',
        duration: 10,
        sets: 1,
        reps: '10분',
        calories: 20,
        description: '전신의 유연성을 높이는 스트레칭입니다.',
        targetMuscle: '전신',
        equipment: '요가매트'
    },
    {
        id: 10,
        name: '요가 - 태양경배',
        type: '스트레칭',
        difficulty: '중급',
        duration: 15,
        sets: 1,
        reps: '5회',
        calories: 40,
        description: '요가의 기본 동작으로 전신을 스트레칭합니다.',
        targetMuscle: '전신',
        equipment: '요가매트'
    }
];

// ==================== 공공데이터 API 설정 ====================
const PUBLIC_DATA_API_KEY = 'e8464c95ce2416898de49e8afb4205e31c2652bcb8fd802c3cf0579531d94f52';
const PUBLIC_DATA_BASE_URL = 'https://apis.data.go.kr/B551014/SRVC_SFMS_FACIL_INFO/TODZ_SFMS_FACIL_INFO';

// 실제 API에서 가져온 시설 데이터 저장
let realFacilities = [];

// 샘플 데이터 (API 오류 시 백업용)
const sampleFacilities = [
    {
        id: 1,
        name: '올림픽공원 체육관',
        type: '종합체육관',
        address: '서울시 송파구 올림픽로 424',
        distance: '1.2km',
        phone: '02-410-1114',
        hours: '06:00 - 22:00',
        programs: ['농구', '배드민턴', '탁구'],
        isFavorite: false,
        lat: 37.5219,
        lng: 127.1241
    },
    {
        id: 2,
        name: '국민체력100센터',
        type: '체력측정센터',
        address: '서울시 송파구 방이동 88-3',
        distance: '2.3km',
        phone: '02-410-1233',
        hours: '09:00 - 18:00',
        programs: ['체력측정', '운동처방', '체력증진교실'],
        isFavorite: false,
        lat: 37.5145,
        lng: 127.1234
    },
    {
        id: 3,
        name: '송파구민체육센터',
        type: '구민체육센터',
        address: '서울시 송파구 백제고분로 42길',
        distance: '3.5km',
        phone: '02-2147-2700',
        hours: '06:00 - 22:00',
        programs: ['수영', '헬스', '에어로빅', '요가'],
        isFavorite: false,
        lat: 37.5048,
        lng: 127.1089
    },
    {
        id: 4,
        name: '방이근린공원 운동장',
        type: '공공운동장',
        address: '서울시 송파구 방이동 44-3',
        distance: '1.8km',
        phone: '-',
        hours: '상시개방',
        programs: ['축구', '농구', '배구'],
        isFavorite: false,
        lat: 37.5127,
        lng: 127.1198
    },
    {
        id: 5,
        name: '잠실종합운동장',
        type: '종합운동장',
        address: '서울시 송파구 올림픽로 25',
        distance: '2.1km',
        phone: '02-2240-8800',
        hours: '06:00 - 21:00',
        programs: ['육상', '축구', '야구'],
        isFavorite: false,
        lat: 37.5141,
        lng: 127.0719
    }
];

// ==================== 공공데이터 API 호출 ====================
async function fetchPublicFacilities(region = '서울특별시', pageNo = 1, numOfRows = 20) {
    try {
        console.log('🔍 공공데이터 API 호출 중...');
        
        // 사용자 현재 위치 가져오기
        let userLat = 37.5665; // 기본값: 서울
        let userLng = 126.9780;
        
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 5000,
                    enableHighAccuracy: false
                });
            });
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            console.log('📍 사용자 위치:', userLat, userLng);
        } catch (geoError) {
            console.warn('⚠️ 위치 정보 가져오기 실패, 기본 위치 사용');
        }
        
        // API URL 구성 (API 키도 인코딩)
        const url = `${PUBLIC_DATA_BASE_URL}?serviceKey=${encodeURIComponent(PUBLIC_DATA_API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&ctprvnNm=${encodeURIComponent(region)}`;
        
        console.log('📡 API URL:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API 응답 오류: ${response.status}`);
        }
        
        // 응답 텍스트 먼저 확인
        const text = await response.text();
        console.log('📄 API 응답 (첫 200자):', text.substring(0, 200));
        
        // XML 응답인 경우
        if (text.startsWith('<?xml')) {
            console.warn('⚠️ XML 응답 받음, 샘플 데이터 사용');
            console.log('💡 API 문제: 승인 대기 중이거나 서비스 키 문제일 수 있습니다');
            return sampleFacilities;
        }
        
        // JSON 파싱
        const data = JSON.parse(text);
        console.log('📦 API 응답:', data);
        
        // API 응답 파싱 (구조에 따라 조정 필요)
        if (data.response && data.response.body && data.response.body.items) {
            const items = Array.isArray(data.response.body.items.item) 
                ? data.response.body.items.item 
                : [data.response.body.items.item];
            
            // 우리 앱 형식으로 변환
            realFacilities = items.map((item, index) => {
                const facilityLat = parseFloat(item.faci_lat || 37.5665);
                const facilityLng = parseFloat(item.faci_lot || 126.9780);
                
                // 거리 계산 (km)
                const distance = calculateDistance(userLat, userLng, facilityLat, facilityLng);
                
                return {
                    id: index + 1000, // API ID와 겹치지 않게
                    name: item.faci_nm || '이름 없음',
                    type: item.fcob_nm || item.ftype_nm || '체육시설',
                    address: item.faci_road_addr || item.addr_ctpv_nm + ' ' + item.addr_cpb_nm || '주소 정보 없음',
                    distance: distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`,
                    phone: item.faci_tel || '-',
                    hours: '운영시간 문의',
                    programs: parsePrograms(item.fcob_nm || item.ftype_nm),
                    isFavorite: false,
                    lat: facilityLat,
                    lng: facilityLng,
                    distanceValue: distance // 필터링용
                };
            });
            
            // 거리순으로 정렬
            realFacilities.sort((a, b) => a.distanceValue - b.distanceValue);
            
            console.log('✅ 공공데이터 로드 성공:', realFacilities.length, '개 시설');
            return realFacilities;
            
        } else {
            console.warn('⚠️ API 응답 형식 예상과 다름, 샘플 데이터 사용');
            return sampleFacilities;
        }
        
    } catch (error) {
        console.error('❌ 공공데이터 API 오류:', error);
        console.log('📝 샘플 데이터로 대체');
        return sampleFacilities;
    }
}

// Haversine 공식으로 두 좌표 간 거리 계산 (km)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // 소수점 첫째자리까지
}

// 시설 타입에서 프로그램 추출
function parsePrograms(facilityType) {
    if (!facilityType) return ['일반 체육'];
    
    const typeMap = {
        '체육관': ['농구', '배구', '배드민턴'],
        '수영장': ['수영', '아쿼로빅'],
        '운동장': ['축구', '야구', '육상'],
        '테니스장': ['테니스'],
        '골프장': ['골프'],
        '체력단련장': ['헬스', '웨이트'],
        '종합': ['다목적 운동']
    };
    
    for (const [key, programs] of Object.entries(typeMap)) {
        if (facilityType.includes(key)) {
            return programs;
        }
    }
    
    return ['일반 체육'];
}

// ==================== 오늘의 추천 운동 ====================
function getTodayWorkout(userData = null) {
    // 사용자 데이터 기반으로 난이도 결정
    let difficulty = '초급';
    
    if (userData && userData.totalWorkouts) {
        if (userData.totalWorkouts > 50) difficulty = '고급';
        else if (userData.totalWorkouts > 20) difficulty = '중급';
    }
    
    // 요일별 운동 타입 추천
    const dayOfWeek = new Date().getDay();
    let preferredType = '';
    
    switch(dayOfWeek) {
        case 1: // 월요일 - 근력
        case 3: // 수요일 - 근력
        case 5: // 금요일 - 근력
            preferredType = '근력';
            break;
        case 2: // 화요일 - 유산소
        case 4: // 목요일 - 유산소
        case 6: // 토요일 - 유산소
            preferredType = '유산소';
            break;
        case 0: // 일요일 - 스트레칭
            preferredType = '스트레칭';
            break;
    }
    
    // 필터링된 운동 중 랜덤 선택
    const filtered = exerciseDatabase.filter(ex => {
        if (preferredType && ex.type !== preferredType) return false;
        if (userData && ex.difficulty !== difficulty) return false;
        return true;
    });
    
    // 적합한 운동이 없으면 전체에서 선택
    const pool = filtered.length > 0 ? filtered : exerciseDatabase;
    return pool[Math.floor(Math.random() * pool.length)];
}

// ==================== 운동 완료 기록 ====================
async function completeWorkout(workoutData) {
    const today = new Date().toISOString().split('T')[0];
    
    if (!currentUser) {
        // 로그인 안 한 경우 localStorage에만 저장
        localStorage.setItem('lastCompletedWorkout', today);
        alert(`🎉 ${workoutData.name} 완료! 잘하셨어요!`);
        loadTodayWorkout();
        return;
    }
    
    try {
        // Firestore에 운동 기록 저장
        await db.collection('workouts').add({
            userId: currentUser.uid,
            workoutId: workoutData.id,
            workoutName: workoutData.name,
            type: workoutData.type,
            difficulty: workoutData.difficulty,
            duration: workoutData.duration,
            calories: workoutData.calories,
            completedAt: firebase.firestore.FieldValue.serverTimestamp(),
            date: today // YYYY-MM-DD
        });
        
        // localStorage에도 저장 (이중 체크)
        localStorage.setItem('lastCompletedWorkout', today);
        
        // 총 운동시간 계산
        const allWorkouts = await db.collection('workouts')
            .where('userId', '==', currentUser.uid)
            .get();
        
        let totalMinutes = 0;
        allWorkouts.forEach(doc => {
            const data = doc.data();
            totalMinutes += data.duration || 0;
        });
        
        // 시간 단위로 변환
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const totalTimeText = hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
        
        // 사용자 통계 업데이트
        const userRef = db.collection('users').doc(currentUser.uid);
        await userRef.update({
            totalWorkouts: firebase.firestore.FieldValue.increment(1),
            totalMinutes: totalMinutes
        });
        
        console.log('✅ 운동 완료 기록됨:', workoutData.name);
        console.log(`⏱️ 총 운동시간: ${totalTimeText}`);
        alert(`🎉 ${workoutData.name} 완료! 잘하셨어요!\n\n총 운동시간: ${totalTimeText}`);
        
        // 화면 새로고침
        loadTodayWorkout();
        loadWorkoutStats();
        if (typeof loadUserData === 'function') {
            loadUserData(); // 프로필 데이터도 업데이트
        }
        
    } catch (error) {
        console.error('❌ 운동 기록 오류:', error);
        alert('운동 기록 중 오류가 발생했습니다.');
    }
}

// ==================== 운동 통계 로드 ====================
async function loadWorkoutStats() {
    if (!currentUser) return;
    
    try {
        // 이번 주 시작일 계산
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        // 이번 주 운동 기록 조회 (인덱스 불필요하게 단순화)
        const weekWorkouts = await db.collection('workouts')
            .where('userId', '==', currentUser.uid)
            .get();
        
        // 클라이언트 측에서 필터링
        let totalTime = 0;
        let workoutDays = new Set();
        let weekCount = 0;
        
        weekWorkouts.forEach(doc => {
            const data = doc.data();
            const completedAt = data.completedAt?.toDate();
            
            // 이번 주 데이터만 필터링
            if (completedAt && completedAt >= weekStart) {
                totalTime += data.duration || 0;
                workoutDays.add(data.date);
                weekCount++;
            }
        });
        
        // 화면 업데이트
        document.getElementById('week-workouts').textContent = weekCount;
        document.getElementById('week-time').textContent = `${totalTime}분`;
        document.getElementById('week-streak').textContent = `${workoutDays.size}일`;
        
    } catch (error) {
        console.error('❌ 통계 로드 오류:', error);
    }
}

// ==================== 시설 즐겨찾기 ====================
// ==================== 시설 즐겨찾기 ====================
async function toggleFavorite(facilityId) {
    if (!currentUser) {
        alert('로그인이 필요합니다.');
        return;
    }
    
    // 현재 스크롤 위치 저장
    const scrollPosition = document.querySelector('.app-content').scrollTop;
    console.log('💾 현재 스크롤 위치:', scrollPosition);
    
    try {
        const favoriteRef = db.collection('favorites').doc(`${currentUser.uid}_${facilityId}`);
        const doc = await favoriteRef.get();
        
        let wasDeleted = false;
        let isAdded = false;
        
        if (doc.exists) {
            // 즐겨찾기 해제
            await favoriteRef.delete();
            console.log('✅ 즐겨찾기 해제:', facilityId);
            wasDeleted = true;
            
            // 사용자 통계 업데이트 (안전하게)
            try {
                const userRef = db.collection('users').doc(currentUser.uid);
                const userDoc = await userRef.get();
                
                if (userDoc.exists) {
                    const currentCount = userDoc.data().favoriteCount || 0;
                    await userRef.update({
                        favoriteCount: Math.max(0, currentCount - 1)
                    });
                }
            } catch (statsError) {
                console.warn('⚠️ 통계 업데이트 실패 (무시):', statsError);
            }
        } else {
            // 즐겨찾기 추가
            await favoriteRef.set({
                userId: currentUser.uid,
                facilityId: facilityId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ 즐겨찾기 추가:', facilityId);
            isAdded = true;
            
            // 사용자 통계 업데이트 (안전하게)
            try {
                const userRef = db.collection('users').doc(currentUser.uid);
                const userDoc = await userRef.get();
                
                if (userDoc.exists) {
                    const currentCount = userDoc.data().favoriteCount || 0;
                    await userRef.update({
                        favoriteCount: currentCount + 1
                    });
                }
            } catch (statsError) {
                console.warn('⚠️ 통계 업데이트 실패 (무시):', statsError);
            }
        }
        
        // 화면 업데이트
        // 즐겨찾기 보기 모드였다면 다시 즐겨찾기만 표시
        if (wasDeleted && isFavoriteMode) {
            // 해제했으면 즐겨찾기 목록 다시 불러오기
            const favorites = await db.collection('favorites')
                .where('userId', '==', currentUser.uid)
                .get();
            
            if (favorites.empty) {
                // 즐겨찾기가 하나도 없으면 빈 화면 표시
                const container = document.getElementById('facility-list');
                container.innerHTML = `
                    <div class="empty-favorites-container" style="text-align: center; padding: 60px 20px;">
                        <i class="far fa-star" style="font-size: 64px; margin-bottom: 24px; color: var(--gray-300);"></i>
                        <h3 class="empty-favorites-title" style="margin-bottom: 12px; font-size: 20px;">
                            즐겨찾기한 시설이 없습니다
                        </h3>
                        <p class="empty-favorites-text" style="font-size: 14px; margin-bottom: 24px; line-height: 1.6;">
                            시설 탭에서 별 아이콘을 클릭하여<br>
                            자주 가는 운동 시설을 즐겨찾기에 추가하세요!
                        </p>
                        <button onclick="isFavoriteMode = false; switchPage('facility'); loadFacilities();" 
                                class="empty-favorites-btn"
                                style="background: var(--primary-color); color: var(--gray-900); border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 16px;"
                                onmouseover="this.style.transform='scale(1.05)'"
                                onmouseout="this.style.transform='scale(1)'">
                            <i class="fas fa-search" style="color: var(--gray-900); margin-right: 8px;"></i>
                            <span style="color: var(--gray-900);">시설 둘러보기</span>
                        </button>
                    </div>
                `;
                console.log('📭 즐겨찾기 전부 해제 - 빈 화면 표시');
            } else {
                // 남은 즐겨찾기 표시 (모드 유지)
                await showFavorites();
            }
        } else if (!isFavoriteMode) {
            // 일반 모드: 아이콘만 업데이트하고 페이지 리로드 안 함!
            console.log('🔍 아이콘 업데이트 시도, facilityId:', facilityId);
            
            const facilityCards = document.querySelectorAll('.facility-card');
            console.log('📦 총 카드 개수:', facilityCards.length);
            
            let updated = false;
            
            facilityCards.forEach((card, index) => {
                const button = card.querySelector('button[onclick*="toggleFavorite"]');
                if (button) {
                    const onclickAttr = button.getAttribute('onclick');
                    console.log(`카드 ${index} onclick:`, onclickAttr);
                    
                    // facilityId가 포함되어 있는지 확인
                    if (onclickAttr && onclickAttr.includes(`toggleFavorite(${facilityId})`)) {
                        console.log('✅ 매칭된 카드 발견!');
                        // 아이콘만 변경
                        if (isAdded) {
                            button.innerHTML = '<i class="fas fa-star" style="color: #FFD700;"></i>';
                            console.log('⭐ 별 채움');
                        } else {
                            button.innerHTML = '<i class="far fa-star" style="color: var(--gray-400);"></i>';
                            console.log('☆ 별 비움');
                        }
                        updated = true;
                    }
                }
            });
            
            if (updated) {
                console.log('✨ 아이콘만 업데이트 완료 - 리로드 안 함!');
            } else {
                console.log('⚠️ 아이콘 업데이트 실패 - 전체 리로드');
                await loadFacilities();
                
                // 스크롤 위치 복원
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        const appContent = document.querySelector('.app-content');
                        if (appContent) {
                            appContent.scrollTop = scrollPosition;
                            console.log('📜 스크롤 위치 복원:', scrollPosition);
                        }
                    });
                });
            }
        } else {
            // 즐겨찾기 모드에서 추가했으면 모드 해제하고 전체 보기
            isFavoriteMode = false;
            await loadFacilities();
        }
        
    } catch (error) {
        console.error('❌ 즐겨찾기 오류:', error);
        
        // 주요 기능은 작동했을 수 있으니 새로고침
        await loadFacilities();
        
        // 스크롤 위치 복원
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const appContent = document.querySelector('.app-content');
                if (appContent) {
                    appContent.scrollTop = scrollPosition;
                }
            });
        });
    }
}

// ==================== 즐겨찾기 목록 보기 ====================
// ==================== 즐겨찾기 목록 보기 ====================
// ==================== 즐겨찾기 목록 보기 ====================
async function showFavorites() {
    if (!currentUser) {
        alert('로그인이 필요합니다.');
        return;
    }
    
    try {
        // 즐겨찾기 모드 활성화 (먼저!)
        isFavoriteMode = true;
        
        // 시설 페이지로 먼저 이동
        switchPage('facility');
        
        // 검색 바 숨기기 & 제목 변경
        const searchBar = document.getElementById('facility-search-bar');
        const pageTitle = document.getElementById('facility-page-title');
        if (searchBar) searchBar.style.display = 'none';
        if (pageTitle) pageTitle.textContent = '⭐ 즐겨찾기한 시설';
        
        const container = document.getElementById('facility-list');
        
        // 로딩 표시
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray-400);">
                <div class="loading-spinner" style="margin: 0 auto 16px;"></div>
                <p>즐겨찾기 목록을 불러오는 중...</p>
            </div>
        `;
        
        // 즐겨찾기 목록 가져오기
        const favorites = await db.collection('favorites')
            .where('userId', '==', currentUser.uid)
            .get();
        
        console.log('📌 즐겨찾기 문서 수:', favorites.size);
        
        if (favorites.empty) {
            // alert 대신 페이지에 메시지 표시
            container.innerHTML = `
                <div class="empty-favorites-container" style="text-align: center; padding: 60px 20px;">
                    <i class="far fa-star" style="font-size: 64px; margin-bottom: 24px; color: var(--gray-300);"></i>
                    <h3 class="empty-favorites-title" style="margin-bottom: 12px; font-size: 20px;">
                        즐겨찾기한 시설이 없습니다
                    </h3>
                    <p class="empty-favorites-text" style="font-size: 14px; margin-bottom: 24px; line-height: 1.6;">
                        시설 탭에서 별 아이콘을 클릭하여<br>
                        자주 가는 운동 시설을 즐겨찾기에 추가하세요!
                    </p>
                    <button onclick="isFavoriteMode = false; switchPage('facility'); loadFacilities();" 
                            class="empty-favorites-btn"
                            style="background: var(--primary-color); color: var(--gray-900); border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 16px;"
                            onmouseover="this.style.transform='scale(1.05)'"
                            onmouseout="this.style.transform='scale(1)'">
                        <i class="fas fa-search" style="color: var(--gray-900); margin-right: 8px;"></i>
                        <span style="color: var(--gray-900);">시설 둘러보기</span>
                    </button>
                </div>
            `;
            return;
        }
        
        // 본인의 즐겨찾기만 필터링 (보안 강화)
        const favoriteIds = favorites.docs
            .filter(doc => doc.data().userId === currentUser.uid)
            .map(doc => doc.data().facilityId);
        
        console.log('📌 즐겨찾기 ID 목록:', favoriteIds);
        
        // 로딩 표시
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray-400);">
                <div class="loading-spinner" style="margin: 0 auto 16px;"></div>
                <p>즐겨찾기 목록을 불러오는 중...</p>
            </div>
        `;
        
        // API에서 전체 시설 데이터 가져오기 (캐시 없으면)
        if (realFacilities.length === 0) {
            await fetchPublicFacilities('서울특별시', 1, 50); // 더 많이 가져오기
        }
        
        // 즐겨찾기한 시설만 필터링
        let favoriteFacilities = realFacilities.filter(f => favoriteIds.includes(f.id));
        
        // API에 없으면 샘플 데이터에서도 찾기
        if (favoriteFacilities.length === 0) {
            favoriteFacilities = sampleFacilities.filter(f => favoriteIds.includes(f.id));
        }
        
        // isFavorite 상태 설정 (모두 true)
        favoriteFacilities.forEach(f => {
            f.isFavorite = true;
        });
        
        console.log('⭐ 즐겨찾기 시설:', favoriteFacilities.length, '개');
        
        if (favoriteFacilities.length > 0) {
            displayFacilities(favoriteFacilities);
        } else {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--gray-400);">
                    <i class="fas fa-star" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <p>즐겨찾기한 시설을 찾을 수 없습니다.</p>
                    <p style="font-size: 14px; margin-top: 8px;">시설 탭에서 별을 클릭하여 즐겨찾기를 추가하세요!</p>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('❌ 즐겨찾기 로드 오류:', error);
        alert('즐겨찾기 목록을 불러오는 중 오류가 발생했습니다.');
        isFavoriteMode = false; // 오류 시 모드 해제
    }
}

// ==================== 달성률 초기화 ====================
async function resetProgress() {
    if (!currentUser) return;
    
    if (!confirm('정말로 모든 운동 기록을 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
        return;
    }
    
    try {
        // 사용자의 모든 운동 기록 조회
        const workouts = await db.collection('workouts')
            .where('userId', '==', currentUser.uid)
            .get();
        
        // 개별 삭제 (batch 대신)
        const deletePromises = [];
        workouts.forEach(doc => {
            deletePromises.push(doc.ref.delete());
        });
        
        await Promise.all(deletePromises);
        
        // 사용자 통계 초기화
        await db.collection('users').doc(currentUser.uid).update({
            totalWorkouts: 0,
            achievementRate: 0
        });
        
        alert('운동 기록이 초기화되었습니다.');
        
        // 화면 새로고침
        loadUserData();
        loadWorkoutStats();
        switchPage('home');
        
    } catch (error) {
        console.error('❌ 초기화 오류:', error);
        alert('초기화 중 오류가 발생했습니다: ' + error.message);
    }
}

// ==================== 달성 목표 보기 ====================
function showAchievements() {
    console.log('🏆 달성한 목표 페이지 열기');
    
    // 페이지 전환 (classList 사용)
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('achievements-page').classList.add('active');
    
    // 목표 데이터
    const achievements = [
        { 
            name: '첫 운동 완료', 
            condition: '운동 1회 완료', 
            unlocked: true,
            icon: '🎯',
            date: '2024-01-15'
        },
        { 
            name: '꾸준함의 시작', 
            condition: '7일 연속 운동', 
            unlocked: false,
            icon: '🔥',
            progress: '3/7'
        },
        { 
            name: '한 달 챌린지', 
            condition: '한 달간 20회 운동', 
            unlocked: false,
            icon: '📅',
            progress: '8/20'
        },
        { 
            name: '운동 마스터', 
            condition: '총 100회 운동 완료', 
            unlocked: false,
            icon: '👑',
            progress: '25/100'
        },
        { 
            name: '새벽 챔피언', 
            condition: '오전 6시 전 운동 10회', 
            unlocked: false,
            icon: '🌅',
            progress: '2/10'
        },
        { 
            name: '거리 정복자', 
            condition: '누적 100km 달리기', 
            unlocked: false,
            icon: '🏃',
            progress: '42/100km'
        }
    ];
    
    // 목표 리스트 렌더링
    const container = document.getElementById('achievements-list');
    
    // 달성한 목표와 미달성 목표 분리
    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const lockedAchievements = achievements.filter(a => !a.unlocked);
    
    let html = '';
    
    // 달성한 목표
    if (unlockedAchievements.length > 0) {
        html += '<h3 style="color: var(--primary-color); margin-bottom: 16px; font-size: 18px;">✅ 달성 완료</h3>';
        unlockedAchievements.forEach(achievement => {
            html += `
                <div class="achievement-card unlocked">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-info">
                        <h4 class="achievement-name">${achievement.name}</h4>
                        <p class="achievement-condition">${achievement.condition}</p>
                        ${achievement.date ? `<p class="achievement-date">달성일: ${achievement.date}</p>` : ''}
                    </div>
                    <div class="achievement-badge">
                        <i class="fas fa-trophy" style="color: #FFD700; font-size: 24px;"></i>
                    </div>
                </div>
            `;
        });
    }
    
    // 진행 중인 목표
    if (lockedAchievements.length > 0) {
        html += '<h3 style="color: var(--gray-600); margin: 32px 0 16px 0; font-size: 18px;">🎯 진행 중</h3>';
        lockedAchievements.forEach(achievement => {
            html += `
                <div class="achievement-card locked">
                    <div class="achievement-icon locked-icon">${achievement.icon}</div>
                    <div class="achievement-info">
                        <h4 class="achievement-name">${achievement.name}</h4>
                        <p class="achievement-condition">${achievement.condition}</p>
                        ${achievement.progress ? `<p class="achievement-progress">진행률: ${achievement.progress}</p>` : ''}
                    </div>
                    <div class="achievement-lock">
                        <i class="fas fa-lock" style="color: var(--gray-400); font-size: 20px;"></i>
                    </div>
                </div>
            `;
        });
    }
    
    // 목표가 하나도 없으면
    if (achievements.length === 0) {
        html = `
            <div style="text-align: center; padding: 60px 20px; color: var(--gray-400);">
                <i class="fas fa-trophy" style="font-size: 64px; margin-bottom: 16px;"></i>
                <p>아직 달성한 목표가 없습니다.</p>
                <p style="font-size: 14px; margin-top: 8px;">운동을 시작하고 목표를 달성해보세요!</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function backToProfile() {
    console.log('🔙 프로필로 돌아가기');
    
    // 모든 페이지 숨기기
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 모든 네비게이션 버튼 비활성화
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 프로필 페이지 표시
    const profilePage = document.getElementById('profile-page');
    if (profilePage) {
        profilePage.classList.add('active');
    }
    
    // 프로필 탭 활성화
    const profileBtn = document.querySelector('[data-page="profile"]');
    if (profileBtn) {
        profileBtn.classList.add('active');
    }
    
    console.log('✅ 프로필 페이지로 복귀 완료');
}

console.log('💪 운동 데이터 시스템 로드 완료!');
