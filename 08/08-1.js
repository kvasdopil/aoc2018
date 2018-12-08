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
  let meta = [];

  const walk = start => {
    const n = input[i++];
    const m = input[i++];

    for (let ch = 0; ch < n; ch++) {
      walk(i);
    }

    for (let mc = 0; mc < m; mc++) {
      meta.push(input[i++]);
    }
  };

  walk(0);
  return meta.reduce((a, b) => a + b, 0);
}

const file = fs
  .readFileSync("./8.txt")
  .toString()
  .split(" ")
  .map(i => parseInt(i, 10));

const input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2"
  .split(" ")
  .map(i => parseInt(i, 10));

assert(solve(input), 138);

console.log(solve(file));
