const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const hexMap = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111',
}

const convertToBits = str => {
  let result = '';
  for (let char of str) {
    result += hexMap[char];
  }

  return result;
}

let versSum = 0;
let parsePacket = (str)=>{
  versSum += parseInt(str.slice(0,3),2);
  let type = parseInt(str.slice(3,6),2);
  let packetLength;
  let values = [];
  if (type == 4) {
    let start = 6;
    let num = "";
    while (str[start] == '1') {
      num += str.slice(start+1,start+5);
      start += 5;
    }
    num += str.slice(start+1,start+5);
    return [start+5,parseInt(num,2)];
  } else {
    let lengthId = str[6];
    if (lengthId =='0') {
      let lenSubpackets = parseInt(str.slice(7,22),2);
      let pointer = 0;
      while (pointer < lenSubpackets) {
        let pkt = parsePacket(str.slice(22+pointer));
        pointer += pkt[0];
        values.push(pkt[1]);
      }
      packetLength = 22+lenSubpackets;
    } else {
      let numSubpackets = parseInt(str.slice(7,18),2);
      let pointer = 18;
      for (let _=0;_<numSubpackets;_++) {
        let pkt = parsePacket(str.slice(pointer));
        pointer += pkt[0];
        values.push(pkt[1]);
      }
      packetLength = pointer;
    }
    
    switch (type) {
      case 0: return [packetLength,values.reduce((a,b)=>a+b)];
      case 1: return [packetLength,values.reduce((a,b)=>a*b)];
      case 2: return [packetLength,values.reduce((a,b)=>Math.min(a,b))];
      case 3: return [packetLength,values.reduce((a,b)=>Math.max(a,b))];
      case 5: return [packetLength,(values[0]>values[1])?1:0];
      case 6: return [packetLength,(values[0]<values[1])?1:0];
      case 7: return [packetLength,(values[0]==values[1])?1:0];
    }
  }
}

let res = parsePacket(convertToBits(input));
console.log(versSum); //part 1
console.log(res[1]); // part 2
