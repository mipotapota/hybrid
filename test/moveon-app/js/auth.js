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
            // 로그아웃 전 페이지 상태 초기화
            console.log('🔄 로그아웃 전 페이지 초기화...');
            
            // 모든 페이지 숨기기
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // 모든 네비게이션 버튼 비활성화
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 홈 페이지로 초기화
            if (typeof loadPageData === 'function') {
                currentPage = 'home';
            }
            
            // Firebase 로그아웃
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

// ==================== 프로필 수정 (모달 사용) ====================
async function editProfile() {
    if (!currentUser) return;
    
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        const userData = userDoc.data();
        
        // 현재 프로필 정보로 모달 입력창 채우기
        document.getElementById('edit-name').value = userData.name || '';
        document.getElementById('edit-age').value = userData.age || '';
        document.getElementById('edit-gender').value = userData.gender || '';
        
        // 모달 열기
        openModal('edit-profile-modal');
    } catch (error) {
        console.error('❌ 프로필 로드 오류:', error);
        alert('프로필을 불러오는 중 오류가 발생했습니다.');
    }
}

async function saveProfile() {
    const name = document.getElementById('edit-name').value.trim();
    const age = parseInt(document.getElementById('edit-age').value);
    const gender = document.getElementById('edit-gender').value;
    
    if (!name) {
        alert('이름을 입력해주세요.');
        return;
    }
    
    if (currentUser) {
        try {
            // Firestore 업데이트
            await db.collection('users').doc(currentUser.uid).update({
                name: name,
                age: age || null,
                gender: gender || null,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            console.log('✅ 프로필 업데이트 성공');
            
            // 프로필 페이지 다시 로드
            loadUserData();
            
            closeModal('edit-profile-modal');
            
            // 성공 메시지
            showToast('✅ 프로필이 업데이트되었습니다!');
        } catch (error) {
            console.error('❌ 프로필 업데이트 오류:', error);
            alert('프로필 업데이트에 실패했습니다.');
        }
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = 'position: fixed; top: 80px; left: 50%; transform: translateX(-50%); background: var(--primary-color); color: var(--gray-900); padding: 12px 24px; border-radius: 12px; font-weight: 600; z-index: 10001; animation: fadeIn 0.3s;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==================== 오류 처리 ====================
function handleAuthError(error) {
    console.error('🔴 인증 오류:', error.code, error.message);
    let message = '알 수 없는 오류가 발생했습니다.';
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            message = '⚠️ 이미 사용 중인 이메일입니다.';
            break;
        case 'auth/invalid-email':
            message = '⚠️ 올바른 이메일 형식이 아닙니다.\n예: example@email.com';
            break;
        case 'auth/weak-password':
            message = '⚠️ 비밀번호가 너무 약합니다.\n최소 6자 이상 입력해주세요.';
            break;
        case 'auth/user-not-found':
            message = '❌ 등록되지 않은 이메일입니다.\n회원가입을 먼저 진행해주세요.';
            break;
        case 'auth/wrong-password':
            message = '❌ 비밀번호가 일치하지 않습니다.\n다시 확인해주세요.';
            break;
        case 'auth/invalid-credential':
            message = '❌ 이메일 또는 비밀번호가 올바르지 않습니다.\n다시 확인해주세요.';
            break;
        case 'auth/user-disabled':
            message = '⚠️ 비활성화된 계정입니다.\n관리자에게 문의해주세요.';
            break;
        case 'auth/too-many-requests':
            message = '⚠️ 너무 많은 로그인 시도가 있었습니다.\n잠시 후 다시 시도해주세요.';
            break;
        case 'auth/network-request-failed':
            message = '⚠️ 네트워크 연결을 확인해주세요.\n인터넷 연결 상태를 확인해주세요.';
            break;
        case 'auth/popup-closed-by-user':
            message = '로그인 창이 닫혔습니다.';
            return; // alert 표시 안 함
        case 'auth/popup-blocked':
            message = '⚠️ 팝업이 차단되었습니다.\n브라우저 팝업 차단을 해제해주세요.';
            break;
        default:
            message = `⚠️ 오류가 발생했습니다.\n${error.message || '알 수 없는 오류'}`;
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
    
    // 로그인 시 항상 홈 페이지로 이동
    console.log('🏠 홈 페이지로 이동');
    
    // DOM이 준비된 후 페이지 전환
    setTimeout(() => {
        if (typeof switchPage === 'function') {
            switchPage('home');
            console.log('✅ 홈 페이지 로드 완료');
        } else {
            console.error('❌ switchPage 함수를 찾을 수 없음');
        }
        
        // 설정 초기화
        setupSettings();
        console.log('⚙️ 설정 초기화 완료');
    }, 200);
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
