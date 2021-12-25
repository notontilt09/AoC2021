const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');
const test = fs.readFileSync('test.txt').toString().split('\n');

// console.log(test);

const makeArr = data => {
    return data.map(line => line.split(''));
}

const moveEast = grid => {
    grid = makeArr(grid);
    let newGrid = grid.map(line => [...line]);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== '>') {
                continue;
            } else {
                if (j < grid[i].length - 1) { // anywhere before last column
                    if (grid[i][j+1] == '.') {
                        newGrid[i][j+1] = '>';
                        newGrid[i][j] = '.'
                    }
                    
                } else { // wrap around
                    if (grid[i][0] == '.') {
                        newGrid[i][0] = '>';
                        newGrid[i][j] = '.';
                    }
                }
            }
        }
    }
    return newGrid.map(line => line.join(''));
    
}

const moveSouth = grid => {
    grid = makeArr(grid);
    let newGrid = grid.map(line => [...line]);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== 'v') {
                continue;
            } else {
                if (i < grid.length - 1) { // anywhere before last column
                    if (grid[i+1][j] == '.') {
                        newGrid[i+1][j] = 'v';
                        newGrid[i][j] = '.'
                    }
                    
                } else { // wrap around
                    if (grid[0][j] == '.') {
                        newGrid[0][j] = 'v';
                        newGrid[i][j] = '.';
                    }
                }
            }
        }
    }

    return newGrid.map(line => line.join(''));
}

const p1 = grid => {
    let states = new Set();
    while (true) {
        grid = moveEast(grid);
        grid = moveSouth(grid);
        let str = JSON.stringify(grid);
        if (states.has(str)) {
            break;
        }
        states.add(str);
    }

    return states.size + 1;
}

console.log(p1(input));
