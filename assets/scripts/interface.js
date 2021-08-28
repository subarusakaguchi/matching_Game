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
        if (game.cards.filter(card => !card.flipped).length === 19 && game.playCount === 0) {
            game.isPlaying = true
            let interval = setInterval(() => {
                if (!game.isPlaying) {
                    clearInterval(interval)
                }

                let timer = document.getElementById('timer')
                timer.innerHTML = `Tempo: ${game.timeCount}s`
                game.timeCount++
            }, 1000)
        }
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                addScore()
                attScore()
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver')
                    calcFinalScore()
                    gameOverLayer.style.display = 'flex'
                    let indexRanking = game.ranking.findIndex((rank) => game.totalScore > rank.pontos)
                    if (indexRanking === -1) {
                        setTimeout(() => {
                            let btns = document.querySelectorAll('.btn')
                            btns.forEach((btn) => {
                                btn.style.display = 'flex'
                            })
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            console.log('teste')
                            let addRank = document.getElementById('addRank')
                            addRank.style.display = 'flex'
                            let formRank = document.getElementById('formRank')
                            formRank.addEventListener('submit', (e) => {
                                e.preventDefault()
                                let rankingName = document.getElementById('rankingName')
                                let restartFromRank = document.getElementById('restartFromRank')
                                let playerNameView = rankingName.value
                                let playerName = 'Anônimo'

                                if (playerNameView != undefined && playerNameView != null && playerNameView != '') {
                                    playerName = playerNameView
                                }

                                game.ranking[indexRanking] = new createRank(playerName, game.totalScore)
                                restartFromRank.style.display = 'flex'

                                showRank()
                            })
                        }, 2000);

                    }
                }
            } else {
                setTimeout(() => {
                    let firstCardScreen = document.getElementById(game.firstCard.id)
                    let secondCardScreen = document.getElementById(game.secondCard.id)

                    firstCardScreen.classList.remove('flip')
                    secondCardScreen.classList.remove('flip')

                    game.unflipCards()

                    if (game.timeCount > 30) {
                        game.points = 150
                    }

                    addPlayCount()
                    attPlayCount()
                }, 500);
            }
        }
    }
}

function showRank() {
    let rankingContainer = document.getElementById('rankingContainer')
    let positions = document.querySelector('.positions')
    positions.innerHTML = ''
    game.ranking.forEach((rank, i) => {
        positions.innerHTML += i == 0 ? `<strong>1º Lugar: ${rank.nome} - ${rank.pontos}</strong><br>` : `${i + 1}º Lugar: ${rank.nome} - ${rank.pontos}<br>`
    })
    rankingContainer.style.display = 'flex'
}

function createRank(name, score) {
    this.nome = name,
    this.pontos = score
}

function calcFinalScore() {
    let finalScore = document.getElementById('finalScore')
    let totBonus = Math.floor((game.bonusPoints - (game.timeCount * 10)) / (game.playCount / 10))
    game.totalScore = totBonus + game.score
    finalScore.innerHTML = `Pontos Feitos = ${game.score}<br>`
    finalScore.innerHTML += `Bônus: (${game.bonusPoints} - (${game.timeCount} x 10)) / (${game.playCount} / 10) = ${totBonus}<br>`
    finalScore.innerHTML += `Total = ${game.totalScore}`
}

function restart() {
    let gameOverLayer = document.getElementById('gameOver')
    let rankingContainer = document.getElementById('rankingContainer')
    game.score = 0
    game.timeCount = 0
    game.playCount = 0

    game.clearCards()
    attTimer()
    attPlayCount()
    attScore()
    startGame()

    rankingContainer.style.display = 'none'
    gameOverLayer.style.display = 'none'
}

function attTimer() {
    let timer = document.getElementById('timer')
    timer.innerHTML = `Tempo: ${game.timeCount}s`
}

function attPlayCount() {
    let playCount = document.getElementById('playCount')
    playCount.innerHTML = `Jogadas: ${game.playCount}`
}

function attScore() {
    let score = document.getElementById('score')
    score.innerHTML = `Pontos: ${game.score}`
}

addPlayCount = () => game.playCount++

addScore = () => game.score += game.points