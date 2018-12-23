function print(state) {
  const cvt = i => {
    if (i === "-") {
      return " --";
    }
    if (i >= 99999) {
      return " ..";
    }

    if (i < 10) {
      return `  ${i}`;
    }

    return ` ${i}`;
  };
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

function buildMap(target, depth) {
  const result = Array(target.y * 2)
    .fill(0)
    .map(() => Array(target.x * 2).fill(0));

  for (let y = 0; y < result.length; y++) {
    for (let x = 0; x < result[y].length; x++) {
      result[y][x] = calcErosion(result, x, y, target, depth);
    }
  }

  return result.map(line => line.map(item => item % 3));
}

function findInMap(map, value) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[time] === time) {
        return { x, y };
      }
    }
  }

  return false;
}

const neighbours = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function solve(target, depth) {
  const map = buildMap(target, depth);
  // print(map);
  let maps = {
    t: map.map(line => line.map(i => (i === 1 ? "-" : 99999))),
    g: map.map(line => line.map(i => (i === 2 ? "-" : 99999))),
    n: map.map(line => line.map(i => (i === 0 ? "-" : 99999)))
  };

  let time = 0;
  let tool = "t";

  let x = 0;
  let y = 0;

  maps[tool][y][x] = time;

  for (let time = 0; time < 2000; time++) {
    const points = findAllTimes(maps, time);
    for (const point of points) {
      const { x, y, tool } = point;
      walkTypes(maps, x, y, tool, time);
      walkNeighbours(maps[tool], x, y, time);
    }
  }

  print(maps.t);
  print(maps.g);
  print(maps.n);

  console.log(maps.t[target.y][target.x]);
  console.log(maps.g[target.y][target.x]);
  console.log(maps.n[target.y][target.x]);
}

function findAllTimes(maps, val) {
  const result = [];
  for (let tool in maps) {
    for (let y = 0; y < maps[tool].length; y++) {
      for (let x = 0; x < maps[tool][y].length; x++) {
        if (maps[tool][y][x] === val) {
          result.push({ x, y, tool });
        }
      }
    }
  }
  return result;
}

function walkTypes(maps, x, y, tool, time) {
  for (let type in maps) {
    if (tool === type) {
      continue;
    }
    const val = maps[type][y][x];
    if (val === "#") {
      continue;
    }

    if (val > time + 7) {
      maps[type][y][x] = time + 7;
    }
  }
}

function walkNeighbours(map, x, y, time) {
  const adjacent = neighbours
    .map(([dx, dy]) => [dx + x, dy + y])
    .filter(([x, y]) => x >= 0 && x < map[0].length && y >= 0 && y < map.length)
    .filter(([x, y]) => map[y][x] != "#");

  for (const adj of adjacent) {
    const [x, y] = adj;
    const val = map[y][x];
    if (val > time + 1) {
      map[y][x] = time + 1;
    }
  }
}

solve({ x: 10, y: 10 }, 510);

solve({ x: 14, y: 778 }, 11541);
