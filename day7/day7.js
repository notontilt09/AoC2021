const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split(',').map(Number);
let test = [16,1,2,0,4,2,7,1,2,14]

const part1 = (arr) => {
  let max = Math.max(...arr);
  let minFuel = Math.min();
  for (let i = 0; i <= max; i++) {
    let fuel = 0;
    for (let crab of arr) {
      fuel += Math.abs(crab - i)
    }
    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }

  return minFuel;
};

const costToMovep2 = (start, end) => {
  let cost = 0;
  [start, end] = [Math.min(start,end), Math.max(start,end)];
  for (let i = 0; i < end - start + 1; i++) {
    cost += i;
  }
  
  return cost;
}

const part2 = (arr) => {
  let max = Math.max(...arr);
  let minFuel = Math.min();
  for (let i = 0; i < max; i++) {
    let fuel = 0;
    for (let crab of arr) {
      fuel += costToMovep2(crab, i);
    }
    if (fuel < minFuel) {
      minFuel = fuel
    }
  }

  return minFuel;
};

console.log(part1(input));
console.log(part2(input));
