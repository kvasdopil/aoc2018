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

  return { reg: data[1][0], options: result };
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

function calcSamples(samples) {
  const results = samples.map(sample => process(sample));

  const numbers = [];
  for (let i = 0; i < 16; i++) {
    const opts = results.filter(res => res.reg === i).map(o => o.options);
    const vals = [];
    for (let val = 0; val < 16; val++) {
      if (opts.every(o => o.indexOf(val) >= 0)) {
        vals.push(val);
      }
    }
    numbers.push(vals);
  }

  const regnumbers = {};
  while (true) {
    let found = false;
    for (let n = 0; n < numbers.length; n++) {
      if (numbers[n].length === 1) {
        found = numbers[n][0];
        regnumbers[n] = found;
      }
    }
    if (found === false) {
      break;
    }

    for (let n = 0; n < numbers.length; n++) {
      numbers[n] = numbers[n].filter(i => i !== found);
    }
  }

  return regnumbers;
}

function parse(line) {
  return line.split(" ").map(i => parseInt(i, 10));
}

assert(process(testInput).options.length, 3);

const file = require("fs")
  .readFileSync("16.txt")
  .toString()
  .split("\n");

const samples = [];
while (file.length) {
  samples.push([file.shift(), file.shift(), file.shift(), file.shift()]);
}

const mappings = calcSamples(samples);

const program = require("fs")
  .readFileSync("16.1.txt")
  .toString()
  .split("\n")
  .map(parse);

function run(program, mappings) {
  let regs = [0, 0, 0, 0];
  for (cmd of program) {
    regs = testi(mappings[cmd[0]], cmd, regs);
  }
  return regs;
}

const result = run(program, mappings);
console.log(result);
