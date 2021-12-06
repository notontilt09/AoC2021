const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split(',').map(Number);

// find out what each starting # (only 1-5 in input) creates after 80 days
const makeMap = (numDays) => {
  let map = {};
  for (let num = 1; num <= 5; num++) {
    let allFish = [num];
    for (let i = 0; i < numDays; i++) {
      let reset = 0;
      allFish = allFish.map(fish => {
        if (fish === 0) {
          reset++;
          return 6;
        } else {
          return fish - 1;
        }
      })
      for (let i = 0; i < reset; i++) {
        allFish.push(8);
      }
    }
    map[num] = allFish.length;
  }
  
  return map;
}

const part1 = () => {
  let map80 = makeMap(80);
  let result = 0;
  for (let fish of input) {
    result += map80[fish];
  }

  return result;
}

// doing same was for part 2 will crash computer, need a more efficient algo
const part2 = () => {
  // this array will keep track of num of fish w/ each timer possibility (0-8)
  let fish = Array(9).fill(0);
  for (let num of input) {
    fish[num]++
  }
  
  for (let i = 0; i < 256; i++) {
    let reset = fish.shift();
    fish[6] += reset;
    fish.push(reset);
  }

  return fish.reduce((a, b) => a + b, 0);
}

console.log(part1());
console.log(part2());
