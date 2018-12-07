const fs = require("fs");

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function parse(line) {
  const data = line.split(" ");
  return {
    from: data[1],
    to: data[7]
  };
}

const uniq = a => Object.keys(a.reduce((a, b) => ({ ...a, [b]: 1 }), {}));

function solve(input) {
  let complete = [];

  let all = uniq(
    [].concat(input.map(item => item.from), input.map(item => item.to))
  ); // list of all available letters

  all.sort();

  // console.log(all);

  while (complete.length < all.length) {
    for (let nxt of all) {
      if (complete.indexOf(nxt) >= 0) {
        continue;
      }

      const conditions = input
        .filter(cond => cond.to === nxt)
        .every(cond => complete.indexOf(cond.from) >= 0);

      if (conditions) {
        complete.push(nxt);
        break;
      }
    }
  }

  return complete.join("");
}

const file = fs
  .readFileSync("./7.txt")
  .toString()
  .split("\n")
  .map(parse);

const testInput = [
  "Step C must be finished before step A can begin.",
  "Step C must be finished before step F can begin.",
  "Step A must be finished before step B can begin.",
  "Step A must be finished before step D can begin.",
  "Step B must be finished before step E can begin.",
  "Step D must be finished before step E can begin.",
  "Step F must be finished before step E can begin."
].map(parse);

assert(testInput, [
  { from: "C", to: "A" },
  { from: "C", to: "F" },
  { from: "A", to: "B" },
  { from: "A", to: "D" },
  { from: "B", to: "E" },
  { from: "D", to: "E" },
  { from: "F", to: "E" }
]);

assert(solve(testInput), "CABDFE");

console.log(solve(file));
