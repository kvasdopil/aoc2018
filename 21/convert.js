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

  console.log(`let r0=0, r1=0, r2=0, r3=0, r4=0, r5=0, r6=0;`);

  let line = 0;
  console.log(`while (r${ipBound} >= 0 && r${ipBound} < ${input.length}) {`);
  console.log(`switch (r${ipBound}) {`);
  for (const cmd of input) {
    console.log(`case ${line}: `);
    if (cmd.out === ipBound) {
      console.log(`r${ipBound} = ${line};`);
    }
    let out = `r${cmd.out} = `;
    line++;
    switch (cmd.instr) {
      case "seti":
        console.log(`${out} ${cmd.a};`);
        break;

      case "setr":
        console.log(`${out} r${cmd.a};`);
        break;

      case "addi":
        console.log(`${out} r${cmd.a} + ${cmd.b};`);
        break;

      case "addr":
        console.log(`${out} r${cmd.a} + r${cmd.b};`);
        break;

      case "muli":
        console.log(`${out} r${cmd.a} * ${cmd.b};`);
        break;

      case "mulr":
        console.log(`${out} r${cmd.a} * r${cmd.b};`);
        break;

      case "eqrr":
        console.log(`${out} r${cmd.a} === r${cmd.b} ? 1 : 0;`);
        break;

      case "eqri":
        console.log(`${out} r${cmd.a} === ${cmd.b} ? 1 : 0;`);
        break;

      case "gtrr":
        console.log(`${out} r${cmd.a} > r${cmd.b} ? 1 : 0;`);
        break;

      case "gtir":
        console.log(`${out} ${cmd.a} > r${cmd.b} ? 1 : 0;`);
        break;

      case "bani":
        console.log(`${out} r${cmd.a} & ${cmd.b};`);
        break;

      case "bori":
        console.log(`${out} r${cmd.a} | ${cmd.b};`);
        break;

      default:
        console.log("unknown opcode", cmd.instr);
        return;
    }
    if (cmd.out === ipBound) {
      console.log(`r${ipBound}++;`);
      console.log("break;");
    }
  }
  console.log("}");
  console.log("}");
  console.log("console.log(r0,r1,r2,r3,r4,r5,r6)");
}

const file = require("fs")
  .readFileSync("21.txt")
  .toString()
  .split("\n")
  .map(parse);

run(file);
