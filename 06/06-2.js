const fs = require("fs");

const letters = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЏЎ"
);

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function parse(line, index) {
  const data = line.replace(",", "").split(" ");
  return {
    x: parseInt(data[0], 10),
    y: parseInt(data[1], 10),
    i: letters[index]
  };
}

function print(cells, size) {
  const result = [];
  for (var y = 0; y < size; y++) {
    const line = [];
    for (var x = 0; x < size; x++) {
      line.push(cells[y * size + x]);
    }
    result.push(line.join(""));
  }
  return result.join("\n");
}

function calcDistance(x, y, list, margin) {
  const dists = list.map(item => Math.abs(item.x - x) + Math.abs(item.y - y));

  const total = dists.reduce((sum, i) => i + sum, 0);

  return total < margin ? "#" : "-";
}

function solve(input, cells, size, margin) {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      cells[y * size + x] = calcDistance(x, y, input, margin);
    }
  }
}

function calcStats(data) {
  return data.reduce((arr, item) => {
    const old = arr[item] || 0;
    return { ...arr, [item]: old + 1 };
  }, {});
}

function process(input, size, margin) {
  const data1 = Array(size * size).fill(".");

  input.map((coord, i) => {
    data1[coord.y * size + coord.x] = coord.i;
  });

  solve(input, data1, size, margin);

  return calcStats(data1);
}

// ============================================================================================

const file = fs
  .readFileSync("./6.txt")
  .toString()
  .split("\n")
  .map(parse);

let testInput = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"].map(parse);

assert(testInput, [
  { x: 1, y: 1, i: "A" },
  { x: 1, y: 6, i: "B" },
  { x: 8, y: 3, i: "C" },
  { x: 3, y: 4, i: "D" },
  { x: 5, y: 5, i: "E" },
  { x: 8, y: 9, i: "F" }
]);

assert(process(testInput, 10, 32), { "-": 84, "#": 16 });

console.log(process(file, 500, 10000));
