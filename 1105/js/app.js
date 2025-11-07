/*
 * 베스킨라빈스 도감 게임 - 메인 앱 로직
 * Team GenCoder - "상상은 우리가, 코드는 AI가!"
 */

const App = {
  // 앱 초기화
  init() {
    console.log('베스킨라빈스 도감 게임 시작!');
    StorageManager.initialize();
    this.updateUI();
  },

  // UI 업데이트
  updateUI() {
    const stats = StorageManager.getStats();
    
    // 뽑기권 개수 업데이트
    const ticketElements = document.querySelectorAll('.ticket-count');
    ticketElements.forEach(el => {
      el.textContent = stats.tickets;
    });
    
    // 진행률 업데이트
    this.updateProgress('normal-progress', stats.normalProgress);
    this.updateProgress('limited-progress', stats.limitedProgress);
    
    // 버튼 상태 업데이트
    this.updateButtonStates(stats);
  },

  // 진행률 바 업데이트
  updateProgress(elementId, progress) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    const fill = container.querySelector('.progress-fill');
    const label = container.querySelector('.progress-label span:last-child');
    
    if (fill) {
      fill.style.width = `${progress.percentage}%`;
      fill.textContent = `${progress.percentage}%`;
    }
    
    if (label) {
      label.textContent = `${progress.current}/${progress.total}`;
    }
  },

  // 버튼 상태 업데이트
  updateButtonStates(stats) {
    // 출석 버튼
    const attendBtn = document.getElementById('attend-btn');
    if (attendBtn) {
      if (!stats.canAttend) {
        attendBtn.classList.add('btn-disabled');
        attendBtn.disabled = true;
        attendBtn.textContent = '오늘 출석 완료!';
      }
    }
    
    // 퀴즈 버튼
    const quizBtn = document.getElementById('quiz-btn');
    if (quizBtn) {
      if (!stats.canQuiz) {
        quizBtn.classList.add('btn-disabled');
        quizBtn.disabled = true;
        quizBtn.textContent = '오늘 퀴즈 완료!';
      }
    }
    
    // 뽑기 버튼
    const gachaBtn = document.getElementById('gacha-btn');
    if (gachaBtn) {
      if (stats.tickets <= 0) {
        gachaBtn.classList.add('btn-disabled');
        gachaBtn.disabled = true;
      } else {
        gachaBtn.classList.remove('btn-disabled');
        gachaBtn.disabled = false;
      }
    }
  },

  // 출석 체크
  doAttendance() {
    const result = StorageManager.doAttendance();
    
    if (result.success) {
      this.showAlert('success', result.message);
      this.updateUI();
    } else {
      this.showAlert('info', result.message);
    }
  },

  // 랜덤 퀴즈 가져오기
  getRandomQuiz() {
    const randomIndex = Math.floor(Math.random() * quizData.length);
    return quizData[randomIndex];
  },

  // 퀴즈 시작
  startQuiz() {
    if (!StorageManager.canQuiz()) {
      this.showAlert('info', '오늘은 이미 퀴즈를 풀었어요!');
      return;
    }
    
    const quiz = this.getRandomQuiz();
    this.displayQuiz(quiz);
  },

  // 퀴즈 표시
  displayQuiz(quiz) {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
    
    quizContainer.innerHTML = `
      <div class="quiz-question">
        ${quiz.question}
      </div>
      <div class="quiz-options" id="quiz-options">
        ${quiz.options.map((option, index) => `
          <button class="quiz-option" onclick="App.selectAnswer(${index}, ${quiz.answer}, '${quiz.explanation}')">
            ${option}
          </button>
        `).join('')}
      </div>
    `;
  },

  // 답 선택
  selectAnswer(selected, correct, explanation) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
      option.disabled = true;
      if (index === correct) {
        option.classList.add('correct');
      } else if (index === selected && selected !== correct) {
        option.classList.add('wrong');
      }
    });
    
    const isCorrect = selected === correct;
    const result = StorageManager.completeQuiz(isCorrect);
    
    setTimeout(() => {
      this.showModal(
        isCorrect ? '정답입니다! 🎉' : '아쉽네요! 😢',
        explanation + '<br><br>' + result.message
      );
      this.updateUI();
    }, 1000);
  },

  // 뽑기 실행
  doGacha() {
    const useResult = StorageManager.useTicket();
    
    if (!useResult.success) {
      this.showAlert('error', useResult.message);
      return;
    }
    
    // 애니메이션 표시
    this.showGachaAnimation();
    
    // 카드 뽑기 (확률 계산)
    setTimeout(() => {
      const card = this.drawCard();
      this.showCardResult(card);
      this.updateUI();
    }, 2000);
  },

  // 카드 뽑기 로직
  drawCard() {
    const currentMonth = StorageManager.getCurrentMonth();
    
    // 리미티드 카드 확률 (5%)
    const isLimited = Math.random() < 0.05;
    
    if (isLimited) {
      // 이달의 맛 카드 (현재 월)
      const monthCard = limitedCards.find(card => card.month === currentMonth);
      if (monthCard) {
        const result = StorageManager.addCard(monthCard.id, true);
        return { ...monthCard, isNew: result.isNew, isLimited: true };
      }
    }
    
    // 기본맛 카드 뽑기 (95%)
    const randomIndex = Math.floor(Math.random() * normalCards.length);
    const card = normalCards[randomIndex];
    const result = StorageManager.addCard(card.id, false);
    
    return { ...card, isNew: result.isNew, isLimited: false };
  },

  // 뽑기 애니메이션 표시
  showGachaAnimation() {
    const container = document.getElementById('gacha-result');
    if (!container) return;
    
    container.innerHTML = `
      <div class="gacha-machine">
        <div class="gacha-ball">❓</div>
      </div>
      <p style="text-align: center; font-size: 18px; font-weight: bold; color: var(--pink-main);">
        카드를 뽑는 중...
      </p>
    `;
  },

  // 카드 결과 표시
  showCardResult(card) {
    const container = document.getElementById('gacha-result');
    if (!container) return;
    
    const duplicates = StorageManager.getDuplicates();
    const dupCount = duplicates[card.id] || 0;
    const cardClass = card.isLimited ? 'limited-glow' : '';
    const animationClass = card.isNew ? 'card-appear' : 'slide-in';
    
    // 포인트 획득 애니메이션 (리미티드 + NEW)
    if (card.isLimited && card.isNew) {
      this.showPointsAnimation('+100pt 💎');
    }
    
    container.innerHTML = `
      <div class="card-reveal ${animationClass}">
        ${card.isNew ? '<div class="new-badge pulse-effect">✨ NEW ✨</div>' : ''}
        ${!card.isNew ? `<div class="alert alert-info slide-in">중복 카드! (${dupCount}/3)</div>` : ''}
        <div class="${cardClass}" style="position: relative; padding: 20px; border-radius: 20px; ${card.isLimited ? 'background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,165,0,0.1));' : ''}">
          <div class="card-image" style="font-size: 100px; ${card.isNew ? 'animation: bounce 1s ease-in-out;' : ''}">${card.icon}</div>
          <div class="card-name" style="font-size: 24px; font-weight: bold; margin: 15px 0;">${card.name}</div>
          <div class="card-description" style="color: var(--gray-dark); margin-bottom: 15px;">${card.description}</div>
          <div class="card-rarity" style="display: inline-block; padding: 8px 20px; border-radius: 25px; background: ${card.isLimited ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'var(--pink-light)'}; color: ${card.isLimited ? 'white' : 'var(--brown-main)'}; font-weight: bold; ${card.isLimited ? 'box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);' : ''}">
            ${card.isLimited ? '💎 ' : ''}${card.rarity}
          </div>
          ${card.isLimited && card.isNew ? '<div style="margin-top: 15px; font-size: 20px; color: #FFD700; font-weight: bold; animation: pulse 1s ease-in-out infinite;">💎 +100 포인트 획득!</div>' : ''}
        </div>
        ${dupCount >= 3 ? '<div class="alert alert-success bounce-effect" style="margin-top: 15px;">🎉 중복 3장 달성! 뽑기권 1장으로 교환되었습니다!</div>' : ''}
      </div>
    `;
    
    // 도감 완성 체크
    if (card.isNew) {
      setTimeout(() => {
        this.checkCollectionComplete();
      }, 1500);
    }
  },

  // 도감 완성 확인
  checkCollectionComplete() {
    const normalComplete = StorageManager.isComplete(false);
    const limitedComplete = StorageManager.isComplete(true);
    const normalClaimed = StorageManager.hasClaimedReward(false);
    const limitedClaimed = StorageManager.hasClaimedReward(true);
    
    if (normalComplete && !normalClaimed) {
      this.showModal(
        '🎊 일반 도감 완성! 🎊',
        '축하합니다! 일반 도감을 모두 완성했어요!<br>보상 페이지에서 기프티콘을 받아가세요!'
      );
    }
    
    if (limitedComplete && !limitedClaimed) {
      this.showModal(
        '🏆 리미티드 도감 완성! 🏆',
        '대단해요! 리미티드 도감까지 완성했어요!<br>보상 페이지에서 아이스크림 케이크를 받아가세요!'
      );
    }
  },

  // 포인트 획득 애니메이션
  showPointsAnimation(text) {
    const pointsEl = document.createElement('div');
    pointsEl.className = 'points-animation';
    pointsEl.textContent = text;
    pointsEl.style.position = 'fixed';
    pointsEl.style.left = '50%';
    pointsEl.style.top = '30%';
    pointsEl.style.transform = 'translateX(-50%)';
    pointsEl.style.zIndex = '99999';
    document.body.appendChild(pointsEl);
    
    setTimeout(() => {
      pointsEl.remove();
    }, 1500);
  },

  // 도감 표시
  displayCollection(isLimited = false) {
    const container = document.getElementById('collection-grid');
    if (!container) return;
    
    const cards = isLimited ? limitedCards : normalCards;
    const ownedCards = StorageManager.getCards(isLimited);
    const duplicates = StorageManager.getDuplicates();
    
    container.innerHTML = cards.map(card => {
      const owned = ownedCards.includes(card.id);
      const dupCount = duplicates[card.id] || 0;
      
      return `
        <div class="collection-card ${owned ? '' : 'locked'}">
          ${owned && dupCount > 0 ? `<div class="duplicate-badge">${dupCount}</div>` : ''}
          <div class="card-image">${owned ? card.icon : '🔒'}</div>
          <div class="card-name">${owned ? card.name : '???'}</div>
          <div class="card-rarity">${owned ? card.rarity : '미발견'}</div>
        </div>
      `;
    }).join('');
  },

  // 보상 뽑기 (확률형)
  claimNormalReward() {
    if (StorageManager.hasClaimedReward(false)) {
      this.showAlert('info', '이미 보상을 받았어요!');
      return;
    }
    
    if (!StorageManager.isComplete(false)) {
      this.showAlert('error', '일반 도감을 먼저 완성하세요!');
      return;
    }
    
    const reward = this.drawReward();
    StorageManager.claimReward(false);
    
    this.showModal(
      '🎁 기프티콘 당첨! 🎁',
      `축하합니다!<br><strong>${reward.name}</strong><br>(${reward.price.toLocaleString()}원)을 받았어요!`
    );
  },

  // 보상 뽑기 로직
  drawReward() {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const product of rewardProducts) {
      cumulative += product.probability;
      if (random < cumulative) {
        return product;
      }
    }
    
    return rewardProducts[0];
  },

  // 리미티드 보상 받기
  claimLimitedReward() {
    if (StorageManager.hasClaimedReward(true)) {
      this.showAlert('info', '이미 보상을 받았어요!');
      return;
    }
    
    if (!StorageManager.isComplete(true)) {
      this.showAlert('error', '리미티드 도감을 먼저 완성하세요!');
      return;
    }
    
    StorageManager.claimReward(true);
    
    this.showModal(
      '🎂 아이스크림 케이크 당첨! 🎂',
      '축하합니다!<br><strong>아이스크림 케이크 기프티콘</strong>을 받았어요!<br>당신은 진정한 베스킨라빈스 마스터입니다!'
    );
  },

  // 알림 메시지 표시
  showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
      <span>${message}</span>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
      container.insertBefore(alertDiv, container.firstChild);
      
      setTimeout(() => {
        alertDiv.remove();
      }, 3000);
    }
  },

  // 모달 표시
  showModal(title, message) {
    const modal = document.getElementById('modal');
    if (!modal) {
      // 모달이 없으면 생성
      const modalHTML = `
        <div id="modal" class="modal">
          <div class="modal-content">
            <div class="modal-title" id="modal-title"></div>
            <div class="modal-message" id="modal-message"></div>
            <button class="btn btn-primary btn-full" onclick="App.closeModal()">확인</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    document.getElementById('modal-title').innerHTML = title;
    document.getElementById('modal-message').innerHTML = message;
    document.getElementById('modal').classList.add('show');
  },

  // 모달 닫기
  closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.classList.remove('show');
    }
  },

  // 데이터 초기화 (테스트용)
  resetData() {
    if (confirm('정말로 모든 데이터를 초기화하시겠습니까?')) {
      StorageManager.clearAll();
      this.showAlert('success', '데이터가 초기화되었습니다!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }
};

// 페이지 로드시 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});

// Cordova 디바이스 준비시
document.addEventListener('deviceready', function() {
  console.log('Cordova 준비 완료!');
  App.init();
}, false);
