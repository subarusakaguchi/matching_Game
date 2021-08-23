function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard')

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
    this.classList.add('flip')
}