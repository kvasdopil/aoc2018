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
    h: parseInt(data[6], 10),
    id: data[0]
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

function intersect(a, b) {
  const x1 = a.x;
  const x2 = a.x + a.w - 1;
  const y1 = a.y;
  const y2 = a.y + a.h - 1;

  const x3 = b.x;
  const x4 = b.x + b.w - 1;
  const y3 = b.y;
  const y4 = b.y + b.h - 1;

  const xIntersect = x4 >= x1 && x3 <= x2;
  const yIntersect = y4 >= y1 && y3 <= y2;

  return xIntersect && yIntersect;
}

function solve(input) {
  const field = Array(WIDTH * WIDTH).fill(0);

  for (const a of input) {
    let good = true;
    for (const b of input) {
      if (a !== b) {
        if (intersect(a, b) || intersect(b, a)) {
          good = false;
          break;
        }
      }
    }
    if (good) {
      return a.id;
    }
  }

  return false;
}

assert(parse("#15 @ 70,418: 11x23").x, 70);
assert(parse("#15 @ 70,418: 11x23").y, 418);
assert(parse("#15 @ 70,418: 11x23").w, 11);
assert(parse("#15 @ 70,418: 11x23").h, 23);

const testInput = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];

assert(solve(testInput.map(parse)), "#3");
console.log(solve(file.map(parse)));
