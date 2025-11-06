/*
 * 베스킨라빈스 도감 게임 - 데이터 파일
 * Team GenCoder
 */

// 기본맛 카드 데이터 (30종 - 실제 베스킨라빈스 메뉴)
// TOP 10 인기 메뉴 + 메인 플레이버 20종
const normalCards = [
  // TOP 10 인기 메뉴
  { id: 1, name: '엄마는 외계인', icon: '👽', rarity: '기본맛', description: '30년간 판매 1위! 세 가지 초콜릿 무스와 짭짤한 초코볼' },
  { id: 2, name: '아몬드 봉봉', icon: '🥜', rarity: '기본맛', description: '판매 2위! 바닐라에 초콜릿 코팅 아몬드' },
  { id: 3, name: '민트 초콜릿 칩', icon: '🌿', rarity: '기본맛', description: '판매 3위! 시원한 민트와 초콜릿 칩의 조화' },
  { id: 4, name: '슈팅스타', icon: '⭐', rarity: '기본맛', description: '판매 4위! 톡톡 터지는 팝핑 캔디' },
  { id: 5, name: '체리쥬빌레', icon: '🍒', rarity: '기본맛', description: '판매 5위! 탱글탱글 체리 과육' },
  { id: 6, name: '바람과 함께 사라지다', icon: '🌪️', rarity: '기본맛', description: '판매 6위! 딸기·블루베리·치즈케이크 조합' },
  { id: 7, name: '베리베리 스트로베리', icon: '🍓', rarity: '기본맛', description: '판매 7위! 딸기가 듬뿍' },
  { id: 8, name: '레인보우 샤베트', icon: '🌈', rarity: '기본맛', description: '판매 8위! 알록달록 다섯 가지 과일' },
  { id: 9, name: '31요거트', icon: '🥛', rarity: '기본맛', description: '판매 9위! 상큼한 요거트' },
  { id: 10, name: '피스타치오 아몬드', icon: '🥜', rarity: '기본맛', description: '판매 10위! 고급스러운 피스타치오' },
  
  // 메인 플레이버 (나머지 20종)
  { id: 11, name: '사랑에 빠진 딸기', icon: '💕', rarity: '기본맛', description: '달콤한 딸기와 화이트 초콜릿' },
  { id: 12, name: '바닐라', icon: '🍦', rarity: '기본맛', description: '클래식한 바닐라' },
  { id: 13, name: '월넛', icon: '🌰', rarity: '기본맛', description: '고소한 호두' },
  { id: 14, name: '자모카 아몬드 훠지', icon: '☕', rarity: '기본맛', description: '커피와 아몬드 훠지' },
  { id: 15, name: '초콜릿 무스', icon: '🍫', rarity: '기본맛', description: '부드러운 초콜릿 무스' },
  { id: 16, name: '초콜릿', icon: '🍫', rarity: '기본맛', description: '진한 초콜릿' },
  { id: 17, name: '쿠키앤크림', icon: '🍪', rarity: '기본맛', description: '오레오 쿠키가 듬뿍' },
  { id: 18, name: '초코나무 숲', icon: '🌳', rarity: '기본맛', description: '초콜릿과 브라우니' },
  { id: 19, name: '이상한 나라의 솜사탕', icon: '🎪', rarity: '기본맛', description: '달콤한 솜사탕' },
  { id: 20, name: '그린티', icon: '🍵', rarity: '기본맛', description: '은은한 녹차향' },
  
  // 추가 인기 메뉴
  { id: 21, name: '뉴욕 치즈케이크', icon: '🧀', rarity: '기본맛', description: '진한 치즈케이크' },
  { id: 22, name: '오레오 쿠키 앤 크림', icon: '🍪', rarity: '기본맛', description: '진짜 오레오가 들어간' },
  { id: 23, name: '봉쥬르 마카롱', icon: '🥐', rarity: '기본맛', description: '마카롱이 들어간' },
  { id: 24, name: '우주라이크 봉봉', icon: '🌌', rarity: '기본맛', description: '2024 신제품! 엄마는외계인+아몬드봉봉' },
  { id: 25, name: '아몬드 봉봉봉', icon: '🥜', rarity: '기본맛', description: '아몬드 30% 더 많이!' },
  { id: 26, name: '사랑에 빠진 외계인', icon: '💝', rarity: '기본맛', description: '엄마는외계인+사랑에빠진딸기' },
  { id: 27, name: '아빠는 딸바봉', icon: '👨', rarity: '기본맛', description: '딸기와 초콜릿 퍼지' },
  { id: 28, name: '캐러멜 센세이션', icon: '🍮', rarity: '기본맛', description: '달콤한 캐러멜' },
  { id: 29, name: '블루베리 요거트', icon: '🫐', rarity: '기본맛', description: '상큼한 블루베리 요거트' },
  { id: 30, name: '초코칩', icon: '🍪', rarity: '기본맛', description: '바닐라에 초코칩' },
];

