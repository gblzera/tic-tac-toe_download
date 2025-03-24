const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartButton = document.getElementById('restart');
const playerVsPlayerButton = document.getElementById('playerVsPlayer');
const playerVsIAButton = document.getElementById('playerVsIA');
const statisticsButton = document.getElementById('statistics');
const statisticsArea = document.getElementById('statisticsArea');
const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');
const drawsDisplay = document.getElementById('draws');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'playerVsPlayer';
let xWins = 0;
let oWins = 0;
let draws = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Jogador ${currentPlayer} venceu!`;
        if (currentPlayer === 'X') {
            xWins++;
        } else {
            oWins++;
        }
        gameActive = false;
        updateStatistics();
    } else if (checkDraw()) {
        message.textContent = 'Empate!';
        draws++;
        gameActive = false;
        updateStatistics();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'playerVsIA' && currentPlayer === 'O' && gameActive) {
            makeAIMove();
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

function updateStatistics() {
    xWinsDisplay.textContent = xWins;
    oWinsDisplay.textContent = oWins;
    drawsDisplay.textContent = draws;
}

function handleMenuClick(event) {
    const buttonId = event.target.id;

    if (buttonId === 'playerVsPlayer') {
        gameMode = 'playerVsPlayer';
        restartGame();
    } else if (buttonId === 'playerVsIA') {
        gameMode = 'playerVsIA';
        restartGame();
    } else if (buttonId === 'statistics') {
        statisticsArea.style.display = statisticsArea.style.display === 'block' ? 'none' : 'block';
    }
}

function makeAIMove() {
  if (!gameActive || currentPlayer !== 'O') {
      return;
  }

  setTimeout(() => { // Adiciona um atraso de 500 milissegundos
      let bestMove;
      let bestScore = -Infinity;

      for (let i = 0; i < board.length; i++) {
          if (board[i] === '') {
              board[i] = 'O';
              let score = minimax(board, 0, false);
              board[i] = '';

              if (score > bestScore) {
                  bestScore = score;
                  bestMove = i;
              }
          }
      }

      board[bestMove] = 'O';
      cells[bestMove].textContent = 'O';

      if (checkWin()) {
          message.textContent = 'IA venceu!';
          oWins++;
          gameActive = false;
          updateStatistics();
      } else if (checkDraw()) {
          message.textContent = 'Empate!';
          draws++;
          gameActive = false;
          updateStatistics();
      } else {
          currentPlayer = 'X';
      }
  }, 500);
}

function minimax(board, depth, isMaximizing) {
    if (checkWin()) {
        return isMaximizing ? -1 : 1;
    } else if (checkDraw()) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
              board[i] = 'O';
              let score = minimax(board, depth + 1, false);
              board[i] = '';
              bestScore = Math.max(score, bestScore);
          }
      }
      return bestScore;
  } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
          if (board[i] === '') {
              board[i] = 'X';
              let score = minimax(board, depth + 1, true);
              board[i] = '';
              bestScore = Math.min(score, bestScore);
          }
      }
      return bestScore;
  }
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
playerVsPlayerButton.addEventListener('click', handleMenuClick);
playerVsIAButton.addEventListener('click', handleMenuClick);
statisticsButton.addEventListener('click', handleMenuClick);

updateStatistics();