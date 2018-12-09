function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function inject(arr, value, index) {
  return arr
    .slice(0, index)
    .concat([value])
    .concat(arr.slice(index));
}

function solve(players, max) {
  let marbles = [0];
  let cur = 0;
  const score = Array(players).fill(0);

  let d = new Date();
  for (let next = 1; next <= max; next++) {
    if (next % 10000 == 0) {
      console.log(".");
    }
    const player = next % players;

    if (next % 23 === 0) {
      score[player] += next;
      cur = (cur + marbles.length - 7) % marbles.length;

      score[player] += marbles[cur];
      marbles.splice(cur, 1);
    } else {
      cur = (cur + 1) % marbles.length;
      cur++;
      marbles = inject(marbles, next, cur);
    }
    // console.log(marbles);
  }

  return score.reduce((a, b) => Math.max(a, b), 0);
}

assert(solve(7, 25), 32);
assert(solve(10, 1618), 8317);
assert(solve(13, 7999), 146373);
assert(solve(17, 1104), 2764);
assert(solve(21, 6111), 54718);
assert(solve(30, 5807), 37305);

console.log(solve(441, 71032));
