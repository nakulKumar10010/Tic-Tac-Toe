const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const displayWinningMessage = () => `Player ${currentPlayer} has won!`;
const displayDrawMessage = () => `Game ended in a draw!`;
const displayCurrentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = displayCurrentPlayerTurn();

const winningScenarios = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function updateCell(clickedCell, index) {
    gameState[index] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = displayCurrentPlayerTurn();
}

function checkGameStatus() {
    let win = false;
    for (let condition of winningScenarios) {
        const [a, b, c] = condition.map(index => gameState[index]);
        if (!a || !b || !c) continue;
        if (a === b && b === c) {
            win = true;
            break;
        }
    }

    if (win) {
        statusDisplay.innerHTML = displayWinningMessage();
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = displayDrawMessage();
        gameActive = false;
        return;
    }

    switchPlayer();
}

function onCellClick(event) {
    const clickedCell = event.target;
    const index = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[index] !== "" || !gameActive) return;

    updateCell(clickedCell, index);
    checkGameStatus();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState.fill("");
    statusDisplay.innerHTML = displayCurrentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', onCellClick));
document.querySelector('.game--restart').addEventListener('click', restartGame);

