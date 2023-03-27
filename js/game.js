'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍬'
const CHERRY = '🍒'
const PASSAGES = ''
var gGame
var gBoard

 

function onInit() {
    gGame = {
        score: 0,
        isOn: true,
        isVictory: false,
        foodCount: 0,
    }
    
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    onCloseModal()
}

function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            // console.log(gGame.foodCount);

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--    
                // console.log(gGame.foodCount);            
            }
        }
    }
    addPowerFood(board)
    return board
}

function getEmptyLocation(board) {
    var emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyLocations.push(i, j)
            }
        }
    }
    if (!emptyLocations.length) return null
    var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    return emptyLocations[randIdx]
}

function addPowerFood(board) {
    board[1][1] = POWER_FOOD
    board[1][board[0].length - 2] = POWER_FOOD
    board[board.length - 2][1] = POWER_FOOD
    board[board.length - 2][board[0].length - 2] = POWER_FOOD
    gGame.foodCount -= 4
}

function updateScore(diff) {
    // Model
    gGame.score += diff
    console.log(gGame.score);
    // DOM
    const elScore = document.querySelector('.score')
    elScore.innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location ,'🪦')
    gGame.isOn = false
    var msg = (gGame.isVictory) ? 'You Won!' : 'Game Over'
    onOpenModal(msg)
}

function checkVictory() {
    console.log(gGame.foodCount)
    if (gGame.foodCount === 0) {
        gGame.isVictory = true
        gameOver()
    }
}

function onOpenModal(msg) {
    const elModal = document.querySelector('.modal')
    const elH3 = elModal.querySelector('h3')
    elH3.innerText = msg
    elModal.style.display = 'block'
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}