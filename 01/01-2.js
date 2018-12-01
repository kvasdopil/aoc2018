const fs = require("fs");

const file = fs
  .readFileSync("./1.txt")
  .toString()
  .split("\n");

const solve = lines => {
  let value = 0;
  const values = { "0": true };
  while (true) {
    for (const line of lines) {
      const val = parseInt(line.substr(1), 10);
      value += line[0] === "-" ? -1 * val : val;

      if (values[value]) {
        return value;
      }

      values[value] = true;
    }
  }
};

console.log(solve(["+1", "-1"]) === 0);
console.log(solve(["+3", "+3", "+4", "-2", "-4"]) === 10);
console.log(solve(["-6", "+3", "+8", "+5", "-6"]) === 5);
console.log(solve(["+7", "+7", "-2", "-7", "-4"]) === 14);

console.log(solve(file));
