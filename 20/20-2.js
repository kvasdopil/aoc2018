const newvals = {
  S: { x: 0, y: 1 },
  N: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
  E: { x: 1, y: 0 }
};

function process(line) {
  let x = 0;
  let y = 0;

  let rooms = {};
  let stack = [];
  let steps = 0;

  for (const char of line) {
    switch (char) {
      case "$":
      case "^":
        break;

      case "(":
        stack.push({ x, y, steps });
        break;
      case ")":
        const old = stack.pop();
        x = old.x;
        y = old.y;
        steps = old.steps;
        break;
      case "|":
        const old2 = stack[stack.length - 1];
        x = old2.x;
        y = old2.y;
        steps = old2.steps;
        break;

      default:
        x += newvals[char].x;
        y += newvals[char].y;

        steps++;

        rooms[`${x}:${y}`] = Math.min(steps, rooms[`${x}:${y}`] || 99999);
    }
  }

  const result = Object.values(rooms);
  result.sort((a, b) => a - b);
  return {
    max: result.pop(),
    top: result.filter(i => i >= 1000).length
  };
}

const file = require("fs")
  .readFileSync("./20.txt")
  .toString()
  .trim();

console.log(process(file));
