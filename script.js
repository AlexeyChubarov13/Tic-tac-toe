const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const cells = document.querySelectorAll('.game__board-cell')
const restartButton = document.querySelector('.game__button-start')

let board
let currentPlayer
let gameOver

const PLAYER_HTML = {
    x: '<img src="img/cross.svg" alt="x">',
    o: '<img src="img/circle.svg" alt="o">',
}

function init() {
    board = ['','','','','','','','','']
    currentPlayer = 'x'
    gameOver = false;

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ""
        cells[i].classList.remove('game__board-cell--win')
    }
}

function clickCell() {
    const idx = Number(this.dataset.cellIndex)

    if (gameOver) return
    if (board[idx] !== '') return

    board[idx] = currentPlayer
    this.innerHTML = PLAYER_HTML[currentPlayer]

    const winCombo = checkWin()
    if (winCombo) {
        for (const winIdx of winCombo) {
            cells[winIdx].classList.add('game__board-cell--win')
        }
        alert('Игрок ' + currentPlayer + ' победил!')
        gameOver = true
        return
    }

    if (board.indexOf('') === -1) {
        alert('Ничья!')
        gameOver = true
        return
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
}

function checkWin() {
    for (let i = 0; i < winningCombos.length; i++) {
        const combo = winningCombos[i]
        const a = combo[0]
        const b = combo[1]
        const c = combo[2]

        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            return combo
        }
    }
    return null
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', clickCell);
}

restartButton.addEventListener('click', init)

init()
