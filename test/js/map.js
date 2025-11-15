// ============================================
// MoveON 네이버 지도 기능
// ============================================

let naverMap = null;
let currentLocationMarker = null;
let facilityMarkers = [];
let currentFacilityData = [];

// ==================== 탭 전환 ====================
function switchFacilityView(view) {
    const listContainer = document.getElementById('facility-list');
    const mapContainer = document.getElementById('facility-map-container');
    const tabs = document.querySelectorAll('.facility-tab');
    
    // 탭 활성화 상태 변경
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.closest('.facility-tab').classList.add('active');
    
    if (view === 'map') {
        // 지도 보기
        listContainer.style.display = 'none';
        mapContainer.style.display = 'block';
        
        // 지도 초기화 (처음 한 번만)
        if (!naverMap) {
            initNaverMap();
        } else {
            // 지도 크기 재조정 (숨겨져 있다가 다시 표시될 때 필요)
            setTimeout(() => {
                if (naverMap && typeof naver !== 'undefined' && naver.maps && naver.maps.Event) {
                    naver.maps.Event.trigger(naverMap, 'resize');
                }
            }, 100);
        }
    } else {
        // 목록 보기
        listContainer.style.display = 'block';
        mapContainer.style.display = 'none';
    }
}

// ==================== 네이버 지도 초기화 ====================
async function initNaverMap() {
    try {
        console.log('🗺️ 네이버 지도 초기화 시작...');
        
        // naver 객체 확인
        if (typeof naver === 'undefined' || !naver.maps) {
            console.error('❌ 네이버 지도 API를 불러올 수 없습니다.');
            showMapError('네이버 지도 API를 불러올 수 없습니다.\n\n1. 네이버 클라우드 플랫폼에서 Client ID를 확인하세요.\n2. Web 서비스 URL에 현재 주소가 등록되어 있는지 확인하세요.\n3. NAVER_MAP_SETUP.md 가이드를 참고하세요.');
            return;
        }
        
        // 사용자 현재 위치 가져오기
        const position = await getCurrentPosition();
        
        // 지도 생성
        const mapOptions = {
            center: new naver.maps.LatLng(position.lat, position.lng),
            zoom: 15,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            },
            mapTypeControl: true
        };
        
        naverMap = new naver.maps.Map('naver-map', mapOptions);
        
        console.log('✅ 지도 생성 완료');
        
        // 현재 위치 마커 표시
        addCurrentLocationMarker(position);
        
        // 시설 마커 표시
        if (currentFacilityData.length > 0) {
            addFacilityMarkers(currentFacilityData);
        }
        
    } catch (error) {
        console.error('❌ 지도 초기화 오류:', error);
        showMapError('지도를 불러올 수 없습니다.\n\n오류: ' + error.message + '\n\n네이버 클라우드 플랫폼 설정을 확인해주세요.');
    }
}

