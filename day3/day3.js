const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

const part1 = () => {
  const findMostCommon = (str) => {
    let sorted = str.sort((a, b) => a - b);

    return sorted[sorted.length/2]
  }

  let binary = '';

  for (i = 0; i < input[0].length; i++) {
    let str = input.map(elem => elem[i])
    binary += findMostCommon(str);
  }

  const gamma = parseInt(binary, 2);

  const flip = (str) => {
    let res = '';

    for (let char of str) {
      if (char === '1') {
        res += '0';
      } else {
        res += '1';
      }
    }

    return res;
  }

  const epsilon = parseInt(flip(binary),2)

  return gamma * epsilon;
}

const part2 = () => {
  const findTotalCount = (str) => {
    let zeroes = 0;
    let ones = 0;

    for (let char of str) {
      if (char === '0') {
        zeroes++;
      } else {
        ones++;
      }
    }

    return [zeroes, ones]
  }

  // find 02 rating
  let fresh = [...input];
  let idx = 0;
  
  while (fresh.length > 1) {
    let str = fresh.map(elem => elem[idx]);
    let [zeroes, ones] = findTotalCount(str);
    if (ones >= zeroes) {
      fresh = fresh.filter(item => item[idx] === '1');
    } else {
      fresh = fresh.filter(item => item[idx] === '0');
    }
    idx++;
  }

  const o2 = parseInt(fresh[0], 2);

  // find c02 rating
  fresh = [...input];
  idx = 0;

  while (fresh.length > 1) {
    let str = fresh.map(elem => elem[idx]);
    let [zeroes, ones] = findTotalCount(str);
    if (ones < zeroes) {
      fresh = fresh.filter(item => item[idx] === '1');
    } else {
      fresh = fresh.filter(item => item[idx] === '0');
    }
    idx++;
  }

  const c02 = parseInt(fresh[0], 2);

  return o2 * c02;

}


console.log(part1());
console.log(part2());