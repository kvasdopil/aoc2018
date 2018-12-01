const fs = require("fs");

const file = fs
  .readFileSync("./1.txt")
  .toString()
  .split("\n");

const solve = lines =>
  lines.reduce((acc, line) => {
    const val = parseInt(line.substr(1), 10);
    return acc + (line[0] === "-" ? -1 * val : val);
  }, 0);

console.log(solve(["+1", "+1", "+1"]) === 3);
console.log(solve(["+1", "+1", "-2"]) === 0);
console.log(solve(["-1", "-2", "-3"]) === -6);

console.log(solve(file));
