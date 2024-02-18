const X_CLASS = 'x';
const O_CLASS = 'o';
let currentPlayerClass = X_CLASS;
const board = document.getElementById('board');
const statusMessage = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const cellElements = document.querySelectorAll('.cell');
let gameActive = true;

function handleCellClick(e) {
    const cell = e.target;
    const currentClass = currentPlayerClass;

    if (!gameActive || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
        return;
    }

    cell.classList.add(currentClass);
    cell.innerText = currentClass.toUpperCase();

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        statusMessage.innerText = 'Draw!';
        swal('Draw, Please restart game')
    } else {
        statusMessage.innerText = `${currentPlayerClass.toUpperCase()} Wins!`;
        swal(` Congratulations Player  ${currentPlayerClass.toUpperCase()} Win`);
    }
    gameActive = false;
}


function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function swapTurns() {
    currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
    statusMessage.innerText = `${currentPlayerClass.toUpperCase()}'s turn`;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(currentPlayerClass);
}

function checkWin(currentClass) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.innerText = '';
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    setBoardHoverClass();
    statusMessage.innerText = `${currentPlayerClass.toUpperCase()}'s turn`;
    gameActive = true;
}

restartButton.addEventListener('click', startGame);

startGame();




