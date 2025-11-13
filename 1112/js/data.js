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

// 샘플 공공체육시설 데이터 (나중에 API로 대체)
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
    if (!currentUser) {
        alert('로그인이 필요합니다.');
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
            date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
        });
        
        // 사용자 통계 업데이트
        const userRef = db.collection('users').doc(currentUser.uid);
        await userRef.update({
            totalWorkouts: firebase.firestore.FieldValue.increment(1)
        });
        
        console.log('✅ 운동 완료 기록됨:', workoutData.name);
        alert(`🎉 ${workoutData.name} 완료! 잘하셨어요!`);
        
        // 화면 새로고침
        loadTodayWorkout();
        loadWorkoutStats();
        
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
        
        // 이번 주 운동 기록 조회
        const weekWorkouts = await db.collection('workouts')
            .where('userId', '==', currentUser.uid)
            .where('completedAt', '>=', weekStart)
            .get();
        
        let totalTime = 0;
        let workoutDays = new Set();
        
        weekWorkouts.forEach(doc => {
            const data = doc.data();
            totalTime += data.duration || 0;
            workoutDays.add(data.date);
        });
        
        // 화면 업데이트
        document.getElementById('week-workouts').textContent = weekWorkouts.size;
        document.getElementById('week-time').textContent = `${totalTime}분`;
        document.getElementById('week-streak').textContent = `${workoutDays.size}일`;
        
    } catch (error) {
        console.error('❌ 통계 로드 오류:', error);
    }
}

// ==================== 시설 즐겨찾기 ====================
async function toggleFavorite(facilityId) {
    if (!currentUser) {
        alert('로그인이 필요합니다.');
        return;
    }
    
    try {
        const favoriteRef = db.collection('favorites').doc(`${currentUser.uid}_${facilityId}`);
        const doc = await favoriteRef.get();
        
        if (doc.exists) {
            // 즐겨찾기 해제
            await favoriteRef.delete();
            alert('즐겨찾기가 해제되었습니다.');
        } else {
            // 즐겨찾기 추가
            await favoriteRef.set({
                userId: currentUser.uid,
                facilityId: facilityId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert('즐겨찾기에 추가되었습니다!');
        }
        
        // 시설 목록 새로고침
        loadFacilities();
        
    } catch (error) {
        console.error('❌ 즐겨찾기 오류:', error);
        alert('즐겨찾기 처리 중 오류가 발생했습니다.');
    }
}

// ==================== 즐겨찾기 목록 보기 ====================
async function showFavorites() {
    if (!currentUser) return;
    
    try {
        const favorites = await db.collection('favorites')
            .where('userId', '==', currentUser.uid)
            .get();
        
        if (favorites.empty) {
            alert('즐겨찾기한 시설이 없습니다.');
            return;
        }
        
        const favoriteIds = favorites.docs.map(doc => doc.data().facilityId);
        const favoriteFacilities = sampleFacilities.filter(f => favoriteIds.includes(f.id));
        
        // 시설 페이지로 이동 후 즐겨찾기만 표시
        switchPage('facility');
        displayFacilities(favoriteFacilities);
        
    } catch (error) {
        console.error('❌ 즐겨찾기 로드 오류:', error);
    }
}

// ==================== 달성률 초기화 ====================
async function resetProgress() {
    if (!currentUser) return;
    
    if (!confirm('정말로 모든 운동 기록을 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
        return;
    }
    
    try {
        // 사용자의 모든 운동 기록 삭제
        const workouts = await db.collection('workouts')
            .where('userId', '==', currentUser.uid)
            .get();
        
        const batch = db.batch();
        workouts.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
        
        // 사용자 통계 초기화
        await db.collection('users').doc(currentUser.uid).update({
            totalWorkouts: 0,
            achievementRate: 0
        });
        
        alert('운동 기록이 초기화되었습니다.');
        loadUserData();
        loadWorkoutStats();
        
    } catch (error) {
        console.error('❌ 초기화 오류:', error);
        alert('초기화 중 오류가 발생했습니다.');
    }
}

// ==================== 달성 목표 보기 ====================
function showAchievements() {
    const achievements = [
        { name: '첫 운동 완료', condition: '운동 1회 완료', unlocked: true },
        { name: '꾸준함의 시작', condition: '7일 연속 운동', unlocked: false },
        { name: '한 달 챌린지', condition: '한 달간 20회 운동', unlocked: false },
        { name: '운동 마스터', condition: '총 100회 운동 완료', unlocked: false }
    ];
    
    let message = '🏆 달성한 목표\n\n';
    achievements.forEach(a => {
        message += `${a.unlocked ? '✅' : '⬜'} ${a.name}\n${a.condition}\n\n`;
    });
    
    alert(message);
}

console.log('💪 운동 데이터 시스템 로드 완료!');
