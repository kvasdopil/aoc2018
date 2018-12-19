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
  let points = findAllPoints(input, ".");
  const char = input[me.y][me.x];
  const enemy = char === "E" ? "G" : "E";

  if (isInRange(input, me.x, me.y, enemy)) {
    return null;
  }
  points = points.filter(pt => isInRange(input, pt.x, pt.y, enemy));

  const paths = findPaths(input, me.x, me.y);

  points = points
    .map(pt => ({ x: pt.x, y: pt.y, dist: paths[pt.y][pt.x] }))
    .filter(i => i.dist !== ".");

  points.sort((a, b) =>
    a.dist.length === b.dist.length
      ? a.y * 1000 + a.x - (b.y * 1000 - b.x)
      : a.dist.length - b.dist.length
  );

  if (points.length === 0) {
    return null;
  }

  const target = points.shift();
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

function turn(input) {
  goblins = findAllPoints(input, "G");
  const elfs = findAllPoints(input, "E");
  const characters = [...goblins, ...elfs].sort(byXY);

  while (characters.length) {
    const char = characters.shift();
    const walk = walkTo(input, char);

    if (walk === null) {
      continue;
    }

    const letter = input[char.y][char.x];
    input[char.y][char.x] = ".";
    input[walk.y][walk.x] = letter;
  }
}

const tgt = [
  "#########",
  "#.......#",
  "#..GGG..#",
  "#..GEG..#",
  "#G..G...#",
  "#......G#",
  "#.......#",
  "#.......#",
  "#########"
].map(i => Array.from(i));

turn(testInput);
turn(testInput);
turn(testInput);
assert(testInput, tgt);

testInput = [
  "G....",
  "..G..",
  "..EG.",
  "..G..",
  "...G.",
  "",
  "",
  "",
  "",
  ""
].map(i => Array.from(i));

let hps = [
  { x: 0, y: 0, hp: 9 },
  { x: 2, y: 1, hp: 4 },
  { x: 3, y: 2, hp: 2 },
  { x: 2, y: 3, hp: 2 },
  { x: 3, y: 4, hp: 1 }
];

function fight(input, me, hps) {
  const { x, y } = me;
  const char = input[y][x];
  const enemy = char === "E" ? "G" : "E";

  const enemies = [
    { x, y: y - 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y + 1 }
  ]
    .filter(e => input[e.y][e.x] === enemy)
    .map(e => hps.filter(i => i.x === e.x && i.y === e.y).pop())
    .sort((a, b) => (a.hp === b.hp ? byXY(a, b) : a.hp - b.hp));

  if (enemies.length === 0) {
    return null;
  }

  return enemies.shift();
}

const attack = fight(testInput, { x: 2, y: 2 }, hps);
assert(attack, { x: 3, y: 2, hp: 2 });

testInput = [
  "#######",
  "#.G...#",
  "#...EG#",
  "#.#.#G#",
  "#..G#E#",
  "#.....#",
  "#######"
].map(i => Array.from(i));

function game(input) {
  let hps = [];
  findAllPoints(input, "G").forEach(({ x, y }) => hps.push({ x, y, hp: 200 }));
  findAllPoints(input, "E").forEach(({ x, y }) => hps.push({ x, y, hp: 200 }));

  let round = 0;

  while (true) {
    if (findAllPoints(input, "G").length === 0) {
      break;
    }

    if (findAllPoints(input, "E").length === 0) {
      break;
    }

    console.log("===", round, "===");
    print(input);

    let chars = hps.map(i => i);

    chars.sort(byXY);
    while (chars.length > 0) {
      // if (findAllPoints(input, "G").length === 0) {
      //   break;
      // }

      // if (findAllPoints(input, "E").length === 0) {
      //   break;
      // }

      const char = chars.shift();
      const walk = walkTo(input, char);

      if (walk) {
        const letter = input[char.y][char.x];
        input[char.y][char.x] = ".";
        input[walk.y][walk.x] = letter;

        // update hp
        const hp = hps.filter(i => i.x === char.x && i.y === char.y).pop();
        hp.x = walk.x;
        hp.y = walk.y;
      }

      const attack = fight(input, char, hps);
      if (attack) {
        const hp = hps.filter(i => i.x === attack.x && i.y === attack.y).pop();
        // console.log("char", char, "attack", hp);
        hp.hp -= 3;
        if (hp.hp < 0) {
          input[hp.y][hp.x] = ".";
          hps = hps.filter(i => i !== hp);
          // chars = chars.filter(i => !(i.x === hp.x && i.y === hp.y));
        }
      }
    }

    round++;

    // print(input);
    // console.log(hps);
  }

  const sum = hps.reduce((res, a) => res + a.hp, 0);

  // print(input);
  // console.log(hps);
  // console.log(round, sum);

  round--;

  return round * hps.reduce((res, a) => res + a.hp, 0);
}

assert(game(testInput), 27730);

testInput = [
  "#######",
  "#G..#E#",
  "#E#E.E#",
  "#G.##.#",
  "#...#E#",
  "#...E.#",
  "#######"
].map(i => Array.from(i));
assert(game(testInput), 39514);

testInput = [
  "#######",
  "#G..#E#",
  "#E#E.E#",
  "#G.##.#",
  "#...#E#",
  "#...E.#",
  "#######"
].map(i => Array.from(i));
assert(game(testInput), 36334);

testInput = [
  "#######",
  "#E.G#.#",
  "#.#G..#",
  "#G.#.G#",
  "#G..#.#",
  "#...E.#",
  "#######"
].map(i => Array.from(i));
assert(game(testInput), 27755);

testInput = [
  "#######",
  "#.E...#",
  "#.#..G#",
  "#.###.#",
  "#E#G#G#",
  "#...#G#",
  "#######"
].map(i => Array.from(i));
assert(game(testInput), 28944);

testInput = [
  "#########",
  "#G......#",
  "#.E.#...#",
  "#..##..G#",
  "#...##..#",
  "#...#...#",
  "#.G...G.#",
  "#.....G.#",
  "#########"
].map(i => Array.from(i));
assert(game(testInput), 18740);

const file = require("fs")
  .readFileSync("15.txt")
  .toString()
  .split("\n")
  .map(i => Array.from(i));
console.log(game(file));
