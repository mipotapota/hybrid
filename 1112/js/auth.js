// ============================================
// 사용자 인증 관리
// ============================================

let currentUser = null;

// 인증 상태 감지
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        console.log('✅ 로그인됨:', user.email);
        showApp();
        loadUserData();
    } else {
        currentUser = null;
        console.log('❌ 로그아웃 상태');
        showAuth();
    }
});

// ==================== 회원가입 ====================
async function signup() {
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value.trim();
    const age = document.getElementById('signup-age').value;
    const gender = document.getElementById('signup-gender').value;

    // 유효성 검사
    if (!email || !password || !name) {
        alert('이메일, 비밀번호, 닉네임을 모두 입력해주세요.');
        return;
    }

    if (password.length < 6) {
        alert('비밀번호는 6자 이상이어야 합니다.');
        return;
    }

    try {
        // Firebase Authentication으로 회원가입
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // 사용자 프로필 정보를 Firestore에 저장
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: email,
            name: name,
            age: age ? parseInt(age) : null,
            gender: gender || null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            totalWorkouts: 0,
            achievementRate: 0,
            favoriteCount: 0,
            interests: []
        });

        console.log('✅ 회원가입 성공:', email);
        alert(`환영합니다, ${name}님! 🎉`);
        
    } catch (error) {
        console.error('❌ 회원가입 오류:', error);
        handleAuthError(error);
    }
}

// ==================== 로그인 ====================
async function login() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요.');
        return;
    }

    try {
        await auth.signInWithEmailAndPassword(email, password);
        console.log('✅ 로그인 성공:', email);
    } catch (error) {
        console.error('❌ 로그인 오류:', error);
        handleAuthError(error);
    }
}

// ==================== Google 로그인 ====================
async function loginWithGoogle() {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;

        // 처음 가입하는 사용자인 경우 프로필 생성
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (!userDoc.exists) {
            await db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                name: user.displayName || '사용자',
                photoURL: user.photoURL || null,
                age: null,
                gender: null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                totalWorkouts: 0,
                achievementRate: 0,
                favoriteCount: 0,
                interests: []
            });
        }

        console.log('✅ Google 로그인 성공:', user.email);
    } catch (error) {
        console.error('❌ Google 로그인 오류:', error);
        handleAuthError(error);
    }
}

// ==================== 로그아웃 ====================
async function logout() {
    if (confirm('로그아웃하시겠습니까?')) {
        try {
            await auth.signOut();
            console.log('✅ 로그아웃 성공');
            alert('로그아웃되었습니다.');
        } catch (error) {
            console.error('❌ 로그아웃 오류:', error);
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    }
}

// ==================== 사용자 데이터 로드 ====================
async function loadUserData() {
    if (!currentUser) return;

    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            
            // 헤더에 사용자 이름 표시
            document.getElementById('header-username').textContent = userData.name || '사용자';
            
            // 프로필 페이지 정보 업데이트
            updateProfilePage(userData);
            
            console.log('✅ 사용자 데이터 로드 완료:', userData);
        }
    } catch (error) {
        console.error('❌ 사용자 데이터 로드 오류:', error);
    }
}

// ==================== 프로필 페이지 업데이트 ====================
function updateProfilePage(userData) {
    const profileInfo = document.getElementById('profile-info');
    profileInfo.innerHTML = `
        <h3>${userData.name || '사용자'}</h3>
        <p>${userData.email}</p>
        ${userData.age ? `<p>나이: ${userData.age}세</p>` : ''}
        ${userData.gender ? `<p>성별: ${userData.gender === 'male' ? '남성' : userData.gender === 'female' ? '여성' : '기타'}</p>` : ''}
    `;

    // 통계 업데이트
    document.getElementById('total-workouts').textContent = userData.totalWorkouts || 0;
    document.getElementById('achievement-rate').textContent = `${userData.achievementRate || 0}%`;
    document.getElementById('favorite-count').textContent = userData.favoriteCount || 0;
}

// ==================== 프로필 수정 ====================
async function editProfile() {
    if (!currentUser) return;

    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const userData = userDoc.data();

    const newName = prompt('닉네임 변경:', userData.name);
    if (newName && newName.trim()) {
        try {
            await db.collection('users').doc(currentUser.uid).update({
                name: newName.trim()
            });
            alert('프로필이 업데이트되었습니다!');
            loadUserData();
        } catch (error) {
            console.error('❌ 프로필 수정 오류:', error);
            alert('프로필 수정 중 오류가 발생했습니다.');
        }
    }
}

// ==================== 오류 처리 ====================
function handleAuthError(error) {
    let message = '알 수 없는 오류가 발생했습니다.';
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            message = '이미 사용 중인 이메일입니다.';
            break;
        case 'auth/invalid-email':
            message = '올바른 이메일 형식이 아닙니다.';
            break;
        case 'auth/weak-password':
            message = '비밀번호가 너무 약합니다. (최소 6자)';
            break;
        case 'auth/user-not-found':
            message = '존재하지 않는 사용자입니다.';
            break;
        case 'auth/wrong-password':
            message = '비밀번호가 일치하지 않습니다.';
            break;
        case 'auth/too-many-requests':
            message = '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
            break;
        case 'auth/popup-closed-by-user':
            message = '로그인 창이 닫혔습니다.';
            return; // alert 표시 안 함
    }
    
    alert(message);
}

// ==================== 화면 전환 ====================
function showAuth() {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('app-screen').style.display = 'none';
}

function showApp() {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
}

// ==================== 탭 전환 ====================
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 모든 탭 비활성화
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 폼 전환
            const tab = btn.getAttribute('data-tab');
            if (tab === 'login') {
                document.getElementById('login-form').style.display = 'flex';
                document.getElementById('signup-form').style.display = 'none';
            } else {
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('signup-form').style.display = 'flex';
            }
        });
    });
});

console.log('🔐 인증 시스템 로드 완료!');
