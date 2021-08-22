const FRONT = "cardFront"
const BACK = "cardBack"
let cards = null
let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
]

startGame()

function startGame() {
    cards = createCards(techs)
    shuffleCards(cards)
    console.log(cards)
}

function shuffleCards(cards) {
    let currentIndex = cards.length
    let randomIndex = 0

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

function createCards(techs) {
    let cards = []

    for(let tech of techs) {
        cards.push(createPair(tech))
    }

    return cards.flatMap(pair => pair)
}

function createPair(tech) {
    return [{
        id: createId(tech),
        icon: tech,
        flipped: false
    }, {
        id: createId(tech),
        icon: tech,
        flipped: false
    }]
}

function createId(tech){
    return tech + parseInt(Math.random() * 1000)
}