function parse(line) {
  const data = line.replace(/[<>]/g, ",").split(",");

  return {
    x: parseInt(data[1], 10),
    y: parseInt(data[2], 10),
    vx: parseInt(data[4], 10),
    vy: parseInt(data[5], 10)
  };
}

function process(input, days) {
  for (var step = 0; step <= days; step++) {
    for (let star of input) {
      star.x += star.vx;
      star.y += star.vy;
    }

    const bounds = input.reduce(
      (b, star) => ({
        minx: Math.min(b.minx, star.x),
        maxx: Math.max(b.maxx, star.x),
        miny: Math.min(b.miny, star.y),
        maxy: Math.max(b.maxy, star.y)
      }),
      { minx: 999, miny: 999, maxx: -999, maxy: -999 }
    );

    const dx = bounds.maxx - bounds.minx;

    if (dx < 100) {
      const result = [];
      for (let Y = bounds.miny - 1; Y <= bounds.maxy; Y++) {
        const line = [];
        for (let X = bounds.minx - 1; X <= bounds.maxx; X++) {
          const star = input.some(star => star.x === X && star.y === Y);
          line.push(star ? "#" : ".");
        }
        result.push(line.join(""));
      }

      console.log(step + 1);
      console.log(result);
    }
  }
}

const testInput = [
  "position=< 9,  1> velocity=< 0,  2>",
  "position=< 7,  0> velocity=<-1,  0>",
  "position=< 3, -2> velocity=<-1,  1>",
  "position=< 6, 10> velocity=<-2, -1>",
  "position=< 2, -4> velocity=< 2,  2>",
  "position=<-6, 10> velocity=< 2, -2>",
  "position=< 1,  8> velocity=< 1, -1>",
  "position=< 1,  7> velocity=< 1,  0>",
  "position=<-3, 11> velocity=< 1, -2>",
  "position=< 7,  6> velocity=<-1, -1>",
  "position=<-2,  3> velocity=< 1,  0>",
  "position=<-4,  3> velocity=< 2,  0>",
  "position=<10, -3> velocity=<-1,  1>",
  "position=< 5, 11> velocity=< 1, -2>",
  "position=< 4,  7> velocity=< 0, -1>",
  "position=< 8, -2> velocity=< 0,  1>",
  "position=<15,  0> velocity=<-2,  0>",
  "position=< 1,  6> velocity=< 1,  0>",
  "position=< 8,  9> velocity=< 0, -1>",
  "position=< 3,  3> velocity=<-1,  1>",
  "position=< 0,  5> velocity=< 0, -1>",
  "position=<-2,  2> velocity=< 2,  0>",
  "position=< 5, -2> velocity=< 1,  2>",
  "position=< 1,  4> velocity=< 2,  1>",
  "position=<-2,  7> velocity=< 2, -2>",
  "position=< 3,  6> velocity=<-1, -1>",
  "position=< 5,  0> velocity=< 1,  0>",
  "position=<-6,  0> velocity=< 2,  0>",
  "position=< 5,  9> velocity=< 1, -2>",
  "position=<14,  7> velocity=<-2,  0>",
  "position=<-3,  6> velocity=< 2, -1>"
].map(parse);

console.log(process(testInput, 5));

const file = require("fs")
  .readFileSync("./10.txt")
  .toString()
  .split("\n")
  .map(parse);

process(file, 100000);
