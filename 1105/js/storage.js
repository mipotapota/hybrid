/*
 * 베스킨라빈스 도감 게임 - 데이터 저장 관리
 * Team GenCoder
 */

const StorageManager = {
  // 저장소 키
  KEYS: {
    LAST_ATTENDANCE: 'lastAttendance',
    LAST_QUIZ: 'lastQuiz',
    TICKETS: 'tickets',
    NORMAL_CARDS: 'normalCards',
    LIMITED_CARDS: 'limitedCards',
    LIMITED_POINTS: 'limitedPoints', // 이달의 맛 포인트
    DUPLICATES: 'duplicates',
    NORMAL_COMPLETE: 'normalComplete',
    LIMITED_COMPLETE: 'limitedComplete',
    NORMAL_REWARD_CLAIMED: 'normalRewardClaimed',
    LIMITED_REWARD_CLAIMED: 'limitedRewardClaimed'
  },

  // 초기 데이터 설정
  initialize() {
    if (!this.getData(this.KEYS.TICKETS)) {
      this.setData(this.KEYS.TICKETS, 0); // 0장 시작 - 출석/퀴즈로 획득 유도
    }
    if (!this.getData(this.KEYS.NORMAL_CARDS)) {
      this.setData(this.KEYS.NORMAL_CARDS, []);
    }
    if (!this.getData(this.KEYS.LIMITED_CARDS)) {
      this.setData(this.KEYS.LIMITED_CARDS, []);
    }
    if (!this.getData(this.KEYS.LIMITED_POINTS)) {
      this.setData(this.KEYS.LIMITED_POINTS, 0);
    }
    if (!this.getData(this.KEYS.DUPLICATES)) {
      this.setData(this.KEYS.DUPLICATES, {});
    }
    if (!this.getData(this.KEYS.NORMAL_COMPLETE)) {
      this.setData(this.KEYS.NORMAL_COMPLETE, false);
    }
    if (!this.getData(this.KEYS.LIMITED_COMPLETE)) {
      this.setData(this.KEYS.LIMITED_COMPLETE, false);
    }
    if (!this.getData(this.KEYS.NORMAL_REWARD_CLAIMED)) {
      this.setData(this.KEYS.NORMAL_REWARD_CLAIMED, false);
    }
    if (!this.getData(this.KEYS.LIMITED_REWARD_CLAIMED)) {
      this.setData(this.KEYS.LIMITED_REWARD_CLAIMED, false);
    }
  },

  // 데이터 저장
  setData(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('저장 실패:', e);
      return false;
    }
  },

  // 데이터 불러오기
  getData(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('불러오기 실패:', e);
      return null;
    }
  },

  // 데이터 삭제
  removeData(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('삭제 실패:', e);
      return false;
    }
  },

  // 모든 데이터 초기화
  clearAll() {
    try {
      localStorage.clear();
      this.initialize();
      return true;
    } catch (e) {
      console.error('초기화 실패:', e);
      return false;
    }
  },

  // 출석 체크 가능 여부
  canAttend() {
    const lastAttendance = this.getData(this.KEYS.LAST_ATTENDANCE);
    const today = this.getTodayString();
    return !lastAttendance || lastAttendance !== today;
  },

  // 출석 체크 실행
  doAttendance() {
    if (!this.canAttend()) {
      return { success: false, message: '오늘은 이미 출석했어요!' };
    }
    
    const today = this.getTodayString();
    this.setData(this.KEYS.LAST_ATTENDANCE, today);
    this.addTickets(1);
    
    return { success: true, message: '출석 완료! 뽑기권 1장을 받았어요!' };
  },

  // 퀴즈 가능 여부
  canQuiz() {
    const lastQuiz = this.getData(this.KEYS.LAST_QUIZ);
    const today = this.getTodayString();
    return !lastQuiz || lastQuiz !== today;
  },

  // 퀴즈 완료 처리
  completeQuiz(isCorrect) {
    if (!this.canQuiz()) {
      return { success: false, message: '오늘은 이미 퀴즈를 풀었어요!' };
    }
    
    const today = this.getTodayString();
    this.setData(this.KEYS.LAST_QUIZ, today);
    
    if (isCorrect) {
      this.addTickets(1);
      return { success: true, message: '정답! 뽑기권 1장을 받았어요!' };
    } else {
      return { success: true, message: '아쉽게도 오답이에요. 내일 다시 도전하세요!' };
    }
  },

  // 뽑기권 추가
  addTickets(count) {
    const currentTickets = this.getData(this.KEYS.TICKETS) || 0;
    this.setData(this.KEYS.TICKETS, currentTickets + count);
    return currentTickets + count;
  },

  // 뽑기권 사용
  useTicket() {
    const currentTickets = this.getData(this.KEYS.TICKETS) || 0;
    if (currentTickets <= 0) {
      return { success: false, message: '뽑기권이 부족해요!' };
    }
    
    this.setData(this.KEYS.TICKETS, currentTickets - 1);
    return { success: true, remaining: currentTickets - 1 };
  },

  // 뽑기권 개수 조회
  getTickets() {
    return this.getData(this.KEYS.TICKETS) || 0;
  },

  // 카드 추가
  addCard(cardId, isLimited = false) {
    const key = isLimited ? this.KEYS.LIMITED_CARDS : this.KEYS.NORMAL_CARDS;
    const cards = this.getData(key) || [];
    
    // 이미 보유한 카드인지 확인
    const hasCard = cards.includes(cardId);
    
    if (hasCard) {
      // 중복 카드 처리
      this.addDuplicate(cardId);
      return { isNew: false, cardId };
    } else {
      // 새 카드 추가
      cards.push(cardId);
      this.setData(key, cards);
      this.checkCompletion(isLimited);
      
      // 리미티드 카드면 포인트 100 적립!
      if (isLimited) {
        this.addLimitedPoints(100);
      }
      
      return { isNew: true, cardId };
    }
  },

  // 중복 카드 추가
  addDuplicate(cardId) {
    const duplicates = this.getData(this.KEYS.DUPLICATES) || {};
    duplicates[cardId] = (duplicates[cardId] || 0) + 1;
    this.setData(this.KEYS.DUPLICATES, duplicates);
    
    // 중복 3장이면 뽑기권으로 교환
    if (duplicates[cardId] >= 3) {
      duplicates[cardId] -= 3;
      this.setData(this.KEYS.DUPLICATES, duplicates);
      this.addTickets(1);
      return true;
    }
    return false;
  },

  // 보유 카드 조회
  getCards(isLimited = false) {
    const key = isLimited ? this.KEYS.LIMITED_CARDS : this.KEYS.NORMAL_CARDS;
    return this.getData(key) || [];
  },

  // 중복 카드 조회
  getDuplicates() {
    return this.getData(this.KEYS.DUPLICATES) || {};
  },

  // 도감 완성 여부 확인
  checkCompletion(isLimited = false) {
    const key = isLimited ? this.KEYS.LIMITED_CARDS : this.KEYS.NORMAL_CARDS;
    const completeKey = isLimited ? this.KEYS.LIMITED_COMPLETE : this.KEYS.NORMAL_COMPLETE;
    const cards = this.getData(key) || [];
    const totalCards = isLimited ? limitedCards.length : normalCards.length;
    
    const isComplete = cards.length >= totalCards;
    this.setData(completeKey, isComplete);
    
    return isComplete;
  },

  // 도감 완성 여부 조회
  isComplete(isLimited = false) {
    const key = isLimited ? this.KEYS.LIMITED_COMPLETE : this.KEYS.NORMAL_COMPLETE;
    return this.getData(key) || false;
  },

  // 보상 수령 여부 조회
  hasClaimedReward(isLimited = false) {
    const key = isLimited ? this.KEYS.LIMITED_REWARD_CLAIMED : this.KEYS.NORMAL_REWARD_CLAIMED;
    return this.getData(key) || false;
  },

  // 보상 수령 처리
  claimReward(isLimited = false) {
    const key = isLimited ? this.KEYS.LIMITED_REWARD_CLAIMED : this.KEYS.NORMAL_REWARD_CLAIMED;
    this.setData(key, true);
  },

  // 오늘 날짜 문자열 반환 (YYYY-MM-DD)
  getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // 현재 월 반환
  getCurrentMonth() {
    return new Date().getMonth() + 1;
  },

  // 리미티드 포인트 추가
  addLimitedPoints(points) {
    const current = this.getLimitedPoints();
    this.setData(this.KEYS.LIMITED_POINTS, current + points);
    return current + points;
  },

  // 리미티드 포인트 조회
  getLimitedPoints() {
    return this.getData(this.KEYS.LIMITED_POINTS) || 0;
  },

  // 포인트 마일스톤 체크
  getPointMilestones() {
    const points = this.getLimitedPoints();
    return {
      milestone1: points >= 300, // 3장 (싱글 레귤러)
      milestone2: points >= 600, // 6장 (더블 레귤러)
      milestone3: points >= 900, // 9장 (파인트)
      milestone4: points >= 1200, // 12장 (아이스크림 케이크)
      currentPoints: points,
      nextMilestone: points < 300 ? 300 : points < 600 ? 600 : points < 900 ? 900 : points < 1200 ? 1200 : 1200
    };
  },

  // 진행률 계산
  getProgress(isLimited = false) {
    const cards = this.getCards(isLimited);
    const totalCards = isLimited ? limitedCards.length : normalCards.length;
    const percentage = Math.floor((cards.length / totalCards) * 100);
    
    return {
      current: cards.length,
      total: totalCards,
      percentage: percentage
    };
  },

  // 통계 데이터 조회
  getStats() {
    return {
      tickets: this.getTickets(),
      normalProgress: this.getProgress(false),
      limitedProgress: this.getProgress(true),
      limitedPoints: this.getLimitedPoints(),
      pointMilestones: this.getPointMilestones(),
      canAttend: this.canAttend(),
      canQuiz: this.canQuiz(),
      normalComplete: this.isComplete(false),
      limitedComplete: this.isComplete(true)
    };
  }
};

// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', function() {
  StorageManager.initialize();
});
