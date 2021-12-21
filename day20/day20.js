const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');
const test = fs.readFileSync('test.txt').toString().split('\n');
// image enhancement algorith
const IEA = input[0];
let inputImage = input.slice(2);
// const IEA = test[0];
// let inputImage = test.slice(2);

const printImg = img => {
    for (let line of img) {
        console.log(line);
    }
}

const extendImage = (image, iter) => {
    let res = [...image]
    let extendLength = 2;
    // console.log('res', res);
    // extend image 3 spots in x & y direction to capture all possible 3x3 squares
    const imgWidth = res[0].length;
    // new background
    let bg = iter % 2 == 0 ? '.' : '#'
    // y direction
    for (let i = 0; i < extendLength; i++) {
        res.unshift(Array(imgWidth).fill(bg).join(''))
        res.push(Array(imgWidth).fill(bg).join(''))
    }
    
    // x direction
    res = res.map(str => bg.repeat(extendLength) + str + bg.repeat(extendLength))

    return res;
}

const replacePixel = (row, col, image, IEA) => {
    let bin = ''
    // find surrounding locations values
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            bin += image[row + i][col + j];
        }
    }
    // convert to binary number
    bin = bin.replace(/\./g,'0').replace(/#/g,'1');

    // convert to decimal
    const dec = parseInt(bin, 2);
    // find corresponding pixel in IEA
    return IEA[dec];
}

const enhanceImage = (inputImg) => {
    let output = Array(inputImg.length).fill('')
    // don't need to check edges since we've added 2 rows and cols of .'s
    for (let i = 1; i < inputImg.length - 1; i++) {
        for (let j = 1; j < inputImg[0].length - 1; j++) {
            output[i] += replacePixel(i, j, inputImg, IEA)
        }
    }

    
    output = output.map(line => {
        if (line) {
            return '.' + line + '.'
        } else {
            return Array(inputImg[0].length).fill('.').join('')
        }
    })


    // cut off edges that we extended
    return output.slice(1,-1).map(line => line.slice(1, -1));
}


const solve = (inputImg, iters) => {
    let outputImg = [...inputImg]

    // enhance the image iters number of times
    for (let i = 0; i < iters; i++) {
        outputImg = extendImage(outputImg, i);
        outputImg = enhanceImage(outputImg);
    }
    
    let count = 0;
    for (let i = 0; i < outputImg.length; i++) {
        for (let j = 0; j < outputImg[0].length; j++) {
            if (outputImg[i][j] == '#') {
                count++
            }
        }
    }

    return count;
}

console.log(solve(inputImage, 2));
console.log(solve(inputImage, 50));







