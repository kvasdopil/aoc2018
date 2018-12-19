function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function print(f) {
  console.log();
  console.log(f.map(line => line.join("")).join("\n"));
}

function isInRange(input, x, y, letter) {
  return (
    input[y - 1][x] === letter ||
    input[y + 1][x] === letter ||
    input[y][x - 1] === letter ||
    input[y][x + 1] === letter
  );
}

function findPaths(input, fromx, fromy) {
  const clone = input.map(i => i.map(a => a));

  let steps = [{ x: fromx, y: fromy, path: [] }];

  while (true) {
    let next = [];
    for (let step of steps) {
      if (clone[step.y][step.x] === ".") {
        clone[step.y][step.x] = step.path;
      }
    }

    // print(
    //   clone.map(line => line.map(i => (typeof i === "object" ? i.length : i)))
    // );
    // for (let step of steps) {
    //   console.log(step.x, step.y, step.path);
    // }

    for (let st of steps) {
      const { x, y, path } = st;
      if (clone[y - 1][x] === ".") {
        next.push({ x, y: y - 1, path: [...path, { x, y: y - 1 }] });
      }
      if (clone[y][x - 1] === ".") {
        next.push({ x: x - 1, y, path: [...path, { x: x - 1, y }] });
      }
      if (clone[y][x + 1] === ".") {
        next.push({ x: x + 1, y, path: [...path, { x: x + 1, y }] });
      }
      if (clone[y + 1][x] === ".") {
        next.push({ x, y: y + 1, path: [...path, { x, y: y + 1 }] });
      }
    }
    steps = next;
    // steps.sort(byXY);

    if (next.length === 0) {
      return clone;
    }
  }
}

function findAllPoints(input, letter) {
  const result = [];
  // find all free points
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === letter) {
        result.push({ x, y });
      }
    }
  }

  return result;
}

const byXY = (a, b) => a.y * 1000 + a.x - b.y * 1000 - b.x;

function walkTo(input, me) {
  print(input);
  console.log("@", me);

  let points = findAllPoints(input, ".");
  const char = input[me.y][me.x];
  const enemy = char === "E" ? "G" : "E";

  points = points.filter(pt => isInRange(input, pt.x, pt.y, enemy));

  // console.log(points);

  const paths = findPaths(input, me.x, me.y);

  // print(paths.map(p => p.length)); // map(i => (typeof i === "array" ? i.length : i))));
  // print(
  //   paths.map(line => line.map(i => (typeof i === "object" ? i.length : i)))
  // );

  points = points
    .map(pt => ({ x: pt.x, y: pt.y, dist: paths[pt.y][pt.x] }))
    .filter(i => i.dist !== ".");

  points.sort((a, b) =>
    a.dist.length === b.dist.length
      ? a.y * 1000 + a.x - (b.y * 1000 - b.x)
      : a.dist.length - b.dist.length
  );

  const target = points.shift();

  // console.log("->", target);

  return target.dist.shift();
}

// ======================================================================

let testInput = [
  "#######",
  "#E..G.#",
  "#...#.#",
  "#.G.#G#",
  "#######",
  "",
  ""
].map(i => Array.from(i));

assert(walkTo(testInput, { x: 1, y: 1 }), { x: 2, y: 1 });

testInput = [
  "#######",
  "#.E...#",
  "#.....#",
  "#...G.#",
  "#######",
  "",
  "",
  ""
].map(i => Array.from(i));

assert(walkTo(testInput, { x: 2, y: 1 }), { x: 3, y: 1 });

testInput = [
  "#########",
  "#.......#",
  "#.......#",
  "#...E...#",
  "#......G#",
  "#.......#",
  "#.......#",
  "#.......#",
  "#########"
].map(i => Array.from(i));

let goblins = findAllPoints(testInput, "G");
assert(walkTo(testInput, goblins[0]), { x: 7, y: 3 });

testInput = [
  "#########",
  "#G..G..G#",
  "#.......#",
  "#.......#",
  "#G..E..G#",
  "#.......#",
  "#.......#",
  "#G..G..G#",
  "#########"
].map(i => Array.from(i));

goblins = findAllPoints(testInput, "G");
const elfs = findAllPoints(testInput, "E");
const characters = [...goblins, ...elfs].sort(byXY);

while (characters.length) {
  const char = characters.shift();
  const walk = walkTo(testInput, char);

  const letter = testInput[char.y][char.x];
  testInput[char.y][char.x] = ".";
  testInput[walk.y][walk.x] = letter;

  print(testInput);
}
