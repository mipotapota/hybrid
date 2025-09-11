// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Audio Player (for Home page)
    const audioBtn = document.getElementById('audio-btn');
    const audioPlayer = document.getElementById('audio-player');
    const audioIcon = document.getElementById('audio-icon');
    
    if (audioBtn && audioPlayer && audioIcon) {
        let isPlaying = false;
        
        audioBtn.addEventListener('click', function() {
            if (isPlaying) {
                audioPlayer.pause();
                audioIcon.className = 'fas fa-play';
                isPlaying = false;
            } else {
                audioPlayer.play();
                audioIcon.className = 'fas fa-pause';
                isPlaying = true;
            }
        });
        
        audioPlayer.addEventListener('ended', function() {
            audioIcon.className = 'fas fa-play';
            isPlaying = false;
        });
        
        audioPlayer.addEventListener('error', function() {
            console.log('Audio file not found or cannot be played');
        });
    }
    
    // Video Player (for Apps page)
    const videoBtn = document.getElementById('video-btn');
    const appVideo = document.getElementById('app-video');
    const videoIcon = document.getElementById('video-icon');
    const videoOverlay = document.getElementById('video-overlay');
    
    if (videoBtn && appVideo && videoIcon && videoOverlay) {
        let isVideoPlaying = false;
        
        videoBtn.addEventListener('click', function() {
            if (isVideoPlaying) {
                appVideo.pause();
                videoIcon.className = 'fas fa-play';
                videoOverlay.classList.remove('hidden');
                isVideoPlaying = false;
            } else {
                appVideo.play();
                videoIcon.className = 'fas fa-pause';
                videoOverlay.classList.add('hidden');
                isVideoPlaying = true;
            }
        });
        
        appVideo.addEventListener('ended', function() {
            videoIcon.className = 'fas fa-play';
            videoOverlay.classList.remove('hidden');
            isVideoPlaying = false;
        });
        
        appVideo.addEventListener('play', function() {
            videoOverlay.classList.add('hidden');
        });
        
        appVideo.addEventListener('pause', function() {
            if (!appVideo.ended) {
                videoOverlay.classList.remove('hidden');
            }
        });
        
        appVideo.addEventListener('error', function() {
            console.log('Video file not found or cannot be played');
        });
    }
    
    // Video Player (for Busking page)
    const buskingVideoBtn = document.getElementById('busking-video-btn');
    const buskingVideo = document.getElementById('busking-video');
    const buskingVideoIcon = document.getElementById('busking-video-icon');
    const buskingVideoOverlay = document.getElementById('busking-video-overlay');
    
    if (buskingVideoBtn && buskingVideo && buskingVideoIcon && buskingVideoOverlay) {
        let isBuskingVideoPlaying = false;
        
        buskingVideoBtn.addEventListener('click', function() {
            if (isBuskingVideoPlaying) {
                buskingVideo.pause();
                buskingVideoIcon.className = 'fas fa-play';
                buskingVideoOverlay.classList.remove('hidden');
                isBuskingVideoPlaying = false;
            } else {
                buskingVideo.play();
                buskingVideoIcon.className = 'fas fa-pause';
                buskingVideoOverlay.classList.add('hidden');
                isBuskingVideoPlaying = true;
            }
        });
        
        buskingVideo.addEventListener('ended', function() {
            buskingVideoIcon.className = 'fas fa-play';
            buskingVideoOverlay.classList.remove('hidden');
            isBuskingVideoPlaying = false;
        });
        
        buskingVideo.addEventListener('play', function() {
            buskingVideoOverlay.classList.add('hidden');
        });
        
        buskingVideo.addEventListener('pause', function() {
            if (!buskingVideo.ended) {
                buskingVideoOverlay.classList.remove('hidden');
            }
        });
        
        buskingVideo.addEventListener('error', function() {
            console.log('Video file not found or cannot be played');
        });
    }
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.about-card, .feature-card, .tech-card, .highlight-card, .style-card').forEach(el => {
        observer.observe(el);
    });
    
    // Contact button functionality
    const contactBtns = document.querySelectorAll('.btn-primary');
    contactBtns.forEach(btn => {
        if (btn.textContent.includes('연락하기')) {
            btn.addEventListener('click', function() {
                window.location.href = 'mailto:mipotapota@gmail.com';
            });
        }
    });
});