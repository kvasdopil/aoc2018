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

  // for (let i = 0; i < noSkip.length; i++) {
  //   for (let j = i + 1; j < noSkip.length; j++) {
  //     const a = noSkip[i];
  //     const b = noSkip[j];
  //     const dst = dist(a, b);
  //     if (dst > a.r + b.r) {
  //       console.log(i, j);
  //     }
  //   }
  // }

  for (let i = 0; i < input.length; i++) {
    let links = 0;
    for (let j = 0; j < input.length; j++) {
      const a = input[i];
      const b = input[j];
      const dst = dist(a, b);
      if (dst <= a.r + b.r) {
        if (i != j) {
          links++;
        }
      }
    }
    input[i].links = links;
  }

  input.sort((a, b) => b.links - a.links);
  const bad = input.filter(a => a.links < 900);
  const good = input.filter(a => a.links > 900);

  // console.log(bad);

  // const minX = bad.reduce((res, i) => (res < i.x ? res : i.x), 99999999999999);
  // const minY = bad.reduce((res, i) => (res < i.y ? res : i.y), 99999999999999);
  // const minZ = bad.reduce((res, i) => (res < i.z ? res : i.z), 99999999999999);
  // const maxX = bad.reduce((res, i) => (res > i.x ? res : i.x), -99999999999999);
  // const maxY = bad.reduce((res, i) => (res > i.y ? res : i.y), -99999999999999);
  // const maxZ = bad.reduce((res, i) => (res > i.z ? res : i.z), -99999999999999);

  // console.log(minX, maxX);
  // console.log(minY, maxY);
  // console.log(minZ, maxZ);

  // console.log("===");
  // {
  //   const minX = good.reduce(
  //     (res, i) => (res < i.x ? res : i.x),
  //     99999999999999
  //   );
  //   const minY = good.reduce(
  //     (res, i) => (res < i.y ? res : i.y),
  //     99999999999999
  //   );
  //   const minZ = good.reduce(
  //     (res, i) => (res < i.z ? res : i.z),
  //     99999999999999
  //   );
  //   const maxX = good.reduce(
  //     (res, i) => (res > i.x ? res : i.x),
  //     -99999999999999
  //   );
  //   const maxY = good.reduce(
  //     (res, i) => (res > i.y ? res : i.y),
  //     -99999999999999
  //   );
  //   const maxZ = good.reduce(
  //     (res, i) => (res > i.z ? res : i.z),
  //     -99999999999999
  //   );

  //   console.log(minX, maxX);
  //   console.log(minY, maxY);
  //   console.log(minZ, maxZ);
  // }

  bad.forEach(baddrone => {
    const sects = good.filter(
      gooddrone => dist(baddrone, gooddrone) <= baddrone.range + gooddrone.range
    );
    console.log(sects.length);
  });

  const g = good.map(g => ({
    xa: g.x - g.r,
    xb: g.x + g.r,
    ya: g.y - g.r,
    yb: g.y + g.r,
    za: g.z - g.r,
    zb: g.z + g.r
  }));

  // g.sort((a, b) => a.xa - b.xb);
  // g.forEach(a => console.log(a));

  let xa = g.reduce((res, g) => Math.max(res, g.xa), -999999999999);
  let xb = g.reduce((res, g) => Math.min(res, g.xb), 99999999999);

  let ya = g.reduce((res, g) => Math.max(res, g.ya), -999999999999);
  let yb = g.reduce((res, g) => Math.min(res, g.yb), 99999999999);

  let za = g.reduce((res, g) => Math.max(res, g.za), -999999999999);
  let zb = g.reduce((res, g) => Math.min(res, g.zb), 99999999999);

  // console.log(maxxa, minxb, minxb - xa);
  // console.log(maxya, minyb, minyb - ya);
  // console.log(maxza, minzb, zb - za);

  // let ct = 0;
  // for (let x = maxxa; x <= minxb; x++) {
  //   console.log(".");
  //   for (let y = maxya; y <= minyb; y++) {
  //     for (let z = maxza; z <= minzb; z++) {
  //       ct++;
  //     }
  //   }
  // }
  // console.log(ct);

  // return;

  const range = {
    x: Math.ceil((xb - xa) / 2),
    y: Math.ceil((yb - ya) / 2),
    z: Math.ceil((zb - za) / 2)
  };
  const center = {
    x: range.x + xa,
    y: range.y + ya,
    z: range.z + za
  };
  const pieces = 50;

  let gmax = 0;
  let next;
  let mindist = 0;

  while (range.x + range.y + range.z > 12) {
    console.log(".", range.x, range.y, range.z);
    const xd = Math.ceil(range.x / pieces);
    const yd = Math.ceil(range.y / pieces);
    const zd = Math.ceil(range.z / pieces);

    // let next;
    // gmax = 0;

    for (let x = center.x - range.x; x <= center.x + range.x; x += xd) {
      for (let y = center.y - range.y; y <= center.y + range.y; y += yd) {
        for (let z = center.z - range.z; z <= center.z + range.z; z += zd) {
          const inrange = good.filter(
            drone => dist(drone, { x, y, z }) <= drone.r
          ).length;
          // console.log(inrange);
          if (inrange > gmax) {
            next = { x, y, z };
            mindist = Math.abs(x + y + z);
            gmax = inrange;
            console.log(inrange, mindist);
          }
          if (inrange === gmax) {
            if (Math.abs(x + y + z) < mindist) {
              mindist = Math.abs(x + y + z);
              next = { x, y, z };
              console.log(
                "number",
                input.filter(drone => dist(drone, { x, y, z }) <= drone.r)
                  .length
              );
            }
          }
        }
      }
    }

    const mul = 0.5;
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

// 111139928 low - 892
// 111562242 low - 904
// 111956876 low - 905
// 112690922 low - 905
// 226058184 nope
// 262643100 - 13
