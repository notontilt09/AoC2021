const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split('').map(Number));
const test = fs.readFileSync('test.txt').toString().split('\n').map(line => line.split('').map(Number));


// dymanic programmic solutions for both
const part1 = data => {
  let cost = Array(data.length).fill([]);
  cost = cost.map(_ => Array(data[0].length).fill(Math.min()));
  cost[0][0] = 0;
  // iterate a few times until no improvement occurs
  for (let i = 0; i < 10; i++) {
    for (let x = 0; x < data.length; x ++) {
      for (let y = 0; y < data[x].length; y ++) {
        if (x === 0 && y === 0) continue;
        cost[x][y] = data[x][y] + Math.min(
          x > 0 ? cost[x - 1][y] : Math.min(),
          y > 0 ? cost[x][y - 1] : Math.min(),
          x < data.length - 1 ? cost[x + 1][y] : Math.min(),
          y < data[x].length - 1 ? cost[x][y + 1] : Math.min(),
        );
      }
    }
  }

  return cost[data.length - 1][data[0].length - 1];
}

console.log(part1(input));

const buildPart2Data = data => {
  const timesRepeated = 5;
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    for (let _ = 1; _ < timesRepeated; _++) {
      row = row.map(cell => cell !== 9 ? cell + 1 : 1)
      data[i] = data[i].concat(row);
    }
  }

  let copy = data.map(row => row.slice())
  for (let i = 1; i < timesRepeated; i += 1) {
    copy = copy.map(row => row.map(cell => cell !== 9 ? cell + 1 : 1))
    data = data.concat(copy)
}

  return data;
}

const part2 = data => {
  let p2Data = buildPart2Data(data);
  let cost = Array(p2Data.length).fill([]);
  cost = cost.map(_ => Array(p2Data[0].length).fill(Math.min()));
  cost[0][0] = 0;
  for (let i = 0; i < 10; i++) {
    for (let x = 0; x < p2Data.length; x ++) {
      for (let y = 0; y < p2Data[x].length; y ++) {
        if (x === 0 && y === 0) continue;
        cost[x][y] = p2Data[x][y] + Math.min(
          x > 0 ? cost[x - 1][y] : Math.min(),
          y > 0 ? cost[x][y - 1] : Math.min(),
          x < p2Data.length - 1 ? cost[x + 1][y] : Math.min(),
          y < p2Data[x].length - 1 ? cost[x][y + 1] : Math.min(),
        );
      }
    }
  }

  return cost[p2Data.length - 1][p2Data[0].length - 1];
}

console.log(part2(input));