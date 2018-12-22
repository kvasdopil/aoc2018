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

function walk(field, startx, starty) {
  const points = [{ x: startx, y: starty }];
  console.log("");

  while (points.length) {
    let { x, y } = points.shift();
    // print(field);
    while (field[y + 1][x] === 0) {
      field[y][x] = "|";
      y++;
      field[y][x] = "|";
      if (y >= field.length - 1) {
        break;
      }
    }
    if (y >= field.length - 1) {
      continue;
    }

    // if (field[y + 1][x] === "~") {
    //   continue;
    // }

    if (field[y + 1][x] === ">") {
      continue;
    }

    if (field[y + 1][x] === "<") {
      continue;
    }

    while (true) {
      // print(field);
      field[y][x] = "x";
      let splitx = x;

      x = splitx;
      while (field[y][x - 1] === 0 && field[y + 1][x] !== 0) {
        x--;
        field[y][x] = "<";
      }

      while (field[y][x] !== "x" && field[y + 1][x] !== 0) {
        field[y][x] = "~";
        x++;
      }

      if (x != splitx) {
        points.push({ x, y });
      }

      x = splitx;
      while (field[y][x + 1] === 0 && field[y + 1][x] !== 0) {
        x++;
        field[y][x] = ">";
      }

      while (field[y][x] !== "x" && field[y + 1][x] !== 0) {
        field[y][x] = "~";
        x--;
      }

      if (x != splitx) {
        points.push({ x, y });
      }

      x = splitx;
      if (field[y][x - 1] != "<" && field[y][x + 1] != ">") {
        field[y][x] = "~";
        y--;
        continue;
      }

      break;
    }
  }
  print(field);
}

function solve(field) {
  const startx = field[0].reduce((res, val, i) => (val === "+" ? i : res), 0);
  const starty = 0;

  walk(field, startx, starty);
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

const file = require("fs")
  .readFileSync("17.txt")
  .toString()
  .split("\n")
  .map(parse);

const fieldBig = buildMap(file);
// console.log(solve(fieldBig));

// 229406 hi
// 229410;
