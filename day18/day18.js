const fs = require('fs');

const explode = str => {
    let digits = '0123456789';
    let openCount = 0;
    let explodeIdx = 0;
    let [explodePairLeft, explodePairRight] = [null, null];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ']') {
            openCount--;
            continue;
        } else if (str[i] === '[') {
            openCount++;
        }
        if (openCount === 5) {
            explodeIdx = i;
            explodePairLeft = str[i+1];
            if (digits.includes(str[i+2])) {
                explodePairLeft += str[i+2];
            }
            explodePairRight = str[i+2+explodePairLeft.length];
            if (digits.includes(str[i+2+explodePairLeft.length+1])) {
                explodePairRight += str[i+2+explodePairLeft.length+1];
            }
            break;
        }
    }

    let [leftNum, leftIdx] = [null, null];
    let [rightNum, rightIdx] = [null, null];

    // find left number
    for (let i = explodeIdx; i >= 0; i--) {
        if (digits.includes(str[i])) {
            if (digits.includes(str[i-1])) {
                leftIdx = i - 1;
                leftNum = str[i-1] + str[i];
                break;
            } else {
                leftIdx = i;
                leftNum = str[i];
                break;
            }
        }
    }
    
    // find right number
    for (let i = explodeIdx + explodePairLeft.length + explodePairRight.length + 3; i <= str.length; i++) {
        if (digits.includes(str[i])) {
            rightIdx = i;
            if (digits.includes(str[i+1])) {
                rightNum = str[i] + str[i+1];
                break;
            } else {
                rightNum = str[i];
                break;
            }
        }
    }

    let newLeft, newRight;
    if (leftNum) {
        newLeft = String(Number(leftNum) + Number(explodePairLeft));
    }
    if (rightNum) {
        newRight = String(Number(rightNum) + Number(explodePairRight));
    }

    // console.log('old left', leftNum, 'new left', newLeft, 'pair left', explodePairLeft, 'pair right', explodePairRight, 'old right', rightNum, 'new right', newRight);

    // rebuild the strings in a hacky way
    if (!leftNum) {
        return str.slice(0, explodeIdx) + '0' + str.slice(explodeIdx + 3 + explodePairLeft.length + explodePairRight.length, rightIdx) + newRight + str.slice(rightIdx+rightNum.length)
    }

    if (!rightNum) {
        return str.slice(0, leftIdx) + newLeft + str.slice(leftIdx + leftNum.length, explodeIdx) + '0' + str.slice(explodeIdx + 3 + explodePairLeft.length + explodePairRight.length);
    }

    return str.slice(0, leftIdx) + newLeft + str.slice(leftIdx + leftNum.length, explodeIdx) + '0' + str.slice(explodeIdx + 3 + explodePairLeft.length + explodePairRight.length, rightIdx) + newRight + str.slice(rightIdx+rightNum.length);
};

const split = str => {
    // find regular number >= 10 in string
    const findSplitIdx = str => {
        let digits = '1234567890';
        for (let i = 0; i < str.length; i++) {
            if (digits.includes(str[i]) && digits.includes(str[i+1])) {
                return [i, str.slice(i, i+2)];
            }
        }
    }
    // split it into a pair
    let split = findSplitIdx(str);
    // newLeft = split / 2 rounded down
    let newLeft = String(Math.floor(Number(split[1])/2));
    // new right = split / 2 rounded up
    let newRight = String(Math.ceil(Number(split[1])/2));

    return str.slice(0, split[0]) + `[${newLeft},${newRight}]` + str.slice(split[0]+2)
}

// snailfish addition per instructions;
const add = (a, b) => {
    return '[' + a + ',' + b + ']';
}


const needsExploding = str => {
    let opens = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '[') {
            opens++;
        }
        if (str[i] === ']') {
            opens--;
        }
        if (opens === 5) {
            return true;
        }
    }

    return false;
}

const needsSplitting = str => {
    let digits = '1234567890';
        for (let i = 0; i < str.length; i++) {
            if (digits.includes(str[i]) && digits.includes(str[i+1])) {
                return true;
            }
        }
        return false;
}

const reduceSnail = str => {
    while (needsExploding(str) || needsSplitting(str)) {
        // console.log(str);
        if (needsExploding(str)) {
            // console.log('explode');
            str = explode(str);
        } else {
            // console.log('split');
            str = split(str);
        }
    }

    return str;
}

const input = fs.readFileSync('input.txt').toString().split('\n');

const findSum = list => {
    return list.reduce((a, b) => reduceSnail(add(a, b)));
}

const findMagnitude = arr => {
    const [left, right] = arr;
    const leftValue = Array.isArray(left) ? findMagnitude(left) : left;
    const rightValue = Array.isArray(right) ? findMagnitude(right) : right;
    return 3 * leftValue + 2 * rightValue;
}

const part1 = data => {
    let sum = findSum(data);

    return findMagnitude(eval(sum));
}

console.log(part1(input));

const part2 = data => {
    let maxMag = 0;
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            let sum = reduceSnail(add(data[i], data[j]))
            let mag = findMagnitude(eval(sum));
            if (mag > maxMag) {
                maxMag = mag
            }
        }
    }

    return maxMag
}

console.log(part2(input));




