function parse(input) {
  const txt = input
    .replace("^", '["')
    .replace("$", '"]')
    .replace(/\(/g, '",{"of": [["')
    .replace(/\)/g, '"]]},"')
    .replace(/\|/g, '"],["');
  return JSON.parse(txt);
}

function solve(tree, walker = { x: 0, y: 0, steps: 0, rooms: {} }) {
  while (tree.length) {
    const item = tree.shift();
    if (typeof item === "string") {
      for (const letter of item) {
        walker.steps++;
        const { x, y } = walker;
        const newvals = {
          S: { x, y: y + 1 },
          N: { x, y: y - 1 },
          W: { x: x - 1, y },
          E: { x: x + 1, y }
        };
        const next = newvals[letter];
        walker.x = next.x;
        walker.y = next.y;

        const id = `${y}:${x}`;
        const oldval = walker.rooms[id] || 99999999;
        if (walker.steps < oldval) {
          walker.rooms[id] = walker.steps;
        }
      }
      continue;
    }

    const { x, y, steps } = walker;
    for (const child of item.of) {
      walker.x = x;
      walker.y = y;
      walker.steps = steps;
      solve(child, walker);
    }
  }

  return walker;
}

function calc(walker) {
  const result = Object.values(walker.rooms);
  result.sort((a, b) => a - b);
  return result.pop();
}

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

assert(parse("^ABC$"), ["ABC"]);
assert(parse("^A(B|C)D$"), ["A", { of: [["B"], ["C"]] }, "D"]);
const res = parse("^A(B|C(D|E)|(F|))G$");
const ex = [
  "A",
  {
    of: [
      ["B"],
      ["C", { of: [["D"], ["E"]] }, ""],
      ["", { of: [["F"], [""]] }, ""]
    ]
  },
  "G"
];
assert(res, ex);

assert(calc(solve(parse("^WNE$"))), 3);
assert(calc(solve(parse("^ENWWW(NEEE|SSE(EE|N))$"))), 10);
assert(calc(solve(parse("^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$"))), 18);
assert(
  calc(solve(parse("^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$"))),
  23
);
assert(
  calc(
    solve(
      parse("^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$")
    )
  ),
  31
);

const file = require("fs")
  .readFileSync("./20.txt")
  .toString()
  .trim();

console.log(calc(solve(parse(file))));
