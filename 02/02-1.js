const fs = require("fs");

const file = fs
  .readFileSync("./2.txt")
  .toString()
  .split("\n");

function assert(a, b) {
  if (a[0] !== b[0] || a[1] !== b[1]) {
    console.log(a, "!=", b);
  }
}

function solve(input) {
  const res = {};
  for (const letter of Array.from(input)) {
    const old = res[letter] || 0;
    res[letter] = old + 1;
  }

  return [
    Object.values(res).filter(a => a === 2).length > 0 ? 1 : 0,
    Object.values(res).filter(a => a === 3).length > 0 ? 1 : 0
  ];
}

assert(solve("abcdef"), [0, 0]);
assert(solve("bababc"), [1, 1]); // contains two a and three b, so it counts for both.
assert(solve("abbcde"), [1, 0]); // contains two b, but no letter appears exactly three times.
assert(solve("abcccd"), [0, 1]); // contains three c, but no letter appears exactly two times.
assert(solve("aabcdd"), [1, 0]); // contains two a and two d, but it only counts once.
assert(solve("abcdee"), [1, 0]); // contains two e.
assert(solve("ababab"), [0, 1]); // contains three a and three b, but it only counts once.

//console.log(solve(file));
const result = [0, 0];
for (const line of file) {
  const lineres = solve(line);
  result[0] += lineres[0];
  result[1] += lineres[1];
}

console.log(result[0] * result[1]);
