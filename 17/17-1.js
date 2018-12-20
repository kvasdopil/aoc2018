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
  const ymin = input.reduce((res, item) => Math.min(res, item.ya), 9999) - 1;
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

function solve(field) {
  const startx = field[0].reduce((res, val, i) => (val === "+" ? i : res), 0);
  const starty = 1;

  for (let i = 0; i < 200; i++) {
    let x = startx;
    let y = starty;
    let last = 0;
    while (true) {
      const xo = x;
      const yo = y;
      if (field[y][x] === 0) {
        field[y][x] = 1;
      }

      while (field[y + 1][x] < 9) {
        last = 0;
        y++;
        if (field[y][x] === 0) {
          field[y][x] = 1;
        }
      }

      // if (field[y][x] === 1) {
      //   field[y][x] = 0;
      // }

      if (last === 0) {
        if (field[y][x - 1] < 9) {
          last = -1;
        } else {
          last = 1;
        }
      }

      if (field[y][x + last] < 9) {
        x += last;
      }

      if (xo === x && yo === y) {
        field[y][x] = 9;
        break;
      }

      print(field);
    }
  }
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
solve(field);

// const file = require("fs")
//   .readFileSync("17.txt")
//   .toString()
//   .split("\n")
//   .map(parse);

// const fileField = buildMap(file);
// solve(fileField);
