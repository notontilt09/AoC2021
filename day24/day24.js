const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');

const relations = () => {
    // all of these manually extracted from input
    let divisors = [1, 1, 1, 26, 1, 1, 1, 26, 1, 26, 26, 26, 26, 26];
    let xOffset = [14, 10, 13, -8, 11, 11, 14, -11, 14, -1, -8, -5, -16, -6];
    let yOffset = [12, 9, 8, 3, 0, 11, 10, 13, 3, 10, 10, 14, 6, 5];
    let stack = [];
    let result = [];

    for (const [i, val] of divisors.entries()) {
        if (val !== 26) {
            stack.push(i)
        } else {
            let prev = stack.pop()
            result.push([prev, i,  yOffset[prev] + xOffset[i]])
        }
    }

    return result;
}

console.log(relations())

/*
[
  [ 2, 3, 0 ],  a[3] = a[2]
  [ 6, 7, -1 ], a[7] = a[6] - 1
  [ 8, 9, 2 ],  a[9] = a[8] + 2
  [ 5, 10, 3 ], a[10] = a[5] + 3
  [ 4, 11, -5 ],a[11] = a[4] - 5
  [ 1, 12, -7 ],a[12] = a[1] - 7
  [ 0, 13, 6 ]  a[13] = a[0] + 6
]
*/

// max
// [3, 9, 9, 9, 9, 6, 9, 8, 7, 9, 9, 4, 2, 9]

// min
// [1, 8, 1, 1, 6, 1, 2, 1, 1, 3, 4, 1, 1, 7]

