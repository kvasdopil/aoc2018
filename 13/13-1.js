const fs = require("fs");

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function solve(input) {
  const carts = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const dir = ["<", "^", ">", "v"].indexOf(input[y][x]);
      if (dir >= 0) {
        carts.push({ x, y, dir: input[y][x], turn: "l" });
        input[y][x] = "-";
      }
    }
  }

  while (true) {
    carts.sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y));
    for (const cart of carts) {
      const { x, y, dir, turn } = cart;
      const current = input[y][x];
      if (current === "\\") {
        const maps = { "<": "^", "^": "<", ">": "v", v: ">" };
        cart.dir = maps[dir];
      }

      if (current === "/") {
        const maps = { "<": "v", v: "<", ">": "^", "^": ">" };
        cart.dir = maps[dir];
      }

      if (current === "+") {
        const maps = {
          l: { "<": "v", "^": "<", ">": "^", v: ">" },
          s: { "<": "<", "^": "^", ">": ">", v: "v" },
          r: { "<": "^", "^": ">", ">": "v", v: "<" }
        };
        const turns = { l: "s", s: "r", r: "l" };

        cart.dir = maps[turn][dir];
        cart.turn = turns[turn];
      }

      const nx = { "<": x - 1, ">": x + 1, "^": x, v: x };
      const ny = { "<": y, ">": y, "^": y - 1, v: y + 1 };

      cart.x = nx[cart.dir];
      cart.y = ny[cart.dir];

      for (let c2 of carts) {
        if (c2 != cart) {
          if (cart.x === c2.x && cart.y === c2.y) {
            return { x: cart.x, y: cart.y };
          }
        }
      }
    }
  }
}

const testInput = fs
  .readFileSync("./13.test.txt")
  .toString()
  .split("\n")
  .map(line => Array.from(line));

assert(solve(testInput), { x: 7, y: 3 });

const inp = fs
  .readFileSync("./13.txt")
  .toString()
  .split("\n")
  .map(line => Array.from(line));

console.log(solve(inp));
