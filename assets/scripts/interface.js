function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = ''

    cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    });
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    
    cardElementFace.classList.add(face)
    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "./assets/images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "&lt;/&gt;"
    }

    element.appendChild(cardElementFace)
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add('flip')
        if (game.cards.filter(card => !card.flipped).length == (game.cards.length - 1)) {
            timeCountStart()
        }
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver')

                    gameOverLayer.style.display = 'flex'
                }
            } else {
                setTimeout(() => {
                    let firstCardScreen = document.getElementById(game.firstCard.id)
                    let secondCardScreen = document.getElementById(game.secondCard.id)
        
                    firstCardScreen.classList.remove('flip')
                    secondCardScreen.classList.remove('flip')

                    game.unflipCards()
                }, 500);
            }
        }
    }
}

function restart() {
    let gameOverLayer = document.getElementById('gameOver')

    game.clearCards()
    startGame()

    gameOverLayer.style.display = 'none'
}

function timeCountStart() {
    let timer = document.getElementById('timer')

    setInterval(() => {
        timer.innerHTML = `Tempo: ${game.timeCount}s`
        game.timeCount++
    }, 1000);
}