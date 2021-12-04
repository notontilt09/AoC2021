const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

const data = input.map(instruction => instruction.split(' '))

const forwards = data.filter(item => item[0] === 'forward');
const ups = data.filter(item => item[0] === 'up')
const downs = data.filter(item => item[0] === 'down')

const part1 = () => {
  let forwardCount = 0;
  for (let direction of forwards) {
    forwardCount += Number(direction[1]);
  }

  let depth = 0;

  for (let direction of downs) {
    depth += Number(direction[1]);
  }

  for (let direction of ups) {
    depth -= Number(direction[1]);
  }

  return forwardCount * depth;
}

console.log(part1());

const part2 = () => {
  let position = [0, 0];
  let aim = 0;

  for (let direction of data) {
    if (direction[0] === 'down') {
      aim += Number(direction[1]);
    } else if (direction[0] === 'up') {
      aim -= Number(direction[1]);
    } else {
      position[0] += Number(direction[1])
      position[1] += Number(direction[1]) * aim;
    }
  }

  return position[0] * position[1];
}

console.log(part2());