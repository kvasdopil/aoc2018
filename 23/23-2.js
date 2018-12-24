function parse(line) {
  const [x, y, z, r] = line
    .replace(/[= r>pos<]/g, "")
    .split(",")
    .map(a => parseInt(a, 10));

  return { r, x, y, z };
}

function dist(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

function solve(input) {
  // for (let i = 0; i < input.length; i++) {
  //   for (let j = 0; j < input.length; j++) {
  //     const a = input[i];
  //     const b = input[j];
  //     const dst = dist(a, b);
  //     if (dst + a.r < b.r) {
  //       b.skip = 1;
  //     }
  //   }
  // }
  // const noSkip = input.filter(a => !a.skip);
  // console.log(noSkip.length);

  // noSkip.sort((a, b) => a.r - b.r);
  // console.log(noSkip);

  const minRadius = input.reduce(
    (res, i) => (res < i.r ? res : i.r),
    99999999999999
  );
  const minX = input.reduce(
    (res, i) => (res < i.x ? res : i.x),
    99999999999999
  );
  const minY = input.reduce(
    (res, i) => (res < i.y ? res : i.y),
    99999999999999
  );
  const minZ = input.reduce(
    (res, i) => (res < i.z ? res : i.z),
    99999999999999
  );
  const maxX = input.reduce(
    (res, i) => (res > i.x ? res : i.x),
    -99999999999999
  );
  const maxY = input.reduce(
    (res, i) => (res > i.y ? res : i.y),
    -99999999999999
  );
  const maxZ = input.reduce(
    (res, i) => (res > i.z ? res : i.z),
    -99999999999999
  );

  const range = {
    x: Math.ceil(maxX - minX / 2),
    y: Math.ceil(maxY - minY / 2),
    z: Math.ceil(maxZ - minZ / 2)
  };
  const center = {
    x: range.x + minX,
    y: range.y + minY,
    z: range.z + minZ
  };
  const pieces = 13;

  let gmax = 0;
  let next;

  while (range.x + range.y + range.z > 12) {
    console.log(".", range.x, range.y, range.z);
    const xd = Math.ceil(range.x / pieces);
    const yd = Math.ceil(range.y / pieces);
    const zd = Math.ceil(range.z / pieces);

    // let next;
    // let min = 0;

    for (let x = center.x - range.x; x <= center.x + range.x; x += xd) {
      for (let y = center.y - range.y; y <= center.y + range.y; y += yd) {
        for (let z = center.z - range.z; z <= center.z + range.z; z += zd) {
          const inrange = input.filter(
            drone => dist(drone, { x, y, z }) <= drone.r
          ).length;
          if (inrange >= gmax) {
            if (inrange > gmax) {
              console.log(inrange);
            }
            gmax = inrange;
            next = { x, y, z };
          }
        }
      }
    }

    const mul = 0.8;
    range.x = Math.ceil(range.x * mul);
    range.y = Math.ceil(range.y * mul);
    range.z = Math.ceil(range.z * mul);

    center.x = next.x;
    center.y = next.y;
    center.z = next.z;
  }

  console.log(center, gmax);

  console.log(center.x + center.y + center.z);
}

// const testInput = [
//   "pos=<10,12,12>, r=2",
//   "pos=<12,14,12>, r=2",
//   "pos=<16,12,12>, r=4",
//   "pos=<14,14,14>, r=6",
//   "pos=<50,50,50>, r=200",
//   "pos=<10,10,10>, r=5"
// ].map(parse);

// console.log(solve(testInput));

const file = require("fs")
  .readFileSync("23.txt")
  .toString()
  .split("\n")
  .map(parse);
console.log(solve(file));

// 111562242 low - 904
// 111956876 low - 905
