function parse(line) {
  const data = line.split(" ");
  return {
    instr: data[0],
    a: parseInt(data[1], 10),
    b: parseInt(data[2], 10),
    out: parseInt(data[3], 10)
  };
}

function run(input) {
  while (input[0].instr === "#ip") {
    const cmd = input.shift();
    ipBound = cmd.a;
  }

  for (const cmd of input) {
    switch (cmd.instr) {
      case "seti":
        console.log(`r${cmd.out} = ${cmd.a};`);
        break;

      case "setr":
        console.log(`r${cmd.out} = r${cmd.a};`);
        break;

      case "addi":
        console.log(`r${cmd.out} = r${cmd.a} + ${cmd.b};`);
        break;

      case "addr":
        console.log(`r${cmd.out} = r${cmd.a} + r${cmd.b};`);
        break;

      case "muli":
        console.log(`r${cmd.out} = r${cmd.a} * ${cmd.b};`);
        break;

      case "mulr":
        console.log(`r${cmd.out} = r${cmd.a} * r${cmd.b};`);
        break;

      case "eqrr":
        console.log(`r${cmd.out} = r${cmd.a} === r${cmd.b} ? 1 : 0;`);
        break;

      case "gtrr":
        console.log(`r${cmd.out} = r${cmd.a} > r${cmd.b} ? 1 : 0;`);
        break;

      default:
        console.log("unknown opcode", cmd.instr);
        return;
    }
  }
}

// const testInput = [
//   "#ip 0",
//   "seti 5 0 1",
//   "seti 6 0 2",
//   "addi 0 1 0",
//   "addr 1 2 3",
//   "setr 1 0 0",
//   "seti 8 0 4",
//   "seti 9 0 5"
// ].map(parse);

// run(testInput);

const file = require("fs")
  .readFileSync("./19.txt")
  .toString()
  .split("\n")
  .map(parse);

console.log(run(file));
