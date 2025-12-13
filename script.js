const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restart-btn');
const levelButtons = document.querySelectorAll('.level-btn');

let cardValues = [];~
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let gridSize = 4;

// 🔹 Your image list (replace or add more)
const cardImages = [
    "doraemon-4553920_640.png",
    "footballer-8782044_640.png",
    "forest-9893940_640.jpg",
    "fox-9106452_640.jpg",
    "funny-3052397_640.jpg",
    "good-2204244_640.png",
    "rabbit-6603218_640.png",
    "witch-155291_640.png"
];

function generateCards() {
    gameBoard.innerHTML = '';
    moves = 0;
    movesDisplay.textContent = moves;

    const totalCards = gridSize * gridSize;
    cardValues = [];

    // Create pairs
    for (let i = 0; i < totalCards / 2; i++) {
        cardValues.push(i, i);
    }

    // Shuffle cards
    cardValues.sort(() => Math.random() - 0.5);

    // Adjust grid
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 90px)`;

    // Create cards
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);

        card.innerHTML = `
            <div class="card-front">
                <img src="${cardImages[value]}" />
            </div>
            <div class="card-back">
                <img src="christmas-6588525_640.jpg" />
            </div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    lockBoard = true;
    moves++;
    movesDisplay.textContent = moves;

    const match = firstCard.dataset.value === secondCard.dataset.value;

    if (match) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetTurn();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetTurn();
    }, 800);
}

function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartBtn.addEventListener('click', generateCards);

levelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        gridSize = Number(btn.dataset.size);
        generateCards();
    });
});

// Start
generateCards();
