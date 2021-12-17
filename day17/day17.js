const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split(': ')[1];
let [x, y] = [input.split(', ')[0], input.split(', ')[1]]
let [minX, maxX] = [Number(x.split('..')[0].slice(2)), Number(x.split('..')[1])];
let [minY, maxY] = [Number(y.split('..')[0].slice(2)), Number(y.split('..')[1])];

const inTarget = location => {
    let [x, y] = [location[0], location[1]];
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
}

const trackLocations = (initVelocity, maxX, minY)  => {
    let locations = [];
    let [x, y] = [0, 0];
    let dx = initVelocity[0];
    let dy = initVelocity[1];
    while (x <= maxX && y >= minY) {
        locations.push([x, y])
        x += dx;
        y += dy;
        if (dx == 0) {
            dx = dx;
        } else {
            dx = dx > 0 ? dx - 1 : dx + 1;
        }
        dy--;
    }

    return locations;
}

const isValidTraj = locations => {
    for (let location of locations) {
        if (inTarget(location)) {
            return true
        }
    }

    return false
}

const part1 = () => {
    let maxInitY = 0;
    for (let i = 0; i <= maxX; i++) {
        // need to find a way to generalize height, for now just check up to 500
        for (let j = 0; j < 500; j++) {
            let testVel = [i, j];
            if (isValidTraj(trackLocations(testVel, maxX, minY))) {
                if (j > maxInitY) {
                    maxInitY = j;
                }
            }
        }
    }

    let maxHeight = 0;
    while (maxInitY > 0) {
        maxHeight += maxInitY;
        maxInitY--;
    }

    return maxHeight;
}

console.log(part1());

const part2 = () => {
    let res = 0;

    for (let i = 0; i <= maxX; i++) {
        // maxY is p1 maxInitY
        for (let j = minY; j <= 178; j++) {
            let testVel = [i, j]
            if (isValidTraj(trackLocations(testVel, maxX, minY))) {
                res++;
            }
        }
    }

    return res;
}

console.log(part2());


