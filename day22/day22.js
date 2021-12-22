const fs = require('fs')
const input = fs.readFileSync('input.txt').toString().split('\n');
const test = fs.readFileSync('test.txt').toString().split('\n');

const formatLine = str => {
    // 1 is on 0 is off
    let turn = str.slice(0,2) == 'on' ? 1 : 0
    let dirs = str.split(' ')[1].split(',');
    let [x1, x2] = [Number(dirs[0].slice(2, dirs[0].indexOf('.'))), Number(dirs[0].slice(dirs[0].indexOf('.') + 2))]
    let [y1, y2] = [Number(dirs[1].slice(2, dirs[1].indexOf('.'))), Number(dirs[1].slice(dirs[1].indexOf('.') + 2))]
    let [z1, z2] = [Number(dirs[2].slice(2, dirs[2].indexOf('.'))), Number(dirs[2].slice(dirs[2].indexOf('.') + 2))]
    
    return [x1, x2, y1, y2, z1, z2, turn];
}

const part1 = data => {
    let ons = new Set();
    for (let line of data) {
        let [x1, x2, y1, y2, z1, z2, turn] = formatLine(line);
        for (let x = Math.max(-50, x1); x <= Math.min(50, x2); x++) {
            for (let y = Math.max(-50, y1); y <= Math.min(50, y2); y++) {
                for (let z = Math.max(-50, z1); z <= Math.min(50, z2); z++) {
                    let cube = `${x},${y},${z}`;
                    if (turn) {
                        ons.add(cube);
                    } else {
                        ons.delete(cube);
                    }
                }
            }
        }
    }
    
    return ons.size;
}

console.log(part1(input));

const vol = (x1, x2, y1, y2, z1, z2) => {
    return (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1);
}

const part2 = data => {
    let map = [], newMap = [];
    for (let line of data) {
        let [x1, x2, y1, y2, z1, z2, turn] = formatLine(line);
        for (let [nx1, nx2, ny1, ny2, nz1, nz2, nTurn] of map) {
            // if no intersection, skip this iter
            const xMin = Math.max(x1, nx1);
            const xMax = Math.min(x2, nx2);
            if (xMin > xMax) {
                continue;
            }
            const yMin = Math.max(y1, ny1);
            const yMax = Math.min(y2, ny2);
            if (yMin > yMax) {
                continue;
            }
            const zMin = Math.max(z1, nz1);
            const zMax = Math.min(z2, nz2);
            if (zMin > zMax) {
                continue;
            }
            // if we get to here we have an intersection, add it to the newMap
            newMap.push([xMin, xMax, yMin, yMax, zMin, zMax, nTurn ? 0 : 1])
        }
        map.push(...newMap);
        newMap.length = 0;
        if (turn) {
            map.push([x1, x2, y1, y2, z1, z2, turn])
        }
    }

    return map.reduce((a, [x1, x2, y1, y2, z1, z2, turn]) => 
        a + vol(x1,x2,y1,y2,z1,z2) * (turn ? 1 : -1)
    , 0)
}

console.log(part2(input));