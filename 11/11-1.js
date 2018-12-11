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

// Fuel cell at  122,79, grid serial number 57: power level -5.
// Fuel cell at 217,196, grid serial number 39: power level  0.
// Fuel cell at 101,153, grid serial number 71: power level  4.

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

  for (let y = 0; y < 300 - 3; y++) {
    for (let x = 0; x < 300 - 3; x++) {
      const sum =
        data[y * 300 + x] +
        data[y * 300 + x + 1] +
        data[y * 300 + x + 2] +
        data[(y + 1) * 300 + x] +
        data[(y + 1) * 300 + x + 1] +
        data[(y + 1) * 300 + x + 2] +
        data[(y + 2) * 300 + x] +
        data[(y + 2) * 300 + x + 1] +
        data[(y + 2) * 300 + x + 2];

      if (sum > max) {
        max = sum;
        answer = [x + 1, y + 1];
      }
    }
  }

  return answer;
}

assert(solve(18), [33, 45]);
assert(solve(42), [21, 61]);

console.log(solve(9995));
