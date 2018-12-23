function print(state) {
  console.log();
  console.log(state.map(a => a.join("")).join("\n"));
}

let coords = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

function turn(state) {
  let result = state.map(a => a.map(i => i));

  for (let y = 0; y < state.length; y++) {
    const len = state[y].length;
    for (let x = 0; x < len; x++) {
      const neighbours = coords
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(([x, y]) => x >= 0 && y >= 0 && x < len && y < state.length)
        .map(([x, y]) => state[y][x]);

      const val = state[y][x];
      let res = val;

      if (val === ".") {
        if (neighbours.filter(a => a === "|").length >= 3) {
          res = "|";
        }
      }

      if (val === "|") {
        if (neighbours.filter(a => a === "#").length >= 3) {
          res = "#";
        }
      }

      if (val === "#") {
        if (
          neighbours.filter(a => a === "#").length === 0 ||
          neighbours.filter(a => a === "|").length === 0
        ) {
          res = ".";
        }
      }

      result[y][x] = res;
    }
  }

  return result;
}

function run(state, iters) {
  let field = state;
  print(field);
  for (let n = 0; n < iters; n++) {
    field = turn(field);
  }
  print(field);
  const single = field.reduce((a, b) => a.concat(b), []);
  const lumbers = single.filter(a => a === "#").length;
  const trees = single.filter(a => a === "|").length;
  return lumbers * trees;
}

const state = [
  ".#.#...|#.",
  ".....#|##|",
  ".|..|...#.",
  "..|#.....#",
  "#.#|||#|#|",
  "...#.||...",
  ".|....|...",
  "||...#|.#|",
  "|.||||..|.",
  "...#.|..|."
].map(a => Array.from(a));
console.log(run(state, 10));

const file = require("fs")
  .readFileSync("18.txt")
  .toString()
  .split("\n")
  .map(a => Array.from(a));
console.log(run(file, 10));
