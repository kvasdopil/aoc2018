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

  console.log(`let r1=0, r2=0, r3=0, r4=0, r5=0, r6=0;`);

  let line = 0;
  console.log(`while (r${ipBound} < ${input.length})`);
  console.log(`switch (r${ipBound}) {`);
  for (const cmd of input) {
    console.log(`case ${line}: `);
    line++;
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

      case "eqri":
        console.log(`r${cmd.out} = r${cmd.a} === ${cmd.b} ? 1 : 0;`);
        break;

      case "gtrr":
        console.log(`r${cmd.out} = r${cmd.a} > r${cmd.b} ? 1 : 0;`);
        break;

      case "gtir":
        console.log(`r${cmd.out} = ${cmd.a} > r${cmd.b} ? 1 : 0;`);
        break;

      case "bani":
        console.log(`r${cmd.out} = r${cmd.a} & ${cmd.b};`);
        break;

      case "bori":
        console.log(`r${cmd.out} = r${cmd.a} | ${cmd.b};`);
        break;

      default:
        console.log("unknown opcode", cmd.instr);
        return;
    }
    console.log("break;");
  }
  console.log("}");
}

const file = require("fs")
  .readFileSync("./21.txt")
  .toString()
  .split("\n")
  .map(parse);

console.log(run(file));
