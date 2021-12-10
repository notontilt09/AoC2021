const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');

const findCorrupted = (line) => {
  let closeMap = {
    '(': ')',
    '<': '>',
    '{': '}',
    '[': ']'
  }
  let openers = ['(', '<', '{', '['];

  let open = [];
  for (let char of line) {
    if (openers.includes(char)) {
      open.push(char)
    } else {
      if (char !== closeMap[open.pop()]) {
        return char;
      }
    }
  }

  return null;
}

const part1 = () => {
  let corrupted = [];
  for (let line of input) {
    const corruptChar = findCorrupted(line);
    if (corruptChar) {
      corrupted.push(corruptChar);
    }
  }

  const pointMap = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  }

  return corrupted.map(char => pointMap[char]).reduce((a, b) => a + b, 0);
}

console.log(part1());

const findCloseString = (line) => {
  let closeMap = {
    '(': ')',
    '<': '>',
    '{': '}',
    '[': ']'
  }

  let openers = ['(', '<', '{', '['];

  let open = [];
  for (let char of line) {
    if (openers.includes(char)) {
      open.push(char)
    } else {
      open.pop()
    }
  }

  let close = [];

  for (let char of open.reverse()) {
    close.push(closeMap[char]);
  }

  return close;
}

const scoreLine = (line) => {
  let scoreMap = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  };
  let score = 0;
  for (let char of line) {
    score *= 5;
    score += scoreMap[char];
  }

  return score;
}

const part2 = () => {
  const incompleteLines = input.filter(line => !findCorrupted(line));
  const scores = incompleteLines.map(line => findCloseString(line)).map(line => scoreLine(line));
  
  return scores.sort((a, b) => a - b)[(scores.length - 1)/2];
}

console.log(part2());