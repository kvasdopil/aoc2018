const fs = require("fs");

const file = fs
  .readFileSync("./3.txt")
  .toString()
  .split("\n");

function parse(line) {
  const data = line.replace(/[:,x]/g, " ").split(" ");
  return {
    x: parseInt(data[2], 10),
    y: parseInt(data[3], 10),
    w: parseInt(data[5], 10),
    h: parseInt(data[6], 10)
  };
}

function assert(a, b) {
  if (a != b) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

const WIDTH = 1000;

function solve(input) {
  const field = Array(WIDTH * WIDTH).fill(0);

  for (const item of input) {
    for (let x = item.x; x < item.x + item.w; x++) {
      for (let y = item.y; y < item.y + item.h; y++) {
        field[x * WIDTH + y]++;
      }
    }
  }

  return field.filter(i => i > 1).length;
}

assert(parse("#15 @ 70,418: 11x23").x, 70);
assert(parse("#15 @ 70,418: 11x23").y, 418);
assert(parse("#15 @ 70,418: 11x23").w, 11);
assert(parse("#15 @ 70,418: 11x23").h, 23);

const testInput = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];

assert(solve(testInput.map(parse)), 4);
console.log(solve(file.map(parse)));
