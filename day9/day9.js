const fs = require('fs');
const { Z_BUF_ERROR } = require('zlib');
// create 2d array of points
const input = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split('').map(Number));
const test = fs.readFileSync('test.txt').toString().split('\n').map(line => line.split('').map(Number));

const part1 = (grid) => {
  const lows = []
  // check surrounding points of each point and add to lows if it is
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let [left, down, right, up] = [undefined, undefined, undefined, undefined]
      left = grid[y][x-1];
      right = grid[y][x+1]
      if (grid[y-1]) {
        up = grid[y-1][x]
      }
      if (grid[y+1]) {
        down = grid[y+1][x]
      }
      let surrounding = [left, down, right, up].filter(value => value !== undefined);
      if (surrounding.every(val => val > grid[y][x])) {
        lows.push(grid[y][x])
      }
    }
  }
  console.log(lows);
  return lows.reduce((a, b) => a + b, 0) + lows.length;
}

console.log(part1(input));


// helper function to get neighbor nodes
const getNeighbors = (point, grid) => {
  const neighbors = [];
  const x = point[0];
  const y = point[1];
  if (x >= 1)
      neighbors.push([x - 1, y]);
  if (y >= 1)
      neighbors.push([x, y - 1]);
  if (x < grid.length - 1)
      neighbors.push([x + 1, y]);
  if (y < grid[0].length - 1)
      neighbors.push([x, y + 1]);
  return neighbors;
}

const getLowPoints = (grid) => {
  let lowPoints = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        const neighbors = getNeighbors([y, x], grid);
        const neighborValues = neighbors.map(neighbor => grid[neighbor[0]][neighbor[1]])
        if (Math.min(...neighborValues) > grid[y][x]) {
          lowPoints.push([y, x]);
        }
    }
  }

  return lowPoints;
}

console.log(getLowPoints(test));


const bfs = (point, grid) => {
  let basinSize = 0;
  const visited = new Set();
  const q = [point];
  while (q.length) {
    const node = q.pop();
    const nodestr = `${node[0]}, ${node[1]}`
    if (!visited.has(nodestr)) {
      visited.add(nodestr);
      basinSize++;
      const neighbors = getNeighbors(node, grid);
      neighbors.forEach(neighbor => {
        if (grid[neighbor[0]][neighbor[1]] < 9 && !visited.has(neighbor)) {
          q.push(neighbor);
        }
      })
    }
  }

  return basinSize;
}

const part2 = (grid) => {
  const lowPoints = getLowPoints(grid);
  const basinSizes = lowPoints.map(point => bfs(point, grid));
  return basinSizes.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1);
}

console.log(part2(input));

