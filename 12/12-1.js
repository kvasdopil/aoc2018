const testInput = "#..#.#..##......###...###";
const testRepls = [
  "...## => #",
  "..#.. => #",
  ".#... => #",
  ".#.#. => #",
  ".#.## => #",
  ".##.. => #",
  ".#### => #",
  "#.#.# => #",
  "#.### => #",
  "##.#. => #",
  "##.## => #",
  "###.. => #",
  "###.# => #",
  "####. => #"
].map(parse);

function parse(line) {
  const data = line.replace("=> ", "").split(" ");
  return {
    from: Array.from(data[0]).map(i => (i === "#" ? 1 : 0)),
    val: data[1] === "#" ? 1 : 0
  };
}

function process(input, repls, iters = 20) {
  const inp = Array.from(input);
  let data = new Array(inp.length * 4).fill(0);
  const zero = 10;

  for (let i in input) {
    const index = parseInt(i, 10);
    data[index + zero] = input[i] === "#" ? 1 : 0;
  }

  console.log(data.join(""));
  for (let steps = 0; steps < iters; steps++) {
    const newData = data.map((k, i) => {
      for (const repl of repls) {
        if (match(data, i, repl)) {
          return repl.val;
        }
      }
      return 0;
    });
    console.log(newData.join(""));
    data = newData;
  }

  return data.reduce((res, pot, n) => res + (pot ? n - zero : 0), 0);
}

function match(data, i, repl) {
  // console.log(data.slice(i - 2, i + 3).join(""), repl.from.join(""));
  for (let a = 0, j = -2; j < 3; j++, a++) {
    if (data[i + j] !== repl.from[a]) {
      // console.log("nope", j, data[i + j], repl.from[a]);
      return false;
    }
  }
  return true;
}

console.log(process(testInput, testRepls));

const file = require("fs")
  .readFileSync("./12.txt")
  .toString()
  .split("\n");

const init = file
  .shift()
  .split(": ")
  .pop();
file.shift();

const replacements = file.map(parse);

console.log(process(init, replacements, 202));

// 150 - 969
// 200 - 1219
// 201 - 1224
// 202 - 1229
// 1219 + 5 * (i - 200)

console.log(1219 + 5 * (50000000000 - 200));
