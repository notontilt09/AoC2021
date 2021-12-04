const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n\n').map(e => e.split("\n"));
const called = input[0].toString().split(',').map(Number);
let boards = input.slice(1)
    .map(board => board.toString().replace(/,/g, ' ').replace(/  /g,' '))
    .map(board => (board[0] === ' ' ? board.slice(1) : board))
    .map(board => board.split(' '))
    .map(board => board.map(Number))
    ;

const checkBingo = (board) => {
  // winning bingo lines by index in 5x5 array
  const rows = [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24]];
  const cols = [[0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24]];
  const winners = rows.concat(cols);

  // check all winning lines and see if board is a winner
  for (winner of winners) {
    if (winner.every(idx => board[idx] === 'X')) {
      return true
    }
  }

  return false;
}

const findBingoBoard = () => {
  for (let num of called) {
    for (let [idx, board] of boards.entries()) {
      if (board.includes(num)) {
        let boardIdx = board.indexOf(num);
        board[boardIdx] = 'X';
      }
      if (checkBingo(boards[idx])) {
        return [board, num];
      }
    }
  }
}

// for part 2, need to filter out winning bingo boards to find last remaining
const findBingoBoardIdx = () => {
  for (let num of called) {
    for (let [idx, board] of boards.entries()) {
      if (board.includes(num)) {
        let boardIdx = board.indexOf(num);
        board[boardIdx] = 'X';
      }
      if (checkBingo(boards[idx])) {
        return idx;
      }
    }
  }
}

const part1 = () => {
  const [winningBoard, lastNum] = findBingoBoard();
  const remainingSum = winningBoard.filter(e => e != 'X').reduce((a, b) => a + b, 0);
  return remainingSum * lastNum;
};

const part2 = () => {
  while (boards.length > 1) {
    let idx = findBingoBoardIdx();
    boards = boards.filter((_, index) => index != idx);
  }
  
  let [finalBoard, lastNum] = findBingoBoard(boards[0]);
  const remainingSum = finalBoard.filter(e => e != 'X').reduce((a, b) => a + b, 0);
  return remainingSum * lastNum;
}

console.log(part1());
console.log(part2());