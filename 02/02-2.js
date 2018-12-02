const fs = require("fs");

const file = fs
  .readFileSync("./2.txt")
  .toString()
  .split("\n");

function assert(a, b) {
  if (a != b) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function diff1(a, b) {
  if (a.length != b.length) {
    return "";
  }

  let res = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] == b[i]) {
      res.push(a[i]);
    }
  }

  return res.join("");
}

function solve(input) {
  for (const a of input) {
    for (const b of input) {
      if (a != b) {
        const diff = diff1(a, b);
        if (diff.length == a.length - 1) {
          return diff;
        }
      }
    }
  }
  return null;
}

assert(diff1("abcde", "abcd"), "");
assert(diff1("abcde", "fghij"), "");
assert(diff1("fguij", "fghij"), "fgij");

assert(
  solve(["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"]),
  "fgij"
);

console.log(solve(file));
