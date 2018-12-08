const fs = require("fs");

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function parse(line) {
  return line;
}

function solve(input) {
  let i = 0;

  const walk = start => {
    let nodeMeta = [];
    let childMeta = [];
    const n = input[i++];
    const m = input[i++];

    for (let ch = 0; ch < n; ch++) {
      childMeta.push(walk(i));
    }

    for (let mc = 0; mc < m; mc++) {
      const data = input[i++];
      nodeMeta.push(data);
    }

    if (n === 0) {
      return nodeMeta.reduce((a, b) => a + b, 0);
    }

    return nodeMeta
      .map(m => childMeta[m - 1])
      .filter(i => i !== undefined)
      .reduce((a, b) => a + b, 0);
  };

  return walk(0);
}

const file = fs
  .readFileSync("./8.txt")
  .toString()
  .split(" ")
  .map(i => parseInt(i, 10));

const input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2"
  .split(" ")
  .map(i => parseInt(i, 10));

assert(solve(input), 66);

console.log(solve(file));
