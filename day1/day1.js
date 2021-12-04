const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n').map(Number);

const part1 = () => {
  let count = 0;

  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i-1]) {
      count++;
    }
  }

  return count;
}

console.log(part1());

const part2 = () => {
  const windowSum = (start) => {
    return input[start] + input[start+1] +input[start+2];
  }

  let count = 0;

  for (let i = 1; i < input.length; i++) {
    if (windowSum(i) > windowSum(i-1)) {
      count++;
    }
  }

    return count;
}


console.log(part2());