const gameContainer = document.querySelector('.game-container');
const cardValues = [
    '1', '1', '2', '2', 
    '3', '3', '4', '4', 
    '5', '5', '6', '6', 
    '7', '7', '8', '8'
];
let flippedCards = [];
let matchedCards = [];

// 將卡片隨機打亂
cardValues.sort(() => 0.5 - Math.random());

// 建立卡片元素並添加到遊戲容器中
cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front"></div>
        <div class="back" style="background-image: url('images/${value}.jpg');"></div>
    `;
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
});

// 音樂元素
const backgroundMusic = document.getElementById('background-music');
const gameContainer = document.querySelector('.game-container');
const cardValues = [
    '1', '1', '2', '2', 
    '3', '3', '4', '4', 
    '5', '5', '6', '6', 
    '7', '7', '8', '8'
];
let flippedCards = [];
let matchedCards = [];

// 音樂標誌
let musicStarted = false;

// 音樂元素
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.onerror = () => {
    console.error('背景音樂載入失敗！');
};

// 響應式音樂播放（避免多次點擊觸發）
document.body.addEventListener('click', () => {
    if (!musicStarted) {
        backgroundMusic.play().then(() => {
            musicStarted = true;
            console.log('音樂開始播放');
        }).catch((error) => {
            console.error('播放音樂時發生錯誤: ', error);
        });
    }
});

// 將卡片隨機打亂
cardValues.sort(() => 0.5 - Math.random());

// 建立卡片元素並添加到遊戲容器中
cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front"></div>
        <div class="back" style="background-image: url('images/${value}.jpg');"></div>
    `;
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
});

// 翻牌邏輯
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && flippedCards.indexOf(this) === -1) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            gameContainer.classList.add('no-click'); // 防止快速點擊
            setTimeout(() => {
                checkMatch();
                gameContainer.classList.remove('no-click');
            }, 1000);
        }
    }
}

// 檢查是否匹配
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
    checkWin();
}

// 檢查是否獲勝
function checkWin() {
    if (matchedCards.length === cardValues.length) {
        const modal = document.createElement('div');
        modal.classList.add('win-modal');
        modal.innerHTML = `<h2>恭喜你，全部配對成功！</h2>`;
        document.body.appendChild(modal);
    }
}
