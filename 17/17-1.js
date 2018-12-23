function parse(line) {
  const data = line
    .replace(/[.=,]/g, " ")
    .replace(/\s+/g, " ")
    .split(" ");
  const p1a = `${data[0]}a`;
  const p1b = `${data[0]}b`;
  const p2a = `${data[2]}a`;
  const p2b = `${data[2]}b`;
  return {
    [p1a]: parseInt(data[1], 10),
    [p1b]: parseInt(data[1], 10),
    [p2a]: parseInt(data[3], 10),
    [p2b]: parseInt(data[4], 10)
  };
}

function buildMap(input) {
  const xmin = input.reduce((res, item) => Math.min(res, item.xa), 9999) - 1;
  const xmax = input.reduce((res, item) => Math.max(res, item.xb), -9999) + 2;
  const ymin = 1; // input.reduce((res, item) => Math.min(res, item.ya), 9999) - 1;
  const ymax = input.reduce((res, item) => Math.max(res, item.yb), -9999) + 2;

  const result = Array(ymax - ymin)
    .fill(0)
    .map(() => Array(xmax - xmin).fill(0));

  for (const inp of input) {
    for (let y = inp.ya; y <= inp.yb; y++) {
      for (let x = inp.xa; x <= inp.xb; x++) {
        result[y - ymin][x - xmin] = 10;
      }
    }
  }

  result[0][500 - xmin] = "+";

  return result;
}

function print(field) {
  const m = i => {
    if (i === 10) {
      return "#";
    }
    if (i === 0) return " ";
    return i;
  };
  console.log(field.map(line => line.map(m).join("")).join("\n"));
}
let lasty = 0;

function process(field) {
  for (let y = field.length - 2; y >= 0; y--) {
    lasty = y;
    for (let x = 0; x < field[y].length; x++) {
      const val = field[y][x];
      const left = field[y][x - 1];
      const right = field[y][x + 1];
      const bottom = field[y + 1][x];

      if (val === "x" && right === 10 && left === ">") {
        field[y][x] = ">";
        return true;
      }
      if (val === "x" && left === 10 && right === "<") {
        field[y][x] = "<";
        return true;
      }

      if (val === "|" && bottom === "~") {
        field[y][x] = "v";
        return true;
      }

      if (val === "v" && left === "~" && right === "<") {
        field[y][x] = "<";
        return true;
      }

      if (val === "v" && left === ">" && right === "~") {
        field[y][x] = ">";
        return true;
      }

      if (val === "v" && bottom === 0) {
        field[y][x] = "|";
        field[y + 1][x] = "v";
        return true;
      }

      if (val === "v" && left === 0) {
        field[y][x - 1] = "<";
        return true;
      }

      if (val === "v" && right === 0) {
        field[y][x + 1] = ">";
        return true;
      }

      if (val === "<" && left === 0 && bottom !== 0) {
        field[y][x - 1] = "<";
        return true;
      }

      if (val === ">" && right === 0 && bottom !== 0) {
        field[y][x + 1] = ">";
        return true;
      }

      // if (val === "<" && left === "|" && bottom !== 0) {
      //   field[y][x] = "|";
      //   return true;
      // }

      // if (val === ">" && right === "|" && field[y + 1][x + 1] == "v") {
      //   field[y][x + 1] = 0;
      //   return true;
      // }

      if (val === "<" && left === 10) {
        field[y][x] = "~";
        return true;
      }

      if (val === "<" && left === "~") {
        field[y][x] = "~";
        return true;
      }

      if (val === ">" && right === 10) {
        field[y][x] = "~";
        return true;
      }

      if (val === ">" && right === "~") {
        field[y][x] = "~";
        return true;
      }

      if (
        val === "v" &&
        left !== "<" &&
        right !== ">" &&
        left !== "|" &&
        right !== "|" &&
        field[y - 1][x] === "|"
      ) {
        field[y - 1][x] = "v";
        field[y][x] = "~";
        return true;
      }

      if (val === "<" && bottom === 0) {
        field[y][x] = "v";
        return true;
      }

      if (val === ">" && bottom === 0) {
        field[y][x] = "v";
        return true;
      }
    }
  }
  return false;
}

function walk(field, startx, starty) {
  field[starty][startx] = "v";

  const len = field.length;

  let ct = 0;
  while (process(field)) {
    ct++;
    // print(field);
    if (ct % 100 === 0) {
      console.log(ct, lasty, (lasty / len).toFixed(2));
    }

    if (ct === 50000) {
      break;
    }
  }

  print(field);
}

function calc(field) {
  let ct = 0;
  for (let y = 1; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] != 10 && field[y][x] != 0) {
        ct++;
      }
    }
  }

  return ct;
}

function solve(field) {
  const startx = field[0].reduce((res, val, i) => (val === "+" ? i : res), 0);
  const starty = 0;

  walk(field, startx, starty);
  return calc(field);
}

const testInput = [
  "x=495, y=2..7",
  "y=7, x=495..501",
  "x=501, y=3..7",
  "x=498, y=2..4",
  "x=506, y=1..2",
  "x=498, y=10..13",
  "x=504, y=10..13",
  "y=13, x=498..504"
].map(parse);

const field = buildMap(testInput);
console.log(solve(field));

// ==========

const testInput2 = [
  "x=490, y=2..10",
  "x=510, y=2..10",
  "y=10, x=490..510",
  "x=495, y=5..7"
].map(parse);

const field2 = buildMap(testInput2);
console.log(solve(field2));

// ==========

const testInput3 = [
  "x=490, y=2..10",
  "x=510, y=2..10",
  "y=10, x=490..510",
  "x=495, y=5..7",
  "x=505, y=5..7",
  "y=7, x=495..505"
].map(parse);

const field3 = buildMap(testInput3);
console.log(solve(field3));

// ==========

const testInput4 = [
  "x=490, y=2..10",
  "x=510, y=2..10",
  "y=10, x=490..510",
  "x=495, y=5..7",
  "x=505, y=5..7",
  "y=7, x=495..505",
  "y=3, x=495..505"
].map(parse);

const field4 = buildMap(testInput4);
console.log(solve(field4));

// ==========

const testInput5 = [
  "x=490, y=2..10",
  "x=510, y=3..10",
  "y=10, x=490..510",
  "x=495, y=5..7",
  "x=500, y=5..7",
  "y=7, x=495..500"
].map(parse);

const field5 = buildMap(testInput5);
console.log(solve(field5));

const file = require("fs")
  .readFileSync("17.txt")
  .toString()
  .split("\n")
  .map(parse);

const fieldBig = buildMap(file);
console.log(solve(fieldBig));

// 229406 hi
