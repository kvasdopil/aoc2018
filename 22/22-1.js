function print(state) {
  const chars = [".", "=", "|"];
  const cvt = i => chars[i % 3];
  console.log();
  console.log(state.map(line => line.map(cvt).join("")).join("\n"));
}

function calcErosion(map, x, y, target, depth) {
  if (x === 0 && y === 0) {
    return (0 + depth) % 20183;
  }

  if (x === target.x && y === target.y) {
    return (0 + depth) % 20183;
  }

  if (y === 0) {
    const gi = x * 16807;
    return (gi + depth) % 20183;
  }

  if (x === 0) {
    const gi = y * 48271;
    return (gi + depth) % 20183;
  }

  const gi = map[y][x - 1] * map[y - 1][x];
  return (gi + depth) % 20183;
}

function solve(target, depth) {
  const map = Array(target.y + 1)
    .fill(0)
    .map(() => Array(target.x + 1).fill(0));

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x] = calcErosion(map, x, y, target, depth);
    }
  }

  const single = map.reduce((a, b) => a.concat(b), []);
  const risk = single.reduce((a, b) => a + (b % 3), 0);
  return risk;
}

console.log(solve({ x: 10, y: 10 }, 510));
console.log(solve({ x: 14, y: 778 }, 11541));
