function parse(line) {
  const [x, y, z, r] = line
    .replace(/[= r>pos<]/g, "")
    .split(",")
    .map(a => parseInt(a, 10));

  return { r, x, y, z };
}

function solve(input) {
  input.sort((a, b) => b.r - a.r);

  const strongest = input[0];

  const inRange = input.filter(
    ({ x, y, z }) =>
      Math.abs(strongest.x - x) +
        Math.abs(strongest.y - y) +
        Math.abs(strongest.z - z) <=
      strongest.r
  );

  inRange.sort((a, b) => a - b);

  return inRange.length;
}

const testInput = [
  "pos=<0,0,0>, r=4",
  "pos=<1,0,0>, r=1",
  "pos=<4,0,0>, r=3",
  "pos=<0,2,0>, r=1",
  "pos=<0,5,0>, r=3",
  "pos=<0,0,3>, r=1",
  "pos=<1,1,1>, r=1",
  "pos=<1,1,2>, r=1",
  "pos=<1,3,1>, r=1"
].map(parse);

console.log(solve(testInput));

const file = require("fs")
  .readFileSync("23.txt")
  .toString()
  .split("\n")
  .map(parse);
console.log(solve(file));
