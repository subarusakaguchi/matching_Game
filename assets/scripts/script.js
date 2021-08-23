const FRONT = "cardFront"
const BACK = "cardBack"
const CARD = "card"
const ICON = "icon"

startGame()

function startGame() {
    initializeCards(game.createCards())
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

