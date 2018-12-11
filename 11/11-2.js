function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function calc(x, y, serial) {
  const rackId = x + 10;
  const start = y * rackId;
  const pwrL = rackId * (start + serial);

  const digit = (pwrL % 1000) - (pwrL % 100);
  return digit / 100 - 5;
}

assert(calc(3, 5, 8), 4);

assert(calc(122, 79, 57), -5);
assert(calc(217, 196, 39), 0);
assert(calc(101, 153, 71), 4);

function solve(serial) {
  const data = Array(300 * 300).fill(0);
  for (let y = 0; y < 300; y++) {
    for (let x = 0; x < 300; x++) {
      data[y * 300 + x] = calc(x + 1, y + 1, serial);
    }
  }

  let max = -9999;
  let answer = [-1, -1];

  for (let size = 1; size < 20; size++) {
    console.log(size);
    for (let y = 0; y < 300 - size; y++) {
      for (let x = 0; x < 300 - size; x++) {
        let sum = 0;
        for (let xx = 0; xx < size; xx++) {
          for (let yy = 0; yy < size; yy++) {
            sum += data[(y + yy) * 300 + (x + xx)];
          }
        }
        if (sum > max) {
          max = sum;
          answer = [x + 1, y + 1, size];
        }
      }
    }
  }

  return answer;
}

assert(solve(18), [90, 269, 16]);
assert(solve(42), [232, 251, 12]);

console.log(solve(9995));
