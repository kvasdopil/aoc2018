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

assert(testInput, [
  { x: 1, y: 1, i: "A" },
  { x: 1, y: 6, i: "B" },
  { x: 8, y: 3, i: "C" },
  { x: 3, y: 4, i: "D" },
  { x: 5, y: 5, i: "E" },
  { x: 8, y: 9, i: "F" }
]);

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

function calcClosest(x, y, list) {
  const dists = list.map(item => ({
    i: item.i,
    dst: Math.abs(item.x - x) + Math.abs(item.y - y)
  }));

  dists.sort((a, b) => a.dst - b.dst);

  if (dists[0].dst === dists[1].dst) {
    return ".";
  }

  return dists[0].i.toLowerCase();
}

function solve(input, cells, size) {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      const val = cells[y * size + x];
      // if (val !== ".") {
      //   continue;
      // }
      cells[y * size + x] = calcClosest(x, y, input);
    }
  }
}

function calcStats(data) {
  return data.reduce((arr, item) => {
    const old = arr[item] || 0;
    return { ...arr, [item]: old + 1 };
  }, {});
}

function process(input, size) {
  const data1 = Array(size * size).fill(".");
  const data2 = Array((size + 2) * (size + 2)).fill(".");

  const input2 = input.map(i => ({
    i: i.i,
    x: i.x + 1,
    y: i.y + 1
  }));

  input.map((coord, i) => {
    data1[coord.y * size + coord.x] = coord.i;
  });

  input2.map((coord, i) => {
    data2[coord.y * (size + 2) + coord.x] = coord.i;
  });

  solve(input, data1, size);
  solve(input2, data2, size + 2);

  const stats1 = calcStats(data1);
  const stats2 = calcStats(data2);

  // console.log(print(data1, size));
  // console.log(print(data2, size + 2));

  const res = Object.keys(stats1)
    .filter(key => stats1[key] === stats2[key])
    .map(key => [key, stats1[key]]);

  res.sort((a, b) => a[1] - b[1]);

  return res.pop();
}

// ============================================================================================

const file = fs
  .readFileSync("./6.txt")
  .toString()
  .split("\n")
  .map(parse);

let testInput = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"].map(parse);

console.log(process(testInput, 10));
console.log(process(file, 500));
