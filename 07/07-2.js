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

function solve(input, wnum = 2, preload = 0) {
  let complete = [];

  let all = uniq(
    [].concat(input.map(item => item.from), input.map(item => item.to))
  ); // list of all available letters

  all.sort();

  const workers = Array(wnum)
    .fill(0)
    .map(() => ({ busy: 0 }));

  let tick = 0;

  while (complete.length < all.length) {
    // console.log(tick, workers);

    for (let nxt of all) {
      if (complete.indexOf(nxt) >= 0) {
        continue;
      }

      if (workers.some(w => w.nxt === nxt)) {
        continue;
      }

      const conditions = input
        .filter(cond => cond.to === nxt)
        .every(cond => complete.indexOf(cond.from) >= 0);

      if (!conditions) {
        continue;
      }

      // console.log("about to start", nxt);

      const worker = workers.reduce((res, w, i) => (w.busy ? res : i), false);
      if (worker === false) {
        continue; // no free workers
      }

      workers[worker] = {
        busy: nxt.charCodeAt(0) - "A".charCodeAt(0) + 1 + preload,
        nxt
      };
    }

    tick++;
    for (let w of workers) {
      if (w.busy > 0) {
        w.busy--;
        if (w.busy === 0) {
          complete.push(w.nxt);
        }
      }
    }
  }

  return { order: complete.join(""), tick };
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

assert(solve(testInput, 2, 0), { order: "CABFDE", tick: 15 });

console.log(solve(file, 4, 60));
