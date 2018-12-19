const types = [
  "seti",
  "setr",
  "addi",
  "addr",
  "muli",
  "mulr",
  "eqrr",
  "gtrr",
  "#ip"
];

function parse(line) {
  const data = line.split(" ");
  return {
    instr: types.indexOf(data[0]),
    a: parseInt(data[1], 10),
    b: parseInt(data[2], 10),
    out: parseInt(data[3], 10)
  };
}

function run(input) {
  let ipBound = -1;
  let idx = 0;

  let regs = Array(10).fill(0);
  regs[0] = 1;

  while (input[0].instr === 8) {
    const cmd = input.shift();
    ipBound = cmd.a;
  }

  let counter = 0;

  regs = [16473048, 1, 10551432, 10551432, 1, 6, 0, 0, 0, 0];
  idx = 5;

  while (idx >= 0 && idx < input.length) {
    counter++;

    const cmd = input[idx];

    regs[ipBound] = idx;

    switch (cmd.instr) {
      case 0:
        regs[cmd.out] = cmd.a;
        break;

      case 1:
        regs[cmd.out] = regs[cmd.a];
        break;

      case 2:
        regs[cmd.out] = regs[cmd.a] + cmd.b;
        break;

      case 3:
        regs[cmd.out] = regs[cmd.a] + regs[cmd.b];
        break;

      case 4:
        regs[cmd.out] = regs[cmd.a] * cmd.b;
        break;

      case 5:
        regs[cmd.out] = regs[cmd.a] * regs[cmd.b];
        break;

      case 6:
        regs[cmd.out] = regs[cmd.a] === regs[cmd.b] ? 1 : 0;
        break;

      case 7:
        regs[cmd.out] = regs[cmd.a] > regs[cmd.b] ? 1 : 0;
        break;

      default:
        console.log("unknown opcode", cmd.instr);
        return;
    }

    idx = regs[ipBound];

    if (idx === 6) {
      console.log(idx, regs, cmd);
    }

    idx++;
  }

  return regs;
}

const file = require("fs")
  .readFileSync("./19.txt")
  .toString()
  .split("\n")
  .map(parse);

console.log(run(file));
