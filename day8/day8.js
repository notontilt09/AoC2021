const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');

const outputs = input.map(line => line.split(' | ')[1].split(' '));

const part1 = () => {
  let uniqueSegments = [2, 3, 4, 7];
  let result = 0;
  for (let output of outputs) {
    for (let digit of output) {
      if (uniqueSegments.includes(digit.length)) {
        result++;
      }
    }
  }
  return result;
};

console.log(part1());

// turn a line of signal/output into a map of what string corresponds to what #
const solveEntry = (signals, result) => {
  const baseMap = {
    '0': [],  
    '1': [],  
    '2': [], 
    '3': [],
    '4': [],  
    '5': [],
    '6': [],
    '7': [],
    '8': [], 
    '9': [],
  }

  for (let signal of signals) {
    switch (signal.length) {
      case 2:
        baseMap['1'].push(signal);
        break;
      case 3:
        baseMap['7'].push(signal);
        break;
      case 4:
        baseMap['4'].push(signal);
        break;
      case 5:
        baseMap['2'].push(signal);
        baseMap['3'].push(signal);
        baseMap['5'].push(signal);
        break;
      case 6:
        baseMap['0'].push(signal);
        baseMap['6'].push(signal);
        baseMap['9'].push(signal);
        break;
      case 7:
        baseMap['8'].push(signal);
        break;
    }
  }

  // SOLVE FOR THE 3
  let possThrees = baseMap['3'];
  let oneSegments = baseMap['1'][0].split('');
  let three = possThrees.filter(three => three.includes(oneSegments[0]) && three.includes(oneSegments[1]));
  // set the 3 to what we found
  baseMap['3'] = three;
  // remove this possibility from 2 and 5
  baseMap['2'] = baseMap['2'].filter(two => two !== three[0])
  baseMap['5'] = baseMap['5'].filter(five => five !== three[0])

  // SOLVE FOR 9.  
  // Everything in the 9 is also in the 3
  let threeSegments = baseMap['3'][0].split('');
  let nine = baseMap['9'].filter(nine => (
    nine.includes(threeSegments[0]) &&
    nine.includes(threeSegments[1]) &&
    nine.includes(threeSegments[2]) &&
    nine.includes(threeSegments[3]) &&
    nine.includes(threeSegments[4])
  ))
  
  // set the 9 to what we found
  baseMap['9'] = nine;
  // remove the possibility from the 0 and 6
  baseMap['0'] = baseMap['0'].filter(zero => zero != nine[0]);
  baseMap['6'] = baseMap['6'].filter(six => six != nine[0]);

  // SOLVE FOR 0
  // Everything in 7 also in 0 but not 6
  let sevenSegments = baseMap['7'][0].split('');
  let zero = baseMap['0'].filter(zero => (
    zero.includes(sevenSegments[0]) &&
    zero.includes(sevenSegments[1]) &&
    zero.includes(sevenSegments[2])
  ))

  // set the 0 to what we found
  baseMap['0'] = zero;
  // SOLVE FOR 6
  // set the 6 to only other possibility
  baseMap['6'] = baseMap['6'].filter(six => six != zero[0]);

  // SOLVE FOR 5
  // Everything in 5 also in 9
  let fiveChars = baseMap['5'].map(five => five.split(''));
  if (fiveChars[0].every(char => baseMap['9'][0].includes(char))) {
    baseMap['5'] = [baseMap['5'][0]]
  } else {
    baseMap['5'] = [baseMap['5'][1]]
  }

  // SOLVE FOR 2
  baseMap['2'] = baseMap['2'].filter(two => two != baseMap['5'][0])

  for (let num in baseMap) {
    baseMap[num] = baseMap[num][0].split('').sort().join('');
  }

  // FIND OUTPUT NUMBERS

  // flip the map so strings map to numbers
  let goodMap = {};
  Object.keys(baseMap).forEach(key => {
    goodMap[baseMap[key]] = Number(key);
  })

  result = result.map(num => num.split('').sort().join(''))

  let answer = '';
  for (let code of result) {
    answer += goodMap[code]
  }


  return Number(answer);
}

const part2 = () => {
  let result = 0;
  for (let line of input) {
    let signal = line.split(' | ')[0].split(' ');
    let output = line.split(' | ')[1].split(' ');
    result += solveEntry(signal, output);
  }
  
  return result;
};

console.log(part2());