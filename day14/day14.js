const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n').filter(line => line);
const test = fs.readFileSync('test.txt').toString().split('\n').filter(line => line);

const makeMap = (arr) => {
  const map = {};
  const _ = arr[0];
  let dirs = arr.slice(1);

  for (let dir of dirs) {
    let pair = dir.split(' -> ')[0];
    let insert = dir.split(' -> ')[1];
    map[pair] = insert;
  }

  return map;
  
}

const polymerize = (str, map) => {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str[i]);
    result.push('');
  }
  result = result.slice(0, result.length - 1);
  // take pairs of letters at a time
  for (let i = 0; i < result.length - 1; i++) {
    if (!result[i]) {
      result[i] = map[`${result[i-1]}${result[i+1]}`]
    }
  }

  return result.join('');
}

const findCounts = (str) => {
  let counts = {};
  for (let char of str) {
    if (!counts[char]) {
      counts[char] = 1;
    } else {
      counts[char]++
    }
  }

  return counts;

}

const part1 = (data) => {
  let map = makeMap(data);
  let res = data[0];
  for (let i = 0; i < 10; i++) {
    res = polymerize(res, map);
  }
  
  
  let counts = findCounts(res);
  let countsArr = Object.values(counts).sort((a, b) => b - a);
  
  return countsArr[0] - countsArr[countsArr.length - 1]
}

console.log(part1(input));

// running the loop 40 times will crash comp, lets optimize
// try to just keep track of the counts of pairs, instead of the whole string

const makePairMap = arr => {
  let str = arr[0];
  const map = {}
  for (let i = 0; i < str.length-1; i++) {
    let pair = str.slice(i, i+2);
    if (!map[pair]) {
      map[pair] = 1;
    } else {
      map[pair]++
    }
  }

  return map;
}

// create new pair map with pairs created by polymerization
const polymerizePart2 = (pairMap, map) => {
  let res = {}
  for (let pair in pairMap) {
    let insert = map[pair];
    let new1 = `${pair[0]}${insert}`;
    let new2 = `${insert}${pair[1]}`;
    if (!res[new1]) {
      res[new1] = pairMap[pair];
    } else {
      res[new1]+= pairMap[pair]
    }
    if (!res[new2]) {
      res[new2] = pairMap[pair];
    } else {
      res[new2]+= pairMap[pair];
    }
  }

  return res;
}

const findCountsFromPairMap = (origStr, pairMap) => {
  let counts = {};
  // for every pair in pairMap add count to each letter of pair
  for (let pair in pairMap) {
    let amount = pairMap[pair]
    let [first, second] = [pair[0], pair[1]];
    if (!counts[first]) {
      counts[first] = amount;
    } else {
      counts[first]+= amount;
    }
    if (!counts[second]) {
      counts[second] = amount;
    } else {
      counts[second]+= amount;
    }
  }
  // add 1 to first and last letters of origStr
  counts[origStr[0]]++;
  counts[origStr[origStr.length - 1]]++

  return counts;
}

const part2 = (data) => {
  let map = makeMap(data);
  let pairMap = makePairMap(data);
  for (let i = 0; i < 40; i++) {
    pairMap = polymerizePart2(pairMap, map);
  }

  console.log(pairMap);


  const counts = findCountsFromPairMap(data[0], pairMap);
  
  let countsArr = Object.values(counts).sort((a, b) => b - a);
  
  // counts are all doubled since we counted all pairs as 1
  return (countsArr[0] - countsArr[countsArr.length - 1]) / 2
  
}

console.log(part2(input));