// 지도 오류 메시지 표시
function showMapError(message) {
    const mapContainer = document.getElementById('naver-map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                padding: 40px;
                text-align: center;
                color: var(--gray-600);
            ">
                <i class="fas fa-map-marked-alt" style="font-size: 64px; margin-bottom: 20px; color: var(--gray-400);"></i>
                <p style="white-space: pre-line; line-height: 1.6;">${message}</p>
                <button onclick="location.reload()" style="
                    margin-top: 20px;
                    padding: 12px 24px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                ">
                    <i class="fas fa-redo"></i> 새로고침
                </button>
            </div>
        `;
    }
}

// ==================== 현재 위치 가져오기 ====================
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            // Geolocation을 지원하지 않는 경우 서울 시청 좌표
            console.warn('⚠️ Geolocation 미지원, 기본 위치 사용');
            resolve({ lat: 37.5665, lng: 126.9780 }); // 서울 시청
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log('📍 현재 위치:', pos);
                resolve(pos);
            },
            (error) => {
                console.warn('⚠️ 위치 권한 거부 또는 오류, 기본 위치 사용');
                console.error(error);
                // 오류 시 서울 시청 좌표
                resolve({ lat: 37.5665, lng: 126.9780 });
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    });
}

// ==================== 현재 위치 마커 추가 ====================
function addCurrentLocationMarker(position) {
    if (!naverMap) return;
    
    // 기존 마커 제거
    if (currentLocationMarker) {
        currentLocationMarker.setMap(null);
    }
    
    // 파란색 원형 마커로 현재 위치 표시
    currentLocationMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(position.lat, position.lng),
        map: naverMap,
        icon: {
            content: `
                <div style="
                    width: 20px;
                    height: 20px;
                    background: #4285F4;
                    border: 3px solid white;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                "></div>
            `,
            anchor: new naver.maps.Point(10, 10)
        },
        title: '현재 위치'
    });
    
    console.log('✅ 현재 위치 마커 추가');
}

// ==================== 시설 마커 추가 ====================
function addFacilityMarkers(facilities) {
    if (!naverMap) return;
    
    // 네이버 지도 API 확인
    if (typeof naver === 'undefined' || !naver.maps) {
        console.warn('⚠️ 네이버 지도 API가 로드되지 않음');
        return;
    }
    
    // 기존 마커 모두 제거 (안전하게)
    facilityMarkers.forEach(marker => {
        try {
            if (marker && marker.setMap) {
                marker.setMap(null);
            }
        } catch (e) {
            console.warn('⚠️ 마커 제거 오류:', e);
        }
    });
    facilityMarkers = [];
    
    console.log(`📍 시설 마커 ${facilities.length}개 추가 중...`);
    
    facilities.forEach(facility => {
        // 위도/경도 확인 (latitude/longitude 또는 lat/lng 지원)
        const lat = facility.latitude || facility.lat;
        const lng = facility.longitude || facility.lng;
        
        if (!lat || !lng) {
            console.warn('⚠️ 위치 정보 없음:', facility.name);
            return;
        }
        
        // 시설 유형별 마커 색상
        let markerColor = '#3DDC97'; // 기본 초록
        if (facility.type && facility.type.includes('헬스')) {
            markerColor = '#EF4444'; // 빨강
        } else if (facility.type && facility.type.includes('수영')) {
            markerColor = '#3B82F6'; // 파랑
        }
        
        // 마커 생성
        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map: naverMap,
            icon: {
                content: `
                    <div style="
                        width: 30px;
                        height: 30px;
                        background: ${markerColor};
                        border: 3px solid white;
                        border-radius: 50%;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 14px;
                        font-weight: bold;
                    ">📍</div>
                `,
                anchor: new naver.maps.Point(15, 15)
            },
            title: facility.name
        });
        
        // 정보창 생성
        const infoWindow = new naver.maps.InfoWindow({
            content: createInfoWindowContent(facility),
            borderWidth: 0,
            backgroundColor: 'transparent',
            disableAnchor: true,
            pixelOffset: new naver.maps.Point(0, -10)
        });
        
        // 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, 'click', function() {
            // 다른 정보창 닫기
            facilityMarkers.forEach(m => {
                if (m.infoWindow) {
                    m.infoWindow.close();
                }
            });
            
            // 현재 정보창 열기
            infoWindow.open(naverMap, marker);
        });
        
        marker.infoWindow = infoWindow;
        facilityMarkers.push(marker);
    });
    
    console.log(`✅ 시설 마커 ${facilityMarkers.length}개 추가 완료`);
}

// ==================== 정보창 내용 생성 ====================
function createInfoWindowContent(facility) {
    const lat = facility.latitude || facility.lat;
    const lng = facility.longitude || facility.lng;
    
    return `
        <div class="map-info-window" style="
            background: white;
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            min-width: 200px;
        ">
            <h4 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 700; color: #1F2937;">
                ${facility.name}
            </h4>
            <p style="margin: 4px 0; font-size: 12px; color: #6B7280;">
                <i class="fas fa-map-marker-alt" style="color: #3DDC97; width: 14px;"></i> 
                ${facility.address || '주소 정보 없음'}
            </p>
            ${facility.phone ? `
                <p style="margin: 4px 0; font-size: 12px; color: #6B7280;">
                    <i class="fas fa-phone" style="color: #3DDC97; width: 14px;"></i> 
                    ${facility.phone}
                </p>
            ` : ''}
            ${facility.type ? `
                <p style="margin: 4px 0; font-size: 12px; color: #6B7280;">
                    <i class="fas fa-dumbbell" style="color: #3DDC97; width: 14px;"></i> 
                    ${facility.type}
                </p>
            ` : ''}
            <button onclick="openNaverMapDirections(${lat}, ${lng}, '${facility.name.replace(/'/g, "\\'")}')" 
                    style="
                        margin-top: 12px;
                        padding: 8px 16px;
                        background: #3DDC97;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 13px;
                        font-weight: 600;
                        cursor: pointer;
                        width: 100%;
                        transition: background 0.2s;
                    "
                    onmouseover="this.style.background='#35C785'"
                    onmouseout="this.style.background='#3DDC97'">
                <i class="fas fa-directions"></i> 길찾기
            </button>
        </div>
    `;
}

// ==================== 네이버 지도 길찾기 ====================
function openNaverMapDirections(lat, lng, name) {
    console.log('🚗 길찾기 시작:', name, `(${lat}, ${lng})`);
    
    // 모바일에서는 네이버 지도 앱으로, PC에서는 웹으로
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 네이버 지도 앱 URL Scheme
        const appUrl = `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=com.moveon`;
        
        // 앱이 없으면 웹으로 (구버전 URL - 목적지 자동 입력)
        const webUrl = `https://map.naver.com/index.nhn?elng=${lng}&elat=${lat}&etext=${encodeURIComponent(name)}&menu=route&pathType=0`;
        
        // 앱 열기 시도
        window.location.href = appUrl;
        
        // 1.5초 후에도 페이지가 그대로면 웹으로 이동
        setTimeout(() => {
            window.open(webUrl, '_blank');
        }, 1500);
    } else {
        // PC: 네이버 지도 웹에서 길찾기 (목적지 자동 입력)
        const url = `https://map.naver.com/index.nhn?elng=${lng}&elat=${lat}&etext=${encodeURIComponent(name)}&menu=route&pathType=0`;
        window.open(url, '_blank');
    }
}

// ==================== 시설 데이터 저장 (다른 파일에서 호출) ====================
function setFacilityDataForMap(facilities) {
    currentFacilityData = facilities;
    
    // 지도가 이미 초기화되어 있으면 마커 추가
    if (naverMap) {
        addFacilityMarkers(facilities);
    }
}

console.log('✨ 네이버 지도 모듈 로드 완료!');
