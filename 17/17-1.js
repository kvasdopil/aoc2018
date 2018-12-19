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
  const xmin =
    testInput.reduce((res, item) => Math.min(res, item.xa), 9999) - 1;
  const xmax =
    testInput.reduce((res, item) => Math.max(res, item.xb), -9999) + 2;
  const ymin =
    testInput.reduce((res, item) => Math.min(res, item.ya), 9999) - 1;
  const ymax =
    testInput.reduce((res, item) => Math.max(res, item.yb), -9999) + 2;

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

function process(field) {
  let mod = false;

  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      const val = field[y][x];
      if (val === 10) {
        continue;
      }
      if (val === 0) {
        continue;
      }

      if (val > 1) {
        const bottom = field[y + 1][x];
        const left = field[y][x - 1];
        const right = field[y][x + 1];

        if (bottom < 9) {
          if (y < field.length - 2) {
            field[y + 1][x]++;
          }
          field[y][x]--;
          mod = true;
        } else {
          if (left < val - 1) {
            field[y][x - 1] = val;
            field[y][x]--;
            mod = true;
          }

          if (right < val - 1) {
            field[y][x + 1] = val;
            field[y][x]--;
            mod = true;
          }
        }
      }
    }
  }

  return mod;
}

function solve(field) {
  const startx = field[0].reduce((res, val, i) => (val === "+" ? i : res), 0);
  const starty = 1;
  field[starty][startx] = 0;

  while (field[starty][startx] < 8) {
    field[starty][startx]++;
    while (process(field)) {
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
