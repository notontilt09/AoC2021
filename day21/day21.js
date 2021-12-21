const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');

const part1 = (p1, p2) => {
    p1 = p1 - 1; // using 0-9 indices for board instead of 1-10
    p2 = p2 - 1;
    let s1 = 0;
    let s2 = 0;
    let roll = 0;
    while (true) {
        let move = (roll+1) + (roll+2) + (roll + 3);
        roll += 3;
        p1 = (p1 + move) % 10
        s1 += p1 + 1 // score goes 1-10 but our board is now 0-9
        if (s1 >= 1000) {
            return s2 * roll
        }
        
        move = (roll+1) + (roll+2) + (roll + 3);
        roll += 3;
        p2 = (p2 + move) % 10
        s2 += p2 + 1 // score goes 1-10 but our board is now 0-9
        if (s2 >= 1000) {
            return s1 * roll
        }
    }
}

console.log(part1(4,8));

// cache for p2
let wins = new Map();

const play2 = (p1, p2, s1, s2) => {
    if (s1 >= 21) {
        return [1, 0];
    }
    if (s2 >= 21) {
        return [0, 1];
    }
    // if in cache already return that result
    if (wins.has(`${p1},${p2},${s1},${s2}`)) {
        return wins.get(`${p1},${p2},${s1},${s2}`)
    }
    let answer = [0, 0];
    for (let d1 of [1, 2, 3]) {
        for (let d2 of [1, 2, 3]) {
            for (let d3 of [1, 2, 3]) {
                let new_p1 = (p1+d1+d2+d3) % 10;
                let new_s1 = s1 + new_p1 + 1;
                // flip who's turn it is and run recursively
                let [i, j] = play2(p2, new_p1, s2, new_s1)
                answer = [answer[0] + j, answer[1] + i]
            }
        }
    }
    wins.set(`${p1},${p2},${s1},${s2}`, answer);
    return answer;
}

const part2 = () => {
    let [p1, p2, s1, s2] = [8, 3, 0, 0]
    let wins = play2(p1 - 1, p2 - 1, s1, s2);
    return Math.max(...wins)
}

console.log(part2());
