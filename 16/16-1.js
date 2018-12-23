function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function process(input) {
  const data = input.map(line =>
    line
      .replace(/[:\[\]]/g, "")
      .split(" ")
      .map(i => parseInt(i, 10))
  );

  data[0].shift();
  data[2].shift();
  data[2].shift();

  const before = data[0];
  const cmd = data[1];
  const after = data[2];

  const result = [];

  for (let i = 0; i < 16; i++) {
    const res = testi(i, cmd, before);
    if (res.every((val, i) => after[i] === val)) {
      result.push(i);
    }
  }

  return result;
}

function testi(cmd, args, init) {
  const regs = init.map(i => i);
  const a = args[1];
  const b = args[2];
  const out = args[3];

  switch (cmd) {
    case 0: // addr
      regs[out] = regs[a] + regs[b];
      break;

    case 1: // addi
      regs[out] = regs[a] + b;
      break;

    case 2: // mulr
      regs[out] = regs[a] * regs[b];
      break;

    case 3: // muli
      regs[out] = regs[a] * b;
      break;

    case 4: // banr
      regs[out] = regs[a] & regs[b];
      break;

    case 5: // bani
      regs[out] = regs[a] & b;
      break;

    case 6: // borr
      regs[out] = regs[a] | regs[b];
      break;

    case 7: // bori
      regs[out] = regs[a] | b;
      break;

    case 8: // setr
      regs[out] = regs[a];
      break;

    case 9: // seti
      regs[out] = a;
      break;

    case 10: // gtir
      regs[out] = a > regs[b] ? 1 : 0;
      break;

    case 11: // gtri
      regs[out] = regs[a] > b ? 1 : 0;
      break;

    case 12: // gtrr
      regs[out] = regs[a] > regs[b] ? 1 : 0;
      break;

    case 13: // eqir
      regs[out] = a === regs[b] ? 1 : 0;
      break;

    case 14: // eqri
      regs[out] = regs[a] === b ? 1 : 0;
      break;

    case 15: // eqrr
      regs[out] = regs[a] === regs[b] ? 1 : 0;
      break;
  }

  return regs;
}

const testInput = [
  "Before: [3, 2, 1, 1]",
  "9 2 1 2",
  "After:  [3, 2, 2, 1]",
  "",
  "",
  ""
];

assert(process(testInput).length, 3);

const file = require("fs")
  .readFileSync("16.txt")
  .toString()
  .split("\n");

const samples = [];
while (file.length) {
  samples.push([file.shift(), file.shift(), file.shift(), file.shift()]);
}

const ct = samples.map(sample => process(sample)).filter(i => i.length >= 3);

console.log(ct.length);
