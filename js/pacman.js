'use strict'

const PACMAN = '<img src="gif/pacman.gif"/>'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.foodCount--

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return
    // DONE: hitting a ghost? call gameOver
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    } else if (nextCell === FOOD) {
        handleFood()
    } else if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        handlePowerFood()
    }

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, turnPacman(gPacman.deg))
}

function getNextLocation(eventKeyboard) {
    console.log('eventKeyboard:', eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacman.deg = -90
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.deg = 0
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.deg = 90
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.deg = 180
            nextLocation.j--
            break;
    }
    // DONE: figure out nextLocation
    return nextLocation
}

function handleFood() {
    gGame.foodCount--

    updateScore(1)
    checkVictory()
}

function handlePowerFood() {
    gPacman.isSuper = true
    renderGhosts()
    setTimeout(() => {
        gPacman.isSuper = false
    }, 5000)
}


function turnPacman(deg) {
    return `<div style="transform: rotate(${deg}deg)">${PACMAN}</div>`
}