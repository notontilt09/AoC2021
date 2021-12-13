const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n')
const test = fs.readFileSync('test.txt').toString().split('\n')

const splitInstructions = (inst) => {
  return [inst.slice(0, inst.indexOf('')), inst.slice(inst.indexOf('') + 1)]
}

const buildInitGrid = (data) => {
  let [dots, folds] = splitInstructions(data);
  dots = dots.map(dot => [Number(dot.split(',')[0]), Number(dot.split(',')[1])])
  let maxX = 0; 
  let maxY = 0;
  for (let dot of dots) {
    if (dot[0] > maxX) {
      maxX = dot[0];
    }
    if (dot[1] > maxY) {
      maxY = dot[1];
    }
  }

  let grid = [];
  for (let j = 0; j <= maxY; j++) {
    grid[j] = [];
    for (let i = 0; i <=maxX; i++) {
      grid[j].push('.');
    }
  }
  
  for (let dot of dots) {
    grid[dot[1]][dot[0]] = '#'
  }

  return [grid, folds];
}

const fold = (grid, instruction) => {
  let trimmed = instruction.split('fold along ')[1];
  let [direction, value] = [trimmed.split('=')[0], Number(trimmed.split('=')[1])];
  if (direction == 'y') { // fold along horizontal line
    for (let y = value + 1; y < grid.length; y++) { // only need to iterate over bottom half of grid
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] == '#') {
          grid[value-(y-value)][x] = '#'
        }
      }
    }
    grid = grid.slice(0, value);
  } else { // fold along vertical line
    for (let y = 0; y < grid.length; y++) {
      for (let x = value + 1; x < grid[0].length; x++) {
        if (grid[y][x] == '#') {
          grid[y][value-(x-value)] = '#'
        }
      }
    }
    grid = grid.map(row => row.slice(0, value))
  }
  
  return grid;
}

const part1 = (data) => {
  const [grid, folds] = buildInitGrid(data);
  const folded = fold(grid, folds[0]);
  let numDots = 0;
  for (let line of folded) {
    numDots += line.filter(e => e == '#').length;
  }

  return numDots;
}

console.log(part1(input));

const part2 = (data) => {
  const [grid, instructions] = buildInitGrid(data);
  let nextGrid = [...grid];
  for (let instruction of instructions) {
    nextGrid = fold(nextGrid, instruction);
  }

  for (let line of nextGrid) {
    let str = ''
    for (let char of line) {
      str += char == '.' ? ' ' : char
    }
    console.log(str);
  }
}

part2(input);
