// DOM 요소들 가져오기
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = document.querySelectorAll('.nav-menu a');

// 페이지 표시 함수
function showPage(pageId) {
    console.log('Showing page:', pageId); // 디버깅용
    
    // 모든 페이지 숨기기
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 선택된 페이지 보여주기
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        console.error('Page not found:', pageId);
    }
    
    // 메뉴 닫기
    closeMenu();
}

// 메뉴 열기/닫기 함수
function toggleMenu() {
    console.log('Toggle menu clicked'); // 디버깅용
    
    if (!hamburger || !navMenu || !menuOverlay) {
        console.error('Menu elements not found');
        return;
    }
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

// 메뉴 닫기 함수
function closeMenu() {
    if (!hamburger || !navMenu || !menuOverlay) {
        return;
    }
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
}

// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // 디버깅용
    
    // 요소들이 제대로 선택되었는지 확인
    if (!hamburger) {
        console.error('Hamburger element not found');
        return;
    }
    if (!navMenu) {
        console.error('Nav menu element not found');
        return;
    }
    if (!menuOverlay) {
        console.error('Menu overlay element not found');
        return;
    }
    
    // 햄버거 메뉴 클릭 이벤트
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Hamburger clicked'); // 디버깅용
        toggleMenu();
    });

    // 오버레이 클릭시 메뉴 닫기
    menuOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Overlay clicked'); // 디버깅용
        closeMenu();
    });

    // 메뉴 링크 클릭 이벤트
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            console.log('Menu link clicked:', pageId); // 디버깅용
            showPage(pageId);
        });
    });
    
    // 초기 페이지 설정
    showPage('intro');
    
    // 미디어 파일 에러 처리
    const audioElements = document.querySelectorAll('audio');
    const videoElements = document.querySelectorAll('video');
    
    audioElements.forEach(function(audio) {
        audio.addEventListener('error', function() {
            console.log('오디오 파일 로드 에러:', audio.src);
            const parent = audio.parentElement;
            const errorMsg = document.createElement('p');
            errorMsg.style.color = '#ff6b6b';
            errorMsg.style.fontStyle = 'italic';
            errorMsg.style.marginTop = '1rem';
            errorMsg.textContent = '오디오 파일을 찾을 수 없습니다. media 폴더에 파일이 있는지 확인해주세요.';
            parent.appendChild(errorMsg);
        });
    });
    
    videoElements.forEach(function(video) {
        video.addEventListener('error', function() {
            console.log('비디오 파일 로드 에러:', video.src);
            const parent = video.parentElement;
            const errorMsg = document.createElement('p');
            errorMsg.style.color = '#ff6b6b';
            errorMsg.style.fontStyle = 'italic';
            errorMsg.style.marginTop = '1rem';
            errorMsg.textContent = '비디오 파일을 찾을 수 없습니다. media 폴더에 파일이 있는지 확인해주세요.';
            parent.appendChild(errorMsg);
        });
    });
});

// 스크롤 이벤트 (선택사항)
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav-container');
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// ESC 키로 메뉴 닫기 (추가 기능)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// 윈도우 리사이즈시 메뉴 상태 초기화 (추가 기능)
window.addEventListener('resize', function() {
    // 화면 크기가 변할 때 메뉴 닫기
    closeMenu();
});