// 리미티드 카드 데이터 (12종 - 이달의 맛만)
const limitedCards = [
  { id: 101, name: '1월 - 딸기 치즈 케이크', icon: '🍓', rarity: '이달의 맛', month: 1, points: 100, description: '새해를 여는 달콤한 딸기 치즈케이크' },
  { id: 102, name: '2월 - 초콜릿 러브', icon: '💝', rarity: '이달의 맛', month: 2, points: 100, description: '발렌타인 특별 초콜릿' },
  { id: 103, name: '3월 - 봄봄 딸기', icon: '🌸', rarity: '이달의 맛', month: 3, points: 100, description: '봄의 상큼한 딸기' },
  { id: 104, name: '4월 - 벚꽃 스트로베리', icon: '🌸', rarity: '이달의 맛', month: 4, points: 100, description: '벚꽃이 담긴 딸기' },
  { id: 105, name: '5월 - 그린티 라떼', icon: '🍵', rarity: '이달의 맛', month: 5, points: 100, description: '깔끔한 녹차 라떼' },
  { id: 106, name: '6월 - 망고 탱고', icon: '🥭', rarity: '이달의 맛', month: 6, points: 100, description: '트로피컬 망고의 향연' },
  { id: 107, name: '7월 - 여름 수박', icon: '🍉', rarity: '이달의 맛', month: 7, points: 100, description: '시원한 여름 수박' },
  { id: 108, name: '8월 - 복숭아 아이스티', icon: '🍑', rarity: '이달의 맛', month: 8, points: 100, description: '복숭아 향 아이스티' },
  { id: 109, name: '9월 - 밤 라떼', icon: '🌰', rarity: '이달의 맛', month: 9, points: 100, description: '고소한 가을 밤' },
  { id: 110, name: '10월 - 호박 파이', icon: '🎃', rarity: '이달의 맛', month: 10, points: 100, description: '할로윈 호박 파이' },
  { id: 111, name: '11월 - 고구마 라떼', icon: '🍠', rarity: '이달의 맛', month: 11, points: 100, description: '따뜻한 고구마 라떼' },
  { id: 112, name: '12월 - 크리스마스 케이크', icon: '🎄', rarity: '이달의 맛', month: 12, points: 100, description: '크리스마스 특별 케이크' },
];

// 보상 제품 데이터 (기본맛 도감 완성 보상)
const rewardProducts = [
  { id: 1, name: '싱글 레귤러', price: 3900, probability: 39 },
  { id: 2, name: '싱글 킹', price: 4700, probability: 24 },
  { id: 3, name: '더블 주니어', price: 5100, probability: 14 },
  { id: 4, name: '트리플 주니어', price: 7200, probability: 8 },
  { id: 5, name: '더블 레귤러', price: 7300, probability: 7 },
  { id: 6, name: '파인트', price: 9800, probability: 3 },
  { id: 7, name: '쿼터', price: 18500, probability: 1.5 },
  { id: 8, name: '패밀리', price: 26000, probability: 0.4 },
  { id: 9, name: '하프갤론', price: 31500, probability: 0.09 },
  { id: 10, name: '💎 40,000원 기프티콘 💎', price: 40000, probability: 0.01 }, // 전설 등급!
];

