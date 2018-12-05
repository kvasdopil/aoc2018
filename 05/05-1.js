const fs = require("fs");

const file = fs
  .readFileSync("./5.txt")
  .toString()
  .split("\n");

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

const r1 = Array.from("abcdefghijklmnopqrstuvwxyz").map(
  a => a.toUpperCase() + a
);
const r2 = Array.from("abcdefghijklmnopqrstuvwxyz").map(
  a => a + a.toUpperCase()
);
const reacts = [].concat(r1, r2);

function process(input) {
  let result = input;
  while (true) {
    const old = result;

    for (const react of reacts) {
      result = result.replace(react, "");
    }

    if (old === result) {
      return result;
    }
  }
}

let testInput = "dabAcCaCBAcCcaDA";
assert(process(testInput), "dabCBAcaDA");

assert(process("a"), "a");
assert(process("aA"), "");
assert(process("abBA"), "");
assert(process("abAB"), "abAB");
assert(process("aabAAB"), "aabAAB");

console.log(process(file[0]).length);
