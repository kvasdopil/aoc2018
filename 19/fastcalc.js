const tgt = 10551432;

const muls = [];

let sum = 0;

for (let i = 0; i <= tgt; i++) {
  if (tgt % i === 0) {
    muls.push([sum, tgt / i, tgt, i, 1, 6, 0, 0, 0, 0]);
    sum += i;
  }
}

console.log(muls);
