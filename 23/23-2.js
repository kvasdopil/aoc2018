function parse(line) {
  const [x, y, z, r] = line
    .replace(/[= r>pos<]/g, "")
    .split(",")
    .map(a => parseInt(a, 10));

  return { r, x, y, z };
}

function distMa(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

function isect(a, b) {
  return {
    xa: Math.max(a.xa, b.xa),
    xb: Math.min(a.xb, b.xb),
    ya: Math.max(a.ya, b.ya),
    yb: Math.min(a.yb, b.yb),
    za: Math.max(a.za, b.za),
    zb: Math.min(a.zb, b.zb)
  };
}

function solve(src) {
  const filtered = src.filter(item => {
    const intersections = src.filter(
      item2 => distMa(item, item2) <= item.r + item2.r
    );
    return intersections.length > 900;
  });

  const cheb = filtered.map(a => ({
    x: a.x + a.y - a.z,
    y: a.x - a.y + a.z,
    z: -a.x + a.y + a.z,
    r: a.r
  }));

  const input = cheb.map(a => ({
    xa: a.x - a.r,
    xb: a.x + a.r,
    ya: a.y - a.r,
    yb: a.y + a.r,
    za: a.z - a.r,
    zb: a.z + a.r
  }));

  const a = input.shift();
  const result = input.reduce((res, i) => isect(res, i), a);

  const s = input.filter(item => {
    return (
      result.xa >= item.xa &&
      result.xa <= item.xb &&
      result.ya >= item.ya &&
      result.ya <= item.yb &&
      result.za >= item.za &&
      result.za <= item.zb
    );
  });
  const sum = result.xa + result.ya + result.za;
  console.log(result, s.length, sum);
}

const file = require("fs")
  .readFileSync("23.txt")
  .toString()
  .split("\n")
  .map(parse);
console.log(solve(file));
