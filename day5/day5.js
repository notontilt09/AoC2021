const fs = require ('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

// format input to be workable
const data = input.map(line => line.split(' -> ')).map(line => line.map(point => point.split(',').map(Number)));

// filter out diagonal lines
const noDiags = data.filter(line => line[0][0] === line[1][0] || line[0][1] === line[1][1]);
const diags = data.filter(line => line[0][0] !== line[1][0] && line[0][1] !== line[1][1]);

// map builder for p1
const buildNoDiagsMap = map => {
  for (let line of noDiags) {
    let [x1, x2] = [line[0][0], line[1][0]];
    let [y1, y2] = [line[0][1], line[1][1]];

    if (x1 == x2) { // vertical line
      [y1, y2] = [Math.min(y1,y2), Math.max(y1,y2)];
      for (let i = y1; i <= y2; i++) {  // add all points on line to map
        let point = `${x1},${i}`;
        map[point] ? map[point]++ : map[point] = 1;
      }
    } else { // horizontal line
      [x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
      for (let i = x1; i <= x2; i++) {  // add all points on line to map
        let point = `${i},${y1}`;
        map[point] ? map[point]++ : map[point] = 1;
      }
    }
  }

  return map
}

// map builder for p2
const buildDiags = map => {
  for (let line of diags) {
    line = line.sort((a, b) => a[0] - b[0]) // go from left to right
    let [x1, x2] = [line[0][0], line[1][0]];
    let [y1, y2] = [line[0][1], line[1][1]];
    if (y2 > y1) { // line looks like \
      for (let i = 0; i <= x2 - x1; i++) {
        let point = `${x1+i},${y1+i}`;
        map[point] ? map[point]++ : map[point] = 1;
      }
    } else { // line looks like /
      for (let i = 0; i <= x2 - x1; i++) {
        let point = `${x1+i},${y1-i}`;
        map[point] ? map[point]++ : map[point] = 1;
      }
    } 
  }

  return map;
}
const part1 = () => {
  const map = buildNoDiagsMap({});
  
  let count = 0;

  for (let point in map) {
    map[point] > 1 ? count++ : null;
  }

  return count;
};

const part2 = () => {
  const noDiagsMap = buildNoDiagsMap({});
  const fullMap = buildDiags(noDiagsMap);

  let count = 0;

  for (let point in fullMap) {
    fullMap[point] > 1 ? count++ : null;
  }

  return count;
}

console.log(part1());
console.log(part2());