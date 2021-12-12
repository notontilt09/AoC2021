const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split('').map(Number));
const test = fs.readFileSync('test.txt').toString().split('\n').map(line => line.split('').map(Number));

const buildGraph = (grid) => {
  let graph = {};
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let node = `${i},${j}`
      graph[node] = [];
      // left
      if (j > 0) {
        graph[node].push([i,j-1])
      }
      //right
      if (j < grid[0].length - 1) {
        graph[node].push([i, j+1])
      }
      // up
      if (i > 0) {
        graph[node].push([i-1, j])
      }
      // down
      if (i < grid.length - 1) {
        graph[node].push([i+1, j])
      }
      // up-left
      if (i > 0 && j > 0) {
        graph[node].push([i-1, j-1])
      }
      // up-right
      if (i > 0 && j < grid[0].length - 1) {
        graph[node].push([i-1, j+1])
      }
      // down-left
      if (i < grid.length - 1 && j > 0) {
        graph[node].push([i+1, j-1])
      }
      // down-right
      if (i < grid.length - 1 && j < grid[0].length - 1) {
        graph[node].push([i+1, j+1])
      }
    }
  }

  return graph
}

const flash = (i, j, grid, graph, flashed) => {
  let neighbors = graph[`${i},${j}`];
  grid[i][j] = 0;
  for (let neighbor of neighbors) {
    // add 1 to all neighbors
    grid[neighbor[0]][neighbor[1]]++;
    // if neighbor now > 9, flash it and add to flashed list
    if (grid[neighbor[0]][neighbor[1]] > 9) {
      flashed.push([neighbor[0], neighbor[1]])
      flash(neighbor[0], neighbor[1], grid, graph, flashed);
    }
  }

  return [grid, flashed]
}


const takeStep = (grid, graph) => {
  // need to return total flashes for each step;
  let totalFlashes = 0;
  // add 1 to each number in grid
  grid = grid.map(line => line.map(num => num + 1))
  // flash
  let flashed = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // flash all nodes > 9
      if (grid[i][j] > 9) {
        flashed.push([i, j])
        grid = flash(i, j, grid, graph, flashed)[0];
      }
    }
  }
  // count flashed nodes and reset them to 0
  for (let node of flashed) {
    totalFlashes++
    grid[node[0]][node[1]] = 0;
  }


  return [grid, totalFlashes];
}

const part1 = (grid) => {
  let answer = 0;
  let step = 0;
  const graph = buildGraph(grid);
  while (step < 100) {
    let [nextGrid, flashes] = takeStep(grid, graph);
    // add num flashes of that step to total
    answer += flashes;
    // update grid
    grid = nextGrid;
    step++;
  }
  

  return answer;
};

console.log(part1(input));

const part2 = (grid) => {
  const graph = buildGraph(grid);
  let step = 0;
  // keep taking steps until every node flashes in a step
  while (true) {
    step++;
    let [nextGrid, numFlashes] = takeStep(grid, graph);
    if (numFlashes == (grid.length * grid[0].length)) {
      break;
    } else {
      grid = nextGrid;
    }
  }

  return step
};

console.log(part2(input));