// 퀴즈 데이터 (30개 이상)
const quizData = [
  {
    id: 1,
    question: '베스킨라빈스의 로고에 숨어있는 숫자는 무엇일까요?',
    options: ['13', '21', '31', '51'],
    answer: 2,
    explanation: '31가지 맛을 의미하는 숫자 31이 B와 R 사이에 숨어있어요!'
  },
  {
    id: 2,
    question: '베스킨라빈스는 몇 년도에 창립되었을까요?',
    options: ['1935년', '1945년', '1955년', '1965년'],
    answer: 1,
    explanation: '베스킨라빈스는 1945년에 창립되었어요!'
  },
  {
    id: 3,
    question: '베스킨라빈스의 대표 아이스크림 "엄마는 외계인"의 영어 이름은?',
    options: ['Alien Mom', 'Mom is an Alien', 'Love Potion #31', 'Space Mom'],
    answer: 2,
    explanation: 'Love Potion #31이 정식 영어 이름이에요!'
  },
  {
    id: 4,
    question: '베스킨라빈스의 브랜드 컬러는 무엇일까요?',
    options: ['빨강과 파랑', '핑크와 브라운', '초록과 노랑', '보라와 주황'],
    answer: 1,
    explanation: '핑크와 브라운이 베스킨라빈스의 시그니처 컬러예요!'
  },
  {
    id: 5,
    question: '베스킨라빈스의 창립자 이름이 아닌 것은?',
    options: ['버트 배스킨', '어바인 라빈스', '존 베라', '이 중 없음'],
    answer: 2,
    explanation: '버트 배스킨과 어바인 라빈스 두 분이 창립자예요!'
  },
  {
    id: 6,
    question: '베스킨라빈스에서 매달 새롭게 출시하는 아이스크림은?',
    options: ['주간의 맛', '이달의 맛', '계절의 맛', '올해의 맛'],
    answer: 1,
    explanation: '매달 새로운 "이달의 맛"이 출시됩니다!'
  },
  {
    id: 7,
    question: '민트 초코칩 아이스크림에 들어있는 초콜릿은 무슨 색일까요?',
    options: ['흰색', '갈색', '검정색', '초록색'],
    answer: 1,
    explanation: '다크 초콜릿 칩이라서 갈색~검은색이에요!'
  },
  {
    id: 8,
    question: '베스킨라빈스에서 가장 작은 사이즈는?',
    options: ['미니', '싱글 레귤러', '더블 주니어', '키즈'],
    answer: 1,
    explanation: '싱글 레귤러가 가장 작은 컵 사이즈예요!'
  },
  {
    id: 9,
    question: '베스킨라빈스 아이스크림 케이크 중 원하는 맛을 골라 담을 수 있는 제품은?',
    options: ['픽미업', '와츄원', '유어초이스', '마이케이크'],
    answer: 1,
    explanation: '와츄원(What You Want)은 원하는 맛을 선택할 수 있어요!'
  },
  {
    id: 10,
    question: '베스킨라빈스의 본사는 어느 나라에 있을까요?',
    options: ['한국', '미국', '영국', '프랑스'],
    answer: 1,
    explanation: '미국 캘리포니아에서 시작되었어요!'
  },
  {
    id: 11,
    question: '베스킨라빈스에서 시식을 위해 제공하는 작은 분홍색 스푼의 이름은?',
    options: ['테이스팅 스푼', '샘플 스푼', '베라 스푼', '핑크 스푼'],
    answer: 2,
    explanation: '핑크색 베라 스푼으로 맛을 볼 수 있어요!'
  },
  {
    id: 12,
    question: '쿠키앤크림 아이스크림의 주재료 쿠키는?',
    options: ['초코칩 쿠키', '오레오', '마카롱', '다이제스티브'],
    answer: 1,
    explanation: '오레오 쿠키가 들어가요!'
  },
  {
    id: 13,
    question: '베스킨라빈스의 31은 무엇을 의미할까요?',
    options: ['창립 년도', '한 달 동안 매일 다른 맛', '지점 수', '직원 수'],
    answer: 1,
    explanation: '한 달 31일 동안 매일 다른 맛을 즐기자는 의미예요!'
  },
  {
    id: 14,
    question: '레인보우 샤베트는 몇 가지 색깔로 이루어져 있을까요?',
    options: ['3가지', '5가지', '7가지', '9가지'],
    answer: 1,
    explanation: '빨주노초파 5가지 색깔이에요!'
  },
  {
    id: 15,
    question: '베스킨라빈스에서 가장 큰 사이즈의 핸드팩은?',
    options: ['쿼터', '패밀리', '하프갤론', '파인트'],
    answer: 2,
    explanation: '하프갤론이 가장 큰 사이즈예요!'
  },
  {
    id: 16,
    question: '베스킨라빈스 로고의 \'BR\' 은 무엇의 약자일까요?',
    options: ['Best Robbins', 'Baskin Robbins', 'Berry Rich', 'Brown Pink'],
    answer: 1,
    explanation: 'Baskin Robbins의 약자예요!'
  },
  {
    id: 17,
    question: '아이스크림을 담는 콘(Cone)의 모양은?',
    options: ['원뿔', '원기둥', '구', '정육면체'],
    answer: 0,
    explanation: '와플콘은 원뿔 모양이에요!'
  },
  {
    id: 18,
    question: '베스킨라빈스에서 아이스크림 2가지 맛을 고를 수 있는 사이즈는?',
    options: ['싱글', '더블 주니어', '트리플', '쿼드'],
    answer: 1,
    explanation: '더블 주니어나 더블 레귤러에서 2가지를 선택할 수 있어요!'
  },
  {
    id: 19,
    question: '베스킨라빈스의 슬로건은 무엇일까요?',
    options: ['Just Do It', 'Seize the Yay', 'Think Different', 'Have a Break'],
    answer: 1,
    explanation: 'Seize the Yay! 작은 기쁨도 즐기자는 의미예요!'
  },
  {
    id: 20,
    question: '녹차 아이스크림의 영어 이름은?',
    options: ['Green Tea', 'Matcha', 'Tea Ice', 'Green Cream'],
    answer: 0,
    explanation: 'Green Tea가 정확한 영어 이름이에요!'
  },
  {
    id: 21,
    question: '베스킨라빈스에서 아이스크림 3가지 맛을 고를 수 있는 제품은?',
    options: ['더블 레귤러', '트리플 주니어', '패밀리', '모두 가능'],
    answer: 1,
    explanation: '트리플 주니어는 3가지 맛을 선택할 수 있어요!'
  },
  {
    id: 22,
    question: '아몬드 봉봉 아이스크림의 특징은?',
    options: ['아몬드만 들어있다', '초콜릿 코팅이 되어있다', '봉봉 캔디가 들어있다', '봉봉이 그려져있다'],
    answer: 1,
    explanation: '초콜릿으로 코팅된 아몬드가 들어있어요!'
  },
  {
    id: 23,
    question: '베스킨라빈스의 주력 제품이 아닌 것은?',
    options: ['아이스크림', '아이스크림 케이크', '도넛', '블라스트'],
    answer: 2,
    explanation: '도넛은 던킨도너츠의 제품이에요!'
  },
  {
    id: 24,
    question: '베스킨라빈스 한국의 첫 매장은 어디에 오픈했을까요?',
    options: ['명동', '강남', '종로', '이태원'],
    answer: 0,
    explanation: '1986년 명동에 1호점이 오픈했어요!'
  },
  {
    id: 25,
    question: '파인트는 몇 가지 맛을 담을 수 있을까요?',
    options: ['1가지', '2가지', '3가지', '4가지'],
    answer: 2,
    explanation: '파인트는 3가지 맛을 담을 수 있어요!'
  },
  {
    id: 26,
    question: '베스킨라빈스에서 음료에 아이스크림을 넣은 제품은?',
    options: ['블라스트', '쉐이크', '스무디', '프라페'],
    answer: 0,
    explanation: '블라스트는 음료와 아이스크림을 섞은 제품이에요!'
  },
  {
    id: 27,
    question: '체리쥬빌레의 \'쥬빌레\'는 무슨 뜻일까요?',
    options: ['주스', '축제', '젤리', '체리'],
    answer: 1,
    explanation: '쥬빌레(Jubilee)는 축제라는 뜻이에요!'
  },
  {
    id: 28,
    question: '베스킨라빈스 아이스크림의 주 원료는?',
    options: ['우유', '물', '크림', '설탕'],
    answer: 0,
    explanation: '신선한 우유가 주 원료예요!'
  },
  {
    id: 29,
    question: '베스킨라빈스에서 아이스크림 6가지 맛을 담을 수 있는 제품은?',
    options: ['패밀리', '하프갤론', '쿼터', '불가능'],
    answer: 1,
    explanation: '하프갤론은 최대 6가지 맛을 선택할 수 있어요!'
  },
  {
    id: 30,
    question: '베스킨라빈스의 \'이상한 나라의 솜사탕\' 맛의 특징은?',
    options: ['솜사탕이 들어있다', '분홍색이다', '톡톡 터진다', '모두 맞다'],
    answer: 3,
    explanation: '분홍색에 톡톡 터지는 캔디가 들어있어요!'
  },
  {
    id: 31,
    question: '쿼터는 몇 가지 맛을 담을 수 있을까요?',
    options: ['2가지', '3가지', '4가지', '5가지'],
    answer: 2,
    explanation: '쿼터는 4가지 맛을 담을 수 있어요!'
  },
  {
    id: 32,
    question: '베스킨라빈스의 매장 수는 전 세계적으로 약 몇 개일까요?',
    options: ['1,000개', '3,000개', '5,000개', '7,000개 이상'],
    answer: 3,
    explanation: '전 세계 50여 개국에 7,800개 이상의 매장이 있어요!'
  },
  {
    id: 33,
    question: '패밀리 사이즈는 몇 가지 맛을 담을 수 있을까요?',
    options: ['3가지', '4가지', '5가지', '6가지'],
    answer: 2,
    explanation: '패밀리는 5가지 맛을 선택할 수 있어요!'
  },
  {
    id: 34,
    question: '베스킨라빈스 한국에 첫 매장이 오픈한 년도는?',
    options: ['1976년', '1986년', '1996년', '2006년'],
    answer: 1,
    explanation: '1986년에 한국에 첫 매장이 오픈했어요!'
  },
  {
    id: 35,
    question: '베스킨라빈스의 대표 제품이 아닌 것은?',
    options: ['프레셔스 모먼트', '하드팩', '블라스트', '프라푸치노'],
    answer: 3,
    explanation: '프라푸치노는 스타벅스의 제품이에요!'
  }
];