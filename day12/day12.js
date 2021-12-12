const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split('-'));
const test = fs.readFileSync('test.txt').toString().split('\n').map(line => line.split('-'));

// console.log(test);

const buildGraph = (connections) => {
  let graph = {}

  for (let connection of connections) {
    if (!graph[connection[0]]) {
      graph[connection[0]] = [connection[1]];
    } else {
      graph[connection[0]].push(connection[1]);
    }
    if(!graph[connection[1]]) {
      graph[connection[1]] = [connection[0]];
    } else {
      graph[connection[1]].push(connection[0]);
    }
  }

  // can never go back to start
  for (let key in graph) {
    graph[key] = graph[key].filter(val => val !== 'start');
  }

  return graph;
}

const part1 = (start, end, graph) => {
  let totalPaths = 0;
  let q = [[start]];
  while (q.length) {
    let path = q.pop();
    let node = path[path.length - 1]
    for (let neighbor of graph[node]) {
      let tempPath = [...path];
      if (neighbor == end) {
        totalPaths++;
        continue;
      }
      if (!path.includes(neighbor) || neighbor == neighbor.toUpperCase()) {
        tempPath.push(neighbor);
        q.push(tempPath);
      }
    }
  }

  return totalPaths;
}

console.log(part1('start', 'end', buildGraph(input)))

const part2 = (start, end, graph) => {
  let totalPaths = 0;
  let q = [[start]];
  while (q.length) {
    let path = q.pop();
    let node = path[path.length - 1]
    for (let neighbor of graph[node]) {
      let tempPath = [...path];
      if (neighbor == neighbor.toLowerCase() && tempPath.includes(neighbor)) {
        let small = tempPath.filter(cave => cave == cave.toLowerCase());
        if (small.length !== new Set(small).size) { // duplicate small cave
          continue;
        }
      }
      if (neighbor == end) {
        totalPaths++;
        continue;
      }
      tempPath.push(neighbor);
      q.push(tempPath);
    }
  }
  
  return totalPaths;
}

console.log(part2('start', 'end', buildGraph(input)));


